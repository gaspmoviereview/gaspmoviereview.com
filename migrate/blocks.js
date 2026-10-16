/**
 * Strapi "blocks" rich text → serialised Gutenberg block markup.
 *
 * Markup matches what core blocks save in WordPress 6.6+, so the editor opens migrated
 * reviews without "This block contains unexpected content" warnings.
 */

const escapeHtml = ( text ) =>
	String( text ).replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );

const escapeAttr = ( text ) => escapeHtml( text ).replace( /"/g, '&quot;' );

const block = ( name, attrs, html ) => {
	const json = attrs && Object.keys( attrs ).length ? ` ${ JSON.stringify( attrs ) }` : '';
	return `<!-- wp:${ name }${ json } -->\n${ html }\n<!-- /wp:${ name } -->`;
};

/** Text modifiers, innermost first, as Gutenberg nests its formats. */
const FORMATS = [
	[ 'code', ( html ) => `<code>${ html }</code>` ],
	[ 'strikethrough', ( html ) => `<s>${ html }</s>` ],
	[ 'underline', ( html ) => `<span style="text-decoration: underline;">${ html }</span>` ],
	[ 'italic', ( html ) => `<em>${ html }</em>` ],
	[ 'bold', ( html ) => `<strong>${ html }</strong>` ],
];

export function renderInline( nodes = [] ) {
	return nodes
		.map( ( node ) => {
			if ( node.type === 'link' ) {
				return `<a href="${ escapeAttr( node.url ) }">${ renderInline( node.children ) }</a>`;
			}
			if ( node.type !== 'text' || ! node.text ) {
				return '';
			}
			const text = escapeHtml( node.text ).replace( /\n/g, '<br>' );
			return FORMATS.reduce( ( html, [ key, wrap ] ) => ( node[ key ] ? wrap( html ) : html ), text );
		} )
		.join( '' );
}

const isBlank = ( html ) => html.replace( /<br>/g, '' ).trim() === '';

const paragraph = ( html ) => block( 'paragraph', null, `<p>${ html }</p>` );

function renderList( node ) {
	const ordered = node.format === 'ordered';
	const tag = ordered ? 'ol' : 'ul';
	const items = [];

	// Strapi nests a sub-list as a sibling of list items; Gutenberg puts it inside the preceding item.
	for ( const child of node.children || [] ) {
		if ( child.type === 'list' && items.length ) {
			items[ items.length - 1 ].nested.push( renderList( child ) );
		} else if ( child.type === 'list-item' ) {
			items.push( { html: renderInline( child.children ), nested: [] } );
		}
	}

	const inner = items
		.map( ( item ) => block( 'list-item', null, `<li>${ item.html }${ item.nested.join( '' ) }</li>` ) )
		.join( '' );

	return block( 'list', ordered ? { ordered: true } : null, `<${ tag } class="wp-block-list">${ inner }</${ tag }>` );
}

/**
 * @param {object[]} nodes    Strapi blocks content.
 * @param {(image: object) => {id: number, url: string} | undefined} resolveImage
 *        Maps a Strapi media object to its uploaded WordPress attachment.
 * @returns {string}
 */
export function blocksToGutenberg( nodes = [], resolveImage = () => undefined ) {
	return ( nodes || [] )
		.map( ( node ) => {
			switch ( node.type ) {
				case 'paragraph': {
					const html = renderInline( node.children );
					return isBlank( html ) ? '' : paragraph( html );
				}
				case 'heading': {
					const level = Math.min( Math.max( Number( node.level ) || 2, 1 ), 6 );
					const html = renderInline( node.children );
					if ( isBlank( html ) ) {
						return '';
					}
					return block(
						'heading',
						level === 2 ? null : { level },
						`<h${ level } class="wp-block-heading">${ html }</h${ level }>`
					);
				}
				case 'list':
					return renderList( node );
				case 'quote': {
					const html = renderInline( node.children );
					return isBlank( html ) ? '' : block( 'quote', null, `<blockquote class="wp-block-quote">${ paragraph( html ) }</blockquote>` );
				}
				case 'code': {
					const text = ( node.children || [] ).map( ( c ) => c.text || '' ).join( '' );
					return block( 'code', null, `<pre class="wp-block-code"><code>${ escapeHtml( text ) }</code></pre>` );
				}
				case 'image': {
					const media = resolveImage( node.image );
					if ( ! media ) {
						return '';
					}
					const alt = escapeAttr( node.image?.alternativeText || '' );
					return block(
						'image',
						{ id: media.id, sizeSlug: 'full', linkDestination: 'none' },
						`<figure class="wp-block-image size-full"><img src="${ escapeAttr( media.url ) }" alt="${ alt }" class="wp-image-${ media.id }"/></figure>`
					);
				}
				default:
					return '';
			}
		} )
		.filter( Boolean )
		.join( '\n\n' );
}

/** Plain text with paragraph breaks, for places that don't take blocks (the user bio). */
export function blocksToText( nodes = [] ) {
	const text = ( children ) =>
		( children || [] ).map( ( c ) => ( c.type === 'link' ? text( c.children ) : c.text || '' ) ).join( '' );

	return ( nodes || [] )
		.flatMap( ( node ) => ( node.type === 'list' ? ( node.children || [] ).map( ( li ) => `• ${ text( li.children ) }` ) : [ text( node.children ) ] ) )
		.map( ( line ) => line.trim() )
		.filter( Boolean )
		.join( '\n\n' );
}

/** Every Strapi media object embedded in the content, so they can be uploaded first. */
export function collectImages( nodes = [] ) {
	return ( nodes || [] ).filter( ( n ) => n.type === 'image' && n.image ).map( ( n ) => n.image );
}

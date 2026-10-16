/**
 * Read-only Strapi v4 client. Handles both the stock response shape ({ data: { id, attributes } })
 * and the flattened one produced by strapi-plugin-transformer, which the live API uses.
 */

const PAGE_SIZE = 100;

export function unwrap( value ) {
	if ( Array.isArray( value ) ) {
		return value.map( unwrap );
	}
	if ( ! value || typeof value !== 'object' ) {
		return value;
	}
	if ( 'data' in value && Object.keys( value ).every( ( k ) => k === 'data' || k === 'meta' ) ) {
		return unwrap( value.data );
	}
	const source = value.attributes ? { id: value.id, ...value.attributes } : value;
	return Object.fromEntries( Object.entries( source ).map( ( [ k, v ] ) => [ k, k === 'content' ? v : unwrap( v ) ] ) );
}

export function createStrapiClient( { url, token } ) {
	const base = url.replace( /\/$/, '' );

	async function get( path ) {
		const res = await fetch( `${ base }${ path }`, { headers: { authorization: `Bearer ${ token }` } } );
		if ( ! res.ok ) {
			throw new Error( `Strapi ${ res.status } for ${ path }: ${ ( await res.text() ).slice( 0, 300 ) }` );
		}
		return res.json();
	}

	/** Every entry of a collection, drafts included. */
	async function all( collection ) {
		const items = [];
		for ( let page = 1; ; page++ ) {
			const json = await get(
				`/api/${ collection }?populate=*&publicationState=preview&pagination[page]=${ page }&pagination[pageSize]=${ PAGE_SIZE }`
			);
			items.push( ...unwrap( json.data ?? json ) );
			const pageCount = json.meta?.pagination?.pageCount ?? 1;
			if ( page >= pageCount ) {
				return items;
			}
		}
	}

	return {
		all,
		mediaUrl: ( media ) => ( /^https?:\/\//.test( media.url ) ? media.url : `${ base }${ media.url }` ),
	};
}

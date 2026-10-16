import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blocksToGutenberg, blocksToText, collectImages, renderInline } from './blocks.js';

const text = ( t, extra = {} ) => ( { type: 'text', text: t, ...extra } );
const p = ( ...children ) => ( { type: 'paragraph', children } );

test( 'paragraph becomes a paragraph block with escaped text', () => {
	assert.equal(
		blocksToGutenberg( [ p( text( 'Rial & Bol <3' ) ) ] ),
		'<!-- wp:paragraph -->\n<p>Rial &amp; Bol &lt;3</p>\n<!-- /wp:paragraph -->'
	);
} );

test( 'empty paragraphs, which Strapi leaves between blocks, are dropped', () => {
	assert.equal( blocksToGutenberg( [ p( text( '' ) ), p( text( '\n' ) ) ] ), '' );
} );

test( 'inline formats nest strong > em and links keep their formatting', () => {
	assert.equal( renderInline( [ text( 'Get Out', { bold: true, italic: true } ) ] ), '<strong><em>Get Out</em></strong>' );
	assert.equal(
		renderInline( [ { type: 'link', url: 'https://x.test/?a=1&b="2"', children: [ text( 'here', { italic: true } ) ] } ] ),
		'<a href="https://x.test/?a=1&amp;b=&quot;2&quot;"><em>here</em></a>'
	);
	assert.equal( renderInline( [ text( 'a\nb' ) ] ), 'a<br>b' );
} );

test( 'h2 has no level attribute, other levels do', () => {
	assert.equal(
		blocksToGutenberg( [ { type: 'heading', level: 2, children: [ text( 'Verdict' ) ] } ] ),
		'<!-- wp:heading -->\n<h2 class="wp-block-heading">Verdict</h2>\n<!-- /wp:heading -->'
	);
	assert.match( blocksToGutenberg( [ { type: 'heading', level: 3, children: [ text( 'x' ) ] } ] ), /^<!-- wp:heading \{"level":3\} -->\n<h3 class="wp-block-heading">x<\/h3>/ );
} );

test( 'ordered list with a nested sub-list', () => {
	const html = blocksToGutenberg( [
		{
			type: 'list',
			format: 'ordered',
			children: [
				{ type: 'list-item', children: [ text( 'One' ) ] },
				{ type: 'list', format: 'unordered', children: [ { type: 'list-item', children: [ text( 'One a' ) ] } ] },
			],
		},
	] );
	assert.equal(
		html,
		'<!-- wp:list {"ordered":true} -->\n<ol class="wp-block-list"><!-- wp:list-item -->\n<li>One' +
			'<!-- wp:list -->\n<ul class="wp-block-list"><!-- wp:list-item -->\n<li>One a</li>\n<!-- /wp:list-item --></ul>\n<!-- /wp:list -->' +
			'</li>\n<!-- /wp:list-item --></ol>\n<!-- /wp:list -->'
	);
} );

test( 'quote wraps an inner paragraph block', () => {
	assert.equal(
		blocksToGutenberg( [ { type: 'quote', children: [ text( 'Said no one ever…' ) ] } ] ),
		'<!-- wp:quote -->\n<blockquote class="wp-block-quote"><!-- wp:paragraph -->\n<p>Said no one ever…</p>\n<!-- /wp:paragraph --></blockquote>\n<!-- /wp:quote -->'
	);
} );

test( 'images use the uploaded attachment, and are skipped if the upload failed', () => {
	const node = { type: 'image', image: { id: 7, url: '/uploads/a.jpg', alternativeText: 'A "still"' } };
	assert.equal(
		blocksToGutenberg( [ node ], () => ( { id: 42, url: 'https://wp.test/a.jpg' } ) ),
		'<!-- wp:image {"id":42,"sizeSlug":"full","linkDestination":"none"} -->\n' +
			'<figure class="wp-block-image size-full"><img src="https://wp.test/a.jpg" alt="A &quot;still&quot;" class="wp-image-42"/></figure>\n<!-- /wp:image -->'
	);
	assert.equal( blocksToGutenberg( [ node ] ), '' );
	assert.deepEqual( collectImages( [ node, p( text( 'x' ) ) ] ), [ node.image ] );
} );

test( 'unknown and null content is ignored', () => {
	assert.equal( blocksToGutenberg( null ), '' );
	assert.equal( blocksToGutenberg( [ { type: 'mystery' } ] ), '' );
} );

test( 'blocksToText flattens to paragraphs for the author bio', () => {
	assert.equal(
		blocksToText( [
			p( text( 'Hi, ' ), { type: 'link', url: '#', children: [ text( 'me' ) ] } ),
			{ type: 'list', format: 'unordered', children: [ { type: 'list-item', children: [ text( 'films' ) ] } ] },
		] ),
		'Hi, me\n\n• films'
	);
} );

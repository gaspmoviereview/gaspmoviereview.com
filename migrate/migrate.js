#!/usr/bin/env node
/**
 * Copies Gasp Movie Review content from Strapi into WordPress.
 *
 * Genres, authors (as users), pages and reviews, with their images. Slugs are kept so URLs don't change.
 * Safe to re-run: records are matched by slug and updated, and uploaded images are remembered in
 * migrate/.state.<host>.json so they aren't uploaded twice.
 *
 * Usage (see README.md):
 *   STRAPI_TOKEN=… WP_APP_PASSWORD=… npm run migrate [-- --dry-run]
 */
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { blocksToGutenberg, blocksToText, collectImages } from './blocks.js';
import { createStrapiClient } from './strapi.js';
import { createWordPressClient } from './wordpress.js';

const dir = fileURLToPath( new URL( '.', import.meta.url ) );
const dryRun = process.argv.includes( '--dry-run' );

const config = {
	strapiUrl: process.env.STRAPI_URL || 'https://api.gaspmoviereview.com',
	strapiToken: process.env.STRAPI_TOKEN,
	wpUrl: process.env.WP_URL || 'http://localhost:8888',
	wpUser: process.env.WP_USER || 'admin',
	wpAppPassword: process.env.WP_APP_PASSWORD,
	authorRole: process.env.AUTHOR_ROLE || 'editor',
	authorEmailDomain: process.env.AUTHOR_EMAIL_DOMAIN || 'gaspmoviereview.com',
};

const missing = [ [ 'STRAPI_TOKEN', config.strapiToken ], ...( dryRun ? [] : [ [ 'WP_APP_PASSWORD', config.wpAppPassword ] ] ) ]
	.filter( ( [ , v ] ) => ! v )
	.map( ( [ k ] ) => k );
if ( missing.length ) {
	console.error( `Missing environment variables: ${ missing.join( ', ' ) }. See README.md.` );
	process.exit( 1 );
}

const strapi = createStrapiClient( { url: config.strapiUrl, token: config.strapiToken } );
const wp = createWordPressClient( { url: config.wpUrl, user: config.wpUser, appPassword: config.wpAppPassword || '' } );

// Optional { "author-slug": "real@email" } so authors can log in with their own address.
const authorsFile = `${ dir }authors.json`;
const authorEmails = existsSync( authorsFile ) ? JSON.parse( readFileSync( authorsFile, 'utf8' ) ) : {};

const stateFile = `${ dir }.state.${ new URL( config.wpUrl ).host.replace( /[^a-z0-9.-]/gi, '_' ) }.json`;
const state = existsSync( stateFile ) ? JSON.parse( readFileSync( stateFile, 'utf8' ) ) : { media: {} };
const saveState = () => writeFileSync( stateFile, `${ JSON.stringify( state, null, 2 ) }\n` );

const log = ( ...args ) => console.log( ...args );
const warnings = [];
const warn = ( message ) => {
	warnings.push( message );
	console.warn( `  ⚠ ${ message }` );
};

/** Upload a Strapi media object once; later calls return the cached attachment. */
async function importMedia( media ) {
	if ( ! media?.url ) {
		return undefined;
	}
	const key = String( media.id ?? media.url );
	if ( state.media[ key ] ) {
		return state.media[ key ];
	}
	if ( dryRun ) {
		return { id: 0, url: strapi.mediaUrl( media ) };
	}
	try {
		const res = await fetch( strapi.mediaUrl( media ) );
		if ( ! res.ok ) {
			throw new Error( `download ${ res.status }` );
		}
		const uploaded = await wp.uploadMedia( {
			bytes: new Uint8Array( await res.arrayBuffer() ),
			filename: media.name || `${ media.hash }${ media.ext }`,
			mime: media.mime || res.headers.get( 'content-type' ) || 'application/octet-stream',
			altText: media.alternativeText,
			caption: media.caption,
		} );
		state.media[ key ] = uploaded;
		saveState();
		return uploaded;
	} catch ( error ) {
		warn( `Image ${ media.url } not imported: ${ error.message }` );
		return undefined;
	}
}

/** Upload every image a body uses, then convert it with the uploaded URLs. */
async function convertContent( blocks ) {
	const resolved = new Map();
	for ( const image of collectImages( blocks ) ) {
		resolved.set( image, await importMedia( image ) );
	}
	return blocksToGutenberg( blocks, ( image ) => resolved.get( image ) );
}

/**
 * Publish date, plus Strapi's last-updated date (applied by the plugin's migration-support.php,
 * since WordPress would otherwise stamp every entry as updated today).
 */
function originalDates( entry ) {
	return {
		...( entry.publishedAt ? { date_gmt: entry.publishedAt.replace( /\.\d+Z$/, '' ) } : {} ),
		...( entry.updatedAt ? { gasp_modified_gmt: entry.updatedAt } : {} ),
	};
}

async function save( route, slug, data, options ) {
	if ( dryRun ) {
		log( `  · would save ${ route }/${ slug }` );
		return { id: 0 };
	}
	const { record, created } = await wp.upsert( route, slug, data, options );
	log( `  ${ created ? '+ created' : '~ updated' } ${ route }/${ slug } (#${ record.id })` );
	return record;
}

async function migrateGenres( genres ) {
	log( `\nGenres (${ genres.length })` );
	const ids = new Map();
	for ( const genre of genres ) {
		const record = await save( 'genre', genre.slug, { name: genre.title } );
		ids.set( genre.slug, record.id );
	}
	return ids;
}

async function migrateAuthors( authors ) {
	log( `\nAuthors (${ authors.length })` );
	const ids = new Map();
	for ( const author of authors ) {
		const image = await importMedia( author.featuredImage );
		const profile = {
			name: author.name,
			nickname: author.name,
			description: blocksToText( author.content ),
			meta: { gasp_tagline: author.tagline || '', gasp_image: image?.id || 0 },
		};

		if ( dryRun ) {
			log( `  · would save users/${ author.slug }` );
			continue;
		}

		const [ existing ] = await wp.request( `/wp/v2/users?slug=${ encodeURIComponent( author.slug ) }&context=edit` );
		if ( existing ) {
			await wp.request( `/wp/v2/users/${ existing.id }`, { method: 'POST', body: profile } );
			log( `  ~ updated users/${ author.slug } (#${ existing.id })` );
			ids.set( author.slug, existing.id );
			continue;
		}

		const email = authorEmails[ author.slug ] || `${ author.slug }@${ config.authorEmailDomain }`;
		const user = await wp.request( '/wp/v2/users', {
			method: 'POST',
			body: {
				...profile,
				username: author.slug,
				slug: author.slug,
				email,
				password: randomBytes( 24 ).toString( 'base64url' ),
				roles: [ config.authorRole ],
			},
		} );
		log( `  + created users/${ author.slug } (#${ user.id }, ${ email }). Use "Lost your password?" to log in.` );
		ids.set( author.slug, user.id );
	}
	return ids;
}

async function migratePages( pages ) {
	log( `\nPages (${ pages.length })` );
	for ( const page of pages ) {
		const image = await importMedia( page.featuredImage );
		await save(
			'pages',
			page.slug,
			{
				title: page.title,
				excerpt: page.description || '',
				content: await convertContent( page.content ),
				status: page.publishedAt ? 'publish' : 'draft',
				...originalDates( page ),
				featured_media: image?.id || 0,
				meta: { gasp_is_contact: Boolean( page.isContact ) },
			},
			{ anyStatus: true }
		);
	}
}

async function migrateReviews( reviews, genreIds, authorIds ) {
	log( `\nReviews (${ reviews.length })` );
	const ids = new Map();

	for ( const review of reviews ) {
		const image = await importMedia( review.featuredImage );
		const authorId = authorIds.get( review.author?.slug );
		if ( review.author && ! authorId && ! dryRun ) {
			warn( `${ review.slug }: author "${ review.author.slug }" not found; leaving the importing user as author` );
		}
		const gasp = review.gaspFactor || {};

		const record = await save(
			'review',
			review.slug,
			{
				title: review.title,
				excerpt: review.description || '',
				content: await convertContent( review.content ),
				status: review.publishedAt ? 'publish' : 'draft',
				...originalDates( review ),
				featured_media: image?.id || 0,
				genre: ( review.genres || [] ).map( ( g ) => genreIds.get( g.slug ) ).filter( Boolean ),
				...( authorId ? { author: authorId } : {} ),
				meta: {
					gasp_suspense: gasp.suspense ?? 50,
					gasp_scariness: gasp.scariness ?? 50,
					gasp_bloodiness: gasp.bloodiness ?? 50,
					gasp_triggers: review.triggers || '',
				},
			},
			{ anyStatus: true }
		);
		ids.set( review.slug, record.id );
	}

	// Second pass: every review now exists, so related links can point at WordPress IDs.
	log( '\nRelated reviews' );
	for ( const review of reviews ) {
		const related = ( review.relatedReviews || [] ).map( ( r ) => ids.get( r.slug ) ).filter( Boolean );
		if ( ! related.length || dryRun ) {
			continue;
		}
		await wp.request( `/wp/v2/review/${ ids.get( review.slug ) }`, {
			method: 'POST',
			body: { meta: { gasp_related: related }, ...originalDates( review ) },
		} );
		log( `  ~ ${ review.slug } → ${ related.length } related` );
	}
}

async function main() {
	log( `${ dryRun ? 'DRY RUN: ' : '' }${ config.strapiUrl } → ${ config.wpUrl }` );
	if ( ! dryRun ) {
		await wp.checkTarget();
	}

	const [ genres, authors, pages, reviews ] = await Promise.all(
		[ 'genres', 'authors', 'pages', 'reviews' ].map( ( c ) => strapi.all( c ) )
	);

	const genreIds = await migrateGenres( genres );
	const authorIds = await migrateAuthors( authors );
	await migratePages( pages );
	await migrateReviews( reviews, genreIds, authorIds );

	log( `\nDone: ${ genres.length } genres, ${ authors.length } authors, ${ pages.length } pages, ${ reviews.length } reviews.` );
	if ( warnings.length ) {
		log( `${ warnings.length } warning(s) above.` );
		process.exitCode = 1;
	}
}

main().catch( ( error ) => {
	console.error( `\n✖ ${ error.message }` );
	process.exit( 1 );
} );

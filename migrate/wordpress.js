/**
 * Minimal WordPress REST client authenticated with an application password.
 */

const ANY_STATUS = 'publish,future,draft,pending,private';

export function createWordPressClient( { url, user, appPassword } ) {
	const base = `${ url.replace( /\/$/, '' ) }/wp-json`;
	const auth = `Basic ${ Buffer.from( `${ user }:${ appPassword.replace( /\s+/g, '' ) }` ).toString( 'base64' ) }`;

	async function request( path, { method = 'GET', body, headers = {} } = {} ) {
		const isJson = body && ! ( body instanceof Uint8Array );
		const res = await fetch( `${ base }${ path }`, {
			method,
			headers: { authorization: auth, ...( isJson ? { 'content-type': 'application/json' } : {} ), ...headers },
			body: isJson ? JSON.stringify( body ) : body,
		} );
		const text = await res.text();
		if ( ! res.ok ) {
			throw new Error( `WordPress ${ res.status } ${ method } ${ path }: ${ text.slice( 0, 400 ) }` );
		}
		return text ? JSON.parse( text ) : null;
	}

	/** Find by slug, then create or update, so the migration can be re-run safely. */
	async function upsert( route, slug, data, { anyStatus = false } = {} ) {
		const status = anyStatus ? `&status=${ ANY_STATUS }` : '';
		const [ existing ] = await request( `/wp/v2/${ route }?slug=${ encodeURIComponent( slug ) }&context=edit${ status }` );
		return existing
			? { record: await request( `/wp/v2/${ route }/${ existing.id }`, { method: 'POST', body: data } ), created: false }
			: { record: await request( `/wp/v2/${ route }`, { method: 'POST', body: { slug, ...data } } ), created: true };
	}

	async function uploadMedia( { bytes, filename, mime, altText, caption } ) {
		const media = await request( '/wp/v2/media', {
			method: 'POST',
			body: bytes,
			headers: {
				'content-type': mime,
				'content-disposition': `attachment; filename="${ filename.replace( /"/g, '' ) }"`,
			},
		} );
		if ( altText || caption ) {
			await request( `/wp/v2/media/${ media.id }`, { method: 'POST', body: { alt_text: altText || '', caption: caption || '' } } );
		}
		return { id: media.id, url: media.source_url };
	}

	/**
	 * Fail early, with a useful message, if WP_URL isn't a WordPress site running the Gasp Reviews
	 * plugin (e.g. DNS still points at the old Next.js host).
	 */
	async function checkTarget() {
		const res = await fetch( `${ base }/wp/v2/types/review` ).catch( ( error ) => {
			throw new Error( `Couldn't reach ${ url }: ${ error.message }` );
		} );
		const isJson = ( res.headers.get( 'content-type' ) || '' ).includes( 'application/json' );
		if ( ! isJson ) {
			throw new Error(
				`${ url } isn't answering as WordPress (got ${ res.status } ${ res.headers.get( 'content-type' ) || 'no content type' }). ` +
					'If DNS still points at the old site, see "Deploying to cPanel" in README.md.'
			);
		}
		if ( res.status === 404 ) {
			throw new Error( `${ url } is WordPress, but the Gasp Reviews plugin isn't active. Activate it under Plugins first.` );
		}
		await request( '/wp/v2/users/me?context=edit' ).catch( ( error ) => {
			throw new Error( `WordPress rejected the login for "${ user }". Check WP_USER and WP_APP_PASSWORD. (${ error.message.slice( 0, 120 ) })` );
		} );
	}

	return { request, upsert, uploadMedia, checkTarget };
}

<?php
/**
 * Authors are WordPress users. This adds the tagline and portrait the theme shows,
 * and serves author pages at /authors/{slug} as the old site did.
 * The bio is the user's built-in "Biographical Info".
 */

defined( 'ABSPATH' ) || exit;

const GASP_AUTHOR_BASE        = 'authors';
const GASP_AUTHOR_TAGLINE_KEY = 'gasp_tagline';
const GASP_AUTHOR_IMAGE_KEY   = 'gasp_image';

function gasp_reviews_set_author_base(): void {
	global $wp_rewrite;
	$wp_rewrite->author_base = GASP_AUTHOR_BASE;
}
add_action( 'init', 'gasp_reviews_set_author_base' );

function gasp_reviews_can_edit_user_meta( bool $allowed, string $meta_key, int $user_id ): bool {
	return current_user_can( 'edit_user', $user_id );
}

add_action(
	'init',
	static function (): void {
		register_meta(
			'user',
			GASP_AUTHOR_TAGLINE_KEY,
			array(
				'type'              => 'string',
				'single'            => true,
				'default'           => '',
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => 'gasp_reviews_can_edit_user_meta',
			)
		);
		register_meta(
			'user',
			GASP_AUTHOR_IMAGE_KEY,
			array(
				'type'              => 'integer',
				'single'            => true,
				'default'           => 0,
				'show_in_rest'      => true,
				'sanitize_callback' => 'absint',
				'auth_callback'     => 'gasp_reviews_can_edit_user_meta',
			)
		);
	}
);

/**
 * @return array{tagline: string, image_id: int}
 */
function gasp_reviews_get_author_profile( int $user_id ): array {
	return array(
		'tagline'  => (string) get_user_meta( $user_id, GASP_AUTHOR_TAGLINE_KEY, true ),
		'image_id' => (int) get_user_meta( $user_id, GASP_AUTHOR_IMAGE_KEY, true ),
	);
}

function gasp_reviews_render_profile_fields( WP_User $user ): void {
	$profile = gasp_reviews_get_author_profile( $user->ID );
	wp_enqueue_media();
	?>
	<h2><?php esc_html_e( 'Author page', 'gasp-reviews' ); ?></h2>
	<table class="form-table" role="presentation">
		<tr>
			<th><label for="gasp-tagline"><?php esc_html_e( 'Tagline', 'gasp-reviews' ); ?></label></th>
			<td>
				<input type="text" class="regular-text" id="gasp-tagline" name="<?php echo esc_attr( GASP_AUTHOR_TAGLINE_KEY ); ?>" value="<?php echo esc_attr( $profile['tagline'] ); ?>">
				<p class="description"><?php esc_html_e( 'Shown under your name, e.g. “Writer and film enthusiast”.', 'gasp-reviews' ); ?></p>
			</td>
		</tr>
		<tr>
			<th><?php esc_html_e( 'Portrait', 'gasp-reviews' ); ?></th>
			<td>
				<div id="gasp-image-preview"><?php echo $profile['image_id'] ? wp_get_attachment_image( $profile['image_id'], 'thumbnail' ) : ''; ?></div>
				<input type="hidden" id="gasp-image" name="<?php echo esc_attr( GASP_AUTHOR_IMAGE_KEY ); ?>" value="<?php echo esc_attr( (string) $profile['image_id'] ); ?>">
				<button type="button" class="button" id="gasp-image-choose"><?php esc_html_e( 'Choose portrait', 'gasp-reviews' ); ?></button>
				<button type="button" class="button-link" id="gasp-image-remove"><?php esc_html_e( 'Remove', 'gasp-reviews' ); ?></button>
			</td>
		</tr>
	</table>
	<script>
	( function () {
		const input = document.getElementById( 'gasp-image' );
		const preview = document.getElementById( 'gasp-image-preview' );
		let frame;
		document.getElementById( 'gasp-image-choose' ).addEventListener( 'click', function () {
			frame = frame || wp.media( { title: <?php echo wp_json_encode( __( 'Choose portrait', 'gasp-reviews' ) ); ?>, library: { type: 'image' }, multiple: false } );
			frame.off( 'select' ).on( 'select', function () {
				const image = frame.state().get( 'selection' ).first().toJSON();
				const src = ( image.sizes && image.sizes.thumbnail ? image.sizes.thumbnail : image ).url;
				input.value = image.id;
				preview.replaceChildren( Object.assign( document.createElement( 'img' ), { src: src, alt: '' } ) );
			} );
			frame.open();
		} );
		document.getElementById( 'gasp-image-remove' ).addEventListener( 'click', function () {
			input.value = '0';
			preview.replaceChildren();
		} );
	} )();
	</script>
	<?php
}
add_action( 'show_user_profile', 'gasp_reviews_render_profile_fields' );
add_action( 'edit_user_profile', 'gasp_reviews_render_profile_fields' );

function gasp_reviews_save_profile_fields( int $user_id ): void {
	// Core has already verified the update-user nonce before these hooks fire.
	if ( ! current_user_can( 'edit_user', $user_id ) ) {
		return;
	}
	// phpcs:disable WordPress.Security.NonceVerification.Missing
	if ( isset( $_POST[ GASP_AUTHOR_TAGLINE_KEY ] ) ) {
		update_user_meta( $user_id, GASP_AUTHOR_TAGLINE_KEY, sanitize_text_field( wp_unslash( $_POST[ GASP_AUTHOR_TAGLINE_KEY ] ) ) );
	}
	if ( isset( $_POST[ GASP_AUTHOR_IMAGE_KEY ] ) ) {
		update_user_meta( $user_id, GASP_AUTHOR_IMAGE_KEY, absint( $_POST[ GASP_AUTHOR_IMAGE_KEY ] ) );
	}
	// phpcs:enable
}
add_action( 'personal_options_update', 'gasp_reviews_save_profile_fields' );
add_action( 'edit_user_profile_update', 'gasp_reviews_save_profile_fields' );

<?php
/**
 * Lets the Strapi migration keep each entry's original "last updated" date.
 *
 * WordPress always stamps post_modified with the current time on save, and the REST API has no
 * way to set it. The migration sends `gasp_modified_gmt` alongside the post; this applies it.
 */

defined( 'ABSPATH' ) || exit;

const GASP_MODIFIED_PARAM = 'gasp_modified_gmt';

/**
 * @param string|null $set GMT datetime to apply to the next insert, or null to read and clear it.
 */
function gasp_reviews_pending_modified( ?string $set = null ): ?string {
	static $pending = null;
	if ( null !== $set ) {
		$pending = $set;
		return null;
	}
	$value   = $pending;
	$pending = null;
	return $value;
}

foreach ( array( GASP_REVIEW_POST_TYPE, 'page' ) as $gasp_post_type ) {
	add_filter(
		"rest_pre_insert_{$gasp_post_type}",
		static function ( stdClass $prepared, WP_REST_Request $request ): stdClass {
			$modified  = $request->get_param( GASP_MODIFIED_PARAM );
			// Expects ISO 8601 with a zone, as Strapi sends it (2025-10-21T09:20:00.000Z).
			$timestamp = is_string( $modified ) ? strtotime( $modified ) : false;
			if ( $timestamp && current_user_can( 'edit_others_posts' ) ) {
				gasp_reviews_pending_modified( gmdate( 'Y-m-d H:i:s', $timestamp ) );
			}
			return $prepared;
		},
		10,
		2
	);
}
unset( $gasp_post_type );

add_filter(
	'wp_insert_post_data',
	static function ( array $data ): array {
		$modified_gmt = gasp_reviews_pending_modified();
		if ( $modified_gmt ) {
			$data['post_modified_gmt'] = $modified_gmt;
			$data['post_modified']     = get_date_from_gmt( $modified_gmt );
		}
		return $data;
	},
	99
);

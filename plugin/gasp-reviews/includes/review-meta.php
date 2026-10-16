<?php
/**
 * Review and page fields, registered so the block editor and REST API (used by the migration) can read and write them.
 */

defined( 'ABSPATH' ) || exit;

const GASP_TRIGGERS_KEY   = 'gasp_triggers';
const GASP_RELATED_KEY    = 'gasp_related';
const GASP_IS_CONTACT_KEY = 'gasp_is_contact';

function gasp_reviews_can_edit_meta( bool $allowed, string $meta_key, int $post_id ): bool {
	return current_user_can( 'edit_post', $post_id );
}

/**
 * Keep only IDs of existing reviews, in the chosen order, without duplicates.
 * Sanitize callbacks aren't told which post they're saving, so a review listing itself is filtered out on read instead.
 *
 * @return int[]
 */
function gasp_reviews_sanitize_related( mixed $value ): array {
	if ( ! is_array( $value ) ) {
		return array();
	}
	$ids = array_unique( array_map( 'absint', $value ) );

	return array_values(
		array_filter(
			$ids,
			static fn ( int $id ): bool => $id && GASP_REVIEW_POST_TYPE === get_post_type( $id )
		)
	);
}

function gasp_reviews_register_meta(): void {
	foreach ( array_keys( gasp_reviews_stats() ) as $key ) {
		register_post_meta(
			GASP_REVIEW_POST_TYPE,
			$key,
			array(
				'type'              => 'integer',
				'single'            => true,
				'default'           => GASP_STAT_DEFAULT,
				'show_in_rest'      => array(
					'schema' => array(
						'minimum' => GASP_STAT_MIN,
						'maximum' => GASP_STAT_MAX,
					),
				),
				'sanitize_callback' => 'gasp_reviews_clamp_stat',
				'auth_callback'     => 'gasp_reviews_can_edit_meta',
			)
		);
	}

	register_post_meta(
		GASP_REVIEW_POST_TYPE,
		GASP_TRIGGERS_KEY,
		array(
			'type'              => 'string',
			'single'            => true,
			'default'           => '',
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => 'gasp_reviews_can_edit_meta',
		)
	);

	register_post_meta(
		GASP_REVIEW_POST_TYPE,
		GASP_RELATED_KEY,
		array(
			'type'              => 'array',
			'single'            => true,
			'default'           => array(),
			'show_in_rest'      => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array( 'type' => 'integer' ),
				),
			),
			'sanitize_callback' => 'gasp_reviews_sanitize_related',
			'auth_callback'     => 'gasp_reviews_can_edit_meta',
		)
	);

	register_post_meta(
		'page',
		GASP_IS_CONTACT_KEY,
		array(
			'type'          => 'boolean',
			'single'        => true,
			'default'       => false,
			'show_in_rest'  => true,
			'auth_callback' => 'gasp_reviews_can_edit_meta',
		)
	);
}
add_action( 'init', 'gasp_reviews_register_meta' );

/**
 * The derived score (gasp-factor.php) is a read-only REST field rather than registered meta,
 * because the editor posts every registered meta key back on save and a read-only key fails the save.
 */
add_action(
	'rest_api_init',
	static function (): void {
		register_rest_field(
			GASP_REVIEW_POST_TYPE,
			GASP_SCORE_KEY,
			array(
				'get_callback' => static fn ( array $post ): float => gasp_reviews_get_gasp_factor( $post['id'] )['score'],
				'schema'       => array(
					'type'     => 'number',
					'context'  => array( 'view', 'edit', 'embed' ),
					'readonly' => true,
				),
			)
		);
	}
);

/**
 * Related reviews in the order chosen, skipping any since deleted or unpublished.
 *
 * @return WP_Post[]
 */
function gasp_reviews_get_related( int|WP_Post|null $post = null ): array {
	$post_id = get_post( $post )?->ID ?? 0;
	$ids     = array_diff( array_map( 'absint', (array) get_post_meta( $post_id, GASP_RELATED_KEY, true ) ), array( $post_id ) );
	if ( ! $ids ) {
		return array();
	}
	return get_posts(
		array(
			'post_type'      => GASP_REVIEW_POST_TYPE,
			'post__in'       => array_values( $ids ),
			'orderby'        => 'post__in',
			'posts_per_page' => count( $ids ),
		)
	);
}

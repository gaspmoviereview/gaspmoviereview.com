<?php
/**
 * Review list sorting ("mood sort") and page sizes.
 */

defined( 'ABSPATH' ) || exit;

const GASP_REVIEWS_PER_PAGE = 24;
const GASP_SORT_PARAM       = 'sort';
const GASP_SORT_DEFAULT     = 'latest';

/**
 * Sort options in display order: id => [label, meta key ordered by (null = newest first), icon].
 *
 * @return array<string, array{label: string, meta: ?string, icon: ?string}>
 */
function gasp_theme_sorts(): array {
	return array(
		'latest'     => array( 'label' => __( 'Latest', 'gasp' ), 'meta' => null, 'icon' => null ),
		'score'      => array( 'label' => __( 'Highest Gasp', 'gasp' ), 'meta' => 'gasp_score', 'icon' => null ),
		'suspense'   => array( 'label' => __( 'Most suspense', 'gasp' ), 'meta' => 'gasp_suspense', 'icon' => GASP_STAT_ICONS['suspense'] ),
		'scariness'  => array( 'label' => __( 'Scariest', 'gasp' ), 'meta' => 'gasp_scariness', 'icon' => GASP_STAT_ICONS['scariness'] ),
		'bloodiness' => array( 'label' => __( 'Bloodiest', 'gasp' ), 'meta' => 'gasp_bloodiness', 'icon' => GASP_STAT_ICONS['bloodiness'] ),
	);
}

function gasp_theme_current_sort(): string {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only list ordering.
	$sort = isset( $_GET[ GASP_SORT_PARAM ] ) ? sanitize_key( $_GET[ GASP_SORT_PARAM ] ) : GASP_SORT_DEFAULT;
	return array_key_exists( $sort, gasp_theme_sorts() ) ? $sort : GASP_SORT_DEFAULT;
}

/**
 * A link to $base that keeps the current sort, or applies $sort when given.
 */
function gasp_theme_sort_url( string $base, ?string $sort = null ): string {
	$sort ??= gasp_theme_current_sort();
	return GASP_SORT_DEFAULT === $sort ? $base : add_query_arg( GASP_SORT_PARAM, $sort, $base );
}

add_action(
	'pre_get_posts',
	static function ( WP_Query $query ): void {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}

		if ( $query->is_post_type_archive( 'review' ) || $query->is_tax( 'genre' ) || $query->is_author() ) {
			$query->set( 'post_type', 'review' );
			$query->set( 'posts_per_page', GASP_REVIEWS_PER_PAGE );
		}

		if ( $query->is_post_type_archive( 'review' ) || $query->is_tax( 'genre' ) ) {
			$meta = gasp_theme_sorts()[ gasp_theme_current_sort() ]['meta'];
			if ( $meta ) {
				$query->set( 'meta_key', $meta );
				$query->set( 'orderby', array( 'meta_value_num' => 'DESC', 'date' => 'DESC' ) );
			}
		}
	}
);

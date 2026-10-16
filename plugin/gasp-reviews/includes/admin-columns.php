<?php
/**
 * A sortable Gasp Factor column on the Reviews list screen.
 */

defined( 'ABSPATH' ) || exit;

add_filter(
	'manage_' . GASP_REVIEW_POST_TYPE . '_posts_columns',
	static function ( array $columns ): array {
		$columns[ GASP_SCORE_KEY ] = __( 'Gasp Factor', 'gasp-reviews' );
		return $columns;
	}
);

add_action(
	'manage_' . GASP_REVIEW_POST_TYPE . '_posts_custom_column',
	static function ( string $column, int $post_id ): void {
		if ( GASP_SCORE_KEY !== $column ) {
			return;
		}
		$factor = gasp_reviews_get_gasp_factor( $post_id );
		printf(
			'<strong>%s</strong><br><small>%s</small>',
			esc_html( number_format( $factor['score'], 2 ) ),
			esc_html( sprintf( '%d%% · %d%% · %d%%', $factor['suspense'], $factor['scariness'], $factor['bloodiness'] ) )
		);
	},
	10,
	2
);

add_filter(
	'manage_edit-' . GASP_REVIEW_POST_TYPE . '_sortable_columns',
	static function ( array $columns ): array {
		$columns[ GASP_SCORE_KEY ] = GASP_SCORE_KEY;
		return $columns;
	}
);

add_action(
	'pre_get_posts',
	static function ( WP_Query $query ): void {
		if ( is_admin() && $query->is_main_query() && GASP_SCORE_KEY === $query->get( 'orderby' ) ) {
			$query->set( 'meta_key', GASP_SCORE_KEY );
			$query->set( 'orderby', 'meta_value_num' );
		}
	}
);

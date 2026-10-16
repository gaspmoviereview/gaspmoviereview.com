<?php
/**
 * The Gasp Factor: three 1–100 percentages and the score derived from them.
 *
 * Score = mean of the three stats / 10, to two decimals (97, 89, 55 → 8.03).
 */

defined( 'ABSPATH' ) || exit;

const GASP_STAT_MIN     = 1;
const GASP_STAT_MAX     = 100;
const GASP_STAT_DEFAULT = 50;
const GASP_SCORE_KEY    = 'gasp_score';

/**
 * Stat meta keys mapped to their display labels, in display order.
 *
 * @return array<string, string>
 */
function gasp_reviews_stats(): array {
	return array(
		'gasp_suspense'   => __( 'Suspense', 'gasp-reviews' ),
		'gasp_scariness'  => __( 'Scariness', 'gasp-reviews' ),
		'gasp_bloodiness' => __( 'Bloodiness', 'gasp-reviews' ),
	);
}

function gasp_reviews_clamp_stat( mixed $value ): int {
	if ( ! is_numeric( $value ) ) {
		return GASP_STAT_DEFAULT;
	}
	return max( GASP_STAT_MIN, min( GASP_STAT_MAX, (int) round( (float) $value ) ) );
}

/**
 * @param int[] $stats
 */
function gasp_reviews_calculate_score( array $stats ): float {
	if ( ! $stats ) {
		return 0.0;
	}
	return round( array_sum( $stats ) / count( $stats ) / 10, 2 );
}

/**
 * Everything the theme needs to render a Gasp Factor for one review.
 *
 * @return array{score: float, suspense: int, scariness: int, bloodiness: int}
 */
function gasp_reviews_get_gasp_factor( int|WP_Post|null $post = null ): array {
	$post_id = get_post( $post )?->ID ?? 0;
	$stats   = array();

	foreach ( array_keys( gasp_reviews_stats() ) as $key ) {
		$stats[ $key ] = gasp_reviews_clamp_stat( get_post_meta( $post_id, $key, true ) );
	}

	return array(
		'score'      => gasp_reviews_calculate_score( array_values( $stats ) ),
		'suspense'   => $stats['gasp_suspense'],
		'scariness'  => $stats['gasp_scariness'],
		'bloodiness' => $stats['gasp_bloodiness'],
	);
}

/**
 * Store the derived score so reviews can be sorted by it in a plain meta query.
 */
function gasp_reviews_refresh_score( int $post_id ): void {
	if ( GASP_REVIEW_POST_TYPE !== get_post_type( $post_id ) ) {
		return;
	}
	$factor = gasp_reviews_get_gasp_factor( $post_id );
	update_post_meta( $post_id, GASP_SCORE_KEY, $factor['score'] );
}

/**
 * Recalculate whenever any stat changes, however it was saved (editor, REST, WP-CLI, migration).
 *
 * @param int|int[] $meta_id A single ID for add/update, an array for delete.
 */
function gasp_reviews_on_stat_change( int|array $meta_id, int $post_id, string $meta_key ): void {
	if ( array_key_exists( $meta_key, gasp_reviews_stats() ) ) {
		gasp_reviews_refresh_score( $post_id );
	}
}
add_action( 'added_post_meta', 'gasp_reviews_on_stat_change', 10, 3 );
add_action( 'updated_post_meta', 'gasp_reviews_on_stat_change', 10, 3 );
add_action( 'deleted_post_meta', 'gasp_reviews_on_stat_change', 10, 3 );

/**
 * A review saved without touching every slider still needs all three stats and the score stored,
 * or it would drop out of lists sorted by them (meta ordering skips posts missing the key).
 */
add_action(
	'save_post_' . GASP_REVIEW_POST_TYPE,
	static function ( int $post_id ): void {
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}
		foreach ( array_keys( gasp_reviews_stats() ) as $key ) {
			if ( ! metadata_exists( 'post', $post_id, $key ) ) {
				add_post_meta( $post_id, $key, GASP_STAT_DEFAULT, true );
			}
		}
		if ( ! metadata_exists( 'post', $post_id, GASP_SCORE_KEY ) ) {
			gasp_reviews_refresh_score( $post_id );
		}
	}
);

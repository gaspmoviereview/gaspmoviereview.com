<?php
/**
 * All reviews and genre pages (ReviewsScreen): intro, a sticky glass bar of genre chips with
 * counts and mood sorts, then the card grid. Works without JavaScript: every chip is a link.
 */

defined( 'ABSPATH' ) || exit;

global $wp_query;

$gasp_term     = is_tax( 'genre' ) ? get_queried_object() : null;
$gasp_found    = (int) $wp_query->found_posts;
$gasp_all_link = (string) get_post_type_archive_link( 'review' );
$gasp_sort     = gasp_theme_current_sort();
$gasp_base     = $gasp_term ? (string) get_term_link( $gasp_term ) : $gasp_all_link;
$gasp_genres   = get_terms(
	array(
		'taxonomy'   => 'genre',
		'hide_empty' => true,
	)
);

if ( $gasp_term ) {
	$gasp_lede = sprintf(
		/* translators: 1: number of films, 2: genre name in lower case */
		_n( '%1$d film tagged %2$s. Sort by what you’re in the mood for.', '%1$d films tagged %2$s. Sort by what you’re in the mood for.', $gasp_found, 'gasp' ),
		$gasp_found,
		strtolower( $gasp_term->name )
	);
	$gasp_title = sprintf(
		/* translators: %s: genre name */
		__( '%s reviews', 'gasp' ),
		$gasp_term->name
	);
} else {
	$gasp_lede  = __( 'Find the right film for your mood: filter by genre, then sort by how suspenseful, scary or bloody you want your night to be.', 'gasp' );
	$gasp_title = __( 'All reviews', 'gasp' );
}

get_header();
?>
<main id="main">
	<?php echo gasp_theme_page_intro( $gasp_term ? __( 'Genre', 'gasp' ) : __( 'Reviews', 'gasp' ), esc_html( $gasp_title ), $gasp_term && $gasp_term->description ? wp_strip_all_tags( $gasp_term->description ) : $gasp_lede ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component. ?>

	<div class="filter-bar">
		<div class="filter-bar__inner container">
			<div class="filter-bar__row">
				<span class="filter-bar__label"><?php esc_html_e( 'Genre', 'gasp' ); ?></span>
				<div class="filter-bar__chips">
					<?php
					$gasp_total = (int) wp_count_posts( 'review' )->publish;
					/* translators: %d: number of reviews */
					echo gasp_theme_genre_tag( sprintf( __( 'All · %d', 'gasp' ), $gasp_total ), gasp_theme_sort_url( $gasp_all_link ), ! $gasp_term ); // phpcs:ignore WordPress.Security.EscapeOutput
					if ( ! is_wp_error( $gasp_genres ) ) {
						foreach ( $gasp_genres as $gasp_genre ) {
							echo gasp_theme_genre_tag( // phpcs:ignore WordPress.Security.EscapeOutput
								$gasp_genre->name . ' · ' . $gasp_genre->count,
								gasp_theme_sort_url( (string) get_term_link( $gasp_genre ) ),
								$gasp_term && $gasp_term->term_id === $gasp_genre->term_id
							);
						}
					}
					?>
				</div>
			</div>
			<div class="filter-bar__row">
				<span class="filter-bar__label"><?php esc_html_e( 'Sort', 'gasp' ); ?></span>
				<div class="filter-bar__chips">
					<?php
					foreach ( gasp_theme_sorts() as $gasp_id => $gasp_option ) {
						echo gasp_theme_genre_tag( $gasp_option['label'], gasp_theme_sort_url( $gasp_base, $gasp_id ), $gasp_id === $gasp_sort, (string) $gasp_option['icon'] ); // phpcs:ignore WordPress.Security.EscapeOutput
					}
					?>
				</div>
			</div>
		</div>
	</div>

	<section class="section section--tight container">
		<?php if ( have_posts() ) : ?>
			<?php echo gasp_theme_card_grid( $wp_query->posts ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<?php echo gasp_theme_pagination(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php else : ?>
			<p class="empty"><?php esc_html_e( 'No reviews in this genre yet.', 'gasp' ); ?></p>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

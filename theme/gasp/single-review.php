<?php
/**
 * Review detail (ReviewScreen): still hero with genres, title and byline; italic standfirst;
 * the body; the full Gasp Factor panel; triggers; related reviews.
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();
	$gasp_post   = get_post();
	$gasp_genres = get_the_terms( $gasp_post, 'genre' );

	$gasp_tags = '';
	if ( $gasp_genres && ! is_wp_error( $gasp_genres ) ) {
		foreach ( $gasp_genres as $gasp_genre ) {
			$gasp_tags .= gasp_theme_genre_tag( $gasp_genre->name, (string) get_term_link( $gasp_genre ) );
		}
	}

	$gasp_hero  = $gasp_tags ? '<div class="hero__tags">' . $gasp_tags . '</div>' : '';
	$gasp_hero .= '<h1 class="hero__title hero__title--review">' . gasp_theme_title_html( get_the_title() ) . '</h1>';
	$gasp_hero .= '<div class="hero__byline">' . gasp_theme_byline( $gasp_post ) . '</div>';

	$gasp_related = function_exists( 'gasp_reviews_get_related' ) ? gasp_reviews_get_related( $gasp_post ) : array();
	if ( ! $gasp_related ) {
		// Nothing picked in the editor: show the latest other reviews instead.
		$gasp_related = get_posts(
			array(
				'post_type'    => 'review',
				'numberposts'  => 3,
				'post__not_in' => array( $gasp_post->ID ),
			)
		);
	}
	$gasp_triggers = (string) get_post_meta( $gasp_post->ID, 'gasp_triggers', true );
	?>
	<main id="main">
		<?php echo gasp_theme_hero( (int) get_post_thumbnail_id(), $gasp_hero, 'review' ); // phpcs:ignore WordPress.Security.EscapeOutput -- built from escaped parts. ?>

		<article class="review">
			<div class="measure">
				<?php if ( has_excerpt() ) : ?>
					<p class="standfirst"><?php echo esc_html( get_the_excerpt() ); ?></p>
				<?php endif; ?>
				<div class="prose review__body">
					<?php the_content(); ?>
				</div>
			</div>

			<div class="review__gasp">
				<div class="panel panel--glow-left">
					<?php echo gasp_theme_gasp_full( gasp_theme_gasp( $gasp_post ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</div>

				<?php if ( $gasp_triggers ) : ?>
					<div class="review__facts">
						<div>
							<h2 class="eyebrow eyebrow--muted"><?php esc_html_e( 'Triggers', 'gasp' ); ?></h2>
							<p class="review__triggers"><?php echo esc_html( $gasp_triggers ); ?></p>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</article>

		<?php if ( $gasp_related ) : ?>
			<section class="section container">
				<h2 class="section-title"><?php esc_html_e( 'Related reviews', 'gasp' ); ?></h2>
				<?php echo gasp_theme_card_grid( $gasp_related ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</section>
		<?php endif; ?>
	</main>
	<?php
endwhile;

get_footer();

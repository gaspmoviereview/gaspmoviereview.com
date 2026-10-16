<?php
/**
 * Fallback for anything without its own template (search results, blog posts if ever used).
 */

defined( 'ABSPATH' ) || exit;

global $wp_query;

get_header();
?>
<main id="main">
	<?php
	if ( is_search() ) {
		/* translators: %s: search term */
		$gasp_title = sprintf( __( 'Results for “%s”', 'gasp' ), get_search_query() );
	} else {
		$gasp_title = is_archive() ? wp_strip_all_tags( get_the_archive_title() ) : get_bloginfo( 'name' );
	}
	echo gasp_theme_page_intro( is_search() ? __( 'Search', 'gasp' ) : __( 'Archive', 'gasp' ), esc_html( $gasp_title ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component.
	?>
	<section class="section section--tight container">
		<?php if ( have_posts() ) : ?>
			<?php
			$gasp_reviews = array_filter( $wp_query->posts, static fn ( WP_Post $p ): bool => 'review' === $p->post_type );
			$gasp_others  = array_diff_key( $wp_query->posts, $gasp_reviews );
			if ( $gasp_reviews ) {
				echo gasp_theme_card_grid( $gasp_reviews ); // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>
			<?php if ( $gasp_others ) : ?>
				<ul class="link-list">
					<?php foreach ( $gasp_others as $gasp_post ) : ?>
						<li><a href="<?php echo esc_url( get_permalink( $gasp_post ) ); ?>"><?php echo esc_html( get_the_title( $gasp_post ) ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<?php echo gasp_theme_pagination(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php else : ?>
			<p class="empty"><?php esc_html_e( 'Nothing found.', 'gasp' ); ?></p>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

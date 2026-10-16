<?php
/**
 * Pages: the contact page gets the contact layout; anything else is a simple reading page.
 */

defined( 'ABSPATH' ) || exit;

if ( get_post_meta( get_queried_object_id(), 'gasp_is_contact', true ) ) {
	get_template_part( 'template-parts/contact' );
	return;
}

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<main id="main">
		<?php echo gasp_theme_page_intro( get_bloginfo( 'name' ), esc_html( get_the_title() ), has_excerpt() ? get_the_excerpt() : '' ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component. ?>
		<div class="measure section section--tight">
			<div class="prose"><?php the_content(); ?></div>
		</div>
	</main>
	<?php
endwhile;

get_footer();

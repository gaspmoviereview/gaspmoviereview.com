<?php
/**
 * Author (AuthorScreen): portrait with a navy glow, name, tagline and bio, then their reviews.
 */

defined( 'ABSPATH' ) || exit;

global $wp_query;

$gasp_author = get_queried_object();
$gasp_first  = strtok( $gasp_author->display_name, ' ' );
$gasp_handle = gasp_theme_instagram_handle();

get_header();
?>
<main id="main">
	<section class="split container author-intro">
		<div class="author-intro__photo">
			<?php echo gasp_theme_author_avatar( $gasp_author->ID, 'gasp-portrait', 'author-intro__image' ); // phpcs:ignore WordPress.Security.EscapeOutput -- core image markup. ?>
		</div>
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Author', 'gasp' ); ?></p>
			<h1 class="page-title"><?php echo esc_html( $gasp_author->display_name ); ?></h1>
			<p class="author-intro__role"><?php echo esc_html( gasp_theme_author_tagline( $gasp_author->ID ) ); ?></p>
			<div class="prose author-intro__bio"><?php echo wp_kses_post( wpautop( $gasp_author->description ) ); ?></div>
			<?php if ( $gasp_handle ) : ?>
				<div class="social-row"><?php echo gasp_theme_social_button(); // phpcs:ignore WordPress.Security.EscapeOutput ?><span class="social-row__handle"><?php echo esc_html( $gasp_handle ); ?></span></div>
			<?php endif; ?>
		</div>
	</section>

	<section class="section container">
		<?php
		/* translators: %s: author's first name */
		echo gasp_theme_section_head( '<h2 class="section-title section-title--flush">' . esc_html( sprintf( __( 'Reviews by %s', 'gasp' ), $gasp_first ) ) . '</h2>', (int) $wp_query->found_posts ); // phpcs:ignore WordPress.Security.EscapeOutput
		?>
		<?php if ( have_posts() ) : ?>
			<?php echo gasp_theme_card_grid( $wp_query->posts ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<?php echo gasp_theme_pagination(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php else : ?>
			<p class="empty"><?php esc_html_e( 'No reviews yet.', 'gasp' ); ?></p>
		<?php endif; ?>
	</section>
</main>
<?php
get_footer();

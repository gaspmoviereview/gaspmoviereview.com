<?php
/**
 * SiteFooter: logo, tagline and Instagram; "Useful links" and "Genres" columns; navy glow.
 */

defined( 'ABSPATH' ) || exit;

$gasp_genres = get_terms(
	array(
		'taxonomy'   => 'genre',
		'hide_empty' => true,
	)
);
?>
<footer class="site-footer">
	<div class="site-footer__glow" aria-hidden="true"></div>
	<div class="site-footer__inner container">
		<div class="site-footer__grid">
			<div class="site-footer__brand">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.png' ); ?>" width="120" height="65" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" loading="lazy">
				<p class="site-footer__tagline"><?php echo esc_html( gasp_theme_tagline() ); ?></p>
				<?php echo gasp_theme_social_button(); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component. ?>
			</div>

			<div>
				<h2 class="site-footer__heading"><?php esc_html_e( 'Useful links', 'gasp' ); ?></h2>
				<ul class="site-footer__links">
					<?php foreach ( gasp_theme_nav_links( 'footer' ) as $gasp_link ) : ?>
						<li><a href="<?php echo esc_url( $gasp_link['url'] ); ?>"><?php echo esc_html( $gasp_link['label'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<?php if ( ! is_wp_error( $gasp_genres ) && $gasp_genres ) : ?>
				<div>
					<h2 class="site-footer__heading"><?php esc_html_e( 'Genres', 'gasp' ); ?></h2>
					<ul class="site-footer__links">
						<?php foreach ( $gasp_genres as $gasp_genre ) : ?>
							<li><a href="<?php echo esc_url( get_term_link( $gasp_genre ) ); ?>"><?php echo esc_html( $gasp_genre->name ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>
		</div>

		<div class="site-footer__legal">
			<span>&copy; <?php echo esc_html( get_bloginfo( 'name' ) ); ?></span>
			<?php the_privacy_policy_link(); ?>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>

<?php
/**
 * SiteHeader: sticky glass bar, logo left, links right; collapses to a hamburger and
 * a full-width serif menu below 760px.
 */

defined( 'ABSPATH' ) || exit;

$gasp_links = gasp_theme_nav_links( 'primary' );
$gasp_logo  = get_template_directory_uri() . '/assets/images/logo.png';
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#05080d">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'gasp' ); ?></a>

<header class="site-header" data-menu>
	<div class="site-header__bar container">
		<a class="site-header__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( 'Back to home', 'gasp' ); ?>" rel="home">
			<img src="<?php echo esc_url( $gasp_logo ); ?>" width="58" height="31" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		</a>

		<nav class="site-nav" aria-label="<?php esc_attr_e( 'Main', 'gasp' ); ?>">
			<?php foreach ( $gasp_links as $gasp_link ) : ?>
				<a class="site-nav__link<?php echo $gasp_link['current'] ? ' is-current' : ''; ?>" href="<?php echo esc_url( $gasp_link['url'] ); ?>"<?php echo $gasp_link['current'] ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $gasp_link['label'] ); ?></a>
			<?php endforeach; ?>
		</nav>

		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>
			<span class="screen-reader-text"><?php esc_html_e( 'Menu', 'gasp' ); ?></span>
			<?php echo gasp_theme_icon( 'menu-2', 'menu-toggle__open' ); // phpcs:ignore WordPress.Security.EscapeOutput -- trusted local SVG. ?>
			<?php echo gasp_theme_icon( 'x', 'menu-toggle__close' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</button>
	</div>

	<nav class="mobile-nav container" id="mobile-nav" aria-label="<?php esc_attr_e( 'Main', 'gasp' ); ?>" hidden>
		<?php foreach ( $gasp_links as $gasp_link ) : ?>
			<a class="mobile-nav__link<?php echo $gasp_link['current'] ? ' is-current' : ''; ?>" href="<?php echo esc_url( $gasp_link['url'] ); ?>"><?php echo esc_html( $gasp_link['label'] ); ?></a>
		<?php endforeach; ?>
	</nav>
</header>

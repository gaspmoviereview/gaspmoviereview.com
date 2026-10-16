<?php
/**
 * Front-end styles and scripts.
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'wp_enqueue_scripts',
	static function (): void {
		$uri = get_template_directory_uri();
		wp_enqueue_style( 'gasp-tokens', $uri . '/assets/css/tokens.css', array(), GASP_THEME_VERSION );
		wp_enqueue_style( 'gasp-main', $uri . '/assets/css/main.css', array( 'gasp-tokens' ), GASP_THEME_VERSION );
		wp_enqueue_script( 'gasp-menu', $uri . '/assets/js/menu.js', array(), GASP_THEME_VERSION, array( 'strategy' => 'defer' ) );

		// No comments on this site, and the block library's classic-theme extras aren't used.
		wp_dequeue_style( 'classic-theme-styles' );
	}
);

/**
 * Preload the two fonts every page uses above the fold.
 */
add_action(
	'wp_head',
	static function (): void {
		$fonts = get_template_directory_uri() . '/assets/fonts/';
		foreach ( array( 'instrument-serif-latin-400-normal.woff2', 'geist-latin-wght-normal.woff2' ) as $file ) {
			printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( $fonts . $file ) );
		}
	},
	1
);

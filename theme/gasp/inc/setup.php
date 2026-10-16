<?php
/**
 * Theme supports, menus, image sizes, the Instagram setting and first-run site settings.
 */

defined( 'ABSPATH' ) || exit;

const GASP_DEFAULT_INSTAGRAM = 'https://www.instagram.com/gaspmoviereview';
const GASP_DEFAULT_TAGLINE   = 'Find films and tv-shows that will make you gasp.';

add_action(
	'after_setup_theme',
	static function (): void {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
		remove_theme_support( 'core-block-patterns' );

		// 16:10 cards (2× for retina at the ~400px card width) and full-bleed heroes.
		add_image_size( 'gasp-card', 800, 500, true );
		add_image_size( 'gasp-hero', 2400, 1350 );
		add_image_size( 'gasp-portrait', 880, 1100, true );

		register_nav_menus(
			array(
				'primary' => __( 'Header', 'gasp' ),
				'footer'  => __( 'Footer: useful links', 'gasp' ),
			)
		);

		add_editor_style( array( 'assets/css/tokens.css', 'assets/css/editor.css' ) );
	}
);

/**
 * Appearance → Customize → Social: the Instagram link used in the footer, contact and author pages.
 */
add_action(
	'customize_register',
	static function ( WP_Customize_Manager $customizer ): void {
		$customizer->add_section( 'gasp_social', array( 'title' => __( 'Social', 'gasp' ) ) );
		$customizer->add_setting(
			'gasp_instagram_url',
			array(
				'default'           => GASP_DEFAULT_INSTAGRAM,
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$customizer->add_control(
			'gasp_instagram_url',
			array(
				'label'   => __( 'Instagram URL', 'gasp' ),
				'section' => 'gasp_social',
				'type'    => 'url',
			)
		);
	}
);

function gasp_theme_instagram_url(): string {
	return (string) get_theme_mod( 'gasp_instagram_url', GASP_DEFAULT_INSTAGRAM );
}

function gasp_theme_instagram_handle(): string {
	$path = trim( (string) wp_parse_url( gasp_theme_instagram_url(), PHP_URL_PATH ), '/' );
	return $path ? '@' . $path : '';
}

function gasp_theme_tagline(): string {
	return get_bloginfo( 'description' ) ?: GASP_DEFAULT_TAGLINE;
}

/**
 * Use the migrated "home" page as the front page, unless a front page has already been chosen.
 */
function gasp_theme_use_home_as_front_page( ?WP_Post $home = null ): void {
	$home ??= get_page_by_path( 'home' );
	if ( $home && 'publish' === $home->post_status && 'posts' === get_option( 'show_on_front' ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home->ID );
	}
}

/**
 * On activation, set the front page and tagline so a fresh install looks right without visiting Settings.
 */
add_action(
	'after_switch_theme',
	static function (): void {
		gasp_theme_use_home_as_front_page();
		if ( in_array( get_option( 'blogdescription' ), array( '', 'Just another WordPress site' ), true ) ) {
			update_option( 'blogdescription', GASP_DEFAULT_TAGLINE );
		}
	}
);

/**
 * On a fresh site the theme is activated before the migration creates the Home page, so also
 * catch the moment that page is published.
 */
add_action(
	'save_post_page',
	static function ( int $post_id, WP_Post $post ): void {
		if ( 'home' === $post->post_name ) {
			gasp_theme_use_home_as_front_page( $post );
		}
	},
	10,
	2
);

/**
 * Warn in the admin if the content plugin is missing; the templates depend on it.
 */
add_action(
	'admin_notices',
	static function (): void {
		if ( function_exists( 'gasp_reviews_get_gasp_factor' ) ) {
			return;
		}
		printf(
			'<div class="notice notice-error"><p>%s</p></div>',
			esc_html__( 'The Gasp theme needs the Gasp Reviews plugin. Please activate it under Plugins.', 'gasp' )
		);
	}
);

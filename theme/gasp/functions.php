<?php
/**
 * Gasp theme: Gasp Movie Review v2 ("cinematic dark").
 *
 * Presentation only. The content model (reviews, genres, Gasp Factor, contact form handling)
 * lives in the Gasp Reviews plugin, which this theme requires.
 */

defined( 'ABSPATH' ) || exit;

define( 'GASP_THEME_VERSION', wp_get_theme()->get( 'Version' ) );

require_once __DIR__ . '/inc/setup.php';
require_once __DIR__ . '/inc/assets.php';
require_once __DIR__ . '/inc/icons.php';
require_once __DIR__ . '/inc/navigation.php';
require_once __DIR__ . '/inc/queries.php';
require_once __DIR__ . '/inc/components.php';
require_once __DIR__ . '/inc/seo.php';

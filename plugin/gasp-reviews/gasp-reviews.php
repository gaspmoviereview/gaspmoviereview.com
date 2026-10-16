<?php
/**
 * Plugin Name:       Gasp Reviews
 * Description:       Content model for Gasp Movie Review: the Review post type, Genres, the Gasp Factor scores, triggers, related reviews and author profile fields.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      8.1
 * Author:            Paul Singh
 * License:           GPL-2.0-or-later
 * Text Domain:       gasp-reviews
 *
 * The content model lives in a plugin, not the theme, so changing the theme can never orphan reviews.
 */

defined( 'ABSPATH' ) || exit;

define( 'GASP_REVIEWS_VERSION', '1.0.0' );
define( 'GASP_REVIEWS_FILE', __FILE__ );
define( 'GASP_REVIEWS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GASP_REVIEWS_URL', plugin_dir_url( __FILE__ ) );

require_once GASP_REVIEWS_DIR . 'includes/content-types.php';
require_once GASP_REVIEWS_DIR . 'includes/gasp-factor.php';
require_once GASP_REVIEWS_DIR . 'includes/review-meta.php';
require_once GASP_REVIEWS_DIR . 'includes/editor.php';
require_once GASP_REVIEWS_DIR . 'includes/admin-columns.php';
require_once GASP_REVIEWS_DIR . 'includes/authors.php';
require_once GASP_REVIEWS_DIR . 'includes/contact-form.php';
require_once GASP_REVIEWS_DIR . 'includes/migration-support.php';

register_activation_hook(
	__FILE__,
	static function () {
		gasp_reviews_register_content_types();
		gasp_reviews_set_author_base();
		flush_rewrite_rules();
	}
);

register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

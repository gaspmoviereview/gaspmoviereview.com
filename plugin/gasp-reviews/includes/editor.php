<?php
/**
 * Block editor set-up for reviews: the Gasp Factor / Triggers / Related sidebar and a short block list.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Blocks a review body can use. The theme only styles these, so nothing else is offered.
 */
const GASP_REVIEW_BLOCKS = array(
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/list-item',
	'core/quote',
	'core/image',
	'core/embed',
	'core/separator',
	'core/code',
);

add_action(
	'enqueue_block_editor_assets',
	static function (): void {
		if ( GASP_REVIEW_POST_TYPE !== get_current_screen()?->post_type ) {
			return;
		}
		wp_enqueue_script(
			'gasp-reviews-editor',
			GASP_REVIEWS_URL . 'assets/editor.js',
			array( 'wp-components', 'wp-core-data', 'wp-data', 'wp-editor', 'wp-element', 'wp-html-entities', 'wp-i18n', 'wp-plugins' ),
			GASP_REVIEWS_VERSION,
			true
		);
	}
);

add_filter(
	'allowed_block_types_all',
	static function ( bool|array $allowed, WP_Block_Editor_Context $context ): bool|array {
		return GASP_REVIEW_POST_TYPE === $context->post?->post_type ? GASP_REVIEW_BLOCKS : $allowed;
	},
	10,
	2
);

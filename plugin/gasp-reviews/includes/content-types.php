<?php
/**
 * Review post type and Genre taxonomy.
 *
 * URLs match the old Next.js site so nothing needs redirecting:
 * /reviews, /reviews/{slug}, /genre/{slug}.
 */

defined( 'ABSPATH' ) || exit;

const GASP_REVIEW_POST_TYPE = 'review';
const GASP_GENRE_TAXONOMY   = 'genre';

function gasp_reviews_register_content_types(): void {
	register_post_type(
		GASP_REVIEW_POST_TYPE,
		array(
			'labels'        => array(
				'name'                  => __( 'Reviews', 'gasp-reviews' ),
				'singular_name'         => __( 'Review', 'gasp-reviews' ),
				'add_new'               => __( 'New review', 'gasp-reviews' ),
				'add_new_item'          => __( 'New review', 'gasp-reviews' ),
				'edit_item'             => __( 'Edit review', 'gasp-reviews' ),
				'view_item'             => __( 'View review', 'gasp-reviews' ),
				'all_items'             => __( 'All reviews', 'gasp-reviews' ),
				'search_items'          => __( 'Search reviews', 'gasp-reviews' ),
				'not_found'             => __( 'No reviews found', 'gasp-reviews' ),
				'featured_image'        => __( 'Film still', 'gasp-reviews' ),
				'set_featured_image'    => __( 'Set film still', 'gasp-reviews' ),
				'remove_featured_image' => __( 'Remove film still', 'gasp-reviews' ),
				'use_featured_image'    => __( 'Use as film still', 'gasp-reviews' ),
			),
			'public'        => true,
			'show_in_rest'  => true,
			'menu_icon'     => 'dashicons-video-alt2',
			'menu_position' => 5,
			'has_archive'   => 'reviews',
			'rewrite'       => array(
				'slug'       => 'reviews',
				'with_front' => false,
			),
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions', 'custom-fields' ),
			// New reviews open with the body ready to type into.
			'template'      => array(
				array(
					'core/paragraph',
					array( 'placeholder' => __( 'Open with a hook… “Wouldn’t it be fun to…”', 'gasp-reviews' ) ),
				),
			),
		)
	);

	register_taxonomy(
		GASP_GENRE_TAXONOMY,
		GASP_REVIEW_POST_TYPE,
		array(
			'labels'            => array(
				'name'          => __( 'Genres', 'gasp-reviews' ),
				'singular_name' => __( 'Genre', 'gasp-reviews' ),
				'add_new_item'  => __( 'Add genre', 'gasp-reviews' ),
				'search_items'  => __( 'Search genres', 'gasp-reviews' ),
			),
			// Hierarchical gives the editor tick boxes instead of a free-text tag field.
			'hierarchical'      => true,
			'public'            => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'rewrite'           => array(
				'slug'       => 'genre',
				'with_front' => false,
			),
		)
	);

	// Strapi pages had a description used for SEO and the page intro.
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'gasp_reviews_register_content_types' );

/**
 * Show the "Title (Year)" convention where the title is typed.
 */
add_filter(
	'enter_title_here',
	static function ( string $placeholder, WP_Post $post ): string {
		return GASP_REVIEW_POST_TYPE === $post->post_type
			? __( 'Film title (Year)', 'gasp-reviews' )
			: $placeholder;
	},
	10,
	2
);

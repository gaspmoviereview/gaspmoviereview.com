<?php
/**
 * Header and footer links. Uses the menus from Appearance → Menus when they're set,
 * otherwise the design system's default links built from existing pages.
 */

defined( 'ABSPATH' ) || exit;

/**
 * @return array<int, array{label: string, url: string}>
 */
function gasp_theme_default_links( string $location ): array {
	// Short design-system labels, not page titles ("About Gasp Movie Review" is too long for the nav).
	$page_link = static fn ( ?WP_Post $page, string $label ): ?array =>
		$page && 'publish' === $page->post_status ? array( 'label' => $label, 'url' => get_permalink( $page ) ) : null;

	$reviews = array(
		'label' => __( 'Reviews', 'gasp' ),
		'url'   => (string) get_post_type_archive_link( 'review' ),
	);
	$about   = $page_link( get_page_by_path( 'about' ), __( 'About', 'gasp' ) );
	$contact = $page_link( gasp_theme_contact_page(), __( 'Contact', 'gasp' ) );

	if ( 'footer' === $location ) {
		return array_values( array_filter( array( $about, $reviews, $contact ) ) );
	}

	$author = gasp_theme_lead_author();
	$author = $author ? array( 'label' => __( 'Author', 'gasp' ), 'url' => get_author_posts_url( $author->ID ) ) : null;

	return array_values( array_filter( array( $reviews, $about, $author, $contact ) ) );
}

/**
 * @return array<int, array{label: string, url: string, current: bool}>
 */
function gasp_theme_nav_links( string $location ): array {
	$locations = get_nav_menu_locations();
	$items     = ! empty( $locations[ $location ] ) ? wp_get_nav_menu_items( $locations[ $location ] ) : false;

	$links = $items
		? array_map(
			static fn ( WP_Post $item ): array => array(
				'label' => $item->title,
				'url'   => $item->url,
			),
			array_filter( $items, static fn ( WP_Post $item ): bool => ! $item->menu_item_parent )
		)
		: gasp_theme_default_links( $location );

	return array_map(
		static fn ( array $link ): array => $link + array( 'current' => gasp_theme_is_current_url( $link['url'] ) ),
		array_values( $links )
	);
}

function gasp_theme_is_current_url( string $url ): bool {
	$normalise = static fn ( string $u ): string => untrailingslashit( (string) wp_parse_url( $u, PHP_URL_PATH ) );
	$link      = $normalise( $url );

	// Every review, genre and the review list count as "Reviews".
	if ( $link === $normalise( (string) get_post_type_archive_link( 'review' ) ) ) {
		return is_post_type_archive( 'review' ) || is_tax( 'genre' ) || is_singular( 'review' );
	}

	$request = $normalise( home_url( add_query_arg( array() ) ) );
	return '' !== $link && ( $request === $link || str_starts_with( $request, $link . '/' ) );
}

/**
 * The page flagged as the contact page during migration, or the one with the slug "contact".
 */
function gasp_theme_contact_page(): ?WP_Post {
	$pages = get_posts(
		array(
			'post_type'   => 'page',
			'numberposts' => 1,
			'meta_key'    => 'gasp_is_contact', // phpcs:ignore WordPress.DB.SlowDBQuery -- tiny table, cached.
			'meta_value'  => '1', // phpcs:ignore WordPress.DB.SlowDBQuery
		)
	);
	return $pages[0] ?? get_page_by_path( 'contact' );
}

/**
 * The person who writes the reviews: the author of the most recent one.
 */
function gasp_theme_lead_author(): ?WP_User {
	$latest = get_posts(
		array(
			'post_type'   => 'review',
			'numberposts' => 1,
		)
	);
	return $latest ? ( get_userdata( (int) $latest[0]->post_author ) ?: null ) : null;
}

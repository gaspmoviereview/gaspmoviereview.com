<?php
/**
 * Meta description, Open Graph / Twitter tags and Review structured data, as the old Next.js
 * site had. Skipped automatically if an SEO plugin (Yoast, Rank Math, SEOPress) is active.
 */

defined( 'ABSPATH' ) || exit;

function gasp_theme_seo_plugin_active(): bool {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

function gasp_theme_meta_description(): string {
	if ( is_singular() ) {
		$text = get_the_excerpt( get_queried_object() );
	} elseif ( is_tax( 'genre' ) ) {
		$term = get_queried_object();
		$text = term_description( $term ) ?: sprintf(
			/* translators: %s: genre name, lower case */
			__( 'Reviews of %s films, each scored by its Gasp Factor for suspense, scariness and bloodiness.', 'gasp' ),
			strtolower( $term->name )
		);
	} elseif ( is_author() ) {
		$text = get_the_author_meta( 'description', get_queried_object_id() );
	} else {
		$text = gasp_theme_tagline();
	}
	return wp_trim_words( wp_strip_all_tags( (string) $text ), 30, '…' );
}

function gasp_theme_share_image(): string {
	if ( is_singular() && has_post_thumbnail() ) {
		return (string) get_the_post_thumbnail_url( null, 'large' );
	}
	$front = (int) get_option( 'page_on_front' );
	return $front && has_post_thumbnail( $front ) ? (string) get_the_post_thumbnail_url( $front, 'large' ) : '';
}

add_action(
	'wp_head',
	static function (): void {
		if ( gasp_theme_seo_plugin_active() ) {
			return;
		}
		$description = gasp_theme_meta_description();
		$image       = gasp_theme_share_image();
		$tags        = array(
			'description'    => $description,
			'og:site_name'   => get_bloginfo( 'name' ),
			'og:type'        => is_singular( 'review' ) ? 'article' : 'website',
			'og:title'       => wp_get_document_title(),
			'og:description' => $description,
			'og:url'         => is_singular() ? get_permalink() : home_url( add_query_arg( array() ) ),
			'og:image'       => $image,
			'twitter:card'   => $image ? 'summary_large_image' : 'summary',
		);
		foreach ( array_filter( $tags ) as $name => $content ) {
			$attr = str_starts_with( $name, 'og:' ) ? 'property' : 'name';
			printf( '<meta %s="%s" content="%s">' . "\n", $attr, esc_attr( $name ), esc_attr( $content ) );
		}
	},
	5
);

/**
 * schema.org Review of a Movie, rated out of 10 by its Gasp Factor.
 */
add_action(
	'wp_head',
	static function (): void {
		if ( ! is_singular( 'review' ) || gasp_theme_seo_plugin_active() ) {
			return;
		}
		$post  = get_queried_object();
		$title = get_the_title( $post );
		$movie = array( '@type' => 'Movie' );
		if ( preg_match( '/^(.*\S)\s+\((\d{4})\)$/u', $title, $m ) ) {
			$movie['name']        = $m[1];
			$movie['dateCreated'] = $m[2];
		} else {
			$movie['name'] = $title;
		}
		if ( has_post_thumbnail( $post ) ) {
			$movie['image'] = get_the_post_thumbnail_url( $post, 'large' );
		}

		$data = array(
			'@context'      => 'https://schema.org',
			'@type'         => 'Review',
			'name'          => $title,
			'url'           => get_permalink( $post ),
			'datePublished' => get_the_date( 'c', $post ),
			'dateModified'  => get_the_modified_date( 'c', $post ),
			'description'   => wp_strip_all_tags( get_the_excerpt( $post ) ),
			'itemReviewed'  => $movie,
			'reviewRating'  => array(
				'@type'       => 'Rating',
				'ratingValue' => gasp_theme_gasp( $post )['score'],
				'bestRating'  => 10,
				'worstRating' => 0,
			),
			'author'        => array(
				'@type' => 'Person',
				'name'  => get_the_author_meta( 'display_name', (int) $post->post_author ),
				'url'   => get_author_posts_url( (int) $post->post_author ),
			),
			'publisher'     => array(
				'@type' => 'Organization',
				'name'  => get_bloginfo( 'name' ),
				'url'   => home_url( '/' ),
			),
		);
		printf( '<script type="application/ld+json">%s</script>' . "\n", wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) );
	}
);

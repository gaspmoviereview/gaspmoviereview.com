<?php
/**
 * PHP versions of the design system components (Gasp Movie Review Design System/components/).
 * Each returns escaped HTML; styling is in assets/css/main.css under the same names.
 */

defined( 'ABSPATH' ) || exit;

/**
 * @return array{score: float, suspense: int, scariness: int, bloodiness: int}
 */
function gasp_theme_gasp( int|WP_Post|null $post = null ): array {
	return function_exists( 'gasp_reviews_get_gasp_factor' )
		? gasp_reviews_get_gasp_factor( $post )
		: array( 'score' => 0.0, 'suspense' => 0, 'scariness' => 0, 'bloodiness' => 0 );
}

function gasp_theme_stat_labels(): array {
	return array(
		'suspense'   => __( 'Suspense', 'gasp' ),
		'scariness'  => __( 'Scariness', 'gasp' ),
		'bloodiness' => __( 'Bloodiness', 'gasp' ),
	);
}

function gasp_theme_format_score( float $score ): string {
	return number_format( $score, 2 );
}

/** GaspFactor size="badge": glass pill with the glowing dot and score. */
function gasp_theme_gasp_badge( array $gasp ): string {
	$score = gasp_theme_format_score( $gasp['score'] );
	return sprintf(
		'<span class="gasp-badge" title="%1$s"><span class="gasp-badge__dot" aria-hidden="true"></span><span class="screen-reader-text">%2$s </span>%3$s</span>',
		/* translators: %s: Gasp Factor score, e.g. 8.03 */
		esc_attr( sprintf( __( 'Gasp Factor %s', 'gasp' ), $score ) ),
		esc_html__( 'Gasp Factor', 'gasp' ),
		esc_html( $score )
	);
}

/** GaspFactor size="compact": the three percentages with their icons. */
function gasp_theme_gasp_compact( array $gasp ): string {
	$items = '';
	foreach ( gasp_theme_stat_labels() as $key => $label ) {
		$items .= sprintf(
			'<li class="gasp-stats__item" title="%1$s">%2$s<span class="screen-reader-text">%1$s </span>%3$d%%</li>',
			esc_attr( $label ),
			gasp_theme_icon( GASP_STAT_ICONS[ $key ] ),
			(int) $gasp[ $key ]
		);
	}
	return '<ul class="gasp-stats">' . $items . '</ul>';
}

/** GaspFactor size="full": big serif score plus a glowing meter per stat. */
function gasp_theme_gasp_full( array $gasp, ?string $caption = null ): string {
	$caption ??= __( 'Average of suspense, scariness and bloodiness', 'gasp' );
	$meters    = '';
	foreach ( gasp_theme_stat_labels() as $key => $label ) {
		$value   = (int) $gasp[ $key ];
		$meters .= sprintf(
			'<li class="gasp-factor__stat"><div class="gasp-factor__row">%1$s<span class="gasp-factor__label">%2$s</span><span class="gasp-factor__value">%3$d%%</span></div><div class="gasp-factor__meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="%3$d" aria-label="%2$s"><div class="gasp-factor__fill" style="width:%3$d%%"></div></div></li>',
			gasp_theme_icon( GASP_STAT_ICONS[ $key ] ),
			esc_html( $label ),
			$value
		);
	}
	return sprintf(
		'<div class="gasp-factor"><div class="gasp-factor__summary"><div class="eyebrow">%1$s</div><div class="gasp-factor__score">%2$s</div><div class="gasp-factor__caption">%3$s</div></div><ul class="gasp-factor__stats">%4$s</ul></div>',
		esc_html__( 'Gasp Factor', 'gasp' ),
		esc_html( gasp_theme_format_score( $gasp['score'] ) ),
		esc_html( $caption ),
		$meters
	);
}

/**
 * Review titles are "Title (Year)"; in display type the year is set in muted italic.
 */
function gasp_theme_title_html( string $title ): string {
	if ( preg_match( '/^(.*\S)\s+(\(\d{4}\))$/u', $title, $m ) ) {
		return esc_html( $m[1] ) . ' <em class="title-year">' . esc_html( $m[2] ) . '</em>';
	}
	return esc_html( $title );
}

function gasp_theme_review_card( int|WP_Post $post ): string {
	$post  = get_post( $post );
	$gasp  = gasp_theme_gasp( $post );
	$image = get_the_post_thumbnail(
		$post,
		'gasp-card',
		array(
			'class'   => 'card__image',
			'alt'     => '',
			'sizes'   => '(max-width: 640px) 100vw, 400px',
			'loading' => 'lazy',
		)
	);
	return sprintf(
		'<a class="card" href="%1$s"><div class="card__media">%2$s<div class="card__badge">%3$s</div></div><div class="card__body"><h3 class="card__title">%4$s</h3><p class="card__excerpt">%5$s</p><div class="card__footer">%6$s%7$s</div></div></a>',
		esc_url( get_permalink( $post ) ),
		$image,
		gasp_theme_gasp_badge( $gasp ),
		esc_html( get_the_title( $post ) ),
		esc_html( wp_strip_all_tags( get_the_excerpt( $post ) ) ),
		gasp_theme_gasp_compact( $gasp ),
		gasp_theme_icon( 'arrow-up-right', 'card__arrow' )
	);
}

/**
 * @param WP_Post[] $posts
 */
function gasp_theme_card_grid( array $posts ): string {
	return '<div class="card-grid">' . implode( '', array_map( 'gasp_theme_review_card', $posts ) ) . '</div>';
}

function gasp_theme_genre_tag( string $label, ?string $url = null, bool $active = false, string $icon = '' ): string {
	$class = 'tag' . ( $active ? ' is-active' : '' );
	$inner = ( $icon ? gasp_theme_icon( $icon ) : '' ) . esc_html( $label );
	if ( null === $url ) {
		return sprintf( '<span class="%s">%s</span>', $class, $inner );
	}
	return sprintf( '<a class="%s" href="%s"%s>%s</a>', $class, esc_url( $url ), $active ? ' aria-current="page"' : '', $inner );
}

/**
 * @param 'primary'|'ghost' $variant
 */
function gasp_theme_button( string $label, string $url, string $variant = 'primary', string $icon = '', string $size = 'md' ): string {
	return sprintf(
		'<a class="btn btn--%1$s%2$s" href="%3$s">%4$s%5$s</a>',
		esc_attr( $variant ),
		'sm' === $size ? ' btn--sm' : '',
		esc_url( $url ),
		esc_html( $label ),
		$icon ? gasp_theme_icon( $icon, 'btn__icon' ) : ''
	);
}

function gasp_theme_social_button(): string {
	$url = gasp_theme_instagram_url();
	if ( ! $url ) {
		return '';
	}
	return sprintf(
		'<a class="social-btn" href="%1$s" title="%2$s" aria-label="%2$s" target="_blank" rel="noopener">%3$s</a>',
		esc_url( $url ),
		esc_attr__( 'Instagram', 'gasp' ),
		gasp_theme_icon( 'brand-instagram' )
	);
}

/** Shared page header: red mono eyebrow, big serif title, optional lede. */
function gasp_theme_page_intro( string $eyebrow, string $title_html, string $lede = '', string $extra = '' ): string {
	return sprintf(
		'<header class="page-intro container"><p class="eyebrow">%1$s</p><h1 class="page-title">%2$s</h1>%3$s%4$s</header>',
		esc_html( $eyebrow ),
		$title_html,
		$lede ? '<p class="page-intro__lede">' . esc_html( $lede ) . '</p>' : '',
		$extra
	);
}

/**
 * Full-bleed still with protection scrims. $content sits at the bottom in the container.
 */
function gasp_theme_hero( int $image_id, string $content, string $modifier = '' ): string {
	$image = $image_id ? wp_get_attachment_image(
		$image_id,
		'gasp-hero',
		false,
		array(
			'class'         => 'hero__image',
			'alt'           => '',
			'sizes'         => '100vw',
			'loading'       => 'eager',
			'fetchpriority' => 'high',
		)
	) : '';
	return sprintf(
		'<section class="hero%1$s">%2$s<div class="hero__scrim" aria-hidden="true"></div><div class="hero__content container">%3$s</div></section>',
		$modifier ? ' hero--' . esc_attr( $modifier ) : '',
		$image,
		$content
	);
}

function gasp_theme_author_avatar( int $user_id, string $size = 'thumbnail', string $class = 'byline__avatar' ): string {
	$profile = function_exists( 'gasp_reviews_get_author_profile' ) ? gasp_reviews_get_author_profile( $user_id ) : array( 'image_id' => 0 );
	if ( $profile['image_id'] ) {
		return wp_get_attachment_image( $profile['image_id'], $size, false, array( 'class' => $class, 'alt' => '' ) );
	}
	return get_avatar( $user_id, 88, '', '', array( 'class' => $class ) );
}

function gasp_theme_author_tagline( int $user_id ): string {
	$profile = function_exists( 'gasp_reviews_get_author_profile' ) ? gasp_reviews_get_author_profile( $user_id ) : array( 'tagline' => '' );
	return $profile['tagline'] ?: __( 'Writer and film enthusiast', 'gasp' );
}

/** AuthorByline: avatar · name · role, with the published / updated dates in mono. */
function gasp_theme_byline( WP_Post $post ): string {
	$author_id = (int) $post->post_author;
	$format    = 'j M Y, H:i';
	$meta      = sprintf( '<time datetime="%s">%s</time>', esc_attr( get_the_date( 'c', $post ) ), esc_html( get_the_date( $format, $post ) ) );

	// Only mention an update if it's on a later day than publishing.
	if ( get_the_modified_date( 'Ymd', $post ) > get_the_date( 'Ymd', $post ) ) {
		$meta .= sprintf(
			' · %s <time datetime="%s">%s</time>',
			esc_html__( 'Updated', 'gasp' ),
			esc_attr( get_the_modified_date( 'c', $post ) ),
			esc_html( get_the_modified_date( $format, $post ) )
		);
	}

	return sprintf(
		'<div class="byline">%1$s<div class="byline__text"><div class="byline__name"><a href="%2$s">%3$s</a><span class="byline__role"> · %4$s</span></div><div class="byline__meta">%5$s</div></div></div>',
		gasp_theme_author_avatar( $author_id ),
		esc_url( get_author_posts_url( $author_id ) ),
		esc_html( get_the_author_meta( 'display_name', $author_id ) ),
		esc_html( gasp_theme_author_tagline( $author_id ) ),
		$meta
	);
}

/** Mono eyebrow row above a card grid: label left, "07 films" right. */
function gasp_theme_section_head( string $label_html, int $count ): string {
	return sprintf(
		'<div class="section-head">%1$s<span class="section-head__count">%2$s</span></div>',
		$label_html,
		/* translators: %s: zero-padded number of films, e.g. 07 */
		esc_html( sprintf( _n( '%s film', '%s films', $count, 'gasp' ), str_pad( (string) $count, 2, '0', STR_PAD_LEFT ) ) )
	);
}

function gasp_theme_pagination(): string {
	$links = paginate_links(
		array(
			'type'      => 'array',
			'prev_text' => gasp_theme_icon( 'arrow-left' ) . '<span class="screen-reader-text">' . esc_html__( 'Previous page', 'gasp' ) . '</span>',
			'next_text' => '<span class="screen-reader-text">' . esc_html__( 'Next page', 'gasp' ) . '</span>' . gasp_theme_icon( 'arrow-right' ),
		)
	);
	return $links ? '<nav class="pagination" aria-label="' . esc_attr__( 'Pages', 'gasp' ) . '">' . implode( '', $links ) . '</nav>' : '';
}

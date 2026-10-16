<?php
/**
 * Inline SVG icons from assets/icons/.
 *
 * Tabler Icons (MIT): droplets and the UI glyphs. Font Awesome Free regular (CC BY 4.0):
 * face-grimace, face-surprise. These are the design system's chosen icons, inlined
 * instead of loading two full icon fonts from a CDN.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Icon for each Gasp Factor stat, keyed by the stat name used in gasp_reviews_get_gasp_factor().
 */
const GASP_STAT_ICONS = array(
	'suspense'   => 'face-grimace',
	'scariness'  => 'face-surprise',
	'bloodiness' => 'droplets',
);

function gasp_theme_icon( string $name, string $class = '' ): string {
	static $cache = array();

	if ( ! isset( $cache[ $name ] ) ) {
		$file = get_template_directory() . '/assets/icons/' . sanitize_file_name( $name ) . '.svg';
		$svg  = is_readable( $file ) ? (string) file_get_contents( $file ) : ''; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- local file.

		$svg = preg_replace( '/<!--.*?-->/s', '', $svg );
		$svg = preg_replace( '/\s(?:class|width|height)="[^"]*"/', '', $svg );
		// Font Awesome paths have no fill; make them follow the text colour like Tabler's strokes do.
		if ( ! str_contains( $svg, 'stroke="currentColor"' ) ) {
			$svg = str_replace( '<svg', '<svg fill="currentColor"', $svg );
		}
		$cache[ $name ] = trim( (string) preg_replace( '/\s+/', ' ', $svg ) );
	}

	if ( '' === $cache[ $name ] ) {
		return '';
	}
	$classes = trim( 'icon icon--' . $name . ' ' . $class );
	return str_replace( '<svg', '<svg class="' . esc_attr( $classes ) . '" aria-hidden="true" focusable="false"', $cache[ $name ] );
}

<?php
/**
 * Local development only (mapped in by .wp-env.json, never deployed):
 * wp-env has no mail server, so log outgoing email to wp-content/mail.log instead of sending it.
 */

add_filter(
	'pre_wp_mail',
	static function ( $short_circuit, array $atts ) {
		$entry = sprintf(
			"=== %s\nTo: %s\nSubject: %s\nHeaders: %s\n\n%s\n\n",
			gmdate( 'c' ),
			implode( ', ', (array) $atts['to'] ),
			$atts['subject'],
			implode( ' | ', (array) $atts['headers'] ),
			$atts['message']
		);
		file_put_contents( WP_CONTENT_DIR . '/mail.log', $entry, FILE_APPEND ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		return true;
	},
	10,
	2
);

<?php
/**
 * Contact form handling. The theme renders the form; this validates it, emails it and reports back.
 *
 * Posts to admin-post.php, then redirects back to the page (post/redirect/get). On a validation
 * error the submitted values and errors survive the redirect in a short-lived transient.
 * Spam protection: nonce, a hidden honeypot field, a minimum fill time and a per-IP rate limit.
 */

defined( 'ABSPATH' ) || exit;

const GASP_CONTACT_ACTION         = 'gasp_contact';
const GASP_CONTACT_RECIPIENT      = 'gasp_contact_recipient';
const GASP_CONTACT_STATE_PARAM    = 'contact';
const GASP_CONTACT_MIN_LENGTH     = 3;
const GASP_CONTACT_MIN_SECONDS    = 3;
const GASP_CONTACT_HOURLY_LIMIT   = 5;
const GASP_CONTACT_FIELDS         = array( 'name', 'email', 'subject', 'message' );
const GASP_CONTACT_HONEYPOT_FIELD = 'website';

/**
 * @param array<string, string> $values
 * @return array<string, string> Field name => error message, empty when valid.
 */
function gasp_reviews_contact_validate( array $values ): array {
	$errors = array();
	foreach ( array( 'name', 'subject', 'message' ) as $field ) {
		if ( mb_strlen( trim( $values[ $field ] ?? '' ) ) < GASP_CONTACT_MIN_LENGTH ) {
			$errors[ $field ] = __( 'Minimum 3 letters', 'gasp-reviews' );
		}
	}
	if ( ! is_email( $values['email'] ?? '' ) ) {
		$errors['email'] = __( 'Must be a valid email', 'gasp-reviews' );
	}
	return $errors;
}

function gasp_reviews_contact_recipient(): string {
	$recipient = (string) get_option( GASP_CONTACT_RECIPIENT, '' );
	return is_email( $recipient ) ? $recipient : (string) get_option( 'admin_email' );
}

function gasp_reviews_contact_redirect( string $back, array $args ): never {
	wp_safe_redirect( add_query_arg( $args, $back ) . '#contact-form' );
	exit;
}

function gasp_reviews_handle_contact(): void {
	$back = wp_validate_redirect( wp_get_referer() ?: '', home_url( '/' ) );
	$back = remove_query_arg( GASP_CONTACT_STATE_PARAM, $back );

	if ( ! isset( $_POST['_gasp_contact_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['_gasp_contact_nonce'] ), GASP_CONTACT_ACTION ) ) {
		wp_die( esc_html__( 'This form has expired. Please go back, refresh the page and try again.', 'gasp-reviews' ), '', array( 'response' => 403, 'back_link' => true ) );
	}

	$values = array();
	foreach ( GASP_CONTACT_FIELDS as $field ) {
		$raw              = isset( $_POST[ $field ] ) && is_string( $_POST[ $field ] ) ? wp_unslash( $_POST[ $field ] ) : '';
		$values[ $field ] = 'message' === $field ? sanitize_textarea_field( $raw ) : sanitize_text_field( $raw );
	}

	// Bots fill every field and submit instantly; pretend it worked so they don't adapt.
	$started = isset( $_POST['_gasp_started'] ) ? (int) $_POST['_gasp_started'] : 0;
	if ( ! empty( $_POST[ GASP_CONTACT_HONEYPOT_FIELD ] ) || time() - $started < GASP_CONTACT_MIN_SECONDS ) {
		gasp_reviews_contact_redirect( $back, array( GASP_CONTACT_STATE_PARAM => 'sent' ) );
	}

	$errors = gasp_reviews_contact_validate( $values );

	$rate_key = 'gasp_contact_rate_' . md5( (string) ( $_SERVER['REMOTE_ADDR'] ?? '' ) );
	$sent     = (int) get_transient( $rate_key );
	if ( ! $errors && $sent >= GASP_CONTACT_HOURLY_LIMIT ) {
		$errors['form'] = __( 'You’ve sent a few messages already. Please try again in an hour.', 'gasp-reviews' );
	}

	if ( ! $errors ) {
		$site = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$body = sprintf( "%s <%s>\n\n%s\n\n—\n%s", $values['name'], $values['email'], $values['message'], $back );
		$ok   = wp_mail(
			gasp_reviews_contact_recipient(),
			sprintf( '[%s] %s', $site, $values['subject'] ),
			$body,
			array( sprintf( 'Reply-To: %s <%s>', str_replace( array( '<', '>', '"' ), '', $values['name'] ), $values['email'] ) )
		);
		if ( $ok ) {
			set_transient( $rate_key, $sent + 1, HOUR_IN_SECONDS );
			$first_name = strtok( $values['name'], ' ' );
			gasp_reviews_contact_redirect( $back, array( GASP_CONTACT_STATE_PARAM => 'sent', 'n' => rawurlencode( (string) $first_name ) ) );
		}
		$errors['form'] = __( 'Sorry, your message couldn’t be sent. Please try again later or message us on Instagram.', 'gasp-reviews' );
	}

	$key = wp_generate_password( 12, false );
	set_transient( 'gasp_contact_' . $key, array( 'values' => $values, 'errors' => $errors ), 10 * MINUTE_IN_SECONDS );
	gasp_reviews_contact_redirect( $back, array( GASP_CONTACT_STATE_PARAM => $key ) );
}
add_action( 'admin_post_nopriv_' . GASP_CONTACT_ACTION, 'gasp_reviews_handle_contact' );
add_action( 'admin_post_' . GASP_CONTACT_ACTION, 'gasp_reviews_handle_contact' );

/**
 * What the theme needs to render the form after a redirect.
 *
 * @return array{sent: bool, first_name: string, values: array<string, string>, errors: array<string, string>}
 */
function gasp_reviews_contact_state(): array {
	// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only display state.
	$param = isset( $_GET[ GASP_CONTACT_STATE_PARAM ] ) ? sanitize_key( $_GET[ GASP_CONTACT_STATE_PARAM ] ) : '';
	$state = array(
		'sent'       => 'sent' === $param,
		'first_name' => isset( $_GET['n'] ) ? sanitize_text_field( wp_unslash( $_GET['n'] ) ) : '',
		'values'     => array_fill_keys( GASP_CONTACT_FIELDS, '' ),
		'errors'     => array(),
	);
	// phpcs:enable
	if ( $param && 'sent' !== $param ) {
		$stored = get_transient( 'gasp_contact_' . $param );
		if ( is_array( $stored ) ) {
			$state['values'] = array_merge( $state['values'], $stored['values'] );
			$state['errors'] = $stored['errors'];
		}
	}
	return $state;
}

/**
 * Hidden fields the form must include: action, nonce, start time and the honeypot.
 */
function gasp_reviews_contact_hidden_fields(): void {
	printf( '<input type="hidden" name="action" value="%s">', esc_attr( GASP_CONTACT_ACTION ) );
	wp_nonce_field( GASP_CONTACT_ACTION, '_gasp_contact_nonce', false );
	printf( '<input type="hidden" name="_gasp_started" value="%d">', time() );
	printf(
		'<div aria-hidden="true" style="position:absolute;left:-9999px"><label>%s <input type="text" name="%s" tabindex="-1" autocomplete="off"></label></div>',
		esc_html__( 'Leave this empty', 'gasp-reviews' ),
		esc_attr( GASP_CONTACT_HONEYPOT_FIELD )
	);
}

function gasp_reviews_contact_action_url(): string {
	return admin_url( 'admin-post.php' );
}

/**
 * Settings → General → "Contact form recipient".
 */
add_action(
	'admin_init',
	static function (): void {
		register_setting(
			'general',
			GASP_CONTACT_RECIPIENT,
			array(
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_email',
				'default'           => '',
			)
		);
		add_settings_field(
			GASP_CONTACT_RECIPIENT,
			__( 'Contact form recipient', 'gasp-reviews' ),
			static function (): void {
				printf(
					'<input type="email" class="regular-text" id="%1$s" name="%1$s" value="%2$s" placeholder="%3$s"><p class="description">%4$s</p>',
					esc_attr( GASP_CONTACT_RECIPIENT ),
					esc_attr( (string) get_option( GASP_CONTACT_RECIPIENT, '' ) ),
					esc_attr( (string) get_option( 'admin_email' ) ),
					esc_html__( 'Where contact form messages are sent. Leave empty to use the administration email address.', 'gasp-reviews' )
				);
			},
			'general',
			'default',
			array( 'label_for' => GASP_CONTACT_RECIPIENT )
		);
	}
);

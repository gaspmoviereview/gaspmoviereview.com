<?php
/**
 * Contact (ContactScreen): form panel beside a "Recommend a film" aside.
 * Submission is handled by the Gasp Reviews plugin (includes/contact-form.php); validation
 * errors and the success state come back via gasp_reviews_contact_state().
 */

defined( 'ABSPATH' ) || exit;

$gasp_state = function_exists( 'gasp_reviews_contact_state' )
	? gasp_reviews_contact_state()
	: array( 'sent' => false, 'first_name' => '', 'values' => array(), 'errors' => array() );

$gasp_field = static function ( string $name, string $label, string $type = 'text' ) use ( $gasp_state ): string {
	$error = $gasp_state['errors'][ $name ] ?? '';
	$hint  = 'email' === $name ? __( 'Must be a valid email', 'gasp' ) : __( 'Minimum 3 letters', 'gasp' );
	$value = $gasp_state['values'][ $name ] ?? '';
	$attrs = sprintf(
		'id="contact-%1$s" name="%1$s" required aria-describedby="contact-%1$s-note"%2$s',
		esc_attr( $name ),
		$error ? ' aria-invalid="true"' : ''
	);
	$input = 'textarea' === $type
		? sprintf( '<textarea class="field__input field__input--multiline" rows="6" minlength="3" %s>%s</textarea>', $attrs, esc_textarea( $value ) )
		: sprintf( '<input class="field__input" type="%s" %s value="%s"%s>', esc_attr( $type ), $attrs, esc_attr( $value ), 'email' === $type ? ' autocomplete="email"' : ' minlength="3"' );

	return sprintf(
		'<label class="field%1$s" for="contact-%2$s"><span class="field__label">%3$s</span>%4$s<span class="field__note" id="contact-%2$s-note">%5$s%6$s</span></label>',
		$error ? ' has-error' : '',
		esc_attr( $name ),
		esc_html( $label ),
		$input,
		$error ? gasp_theme_icon( 'alert-circle' ) : '',
		esc_html( $error ?: $hint )
	);
};

get_header();

while ( have_posts() ) :
	the_post();
	$gasp_handle = gasp_theme_instagram_handle();
	?>
	<main id="main">
		<?php echo gasp_theme_page_intro( __( 'Contact', 'gasp' ), esc_html( get_the_title() ), has_excerpt() ? get_the_excerpt() : '' ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component. ?>

		<section class="split split--start container section--bottom">
			<div class="panel" id="contact-form">
				<?php if ( $gasp_state['sent'] ) : ?>
					<div class="contact-sent" role="status">
						<?php echo gasp_theme_icon( 'circle-check', 'contact-sent__icon' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<h2 class="contact-sent__title"><?php esc_html_e( 'Message sent.', 'gasp' ); ?></h2>
						<p class="contact-sent__text">
							<?php
							echo esc_html(
								$gasp_state['first_name']
									/* translators: %s: sender's first name */
									? sprintf( __( 'Thanks, %s. We’ll get back to you soon.', 'gasp' ), $gasp_state['first_name'] )
									: __( 'Thanks. We’ll get back to you soon.', 'gasp' )
							);
							?>
						</p>
						<?php echo gasp_theme_button( __( 'Send another', 'gasp' ), get_permalink() . '#contact-form', 'ghost', '', 'sm' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</div>
				<?php else : ?>
					<form class="contact-form" method="post" action="<?php echo esc_url( function_exists( 'gasp_reviews_contact_action_url' ) ? gasp_reviews_contact_action_url() : '' ); ?>">
						<div>
							<h2 class="contact-form__title"><?php esc_html_e( 'Get in touch', 'gasp' ); ?></h2>
							<p class="contact-form__intro"><?php esc_html_e( 'Use the form below to get in contact with us for any reason at all.', 'gasp' ); ?></p>
						</div>
						<?php if ( ! empty( $gasp_state['errors']['form'] ) ) : ?>
							<p class="contact-form__error" role="alert"><?php echo gasp_theme_icon( 'alert-circle' ) . esc_html( $gasp_state['errors']['form'] ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
						<?php endif; ?>
						<div class="contact-form__pair">
							<?php echo $gasp_field( 'name', __( 'Name', 'gasp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							<?php echo $gasp_field( 'email', __( 'Email', 'gasp' ), 'email' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</div>
						<?php echo $gasp_field( 'subject', __( 'Subject', 'gasp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<?php echo $gasp_field( 'message', __( 'Message', 'gasp' ), 'textarea' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<?php
						if ( function_exists( 'gasp_reviews_contact_hidden_fields' ) ) {
							gasp_reviews_contact_hidden_fields();
						}
						?>
						<div>
							<button class="btn btn--primary" type="submit"><?php esc_html_e( 'Send message', 'gasp' ); ?><?php echo gasp_theme_icon( 'arrow-right', 'btn__icon' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
						</div>
					</form>
				<?php endif; ?>
			</div>

			<aside class="contact-aside">
				<div>
					<p class="eyebrow eyebrow--muted"><?php esc_html_e( 'Recommend a film', 'gasp' ); ?></p>
					<p class="contact-aside__pitch"><?php esc_html_e( 'Seen something that made you gasp? Tell us, and it might get the Gasp Factor treatment.', 'gasp' ); ?></p>
				</div>
				<?php if ( $gasp_handle ) : ?>
					<div class="contact-aside__social">
						<?php echo gasp_theme_social_button(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<div>
							<div class="contact-aside__follow"><?php esc_html_e( 'Follow me', 'gasp' ); ?></div>
							<div class="social-row__handle"><?php echo esc_html( $gasp_handle ); ?></div>
						</div>
					</div>
				<?php endif; ?>
				<?php if ( trim( get_the_content() ) ) : ?>
					<div class="prose contact-aside__extra"><?php the_content(); ?></div>
				<?php endif; ?>
			</aside>
		</section>
	</main>
	<?php
endwhile;

get_footer();

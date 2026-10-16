<?php
/**
 * Not found.
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main">
	<?php
	echo gasp_theme_page_intro( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in component.
		'404',
		wp_kses( __( 'Nothing to see <em>here…</em>', 'gasp' ), array( 'em' => array() ) ),
		__( 'That page has vanished, like the first victim in the opening scene. Try the latest reviews instead.', 'gasp' ),
		'<div class="page-intro__actions">' . gasp_theme_button( __( 'All reviews', 'gasp' ), (string) get_post_type_archive_link( 'review' ), 'primary', 'arrow-right' ) . gasp_theme_button( __( 'Home', 'gasp' ), home_url( '/' ), 'ghost' ) . '</div>'
	);
	?>
	<div class="section--bottom"></div>
</main>
<?php
get_footer();

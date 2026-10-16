<?php
/**
 * Home: the latest review as the hero, the intro, then the other recent reviews.
 * The intro paragraph is the Home page's content, so it's editable in Pages → Home.
 */

defined( 'ABSPATH' ) || exit;

get_header();

$gasp_reviews = get_posts(
	array(
		'post_type'   => 'review',
		'numberposts' => 10,
	)
);
$gasp_lead    = array_shift( $gasp_reviews );
$gasp_total   = (int) wp_count_posts( 'review' )->publish;
$gasp_intro   = is_page() ? get_the_content( null, false, get_queried_object() ) : '';
?>
<main id="main">
	<?php
	if ( $gasp_lead ) {
		$gasp_hero  = '<div class="hero__meta"><span class="eyebrow">' . esc_html__( 'Latest review', 'gasp' ) . '</span>' . gasp_theme_gasp_badge( gasp_theme_gasp( $gasp_lead ) ) . '</div>';
		$gasp_hero .= '<h1 class="hero__title">' . gasp_theme_title_html( get_the_title( $gasp_lead ) ) . '</h1>';
		$gasp_hero .= '<p class="hero__excerpt">' . esc_html( wp_strip_all_tags( get_the_excerpt( $gasp_lead ) ) ) . '</p>';
		$gasp_hero .= '<div class="hero__actions">'
			. gasp_theme_button( __( 'Read review', 'gasp' ), get_permalink( $gasp_lead ), 'primary', 'arrow-right' )
			. gasp_theme_button( __( 'All reviews', 'gasp' ), (string) get_post_type_archive_link( 'review' ), 'ghost' )
			. '</div>';
		echo gasp_theme_hero( (int) get_post_thumbnail_id( $gasp_lead ), $gasp_hero, 'home' ); // phpcs:ignore WordPress.Security.EscapeOutput -- built from escaped parts.
	}
	?>

	<section class="home-intro container">
		<h2 class="home-intro__title"><?php echo wp_kses( __( 'Reviews from the <em>darkest corners</em> of cinema.', 'gasp' ), array( 'em' => array() ) ); ?></h2>
		<div class="home-intro__text">
			<?php
			echo $gasp_intro // phpcs:ignore WordPress.Security.EscapeOutput -- post content filtered by the_content.
				? apply_filters( 'the_content', $gasp_intro ) // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- core hook.
				: '<p>' . esc_html__( 'Your independent haven for horror and thrillers: the films that keep you on the edge of your seat and leave you gasping for more. Every review gets a Gasp Factor for suspense, scariness and bloodiness.', 'gasp' ) . '</p>';
			?>
		</div>
	</section>

	<?php if ( $gasp_reviews ) : ?>
		<section class="section container" id="latest">
			<?php echo gasp_theme_section_head( '<h2 class="eyebrow eyebrow--muted">' . esc_html__( 'Latest reviews', 'gasp' ) . '</h2>', $gasp_total ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<?php echo gasp_theme_card_grid( array_slice( $gasp_reviews, 0, 9 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<?php if ( $gasp_total > 10 ) : ?>
				<div class="section__more"><?php echo gasp_theme_button( __( 'All reviews', 'gasp' ), (string) get_post_type_archive_link( 'review' ), 'ghost', 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
			<?php endif; ?>
		</section>
	<?php endif; ?>
</main>
<?php
get_footer();

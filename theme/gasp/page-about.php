<?php
/**
 * About (AboutScreen): still hero, the excerpt as an italic intro beside the body copy, then the
 * "What is the Gasp Factor?" panel with stat definitions and a live example.
 *
 * Everything in the page content after the first heading (or a bold-only line such as
 * "WHAT IS THE GASP FACTOR?") goes into the panel, so all of it stays editable in Pages → About.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Split page content into [body blocks, panel heading text, panel blocks].
 *
 * @return array{0: string, 1: string, 2: string}
 */
function gasp_theme_split_about( string $content ): array {
	$body    = '';
	$heading = '';
	$panel   = '';
	foreach ( parse_blocks( $content ) as $block ) {
		$html     = serialize_block( $block );
		$text     = trim( wp_strip_all_tags( $block['innerHTML'] ?? '' ) );
		$is_title = 'core/heading' === $block['blockName']
			|| ( 'core/paragraph' === $block['blockName'] && preg_match( '#^\s*<p>\s*<strong>[^<]+</strong>\s*</p>\s*$#', $block['innerHTML'] ) );

		if ( '' === $heading && $is_title && '' !== $text ) {
			$heading = $text;
		} elseif ( '' === $heading ) {
			$body .= $html;
		} else {
			$panel .= $html;
		}
	}
	return array( $body, $heading, $panel );
}

get_header();

while ( have_posts() ) :
	the_post();
	[ $gasp_body, $gasp_panel_title, $gasp_panel ] = gasp_theme_split_about( get_the_content() );

	$gasp_example = get_posts(
		array(
			'post_type'   => 'review',
			'numberposts' => 1,
			'meta_key'    => 'gasp_score', // phpcs:ignore WordPress.DB.SlowDBQuery -- single row.
			'orderby'     => 'meta_value_num',
		)
	);
	$gasp_defs = array(
		'suspense'   => __( 'How long it keeps you on the edge of your seat.', 'gasp' ),
		'scariness'  => __( 'Jump scares, dread and pillow-hiding moments.', 'gasp' ),
		'bloodiness' => __( 'How much of the red stuff ends up on screen.', 'gasp' ),
	);

	$gasp_hero = '<p class="eyebrow">' . esc_html__( 'About', 'gasp' ) . '</p><h1 class="page-title">'
		. wp_kses( __( 'Films that will make you <em>gasp.</em>', 'gasp' ), array( 'em' => array() ) ) . '</h1>';
	?>
	<main id="main">
		<?php echo gasp_theme_hero( (int) get_post_thumbnail_id(), $gasp_hero, 'page' ); // phpcs:ignore WordPress.Security.EscapeOutput -- built from escaped parts. ?>

		<section class="split container about-intro">
			<?php if ( has_excerpt() ) : ?>
				<p class="standfirst standfirst--large"><?php echo esc_html( get_the_excerpt() ); ?></p>
			<?php endif; ?>
			<div>
				<div class="prose"><?php echo apply_filters( 'the_content', $gasp_body ); // phpcs:ignore WordPress.Security.EscapeOutput, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- core filter on post content. ?></div>
				<div class="about-intro__action"><?php echo gasp_theme_button( __( 'Browse reviews', 'gasp' ), (string) get_post_type_archive_link( 'review' ), 'primary', 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
			</div>
		</section>

		<section class="section container">
			<div class="panel panel--glow-right panel--roomy">
				<div class="split split--start">
					<div>
						<h2 class="eyebrow"><?php echo esc_html( $gasp_panel_title ?: __( 'What is the Gasp Factor?', 'gasp' ) ); ?></h2>
						<div class="about-gasp__text"><?php echo apply_filters( 'the_content', $gasp_panel ); // phpcs:ignore WordPress.Security.EscapeOutput, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound ?></div>
						<ul class="stat-defs">
							<?php foreach ( gasp_theme_stat_labels() as $gasp_key => $gasp_label ) : ?>
								<li class="stat-defs__item">
									<?php echo gasp_theme_icon( GASP_STAT_ICONS[ $gasp_key ] ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
									<div>
										<div class="stat-defs__name"><?php echo esc_html( $gasp_label ); ?></div>
										<div class="stat-defs__desc"><?php echo esc_html( $gasp_defs[ $gasp_key ] ); ?></div>
									</div>
								</li>
							<?php endforeach; ?>
						</ul>
					</div>
					<?php if ( $gasp_example ) : ?>
						<div class="about-gasp__example">
							<?php
							/* translators: %s: review title, e.g. His House (2020) */
							echo gasp_theme_gasp_full( gasp_theme_gasp( $gasp_example[0] ), sprintf( __( 'e.g. %s', 'gasp' ), get_the_title( $gasp_example[0] ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput
							?>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</section>
	</main>
	<?php
endwhile;

get_footer();

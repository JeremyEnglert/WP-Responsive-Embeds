<?php
	
// Add Shortcode
function wpre_shortcode( $atts , $content = null ) {

	// Attributes
	$atts = shortcode_atts(
		array(
			'widescreen' => 'false',
		),
		$atts,
		'wpre'
	);
	
	$embed = '<div class="responsive-embed">' . $content . '</div>';
	//$embed = get_option('wpre_checkbox_field_0');
	return $embed;

}

add_shortcode( 'wpre', 'wpre_shortcode' );
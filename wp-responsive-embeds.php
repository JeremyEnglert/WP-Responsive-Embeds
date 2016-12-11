<?php
/*
Plugin Name: WP Responsive Embeds
Plugin URI: 
Description: 
Version: .5
Author: Jeremy Englert
Author URI: http://jointswp.com
License: GPLv2 or later
*/

// Get admin settings
$auto_embeds = get_option( 'auto_embed_field' );

// If auto embeds are enabled, load the JS to make this happen
if ( 1 == $auto_embeds ) {
    wp_enqueue_script( 'wpre-js', plugin_dir_url( __FILE__ ) . 'assets/js/scripts.js', array( 'jquery' ), '', true );
} 

// Load styles
wp_enqueue_style( 'wpre-css', plugin_dir_url( __FILE__ ) . 'assets/css/style.css', array(), 'all' );

require_once('wpre-admin.php'); 
require_once('wpre-shortcode.php'); 
<?php

class WPRE_Admin_Settings {

	public function __construct() {
		// Hook into the admin menu
		add_action( 'admin_menu', array( $this, 'create_plugin_settings_page' ) );
		add_action( 'admin_init', array( $this, 'setup_sections' ) );
		add_action( 'admin_init', array( $this, 'setup_fields' ) );
	}
	
	public function create_plugin_settings_page() {
		// Add the menu item and page
		$page_title = 'WP Responsive Embeds';
		$menu_title = 'WP Responsive Embeds';
		$capability = 'manage_options';
		$slug = 'wp_responsive_embeds';
		$callback = array( $this, 'plugin_settings_page_content' );
	
		add_submenu_page( 'tools.php', $page_title, $menu_title, $capability, $slug, $callback );

	}
	
	public function setup_sections() {
		add_settings_section( 'plugin_settings_section', 'Plugin Settings', false, 'wp_responsive_embeds' );
	}
	
	public function setup_fields() {
    	add_settings_field( 'auto_embed_field', 'Disable Automatic Responsive Embeds', array( $this, 'auto_embed_callback' ), 'wp_responsive_embeds', 'plugin_settings_section' );
    	register_setting( 'wp_responsive_embeds', 'auto_embed_field' );
	}
	
	public function auto_embed_callback( $arguments ) {
		// Get an array of options from the database.
		$checked = get_option( 'auto_embed_field' );
		
		echo '<input name="auto_embed_field" id="auto_embed_field" type="checkbox" value="1"' . checked( $checked, 1, false ) . '/>';
	}
	
	public function plugin_settings_page_content() { ?>
		<div class="wrap">
			<h2>WP Responsive Embeds</h2>
			<form method="post" action="options.php">
	            <?php settings_fields( 'wp_responsive_embeds' );
	                do_settings_sections( 'wp_responsive_embeds' ); ?>
	                <h3>Using the Shortcode</h3>
	                <div>If you disable automatic responsive embeds, you will need to wrap items in the [wpre] shortcode. For example [wpre] EMBED TEXT HERE [/wpre].</div>
	                <?php submit_button();?>
			</form>
		</div> <?php
	}

}
new WPRE_Admin_Settings();
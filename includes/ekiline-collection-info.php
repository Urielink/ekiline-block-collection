<?php
/**
 * Ekiline block collection infopage
 *
 * Admin bar button
 *
 * @link https://codex.wordpress.org/Plugin_API/Action_Reference/wp_before_admin_bar_render
 * @link https://codex.wordpress.org/Javascript_Reference/ThickBox
 * @link https://medium.com/@hbahonar/how-to-create-wordpress-custom-admin-page-and-menu-from-scratch-ultimate-guide-updated-d7b4d2e57f96
 * @link https://codex.wordpress.org/index.php?title=Creating_Options_Pages&oldid=97268
 * @link https://codex.wordpress.org/Settings_API
 *
 * Estilos agregados.
 *
 * @link https://codex.wordpress.org/Function_Reference/wp_add_inline_style
 * @link https://gist.github.com/corvannoorloos/43980115659cb5aee571
 * @link https://wordpress.stackexchange.com/questions/36394/wp-3-3-how-to-add-menu-items-to-the-admin-bar
 * @link https://wordpress.stackexchange.com/questions/266318/how-to-add-custom-submenu-links-in-wp-admin-menus
 *
 * @package ekiline-collection
 */

/**
 * Nuevo menu de opciones.
 */
function ekiline_block_collection_menu()
{
	// pagina de opciones.
	add_menu_page(
		__('Ekiline BC Options', 'ekiline-collection'),		// page_title
		__('Ekiline BC', 'ekiline-collection'),				// menu_title
		'manage_options', 									// capability
		'ekiline-block-collection', 						// menu_slug
		'ekiline_block_collection_options', 				// function
		'dashicons-schedule', 								// icon_url
		100 												// position
	);

	// subpagina de informacion.
	add_submenu_page(
		'ekiline-block-collection',							// parent_slug
		__('About', 'ekiline-collection'),					// page_title
		__('About', 'ekiline-collection'),					// menu_title
		'manage_options',									// capability
		'ekiline-block-collection-about',					// menu_slug
		'ekiline_block_collection_about'					// function
	);

	// callback de opciones.
	add_action('admin_init', 'ekiline_block_collection_register_settings');

	// ocultar opciones de manera provisional
	remove_menu_page( 'ekiline-block-collection' );

}
add_action('admin_menu', 'ekiline_block_collection_menu');

/**
 * Opciones.
 */
function ekiline_block_collection_register_settings()
{

	//Poner en cola estilos de administración y scripts para las páginas de Ekiline Block Collection.
	$allowed_pages = array('ekiline-block-collection', 'ekiline-block-collection-about');
	$current_page = isset($_GET['page']) ? sanitize_key($_GET['page']) : '';

	// Solo para las páginas de Ekiline Block Collection.
	if (in_array($current_page, $allowed_pages)) {
		add_action('admin_print_styles', 'ekiline_collection_options_css', 100);
		add_action('admin_print_scripts', 'ekiline_collection_options_js', 100);
	}

	// Argumentos para ekiline_block_collection_bootstrap_css
	$args_ekiline_block_collection_bootstrap_css = array(
		'type' 				=> 'string',
		'sanitize_callback' => 'sanitize_text_field',
		'default' 			=> '1'
	);
	// Argumentos para ekiline_block_collection_bootstrap_js
	$args_ekiline_block_collection_bootstrap_js = array(
		'type' 				=> 'string',
		'sanitize_callback' => 'sanitize_text_field',
		'default' 			=> '1'
	);

	//register our settings
	register_setting('ekiline-block-collection-settings-group', 'ekiline_block_collection_bootstrap_css', $args_ekiline_block_collection_bootstrap_css);
	register_setting('ekiline-block-collection-settings-group', 'ekiline_block_collection_bootstrap_js', $args_ekiline_block_collection_bootstrap_js);
}

function ekiline_block_collection_options()
{
	?>
<div class="wrap">
	<h1>
		<span class="dashicons dashicons-layout" aria-hidden="true"></span>
		<?php esc_html_e('Ekiline Block Collection.', 'ekiline-collection'); ?>
	</h1>
	<div id="welcome-panel" class="welcome-panel">
		<div class="welcome-panel-content">

			<div class="welcome-panel-header">
				<span style="float:right;"><?php echo (function_exists('get_avatar')) ? get_avatar('uriel@bixnia.com', $size = '100', $default = '') : ''; ?></span>
				<h2><?php esc_html_e('Configuración', 'ekiline-collection'); ?></h2>
				<p class="about-description">
					<?php esc_html_e('Desactiva estilos, scripts o personaliza la colección.', 'ekiline-collection'); ?>
				</p>
			</div>

			<div class="welcome-panel-column-container">
				<div class="welcome-panel-column">
					<div style="padding:4px;">
						<h3>
							<span class="dashicons dashicons-embed-generic"></span>
							<?php esc_html_e('Desactivar Bootstrap.', 'ekiline-collection'); ?>
						</h3>
						<p><?php esc_html_e('En ocasiones tu proyecto cuenta con estilos y scripts duplicados, incorporados en otros temas o plugins.', 'ekiline-collection'); ?></p>
						<p><?php esc_html_e('Si detectas este conflicto puedes desactivar los estilos y los scripts de este plugin.', 'ekiline-collection'); ?></p>
						<?php
						/**
						 * Formulario de opciones.
						 * https://codex.wordpress.org/index.php?title=Creating_Options_Pages&oldid=97268
						 */
						?>
						<form method="post" action="options.php">
							<?php settings_fields('ekiline-block-collection-settings-group'); ?>
							<label>
								<span>Estilos CSS</span>
								<?php
								$option_name_one = 'ekiline_block_collection_bootstrap_css';
								$current_value_one = get_option($option_name_one, '1');
								?>
								<select name="<?php echo esc_attr($option_name_one); ?>">
									<option value="1" <?php selected($current_value_one, '1'); ?>><?php esc_html_e('CSS Activo', 'ekiline-collection'); ?></option>
									<option value="0" <?php selected($current_value_one, '0'); ?>><?php esc_html_e('CSS Inactivo', 'ekiline-collection'); ?></option>
								</select>
							</label>
							<br>
							<label>
								<span>Scripts JS</span>
								<?php
								$option_name_two = 'ekiline_block_collection_bootstrap_js';
								$current_value_two = get_option($option_name_two, '1');
								?>
								<select name="<?php echo esc_attr($option_name_two); ?>">
									<option value="1" <?php selected($current_value_two, '1'); ?>><?php esc_html_e('JS Activo', 'ekiline-collection'); ?></option>
									<option value="0" <?php selected($current_value_two, '0'); ?>><?php esc_html_e('JS Inactivo', 'ekiline-collection'); ?></option>
								</select>
							</label>
							<input type="submit" class="button button-primary button-hero" value="<?php esc_html_e('Guardar ajustes Bootstrap.', 'ekiline-collection') ?>" />
						</form>
					</div>
				</div>
				<div class="welcome-panel-column">
					<div style="padding:4px;">
						<h3><span class="dashicons dashicons-block-default"></span>
							<?php esc_html_e('Oculta o muestra bloques', 'ekiline-collection'); ?></h3>
						<p><?php esc_html_e('Puedes mostrar solo los bloques necesarios para tu proyecto.', 'ekiline-collection'); ?></p>
					</div>
				</div>
			</div>

		</div>
	</div>


</div>
	<?php
}

/**
 * Ekiline, info.
 */
function ekiline_block_collection_about()
{ ?>
<div class="wrap">
	<h1>
		<span class="dashicons dashicons-layout" aria-hidden="true"></span>
			<?php esc_html_e('About Ekiline Block Collection', 'ekiline-collection'); ?>
	</h1>

	<div id="welcome-panel" class="welcome-panel">
		<div class="welcome-panel-content">

			<div class="welcome-panel-header">
				<span style="float:right;"><?php echo (function_exists('get_avatar')) ? get_avatar('uriel@bixnia.com', $size = '100', $default = '') : ''; ?></span>
				<h2><?php esc_html_e('Thanks for using this plugin!', 'ekiline-collection'); ?></h2>
				<p class="about-description">
					<?php esc_html_e('Find more information to improve your skills when use it.', 'ekiline-collection'); ?>
				</p>
			</div>

			<div class="welcome-panel-column-container">
				<div class="welcome-panel-column">
					<div style="padding:4px;">
						<h3><?php esc_html_e('Add an extra to the creation and delivery of your projects.', 'ekiline-collection'); ?></h3>
						<ul>
							<li><span class="dashicons dashicons-book dash-note"></span>
								<?php esc_html_e('Quick use guide in Keynote or Powerpoint to freely customize and deliver to your clients.', 'ekiline-collection'); ?></li>
							<li><span class="dashicons dashicons-edit dash-note"></span>
								<?php esc_html_e('More design elements, CSS, HTML and JS available to grow your project.', 'ekiline-collection'); ?></li>
							<li><span class="dashicons dashicons-layout dash-note"></span>
								<?php esc_html_e('Ekiline Blocks, plugin with carousel and more options in page editor.', 'ekiline-collection'); ?></li>
							<li><span class="dashicons dashicons-welcome-view-site dash-note"></span>
								<?php esc_html_e('Complete clean theme, no warnings or messages.', 'ekiline-collection'); ?></li>
						</ul>
						<p>
							<?php printf('<a class="button button-primary button-hero" href="%1$s" target="_blank"><span class="dashicons dashicons-cart"></span> %2$s</a>', esc_url('https://ekiline.com/compra/'), esc_html__('Buy and download', 'ekiline-collection')); ?>
							<?php printf('<a class="button button-primary button-hero gold" href="%1$s" target="_blank"><span class="dashicons dashicons-carrot"></span> %2$s</a>', esc_url('https://ekiline.com/fondeo/'), esc_html__('FundMe', 'ekiline-collection')); ?>
						</p>
						<p>
							<?php
							printf(
								/* translators: %1$s is replaced with links data */
								esc_html__('%1$s with Ekiline and %2$s, %3$s.', 'ekiline-collection'),
								'<a href="' . esc_url('https://ekiline.com/gana/') . '" target="_blank" rel="noopener">' . esc_html__('Make money', 'ekiline-collection') . '</a>',
								'<a href="' . esc_url('https://ekiline.com/fondeo/') . '" target="_blank" rel="noopener">' . esc_html__('fund its development', 'ekiline-collection') . '</a>',
								'<a href="' . esc_url('https://ekiline.com/') . '" target="_blank" rel="noopener">' . esc_html__('discover how', 'ekiline-collection') . '</a>'
							);
							?>
						</p>
					</div>
				</div>
				<div class="welcome-panel-column">
					<div style="padding:4px;">
						<h3><?php esc_html_e('About Ekiline', 'ekiline-collection'); ?></h3>
						<p><?php esc_html_e('Ekiline simplifies the creation of a website with WordPress, it is a working method that brings together the standard practices of the internet industry, to facilitate the tasks of planning, design, development and optimization. For more information visit ekiline.com', 'ekiline-collection'); ?></p>
						<h3><?php esc_html_e('About Uri Lazcano', 'ekiline-collection'); ?></h3>
						<p>
							<span style="float:left;"><?php echo (function_exists('get_avatar')) ? get_avatar('uriel@bixnia.com', $size = '60', $default = '') : ''; ?></span>
							<?php esc_html_e('Frontend designer established in Mexico City. 10 years developing websites and 10 more years of experience in graphic design for advertising. Check my career and work.', 'ekiline-collection'); ?>
						</p>
						<p>
							<?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://profiles.wordpress.org/urielink/'), esc_html__('WordPress', 'ekiline-collection')); ?>
							| <?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://github.com/Urielink'), esc_html__('Github', 'ekiline-collection')); ?>
							| <?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://www.linkedin.com/in/urielink/'), esc_html__('Linkedin', 'ekiline-collection')); ?>
							| <?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://www.behance.net/Urielink'), esc_html__('Behance', 'ekiline-collection')); ?>
							| <?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://bixnia.com'), esc_html__('B I X N I A', 'ekiline-collection')); ?>
						</p>
					</div>
				</div>
				<div class="welcome-panel-column welcome-panel-last">
					<div style="padding:4px;">
						<h3>
							<span class="dashicons dashicons-book dash-note"></span>
							<?php esc_html_e('Ekiline docs', 'ekiline-collection'); ?>
						</h3>
						<ul>
							<li><?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://ekiline.com/instala/'), esc_html__('Install', 'ekiline-collection')); ?></li>
							<li><?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://ekiline.com/personaliza/'), esc_html__('Customize', 'ekiline-collection')); ?></li>
							<li><?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://ekiline.com/elementos/'), esc_html__('Elements and blocks', 'ekiline-collection')); ?></li>
							<li><?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://ekiline.com/compatible/'), esc_html__('Compatibility', 'ekiline-collection')); ?></li>
						</ul>

						<?php
						/**
						 * Widget RSS reader.
						 */
						$rss_instance = array(
							'title' => 'Ekiline Tips:',
							'url'   => 'http://ekiline.com/feed/',
							'items' => 5,
						);
						$rss_args     = array(
							'before_widget' => '<div class="ekiline-notice widget %s">',
							'after_widget'  => '</div>',
							'before_title'  => '<h4 class="widgettitle">',
							'after_title'   => '</h4>',
							'target'        => '_blank',
						);
						the_widget('WP_Widget_RSS', $rss_instance, $rss_args);
						?>

						<p><small><strong><?php esc_html_e('Limited liability:', 'ekiline-collection'); ?></strong>
						<?php esc_html_e('As a courtesy, we provide information on how to use certain third-party products, but we do not directly support their use and we are not responsible for the functions, reliability or compatibility of such products. The names, trademarks and logos of third parties are registered trademarks of their respective owners.', 'ekiline-collection'); ?></small></p>
					</div>
				</div>
			</div>

		</div>
	</div>

	<p style="text-align: right;">
		<small>
			<?php
				/* translators: %1$s is replaced with date data */
				printf(esc_html__('&copy; Copyright %1$s Ekiline', 'ekiline-collection'), esc_attr(gmdate('Y')));
			?>
			<?php esc_html_e('All rights reserved. Ekiline developed by', 'ekiline-collection'); ?>
			<?php printf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://bixnia.com/'), esc_html__('BIXNIA', 'ekiline-collection')); ?>
		</small>
	</p>
</div>
	<?php
}

/**
 * Scripts y estilos para esta pagina.
 */
// add_action( 'admin_print_styles', 'ekiline_collection_options_css', 100 );
function ekiline_collection_options_css()
{
	$css = '
		.ekiline-notice, .ekiline-notice h4, .ekiline-notice ul, .ekiline-notice ul li{ margin:0px 5px 0px 0px !important; padding-bottom:0px !important; display: inline-block; }
		.ekiline-notice ul li, .welcome-panel::before{ display:none;}
		.welcome-panel-header{box-sizing:border-box;margin-left:auto;margin-right:auto;max-width:1500px;width:100%;padding:40px;}
		.welcome-panel-column {display: block;}
		.welcome-panel .welcome-panel-column-container {margin-top: 0px;}
		.welcome-panel-column form label {display: flex; justify-content:space-between}
		.welcome-panel-column form select {width: 60%;}
		.button {width: 100%; text-align:center;}
	';
	echo '<style id="ekiline-block-collection-settings-css">' . esc_html($css) . '</style>';
}

// add_action( 'admin_print_scripts', 'ekiline_collection_options_js', 100 );
function ekiline_collection_options_js()
{
	$js = '
	jQuery(document).ready(function($){
		var random = Math.floor(Math.random() * 5) + 1;
		$(\'.ekiline-notice ul li:nth-child(\' + random + \')\').delay(2000).show(100);
	});
	';
	echo '<script type="text/javascript" id="ekiline-block-collection-settings-js">' . esc_js($js) . '</script>';
}

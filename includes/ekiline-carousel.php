<?php
/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function ekiline_carousel_block_init() {
	register_block_type(
		'ekiline-collection/ekiline-carousel',
		array(
			'api_version'      => 2,
			// Render dinamico con php.
			'render_callback' => 'ekiline_carousel_dynamic_render_callback',
			'attributes' => [
				// Clase css.
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				// Toolbar.
				'align' => [
					'type' => 'string',
					'default' => '',
				],
				// Panel de personalizacion.
				'ChooseType' => [
					'type' => 'string',
					'default' => 'posts',
				],
				'SetIds' => [
					'type' => 'array',
					'default' => '',
				],
				'SetAmount' => [
					'type' => 'number',
					'default' => 3,
				],
				'SetOrderBy' => [
					'type' => 'string',
					'default' => 'date',
				],
				'SetColumns' => [
					'type' => 'number',
					'default' => 1,
				],
				'FindBlock' => [
					'type' => 'string',
					'default' => 'none',
				],
				'AllowMixed' => [
					'type' => 'boolean',
					'default' => false,
				],
				'AddControls' => [
					'type' => 'boolean',
					'default' => true,
				],
				'AddIndicators' => [
					'type' => 'boolean',
					'default' => true,
				],
				'SetAuto' => [
					'type' => 'boolean',
					'default' => true,
				],
				'SetTime' => [
					'type' => 'number',
					'default' => '5000',
				],
				'SetAnimation' => [
					'type' => 'string',
					'default' => '',
				],
				'SetHeight' => [
					'type' => 'number',
					'default' => '480',
				],
			]

		)
	);
}
// add_action( 'init', 'ekiline_carousel_block_init' );

/**
 * Argumentos de personalizacion.
 */
function ekiline_carousel_dynamic_render_callback( $block_attributes, $content ) {

	$carousel_args  = '';

	if ( 'posts' !== $block_attributes['ChooseType'] ){
		$carousel_args  .= 'type="' . $block_attributes['ChooseType'] . '" ';
	}

	if ( $block_attributes['SetIds'] ) {
		$array_to_string = implode( ",", $block_attributes['SetIds'] );
		$carousel_args  .= 'id="' . $array_to_string . '" ';
	}

	if ( '3' !==  $block_attributes['SetAmount'] && 'posts' === $block_attributes['ChooseType'] ){
		$carousel_args .= 'amount="' . $block_attributes['SetAmount'] . '" ';
	}

	if ( 'date' !== $block_attributes['SetOrderBy'] && 'posts' === $block_attributes['ChooseType'] ) {
		$carousel_args .= 'orderby="' . $block_attributes['SetOrderBy'] . '" ';
	}

	if ( 'none' !== $block_attributes['FindBlock'] && 'posts' === $block_attributes['ChooseType'] ){
		$carousel_args .= 'block="' . $block_attributes['FindBlock'] . '" ';
	}

	if ( 'none' !== $block_attributes['FindBlock'] && false !== $block_attributes['AllowMixed'] && 'posts' === $block_attributes['ChooseType'] ){
		$carousel_args .= 'mixed="true" ';
	}

	if ( 1 !== $block_attributes['SetColumns'] ){
		$carousel_args .= 'columns="' . $block_attributes['SetColumns'] . '" ';
	}
	if ( false === $block_attributes['AddControls'] ){
		$carousel_args .= 'control="false" ';
	}
	if ( false === $block_attributes['AddIndicators'] ){
		$carousel_args .= 'indicators="false" ';
	}
	if ( false === $block_attributes['SetAuto'] ){
		$carousel_args .= 'auto="false" ';
	}
	if ( '5000' !== $block_attributes['SetTime'] ){
		$carousel_args .= 'time="' . $block_attributes['SetTime'] . '" ';
	}
	if ( '' !== $block_attributes['SetAnimation'] ){
		$carousel_args .= 'animation="' . $block_attributes['SetAnimation'] . '" ';
	}
	if ( '480' !== $block_attributes['SetHeight'] ){
		$carousel_args .= 'height="' . $block_attributes['SetHeight'] . '" ';
	}

	$defaultClassName = '';
	$defaultClassName = 'wp-block-ekiline-collection-ekiline-carousel';
	$defaultClassName .= ( ! $block_attributes['className'] ) ? '' : ' ' . $block_attributes['className'];
	$defaultClassName .= ( ! $block_attributes['align'] ) ? '' : ' align' . $block_attributes['align'];
	$defaultClassName = ' class="' . $defaultClassName . '"';

	$carousel = '<div' . $defaultClassName . '>' . do_shortcode('[ekiline-carousel ' . $carousel_args . ']') . '</div>';
	return $carousel;
}

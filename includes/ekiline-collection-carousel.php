<?php
/**
 * Dynamic render for blocks
 *
 * @package ekiline-collection
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 * add_action( 'init', 'ekiline_collection_carousel_block_init' )
 */
function ekiline_collection_carousel_block_init() {
	register_block_type(
		'ekiline-collection/ekiline-carousel',
		array(
			'api_version'     => 2,
			// Render dinamico con php.
			'render_callback' => 'ekiline_collection_carousel_dynamic_render_callback',
			'attributes'      => [
				// Clase css.
				'className'     => [
					'type'    => 'string',
					'default' => '',
				],
				// Toolbar.
				'align'         => [
					'type'    => 'string',
					'default' => '',
				],
				// Panel de personalizacion.
				'ChooseType'    => [
					'type'    => 'string',
					'default' => 'posts',
				],
				'SetIds'        => [
					'type'    => 'array',
					'default' => '',
				],
				'SetAmount'     => [
					'type'    => 'number',
					'default' => 3,
				],
				'SetOrderBy'    => [
					'type'    => 'string',
					'default' => 'date',
				],
				'SetColumns'    => [
					'type'    => 'number',
					'default' => 1,
				],
				'FindBlock'     => [
					'type'    => 'string',
					'default' => 'none',
				],
				'AllowMixed'    => [
					'type'    => 'boolean',
					'default' => false,
				],
				'AddControls'   => [
					'type'    => 'boolean',
					'default' => true,
				],
				'AddIndicators' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'SetAuto'       => [
					'type'    => 'boolean',
					'default' => true,
				],
				'SetTime'       => [
					'type'    => 'number',
					'default' => '5000',
				],
				'SetAnimation'  => [
					'type'    => 'string',
					'default' => '',
				],
				'SetHeight'     => [
					'type'    => 'number',
					'default' => '480',
				],
				// Nuevas opciones.
				'ShowCaption'   => [
					'type'    => 'boolean',
					'default' => true,
				],
				'SetLinks'   => [
					'type'    => 'boolean',
					'default' => false,
				],
				'AddIndicatorsText'   => [
					'type'    => 'boolean',
					'default' => false,
				],
			],

		)
	);
}

/**
 * Argumentos de personalizacion.
 *
 * @param array $block_attributes controls from block.
 * @param array $content the content.
 */
function ekiline_collection_carousel_dynamic_render_callback( $block_attributes, $content ) {

	$carousel_args = '';

	if ( 'posts' !== $block_attributes['ChooseType'] ) {
		$carousel_args .= 'type="' . $block_attributes['ChooseType'] . '" ';
	}

	if ( $block_attributes['SetIds'] ) {
		$array_to_string = implode( ',', $block_attributes['SetIds'] );
		$carousel_args  .= 'id="' . $array_to_string . '" ';
	}

	if ( '3' !== $block_attributes['SetAmount'] && 'posts' === $block_attributes['ChooseType'] ) {
		$carousel_args .= 'amount="' . $block_attributes['SetAmount'] . '" ';
	}

	if ( 'date' !== $block_attributes['SetOrderBy'] && 'posts' === $block_attributes['ChooseType'] ) {
		$carousel_args .= 'orderby="' . $block_attributes['SetOrderBy'] . '" ';
	}

	if ( 'none' !== $block_attributes['FindBlock'] && 'posts' === $block_attributes['ChooseType'] ) {
		$carousel_args .= 'block="' . $block_attributes['FindBlock'] . '" ';
	}

	if ( 'none' !== $block_attributes['FindBlock'] && false !== $block_attributes['AllowMixed'] && 'posts' === $block_attributes['ChooseType'] ) {
		$carousel_args .= 'mixed="true" ';
	}

	if ( 1 !== $block_attributes['SetColumns'] ) {
		$carousel_args .= 'columns="' . $block_attributes['SetColumns'] . '" ';
	}
	if ( false === $block_attributes['AddControls'] ) {
		$carousel_args .= 'control="false" ';
	}
	if ( false === $block_attributes['AddIndicators'] ) {
		$carousel_args .= 'indicators="false" ';
	}
	if ( false === $block_attributes['SetAuto'] ) {
		$carousel_args .= 'auto="false" ';
	}
	if ( '5000' !== $block_attributes['SetTime'] ) {
		$carousel_args .= 'time="' . $block_attributes['SetTime'] . '" ';
	}
	if ( '' !== $block_attributes['SetAnimation'] ) {
		$carousel_args .= 'animation="' . $block_attributes['SetAnimation'] . '" ';
	}
	if ( '480' !== $block_attributes['SetHeight'] ) {
		$carousel_args .= 'height="' . $block_attributes['SetHeight'] . '" ';
	}
	if ( false === $block_attributes['ShowCaption'] ) {
		$carousel_args .= 'showcaption="false" '; // Nuevas opciones.
	}
	if ( $block_attributes['ShowCaption'] && false === $block_attributes['SetLinks'] ) {
		$carousel_args .= 'setlinks="false" ';
	}
	if ( false === $block_attributes['AddIndicatorsText'] ) {
		$carousel_args .= 'indicatorstext="false" ';
	}

	$default_class_name  = '';
	$default_class_name  = 'wp-block-ekiline-collection-ekiline-carousel';
	$default_class_name .= ( ! $block_attributes['className'] ) ? '' : ' ' . $block_attributes['className'];
	$default_class_name .= ( ! $block_attributes['align'] ) ? '' : ' align' . $block_attributes['align'];
	$default_class_name  = ' class="' . $default_class_name . '"';

	$carousel = '<div' . $default_class_name . '>' . do_shortcode( '[ekiline-carousel ' . $carousel_args . ']' ) . '</div>';
	return $carousel;
}


/**
 * Javascript en linea para carruseles (dynamic & static).
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_block_carousel_inline_script() {
	// Condición para mostrar js en front.
	if ( ! is_admin() && is_singular() && ! ( has_block( 'ekiline-collection/ekiline-carousel' ) || has_block( 'ekiline-collection/ekiline-carousel-extra' ) ) ) {
		return;
	}
	// Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador JS.
	$script_handle = ( wp_script_is( 'ekiline-layout', 'enqueued' ) ) ? 'ekiline-layout' : 'ekiline-collection-inline';
	wp_add_inline_script( $script_handle, ekiline_collection_block_carousel_scripts_code(), 'after' );
	// Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador CSS.
	$style_handle = ( wp_style_is( 'ekiline-style', 'enqueued' ) ) ? 'ekiline-style' : 'ekiline-collection-bootstrap-style';
	wp_add_inline_style( $style_handle, ekiline_collection_block_carousel_style_code() );
}
add_action( 'wp_enqueue_scripts', 'ekiline_collection_block_carousel_inline_script', 100 );

/**
 * Código JS complementario, transforma el carrusel.
 */
function ekiline_collection_block_carousel_scripts_code() {
	$code = '
function ekiline_collection_transform_carousel(carrusel){

	// Si no hay carrusel cancelar todo.
	var loaditem = document.querySelector(carrusel);
	if ( !loaditem || 0 < loaditem.getElementsByTagName(\'figure\').length ) {
		return;
	}

	// Funcion envoltorio (Wrapper).
	function envolver(fuente,col){
		var hijos = fuente.children;
		// crear envoltorio
		var wrapper = document.createElement(\'figure\');
			wrapper.className = \'col-md-\' + col;
		// envolver los hijos.
		for (var i = hijos.length - 1; i >= 0; i--) {
			wrapper.appendChild(hijos[i]);
		};
		fuente.appendChild(wrapper);
	}

	// Si hay carrusel,
	var siCarruseles = document.querySelectorAll(carrusel);

	// Cuantos son, modificar cada uno
	Array.prototype.forEach.call(siCarruseles, function(unCarrusel, i){

		// Objeto e indice. Vistas, columnas y grupo.
		var params = [ [\'x2\',\'6\',\'0\'],[\'x3\',\'4\',\'1\'],[\'x4\',\'3\',\'2\'],[\'x6\',\'2\',\'4\'] ];
		var view, item;
		// Envoltorio extra para agrupar.
		for ( var i = 0; i < params.length; i++ ) {
			// Atributos por clase.
			if ( unCarrusel.classList.contains(params[i][0]) ) {
				item = params[i][1];
				view = params[i][2];
			}
		}

		// Resultado de seleccion por carrusel
		// Carrusel padre. Items para envoltorio.
		hijosCarrusel = unCarrusel.querySelectorAll(\'.carousel-item\');

		// Carrusel hijo. Envoltorio por item.
		Array.prototype.forEach.call(hijosCarrusel, function(el,i){
			envolver(el,item);
		});

		// Loop grupos.
		Array.prototype.forEach.call(hijosCarrusel, function(el, i){
			// Copiar el primer slide y agregarlo.
			var next = el.nextElementSibling;
			if ( !next ) {
				next = el.parentNode.children[0];
			}

			// Elemento siguiente. Clonar.
			var firstChildClone = next.children[0].cloneNode(true);
			var firstChildSet = el.parentNode.children[i];
			firstChildSet.appendChild(firstChildClone);

			// Agrupar slides (view).
			for ( var i=0;i<view;i++ ) {
				next = next.nextElementSibling;
				if ( !next ) {
					next = el.parentNode.children[0];
				}
				firstChildClone = next.children[0].cloneNode(true);
				firstChildSet.appendChild(firstChildClone);
			}

		});
	});
};
ekiline_collection_transform_carousel(\'.carousel-multiple\');

function ekiline_collection_carousel_text_indicators(indicadores){
	const controlExterno = document.querySelectorAll(indicadores);
	// Verificar si existe text-indicators.
	if (controlExterno.length > 0){
		// Por cada control, agregar un evento.
		controlExterno.forEach(control => {
			// Verificar el carrusel padre.
			const padreCarrusel = control.parentNode;
			// Saber que indice se activa.
			padreCarrusel.addEventListener(\'slide.bs.carousel\', e => {
				// Quitar clase css active.
				control.children[e.from].classList.remove(\'active\')
				// Agregar clase css active.
				control.children[e.to].classList.add(\'active\')
				// Agregar un inidice de ayuda.
				padreCarrusel.classList.remove(\'index-\'+[e.from])
				padreCarrusel.classList.add(\'index-\'+[e.to])
			});
			padreCarrusel.classList.add(\'has-text-inidicators\');
		});
	}
}
ekiline_collection_carousel_text_indicators(\'.carousel-indicators.text-indicators\');
';
	return $code;
}

/**
 * Código JS complementario, mejora el carrusel.
 */
function ekiline_collection_block_carousel_style_code() {
	$custom_css = '
/* Carousel base */
.carousel,.carousel-item{min-height:50px;}
.carousel .carousel-item{overflow:hidden;}
.carousel-item .carousel-media{position:absolute;top:0;left:0;right:0;bottom:0;margin:0;padding:0;width:100%;height:100%;max-width:none;max-height:none;-o-object-fit:cover;object-fit:cover;outline:none;border:none;box-shadow:none;}
/* Carousel multiple */
.carousel-multiple,.carousel-multiple .carousel-item {height: inherit;}
.carousel-multiple .carousel-item.active,.carousel-multiple .carousel-item-next,.carousel-multiple .carousel-item-prev{display:flex;}
/* Efectos para carrusel: fade y vertical || Carousel effects: fade and vertical */
.carousel-fade .carousel-item {opacity:0;transition-duration:.6s;transition-property:opacity;}
.carousel-fade .carousel-item.active,.carousel-fade .carousel-item-next.carousel-item-start,.carousel-fade .carousel-item-prev.carousel-item-end {opacity:1;}
.carousel-fade .active.carousel-item-start,.carousel-fade .active.carousel-item-end {opacity:0;}
.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item.active,.carousel-fade .active.carousel-item-start,.carousel-fade .active.carousel-item-prev {transform: translateX(0);transform: translate3d(0, 0, 0);}
/* Vertical FX */
.carousel-vertical .carousel-inner{height:100%}
.carousel-vertical .carousel-inner > .carousel-item{-webkit-transition:.6s ease-in-out top;-o-transition:.6s ease-in-out top;transition:.6s ease-in-out top}
@media all and (transform-3d),(-webkit-transform-3d) {
	.carousel-vertical .carousel-inner > .carousel-item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000px}
	.carousel-vertical .carousel-inner > .carousel-item.carousel-item-next,.carousel-vertical .carousel-inner > .carousel-item.active.carousel-item-end{top:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}
	.carousel-vertical .carousel-inner > .carousel-item.carousel-item-prev,.carousel-vertical .carousel-inner > .carousel-item.active.carousel-item-start{top:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}
	.carousel-vertical .carousel-inner > .carousel-item.carousel-item-next.carousel-item-start,.carousel-vertical .carousel-inner > .carousel-item.carousel-item-prev.carousel-item-end,.carousel-vertical .carousel-inner > .carousel-item.active{top:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}
}
.carousel-vertical .carousel-inner > .carousel-item-next,.carousel-vertical .carousel-inner > .carousel-item-prev{top:0;height:100%}
.carousel-vertical .carousel-inner > .active,.carousel-vertical .carousel-inner > .carousel-item-next.carousel-item-start,.carousel-vertical .carousel-inner > .carousel-item-prev.carousel-item-end{top:0}
.carousel-vertical .carousel-inner > .carousel-item-prev,.carousel-vertical .carousel-inner > .active.carousel-item-start{left:0;top:-100%}
.carousel-vertical .carousel-inner > .carousel-item-next,.carousel-vertical .carousel-inner > .active.carousel-item-end{left:0;top:100%}
/* Regla general: posición de objetos || Rule: object position */
.carousel-multiple .carousel-inner .active.carousel-item-start,.carousel-multiple .carousel-inner .active.carousel-item-end{left:0%;-webkit-transition:all .6s ease 0s;-moz-transition:all .6s ease 0s;-o-transition:all .6s ease 0s;-ms-transition:all .6s ease 0s;transition:all .6s ease 0s;}
.carousel-multiple .carousel-caption {z-index: 1;}
.carousel-multiple .carousel-inner .carousel-item >*{float:left;position:relative;margin-bottom: 0px;overflow: hidden;}
/* variable por 2 thumbs (col-sm-6) || 2 thumbs */
.carousel-multiple.x2 .carousel-inner .active.carousel-item-start{-webkit-transform:translate3d(-50%,0,0);-moz-transform:translate3d(-50%,0,0);-ms-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);}
.carousel-multiple.x2 .carousel-inner .active.carousel-item-end{-webkit-transform:translate3d(50%,0,0);-moz-transform:translate3d(50%,0,0);-ms-transform:translate3d(50%,0,0);transform:translate3d(50%,0,0);}
.carousel-multiple.x2 .carousel-inner .carousel-item-prev{left:-50%;}
.carousel-multiple.x2 .carousel-inner .carousel-item-next{left:50%;}
/* variable por 3 thumbs (col-sm-4) || 3 thumbs */
.carousel-multiple.x3 .carousel-inner .active.carousel-item-start{-webkit-transform:translate3d(-33.33333333%,0,0);-moz-transform:translate3d(-33.33333333%,0,0);-ms-transform:translate3d(-33.33333333%,0,0);transform:translate3d(-33.33333333%,0,0);}
.carousel-multiple.x3 .carousel-inner .active.carousel-item-end{-webkit-transform:translate3d(33.33333333%,0,0);-moz-transform:translate3d(33.33333333%,0,0);-ms-transform:translate3d(33.33333333%,0,0);transform:translate3d(33.33333333%,0,0);}
.carousel-multiple.x3 .carousel-inner .carousel-item-prev{left:-33.33333333%;}
.carousel-multiple.x3 .carousel-inner .carousel-item-next{left:33.33333333%;}
/* variable por 4 thumbs (col-sm-3) || 4 thumbs */
.carousel-multiple.x4 .carousel-inner .active.carousel-item-start{-webkit-transform:translate3d(-25%,0,0);-moz-transform:translate3d(-25%,0,0);-ms-transform:translate3d(-25%,0,0);transform:translate3d(-25%,0,0);}
.carousel-multiple.x4 .carousel-inner .active.carousel-item-end{-webkit-transform:translate3d(25%,0,0);-moz-transform:translate3d(25%,0,0);-ms-transform:translate3d(25%,0,0);transform:translate3d(25%,0,0);}
.carousel-multiple.x4 .carousel-inner .carousel-item-prev{left:-25%;}
.carousel-multiple.x4 .carousel-inner .carousel-item-next{left:25%;}
/* variable por 6 thumbs (col-sm-2) || 6 thumbs */
.carousel-multiple.x6 .carousel-inner .active.carousel-item-start{-webkit-transform:translate3d(-16.66666667%,0,0);-moz-transform:translate3d(-16.66666667%,0,0);-ms-transform:translate3d(-16.66666667%,0,0);transform:translate3d(-16.66666667%,0,0);}
.carousel-multiple.x6 .carousel-inner .active.carousel-item-end{-webkit-transform:translate3d(16.66666667%,0,0);-moz-transform:translate3d(16.66666667%,0,0);-ms-transform:translate3d(16.66666667%,0,0);transform:translate3d(16.66666667%,0,0);}
.carousel-multiple.x6 .carousel-inner .carousel-item-prev{left:-16.66666667%;}
.carousel-multiple.x6 .carousel-inner .carousel-item-next{left:16.66666667%;}
/* Regla general: posición de objetos, después del clic || Objects after clic */
.carousel-multiple .carousel-inner .carousel-item-next.carousel-item-start{left:0%;}
.carousel-multiple .carousel-inner .carousel-item-prev.carousel-item-end{left:0%;}
.carousel-multiple .carousel-inner .carousel-item-next.carousel-item-start >*{opacity:0;}
.carousel-multiple .carousel-inner .carousel-item-next.carousel-item-start >*:last-child{opacity:1;}
.carousel-multiple .carousel-inner .carousel-item-prev.carousel-item-end >*{opacity:0;}
.carousel-multiple .carousel-inner .carousel-item-prev.carousel-item-end >*:first-child{opacity:1;}
/* Personalización de controles de carrusel || Carousel controls */
.carousel-control-prev-icon,.carousel-control-next-icon{background-size:15px;}
/* Columnas auxiliares (intermedias) || Intermediate columns */
.col-lg-1a5,.col-sm-1a5,.col-xs-1a5,.col-lg-1a7,.col-sm-1a7,.col-xs-1a7,
.col-lg-1a8,.col-sm-1a8,.col-xs-1a8,.col-lg-1a9,.col-sm-1a9,.col-xs-1a9{position:relative;min-height:1px;padding-right:15px;padding-left:15px;float:left;}
.col-lg-1a5,.col-sm-1a5,.col-xs-1a5{width:20%;width:20%;}
.col-lg-1a7,.col-sm-1a7,.col-xs-1a7{width:14.285714285714285714285714285714%;width:14.285714285714285714285714285714%;}
.col-lg-1a8,.col-sm-1a8,.col-xs-1a8{width:12.5%;width:12.5%;}
.col-lg-1a9,.col-sm-1a9,.col-xs-1a9{width:11.1111111%;width:11.1111111%;}
/* Extras carrusel */
.carousel-dark .carousel-indicators [data-bs-target] {background-color: rgba(var(--bs-black-rgb),1) !important;}
@media only screen and (max-width : 768px) {
	/* Carrusel extendido || Carousel extended */
	.carousel-multiple .carousel-inner .carousel-item >* {position:initial;}
	.carousel-multiple .carousel-item > *:nth-child(n+2){display:none;}
	.carousel-multiple .carousel-inner .carousel-item-next.carousel-item-start >*, .carousel-multiple .carousel-inner .carousel-item-prev.carousel-item-end >*{opacity:1;}
	.carousel-multiple.x2 .carousel-inner .active.carousel-item-start,.carousel-multiple.x3 .carousel-inner .active.carousel-item-start,.carousel-multiple.x4 .carousel-inner .active.carousel-item-start,.carousel-multiple.x6 .carousel-inner .active.carousel-item-start{-webkit-transform:translate3d(-100%,0,0);-moz-transform:translate3d(-100%,0,0);-ms-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);}
	.carousel-multiple.x2 .carousel-inner .active.carousel-item-end,.carousel-multiple.x3 .carousel-inner .active.carousel-item-end,.carousel-multiple.x4 .carousel-inner .active.carousel-item-end,.carousel-multiple.x6 .carousel-inner .active.carousel-item-end{-webkit-transform:translate3d(100%,0,0);-moz-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);}
	.col-sm-1a5,.col-xs-1a5,.col-sm-1a7,.col-xs-1a7,.col-sm-1a8,.col-xs-1a8,.col-sm-1a9,.col-xs-1a9{width:100%;width:100%;}
}
/* Carrusel con controles extra */
@keyframes animation_fadein_bottom{from{opacity:0;transform:translateY(100%);}to{opacity:1;}}
@keyframes animation_grow_right{0%{width:0%;}100%{width:90%;}}
.has-text-inidicators .carousel-caption{top:1.25rem;text-align:left;animation-duration:1s;animation-fill-mode:both;animation-name:animation_fadein_bottom;}
@media screen and (min-width:768px){.has-text-inidicators .carousel-caption{width:40%;top:calc(100%/4);}}
.has-text-inidicators .carousel-indicators:first-child{justify-content:start;}
.text-indicators{left:70%;width:25%;color:var(--bs-light);top:0;flex-direction:column;margin:0px;right:auto;z-index:1;}
.text-indicators [data-bs-target]{width:auto;height:auto;text-indent:initial;margin:0px;border:1px soli var(--bs-border-color);padding-top:15px;padding-bottom:15px;background-color:initial;background-clip:inherit;}
.text-indicators .active::after{content:"";height:3px;display:block;background-color:rgba(var(--bs-light-rgb),.5);animation:4s animation_grow_right;margin-top:10px;width:90%;}
';
	return $custom_css;
}

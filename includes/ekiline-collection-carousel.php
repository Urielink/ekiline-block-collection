<?php
/**
 * Dynamic render for blocks
 *
 * @package ekiline-block-collection
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/ 
 * add_action( 'init', 'ekiline_collection_carousel_block_init' )
 */
function ekiline_collection_carousel_block_init()
{
    register_block_type(
        'ekiline-block-collection/ekiline-carousel',
        array(
            'api_version'     => 2,
            // Render dinamico con php.
            // 'render_callback' => 'ekiline_collection_carousel_dynamic_render_callback_shortcode',
            'render_callback' => 'ekiline_collection_carousel_dynamic_render_callback',
            'attributes'      => [
                // Clase css.
                'className'         => [
                    'type'    => 'string',
                    'default' => '',
                ],
                // Toolbar.
                'align'             => [
                    'type'    => 'string',
                    'default' => '',
                ],
                // Ancla ID.
                'anchor'            => [
                    'type'    => 'string',
                    'default' => '',
                ],
                // Panel de personalizacion.
                'ChooseType'        => [
                    'type'    => 'string',
                    'default' => 'posts',
                ],
                'SetIds'            => [
                    'type'    => 'array',
                    'default' => '',
                ],
                'SetAmount'         => [
                    'type'    => 'number',
                    'default' => 3,
                ],
                'SetOrderBy'        => [
                    'type'    => 'string',
                    'default' => 'date',
                ],
                'SetColumns'        => [
                    'type'    => 'number',
                    'default' => 1,
                ],
                'FindBlock'         => [
                    'type'    => 'string',
                    'default' => 'none',
                ],
                'AllowMixed'        => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                'AddControls'       => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'AddIndicators'     => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'SetAuto'           => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'SetTime'           => [
                    'type'    => 'number',
                    'default' => '5000',
                ],
                'SetAnimation'      => [
                    'type'    => 'string',
                    'default' => '',
                ],
                'SetHeight'         => [
                    'type'    => 'number',
                    'default' => '480',
                ],
                // Nuevas opciones.
                'ShowCaption'       => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'SetLinks'          => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                'AddIndicatorsText' => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                // 23ENE23: Apoyo para la busqueda de categorias.
                'SetCatSlug' => [
                    'type'    => 'array',
                    'default' => '',
                ],
            ],

        )
    );
}

/**
 * Dynamic render callback.
 *
 * @param array  $block_attributes The block attributes.
 * @param string $content          The block content.
 * @return string
 */
function ekiline_collection_carousel_dynamic_render_callback($block_attributes, $content)
{

    // Sanitizar los valores del array.
    // foreach ($block_attributes as $key => $value) {
    //     $block_attributes[$key] = sanitize_text_field($value);
    // }

    // Modificar classname para bloque.
    $block_attributes['className'] = (!$block_attributes['className']) ? 'wp-block-ekiline-block-collection-ekiline-carousel' : 'wp-block-ekiline-block-collection-ekiline-carousel ' . $block_attributes['className'];

    if ('' !== $block_attributes['align']) {
        $block_attributes['className'] .= (!$block_attributes['align']) ? '' : ' align' . $block_attributes['align'];
    }
    if ('none' === $block_attributes['FindBlock']){
        $block_attributes['FindBlock'] = null;
    }
    if (false !== $block_attributes['AllowMixed']){
        $block_attributes['AllowMixed'] = null;
    }
    if (false === $block_attributes['AddControls']) {
        $block_attributes['AddControls'] = 'false';
    }
    if (false === $block_attributes['AddIndicators']) {
        $block_attributes['AddIndicators'] = 'false';
    }
    if (false === $block_attributes['AddIndicatorsText']) {
        $block_attributes['AddIndicatorsText'] = 'false';
    }
    if (false === $block_attributes['SetAuto']) {
        $block_attributes['SetAuto'] = 'false';
    }
    if (false === $block_attributes['ShowCaption']) {
        $block_attributes['ShowCaption'] = 'false';
    }
    if (false === $block_attributes['SetLinks']) {
        $block_attributes['SetLinks'] = 'false';
    }


    // Default posts.
    $carousel = ekiline_collection_carousel_posts($block_attributes['SetAmount'], $block_attributes['SetIds'], $block_attributes['FindBlock'], $block_attributes['SetOrderBy'], $mixed = null);

    // Condicion para imagenes y video.
    if ('posts' !== $block_attributes['ChooseType']) {
        $carousel = ekiline_collection_carousel_images($block_attributes['SetIds']);
    }

    // Numero de columnas.
    $columns = (in_array(sanitize_text_field($block_attributes['SetColumns']), [ '2','3','4','6' ], true)) ? ' carousel-multiple x' . $block_attributes['SetColumns'] : '';

    // Obtener HTML y combinar con funciones previas.
    ob_start();
    // echo '<code class="bg-white">' . wp_json_encode($block_attributes) . '</code><hr>';

    ekiline_collection_carousel_html(
        $carousel,
        $columns,
        $block_attributes['AddControls'],
        $block_attributes['AddIndicators'],
        $block_attributes['SetAuto'],
        $block_attributes['SetTime'],
        $block_attributes['SetAnimation'],
        $block_attributes['SetHeight'],
        $block_attributes['ShowCaption'],
        $block_attributes['SetLinks'],
        $block_attributes['AddIndicatorsText'],
        $block_attributes['className'],
        $block_attributes['anchor']
    );
    return ob_get_clean();
}

/**
 * Argumentos de personalizacion.
 *
 * @param array $block_attributes controls from block.
 * @param array $content the content.
 * @return html code by shortcode function.
 */
function ekiline_collection_carousel_dynamic_render_callback_shortcode($block_attributes, $content)
{

    $carousel_args = '';

    if ('posts' !== $block_attributes['ChooseType']) {
        $carousel_args .= 'type="' . $block_attributes['ChooseType'] . '" ';
    }

    if ($block_attributes['SetIds']) {
        $array_to_string = implode(',', $block_attributes['SetIds']);
        $carousel_args  .= 'id="' . $array_to_string . '" ';
    }

    if ('3' !== $block_attributes['SetAmount'] && 'posts' === $block_attributes['ChooseType']) {
        $carousel_args .= 'amount="' . $block_attributes['SetAmount'] . '" ';
    }

    if ('date' !== $block_attributes['SetOrderBy'] && 'posts' === $block_attributes['ChooseType']) {
        $carousel_args .= 'orderby="' . $block_attributes['SetOrderBy'] . '" ';
    }

    if ('none' !== $block_attributes['FindBlock'] && 'posts' === $block_attributes['ChooseType']) {
        $carousel_args .= 'block="' . $block_attributes['FindBlock'] . '" ';
    }

    if ('none' !== $block_attributes['FindBlock'] && false !== $block_attributes['AllowMixed'] && 'posts' === $block_attributes['ChooseType']) {
        $carousel_args .= 'mixed="true" ';
    }

    if (1 !== $block_attributes['SetColumns']) {
        $carousel_args .= 'columns="' . $block_attributes['SetColumns'] . '" ';
    }
    if (false === $block_attributes['AddControls']) {
        $carousel_args .= 'control="false" ';
    }
    if (false === $block_attributes['AddIndicators']) {
        $carousel_args .= 'indicators="false" ';
    }
    if (false === $block_attributes['SetAuto']) {
        $carousel_args .= 'auto="false" ';
    }
    if ('5000' !== $block_attributes['SetTime']) {
        $carousel_args .= 'time="' . $block_attributes['SetTime'] . '" ';
    }
    if ('' !== $block_attributes['SetAnimation']) {
        $carousel_args .= 'animation="' . $block_attributes['SetAnimation'] . '" ';
    }
    if ('480' !== $block_attributes['SetHeight']) {
        $carousel_args .= 'height="' . $block_attributes['SetHeight'] . '" ';
    }
    if (false === $block_attributes['ShowCaption']) {
        $carousel_args .= 'showcaption="false" '; // Nuevas opciones.
    }
    if ($block_attributes['ShowCaption'] && false === $block_attributes['SetLinks']) {
        $carousel_args .= 'setlinks="false" ';
    }
    if (false === $block_attributes['AddIndicatorsText']) {
        $carousel_args .= 'indicatorstext="false" ';
    }
    // Nuevas propiedades anchor, align + classname.
    if ('' !== $block_attributes['anchor']) {
        $carousel_args .= 'anchor="' . $block_attributes['anchor'] . '" ';
    }
    $default_class_name = 'wp-block-ekiline-block-collection-ekiline-carousel';
    if ('' !== $block_attributes['align']) {
        $default_class_name .= (!$block_attributes['align']) ? '' : ' align' . $block_attributes['align'];
    }
    if ('' !== $block_attributes['className']) {
        $default_class_name .= (!$block_attributes['className']) ? '' : ' ' . $block_attributes['className'];
    }
    $carousel_args .= 'classname="' . $default_class_name . '" ';

    $carousel = do_shortcode('[ekiline-carousel ' . $carousel_args . ']');

    return $carousel;
}

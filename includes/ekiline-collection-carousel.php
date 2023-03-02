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
function ekiline_collection_carousel_block_init()
{
    register_block_type(
        'ekiline-collection/ekiline-carousel',
        array(
            'api_version'     => 2,
            // Render dinamico con php.
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
 * Argumentos de personalizacion.
 *
 * @param array $block_attributes controls from block.
 * @param array $content the content.
 */
function ekiline_collection_carousel_dynamic_render_callback($block_attributes, $content)
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
    $default_class_name = 'wp-block-ekiline-collection-ekiline-carousel';
    if ('' !== $block_attributes['align']) {
        $default_class_name .= (! $block_attributes['align']) ? '' : ' align' . $block_attributes['align'];
    }
    if ('' !== $block_attributes['className']) {
        $default_class_name .= (! $block_attributes['className']) ? '' : ' ' . $block_attributes['className'];
    }
    $carousel_args .= 'classname="' . $default_class_name . '" ';

    $carousel = do_shortcode('[ekiline-carousel ' . $carousel_args . ']');
    return $carousel;
}

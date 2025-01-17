<?php
/**
 * Dynamic render for blocks
 *
 * @package ekiline-block-collection
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
 */
function ekiline_collection_carousel_block_init()
{
    $asset_file = include(plugin_dir_path(__FILE__) . '../build/index.asset.php');

    register_block_type(
        'ekiline-block-collection/ekiline-carousel',
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
// Inicializado en ekiline-block-collection.php
add_action('init', 'ekiline_collection_carousel_block_init');

/**
 * Dynamic render callback.
 *
 * @param array  $block_attributes The block attributes.
 * @param string $content          The block content.
 * @return string
 */
function ekiline_collection_carousel_dynamic_render_callback($block_attributes, $content)
{
    // Ajustar valores de $block_attributes.
    // Modificar classname.
    $block_attributes['className'] = (!$block_attributes['className']) ? 'wp-block-ekiline-block-collection-ekiline-carousel' : 'wp-block-ekiline-block-collection-ekiline-carousel ' . $block_attributes['className'];
    if ('' !== $block_attributes['align']) {
        $block_attributes['className'] .= (!$block_attributes['align']) ? '' : ' align' . $block_attributes['align'];
    }
    // Normalizar valores para ingresar funcion ekiline_collection_carousel_posts().
    if ('none' === $block_attributes['FindBlock']) {
        $block_attributes['FindBlock'] = null;
    }
    if (false === $block_attributes['AllowMixed']) {
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
    $carousel = ekiline_collection_carousel_posts(
        $block_attributes['SetAmount'],
        $block_attributes['SetIds'],
        $block_attributes['FindBlock'],
        $block_attributes['SetOrderBy'],
        $mixed = null
    );

    // Condicion para imagenes y video.
    if ('posts' !== $block_attributes['ChooseType']) {
        $carousel = ekiline_collection_carousel_images($block_attributes['SetIds']);
    }

    // Numero de columnas.
    $columns = (in_array(sanitize_text_field($block_attributes['SetColumns']), [ '2','3','4','6' ], true)) ? ' carousel-multiple x' . $block_attributes['SetColumns'] : '';

    // Devorlver marcado.
    return ekiline_collection_carousel_html_v2(
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

}

/**
 * Funcion para carrusel de entradas, por default, ocupa 7 slides y todas las categorias.
 * En caso de no obtener informacion.
 *
 * @link ref: https://developer.wordpress.org/reference/functions/render_block/
 *
 * @param string $ppp number, of posts to show.
 * @param array  $cat category ids or slug.
 * @param string $findblock block/name, to find and parse in slide.
 * @param string $orderby date/rand/etc, sort slides.
 * @param string $mixed allow to show thumbnails and blocks.
 * @return array query data.
 */
function ekiline_collection_carousel_posts($ppp = 3, $cat = array(), $findblock = null, $orderby = 'date', $mixed = null)
{

    $carousel = array();

    $args = array(
        'orderby'        => $orderby,
        'posts_per_page' => $ppp,
        'cat'            => $cat,
    );

    $carousel_query = new WP_Query($args);

    if ($carousel_query->have_posts()) {

        while ($carousel_query->have_posts()) {

            $carousel_query->the_post();

            /**
             * Junio 2 2022, WP6 corregir la salida de extracto.
             * Condiciones nuevas para extracto.
             * Octubre 2024 limpiar shortcodes de contenido.
             */
            $new_excerpt   = '';
            $clean_content = strip_shortcodes(get_the_content());

            if (strpos($clean_content, '<!--more-->')) {
                $new_excerpt = $clean_content;
            } else {
                $new_excerpt = wp_trim_words($clean_content, 55, '...');
            }

            $info            = array();
            $info['title']   = get_the_title();
            $info['plink']   = get_the_permalink();
            $info['content'] = get_the_content();
            $info['excerpt'] = (has_excerpt()) ? get_the_excerpt() : $new_excerpt;

            if (has_post_thumbnail()) {
                $thumb_id        = get_post_thumbnail_id();
                $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'full', true);
                $thumb_url       = $thumb_url_array[0];
                $info['image']   = $thumb_url;
                $info['alt']     = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
            }

            if ($findblock) {

                if ('true' !== $mixed) {
                    // Reset array, ignorar la informacion acumulada, solo mantener la nueva.
                    $info = array();
                }

                $blocks = parse_blocks(get_the_content());
                foreach ($blocks as $block) {
                    if ($block['blockName'] === $findblock) {
                        $info['block'] = render_block($block);
                    }
                }
            }

            if ($info) {
                $carousel[] = $info;
            }
        }
        wp_reset_postdata();
    }

    return $carousel;
}

/**
 * Funcion para carrusel de entradas, por default, ocupa 7 slides y todas las categorias.
 * En caso de no obtener informacion.
 *
 * @link ref: https://developer.wordpress.org/reference/functions/wp_get_attachment_image/
 * @link ref: https://developer.wordpress.org/reference/functions/wp_get_attachment_image_src/
 * @link ref: https://developer.wordpress.org/reference/functions/get_post_mime_type/
 *
 * 05-03-22: adicion de videos en el carrusel.
 * $info['image']   = wp_get_attachment_image_src( $image, 'full', true )[0]; // seleccion especifica url de imagen.
 *
 * @param array $ids image ids.
 * @return array images data.
 */
function ekiline_collection_carousel_images($ids = array())
{
    if (!$ids) {
        return;
    }
    $carousel = array();
    foreach ($ids as $index => $image) {
        $info             = array();
        $info['title']    = get_the_title($image);
        $info['image']    = wp_get_attachment_url($image); // seleccion general de url de attachment.
        $info['mimetype'] = get_post_mime_type($image); // conocer tipo de archivo llamado.
        $info['alt']      = get_post_meta($image, '_wp_attachment_image_alt', true);
        $info['excerpt']  = get_post($image)->post_excerpt; // Caption.
        $info['content']  = get_post($image)->post_content; // Description.
        $carousel[]       = $info;
    }
    return $carousel;
}


function ekiline_collection_carousel_html_v2($carousel_data, $columns, $control, $indicators, $auto, $time, $animation, $height, $showcaption, $setlinks, $indicatorstext, $classname, $anchor)
{
    if ($carousel_data) {
        $uniq_id   = ($anchor) ? $anchor : 'carousel_module_' . wp_rand(1, 99);
        $auto      = ('false' !== $auto) ? ' data-bs-ride="carousel"' : '';
        $time      = ($time) ? ' data-bs-interval="' . $time . '"' : '';
        $animation = ($animation) ? ' carousel-' . $animation : '';

        // Validar height.
        if (!$height) {
            $height = ' style="min-height:480px;"';
        } elseif ('0' === $height) {
            $height = ' style="min-height:100vh;"';
        } else {
            $height = ' style="min-height:' . $height . 'px;"';
        }
        $hastxtind = ('false' !== $indicatorstext) ? ' has-text-indicators' : '';
        $classname = ($classname) ? ' ' . $classname : '';

        // Iniciar el HTML para el carrusel
        $output = sprintf(
            '<div id="%s" class="carousel slide%s"%s%s>',
            esc_attr($uniq_id),
            esc_attr($columns . $animation . $hastxtind . $classname),
            wp_kses_post($auto . $time . $height),
            "\n"
        );

        // Agregar los indicadores si es necesario
        if ('false' !== $indicators) {
            $output .= '<div class="carousel-indicators">';
            foreach ($carousel_data as $index => $indicator) {
                $active = (0 === $index) ? 'active' : '';
                $output .= sprintf(
                    '<button type="button" data-bs-target="#%s" data-bs-slide-to="%d" class="%s"></button>',
                    esc_html($uniq_id),
                    esc_attr($index),
                    esc_attr($active)
                );
            }
            $output .= '</div>';
        }

        $output .= '<div class="carousel-inner">';
        foreach ($carousel_data as $index => $slide) {
            $active  = (0 === $index) ? ' active' : '';
            $img_load = (0 === $index) ? 'eager' : 'lazy';
            $img_cap  = (!isset($slide['image'])) ? ' no-image' : '';

            // Agregar las diapositivas
            $output .= sprintf(
                '<div class="carousel-item%s"%s>',
                esc_attr($active),
                wp_kses_post($height)
            );

            if (isset($slide['block'])) {
                $output .= wp_kses_post($slide['block']);
            } else {
                if (isset($slide['image'])) {
                    // 05-03-22: adicion de videos en el carrusel.
                    if (isset($slide['mimetype']) && str_contains($slide['mimetype'], 'video')) {
                        $output .= sprintf(
                            '<video class="carousel-media wp-block-cover__video-background intrinsic-ignore" autoplay muted loop playsinline controls src="%s" data-object-fit="cover"></video>',
                            esc_url($slide['image'])
                        );
                    } else {
                        // 18-01-23: permitir enlaces solo en imagenes, descartar protocolo https o permitir abrir en nueva ventana.
                        if ('false' !== $setlinks && $slide['content']) {
                            $output .= wp_kses_post(ekiline_set_media_link($slide['content'], $slide['image'], $slide['alt'], $slide['title']));
                        } else {
                            $output .= sprintf(
                                '<img class="carousel-media img-fluid" src="%s" alt="%s" title="%s" loading="%s">',
                                esc_url($slide['image']),
                                esc_html($slide['alt']),
                                esc_html($slide['title']),
                                esc_attr($img_load)
                            );
                        }
                    }
                }

                if ('false' !== $showcaption) {
                    $output .= sprintf(
                        '<div class="carousel-caption%s">',
                        esc_attr($img_cap)
                    );

                    if (isset($slide['title']) && $slide['title']) {
                        $output .= sprintf(
                            '<h3>%s%s%s</h3>',
                            isset($slide['plink']) && 'false' !== $setlinks ? '<a href="' . esc_html($slide['plink']) . '">' : '',
                            esc_html($slide['title']),
                            isset($slide['plink']) && 'false' !== $setlinks ? '</a>' : ''
                        );
                    }

                    if (isset($slide['excerpt']) && $slide['excerpt']) {
                        $output .= sprintf('<p>%s</p>', wp_kses_post($slide['excerpt']));
                    }

                    $output .= '</div>';
                }
            }

            $output .= '</div>';
        }

        $output .= '</div>';

        if ('false' !== $control) {
            $output .= sprintf(
                '<button type="button" class="carousel-control-prev" data-bs-target="#%s" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>',
                esc_html($uniq_id)
            );
            $output .= sprintf(
                '<button type="button" class="carousel-control-next" data-bs-target="#%s" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>',
                esc_html($uniq_id)
            );
        }

        if (!$columns && 'false' !== $indicatorstext) {
            $output .= '<ul class="carousel-text-indicators carousel-caption list-unstyled d-none d-md-flex">';
            foreach ($carousel_data as $index => $indicator) {
                $active = (0 === $index) ? 'active' : '';
                $output .= sprintf(
                    '<li type="button" data-bs-target="#%s" data-bs-slide-to="%d" class="%s">
                        <span class="h5">%s</span>
                    </li>',
                    esc_html($uniq_id),
                    esc_attr($index),
                    esc_attr($active),
                    esc_html($indicator['title'])
                );
            }
            $output .= '</ul>';
        }

        // Devolver el HTML generado
        return $output;
    }
}

/**
 * Funcion auxiliar, detectar url y adaptar a un enlace con o sin atributo.
 *
 * @param string $img_desc media description field content.
 * @param string $img_url media url.
 * @param string $img_alt media alt content.
 * @param string $img_title media title content.
 *
 * @return string html media code with/without link.
 */
function ekiline_set_media_link($img_desc, $img_url, $img_alt, $img_title)
{
    $media  = '<img class="carousel-media img-fluid" src="' . esc_url($img_url) . '" alt="' . esc_html($img_alt) . '" title="' . esc_html($img_title) . '" loading="lazy">';
    $target = '_self';
    // Verificar el texto en el campo, solo debe existir un enlace.
    $desc_str = explode(' ', trim($img_desc))[0];

    // Verificar que cuente con protocolo http.
    if (substr($desc_str, 0, 4) === 'http') {
        // Verificar si necesita que el enlace se abra en una nueva ventana.
        if (strpos($desc_str, '/_blank') !== false) {
            $img_desc = str_replace('/_blank', '', $img_desc);
            $target   = '_blank';
        }
        // Devolver el medio en un enlace.
        $media = '<a href="' . esc_html($img_desc) . '" target="' . $target . '">' . $media . '</a>';
    }
    return $media;
}



function bocaditos()
{
    // // wp json
    // $wp_json = json_encode($carousel_content);
    // return $wp_json;
    // // cont items
    $cont_items = count($carousel_content);
    // return $cont_items .' | '. $wp_json;

    // Devolver marcado.
    $jsonshow = json_encode($block_attributes['SetAmount']);
    // return $jsonshow . "\n" . $cont_items . "\n" . ekiline_collection_carousel_html_v2($carousel_content, $block_attributes);
}

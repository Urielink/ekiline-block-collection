/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { TextControl, SelectControl, PanelBody, ToggleControl, Button } from '@wordpress/components'
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor'
/**
 * Funciones personalizadas.
 * withSelect se ocupara para obtener datos del core.
 * Classname dinamica para el envoltorio del carrusel.
 */
import { FormTokenField } from '@wordpress/components'
import { useState } from '@wordpress/element'

/**
 * tutorial
 *  @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
 */
import { useSelect } from '@wordpress/data'
import { store as coreDataStore } from '@wordpress/core-data'
import { decodeEntities } from '@wordpress/html-entities'

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { createElement, renderToString } from '@wordpress/element'
const customIcon = createElement(
  'svg',
  { width: 20, height: 20 },
  createElement(
    'path',
    {
      d: 'M10.51,15.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.93,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm2.96-6.23v2.34l1.44-1.17-1.44-1.17ZM1,2.8v14.4H19V2.8H1Zm16.92,13.32H2.08V3.88h15.84v12.24Zm-9.34-1.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm-3.98-6.23l-1.44,1.17,1.44,1.17v-2.34Z'
    }
  )
)

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
//  import './editor.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('ekiline-collection/ekiline-carousel-extra', {
  apiVersion: 2,
  title: __('Carousel Extra', 'ekiline-collection'),
  icon: customIcon,
  description: __('Add a carousel to your posts, choose between posts or images, colmuns and more.', 'ekiline-collection'),
  category: 'media',
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: ['wide', 'full'],
    anchor: true
  },
  /**
	 * Argumentos para personalizacion.
	 */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    SetCatSlug: {
      type: 'array',
      default: ''
    },
    SetCatIds: {
      type: 'array',
      default: ''
    },
    SetAmount: {
      type: 'number',
      default: 3
    },
    AddControls: {
      type: 'boolean',
      default: true
    },
    SavePosts: {
      type: 'array',
      default: []
    }
    // content: {
    // 	type: 'string',
    // 	source: 'html',
    // 	selector: 'div',
    // },
  },

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: (props) => {
    const { attributes, setAttributes, isSelected } = props
    // Personalizar clase.
    const blockProps = useBlockProps({
      className: 'group-carousel-extra'
    })

    /**
		 * Selector de categorias, maneja la informacion que se guarda en el bloque.
		 * @param {*} attributes Accede a los registros en el bloque.
		 * @param {*} setAttributes Actualiza los registros en el bloque.
		 * @returns Custom component: FormTokenField.
		 */
    const TokenCategoriesSelect = () => {
      // Array de categorias existentes.
      const categories = useSelect(
        select =>
          select('core').getEntityRecords('taxonomy', 'category'),
        []
      )
      // Actualizacion de categorias seleccionadas.
      const [selectedCategories, setSelectedCategories] = useState([])
      // Componente, necesita de cambiarNombrePorIds.
      return (
        <FormTokenField
          label={__('Find and select categories:', 'ekiline-collection')}
          value={
						(!attributes.SetCatSlug) ? selectedCategories : attributes.SetCatSlug
					}
					// Mostrar sugerencias por nombre de url. (id, name, slug).
          suggestions={
						categories?.map((el) => el.slug)
					}
					// Varias operaciones: mostrar categorias seleccionadas, actualizar/guardar datos.
          onChange={(tokens) => {
					  setSelectedCategories(tokens)
					  setAttributes({
					    SetCatSlug: tokens,
					    SetCatIds: (cambiarNombrePorIds(tokens, categories, 'id')),
					    SavePosts: []
            })
          }}
        />
      )
    }

    /**
		 * Bloque principal de entradas por categoría.
		 * Dato, elegir segun el postType: page/post.
		 * Atributos de query:
		 * per_page, categories = numero entero
		 *
		 * @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
		 * @link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
		 * @link https://wordpress.stackexchange.com/questions/352323/how-to-return-a-list-of-custom-taxonomy-terms-via-the-gutenberg-getentityrecords
		 *
		 * @returns Custom component: EntriesList.
		 */
    function EntriesList ({ categorias, cantidad }) {
      // Categoria default: todas.
      const selCats = (categorias > 0) ? categorias : []
      // Cantidad de entradas: 3.
      const selAmount = (cantidad <= 0) ? '-1' : cantidad
      const posts = useSelect(
        select =>
          select(coreDataStore).getEntityRecords('postType', 'post', { per_page: selAmount, categories: selCats }),
        []
      )
      return <PostsList posts={posts} />
    }

    function PostsList ({ posts }) {
      /**
			 * Nota: Revisar estados, para confirmar que existe un cambio en la informacion.
			 * Si eran los estados, repercuten en los arrays.
			 */
      const postsStored = attributes.SavePosts

      // Reducir array de posts.
      // Condicion, si el arreglo existe, es mayor a cero y es igual en extension.
      if (posts !== null && posts?.length > 0 && posts?.length === posts?.length) {
        // No requiero todos los valores solo 5.
        const nuevoArray = filtrarEntriesList(posts)
        // Guardar array en propiedades de bloque.
        const savethis = (newval) => setAttributes({ SavePosts: newval })
        // Si no hay dato en el bloque o si no tienen la misma extension el dato guardado con el nuevo array.
        if (!postsStored || !postsStored?.length > 0 || nuevoArray?.length != postsStored?.length) {
          savethis(nuevoArray)
        }
      }

      if (!postsStored) {
        return (<></>)
      }

      return <CarosuelMarkupHtml attributes={attributes} postsStored={postsStored} />
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Carousel extra settings', 'ekiline-collection')} initialOpen>
            {/* Elegir categorias */}
            <TokenCategoriesSelect />
            {/* Numero de entradas */}
            <TextControl
              label={__('Number of items', 'ekiline-collection')}
              type='number'
              min='0'
              value={attributes.SetAmount}
              onChange={(newval) => {
							   setAttributes({ SetAmount: parseInt(newval) })
							   // reset saved posts.
							   setAttributes({ SavePosts: [] })
							 }}
              help={(attributes.SetAmount === 0) ? __('Danger! 0 shows all.', 'ekiline-collection') : ''}
            />
          </PanelBody>
        </InspectorControls>
        {/* El bloque */}
        <EntriesList categorias={attributes.SetCatIds} cantidad={attributes.SetAmount} />
        {/* El recordatorio */}
        {isSelected && (<UserRemind slugname={attributes.SetCatSlug} />)}
      </div>
    )
  },

  /**
	 * @see ./save.js
	 */
  // save,
  save: ({ attributes }) => {
    // Personalizar clase.
    const blockProps = useBlockProps.save({
      className: 'group-carousel-extra-front'
    })
    return (
      <div {...blockProps}>
        {/* El bloque */}
        <CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SavePosts} />
      </div>
    )
  }

})

/**
 * Mis funciones y componentes.
 */

/**
 * Prueba para exportar
 * nueva prueba: renderToString
 * https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#rendertostring
 * // let lacosa = renderToString(<EntriesList/>);
 * // console.log(lacosa);
 * Control personalizado: recordatorio.
 */

/**
 * Mensaje de categorias seleccionadas.
 * @param {*} addSlug incorpora la categoria en un aviso.
 * @returns HTML code with message.
 */
export function UserRemind ({ slugname }) {
  let message = __('Sin selecciones. ', 'ekiline-collection')
  let classname = 'editor-modal-route'
  if (slugname.length != 0) {
    const element = slugname?.map((el) => (el))
    message = __('Selecciones: ', 'ekiline-collection') + element
    classname = classname + ' has-anchor'
  }
  return (
    <div class={classname}>{message}</div>
  )
}

/**
 * Transformo una cadena id por nombre.
 * Crear nuevo array de categorias por ID.
 * @param {*} nombres slugs (url) de cada categoria.
 * @param {*} matriz grupo de categorias existentes.
 * @param {*} devolucion nombre de dato que buscas obtener, en este caso IDs.
 * @returns array de IDs por cada categoria.
 */
function cambiarNombrePorIds (nombres, matriz, devolucion) {
  const agrupoIds = []
  nombres.forEach(
    (nombre) => {
      // Encontrar objeto por value
      const encontrado = matriz.find((objeto) => (objeto.slug || objeto.id) === nombre)
      agrupoIds.push(encontrado)
    }
  )
  return agrupoIds.map(
    (itm) => itm[devolucion]
  )
}

/**
 * Filtrar los resultados para crear un arreglo con lo neceesario.
 * @param {*} posts Arreglo, selección de informacion.
 * @returns thePostsArray nuevo arreglo con la informacion procesada.
 */
function filtrarEntriesList (posts) {
  const thePostsArray = posts?.map(post => (
    {
      post_id: post.id,
      post_permalink: post.link,
      post_title: post.title.rendered,
      post_excerpt: (datoEntradaExtracto(post.excerpt.rendered)),
      post_thumbnail_url: ((post.featured_media) ? datoEntradaImagen(post.featured_media, 'url') : 0),
      post_thumbnail_alt: ((post.featured_media) ? datoEntradaImagen(post.featured_media, 'alt') : 0)
    }
  ))
  return thePostsArray
}

/**
 * Medios
 * @link https://wholesomecode.ltd/wpquery-wordpress-block-editor-gutenberg-equivalent-is-getentityrecords
 * @param {*} item pagina como objeto.
 * @returns HTML imagen.
 */
function datoEntradaImagen (item, src) {
  if (!item || !src) return null
  // Construir nuevo objeto: media.
  let media = useSelect(select => select(coreDataStore).getMedia(item))
  if (media) {
    // Leer nuevo objeto y extraer atributos.
    if (src === 'url') {
      // Url de medio, aún por definir mas atributos. Opciones: full, large, medium, medium_large, thumbnail
      media = media.media_details.sizes.full.source_url
    }
    if (src === 'alt') {
      // Url de medio, aún por definir mas atributos.
      media = media.alt_text
    }
    return media
  }
}

/**
 * Contenido con: dangerouslySetInnerHTML
 * dangerouslySetInnerHTML={ {__html: post.excerpt.rendered} }
 * https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
 * O reformateando el string, es para fines de muestra.
 * https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/edit.js
 */
function datoEntradaExtracto (extracto) {
  if (!extracto) return null
  const document = new window.DOMParser().parseFromString(extracto, 'text/html')
  const texto = document.body.textContent || document.body.innerText || ''
  return texto
}

/**
 * Marcado de carrusel, editor + front.
 */
export function CarosuelMarkupHtml ({ postsStored, attributes }) {
  const setCarouselId = attributes.anchor + 'block'
  return (
    <div id={setCarouselId} className='carousel slide' data-bs-ride='false'>
      <div class='carousel-indicators'>
        {postsStored?.map((post, index) => (
          <button
            key={post.id}
            type='button'
            data-bs-target={'#' + setCarouselId}
            data-bs-slide-to={index}
            className={(index === 0) ? 'active' : null}
            aria-current={(index === 0) ? true : null}
            aria-label={'Slide ' + (index + 1)}
          />
        ))}
      </div>
      <div className='carousel-inner'>
        {postsStored?.map((post, index) => (
          <div className={(index === 0 ? 'carousel-item active' : 'carousel-item')} key={post.post_id}>
            {/* Traer imagenes de cada entrada */}
            {(post.post_thumbnail_url)
						  ? <img className='d-block w-100' src={post.post_thumbnail_url} alt={(post.post_thumbnail_alt) ? post.post_thumbnail_alt : null} />
						  : null}
            <div class='carousel-caption d-none d-md-block'>
              <a className='h5' href={post.post_permalink} title={decodeEntities(post.post_title)}>
                {decodeEntities(post.post_title)}
              </a>
              {/* Traer extracto de cada entrada */}
              <p>{post.post_excerpt}</p>
            </div>
          </div>
        ))}
      </div>
      <button class='carousel-control-prev' type='button' data-bs-target={(setCarouselId) ? '#' + setCarouselId : null} data-bs-slide='prev'>
        <span class='carousel-control-prev-icon' aria-hidden='true' />
        <span class='visually-hidden'>Previous</span>
      </button>
      <button class='carousel-control-next' type='button' data-bs-target={(setCarouselId) ? '#' + setCarouselId : null} data-bs-slide='next'>
        <span class='carousel-control-next-icon' aria-hidden='true' />
        <span class='visually-hidden'>Next</span>
      </button>
    </div>
  )
}

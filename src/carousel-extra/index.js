/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { TextControl, SelectControl, PanelBody, ToggleControl, Button, RangeControl } from '@wordpress/components'
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
/**
 * Componente MediaUpload inicializacion.
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md
 */
// import { addFilter } from '@wordpress/hooks';
// const replaceMediaUpload = () => MediaUpload;
// addFilter(
// 	'editor.MediaUpload',
// 	'core/edit-post/components/media-upload/replace-media-upload',
// 	replaceMediaUpload
// );

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
  title: __('Carousel basic', 'ekiline-block-collection'),
  icon: customIcon,
  description: __('Add a non dynamic carousel to your posts, choose between posts or images.', 'ekiline-block-collection'),
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
      default: []
    },
    SetCatIds: {
      type: 'array',
      default: []
    },
    SetAmount: {
      type: 'number',
      default: 3
    },
    SavePosts: {
      type: 'array',
      default: []
    },
    // Opciones de posts.
    ChooseType: {
      type: 'string',
      default: 'posts'
    },
    ShowPostsBy: {
      type: 'string',
      default: 'date'
    },
    SortPosts: {
      type: 'string',
      default: 'desc'
    },
    // Opciones de imagen.
    SaveImages: {
      type: 'array',
      default: []
    },
    // Controles de carrusel.
    SetColumns: {
      type: 'number',
      default: 1
    },
    AddControls: {
      type: 'boolean',
      default: true
    },
    AddIndicators: {
      type: 'boolean',
      default: true
    },
    SetAuto: {
      type: 'boolean',
      default: true
    },
    SetTime: {
      type: 'number',
      default: '5000'
    },
    SetAnimation: {
      type: 'string',
      default: ''
    },
    SetHeight: {
      type: 'number',
      default: '480'
    },
    ShowCaption: {
      type: 'boolean',
      default: true
    },
    SetLinks: {
      type: 'boolean',
      default: false
    },
    AddIndicatorsText: {
      type: 'boolean',
      default: false
    },
    // entradas individuales
    SetPostSlug: {
      type: 'array',
      default: []
    },
    SetPostIds: {
      type: 'array',
      default: []
    }
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
      // 230123 Fix, mostrar todas las categorias.
      const categories = useSelect(
        select =>
          select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 }),
        []
      )
      // Actualizacion de categorias seleccionadas.
      const [selectedCategories, setSelectedCategories] = useState([])
      // Componente, necesita de cambiarNombrePorIds.
      return (
        <FormTokenField
          label={__('Find and select categories:', 'ekiline-block-collection')}
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
    function EntriesList ({ attributes }) {
      // Categoria default: todas.
      const setCats = (attributes.SetCatIds > 0) ? attributes.SetCatIds : []
      // Cantidad de entradas: 3.
      const setAmount = (attributes.SetAmount <= 0) ? '-1' : attributes.SetAmount
      // Orden: Ascendente.
      const queryPosts = {
        categories: setCats,
        per_page: setAmount,
        orderby: attributes.ShowPostsBy,
        order: attributes.SortPosts
      }
      const posts = useSelect(
        select =>
          select(coreDataStore).getEntityRecords('postType', 'post', queryPosts),
        []
      )

      /**
			 * Hay una cuestion con el computo.
			 * Si ocupas el editor muy rapido, no permites que concluya la organizacion del array.
			 * Esto genera un error. Por ello esta solucion provisional podria ser necesaria.
			 * Nota: queda pendiente averiguar como restablecer el bloque cuando falle.
			 */
      // Orden invertido a posts.
      // if (sort === 'asc'){
      // 	posts?.reverse();
      // }

      return <PostsList posts={posts} />
    }

    /**
		 * 01OCT2024 nuevo filtro de entradas individuales.
		 * Dato, elegir segun el postType: page/post.
		 * Atributos de query:
		 * per_page, categories = numero entero
		 *
		 * @returns Custom component: EntriesList.
		 */
    function SingleEntriesList ({ attributes }) {
      const queryPosts = {
        include: attributes.SetPostIds
      }
      const posts = useSelect(
        select =>
          select(coreDataStore).getEntityRecords('postType', 'post', queryPosts),
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

    /**
		 * Callback para los medios.
		 * @param {*} media arreglo de imagenes.
		 */
    const onSelectMedia = (media) => {
      const theImagesArray = media?.map(media => (
        // console.log(media)
        {
          post_id: media.id,
          post_permalink: media.link,
          post_title: media.caption,
          post_excerpt: media.alt,
          post_thumbnail_url: media.url,
          post_thumbnail_alt: media.alt
        }
      ))
      setAttributes({ SaveImages: theImagesArray })
    }
    // console.log(attributes.SaveImages);

    /**
		 * 01OCT2024 Selector de entradas, maneja la informacion que se guarda en el bloque.
		 * @param {*} attributes Accede a los registros en el bloque.
		 * @param {*} setAttributes Actualiza los registros en el bloque.
		 * @returns Custom component: FormTokenField.
		 */
    const TokenPostsSelect = () => {
      // Array de entradas existentes.
      const posts = useSelect(
        select =>
          select(coreDataStore).getEntityRecords('postType', 'post', { per_page: -1 }),
        []
      )
      // Actualizacion de entradas seleccionadas.
      const [selectedPosts, setSelectedPosts] = useState([])
      // Componente, necesita de cambiarNombrePorIds.
      return (
        <FormTokenField
          label={__('Find and select posts:', 'ekiline-block-collection')}
          value={
						(!attributes.SetPostSlug) ? selectedPosts : attributes.SetPostSlug
					}
					// Mostrar sugerencias por nombre de url. (id, name, slug).
          suggestions={
						posts?.map((el) => el.slug)
					}
					// Varias operaciones: mostrar entradas seleccionadas, actualizar/guardar datos.
          onChange={(tokens) => {
					  setSelectedPosts(tokens)
					  setAttributes({
					    SetPostSlug: tokens,
					    SetPostIds: (cambiarNombrePorIds(tokens, posts, 'id')),
					    SavePosts: []
            })
          }}
        />
      )
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          {/* Selector de tipo de contenido, posts o imagenes */}
          <PanelBody title={__('Carousel content', 'ekiline-block-collection')} initialOpen>

            <SelectControl
              label={__('Content type', 'ekiline-block-collection')}
              value={attributes.ChooseType}
              options={[
							  { label: __('Posts', 'ekiline-block-collection'), value: 'posts' },
							  { label: __('Images', 'ekiline-block-collection'), value: 'images' },
							  { label: __('Individual posts', 'ekiline-block-collection'), value: 'single' }
              ]}
              onChange={(ChooseType) => { setAttributes({ ChooseType, SavePosts: [], SaveImages: [] }) }}
            />

            {attributes.ChooseType === 'posts' && (
              <TokenCategoriesSelect />
            )}

            {attributes.ChooseType === 'images' && (
              <MediaUploadCheck>
                <MediaUpload
                  title={__('Carousel Images', 'ekiline-block-collection')}
                  onSelect={(media) => onSelectMedia(media)}
                  allowedTypes={['image', 'video']}
                  multiple
                  value={attributes.SaveImages?.map(item => item.post_id)}
                  render={({ open }) => (
                    <Button variant='secondary' onClick={open}>
                      {attributes.SaveImages.length
											  ? __('Manage images', 'ekiline-block-collection')
											  : __('Add images', 'ekiline-block-collection')}

                    </Button>
                  )}
                  gallery
                  addToGallery
                />
              </MediaUploadCheck>
            )}

            {attributes.ChooseType === 'single' && (
              <TokenPostsSelect />
            )}

            {attributes.ChooseType === 'posts' && (
              <SelectControl
                label={__('Show posts by', 'ekiline-block-collection')}
                value={attributes.ShowPostsBy}
                options={[
								  { label: __('Date', 'ekiline-block-collection'), value: 'date' },
								  { label: __('Title', 'ekiline-block-collection'), value: 'title' }
                ]}
                onChange={(ShowPostsBy) => {
								  setAttributes({ ShowPostsBy, SavePosts: [] })
                }}
              />
            )}

            {attributes.ChooseType === 'posts' && (
              <TextControl
                label={__('Items to show', 'ekiline-block-collection')}
                type='number'
                min='0'
                value={attributes.SetAmount}
                onChange={(newval) => {
								  setAttributes({ SetAmount: parseInt(newval), SavePosts: [] })
                }}
                help={(attributes.SetAmount === 0) ? __('Danger! 0 shows all.', 'ekiline-block-collection') : ''}
              />
            )}

            {attributes.ChooseType === 'posts' && (
              <SelectControl
                label={__('Sort items', 'ekiline-block-collection')}
                value={attributes.SortPosts}
                options={[
								  { label: __('Descend', 'ekiline-block-collection'), value: 'desc' },
								  { label: __('Ascend', 'ekiline-block-collection'), value: 'asc' }
                ]}
                onChange={(SortPosts) => {
								  setAttributes({ SortPosts, SavePosts: [] })
                }}
              />
            )}

          </PanelBody>

          <PanelBody title={__('Carousel Look', 'ekiline-block-collection')} initialOpen={false}>
            <RangeControl
              label={__('Columns', 'ekiline-block-collection')}
              value={attributes.SetColumns}
              onChange={(newval) =>
								  setAttributes({ SetColumns: parseInt(newval) })}
              min={1}
              max={4}
            />

            <ToggleControl
              label={__('Show controls', 'ekiline-block-collection')}
              checked={attributes.AddControls}
              onChange={(AddControls) =>
								  setAttributes({ AddControls })}
            />

            <ToggleControl
              label={__('Show indicators', 'ekiline-block-collection')}
              checked={attributes.AddIndicators}
              onChange={(AddIndicators) =>
								  setAttributes({ AddIndicators })}
            />
            {/* Opcion de controles */}
            {attributes.SetColumns === 1 &&
								(<ToggleControl
  label={__('Show text indicators', 'ekiline-block-collection')}
  checked={attributes.AddIndicatorsText}
  onChange={(AddIndicatorsText) =>
									  setAttributes({ AddIndicatorsText })}
								/>)}

            <ToggleControl
              label={__('Auto start', 'ekiline-block-collection')}
              checked={attributes.SetAuto}
              onChange={(SetAuto) => setAttributes({ SetAuto })}
            />

            <ToggleControl
              label={__('Show caption', 'ekiline-block-collection')}
              checked={attributes.ShowCaption}
              onChange={(ShowCaption) => setAttributes({ ShowCaption })}
            />
            {/* Opcion de enlaces */}
            {attributes.ShowCaption &&
							  (<ToggleControl
  label={__('Link titles', 'ekiline-block-collection')}
  checked={attributes.SetLinks}
  onChange={(SetLinks) => setAttributes({ SetLinks })}
							  /> )}

            <TextControl
              label={__('Transition in milliseconds', 'ekiline-block-collection')}
              type='number'
              value={attributes.SetTime}
              onChange={(newval) =>
								  setAttributes({ SetTime: parseInt(newval) })}
              min={0}
            />

            <SelectControl
              label={__('Animation type', 'ekiline-block-collection')}
              value={attributes.SetAnimation}
              options={[
								  { label: __('Default', 'ekiline-block-collection'), value: '' },
								  { label: __('Fade', 'ekiline-block-collection'), value: 'fade' },
								  { label: __('Vertical', 'ekiline-block-collection'), value: 'vertical' }
              ]}
              onChange={(SetAnimation) =>
								  setAttributes({ SetAnimation })}
            />

            <TextControl
              label={__('Height in pixels.', 'ekiline-block-collection')}
              type='number'
              value={attributes.SetHeight}
              onChange={(newval) =>
								  setAttributes({ SetHeight: parseInt(newval) })}
              min={0}
              help={(attributes.SetHeight === 0) ? __('Zero sets carousel at full display height.', 'ekiline-block-collection') : ''}
            />
          </PanelBody>
          {/* fin nuevos controles  */}

        </InspectorControls>
        {/* El bloque */}
        {attributes.ChooseType === 'posts' &&
					attributes.SavePosts &&
					(<EntriesList attributes={attributes} />)}
        {/* El recordatorio */}
        {attributes.ChooseType === 'posts' &&
					isSelected && (<UserRemind slugname={attributes.SetCatSlug} />)}
        {/* En caso de imagenes */}
        {attributes.ChooseType === 'images' &&
					attributes.SaveImages &&
					(<CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SaveImages} />)}
        {/* En caso de individual */}
        {attributes.ChooseType === 'single' &&
					attributes.SavePosts &&
					(<SingleEntriesList attributes={attributes} />)}
        {/* las imagenes en un arreglo */}
        {/* <code>{JSON.stringify(attributes.SaveImages)}</code> */}
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
        {attributes.ChooseType === 'posts' &&
					attributes.SavePosts &&
					(<CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SavePosts} />)}
        {/* En caso de imagenes */}
        {attributes.ChooseType === 'images' &&
					attributes.SaveImages &&
					(<CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SaveImages} />)}
        {/* En caso de individuales */}
        {attributes.ChooseType === 'single' &&
					attributes.SavePosts &&
					(<CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SavePosts} />)}
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
  let message = __('No category selected. ', 'ekiline-block-collection')
  let classname = 'editor-modal-route'
  if (slugname.length != 0) {
    const element = slugname?.map((el) => (el))
    message = __('Selected categories: ', 'ekiline-block-collection') + element
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
  const carId = attributes.anchor + 'block'
  const carCol = (attributes.SetColumns > 1) ? ' carousel-multiple x' + attributes.SetColumns : ''
  const carAni = (attributes.SetAnimation) ? ' carousel-' + attributes.SetAnimation : ''
  const carInd = (attributes.SetColumns === 1 && attributes.AddIndicatorsText) ? ' has-text-indicators' : ''
  const carStr = (attributes.SetAuto) ? 'carousel' : null
  // Reglas CSS inline.
  const min_height = { height: (attributes.SetHeight !== 0) ? attributes.SetHeight + 'px' : '100vh' }

  return (
    <div
      id={carId}
      className={'carousel slide' + carCol + carAni + carInd}
      data-bs-ride={carStr}
      data-bs-interval={attributes.SetTime}
      style={min_height}
    >

      {attributes.AddIndicators && (
        <div class='carousel-indicators'>
          {postsStored?.map((post, index) => (
            <button
              key={post.id}
              type='button'
              data-bs-target={'#' + carId}
              data-bs-slide-to={index}
              className={(index === 0) ? 'active' : null}
              aria-current={(index === 0) ? true : null}
              aria-label={'Slide ' + (index + 1)}
            />
          ))}
        </div>
      )}

      <div className='carousel-inner'>
        {postsStored?.map((post, index) => (
          <div className={(index === 0 ? 'carousel-item active' : 'carousel-item')} key={post.post_id} style={min_height}>
            {/* Traer imagenes de cada entrada */}
            {(post.post_thumbnail_url)
						  ? <img className='d-block w-100' src={post.post_thumbnail_url} alt={(post.post_thumbnail_alt) ? post.post_thumbnail_alt : null} />
						  : null}
            {attributes.ShowCaption && (
              <div class='carousel-caption'>
                <h3>
                  {!attributes.SetLinks && decodeEntities(post.post_title)}
                  {attributes.SetLinks && (
                    <a href={post.post_permalink} title={decodeEntities(post.post_title)}>
                      {decodeEntities(post.post_title)}
                    </a>
                  )}
                </h3>
                {/* Traer extracto de cada entrada */}
                <p>{post.post_excerpt}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {attributes.AddControls && (
        <div>
          <button class='carousel-control-prev' type='button' data-bs-target={(carId) ? '#' + carId : null} data-bs-slide='prev'>
            <span class='carousel-control-prev-icon' aria-hidden='true' />
            <span class='visually-hidden'>Previous</span>
          </button>
          <button class='carousel-control-next' type='button' data-bs-target={(carId) ? '#' + carId : null} data-bs-slide='next'>
            <span class='carousel-control-next-icon' aria-hidden='true' />
            <span class='visually-hidden'>Next</span>
          </button>
        </div>
      )}

      {attributes.SetColumns === 1 && attributes.AddIndicatorsText && (
        <ul class='carousel-text-indicators carousel-caption list-unstyled d-none d-md-flex'>
          {postsStored?.map((post, index) => (
            <li
              key={post.id}
              type='button'
              data-bs-target={'#' + carId}
              data-bs-slide-to={index}
              className={(index === 0) ? 'active' : null}
              aria-current={(index === 0) ? true : null}
              aria-label={'Slide ' + (index + 1)}
            >
              <span class='h5'>{decodeEntities(post.post_title)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

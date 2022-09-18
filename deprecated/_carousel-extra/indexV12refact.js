/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl,SelectControl,PanelBody, ToggleControl, Button, RangeControl } from '@wordpress/components';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
/**
 * Componente MediaUpload inicializacion.
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md
 */
import { addFilter } from '@wordpress/hooks';
const replaceMediaUpload = () => MediaUpload;
addFilter(
	'editor.MediaUpload',
	'core/edit-post/components/media-upload/replace-media-upload',
	replaceMediaUpload
);

/**
 * Funciones personalizadas.
 * withSelect se ocupara para obtener datos del core.
 * Classname dinamica para el envoltorio del carrusel.
 */
import { FormTokenField } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * tutorial
 *  @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
 */
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
 import { createElement, renderToString } from '@wordpress/element';
const customIcon = createElement(
	'svg',
	{ width: 20, height: 20 },
	createElement(
		'path',
		{
			d: 'M10.51,15.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.93,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm2.96-6.23v2.34l1.44-1.17-1.44-1.17ZM1,2.8v14.4H19V2.8H1Zm16.92,13.32H2.08V3.88h15.84v12.24Zm-9.34-1.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm-3.98-6.23l-1.44,1.17,1.44,1.17v-2.34Z'
		}
	)
);

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
	title: __( 'Carousel Extra', 'ekiline-collection' ),
	icon: customIcon,
	description: __( 'Add a carousel to your posts, choose between posts or images, colmuns and more.', 'ekiline-collection' ),
	category: 'media',
	supports: {
		// Removes support for an HTML mode.
		html: false,
		align: [ 'wide', 'full' ],
		anchor: true,
	},
	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		align: {
			type: 'string',
			default: '',
		},
		SetCatSlug: {
			type: 'array',
			default: [],
		},
		SetCatIds: {
			type: 'array',
			default: [],
		},
		SetAmount: {
			type: 'number',
			default: 3,
		},
		SavePosts:{
			type: 'array',
			default: [],
		},
		// Opciones de posts.
		ChooseType: {
			type: 'string',
			default: 'posts',
		},
		ShowPostsBy: {
			type: 'string',
			default: 'date',
		},
		SortPosts: {
			type: 'string',
			default: 'desc',
		},
		// Opciones de imagen.
		SaveImages: {
			type: 'array',
			default: [],
		},
		// Controles de carrusel.
		SetColumns: {
			type: 'number',
			default: 1,
		},
		AddControls: {
			type: 'boolean',
			default: true,
		},
		AddIndicators: {
			type: 'boolean',
			default: true,
		},
		SetAuto: {
			type: 'boolean',
			default: true,
		},
		SetTime: {
			type: 'number',
			default: '5000',
		},
		SetAnimation: {
			type: 'string',
			default: '',
		},
		SetHeight: {
			type: 'number',
			default: '480',
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes, isSelected } = props;
		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'group-carousel-extra',
		} );


		/**
		 * Selector de categorias, maneja la informacion que se guarda en el bloque.
		 * @param {*} attributes Accede a los registros en el bloque.
		 * @param {*} setAttributes Actualiza los registros en el bloque.
		 * @returns Custom component: FormTokenField.
		 */
		const TokenCategoriesSelect = ()=>{
			// Array de categorias existentes.
			const categories = useSelect(
				select =>
					select( 'core' ).getEntityRecords( 'taxonomy', 'category' ),
				[]
			);
			// Actualizacion de categorias seleccionadas.
			const [ selectedCategories, setSelectedCategories ] = useState( [] );
			// Componente, necesita de cambiarNombrePorIds.
			return(
				<FormTokenField
					label={ __( 'Find and select categories:', 'ekiline-collection' ) }
					value={
						(!attributes.SetCatSlug) ? selectedCategories : attributes.SetCatSlug
					}
					// Mostrar sugerencias por nombre de url. (id, name, slug).
					suggestions={
						categories?.map( ( el ) => el.slug )
					}
					// Varias operaciones: mostrar categorias seleccionadas, actualizar/guardar datos.
					onChange={ ( tokens ) => {
						setSelectedCategories( tokens );
						setAttributes( {
							SetCatSlug:tokens,
							SetCatIds: (cambiarNombrePorIds(tokens,categories,'id')),
							SavePosts: [],
						} );
					} }
				/>
			);
		};

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
		function EntriesList({attributes}) {
			// Categoria default: todas.
			const setCats = (attributes.SetCatIds>0)?attributes.SetCatIds:[];
			// Cantidad de entradas: 3.
			const setAmount = (attributes.SetAmount<=0)?'-1':attributes.SetAmount;
			// Orden: Ascendente.
			const queryPosts = {
				categories: setCats,
				per_page: setAmount,
				orderby: attributes.ShowPostsBy,
				order: attributes.SortPosts,
			}
			const posts = useSelect(
				select =>
					select( coreDataStore ).getEntityRecords( 'postType', 'post', queryPosts ),
				[]
			);

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

			return <PostsList posts={ posts }/>;
		}

		function PostsList( { posts } ) {

			/**
			 * Nota: Revisar estados, para confirmar que existe un cambio en la informacion.
			 * Si eran los estados, repercuten en los arrays.
			 */
			const postsStored = attributes.SavePosts;

			// Reducir array de posts.
			// Condicion, si el arreglo existe, es mayor a cero y es igual en extension.
			if( posts !== null && posts?.length > 0 && posts?.length === posts?.length ){
				// No requiero todos los valores solo 5.
				const nuevoArray = filtrarEntriesList(posts);
				// Guardar array en propiedades de bloque.
				const savethis = (newval)=>setAttributes({SavePosts:newval});
				// Si no hay dato en el bloque o si no tienen la misma extension el dato guardado con el nuevo array.
				if( !postsStored || ! postsStored?.length > 0 || nuevoArray?.length != postsStored?.length ){
					savethis(nuevoArray);
				}
			}

			if(!postsStored){
				return (<></>)
			}

			return <CarosuelMarkupHtml attributes={attributes} postsStored={postsStored}/>
		}

		/**
		 * Callback para los medios.
		 * @param {*} media arreglo de imagenes.
		 */

		const onSelectMedia = (media) => {
			const theImagesArray = media?.map( media => (
				// console.log(media)
				{
					post_id: media.id,
					post_permalink: media.link,
					post_title: media.caption,
					post_excerpt: media.alt,
					post_thumbnail_url: media.url,
					post_thumbnail_alt: media.alt,
				}
			) )
			setAttributes({ SaveImages: theImagesArray });
		};
		// console.log(attributes.SaveImages);

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					{/* Selector de tipo de contenido, posts o imagenes */}
					<PanelBody title={ __( 'Carousel content', 'ekiline-collection' ) } initialOpen={ true }>

						<SelectControl
							label={ __( 'Content type', 'ekiline-collection' ) }
							value={ attributes.ChooseType }
							options={ [
								{ label: __( 'Posts', 'ekiline-collection' ), value: 'posts' },
								{ label: __( 'Images / Video', 'ekiline-collection' ), value: 'images' },
							] }
							onChange={ ( ChooseType ) =>
								{ setAttributes( { ChooseType, SavePosts: [], SaveImages: [] } ) }
							}
						/>

						{ 'posts' === attributes.ChooseType && (
							<TokenCategoriesSelect/>
						)}

						{ 'images' === attributes.ChooseType && (
							<MediaUploadCheck>
								<MediaUpload
									title={ __( 'Carousel Images', 'ekiline-collection' ) }
									onSelect={ (media) => onSelectMedia(media) }
									allowedTypes={ [ 'image', 'video' ] }
									multiple={ true }
									value={ attributes.SaveImages?.map(item => item.id) }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ __( 'Add images', 'ekiline-collection' ) }
										</Button>
									) }
									gallery={ true }
									addToGallery={ true }
								/>
							</MediaUploadCheck>
						) }

						{ 'posts' === attributes.ChooseType && (
							<SelectControl
								label={ __( 'Show posts by', 'ekiline-collection' ) }
								value={ attributes.ShowPostsBy }
								options={ [
									{ label: __( 'Date', 'ekiline-collection' ), value: 'date' },
									{ label: __( 'Title', 'ekiline-collection' ), value: 'title' },
								] }
								onChange={ ( ShowPostsBy ) =>{
									setAttributes( { ShowPostsBy, SavePosts: [] } )
								}}
							/>
						) }

						{ 'posts' === attributes.ChooseType && (
								<TextControl
								label={ __( 'Items to show', 'ekiline-collection' ) }
								type='number'
								min='0'
								value={ attributes.SetAmount }
								onChange={ (newval)=>{
									setAttributes({ SetAmount: parseInt(newval), SavePosts: [] })
								} }
								help={ ( 0 === attributes.SetAmount ) ? __( 'Danger! 0 shows all.', 'ekiline-collection'  ) : '' }
							/>
						) }

						{ 'posts' === attributes.ChooseType && (
							<SelectControl
								label={ __( 'Sort items', 'ekiline-collection' ) }
								value={ attributes.SortPosts }
								options={ [
									{ label: __( 'Descend', 'ekiline-collection' ), value: 'desc' },
									{ label: __( 'Ascend', 'ekiline-collection' ), value: 'asc' },
								] }
								onChange={ ( SortPosts ) =>{
									setAttributes( { SortPosts, SavePosts: [] } )
								}}
							/>
						) }

					</PanelBody>

					<PanelBody title={ __( 'Carousel Look', 'ekiline-collection' ) } initialOpen={ false }>
							<RangeControl
								label={ __( 'Columns', 'ekiline-collection' ) }
								value={ attributes.SetColumns }
								onChange={ ( newval ) =>
									setAttributes( { SetColumns: parseInt( newval ) } )
								}
								min={ 1 }
								max={ 4 }
							/>

							<ToggleControl
								label={ __( 'Show controls', 'ekiline-collection' ) }
								checked={ attributes.AddControls }
								onChange={ ( AddControls ) =>
									setAttributes( { AddControls } )
								}
							/>

							<ToggleControl
								label={ __( 'Show indicators', 'ekiline-collection' ) }
								checked={ attributes.AddIndicators }
								onChange={ ( AddIndicators ) =>
									setAttributes( { AddIndicators } )
								}
							/>

							<ToggleControl
								label={ __( 'Auto start', 'ekiline-collection' ) }
								checked={ attributes.SetAuto }
								onChange={ ( SetAuto ) => setAttributes( { SetAuto } ) }
							/>

							<TextControl
								label={ __( 'Transition in milliseconds', 'ekiline-collection' ) }
								type="number"
								value={ attributes.SetTime }
								onChange={ ( newval ) =>
									setAttributes( { SetTime: parseInt( newval ) } )
								}
							/>

							<SelectControl
								label={ __( 'Animation type', 'ekiline-collection' ) }
								value={ attributes.SetAnimation }
								options={ [
									{ label: __( 'Default', 'ekiline-collection' ), value: '' },
									{ label: __( 'Fade', 'ekiline-collection' ), value: 'fade' },
									{ label: __( 'Vertical', 'ekiline-collection' ), value: 'vertical' },
								] }
								onChange={ ( SetAnimation ) =>
									setAttributes( { SetAnimation } )
								}
							/>

							<TextControl
								label={ __( 'Height in pixels, set zero to see full display height.', 'ekiline-collection' ) }
								type="number"
								value={ attributes.SetHeight }
								onChange={ ( newval ) =>
									setAttributes( { SetHeight: parseInt( newval ) } )
								}
							/>
						</PanelBody>
					{/* fin nuevos controles  */}

				</InspectorControls>
				{/* El bloque */}
				{ 'posts' === attributes.ChooseType
					&& attributes.SavePosts
					&& ( <EntriesList attributes={attributes}/> )
				}
				{/* El recordatorio */}
				{ 'posts' === attributes.ChooseType
					&& isSelected && ( <UserRemind slugname={attributes.SetCatSlug}/> )
				}
				{/* En caso de imagenes */}
				{ 'images' === attributes.ChooseType
					&& attributes.SaveImages
					&& ( <CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SaveImages}/> )
				}
				{/* las imagenes en un arreglo */}
				{/* <code>{JSON.stringify(attributes.SaveImages)}</code> */}
			</div>
		)
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ( { attributes } ) => {

		// Personalizar clase.
		const blockProps = useBlockProps.save( {
			className: 'group-carousel-extra-front',
		} );

		return (
			<div {...blockProps}>
				{/* El bloque */}
				{ 'posts' === attributes.ChooseType
					&& attributes.SavePosts
					&& ( <CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SavePosts}/> )
				}
				{/* En caso de imagenes */}
				{ 'images' === attributes.ChooseType
					&& attributes.SaveImages
					&& ( <CarosuelMarkupHtml attributes={attributes} postsStored={attributes.SaveImages}/> )
				}
			</div>
		)
	},

});

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
export function UserRemind( {slugname} ){
	let message = __( 'Sin selecciones. ', 'ekiline-collection' );
	let classname = 'editor-modal-route';
	if ( slugname.length != 0){
		let element = slugname?.map(( el ) => ( el ));
		message = __( 'Selecciones: ', 'ekiline-collection' ) + element ;
		classname = classname + ' has-anchor';
	}
	return(
		<div class={classname}>{ message }</div>
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
function cambiarNombrePorIds(nombres,matriz,devolucion){
	const agrupoIds = [];
	nombres.forEach(
		(nombre) => {
			// Encontrar objeto por value
			const encontrado = matriz.find((objeto) => (objeto.slug || objeto.id) === nombre);
			agrupoIds.push(encontrado);
		}
	);
	return agrupoIds.map(
		(itm) => itm[devolucion]
	);
}


/**
 * Filtrar los resultados para crear un arreglo con lo neceesario.
 * @param {*} posts Arreglo, selección de informacion.
 * @returns thePostsArray nuevo arreglo con la informacion procesada.
 */
function filtrarEntriesList(posts){
	const thePostsArray = posts?.map( post => (
		{
			post_id: post.id,
			post_permalink: post.link,
			post_title: post.title.rendered,
			post_excerpt: ( datoEntradaExtracto(post.excerpt.rendered) ),
			post_thumbnail_url: ( (post.featured_media) ? datoEntradaImagen(post.featured_media,'url') : 0 ),
			post_thumbnail_alt: ( (post.featured_media) ? datoEntradaImagen(post.featured_media,'alt') : 0 ),
		}
	) )
	return thePostsArray;
}

/**
 * Medios
 * @link https://wholesomecode.ltd/wpquery-wordpress-block-editor-gutenberg-equivalent-is-getentityrecords
 * @param {*} item pagina como objeto.
 * @returns HTML imagen.
 */
function datoEntradaImagen(item, src){
	if (!item || !src) return null;
	// Construir nuevo objeto: media.
	let media = useSelect(select => select( coreDataStore ).getMedia( item ));
	if ( media ){
		// Leer nuevo objeto y extraer atributos.
		if ( 'url'===src){
			// Url de medio, aún por definir mas atributos. Opciones: full, large, medium, medium_large, thumbnail
			media = media.media_details.sizes.full.source_url;
		}
		if ( 'alt'===src){
			// Url de medio, aún por definir mas atributos.
			media = media.alt_text;
		}
		return media;
	}
}

/**
 * Contenido con: dangerouslySetInnerHTML
 * dangerouslySetInnerHTML={ {__html: post.excerpt.rendered} }
 * https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
 * O reformateando el string, es para fines de muestra.
 * https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/edit.js
 */
function datoEntradaExtracto(extracto){
	if (!extracto) return null;
	const document = new window.DOMParser().parseFromString(extracto,'text/html');
	let texto = document.body.textContent || document.body.innerText || '';
	return texto;
}

/**
 * Marcado de carrusel, editor + front.
 */
export function CarosuelMarkupHtml({postsStored, attributes}){
	const setCarouselId = attributes.anchor + 'block';
	return (
		<div id={setCarouselId} className='carousel slide' data-bs-ride='false'>
			<div class='carousel-indicators'>
				{ postsStored?.map( (post,index) => (
						<button
							key={post.id}
							type='button'
							data-bs-target={'#'+setCarouselId}
							data-bs-slide-to={index}
							className={(index === 0)?'active':null}
							aria-current={(index === 0)?true:null}
							aria-label={'Slide '+(index + 1)}
						></button>
				) ) }
			</div>
			<div className={'carousel-inner'}>
				{ postsStored?.map( (post, index) => (
					<div className={(index===0?'carousel-item active':'carousel-item')} key={ post.post_id }>
						{/* Traer imagenes de cada entrada */}
						{ (post.post_thumbnail_url)
							? <img className='d-block w-100' src={ post.post_thumbnail_url } alt={ (post.post_thumbnail_alt) ? post.post_thumbnail_alt:null } />
							: null }
						<div class='carousel-caption d-none d-md-block'>
							<a className='h5' href={ post.post_permalink } title={ decodeEntities( post.post_title ) }>
								{ decodeEntities( post.post_title ) }
							</a>
							{/* Traer extracto de cada entrada */}
							<p>{post.post_excerpt}</p>
						</div>
					</div>
				)) }
			</div>
			<button class='carousel-control-prev' type='button' data-bs-target={(setCarouselId)?'#'+setCarouselId:null} data-bs-slide='prev'>
				<span class='carousel-control-prev-icon' aria-hidden='true'></span>
				<span class='visually-hidden'>Previous</span>
			</button>
			<button class='carousel-control-next' type='button' data-bs-target={(setCarouselId)?'#'+setCarouselId:null} data-bs-slide='next'>
				<span class='carousel-control-next-icon' aria-hidden='true'></span>
				<span class='visually-hidden'>Next</span>
			</button>
		</div>
	);
}
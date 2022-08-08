/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl,SelectControl,PanelBody, ToggleControl, Button } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
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
 * Funciones personalizadas
 */
/**
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
			default: '',
		},
		SetCatIds: {
			type: 'array',
			default: '',
		},
		SetAmount: {
			type: 'number',
			default: 3,
		},
		AddControls: {
			type: 'boolean',
			default: true,
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'div',
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
		 * Selector de categorias.
		 * @returns Custom component: FormTokenField.
		 */
		//  const TokenCategoriesSelect = () => {
		function TokenCategoriesSelect (){
			// el dato.
			const categories = useSelect(
				select =>
					select( 'core' ).getEntityRecords( 'taxonomy', 'category' ),
				[]
			);
			// console.log('hayDato? ' + attributes.SetCatSlug + ' hayDatoEnd.');
			// Recursos.
			const [ selectedCategories, setSelectedCategories ] = useState( [] );
			// Componente.
			return(
				<FormTokenField
					label={ __( 'Find and select categories:', 'ekiline-collection' ) }
					value={ (!attributes.SetCatSlug) ? selectedCategories : attributes.SetCatSlug }
					suggestions={
						// Solicitar por id, name, slug.
						categories?.map( ( el ) => el.slug )
					}
					onChange={ ( tokens ) => {
						// console.log('haytokens? ' + tokens + ' haytokensEnd.');
						setAttributes( { SetCatSlug:tokens } )
						setAttributes( { SetCatIds: cambiarNombrePorIds(tokens,categories,'id') } )
						setSelectedCategories( tokens )
					} }
				/>
			);
		};

		/**
		 * Bloque de entradas por categoría.
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
		function EntriesList() {
			// Categoria default: todas.
			const selCats = (attributes.SetCatIds>0)?attributes.SetCatIds:[];
			// Cantidad de entradas: 3.
			const selAmount = (0===attributes.SetAmount)?'-1':attributes.SetAmount;
			const posts = useSelect(
				select =>
					select( coreDataStore ).getEntityRecords( 'postType', 'post', { per_page: selAmount, categories: selCats } ),
				[]
			);
			return <PostsList posts={ posts }/>;
		}

		/**
		 * Medios
		 * @link https://wholesomecode.ltd/wpquery-wordpress-block-editor-gutenberg-equivalent-is-getentityrecords
		 * @param {*} item pagina como objeto.
		 * @returns HTML imagen.
		 */
		function entradaImagen( item ){
			// Construir nuevo objeto: media.
			const media = {};
			media[ item.id ] = useSelect(select => select( coreDataStore ).getMedia( item.featured_media ));
			// Leer nuevo objeto y extraer atributos.
			if ( media[ item.id ]  ){
				// Url de medio, aún por definir mas atributos.
				let imageThumbnailSrc = media[ item.id ].media_details.sizes.thumbnail.source_url;
				return <img src={ imageThumbnailSrc } />;
			}
		}
		/**
		 * Contenido con: dangerouslySetInnerHTML
		 * https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
		 * O reformateando el string, es para fines de muestra.
		 * https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/edit.js
		 */
		function entradaExtracto(extracto){
			const document = new window.DOMParser().parseFromString(extracto,'text/html');
			return document.body.textContent || document.body.innerText || '';
		}

		function PostsList( { posts } ) {
			return (
				<ul>
					{ posts?.map( post => (
						<li key={ post.id }>
							<a href={ post.link }>
								{/* { post.title } */}
								{ decodeEntities( post.title.rendered ) }
							</a>
							{/* Traer imagenes de cada entrada */}
							{ (post.featured_media) ? entradaImagen(post) : null }
							{/* Traer extracto de cada entrada */}
							{/* { decodeEntities( post.excerpt.rendered ) } */}
							<p>{ entradaExtracto( post.excerpt.rendered ) }</p>
						</li>
					) ) }
				</ul>
			);
		}

		/**
		 * Control personalizado: recordatorio.
		 */
		 function UserRemind(){
			let message = __( 'Sin selecciones. ', 'ekiline-collection' );
			let classname = 'editor-modal-route';
			if ( attributes.SetCatSlug.length != 0){
				let element = attributes.SetCatSlug?.map(( el ) => ( el ));
				message = __( 'Selecciones: ', 'ekiline-collection' ) + element ;
				classname = classname + ' has-anchor';
			}
			return(
				<div class={classname}>{ message }</div>
			)
		}

/**
 * nueva prueba: renderToString
 * https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#rendertostring
 */
		// let lacosa = renderToString(<EntriesList/>);
		// console.log(lacosa);

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Carousel extra settings', 'ekiline-collection' ) } initialOpen={ true }>
						{/* Elegir categorias */}
						<TokenCategoriesSelect/>
					</PanelBody>
				</InspectorControls>
				{/* El bloque */}
				<EntriesList/>
				{/* El recordatorio */}
				{ isSelected && ( <UserRemind/> ) }
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
			</div>
		)
	},

});


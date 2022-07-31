/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl,SelectControl,PanelBody, ToggleControl } from '@wordpress/components';
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
 import { createElement } from '@wordpress/element';
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
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes } = props;
		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'group-carousel-extra',
		} );

		/**
		 * Selector de categorias.
		 * @returns Custom component: FormTokenField.
		 */
		const TokenCategoriesSelect = () => {
			// el dato.
			const categories = useSelect(
				select =>
					select( 'core' ).getEntityRecords( 'taxonomy', 'category' ),
				[]
			);
			// console.log('hayDato? ' + attributes.SetCatSlug + ' hayDatoEnd.');
			// Recursos.
			const [ selectedContinents, setSelectedContinents ] = useState( [] );
			// Componente.
			return(
				<FormTokenField
					value={ (!attributes.SetCatSlug) ? selectedContinents : attributes.SetCatSlug }
					suggestions={
						// Solicitar por id, name, slug.
						categories?.map( ( el ) => el.slug )
					}
					onChange={ ( tokens ) => {
						// console.log('haytokens? ' + tokens + ' haytokensEnd.');
						setAttributes( { SetCatSlug:tokens } )
						setAttributes( { SetCatIds: cambiarNombrePorIds(tokens,categories,'id') } )
						setSelectedContinents( tokens )
					} }
				/>
			);
		};

		/**
		 * Bloque de entradas por categoría.
		 * @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
		 * @link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
		 * @link https://wordpress.stackexchange.com/questions/352323/how-to-return-a-list-of-custom-taxonomy-terms-via-the-gutenberg-getentityrecords 
		 * @returns Custom component: EntriesList.
		 */
		function EntriesList() {
			// const pages = [{ id: 'mock', title: 'Sample page' }]
			// Ocupar Page o Post.
			// el dato.
			const selCats = (attributes.SetCatIds>0)?attributes.SetCatIds:[];
			const selAmount = (0===attributes.SetAmount)?'-1':attributes.SetAmount;
			const pages = useSelect(
				select =>
					// select( coreDataStore ).getEntityRecords( 'postType', 'post', {per_page: 1, categories: [1] } ),
					select( coreDataStore ).getEntityRecords( 'postType', 'post', { per_page: selAmount, categories: selCats } ),
				[]
			);

			// console.log(pages)
			return <PagesList pages={ pages }/>;
		}

		function PagesList( { pages } ) {

			// const media = {};
			// let imageThumbnailSrc = '';
			// pages?.map( post => {
			// 	media[ post.id ] = useSelect(
			// 		select => select( coreDataStore ).getMedia( post.featured_media )
			// 	)
			// 	if ( media[ post.id ]  ){
			// 		imageThumbnailSrc = media[ post.id ].media_details.sizes.thumbnail.source_url;
			// 	}
			// })
			// console.log(media)
			// console.log(imageThumbnailSrc)

			function getUrlMedia(item){
				const media = {};
				let imageThumbnailSrc = '';
				media[ item.id ] = useSelect(
					select => select( coreDataStore ).getMedia( item.featured_media )
				)
				if ( media[ item.id ]  ){
					imageThumbnailSrc = media[ item.id ].media_details.sizes.thumbnail.source_url;
				}
				return <p><img src={ imageThumbnailSrc } /></p>;
			}


			return (
				<ul>
					{ pages?.map( page => (
						<li key={ page.id }>
							<a href={ page.link }>
								{/* { page.title } */}
								{ decodeEntities( page.title.rendered ) }
							</a>
							{/* Traer imagenes de cada entrada */}
							{ (page.featured_media) ? getUrlMedia(page) : null }
						</li>
					) ) }
				</ul>
			);
		}

		/**
		 * Control personalizado: recordatorio.
		 */
		 function UserRemind(){

			if ( attributes.SetCatSlug.length != 0){

				const element = attributes.SetCatSlug?.map(
					// ( el ) => ( '<span>' + el + '</span>, ' )
					// ( el ) => ( `<span>${el}</span>, ` )
					( el ) => ( el + ', ' )
				);

				return(
					<div class="editor-modal-route has-anchor">
						<pre>
						{ __( 'Selecciones:', 'ekiline-collection' ) }
						<br></br>
						{ element }
						</pre>
					</div>
					)
			}

			return(
				<div class="editor-modal-route">
					{ __( 'Sin selecciones. ', 'ekiline-collection' )}
				</div>
			)
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings', 'ekiline-collection' ) } initialOpen={ true }>
						{/* Elegir categorias */}
						<TokenCategoriesSelect/>
					</PanelBody>
				</InspectorControls>
				{/* El bloque */}
				<EntriesList/>
				{__( 'Carousel extra editor.', 'ekiline-collection' )}
				<UserRemind/>
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
				{__( 'Carousel extra front.', 'ekiline-collection' )}
				<hr></hr>
				{/* El bloque */}
			</div>
		)
	},

});

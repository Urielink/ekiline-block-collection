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
		SetIds: {
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

		const TokenCategoriesSelect = () => {
			// el dato.
			// const continents2 = [
			// 	{ title: 'Africa', value: '0' },
			// 	{ title: 'America', value: '1' },
			// 	{ title: 'Antarctica', value: '2' },
			// 	{ title: 'Asia', value: '3' },
			// 	{ title: 'Europe', value: '4' },
			// 	{ title: 'Oceania', value: '5' },
			// ];

			const categories = useSelect(
				select =>
					select( 'core' ).getEntityRecords( 'taxonomy', 'category' ),
				[]
			);

			console.log('hayDato')
			console.log(attributes.SetIds)
			console.log('hayDatoEnd')
			// Recursos.
			const [ selectedContinents, setSelectedContinents ] = useState( [] );
			// Componente.
			return(
				<FormTokenField
					value={ (!attributes.SetIds) ? selectedContinents : attributes.SetIds }
					suggestions={
						// continents
						// continents2?.map( ( el ) => el.title )
						// Solicitar por id, name, slug.
						categories?.map( ( el ) => el.slug )
					}
					onChange={ ( tokens ) => {
							console.log('onChange')
							console.log(tokens)
							console.log('onChangeEnd')
						setAttributes( { SetIds:tokens } )
						setSelectedContinents( tokens )
					} }
				/>
			);
		};

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
				{__( 'Carousel extra editor.', 'ekiline-collection' )}
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
			</div>
		)
	},

});

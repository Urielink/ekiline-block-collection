/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useSelect, select } from '@wordpress/data';


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
 *
 * Bloques necesarios para carousel.
 * .carousel
 * - .carousel-inner
 * - - .carousel-item
 * - .controls
 * - .inidicators

<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 */
registerBlockType( 'ekiline-collection/ekiline-carousel-blocks', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Carousel Blocks', 'ekiline-collection' ),
	icon: customIcon,
	description: __( 'Customize each carousel slide, full control.', 'ekiline-collection' ),
	category: 'media',
	supports: {
		inserter: true,
		anchor: true,
		align: [ 'wide', 'full' ],
		html: false,
		color: {
			background: true,
		},
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		align: {
			type: 'string',
			default: '',
		},
		CountChildren: {
			type: 'number',
			default: '',
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

		const { attributes, setAttributes } = props;

		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-collection/ekiline-carousel-blocks-content' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-carousel-blocks-content', {
				className: 'carousel-item active',
			} ],
			[ 'ekiline-collection/ekiline-carousel-blocks-content', {
				className: 'carousel-item',
			} ],
		];


		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'carousel-wrapper',
		} );

		// Precargar nombre ID.
		if( !attributes.anchor ){
			function getRandomArbitrary(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			}
			setAttributes( { anchor: 'carouselblocks' + getRandomArbitrary(10,150) } )
		}

		// Obtener el indice de los bloques agregados.
		const { clientId } = props;
		const innerBlockCount = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
		setAttributes( { CountChildren: innerBlockCount.length } )

		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }/>
					{/* {console.log(attributes.CountChildren)} */}
			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ({attributes}) => {

		// personalizar clase
		const blockProps = useBlockProps.save( {
			className: 'carousel-wrapper carousel slide',
		} );

		// Al inicio del componente
		const carouselId = `#${attributes.anchor}`;

		return (
			<div { ...blockProps }>
				{/* Controles. */}
				{ attributes.CountChildren && (
				<div className='carousel-indicators'>
					{ Array.from({ length: attributes.CountChildren }).map((_, i) => (
					<button
						key={i}
						type='button'
						data-bs-target={carouselId}
						data-bs-slide-to={i}
						className={i === 0 ? 'active' : ''}
						aria-current={i === 0 ? 'true' : ''}
						aria-label={`Slide ${i + 1}`}
					/>
					))}
				</div>
				)}

				{/* Contenido */}
				<div class='carousel-inner'>
					<InnerBlocks.Content />
				</div>

				<button class='carousel-control-prev' type='button' data-bs-target={carouselId} data-bs-slide='prev'>
					<span class='carousel-control-prev-icon' aria-hidden='true'></span>
					<span class='visually-hidden'>Previous</span>
				</button>
				<button class='carousel-control-next' type='button' data-bs-target={carouselId} data-bs-slide='next'>
					<span class='carousel-control-next-icon' aria-hidden='true'></span>
					<span class='visually-hidden'>Next</span>
				</button>


			</div>
		);
	},
} );


/**
 * - - carousel-blocks-content
 */

registerBlockType( 'ekiline-collection/ekiline-carousel-blocks-content', {
	title: __( 'Carousel Content', 'ekiline-collection' ),
	parent: ['ekiline-collection/ekiline-carousel-blocks'],
	icon: 'feedback',
	description:__( 'Inner carousel content.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
		html: false,
		reusable: false,
		// multiple: false,
		// inserter: false,
	},
	edit: () => {
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', { content: __( 'Add your blocks', 'ekiline-collection' ) } ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'carousel-content',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					template={ CHILD_TEMPLATE }/>
			</div>
		);
	},

	save: () => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'carousel-content carousel-item',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );


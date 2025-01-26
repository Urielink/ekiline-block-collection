/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components'

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
import { createElement } from '@wordpress/element'
const customIcon = createElement(
	'svg',
	{ width: 20, height: 20 },
	createElement(
		'path',
		{
			d: 'M12.16,5.26l-.76-.76-3.56,3.56,.76,.76,3.56-3.56Zm-2.99,.57c.28-.28,.28-.74,0-1.02s-.74-.28-1.02,0c-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.65,1.65c-.28,.28-.28,.74,0,1.02s.74,.28,1.02,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0Zm3.46,3.13H1v5.04H19v-5.04h-4.72Zm-7.16,4.14h-1.08v-3.24h1.08v3.24Zm2.47,0h-1.15v-3.24h1.15v3.24Zm3.38,0h-2.07v-3.24h2.07v3.24Zm5.13,0h-3.82v-3.24h3.82v3.24Z'
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
// import './editor.scss';

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
 * Bloques necesarios para nav. ("+" son variables)
 * - nav.navbar + navbar-expand-lg + bg-body-tertiary [fixed-top/fixed-bottom/sticky-top/sticky-bottom]
 * - - div + container-fluid + [container-md/sm/]
 * - - - a.navbar-brand [href]
 * - - - button.navbar-toggler [+ data]
 * - - - - span .navbar-toggler-icon
 * - - div + collapse navbar-collapse [+ id] variables off canvas [offcanvas offcanvas-end +  otros valores]
 * - - - - [bloque navegacion UL] intervenir clases css + [navbar-nav-scroll + style="--bs-scroll-height: 100px;"]
 * - - - - [Permitir otros bloques] intervenir clases css // Funciona para offcanvas.
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 *
 * Uso de Lock
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/docs/reference-guides/block-api/block-templates.md#individual-block-locking.
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/packages/block-editor/src/components/inner-blocks/README.md#templatelock
 *
 */
registerBlockType('ekiline-block-collection/ekiline-navbar', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	 */
	title: __('Navbar', 'ekiline-block-collection'),
	icon: customIcon,
	description: __('Customize a navigation bar and experiment with different properties to make the controls on your website more attractive', 'ekiline-block-collection'),
	category: 'design',
	supports: {
		anchor: true,
		color: {
			gradients: true // Enables the gradients UI control.
		}
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes: {
		navPosition: {
			type: 'string',
			default: '' // fixed-top, fixed-bottom, sticky-top, sticky-bottom.
		},
		navStyle: {
			type: 'string',
			default: 'collapse' // offcanvas,nav-scroller
		},
		navShow: {
			type: 'string',
			default: ' navbar-expand-lg' // lg,md,sm.
		},
		alignToggler: {
			type: 'boolean',
			default: false // markup before-after.
		},
		alignItems: {
			type: 'string',
			default: '', // justify-content-md-center
		},
		navMenu: {
			type: 'string',
			default: '' //id de navegacion *select.
		}
	},
	/**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
	providesContext: {
		'ekiline-navbar/anchor': 'anchor',
		'ekiline-navbar/navPosition': 'navPosition',
		'ekiline-navbar/navStyle': 'navStyle',
		'ekiline-navbar/navShow': 'navShow',
		'ekiline-navbar/alignToggler': 'alignToggler',
		'ekiline-navbar/alignItems': 'alignItems',
		'ekiline-navbar/navMenu': 'navMenu'
	},
	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {
		const { attributes, setAttributes } = props

		// Restringir los bloques, Cargar un preset.
		// @link https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
		const PARENT_ALLOWED_BLOCKS = [
			'ekiline-block-collection/ekiline-navbar-menu-wrapper'
		]

		const CHILD_TEMPLATE = [
			['ekiline-block-collection/ekiline-navbar-menu-wrapper']
		]

		// personalizar clase
		const blockProps = useBlockProps({
			className: 'navbar'
		})

		// Precargar nombre ID (anchor).
		if (!attributes.anchor) {
			setAttributes({ anchor: 'customNav' + getRandomArbitrary(10, 150) })
		}

		// Add new classname validating navPosition attribute
		if (attributes.navPosition) {
			blockProps.className += attributes.navPosition
		}
		if (attributes.navShow) {
			blockProps.className += attributes.navShow
		}
		if (attributes.alignItems) {
			blockProps.className += attributes.alignItems
		}

		// console.log(blockProps.className)

		return (
		<div {...blockProps}>
			{/* Inspector controles */}
			<InspectorControls>

				<PanelBody title={__('Nav Params', 'ekiline-block-collection')} initialOpen>

					<SelectControl
						label={__('Nav position', 'ekiline-block-collection')}
						value={attributes.navPosition}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: '' },
							{ label: __('Fixed top', 'ekiline-block-collection'), value: ' fixed-top' },
							{ label: __('Fixed bottom', 'ekiline-block-collection'), value: ' fixed-bottom' },
							{ label: __('Sticky top', 'ekiline-block-collection'), value: ' sticky-top' },
							{ label: __('Sticky bottom', 'ekiline-block-collection'), value: ' sticky-bottom' }
						]}
						onChange={(navPosition) =>
							setAttributes({ navPosition })}
					/>

					<SelectControl
						label={__('Nav style', 'ekiline-block-collection')}
						value={attributes.navStyle}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: 'collapse' },
							{ label: __('Offcanvas', 'ekiline-block-collection'), value: 'offcanvas' },
							{ label: __('Scroller', 'ekiline-block-collection'), value: 'nav-scroller' }
						]}
						onChange={(navStyle) =>
							setAttributes({ navStyle })}
					/>

					<SelectControl
						label={__('Nav display show', 'ekiline-block-collection')}
						value={attributes.navShow}
						options={[
							{ label: __('All', 'ekiline-block-collection'), value: ' navbar-expand-lg' },
							{ label: __('Tablet', 'ekiline-block-collection'), value: ' navbar-expand-md' },
							{ label: __('Smartphone', 'ekiline-block-collection'), value: ' navbar-expand-sm' }
						]}
						onChange={(navShow) =>
							setAttributes({ navShow })}
					/>

					<ToggleControl
						label={__('Nav button align', 'ekiline-block-collection')}
						checked={attributes.alignToggler}
						onChange={(alignToggler) =>
								setAttributes({ alignToggler })}
						help={
							(!attributes.alignToggler)
							? __('Default right', 'ekiline-block-collection')
							:__('Align left', 'ekiline-block-collection')
						}
					/>

					<SelectControl
						label={__('Select Menu', 'ekiline-block-collection')}
						value={attributes.navMenu}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: '' },
						]}
						onChange={(navMenu) =>
							setAttributes({ navMenu })}
					/>

					<SelectControl
						label={__('Align nav items', 'ekiline-block-collection')}
						value={attributes.alignItems}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: '' },
							{ label: __('Center', 'ekiline-block-collection'), value: ' justify-content-md-center' },
						]}
						onChange={(alignItems) =>
							setAttributes({ alignItems })}
					/>

				</PanelBody>
			</InspectorControls>

			{/* El bloque */}
			<InnerBlocks
				allowedBlocks={PARENT_ALLOWED_BLOCKS}
				template={CHILD_TEMPLATE}
			/>
		</div>
		)
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ({ attributes }) => {
		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save({
			className: 'navbar',
			'data-bs-toggle': attributes.navStyle,
			'data-bs-target': attributes.anchor,
			'aria-controls': attributes.anchor,
			'aria-expanded': 'false',
			'aria-label': 'Toggle navigation'
		})

		// Add new classname validating navPosition attribute
		if (attributes.navPosition) {
			blockProps.className += attributes.navPosition
		}
		if (attributes.navShow) {
			blockProps.className += attributes.navShow
		}
		if (attributes.alignItems) {
			blockProps.className += attributes.alignItems
		}

		// const innerContainer = useBlockProps.save({
		// className:
		// 		'container-fluid' +
		// 		(attributes.alignToggler ? ' aligntoggler' : '') +
		// 		(attributes.navStyle != 'default' ? attributes.navStyle : '')

		// })

		// Componente Boton.
		function NavToggler () {
				return (
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target={'#' + attributes.anchor + 'Child'}
						aria-controls={attributes.anchor + 'Child'}
						aria-expanded='false'
						aria-label={__('Toggle navigation', 'ekiline-block-collection')}>
							<span class='dashicons dashicons-menu'></span>
					</button>
				)
		}

		return (
		<div
			{...blockProps}
			tabindex='-1'
			role='dialog'
			aria-labelledby={blockProps.id + 'Label'}
			aria-hidden='true'
		>
			<div className='container-fluid'>

				{ !attributes.alignToggler &&
						<NavToggler />
				}

				<InnerBlocks.Content />

				{ attributes.alignToggler &&
						<NavToggler />
				}


			</div>

		</div>
		)
	}
})

/**
 * Bloque interno accordion-item-body
 * - nav.navbar + navbar-expand-lg + bg-body-tertiary [fixed-top/fixed-bottom/sticky-top/sticky-bottom]
 * - - div + container-fluid + [container-md/sm/]
 * - - - a.navbar-brand [href]
 * - - - button.navbar-toggler [+ data]
 * - - - - span .navbar-toggler-icon
 * - - div + collapse navbar-collapse [+ id] variables off canvas [offcanvas offcanvas-end +  otros valores]
 * - - - - [bloque navegacion UL] intervenir clases css + [navbar-nav-scroll + style="--bs-scroll-height: 100px;"]
 * - - - - [Permitir otros bloques] intervenir clases css // Funciona para offcanvas.
 */
/**
 * Bloque interno accordion-item-body
 */
registerBlockType('ekiline-block-collection/ekiline-navbar-menu-wrapper', {
	title: __('Navbar menu container', 'ekiline-block-collection'),
	parent: ['ekiline-block-collection/ekiline-navbar'],
	icon: 'feedback',
	description: __('Add items to your navigation bar', 'ekiline-block-collection'),
	category: 'design',
	// Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
	usesContext: [
		'ekiline-navbar/anchor',
		'ekiline-navbar/navStyle',
		'ekiline-navbar/alignItems',
		'ekiline-navbar/navMenu'
	],
	supports: {
	  anchor: true,
	  html: false, // no permitir HTML
	  reusable: false,
	},
	attributes: {
		parentAnchor: {
		  type: 'string',
		  default: '' // remove dataset [data-bs-parent].
		},
		parentNavStyle: {
			type: 'string',
			default: ' collapse' // offcanvas,nav-scroller
		},
		parentAlignItems: {
			type: 'string',
			default: '', // justify-content-md-center
		},
		parentNavMenu: {
			type: 'string',
			default: '' //id de navegacion *select.
		}
	  },
	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {

	  const { attributes, setAttributes } = props

	  // Cargar un preset.
	  const CHILD_TEMPLATE = [
		['core/site-logo'],
		['core/navigation-submenu'],
		['core/paragraph'],
		['core/buttons']
	]


	  // personalizar clase
	  const blockProps = useBlockProps({
		className: 'collapse navbar-collapse',
		'data-bs-parent': (attributes.parentAlignItems && attributes.parentAnchor) ? '#' + attributes.parentAnchor : null
	  })

	  // Precargar nombre ID en hijos y valores heredados de contexto.
	  if (!attributes.parentAnchor) {
		setAttributes({ parentAnchor: props.context['ekiline-navbar/anchor'] })
	  }

	// Precargar nombre ID (anchor).
	if (!attributes.anchor) {
		setAttributes({ anchor: props.context['ekiline-navbar/anchor'] + 'Child' })
	}


	  // Actualizar estado parentNavStyle.
	  setAttributes({ parentNavStyle: props.context['ekiline-navbar/navStyle'] })
	  // Actualizar estado parentAlignItems.
	  setAttributes({ parentAlignItems: props.context['ekiline-navbar/alignItems'] })
	  // Actualizar estado parentNavMenu.
	  setAttributes({ parentNavMenu: props.context['ekiline-navbar/navMenu'] })


	  return (
		<div {...blockProps}>
		  {/* El bloque */}
		  <InnerBlocks
			template={CHILD_TEMPLATE}
		  />
		</div>
	  )
	},

	/**
	   * @see ./save.js
	   */
	// save,
	save: ({ attributes }) => {
	  // Clases y atributos auxiliares, incluir save.
	  const blockProps = useBlockProps.save({
		className: attributes.parentNavStyle + ' navbar-collapse',
		'data-bs-parent': (attributes.parentAlignItems && attributes.parentAnchor) ? '#' + attributes.parentAnchor : null
	  })


	  return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	  )
	}

  })


/**
 * Función auxiliar: random para Ids
 */
function getRandomArbitrary (min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}
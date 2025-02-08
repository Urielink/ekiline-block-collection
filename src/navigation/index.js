/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl } from '@wordpress/components'

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
 * Función auxiliar: random para Ids
 */
function getRandomArbitrary (min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

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
			gradients: true,
			text: true,
		},
		// Uso de bordes
        __experimentalBorder: {
            color: true,
            radius: true,
            style: true,
            width: true,
            __experimentalDefaultControls: {
                color: true,
                radius: true,
                style: true,
                width: true,
            },
        },
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
		alignItems: {
			type: 'string',
			default: '', // justify-content-md-center
		},
		style: {
            type: 'object',
            default: {
                border: {
                    color: '#f5f5f5',
                    radius: '4px',
                    style: 'solid',
                    width: '1px',
                },
				color: {
                    background: '#ffffff'
                }
            },
        },
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
		'ekiline-navbar/alignItems': 'alignItems'
	},
	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {

		const { attributes, setAttributes } = props

		// personalizar clase
		const blockProps = useBlockProps({
			className: 'editor-navbar'
		})

		// Precargar nombre ID (anchor).
		if (!attributes.anchor) {
			setAttributes({ anchor: 'customNav' + getRandomArbitrary(10, 150) })
		}

		// Restringir los bloques.
		const PARENT_ALLOWED_BLOCKS = [
			'core/site-logo',
			'core/site-title',
			'core/paragraph',
			'core/buttons',
			'ekiline-block-collection/ekiline-navbar-menu-wrapper',
			'ekiline-block-collection/ekiline-navbar-toggler'
		]
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			['core/site-logo',{"width":60,"className":"navbar-brand mb-0"}],
			['core/site-title',{"className":"navbar-brand mb-0","style":{"typography":{"fontSize":"16px"}}}],
			['ekiline-block-collection/ekiline-navbar-toggler'],
			['ekiline-block-collection/ekiline-navbar-menu-wrapper']
		]

		// Función separada para determinar el texto de ayuda
		function getHelpText(data) {
			switch (data) {
				case '':
					return __('Hide navigation', 'ekiline-block-collection')
				case ' navbar-expand':
					return __('Show navigation', 'ekiline-block-collection')
				case ' navbar-expand-sm':
					return __('Expand on tablets and computers', 'ekiline-block-collection')
				default:
					return __('Expand on computers', 'ekiline-block-collection')
			}
		}

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
						label={__('Collapse navigation', 'ekiline-block-collection')}
						value={attributes.navShow}
						options={[
							{ label: __('Medium screens (default)', 'ekiline-block-collection'), value: ' navbar-expand-lg' },
							{ label: __('Small screens', 'ekiline-block-collection'), value: ' navbar-expand-sm' },
							{ label: __('Always expanded', 'ekiline-block-collection'), value: ' navbar-expand' },
							{ label: __('Always collapsed', 'ekiline-block-collection'), value: '' },
						]}
						onChange={(navShow) =>
							setAttributes({ navShow })
						}
						help={getHelpText(attributes.navShow)}
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
				orientation='horizontal'
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

		return (
			<div {...blockProps}>
				<div className='container-fluid'>
					<InnerBlocks.Content/>
				</div>
			</div>
		)
	}
})

/**
 * Bloque interno navbar
 * - nav.navbar + navbar-expand-lg + bg-body-tertiary [fixed-top/fixed-bottom/sticky-top/sticky-bottom]
 * - - div + container-fluid + [container-md/sm/]
 * - - - a.navbar-brand [href]
 * - - - button.navbar-toggler [+ data]
 * - - - - span .navbar-toggler-icon
 * - - div + collapse navbar-collapse [+ id] variables off canvas [offcanvas offcanvas-end +  otros valores]
 * - - - - [bloque navegacion UL] intervenir clases css + [navbar-nav-scroll + style="--bs-scroll-height: 100px;"]
 * - - - - [Permitir otros bloques] intervenir clases css // Funciona para offcanvas.
 */
registerBlockType('ekiline-block-collection/ekiline-navbar-menu-wrapper', {
	title: __('Navbar menu container', 'ekiline-block-collection'),
	parent: ['ekiline-block-collection/ekiline-navbar'],
	icon: customIcon,
	description: __('Add items to your navigation bar', 'ekiline-block-collection'),
	category: 'design',
	// Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
	usesContext: [
		'ekiline-navbar/anchor',
		'ekiline-navbar/navStyle',
		'ekiline-navbar/alignItems',
		'ekiline-navbar/navShow',
		'ekiline-navbar/navPosition'
	],
	supports: {
		anchor: true,
		html: false, // no permitir HTML
		reusable: false,
	},
	attributes: {
		lock: {
			type: 'object',
			default: {
				move: true,
				remove: true
			}
		},
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
		parentNavShow: {
			type: 'string',
			default: '' // lg,md,sm.
		},
		parentNavPosition: {
			type: 'string',
			default: '' // fixed-top, fixed-bottom, sticky-top, sticky-bottom.
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
			['core/navigation',{"overlayMenu":"never","style":{"typography":{"fontSize":"16px"}}}]
		]

		// personalizar clase
		const blockProps = useBlockProps({
			className: 'editor-collapse editor-navbar-collapse',
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
		// Actualizar estado parentNavShow.
		setAttributes({ parentNavShow: props.context['ekiline-navbar/navShow'] })
		// Actualizar estado parentNavPosition.
		setAttributes({ parentNavPosition: props.context['ekiline-navbar/navPosition'] })

		return (
			<InnerBlocks
				orientation='horizontal'
				template={CHILD_TEMPLATE}
			/>
		)
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ({ attributes }) => {

		// Modificar className de bloque.
		function addClassnames(data) {
			if (data === 'offcanvas') {
				return 'offcanvas offcanvas-end'
			}
			return data + ' navbar-collapse';
		}

		const blockProps = useBlockProps.save({
			className: addClassnames(attributes.parentNavStyle),
			'data-bs-parent': (attributes.parentAlignItems && attributes.parentAnchor) ? '#' + attributes.parentAnchor : null
		})
		// En caso de fixed-bottom o sticky-bottom.
		if (attributes.parentNavPosition === ' fixed-bottom' || attributes.parentNavPosition === ' sticky-bottom') {
			blockProps.className += ' order-first'
		}

		// Modificar className de boton.
		function addClassnamesBtn(data) {
			switch (data) {
				case ' navbar-expand-lg':
					return ' d-lg-none'
				case ' navbar-expand-sm':
					return ' d-sm-none'
				case ' navbar-expand':
					return ' d-none'
				default:
					return ''
			}
		}

		return (
			<div {...blockProps}>
				{attributes.parentNavStyle === 'offcanvas' && (
					<button type="button" 
						class={'btn-close' + addClassnamesBtn(attributes.parentNavShow) } 
						data-bs-dismiss="offcanvas" 
						aria-label="Close"></button>
				)}
				<InnerBlocks.Content />
			</div>
		)
	}

})

/**
 * Bloque interno toggler, componente.
 * estilos https://wordpress.stackexchange.com/questions/404653/how-to-set-defaults-for-border-controls-in-custom-block
 */
registerBlockType('ekiline-block-collection/ekiline-navbar-toggler', {
	title: __('Navbar toggler', 'ekiline-block-collection'),
	parent: ['ekiline-block-collection/ekiline-navbar'],
	icon: customIcon,
	description: __('Add a button to toggle the navigation bar', 'ekiline-block-collection'),
	category: 'design',
	// Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
	usesContext: [
		'ekiline-navbar/anchor',
		'ekiline-navbar/navStyle',
		'ekiline-navbar/navPosition',
	],
	supports: {
		anchor: true,
		html: false,
		color: {
			gradients: true,
			text: true,
		},
		// Uso de bordes
        __experimentalBorder: {
            color: true,
            radius: true,
            style: true,
            width: true,
            __experimentalDefaultControls: {
                color: true,
                radius: true,
                style: true,
                width: true,
            },
        },
	},
	attributes: {
		lock: {
			type: 'object',
			default: {
				move: true,
				remove: true
			}
		},
		parentAnchor: {
			type: 'string',
			default: '' // remove dataset [data-bs-parent].
		},
		parentNavStyle: {
			type: 'string',
			default: ' collapse' // offcanvas,nav-scroller
		},
		style: {
            type: 'object',
            default: {
                border: {
                    color: '#f5f5f5',
                    radius: '4px',
                    style: 'solid',
                    width: '1px',
                },
				color: {
                    background: '#f5f5f510'
                }
            },
        },
	},
	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {

		const { attributes, setAttributes } = props

		// personalizar clase
		const blockProps = useBlockProps({
			className: 'editor-navbar-toggler'
		})
		// Precargar nombre ID en hijos y valores heredados de contexto.
		if (!attributes.parentAnchor) {
			setAttributes({ parentAnchor: props.context['ekiline-navbar/anchor'] })
		}
		// Precargar nombre ID (anchor).
		if (!attributes.anchor) {
			setAttributes({ anchor: props.context['ekiline-navbar/anchor'] + 'Toggler' })
		}
		// Actualizar estado parentNavStyle.
		setAttributes({ parentNavStyle: props.context['ekiline-navbar/navStyle'] })

		return (
			<button {...blockProps}>
				<span class='dashicons dashicons-menu'></span>
			</button>
		)
	},
	save: ({ attributes }) => {

		const blockProps = useBlockProps.save({
			className: 'navbar-toggler',
			'data-bs-toggle': attributes.parentNavStyle,
			'data-bs-target': '#' + attributes.parentAnchor + 'Child',
			'aria-controls': attributes.parentAnchor + 'Child',
			'aria-expanded': (attributes.parentNavStyle !== 'offcanvas')?'false':null,
			'aria-label': __('Toggle navigation', 'ekiline-block-collection')
		})

		return (
			<button {...blockProps}>
				<span class="navbar-toggler-icon"></span>
			</button>
		)
	}
});

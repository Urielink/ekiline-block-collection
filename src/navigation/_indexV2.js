/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components'

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

		// Cargar un preset.
		const CHILD_TEMPLATE = [
			['core/site-logo'],
			['core/paragraph', { placeholder: __('Add a block', 'ekiline-block-collection') }],
			['core/navigation']
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
				orientation='horizontal'
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

		// Componente Boton.
		function NavToggler () {
			// Toggler classnames
			let togglerClassnames = (attributes.navPosition === ' fixed-bottom' || attributes.navPosition === ' sticky-bottom') ? 'navbar-toggler order-5' : 'navbar-toggler';
			// Toggle alinear botón
			togglerClassnames += (!attributes.alignToggler) ? ' ms-auto' : '';

			return (
				<button
					className={togglerClassnames}
					type='button'
					data-bs-toggle={attributes.navStyle}
					data-bs-target={'#' + attributes.anchor + 'Child'}
					aria-controls={attributes.anchor + 'Child'}
					aria-expanded={(attributes.navStyle !== 'offcanvas')?'false':null}
					aria-label={__('Toggle navigation', 'ekiline-block-collection')}>
						<span class='dashicons dashicons-menu'></span>
				</button>
			)
		}

		// atributos para collapse
		const collapseProps = {
			id: attributes.anchor + 'Child',
			className: (attributes.navStyle === 'offcanvas') ? 'offcanvas offcanvas-end' : attributes.navStyle + ' navbar-collapse'
		}
		if (attributes.alignItems) {
			collapseProps['className'] += attributes.alignItems
		}

		// Componente Boton cerrar (offcanvas)
        const BtnClose = () => {
            if (attributes.navStyle !== 'offcanvas') return null
            const addClassnamesBtn = (data) => {
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
                <button
                    type='button'
                    className={'btn-close' + addClassnamesBtn(attributes.navShow)}
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                ></button>
            )
        }

		return (
			<div {...blockProps}>
				<div className='container-fluid'>
					<NavToggler />
					<div>{'contenido a modificar'}</div>
					<div {...collapseProps}>
						<BtnClose />
						<InnerBlocks.Content />
					</div>

				</div>
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

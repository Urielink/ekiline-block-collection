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
	title: __('Nav', 'ekiline-block-collection'),
	icon: customIcon,
	description: __('Customize a navigation bar and experiment with different properties to make the controls on your website more attractive', 'ekiline-block-collection'),
	category: 'design',
	supports: {
		anchor: true
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
			default: ' collapse' // offcanvas,nav-scroller
		},
		navShow: {
			type: 'string',
			default: ' navbar-expand-lg' // lg,md,sm.
		},
		alignToggler: {
			type: 'boolean',
			default: true // markup before-after.
		},
		navMenu: {
			type: 'string',
			default: '' //id de navegacion *select.
		},
		alignItems: {
			type: 'string',
			default: '', // justify-content-md-center
		}
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
			'core/navigation-link',
			'core/social-links',
			'core/page-list',
			'core/spacer',
			'core/home-link',
			'core/site-title',
			'core/site-logo',
			'core/navigation-submenu',
			'core/loginout',
			'core/search',
			'core/buttons',
			'core/paragraph',
			'core/group'
		]

		const CHILD_TEMPLATE = [
			['core/site-logo'],
			['core/navigation-submenu'],
			['core/paragraph'],
			['core/buttons']
		]

		// personalizar clase
		const blockProps = useBlockProps({
			className: 'group-navbar'
		})

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
							{ label: __('Default', 'ekiline-block-collection'), value: ' collapse' },
							{ label: __('Offcanvas', 'ekiline-block-collection'), value: ' offcanvas' },
							{ label: __('Scroller', 'ekiline-block-collection'), value: ' nav-scroller' }
						]}
						onChange={(navStyle) =>
							setAttributes({ navStyle })}
					/>

					<SelectControl
						label={__('Nav display show', 'ekiline-block-collection')}
						value={attributes.navShow}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: ' navbar-expand-lg' },
							{ label: __('Offcanvas', 'ekiline-block-collection'), value: ' navbar-expand-md' },
							{ label: __('Scroller', 'ekiline-block-collection'), value: ' navbar-expand-sm' }
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
							(attributes.alignToggler)
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
						value={attributes.navShow}
						options={[
							{ label: __('Default', 'ekiline-block-collection'), value: '' },
							{ label: __('Center', 'ekiline-block-collection'), value: ' justify-content-md-center' },
						]}
						onChange={(navShow) =>
							setAttributes({ navShow })}
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
		className:
			'group-nav navbar' +
			(attributes.navPosition != 'default' ? attributes.navPosition : ''),
			'data-bs-toggle': attributes.navStyle,
			'data-bs-target': attributes.anchor,
			'aria-controls': attributes.anchor,
			'aria-expanded': 'false',
			'aria-label': 'Toggle navigation'
		})

		const dialogProps = useBlockProps.save({
		className:
				'collapse navbar-collapse' +
				(attributes.alignToggler ? ' aligntoggler' : '') +
				(attributes.navStyle != 'default' ? attributes.navStyle : '')

		})

		// Componente Boton.
		function NavToggler () {
		if (attributes.modalGrow) {
			return (
			<button
				type='button'
				class='navbar-toggler'
				aria-label={__('Toggle navigation', 'ekiline-block-collection')}
			>
				<span class='dashicons dashicons-menu' />
			</button>
			)
		}
		}

		return (
		<div
			{...blockProps}
			tabindex='-1'
			role='dialog'
			aria-labelledby={blockProps.id + 'Label'}
			aria-hidden='true'
		>
			<div class={dialogProps.className}>
				<div class='nav-content'>
					<InnerBlocks.Content />
					<NavToggler />
				</div>
			</div>

		</div>
		)
	}

})
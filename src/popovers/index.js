/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { TextControl, SelectControl, ToggleControl, PanelBody } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor'

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

/**
 * Importar otras dependencias de WP.
 */
import { addFilter } from '@wordpress/hooks' // este permite crear filtros.
import { Fragment, cloneElement } from '@wordpress/element' // UI.
import { InspectorControls } from '@wordpress/block-editor' // UI.
import { createHigherOrderComponent } from '@wordpress/compose'
const customIcon = createElement(
  'svg',
  { width: 20, height: 20 },
  createElement(
    'path',
    {
      d: 'M10.57,13.14l1.15-2.18h5.48c.99,0,1.8-.81,1.8-1.8V1.78c0-.99-.81-1.8-1.8-1.8H2.8c-.99,0-1.8,.81-1.8,1.8v7.38c0,.99,.81,1.8,1.8,1.8h5.48l1.15,2.18H1v4.88H19v-4.88H10.57Zm-1.33-2.68l-.3-.57H2.8c-.4,0-.72-.32-.72-.72V1.78c0-.4,.32-.72,.72-.72h14.4c.4,0,.72,.32,.72,.72v7.38c0,.4-.32,.72-.72,.72h-6.13l-.3,.57-.77,1.45-.77-1.45Z'
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
registerBlockType('ekiline-block-collection/ekiline-popovers', {
  apiVersion: 2,
  title: __('Popover', 'ekiline-block-collection'),
  icon: customIcon,
  description: __('Add popovers to your links or buttons.', 'ekiline-block-collection'),
  category: 'design',

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: () => {
    return (
      <div {...useBlockProps()}>
        <ol>
          <li>
            {__('Popovers have rules added to the core buttons.', 'ekiline-block-collection')}<br></br>
          </li>
          <li>
            {__('You need to create a button. And then text an anchor (#name) link.', 'ekiline-block-collection')}<br></br>
          </li> 
          <li>
           {__('This will allow you to use the advanced options for the button.', 'ekiline-block-collection')}<br></br>
          </li>
          <li>
          {__('You can remove this notice, it won\'t be published in your content.', 'ekiline-block-collection')}
          </li>
        </ol>
      </div>
    )
  }

  /**
	 * @see ./save.js
	 */
  // save,
}) // UI.

// Restringir el uso a botones.
const allowedBlocks = ['core/button', 'core/buttons']

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesLnkPopover (settings) {
  // Restriccion
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      addDataLnkPopover: {
        type: 'string',
        default: ''
      },
      addPositionLnkPopover: {
        type: 'string', // Posicion de texto (top,right,bottom,left,auto).
        default: 'auto'
      },
      defineTooltip: {
        type: 'boolean', // Posicion de texto (top,right,bottom,left,auto).
        default: false
      }
    })
  }

  return settings
}
/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 *
 * @return {function} Devuelve el BlockEdit modificado.
 */
const withAdvancedControlsBtnCollapse = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (allowedBlocks.includes(props.name)) {
      return (

        <Fragment>
          <BlockEdit {...props} />
          {props.attributes.url && (
            <InspectorControls>
              <PanelBody title={__('Button to Popover (Ekiline)', 'ekiline-block-collection')} initialOpen>
                <TextControl
                  label={__('Popover text to show.', 'ekiline-block-collection')}
                  value={props.attributes.addDataLnkPopover}
                  onChange={newData => props.setAttributes({ addDataLnkPopover: newData })}
                />
                {/* Posicion. */}
                <SelectControl
                  label={__('Popover position', 'ekiline-block-collection')}
                  value={props.attributes.addPositionLnkPopover}
                  options={[
								  { label: __('Popover position', 'ekiline-block-collection'), value: 'auto' },
								  { label: __('Top', 'ekiline-block-collection'), value: 'top' },
								  { label: __('Right', 'ekiline-block-collection'), value: 'right' },
								  { label: __('Bottom', 'ekiline-block-collection'), value: 'bottom' },
								  { label: __('Left', 'ekiline-block-collection'), value: 'left' }
                  ]}
                  onChange={(addPositionLnkPopover) =>
								  props.setAttributes({ addPositionLnkPopover })}
                />
                {/* cambiar formato */}
                <ToggleControl
                  label={__('Is tooltip', 'ekiline-block-collection')}
                  checked={props.attributes.defineTooltip}
                  onChange={(defineTooltip) =>
								  props.setAttributes({ defineTooltip })}
                />
              </PanelBody>
            </InspectorControls>
          )}
        </Fragment>
      )
    }
    return <BlockEdit {...props} />
  }
}, 'withAdvancedControlsBtnCollapse')

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassLnkPopover (element, block, attributes) {
  if (allowedBlocks.includes(block.name)) {
    if (attributes.addDataLnkPopover && attributes.url && attributes.text.text) {
      return cloneElement(
        element,
        {},
        cloneElement(
          element.props.children,
          {
            'data-bs-content': attributes.addDataLnkPopover,
            'data-bs-toggle': (attributes.defineTooltip) ? 'tooltip' : 'popover',
            'data-bs-placement': attributes.addPositionLnkPopover,
            title: (attributes.defineTooltip) ? attributes.addDataLnkPopover : attributes.text.text
          }
        )
      )
    }
  }
  return element
}

addFilter(
  'blocks.registerBlockType',
  'ekilineLnkPopoverData/dataAttribute',
  addAttributesLnkPopover
)

addFilter(
  'editor.BlockEdit',
  'ekilineLnkPopoverData/dataInput',
  withAdvancedControlsBtnCollapse
)

addFilter(
  'blocks.getSaveElement',
  'ekilineLnkPopoverData/dataModified',
  applyExtraClassLnkPopover
)

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { TextControl, SelectControl, ToggleControl } from '@wordpress/components'

/**
  * Retrieves the translation of text.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
  */
import { __ } from '@wordpress/i18n'

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
import Edit from './edit'
import save from './save'

/**
 * Importar otras dependencias de WP.
 */
import { addFilter } from '@wordpress/hooks' // este permite crear filtros.
import { Fragment } from '@wordpress/element' // UI.
import { InspectorAdvancedControls } from '@wordpress/block-editor' // UI.
import { createHigherOrderComponent } from '@wordpress/compose'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('ekiline-blocks/ekiline-popovers', {
  apiVersion: 2,
  title: __('Pop overs, full control', 'ekiline-collapse'),
  icon: 'admin-comments',
  description: __('Add popovers to your links or buttons.', 'ekiline-collapse'),
  category: 'design',

  /**
	 * @see ./edit.js
	 */
  edit: Edit,

  /**
	 * @see ./save.js
	 */
  save
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
            <InspectorAdvancedControls>
              <TextControl
                label={__('Popover text to show.', 'ekiline-popovers')}
                value={props.attributes.addDataLnkPopover}
                onChange={newData => props.setAttributes({ addDataLnkPopover: newData })}
              />
              {/* Posicion. */}
              <SelectControl
                label={__('Popover  position', 'ekiline-popovers')}
                value={props.attributes.addPositionLnkPopover}
                options={[
								  { label: __('Popover position', 'ekiline-popovers'), value: 'auto' },
								  { label: __('Top', 'ekiline-popovers'), value: 'top' },
								  { label: __('Right', 'ekiline-popovers'), value: 'right' },
								  { label: __('Bottom', 'ekiline-popovers'), value: 'bottom' },
								  { label: __('Left', 'ekiline-popovers'), value: 'left' }
                ]}
                onChange={(addPositionLnkPopover) =>
								  props.setAttributes({ addPositionLnkPopover })}
              />
              {/* cambiar formato */}
              <ToggleControl
                label={__('Is tooltip', 'ekiline-popovers')}
                checked={props.attributes.defineTooltip}
                onChange={(defineTooltip) =>
								  props.setAttributes({ defineTooltip })}
              />
            </InspectorAdvancedControls>
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
    if (attributes.addDataLnkPopover && attributes.url) {
      return wp.element.cloneElement(
        element,
        {},
        wp.element.cloneElement(
          element.props.children,
          {
            'data-bs-content': attributes.addDataLnkPopover,
            'data-bs-toggle': (attributes.defineTooltip) ? 'tooltip' : 'popover',
            'data-bs-placement': attributes.addPositionLnkPopover,
            title: attributes.text
            // 'type': 'button',
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

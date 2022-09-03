/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components'

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
  * Importar otras dependencias de WP.
  */
import { addFilter } from '@wordpress/hooks' // este permite crear filtros.
import { Fragment } from '@wordpress/element' // UI.
import { InspectorAdvancedControls } from '@wordpress/block-editor' // UI.
import { createHigherOrderComponent } from '@wordpress/compose'

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
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para collapse.
 * - button/a: {data-bs-toggle:collapse, href:#id} (usar filtros.)
 * - .collapse, #id
 * - ó -
 * - div:{min-height}
 * - collapse, #id
 * - div:{width:opcional}
 */
registerBlockType('ekiline-blocks/ekiline-collapse', {
  /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	 apiVersion: 2,

	 /**
	  * Parametros de alta.
	  * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	  */
	 title: __('Collapse, full control', 'ekiline-collapse'),
	 icon: 'arrow-down',
	 description: __('Set a collapse behavior block. You can activate from any button.', 'ekiline-collapse'),
	 category: 'design',
	 supports: {
		 anchor: true
	 },

	 /**
	  * Argumentos para personalizacion.
	  */
	 attributes: {
		 horizontal: {
			 type: 'boolean',
			 default: false // set horizontal (.collapse-horizontal).
		 }
	 },

	 /**
	  * @see ./edit.js
	  */
	 // edit: Edit,
	 edit: (props) => {
    const { attributes, setAttributes } = props
    // const PARENT_ALLOWED_BLOCKS = [ 'core/buttons' ];
    const CHILD_TEMPLATE = [['core/paragraph', { content: __('Add your content', 'ekiline-collapse') }]]

    const blockProps = useBlockProps({
      className: 'group-collapse'
    })

    /**
		 * Control personalizado: recordatorio
		 */
		 function CollapseUserRemind () {
      if (attributes.anchor) {
        return (
          <div class='editor-collapse-route has-anchor'>
            <pre>
              {'#' + attributes.anchor}
              <br />
              {__('Add this #anchor to a button and its advanced options.', 'ekiline-collapse')}
            </pre>
          </div>
        )
      }

      return (
        <div class='editor-collapse-route'>
          {__('Do not forget to add an anchor. ', 'ekiline-collapse')}
        </div>
      )
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Collapse Params', 'ekiline-collapse')} initialOpen>
            <ToggleControl
              label={__('Horizontal collapse', 'ekiline-collapse')}
              checked={attributes.horizontal}
              onChange={(horizontal) =>
						  setAttributes({ horizontal })}
            />
          </PanelBody>
        </InspectorControls>
        {/* Contenido */}
        <InnerBlocks
          template={CHILD_TEMPLATE}
        />
        <CollapseUserRemind />
      </div>
    )
	 },

  /**
	 * @see ./save.js
	 */
  // save,
	 save: ({ attributes }) => {
    const blockProps = useBlockProps.save({
      className: 'collapse' + ((attributes.horizontal) ? ' collapse-horizontal' : ''),
      style: {
        'min-height': ((attributes.horizontal) ? '120px' : null)
      },
      contentStyle: {
        'min-width': ((attributes.horizontal) ? '300px' : null)
      }
    })

    // Condicion para crear envoltorio.
    function CollapseWrapper () {
      if (attributes.horizontal) {
        return (
          <div style={(attributes.horizontal) ? blockProps.contentStyle : null}>
            <InnerBlocks.Content />
          </div>
        )
      } else {
        return (
          <InnerBlocks.Content />
        )
      }
    }

    return (
      <div {...blockProps}>
        <CollapseWrapper />
      </div>
    )
	 }
}) // UI.

// Restringir el uso a botones.
const allowedBlocks = ['core/button', 'core/buttons']

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBtnCollpase (settings) {
  // Restriccion
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      addDataBtnCollapse: {
        type: 'string',
        default: ''
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
                label={__('Collapse anchor for execute it.', 'ekiline-collapse')}
                value={props.attributes.addDataBtnCollapse}
                onChange={newData => props.setAttributes({ addDataBtnCollapse: newData })}
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
function applyExtraClassBtnCollpase (element, block, attributes) {
  if (allowedBlocks.includes(block.name)) {
    if (attributes.addDataBtnCollapse && attributes.url) {
      return wp.element.cloneElement(
        element,
        {},
        wp.element.cloneElement(
          element.props.children,
          {
            'data-bs-target': attributes.addDataBtnCollapse,
            'data-bs-toggle': 'collapse'
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
  'ekilineCollapseBtnData/dataAttribute',
  addAttributesBtnCollpase
)

addFilter(
  'editor.BlockEdit',
  'ekilineCollapseBtnData/dataInput',
  withAdvancedControlsBtnCollapse
)

addFilter(
  'blocks.getSaveElement',
  'ekilineCollapseBtnData/dataModified',
  applyExtraClassBtnCollpase
)

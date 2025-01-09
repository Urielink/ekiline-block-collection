/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor'
import { PanelBody, ToggleControl } from '@wordpress/components'

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
      d: 'M1,1V6.04H19V1H1ZM18.1,5.14H1.9V1.9H18.1v3.24Zm-2.8,12.51l1.44-1.17-1.44-1.17v2.34Zm-14.3,1.35H19v-5.04H1v5.04Zm.9-4.14H18.1v3.24H1.9v-3.24Zm-.9-2.34H19V7.48H1v5.04Zm16.19-3.24l-1.17,1.44-1.17-1.44h2.34Zm-1.89-6.93v2.34l1.44-1.17-1.44-1.17Z'
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
// import '../editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * Bloques necesarios para acordion.
 * - .accordion
 * - - .accordion-item
 * - - - .accordion-header
 * - - - - .accordion-button / [ RichText ]
 * - - - .accordion-collapse collapse / show
 * - - - - .accordion-body [bloques]
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('ekiline-collection/ekiline-accordion', {

  /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
  apiVersion: 2,

  /**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	 */
  title: __('Accordion', 'ekiline-block-collection'),
  icon: customIcon,
  description: __('Show your content as an accordion.', 'ekiline-block-collection'),
  category: 'design',
  supports: {
    html: false, // no permitir HTML
    anchor: true // id personalizado.
  },
  attributes: {
    noStyle: {
      type: 'boolean',
      default: false // add classname .accordion-flush.
    }
  },
  /**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
  providesContext: {
    'ekiline-accordion/anchor': 'anchor'
  },

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: (props) => {
    const { attributes, setAttributes } = props

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-accordion-item']
    const CHILD_TEMPLATE = [
      ['ekiline-collection/ekiline-accordion-item'],
      ['ekiline-collection/ekiline-accordion-item'],
      ['ekiline-collection/ekiline-accordion-item']
    ]

    // Personalizar clase en editor.
    const blockProps = useBlockProps({
      className: 'group-accordion'
    })

    // Precargar nombre ID (anchor).
    if (!attributes.anchor) {
      setAttributes({ anchor: 'accordion' + getRandomArbitrary(10, 150) })
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Accordion Settings', 'ekiline-block-collection')} initialOpen>
            <ToggleControl
              label={__('Use bootstrap default style.', 'ekiline-block-collection')}
              checked={attributes.noStyle}
              onChange={(noStyle) => setAttributes({ noStyle })}
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
      className: (!attributes.noStyle ? 'accordion accordion-flush' : 'accordion')
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }

})

/**
 * Bloque interno accordion-item
 */
registerBlockType('ekiline-collection/ekiline-accordion-item', {

  title: __('Accordion item', 'ekiline-block-collection'),
  parent: ['ekiline-collection/ekiline-accordion'],
  icon: customIcon,
  description: __('Set tittle and content in your accordion container', 'ekiline-block-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-accordion/anchor'],
  supports: {
    html: false, // no permitir HTML
    reusable: false
  },
  attributes: {
    showDefault: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].
    },
    keepOpen: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].
    },
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: __('Item title.', 'ekiline-block-collection')
    }
  },
  /**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
  providesContext: {
    'ekiline-accordion-item/showDefault': 'showDefault',
    'ekiline-accordion-item/keepOpen': 'keepOpen',
    'ekiline-accordion-item/itemTarget': 'itemTarget'
  },

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: (props) => {
    const { attributes, setAttributes } = props

    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['ekiline-collection/ekiline-accordion-item-header'],
      ['ekiline-collection/ekiline-accordion-item-body']
    ]

    // personalizar clase en editor.
    const blockProps = useBlockProps({
      className: 'child-item-accordion'
    })

    // Precargar nombre ID en hijos.
    if (!attributes.itemTarget) {
      setAttributes({ itemTarget: props.context['ekiline-accordion/anchor'] + 'item' + getRandomArbitrary(10, 150) })
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Accordion Item Params', 'ekiline-block-collection')} initialOpen>
            <ToggleControl
              label={__('Show element by default.', 'ekiline-block-collection')}
              checked={attributes.showDefault}
              onChange={(showDefault) =>
							  setAttributes({ showDefault })}
            />
            <ToggleControl
              label={__('Toggle.', 'ekiline-block-collection')}
              checked={attributes.keepOpen}
              onChange={(keepOpen) =>
							  setAttributes({ keepOpen })}
              help={__('Close previously active accordion elements.', 'ekiline-block-collection')}
            />
          </PanelBody>
        </InspectorControls>

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
      className: 'accordion-item'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }

})

/**
 * Bloque interno accordion-item-header
 */
registerBlockType('ekiline-collection/ekiline-accordion-item-header', {
  title: __('Accordion item header', 'ekiline-block-collection'),
  parent: ['ekiline-collection/ekiline-accordion-item'],
  icon: 'button',
  description: __('Set tittle and content in your accordion container', 'ekiline-block-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: [
    'ekiline-accordion-item/anchor',
    'ekiline-accordion-item/itemTarget'
  ],
  supports: {
    html: false, // no permitir HTML
    reusable: false,
    inserter: false,
    color: {
      gradients: true // Enables the gradients UI control.
    }
  },
  attributes: {
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: __('Item title.', 'ekiline-block-collection')
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
      className: 'child-item-accordion-header'
    })

    // Precargar nombre ID en hijos.
    if (!attributes.itemTarget) {
      setAttributes({ itemTarget: props.context['ekiline-accordion-item/itemTarget'] })
    }

    return (
      <div {...blockProps}>
        {/* El bloque */}
        <RichText
          withoutInteractiveFormatting
          allowedFormats={['core/bold', 'core/italic', 'core/image', 'core/align']} // Formatos de texto.
          tagName='p' // The tag here is the element output and editable in the admin
          className='item-title-header'
          value={attributes.content} // Any existing content, either from the database or an attribute default
          onChange={(content) => setAttributes({ content })} // Store updated content as a block attribute
          placeholder={attributes.default}
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
      className: 'accordion-header'
    })
    // Adecuar clases para boton.
    const buttonClasses = blockProps.className.replace('wp-block-ekiline-collection-ekiline-accordion-item-header accordion-header', '')

    return (
      <div {...blockProps}>
        <RichText.Content
          tagName='button'
          className={'accordion-button' + buttonClasses}
          type='button'
          value={attributes.content}
          data-bs-toggle='collapse'
          data-bs-target={(attributes.itemTarget) ? '#' + attributes.itemTarget : null}
          style={(blockProps.style) ? blockProps.style : null}
        />
      </div>
    )
  }

})

/**
 * Bloque interno accordion-item-body
 */
registerBlockType('ekiline-collection/ekiline-accordion-item-body', {

  title: __('Accordion item body', 'ekiline-block-collection'),
  parent: ['ekiline-collection/ekiline-accordion-item'],
  icon: 'feedback',
  description: __('Set tittle and content in your accordion container', 'ekiline-block-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: [
    'ekiline-accordion/anchor',
    'ekiline-accordion-item/showDefault',
    'ekiline-accordion-item/keepOpen',
    'ekiline-accordion-item/itemTarget'
  ],
  supports: {
    anchor: true,
    html: false, // no permitir HTML
    reusable: false,
    inserter: false,
    color: {
      gradients: true // Enables the gradients UI control.
    }
  },
  attributes: {
    showDefault: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].
    },
    keepOpen: {
      type: 'boolean',
      default: true // remove dataset [data-bs-parent].
    },
    itemParent: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: __('Item title.', 'ekiline-block-collection')
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
      ['core/paragraph',
        { content: __('Item content.', 'ekiline-block-collection') }
      ]
    ]

    // personalizar clase
    const blockProps = useBlockProps({
      className: 'child-item-accordion-body'
    })

    // Precargar nombre ID en hijos y valores heredados de contexto.
    if (!attributes.itemParent) {
      setAttributes({ itemParent: props.context['ekiline-accordion/anchor'] })
    }

    // Actualizar estado showDefault.
    setAttributes({ showDefault: props.context['ekiline-accordion-item/showDefault'] })
    // Actualizar estado keepOpen.
    setAttributes({ keepOpen: props.context['ekiline-accordion-item/keepOpen'] })

    if (!attributes.anchor) {
      setAttributes({ anchor: props.context['ekiline-accordion-item/itemTarget'] })
    }

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
      className: (!attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show'),
      'data-bs-parent': (attributes.keepOpen && attributes.itemParent) ? '#' + attributes.itemParent : null
    })

    return (
      <div {...blockProps}>
        <div className='accordion-body'>
          <InnerBlocks.Content />
        </div>
      </div>
    )
  }

})

/**
 * Función auxiliar.
 */
function getRandomArbitrary (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

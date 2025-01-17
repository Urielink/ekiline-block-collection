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
      d: 'M15.32,5.14l.64-.64,.64,.64,.76-.76-.64-.64,.63-.63-.76-.76-.63,.63-.63-.63-.76,.76,.63,.63-.64,.64,.76,.76Zm2.78-4.14H1.9c-.5,0-.9,.4-.9,.9V18.1c0,.5,.4,.9,.9,.9H18.1c.5,0,.9-.4,.9-.9V1.9c0-.5-.4-.9-.9-.9Zm-.18,16.92H2.08v-3.36h15.84v3.36Zm0-4.44H2.08V6.52h15.84v6.97Zm0-8.05H2.08V2.08h15.84v3.36Z'
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
 * Bloques necesarios para modal.
 * - .modal
 * - - .modal-dialog
 * - - - .modal-content
 * - - - - .modal-header, modal-title, btn-close
 * - - - - .modal-body, [bloques]
 * - - - - .modal-footer, btn-close, [bloques]
 *
 * Variables:
 * - staticBackdrop = data-bs-backdrop="static"
 * - longcontent = .modal-dialog-scrollable
 * - centrado = modal-dialog-centered
 * - size = modal-xl, modal-lg, modal-sm, modal-fullscreen
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
registerBlockType('ekiline-block-collection/ekiline-modal', {
  /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
  apiVersion: 2,

  /**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	 */
  title: __('Modal', 'ekiline-block-collection'),
  icon: customIcon,
  description: __('Add your content here, then invoque with a link anchor #anchor.', 'ekiline-block-collection'),
  category: 'design',
  supports: {
    anchor: true
  },

  /**
	 * Argumentos para personalizacion.
	 */
  attributes: {
    modalShow: {
      type: 'string',
      default: 'default' // top, right, bottom, left.
    },
    modalSize: {
      type: 'string',
      default: 'default' // small, large, extralarge, fullwindow.
    },
    modalAlign: {
      type: 'boolean',
      default: true // center.
    },
    modalBackdrop: {
      type: 'boolean',
      default: true // cerrar modal dando clic fuera.
    },
    modalKeyboard: {
      type: 'boolean',
      default: true // cerrar modal con teclado.
    },
    modalGrow: {
      type: 'boolean',
      default: false
    },
    modalTime: {
      type: 'number',
      default: 0
    }
  },

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: (props) => {
    const { attributes, setAttributes } = props

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = [
      'ekiline-block-collection/ekiline-modal-header',
      'ekiline-block-collection/ekiline-modal-body',
      'ekiline-block-collection/ekiline-modal-footer'
    ]

    const CHILD_TEMPLATE = [
      ['ekiline-block-collection/ekiline-modal-header', {
        lock: {
          remove: false,
          move: true
        }
      }],
      ['ekiline-block-collection/ekiline-modal-body', {
        lock: {
          remove: false,
          move: true
        }
      }],
      ['ekiline-block-collection/ekiline-modal-footer', {
        lock: {
          remove: false,
          move: true
        }
      }]
    ]

    // personalizar clase
    const blockProps = useBlockProps({
      className: 'group-modal'
    })

    /**
		 * Control personalizado: recordatorio
		 */
    function ModalUserRemind () {
      if (attributes.anchor) {
        return (
          <div class='editor-modal-route has-anchor'>
            <pre>
              {'#' + attributes.anchor}
              <br />
              {__('Add this #anchor to a button and its advanced options.', 'ekiline-block-collection')}
            </pre>
          </div>
        )
      }

      return (
        <div class='editor-modal-route'>
          {__('Do not forget to add an anchor. ', 'ekiline-block-collection')}
        </div>
      )
    }

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Modal Params', 'ekiline-block-collection')} initialOpen>

            <SelectControl
              label={__('Rise modal', 'ekiline-block-collection')}
              value={attributes.modalShow}
              options={[
						  { label: __('Default', 'ekiline-block-collection'), value: '' },
						  { label: __('Right', 'ekiline-block-collection'), value: ' right-aside' },
						  { label: __('Bottom', 'ekiline-block-collection'), value: ' move-from-bottom' },
						  { label: __('Left', 'ekiline-block-collection'), value: ' left-aside' }
              ]}
              onChange={(modalShow) =>
						  setAttributes({ modalShow })}
            />

            <SelectControl
              label={__('Size modal', 'ekiline-block-collection')}
              value={attributes.modalSize}
              options={[
						  { label: __('Default', 'ekiline-block-collection'), value: '' },
						  { label: __('Small', 'ekiline-block-collection'), value: ' modal-sm' },
						  { label: __('Large', 'ekiline-block-collection'), value: ' modal-lg' },
						  { label: __('Extra Large', 'ekiline-block-collection'), value: ' modal-xl' },
						  { label: __('Full window', 'ekiline-block-collection'), value: ' modal-fullscreen' }
              ]}
              onChange={(modalSize) =>
						  setAttributes({ modalSize })}
            />

            <ToggleControl
              label={__('Center in window', 'ekiline-block-collection')}
              checked={attributes.modalAlign}
              onChange={(modalAlign) =>
						  setAttributes({ modalAlign })}
            />
            <ToggleControl
              label={__('Enable background click to close', 'ekiline-block-collection')}
              checked={attributes.modalBackdrop}
              onChange={(modalBackdrop) =>
						  setAttributes({ modalBackdrop })}
            />
            <ToggleControl
              label={__('Enable ESC key to close', 'ekiline-block-collection')}
              checked={attributes.modalKeyboard}
              onChange={(modalKeyboard) =>
						  setAttributes({ modalKeyboard })}
            />
            <ToggleControl
              label={__('Show resize modal button', 'ekiline-block-collection')}
              checked={attributes.modalGrow}
              onChange={(modalGrow) =>
						  setAttributes({ modalGrow })}
            />
            <TextControl
              label={__('Show with timer', 'ekiline-block-collection')}
              type='number'
              value={attributes.modalTime}
              onChange={(newval) =>
						  setAttributes({ modalTime: parseInt(newval) })}
              help={
							(attributes.modalTime > 0)
							  ? __('Run after page load ', 'ekiline-block-collection') + attributes.modalTime + __(' milliseconds.', 'ekiline-block-collection')
							  : attributes.modalTime + __(' do nothing.', 'ekiline-block-collection')
						}
            />

          </PanelBody>
        </InspectorControls>

        {/* El bloque */}
        <InnerBlocks
          allowedBlocks={PARENT_ALLOWED_BLOCKS}
          template={CHILD_TEMPLATE}
        />
        <ModalUserRemind />
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
				'group-modal modal fade' +
				(attributes.modalShow != 'default' ? attributes.modalShow : ''),
      'data-bs-backdrop': attributes.modalBackdrop,
      'data-bs-keyboard': attributes.modalKeyboard,
      'data-ek-time': (attributes.modalTime || null)
    })

    const dialogProps = useBlockProps.save({
      className:
			'modal-dialog' +
			(attributes.modalAlign ? ' modal-dialog-centered' : '') +
			(attributes.modalSize != 'default' ? attributes.modalSize : '')

    })

    // Componente Boton.
    function ModalGrowBtn () {
      if (attributes.modalGrow) {
        return (
          <button
            type='button'
            class='modal-resize btn btn-sm position-absolute bottom-0 mb-2 ms-1'
            aria-label={__('play btn', 'ekiline-block-collection')}
          >
            <span class='dashicons dashicons-editor-expand' />
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
          <div class='modal-content'>
            <InnerBlocks.Content />
            <ModalGrowBtn />
          </div>
        </div>

      </div>
    )
  }

})

/**
 * - ekiline-modal-header
 */

registerBlockType('ekiline-block-collection/ekiline-modal-header', {
  title: __('Modal header', 'ekiline-block-collection'),
  parent: ['ekiline-block-collection/ekiline-modal'],
  icon: 'feedback',
  description: __('Modal header content. ', 'ekiline-block-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    // multiple: false,
    inserter: true
  },
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/heading', 'core/paragraph']
    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['core/heading', {
        content: __('Add modal title', 'ekiline-block-collection'),
        level: 4
      }]
    ]

    // personalizar clase
    const blockProps = useBlockProps({
      className: 'editor-modal-header'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks
          allowedBlocks={PARENT_ALLOWED_BLOCKS}
          template={CHILD_TEMPLATE}
        />
      </div>
    )
  },

  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = useBlockProps.save({
      className: 'modal-header'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' />
      </div>
    )
  }

})

/**
 * - ekiline-modal-body
 */

registerBlockType('ekiline-block-collection/ekiline-modal-body', {
  title: __('Modal body content', 'ekiline-block-collection'),
  parent: ['ekiline-block-collection/ekiline-modal'],
  icon: 'feedback',
  description: __('Modal body content. ', 'ekiline-block-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    // multiple: false,
    inserter: true
  },
  edit: () => {
    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['core/paragraph', { content: __('Add modal content blocks', 'ekiline-block-collection') }]
    ]

    // personalizar clase
    const blockProps = useBlockProps({
      className: 'editor-modal-body'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks
          template={CHILD_TEMPLATE}
        />
      </div>
    )
  },

  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = useBlockProps.save({
      className: 'modal-body'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }

})

/**
 * - ekiline-modal-footer
 */

registerBlockType('ekiline-block-collection/ekiline-modal-footer', {
  title: __('Modal footer', 'ekiline-block-collection'),
  parent: ['ekiline-block-collection/ekiline-modal'],
  icon: 'feedback',
  description: __('Inner footer content. ', 'ekiline-block-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    // multiple: false,
    inserter: true
  },
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/paragraph', 'core/buttons', 'core/button']
    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['core/paragraph', { content: __('Add modal footer text', 'ekiline-block-collection') }]
    ]

    // personalizar clase
    const blockProps = useBlockProps({
      className: 'editor-modal-footer'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks
          allowedBlocks={PARENT_ALLOWED_BLOCKS}
          template={CHILD_TEMPLATE}
        />
      </div>
    )
  },

  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = useBlockProps.save({
      className: 'modal-footer'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }

})

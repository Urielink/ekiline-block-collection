/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components'

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
 */
registerBlockType('ekiline-blocks/ekiline-toast', {

  /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	 apiVersion: 2,

	 /**
	  * Parametros de alta.
	  * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	  */
	 title: __('Ekiline toast, full control', 'ekiline-toast'),
	 icon: 'lightbulb',
	 description: __('Show small bootstrap-style notices.', 'ekiline-toast'),
	 category: 'design',
	 supports: {
		 anchor: true,
		 html: false
	 },

	 /**
	  * Argumentos para personalizacion.
	  */
	 attributes: {
		 toastPosition: {
			 type: 'string',
			 default: ' bottom-0 end-0'
		 }
	 },

	 /**
	  * @see ./edit.js
	  */
	 // edit: Edit,
	 edit: (props) => {
    const { attributes, setAttributes } = props

    const blockProps = useBlockProps({
      className: 'group-toast'
    })

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-blocks/ekiline-toast-item']
    const CHILD_TEMPLATE = [
      ['ekiline-blocks/ekiline-toast-item', {
        lock: {
          remove: false,
          move: true
        }
      }]
    ]

    return (
      <div {...blockProps}>
        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Toast group options', 'ekiline-toast')} initialOpen>
            <SelectControl
              label={__('Display position', 'ekiline-toast')}
              value={attributes.toastPosition}
              options={[
						  { label: __('Bottom right', 'ekiline-toast'), value: ' bottom-0 end-0' },
						  { label: __('Bottom left', 'ekiline-toast'), value: ' bottom-0 start-0' },
						  { label: __('Top right', 'ekiline-toast'), value: ' top-0 end-0' },
						  { label: __('Top left', 'ekiline-toast'), value: ' top-0 start-0' }
              ]}
              onChange={(toastPosition) =>
						  setAttributes({ toastPosition })}
            />
          </PanelBody>
        </InspectorControls>
        {/* Contenido */}
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
    const blockProps = useBlockProps.save({
      className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
	 }

})

/**
 * Toast Item.
 */
registerBlockType('ekiline-blocks/ekiline-toast-item', {
	 title: __('Ekiline toast item.', 'ekiline-toast'),
	 parent: ['ekiline-blocks/ekiline-toast'],
	 icon: 'lightbulb',
	 description: __('Each toast can be executed by time, at the end of scrolling, or with the cursor outside the window. You can stack as many as you need.', 'ekiline-toast'),
	 category: 'design',
	 supports: {
    anchor: true,
    html: false,
    multiple: false,
    reusable: true
    // inserter: false,
  },
	 /**
	  * Argumentos para personalizacion.
	  */
	 attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    toastTime: {
      type: 'number',
      default: 0
    },
    toastScroll: {
      type: 'boolean',
      default: false
    }
	 },

	 /**
	  * @see ./edit.js
	  */
	 // edit: Edit,
	 edit: (props) => {
    const { attributes, setAttributes } = props

    const blockProps = useBlockProps({
      className: 'toast-item'
    })

    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['core/paragraph', {
        content: __('Add toast content.', 'ekiline-modal')
      }]
    ]

    return (
      <div {...blockProps}>

        {/* Inspector controles */}
        <InspectorControls>
          <PanelBody title={__('Toast Params', 'ekiline-toast')} initialOpen>
            <TextControl
              label={__('Run by time', 'ekiline-toast')}
              type='number'
              value={attributes.toastTime}
              onChange={(newval) =>
						  setAttributes({ toastTime: parseInt(newval) })}
              help={
							(attributes.toastTime > 0)
							  ? __('Run after page load "' + attributes.toastTime + '" milliseconds.', 'ekiline-toast')
							  : __('"' + attributes.toastTime + '" run immediately on page load.', 'ekiline-toast')
						}
            />
            <ToggleControl
              label={__('Run at end of page scroll.', 'ekiline-toast')}
              checked={attributes.toastScroll}
              onChange={(toastScroll) =>
						  setAttributes({ toastScroll })}
            />
          </PanelBody>
        </InspectorControls>

        {/* Contenido */}
        <RichText
          tagName='p'
          value={attributes.content}
          allowedFormats={['core/bold', 'core/italic']}
          onChange={(content) => setAttributes({ content })}
          placeholder={__('Add toast title', 'ekiline-toast')}
          className='item-title'
        />
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
    const blockProps = useBlockProps.save({
      className: 'toast-item toast' +
			((attributes.toastScroll) ? ' launch-scroll hide' : '') +
			((attributes.toastTime !== 0) ? ' launch-time hide' : ''),
      'data-ek-launch-time': (attributes.toastTime || null)
    })

    return (
      <div {...blockProps}>
        <div class='toast-header'>
          <p class='me-auto my-0'>{attributes.content}</p>
          <button type='button' class='btn-close' data-bs-dismiss='toast' aria-label='Close' />
        </div>
        <div class='toast-body'>
          <InnerBlocks.Content />
        </div>
      </div>
    )
	 }

})

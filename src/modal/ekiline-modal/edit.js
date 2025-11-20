import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components'

export default function Edit ({ attributes, setAttributes }) {
  const PARENT_ALLOWED_BLOCKS = [
    'ekiline-block-collection/ekiline-modal-header',
    'ekiline-block-collection/ekiline-modal-body',
    'ekiline-block-collection/ekiline-modal-footer'
  ]

  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-modal-header', { lock: { remove: false, move: true } }],
    ['ekiline-block-collection/ekiline-modal-body', { lock: { remove: false, move: true } }],
    ['ekiline-block-collection/ekiline-modal-footer', { lock: { remove: false, move: true } }]
  ]

  const blockProps = useBlockProps({ className: 'group-modal' })

  function UserRemind () {
    return (
      <div className='block-note'>
        {attributes.anchor ? '#' + attributes.anchor + __(' is the anchor you should include in the advanced options of a button.', 'ekiline-block-collection') : __('Do not forget to add an #anchor. ', 'ekiline-block-collection')}
      </div>
    )
  }

  return (
    <div {...blockProps}>
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
            onChange={(modalShow) => setAttributes({ modalShow })}
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
            onChange={(modalSize) => setAttributes({ modalSize })}
          />
          <ToggleControl
            label={__('Center in window', 'ekiline-block-collection')}
            checked={attributes.modalAlign}
            onChange={(modalAlign) => setAttributes({ modalAlign })}
          />
          <ToggleControl
            label={__('Enable background click to close', 'ekiline-block-collection')}
            checked={attributes.modalBackdrop}
            onChange={(modalBackdrop) => setAttributes({ modalBackdrop })}
          />
          <ToggleControl
            label={__('Enable ESC key to close', 'ekiline-block-collection')}
            checked={attributes.modalKeyboard}
            onChange={(modalKeyboard) => setAttributes({ modalKeyboard })}
          />
          <TextControl
            label={__('Show with timer', 'ekiline-block-collection')}
            type='number'
            value={attributes.modalTime}
            onChange={(newval) => setAttributes({ modalTime: parseInt(newval) || 0 })}
            help={
              attributes.modalTime > 0
                ? __('Run after page load ', 'ekiline-block-collection') + attributes.modalTime + __(' milliseconds.', 'ekiline-block-collection')
                : __('Set 0 to disable timer.', 'ekiline-block-collection')
            }
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks allowedBlocks={PARENT_ALLOWED_BLOCKS} template={CHILD_TEMPLATE} />
      <UserRemind />
    </div>
  )
}

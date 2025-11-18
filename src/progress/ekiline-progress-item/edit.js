import { __ } from '@wordpress/i18n'
import { useBlockProps, InspectorControls, RichText, BlockControls, AlignmentControl } from '@wordpress/block-editor'
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components'

export default function Edit ({ attributes, setAttributes }) {
  const { progRange, progLabel, progStripes, progAnimation, content, textAlign } = attributes

  const blockProps = useBlockProps({
    className: 'item-progress progress-bar' +
      (progAnimation ? ' progress-bar-animated' : '') +
      (progStripes ? ' progress-bar-striped' : ''),
    style: {
      width: progRange + '%'
    }
  })

  const defaultLabel = `${progRange}%`

  return (
    <>
      <BlockControls>
        <AlignmentControl
          value={textAlign}
          onChange={(newAlign) => setAttributes({ textAlign: newAlign || 'left' })}
        />
      </BlockControls>
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody title={__('Progress bar Settings', 'ekiline-block-collection')} initialOpen>
            <TextControl
              label={__('Data range min 1% max 100%', 'ekiline-block-collection')}
              type='number'
              value={progRange}
              onChange={(newval) =>
                setAttributes({ progRange: parseInt((!newval || newval === '0') ? 1 : newval) })}
              min='1'
              max='100'
            />
            <ToggleControl
              label={__('Hide text in bar.', 'ekiline-block-collection')}
              checked={progLabel}
              onChange={(progLabel) => setAttributes({ progLabel })}
            />
            <ToggleControl
              label={__('Show stripes over background.', 'ekiline-block-collection')}
              checked={progStripes}
              onChange={(progStripes) => setAttributes({ progStripes })}
            />
            {/* if progStripes show control */}
            {progStripes &&
              <ToggleControl
                label={__('Animate stripes.', 'ekiline-block-collection')}
                checked={progAnimation}
                onChange={(progAnimation) => setAttributes({ progAnimation })}
              />}
          </PanelBody>
        </InspectorControls>
        {
          !progLabel && (
            <RichText
              tagName='p'
              value={content ?? ''}
              onChange={(value) => setAttributes({ content: value })}
              placeholder={defaultLabel}
              allowedFormats={['core/bold', 'core/italic']}
              className='my-0'
              style={{ textAlign }}
            />
          )
        }
      </div>
    </>
  )
}

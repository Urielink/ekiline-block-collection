import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl } from '@wordpress/components'
import { ManualEdit } from './variations/manual'

export default function Edit ({ attributes, setAttributes }) {
  const { ChooseType } = attributes

  const renderVariation = () => {
    switch (ChooseType) {
      case 'manual':
      default:
        return <ManualEdit />
    }
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Carousel Type', 'ekiline-block-collection')} initialOpen={true}>
          <SelectControl
            label={__('Choose the carousel mode', 'ekiline-block-collection')}
            value={ChooseType}
            options={[
              { label: __('Manual (free design)', 'ekiline-block-collection'), value: 'manual' },
              { label: __('Gallery', 'ekiline-block-collection'), value: 'gallery' },
              { label: __('Content', 'ekiline-block-collection'), value: 'content' },
              { label: __('Dynamic', 'ekiline-block-collection'), value: 'dynamic' }
            ]}
            onChange={(newVal) => setAttributes({ ChooseType: newVal })}
          />
        </PanelBody>
      </InspectorControls>
      {renderVariation()}
    </>
  )
}
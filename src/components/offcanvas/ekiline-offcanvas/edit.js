import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  ToggleControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'group-offcanvas' });

  const allowedBlocks = [
    'ekiline-block-collection/ekiline-offcanvas-header',
    'ekiline-block-collection/ekiline-offcanvas-body'
  ];

  const template = [
    ['ekiline-block-collection/ekiline-offcanvas-header', { lock: { move: true, remove: false } }],
    ['ekiline-block-collection/ekiline-offcanvas-body', { lock: { move: true, remove: false } }]
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Offcanvas Params', 'ekiline-block-collection')} initialOpen>
          <SelectControl
            label={__('Position', 'ekiline-block-collection')}
            value={attributes.ocPosition}
            options={[
              { label: __('Right', 'ekiline-block-collection'), value: ' offcanvas-end' },
              { label: __('Bottom', 'ekiline-block-collection'), value: ' offcanvas-bottom' },
              { label: __('Left', 'ekiline-block-collection'), value: ' offcanvas-start' },
              { label: __('Top', 'ekiline-block-collection'), value: ' offcanvas-top' }
            ]}
            onChange={(value) => setAttributes({ ocPosition: value })}
          />
          <SelectControl
            label={__('Width', 'ekiline-block-collection')}
            value={attributes.ocWidth}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Small', 'ekiline-block-collection'), value: ' w-25' },
              { label: __('Half', 'ekiline-block-collection'), value: ' w-50' },
              { label: __('Large', 'ekiline-block-collection'), value: ' w-75' },
              { label: __('Full window', 'ekiline-block-collection'), value: ' w-100' }
            ]}
            onChange={(value) => setAttributes({ ocWidth: value })}
          />
          <SelectControl
            label={__('Height', 'ekiline-block-collection')}
            value={attributes.ocHeight}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Small', 'ekiline-block-collection'), value: ' h-25' },
              { label: __('Half', 'ekiline-block-collection'), value: ' h-50' },
              { label: __('Large', 'ekiline-block-collection'), value: ' h-75' },
              { label: __('Full window', 'ekiline-block-collection'), value: ' h-100' }
            ]}
            onChange={(value) => setAttributes({ ocHeight: value })}
          />
          <SelectControl
            label={__('Display run', 'ekiline-block-collection')}
            value={attributes.ocDisplay}
            options={[
              { label: __('All', 'ekiline-block-collection'), value: ' offcanvas' },
              { label: __('Small', 'ekiline-block-collection'), value: ' offcanvas-sm' },
              { label: __('Medium', 'ekiline-block-collection'), value: ' offcanvas-md' },
              { label: __('Large', 'ekiline-block-collection'), value: ' offcanvas-lg' }
            ]}
            onChange={(value) => setAttributes({ ocDisplay: value })}
          />
          <ToggleControl
            label={__('Keep scroll window', 'ekiline-block-collection')}
            checked={attributes.ocScroll}
            onChange={(value) => setAttributes({ ocScroll: value })}
          />
          <SelectControl
            label={__('Backdrop behavior', 'ekiline-block-collection')}
            value={attributes.ocBackdrop}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: 'true' },
              { label: __('Static', 'ekiline-block-collection'), value: 'static' },
              { label: __('False', 'ekiline-block-collection'), value: 'false' }
            ]}
            onChange={(value) => setAttributes({ ocBackdrop: value })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks allowedBlocks={allowedBlocks} template={template} />
    </div>
  );
}

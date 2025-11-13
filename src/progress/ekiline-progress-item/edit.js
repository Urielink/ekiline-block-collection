import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  TextControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: 'item-progress progress-bar' +
      (attributes.progAnimation ? ' progress-bar-animated' : '') +
      (attributes.progStripes ? ' progress-bar-striped' : '')
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Progress bar Settings', 'ekiline-block-collection')} initialOpen>
          <TextControl
            label={__('Data range min 1% max 100%', 'ekiline-block-collection')}
            type="number"
            value={attributes.progRange}
            onChange={(newval) =>
              setAttributes({ progRange: parseInt((!newval || newval === '0') ? 1 : newval) })}
            min="1"
            max="100"
          />
          <ToggleControl
            label={__('Hide number in bar.', 'ekiline-block-collection')}
            checked={attributes.progLabel}
            onChange={(progLabel) => setAttributes({ progLabel })}
          />
          <ToggleControl
            label={__('Show stripes over background.', 'ekiline-block-collection')}
            checked={attributes.progStripes}
            onChange={(progStripes) => setAttributes({ progStripes })}
          />
          { /* if progStripes show control */}
          {attributes.progStripes &&
            <ToggleControl
              label={__('Animate stripes.', 'ekiline-block-collection')}
              checked={attributes.progAnimation}
              onChange={(progAnimation) => setAttributes({ progAnimation })}
            />
          }
        </PanelBody>
      </InspectorControls>
      <p>{ (!attributes.progLabel) ? attributes.progRange + '%' : null}</p>
    </div>
  );
}

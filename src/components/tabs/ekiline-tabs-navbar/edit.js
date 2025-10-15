import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit(props) {
  const { attributes, setAttributes } = props;

  const allowedBlocks = ['ekiline-block-collection/ekiline-tab-link'];
  const template = [
    ['ekiline-block-collection/ekiline-tab-link', {
      content: 'Tab link 1',
      className: 'active'
    }],
    ['ekiline-block-collection/ekiline-tab-link', {
      content: 'Tab link 2'
    }]
  ];

  const blockProps = useBlockProps({
    className: 'nav mb-3' + attributes.alignTabs
  });

  if (attributes.className) {
    function addnewClassName(clase) {
      if (clase.includes('is-style-nav-tabs')) {
        clase = clase.replaceAll('nav-pills', '');
        clase = clase.replaceAll('nav-underline', '');
        clase = clase.replace('is-style-nav-tabs', 'nav-tabs');
      }
      if (clase.includes('is-style-nav-pills')) {
        clase = clase.replaceAll('nav-tabs', '');
        clase = clase.replaceAll('nav-underline', '');
        clase = clase.replace('is-style-nav-pills', 'nav-pills');
      }
      if (clase.includes('is-style-nav-underline')) {
        clase = clase.replaceAll('nav-tabs', '');
        clase = clase.replaceAll('nav-pills', '');
        clase = clase.replace('is-style-nav-underline', 'nav-underline');
      }
      return clase;
    }
    setAttributes({ className: addnewClassName(attributes.className) });
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Nav options', 'ekiline-block-collection')} initialOpen>
          <SelectControl
            label={__('Nav align', 'ekiline-block-collection')}
            value={attributes.alignTabs}
            options={[
              { label: __('Select align', 'ekiline-block-collection'), value: '' },
              { label: __('Justify center', 'ekiline-block-collection'), value: ' justify-content-center' },
              { label: __('Justify end', 'ekiline-block-collection'), value: ' justify-content-end' },
              { label: __('Fill', 'ekiline-block-collection'), value: ' nav-fill' }
            ]}
            onChange={(alignTabs) => setAttributes({ alignTabs })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks
        orientation="horizontal"
        allowedBlocks={allowedBlocks}
        template={template}
      />
    </div>
  );
}

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

  function saveStyleNav(newClassName){
    if (!newClassName) return;
    if (newClassName.includes('is-style-nav-tabs')) {
      setAttributes({ styleNav: 'nav-tabs' });
    }
    if (newClassName.includes('is-style-nav-pills')) {
      setAttributes({ styleNav: 'nav-pills' });
    }
    if (newClassName.includes('is-style-nav-underline')) {
      setAttributes({ styleNav: 'nav-underline' });
    }
  }
  saveStyleNav(attributes.className);

  // Convertir clasnames en string, 
  // filter(Boolean) elimina valores falsy (como '', undefined, null).
  const addClassNames = [
    'nav',
    'mb-3',
    attributes.alignTabs,
    attributes.styleNav
  ].filter(Boolean).join(' ');

  const blockProps = useBlockProps({
    className: addClassNames
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Nav options', 'ekiline-block-collection')} initialOpen>
          <SelectControl
            label={__('Nav align', 'ekiline-block-collection')}
            value={attributes.alignTabs}
            options={[
              { label: __('Select align', 'ekiline-block-collection'), value: '' },
              { label: __('Justify center', 'ekiline-block-collection'), value: 'justify-content-center' },
              { label: __('Justify end', 'ekiline-block-collection'), value: 'justify-content-end' },
              { label: __('Fill', 'ekiline-block-collection'), value: 'nav-fill' }
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

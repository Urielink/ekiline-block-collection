import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const replaceSpecialChars = (str) => {
  return str.normalize('NFD').replace(/(<([^>]+)>)/gi, '')
    .replace(/[̀-ͯ]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();
};

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'tab-link' });

  return (
    <div>
      <InspectorControls>
        <PanelBody title={__('Tab Link Params', 'ekiline-block-collection')} initialOpen>
          <TextControl
            label={__('Copy this value in a Content Tab HTML anchor field.', 'ekiline-block-collection')}
            type="string"
            value={attributes.dataBsTarget = replaceSpecialChars(attributes.content)}
            onChange={(dataBsTarget) => setAttributes({ dataBsTarget })}
            readOnly
          />
        </PanelBody>
      </InspectorControls>
      <RichText
        withoutInteractiveFormatting
        allowedFormats={['core/bold', 'core/italic', 'core/image', 'core/align', 'ekiline-format/find-anchor']}
        tagName="p"
        className={blockProps.className}
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
      />
    </div>
  );
}

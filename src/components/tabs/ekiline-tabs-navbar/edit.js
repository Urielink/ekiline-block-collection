import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
    className: 'tabs-navbar'
  });

  if (attributes.className) {
    function addnewClassName(clase) {
      if (clase.includes('is-style-nav-tabs')) {
        clase = clase.replaceAll('nav-pills', '');
        clase = clase.replace('is-style-nav-tabs', 'nav-tabs');
      }
      if (clase.includes('is-style-nav-pills')) {
        clase = clase.replaceAll('nav-tabs', '');
        clase = clase.replace('is-style-nav-pills', 'nav-pills');
      }
      return clase;
    }
    setAttributes({ className: addnewClassName(attributes.className) });
  }

  return (
    <div {...blockProps}>
      <InnerBlocks
        orientation="horizontal"
        allowedBlocks={allowedBlocks}
        template={template}
      />
    </div>
  );
}

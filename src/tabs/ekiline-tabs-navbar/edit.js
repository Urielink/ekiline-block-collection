import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit(props) {
  const { attributes, setAttributes, context } = props;

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

  setAttributes({ tabsStyle: context['ekiline-tabs/tabsStyle'] })
  setAttributes({ tabsAlign: context['ekiline-tabs/tabsAlign'] })
  setAttributes({ tabsDesign: context['ekiline-tabs/tabsDesign'] })

  // Convertir clasnames en string, 
  // filter(Boolean) elimina valores falsy (como '', undefined, null).
  const addClassNames = [
    'nav',
    'mb-3',
    attributes.tabsAlign,
    attributes.tabsStyle,
    !attributes.tabsDesign ? '' : 'flex-column'
  ].filter(Boolean).join(' ');

  const blockProps = useBlockProps({
    className: addClassNames
  });

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

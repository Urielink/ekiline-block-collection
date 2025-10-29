import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { replaceSpecialChars } from '../../../shared/collection';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'tabs-container tab-content'
  });

  const allowedBlocks = ['ekiline-block-collection/ekiline-tab-content'];
  const template = [
    ['ekiline-block-collection/ekiline-tab-content', {
      // className: 'active show',
      anchor: replaceSpecialChars(__('Tab link 1', 'ekiline-block-collection'))
    }],
    ['ekiline-block-collection/ekiline-tab-content', {
      anchor: replaceSpecialChars(__('Tab link 2', 'ekiline-block-collection'))
    }]
  ];

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={allowedBlocks}
        template={template}
      />
    </div>
  );
}

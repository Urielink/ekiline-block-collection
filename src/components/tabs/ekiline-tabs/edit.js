import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({ className: 'tabs-wrapper' });

  const allowedBlocks = [
    'ekiline-block-collection/ekiline-tabs-navbar',
    'ekiline-block-collection/ekiline-tabs-container',
  ];
  const template = [
    ['ekiline-block-collection/ekiline-tabs-navbar', { className: 'is-style-nav-tabs' }],
    ['ekiline-block-collection/ekiline-tabs-container'],
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

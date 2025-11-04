import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'group-modal modal fade' + (attributes.modalShow !== 'default' ? attributes.modalShow : ''),
    'data-bs-backdrop': attributes.modalBackdrop,
    'data-bs-keyboard': attributes.modalKeyboard,
    'data-ek-time': attributes.modalTime || null
  });

  const dialogClass = 'modal-dialog' +
    (attributes.modalAlign ? ' modal-dialog-centered' : '') +
    (attributes.modalSize !== 'default' ? attributes.modalSize : '');

  return (
    <div {...blockProps} tabIndex='-1' role='dialog' aria-labelledby={blockProps.id + 'Label'} aria-hidden='true'>
      <div className={dialogClass}>
        <div className='modal-content'>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

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
          {attributes.modalGrow && (
            <button
              type='button'
              className='modal-resize btn btn-sm position-absolute bottom-0 mb-2 ms-1'
              aria-label={__('play btn', 'ekiline-block-collection')}
            >
              <span className='dashicons dashicons-editor-expand' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

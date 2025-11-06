import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'editor-modal-button-resize'
  });

  return (
    <div {...blockProps}>
        <button
          type='button'
          className='modal-resize btn btn-sm'
          aria-label={__('Resize button', 'ekiline-block-collection')}
        >
          <span className='dashicons dashicons-editor-expand' />
        </button>
    </div>
  );
}

import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'modal-footer'
  });
  // uso de contexto para mostrar boton.
  function HasResize() {
    if (attributes.modalGrow) {
      return (
        <button
          type='button'
          className='modal-resize btn btn-sm'
          aria-label={__('play btn', 'ekiline-block-collection')}
        >
          <span className='dashicons dashicons-editor-expand' />
        </button>
      );
    }
  }

  return (
    <div {...blockProps}>
      <HasResize />
      <InnerBlocks.Content />
    </div>
  );
}

import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
  const { attributes, setAttributes, context } = props;
  const blockProps = useBlockProps({
    className: 'editor-modal-footer modal-footer'
  });

  // Sincronizar el atributo con el contexto.
  useEffect(() => {
    if (attributes.modalGrow !== context['ekiline-modal/modalGrow']) {
      setAttributes({ modalGrow: context['ekiline-modal/modalGrow'] });
    }
  }, [context['ekiline-modal/modalGrow']]);

  // uso de contexto para mostrar boton.
  function HasResize({ show }) {
    if (show) {
      return (
        <button
          type='button'
          className='modal-resize btn btn-sm'
          aria-label={__('play btn', 'ekiline-block-collection')}
          disabled
        >
          <span className='dashicons dashicons-editor-expand' />
        </button>
      );
    }
  }

  const CHILD_TEMPLATE = [["core/paragraph", {"content": "Add modal footer text"}]];

  return (
    <div {...blockProps}>
      <HasResize show={attributes.modalGrow} />
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}

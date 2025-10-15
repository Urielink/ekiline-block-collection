import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit(attributes) {
  const blockProps = useBlockProps({
    // className: 'tab-content tab-pane fade',
    className: 'tab-pane',
  });

  // // Obtener el anchor de este objeto.
  // // por alguna razon que desconozco requiere doble llamdo: attributes.attributes...
  // if (attributes.attributes.anchor) {
  //   blockProps.id = attributes.attributes.anchor;
  // }

  const template = [
    ['core/paragraph', {
      content: __('Add your content and blocks, then copy anchor name to tab content block', 'ekiline-block-collection')
    }]
  ];

  return (
    <div {...blockProps}>
      <InnerBlocks template={template} />
    </div>
  );
}

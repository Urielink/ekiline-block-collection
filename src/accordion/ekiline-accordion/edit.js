import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { getRandomArbitrary } from '../../shared/collection';

export default function Edit({ attributes, setAttributes }) {
  const PARENT_ALLOWED_BLOCKS = ['ekiline-block-collection/ekiline-accordion-item'];
  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-accordion-item'],
    ['ekiline-block-collection/ekiline-accordion-item'],
    ['ekiline-block-collection/ekiline-accordion-item']
  ];

  const blockProps = useBlockProps({
    // className: 'group-accordion accordion',
    className: (!attributes.useBorder ? 'group-accordion accordion accordion-flush' : 'group-accordion accordion')
  });

  // generar ID anchor dinamico
  if (!attributes.anchor) {
    setAttributes({ anchor: 'accordion' + getRandomArbitrary(10, 150) });
  }

  // obtener valores de borde.
  if (attributes.useBorder){
    //retrieve border and border radius values
    const border = attributes.border;
    const borderRadius = attributes.borderRadius;
    // En caso de color de texto en header.
    if (border || borderRadius){
      blockProps.style = {
        ...blockProps.style,
        '--bs-accordion-border-color': border.color,
        '--bs-accordion-border-width': border.width,
        '--ek-accordion-border-style': border.style,
        '--bs-accordion-border-radius': borderRadius,
        '--bs-accordion-inner-border-radius': `calc(var(${borderRadius}) - (var(${border?.width})))`,
        'border': 'none !important'
      }
    }
  }
  // disable border and border radius values from blockProps
  delete blockProps?.style?.border;
  delete blockProps?.style?.borderRadius

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Accordion Settings', 'ekiline-block-collection')} initialOpen>
          <ToggleControl
            label={__('Use default borders.', 'ekiline-block-collection')}
            checked={attributes.useBorder}
            onChange={(useBorder) => setAttributes({ useBorder })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks allowedBlocks={PARENT_ALLOWED_BLOCKS} template={CHILD_TEMPLATE} />
    </div>
  );
}

import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { hexToRgb } from '../../../shared/collection';

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps({
    className: 'child-item-accordion-header accordion-header'
  });

  // Item target reemplaza el uso de ID.
  if (!attributes.itemTarget) {
    setAttributes({ itemTarget: context['ekiline-accordion-item/itemTarget'] });
  }

  // En caso de color de fondo en boton: obtener backgroundColor de blockProps.style y sobreescribir el valor --bs-accordion-btn-focus-box-shadow.
  if (blockProps.style.backgroundColor){
    // add boxShadow to blockProps.style
    blockProps.style = {
      ...blockProps.style,
      '--bs-accordion-btn-focus-box-shadow': '0 0 0 0.25rem ' + hexToRgb(blockProps.style.backgroundColor, 0.25)
    }
  }

  // Función para pintar el color del boton en el editor. Filtrar clases por tipo 'has-'.
  function filterClassNames(string) {
    return string.split(' ').filter(function(className) {
      return className.startsWith('has-');
    }).join(' ');
  }

  return (
    <div {...blockProps}>
      <button
        className={['accordion-button', filterClassNames(blockProps.className)].filter(Boolean).join(' ')}
        type='button'
        data-bs-toggle='collapse'
        data-bs-target={attributes.itemTarget ? '#' + attributes.itemTarget : null}
        style={blockProps.style || null}
      >
        <RichText
          withoutInteractiveFormatting
          allowedFormats={['core/bold', 'core/italic', 'core/image', 'core/align']}
          tagName='span'
          value={attributes.content}
          onChange={(content) => setAttributes({ content })}
          placeholder={attributes.default}
        />
      </button>
    </div>
  );
}

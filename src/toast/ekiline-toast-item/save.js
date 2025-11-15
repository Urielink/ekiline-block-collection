import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

import {
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getHeaderBorderBottom,
  getRadiusWithDefaults,
  sanitizeBorderValue,
} from '../../shared/border-box';

import { hexToRgb } from '../../shared/collection';

export default function save({ attributes }) {

  const { border, borderRadius } = attributes;

  // Mirror the editor sanitisation so the front-end style matches exactly.
  const normalizedBorder = sanitizeBorderValue(border);
  const borderStyles = getBorderStyles(normalizedBorder);
  const headerBorderBottom = getHeaderBorderBottom(borderStyles);
  const appliedBorderRadius = getRadiusWithDefaults(
    borderRadius,
    DEFAULT_BORDER_RADIUS
  );

  const blockProps = useBlockProps.save({
    className:
      'toast-item toast' +
      (attributes.toastScroll ? ' launch-scroll hide' : '') +
      (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
    'data-ek-launch-time': attributes.toastTime || null,
  });

  // En caso de color de texto en header.
  // obtener backgroundColor de blockProps.style y sobreescribir el valor --bs-toast-header-color.
  if (blockProps.style && blockProps.style.color) {
    blockProps.style = {
      ...blockProps.style,
      '--bs-toast-header-color': blockProps.style.color
    }
  }

  const headerStyles = {
    borderBottom: headerBorderBottom,
    borderTopLeftRadius: appliedBorderRadius,
    borderTopRightRadius: appliedBorderRadius,
    backgroundColor: hexToRgb(normalizedBorder.color, 0.20)
  };

  // Función para pintar el color del texto en header. Filtrar clases por tipo 'has-'.
  function filterClassNames(string) {
    return string.split(' ').filter(function(className) {
      return className.startsWith('has-');
    }).join(' ');
  }

  return (
    <div {...blockProps}>
      <div className={['toast-header', filterClassNames(blockProps.className)].filter(Boolean).join(' ')} style={headerStyles}>
        <RichText.Content
          tagName='p'
          value={attributes.content}
          className='me-auto my-0'
        />
        <button type='button' className='btn-close' data-bs-dismiss='toast' aria-label='Close' />
      </div>
      <div className='toast-body'>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}

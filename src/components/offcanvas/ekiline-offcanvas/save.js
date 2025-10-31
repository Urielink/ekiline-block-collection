import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
// Personalización de borde.
import {
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getRadiusWithDefaults,
  sanitizeBorderValue,
} from '../../../shared/border-box';


export default function save({ attributes }) {

  const { border, borderRadius } = attributes;

  // Mirror the editor sanitisation so the front-end style matches exactly.
  const normalizedBorder = sanitizeBorderValue(border);
  const borderStyles = getBorderStyles(normalizedBorder);
  const appliedBorderRadius = getRadiusWithDefaults(
    borderRadius,
    DEFAULT_BORDER_RADIUS
  );


  const blockProps = useBlockProps.save({
    className:
      'group-offcanvas' +
      attributes.ocDisplay +
      attributes.ocPosition +
      attributes.ocWidth +
      attributes.ocHeight,
    'data-bs-backdrop': attributes.ocBackdrop,
    'data-bs-scroll': attributes.ocScroll,
    style:{
      ...borderStyles,
      borderRadius: appliedBorderRadius,
    }
  });

  return (
    <div
      {...blockProps}
      tabindex='-1'
      role='dialog'
      aria-hidden='true'
    >
      <InnerBlocks.Content />
    </div>
  );
}

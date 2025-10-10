import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

import {
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getHeaderBorderBottom,
  sanitizeBorderValue,
} from './utils';

export default function save({ attributes }) {

  const { border, borderRadius } = attributes;

  // Mirror the editor sanitisation so the front-end style matches exactly.
  const normalizedBorder = sanitizeBorderValue(border);
  const borderStyles = getBorderStyles(normalizedBorder);
  const headerBorderBottom = getHeaderBorderBottom(borderStyles);
  const appliedBorderRadius = borderRadius || DEFAULT_BORDER_RADIUS;

  const blockProps = useBlockProps.save({
    className:
      'toast-item toast' +
      (attributes.toastScroll ? ' launch-scroll hide' : '') +
      (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
    'data-ek-launch-time': attributes.toastTime || null,
    style:{
      ...borderStyles,
      borderRadius: appliedBorderRadius,
    }
  });

  const headerStyles = {
    borderBottom: headerBorderBottom,
    borderTopLeftRadius: appliedBorderRadius,
    borderTopRightRadius: appliedBorderRadius,
  };

  return (
    <div {...blockProps}>
      <div className='toast-header' style={headerStyles}>
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

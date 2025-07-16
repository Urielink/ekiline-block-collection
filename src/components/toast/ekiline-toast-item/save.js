import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className:
      'toast-item toast' +
      (attributes.toastScroll ? ' launch-scroll hide' : '') +
      (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
    'data-ek-launch-time': attributes.toastTime || null
  });

  return (
    <div {...blockProps}>
      <div className='toast-header'>
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

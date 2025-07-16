import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'progress-bar' +
      (attributes.progAnimation ? ' progress-bar-animated' : '') +
      (attributes.progStripes ? ' progress-bar-striped' : ''),
    style: {
      width: attributes.progRange + '%'
    }
  });

  return (
    <div {...blockProps}>
      {!attributes.progLabel ? attributes.progRange : null}
    </div>
  );
}

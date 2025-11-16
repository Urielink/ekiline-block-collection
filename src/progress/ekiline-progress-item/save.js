import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { progRange, progLabel, progStripes, progAnimation, content, textAlign } = attributes;

  const blockProps = useBlockProps.save({
    className: 'progress-bar' +
      (progAnimation ? ' progress-bar-animated' : '') +
      (progStripes ? ' progress-bar-striped' : ''),
    style: {
      width: progRange + '%'
    }
  });

  return (
    <div {...blockProps}>
      {
        !progLabel && (
          <RichText.Content
            tagName="p"
            value={ content || `${progRange}%` }
            className="my-0"
            style={{ textAlign }}
          />
        )
      }
    </div>
  );
}

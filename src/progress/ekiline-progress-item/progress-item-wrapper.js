import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

const applyProgressItemWrapper = () => {
  const newWrapperAtts = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
      if (props.name === 'ekiline-block-collection/ekiline-progress-item') {
        const wrapperProps = {
          ...props.wrapperProps,
          style: {
            width: props.attributes.progRange + '%'
          }
        };
        return <BlockListBlock {...props} wrapperProps={wrapperProps} />;
      }
      return <BlockListBlock {...props} />;
    };
  }, 'newWrapperAtts');

  addFilter(
    'editor.BlockListBlock',
    'ekiline-block-collection/ekiline-progress-item',
    newWrapperAtts
  );
};

export default applyProgressItemWrapper;

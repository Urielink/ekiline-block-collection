import { useBlockProps } from '@wordpress/block-editor';
import { renderNavbar } from './renderers/navbar-render';

export default function save( { attributes } ) {
  
  return renderNavbar({
    attributes,
    blockProps: useBlockProps.save(),
    mode: 'save'
  });

}
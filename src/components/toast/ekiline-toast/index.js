import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
/**
 * Imports the icons used in the block.
 */
import icons from '../../../shared/icons';
const { collectionIcon, toastIcon } = icons;
/**
 * Add to block collection.
 */
import { registerEkilineCollection } from '../../../shared/collection';
registerEkilineCollection(collectionIcon);

registerBlockType(metadata.name, {
  ...metadata,
  icon: toastIcon,
  edit,
  save
});

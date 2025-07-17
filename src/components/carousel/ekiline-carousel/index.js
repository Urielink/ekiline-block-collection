import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import Edit from './edit'
import save from './save'
import metadata from './block.json';
import sharedAttributes from './utils/sharedAttributes'

/**
 * Imports the icons used in the block.
 */
import icons from '../../../shared/icons';
const { collectionIcon, carouselIcon } = icons;
/**
 * Add to block collection.
 */
import { registerEkilineCollection } from '../../../shared/collection';
registerEkilineCollection(collectionIcon);

registerBlockType(metadata.name, {
  icon: carouselIcon,
  attributes: sharedAttributes,
  edit: Edit,
  save
})


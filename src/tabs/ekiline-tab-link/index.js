import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import './find-anchor-format.js';
/**
 * Imports the icons used in the block.
 */
import icons from '../../shared/icons';
const { tabsIcon } = icons;

registerBlockType(metadata.name, {
  ...metadata,
  icon: tabsIcon,
  edit,
  save,
});

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import applyProgressItemWrapper from './progress-item-wrapper';
/**
 * Imports the icons used in the block.
 */
import icons from '../../shared/icons';
const { progressIcon } = icons;
registerBlockType(metadata.name, {
  ...metadata,
  icon: progressIcon,
  edit,
  save,
});

applyProgressItemWrapper();

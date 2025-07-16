import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import applyProgressItemWrapper from './progress-item-wrapper';

registerBlockType(metadata.name, {
  ...metadata,
  edit,
  save,
});

applyProgressItemWrapper();

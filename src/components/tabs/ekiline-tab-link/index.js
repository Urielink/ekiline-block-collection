import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import './find-anchor-format.js';

registerBlockType(metadata.name, {
  ...metadata,
  edit,
  save,
});

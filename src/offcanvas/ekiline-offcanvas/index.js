import { registerBlockType } from '@wordpress/blocks'
import './style.scss'
import './editor.scss'
import edit from './edit'
import save from './save'
import metadata from './block.json'
/**
 * Imports the icons used in the block.
 */
import icons from '../../shared/icons'
/**
 * Add to block collection.
 */
import { registerEkilineCollection } from '../../shared/collection'
const { collectionIcon, offcanvasIcon } = icons
registerEkilineCollection(collectionIcon)

registerBlockType(metadata.name, {
  ...metadata,
  icon: offcanvasIcon,
  edit,
  save
})

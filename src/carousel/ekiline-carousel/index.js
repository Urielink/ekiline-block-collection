/**
 * Reference dyanmic blocks.
 * @see https://rudrastyh.com/gutenberg/dynamic-blocks.html
 */
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import './style.scss'
import './editor.scss'
import Edit from './edit'
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
const { collectionIcon, carouselIcon } = icons
registerEkilineCollection(collectionIcon)

registerBlockType(metadata.name, {
  icon: carouselIcon,
  edit: Edit,
  save
})

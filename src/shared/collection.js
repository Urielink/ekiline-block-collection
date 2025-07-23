/**
 * Asignar colección.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockCollection } from '@wordpress/blocks';

export const registerEkilineCollection = (icon) => {
	registerBlockCollection('ekiline-block-collection', {
		title: 'Ekiline Block Collection',
		icon: icon,
	});
};

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns número aleatorio entre min y max.
 * 
 * import { getRandomArbitrary } from '../../../shared/collection';
 * 
 * if (!attributes.anchor) {
 *  setAttributes({ anchor: 'accordion' + getRandomArbitrary(10, 150) });
 * }
 * 
 */
export function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


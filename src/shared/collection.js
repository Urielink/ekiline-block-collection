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

/**
 * Transformar colores hexadecimales a rgb o rgba
 * @param {*} hex
 * @param {*} alpha
 * @returns
 *
 * import { hexToRgb } from '../../../shared/collection';
 */
export function hexToRgb(hex, alpha) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? 'rgba(' +
        parseInt(result[1], 16) +
        ', ' +
        parseInt(result[2], 16) +
        ', ' +
        parseInt(result[3], 16) +
        ', ' +
        alpha +
        ')'
    : null;
}

/**
 * Transformar cadena de texto en slug
 */
export const replaceSpecialChars = (str) => {
  return str.normalize('NFD').replace(/(<([^>]+)>)/gi, '')
    .replace(/[̀-ͯ]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();
};
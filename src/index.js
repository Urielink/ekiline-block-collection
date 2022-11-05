/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Internal dependencies
 */
// import './collection/index';
import './accordion/index';
import './collapse/index';
import './popovers/index';
import './progress/index';
import './toast/index';
import './tabs/index';
import './modal/index';
import './carousel/index';
import './carousel-extra/index';
import './offcanvas/index';
import './hooks/index';

/**
 * Incorporar bloques a coleccion.
 */
import { registerBlockCollection } from '@wordpress/blocks';
registerBlockCollection( 'ekiline-collection', {
    title: 'Ekiline Collection',
    // icon: customIcon,
} );

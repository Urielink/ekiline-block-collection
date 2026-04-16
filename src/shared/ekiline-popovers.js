import Tooltip from 'bootstrap/js/src/tooltip.js';
import Popover from 'bootstrap/js/src/popover.js';

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '[data-bs-toggle="tooltip"]' )
		.forEach( el => new Tooltip( el ) );

	document.querySelectorAll( '[data-bs-toggle="popover"]' )
		.forEach( el => new Popover( el ) );
} );

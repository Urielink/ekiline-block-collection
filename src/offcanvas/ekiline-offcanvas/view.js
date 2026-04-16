// Importar Offcanvas registra los event listeners para data-bs-toggle="offcanvas".
import Offcanvas from 'bootstrap/js/src/offcanvas.js';

document.addEventListener( 'DOMContentLoaded', () => {
	offcanvasVideoHandler();
} );

function offcanvasVideoHandler() {
	document.querySelectorAll( '.offcanvas' ).forEach( el => {
		el.addEventListener( 'hidden.bs.offcanvas', function () {
			this.querySelectorAll( 'video' ).forEach( v => v.pause() );
		} );
	} );
}

export default Offcanvas;

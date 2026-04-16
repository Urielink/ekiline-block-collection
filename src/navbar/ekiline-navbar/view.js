// Importar Dropdown registra los event listeners para data-bs-toggle="dropdown".
import Dropdown from 'bootstrap/js/src/dropdown.js';

document.addEventListener( 'DOMContentLoaded', () => {
	handleNestedDropdowns();
	closeNavbarOnResize();
} );

function handleNestedDropdowns() {
	document.querySelectorAll( '.dropdown-toggle' ).forEach( toggle => {
		toggle.addEventListener( 'click', e => {
			if ( e.target.closest( '.dropdown-menu' ) ) {
				e.stopPropagation();
			}
		} );
	} );
}

function closeNavbarOnResize() {
	const navbars = document.querySelectorAll( '.navbar-collapse' );
	if ( ! navbars.length ) return;
	window.addEventListener( 'resize', () => {
		navbars.forEach( nav => nav.classList.remove( 'show' ) );
	} );
}

export default Dropdown;

import Tab from 'bootstrap/js/src/tab.js';

document.addEventListener( 'DOMContentLoaded', () => {
	persistTabSelection( '.tabs-wrapper', '[data-bs-target]' );
} );

function persistTabSelection( groupSelector, linkSelector ) {
	document.querySelectorAll( groupSelector ).forEach( group => {
		const groupId = group.id;

		group.querySelectorAll( linkSelector ).forEach( link => {
			link.addEventListener( 'show.bs.tab', e => {
				localStorage.setItem( groupId, e.target.getAttribute( 'data-bs-target' ) );
			} );
		} );

		const savedTab = localStorage.getItem( groupId );
		if ( savedTab ) {
			const trigger = document.querySelector( '[data-bs-target="' + savedTab + '"]' );
			if ( trigger ) {
				new Tab( trigger ).show();
			}
		}
	} );
}

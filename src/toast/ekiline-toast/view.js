import Toast from 'bootstrap/js/src/toast.js';

document.addEventListener( 'DOMContentLoaded', () => {
	initToasts( '.toast' );
	launchDelayedToasts();
	launchScrollToasts();
} );

function initToasts( selector ) {
	document.querySelectorAll( selector ).forEach( el => {
		const toast = new Toast( el, { autohide: false } );
		if ( ! el.classList.contains( 'hide' ) ) {
			toast.show();
		}
	} );
}

function launchDelayedToasts() {
	document.querySelectorAll( '[data-ek-launch-time]' ).forEach( el => {
		const toast = new Toast( el, { autohide: false } );
		setTimeout( () => toast.show(), el.dataset.ekLaunchTime );
	} );
}

function launchScrollToasts() {
	document.querySelectorAll( '.launch-scroll' ).forEach( el => {
		const toast = new Toast( el, { autohide: false } );
		window.addEventListener( 'scroll', () => {
			if ( ( window.innerHeight + window.scrollY ) >= ( document.body.offsetHeight - 200 ) ) {
				toast.show();
			}
		} );
	} );
}

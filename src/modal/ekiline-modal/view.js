import Modal from 'bootstrap/js/src/modal.js';

document.addEventListener( 'DOMContentLoaded', () => {
	launchModal();
	modalResizeBehavior();
	modalVideoHandler();
} );

function closeOpenModals() {
	document.querySelectorAll( '.modal.show' ).forEach( el => el.click() );
}

function launchModal() {
	document.querySelectorAll( '[data-ek-time]' ).forEach( modalItem => {
		const instance = new Modal( modalItem, {} );
		const delay = modalItem.dataset.ekTime;
		setTimeout( () => {
			closeOpenModals();
			instance.show();
		}, delay );
	} );
}

function modalResizeBehavior() {
	document.querySelectorAll( '.modal-resize' ).forEach( btn => {
		btn.addEventListener( 'click', function () {
			const dialog = document.querySelector( '.modal-dialog' );
			dialog.classList.toggle( 'modal-fullscreen' );
			this.firstElementChild.classList.toggle( 'text-success' );
		} );
	} );
}

function modalVideoHandler() {
	document.querySelectorAll( '.modal' ).forEach( modalEl => {
		modalEl.addEventListener( 'hidden.bs.modal', function () {
			this.querySelectorAll( 'video' ).forEach( v => v.pause() );
		} );
	} );
}

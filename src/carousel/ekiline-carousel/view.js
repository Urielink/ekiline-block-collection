// Importar Carousel registra el comportamiento de data-bs-ride.
import Carousel from 'bootstrap/js/src/carousel.js';

document.addEventListener( 'DOMContentLoaded', () => {
	transformMultiColumnCarousel( '.carousel-multiple' );
	syncTextIndicators( '.carousel-text-indicators' );
} );

function transformMultiColumnCarousel( selector ) {
	const carousels = document.querySelectorAll( selector );
	if ( ! carousels.length ) return;

	function wrapChildren( source, col ) {
		const wrapper = document.createElement( 'figure' );
		wrapper.className = 'col-md-' + col;
		const children = source.children;
		for ( let i = children.length - 1; i >= 0; i-- ) {
			wrapper.appendChild( children[ i ] );
		}
		source.appendChild( wrapper );
	}

	const params = [
		[ 'x2', '6', '0' ],
		[ 'x3', '4', '1' ],
		[ 'x4', '3', '2' ],
		[ 'x6', '2', '4' ],
	];

	carousels.forEach( carousel => {
		let item, view;
		for ( const [ cls, col, extra ] of params ) {
			if ( carousel.classList.contains( cls ) ) {
				item = col;
				view = extra;
			}
		}

		const slides = carousel.querySelectorAll( '.carousel-item' );

		slides.forEach( slide => wrapChildren( slide, item ) );

		slides.forEach( ( slide, i ) => {
			let next = slide.nextElementSibling || slide.parentNode.children[ 0 ];
			let clone = next.children[ 0 ].cloneNode( true );
			slide.parentNode.children[ i ].appendChild( clone );

			for ( let j = 0; j < view; j++ ) {
				next = next.nextElementSibling || slide.parentNode.children[ 0 ];
				clone = next.children[ 0 ].cloneNode( true );
				slide.parentNode.children[ i ].appendChild( clone );
			}
		} );
	} );
}

function syncTextIndicators( selector ) {
	document.querySelectorAll( selector ).forEach( control => {
		const parent = control.parentNode;
		parent.addEventListener( 'slide.bs.carousel', e => {
			control.children[ e.from ].classList.remove( 'active' );
			control.children[ e.to ].classList.add( 'active' );
			parent.classList.remove( 'index-' + e.from );
			parent.classList.add( 'index-' + e.to );
		} );
		parent.classList.add( 'has-text-indicators' );
	} );
}

export default Carousel;

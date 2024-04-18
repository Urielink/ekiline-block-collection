/**
 * Ekiline Block Collection, complementary scripts for each block:
 * - Modal
 * - Popover
 * - Tabs
 * - Toast
 * - Carousel
 */

/**
 * Modal.
 */
// Cerrar una ventana modal si está abierta.
function ekiline_collection_js_close_modal() {
	// Bucar un modal abierto.
	const ventanasAbiertas = document.querySelectorAll('.modal.show');
	// Si existe cerrar con click.
	if(0!==ventanasAbiertas.length) {
		ventanasAbiertas.forEach(function(el) {
			el.click();
		});
	}
}
// Abrir un modal programado.
function ekiline_collection_js_launch_modal() {
	// Bucar un modal programado.
	const modalProgramado = document.querySelectorAll('[data-ek-time]');
	// Si existe ejecutar.
	if(0!==modalProgramado.length) {
		modalProgramado.forEach(function (modalItem) {
			// Modal programado.
			const nuevoModal = new bootstrap.Modal(modalItem, {});
			// Tiempo de lanzado.
			const modalData = modalItem.dataset.ekTime;
			setTimeout(
				function() {
					// Si existe un modal abierto, cerrar.
					ekiline_collection_js_close_modal();
					// Despues de cerrar, mostrar.
					nuevoModal.show();
				},
				// tiempo.
				modalData
			);
		});
	}
}
ekiline_collection_js_launch_modal();

// Cambiar el tamaño de modal.
function ekiline_collection_js_modal_behavior(){
	var modalResizeBtn = document.querySelector('.modal-resize');
	if ( modalResizeBtn ){
		modalResizeBtn.addEventListener('click', function() {
			var modalOpen = document.querySelector('.modal-dialog');
			modalOpen.classList.toggle('modal-fullscreen');
			this.firstElementChild.classList.toggle('text-success');
		}, false);
	}
}
ekiline_collection_js_modal_behavior();

/**
 * Popover.
 */
function ekiline_collection_js_init_popovers(){
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip);
    });

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(function (popover) {
    new bootstrap.Popover(popover);
    });
}
ekiline_collection_js_init_popovers();

/**
 * Tabs.
 */
function ekiline_collection_js_persist_tab_select(allTabs, linkItem){

	// Confirmar la existencia de tabs.
	let gtabs = document.querySelectorAll(allTabs);
	if ( !gtabs.length ) return;

	// Loop: Identificar cada grupo de tabs.
	gtabs.forEach(tgroup => {

		// ID de grupo para localStorage.
		let gtabId = tgroup.id;

		// Identificar botones dentro de grupo.
		let tabLinks = tgroup.querySelectorAll(linkItem);

		// Loop: Agregar evento a cada boton.
		tabLinks.forEach( tlink => {

			tlink.addEventListener('show.bs.tab', function(ev){
				// Nomenclatura BS:  target = Tab seleccionado. relatedTarget = Tab previo.
				let tabActivo = ev.target.getAttribute('data-bs-target');
				// Local storage selected tab.
				localStorage.setItem( gtabId, tabActivo );
			});

		});

		// En la recarga, buscar dato segun el id.
		const savedTab = localStorage.getItem(gtabId);

		if( savedTab ){
			const someTabTriggerEl = document.querySelector('[data-bs-target="' + savedTab + '"]');
			const tab = new bootstrap.Tab(someTabTriggerEl);
			tab.show();
		}

	});

}
ekiline_collection_js_persist_tab_select('.tabs-wrapper','[data-bs-target]');

/**
 * Toast.
 */
function ekiline_collection_js_init_toast(item=null){
	document.querySelectorAll(item)
	.forEach(function (toastNode) {
		var toast = new bootstrap.Toast(toastNode, {
			autohide: false
		});
		// Dont run if .hide classname presents.
		if (!toastNode.classList.contains('hide')){
			toast.show();
		}
	});
}
ekiline_collection_js_init_toast('.toast');

// Abrir un toast programado.
function ekiline_collection_js_launch_toast(){
	// Bucar un toast programado.
	var toastProgramado = document.querySelectorAll('[data-ek-launch-time]');
	// Si existe ejecutar.
	if(0!==toastProgramado.length){
		toastProgramado.forEach(function (toastItem) {
			// Toast programado.
			var nuevoToast = new bootstrap.Toast(toastItem, {
				autohide: false
			});
			// Tiempo de lanzado.
			var toastData = toastItem.dataset.ekLaunchTime;
			setTimeout(
				function() {
					// Mostrar.
					nuevoToast.show();
				},
				// tiempo.
				toastData
			);
		});
	}
}
ekiline_collection_js_launch_toast();

// Abrir un toast con scroll.
function ekiline_collection_js_scroll_toast(){
	// Buscar un toast programado.
	var toastScroll = document.querySelectorAll('.launch-scroll');
	// Si existe ejecutar.
	if(0!==toastScroll.length){
		toastScroll.forEach(function (toastItem) {
			// Toast programado.
			var nuevoToast = new bootstrap.Toast(toastItem, {
				autohide: false
			});
			// Activacion por scroll.
			window.addEventListener('scroll',
				function() {
					if( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) ) {
						nuevoToast.show();
					}
				}
			);

		});
	}
}
ekiline_collection_js_scroll_toast();

/**
 * Carousel Scripts.
 */
function ekiline_collection_transform_carousel(carrusel){

	// Si no hay carrusel cancelar todo.
	var loaditem = document.querySelector(carrusel);
	if ( !loaditem ) {
		return;
	}
	// if ( 0 < loaditem.getElementsByTagName('figure').length ) {
	// 	return;
	// }

	// Funcion envoltorio (Wrapper).
	function envolver(fuente,col){
		var hijos = fuente.children;
		// crear envoltorio
		var wrapper = document.createElement('figure');
			wrapper.className = 'col-md-' + col;
		// envolver los hijos.
		for (var i = hijos.length - 1; i >= 0; i--) {
			wrapper.appendChild(hijos[i]);
		}
		fuente.appendChild(wrapper);
	}

	// Si hay carrusel,
	var siCarruseles = document.querySelectorAll(carrusel);

	// Cuantos son, modificar cada uno
	Array.prototype.forEach.call(siCarruseles, function(unCarrusel, i){

		// Objeto e indice. Vistas, columnas y grupo.
		var params = [ ['x2','6','0'],['x3','4','1'],['x4','3','2'],['x6','2','4'] ];
		var view, item;
		// Envoltorio extra para agrupar.
		for ( i = 0; i < params.length; i++ ) {
			// Atributos por clase.
			if ( unCarrusel.classList.contains(params[i][0]) ) {
				item = params[i][1];
				view = params[i][2];
			}
		}

		// Resultado de seleccion por carrusel
		// Carrusel padre. Items para envoltorio.
		hijosCarrusel = unCarrusel.querySelectorAll('.carousel-item');

		// Carrusel hijo. Envoltorio por item.
		Array.prototype.forEach.call(hijosCarrusel, function(el,i){
			envolver(el,item);
		});

		// Loop grupos.
		Array.prototype.forEach.call(hijosCarrusel, function(el, i){
			// Copiar el primer slide y agregarlo.
			var next = el.nextElementSibling;
			if ( !next ) {
				next = el.parentNode.children[0];
			}

			// Elemento siguiente. Clonar.
			var firstChildClone = next.children[0].cloneNode(true);
			var firstChildSet = el.parentNode.children[i];
			firstChildSet.appendChild(firstChildClone);

			// Agrupar slides (view).
			for ( i=0;i<view;i++ ) {
				next = next.nextElementSibling;
				if ( !next ) {
					next = el.parentNode.children[0];
				}
				firstChildClone = next.children[0].cloneNode(true);
				firstChildSet.appendChild(firstChildClone);
			}

		});
	});
}
ekiline_collection_transform_carousel('.carousel-multiple');

function ekiline_collection_carousel_text_indicators(indicadores){
	const controlExterno = document.querySelectorAll(indicadores);
	// Verificar si existe text-indicators.
	if (controlExterno.length > 0){
		// Por cada control, agregar un evento.
		controlExterno.forEach(control => {
			// Verificar el carrusel padre.
			const padreCarrusel = control.parentNode;
			// Saber que indice se activa.
			padreCarrusel.addEventListener('slide.bs.carousel', e => {
				// Quitar clase css active.
				control.children[e.from].classList.remove('active');
				// Agregar clase css active.
				control.children[e.to].classList.add('active');
				// Agregar un inidice de ayuda.
				padreCarrusel.classList.remove('index-'+[e.from]);
				padreCarrusel.classList.add('index-'+[e.to]);
			});
			padreCarrusel.classList.add('has-text-indicators');
		});
	}
}
ekiline_collection_carousel_text_indicators('.carousel-text-indicators');

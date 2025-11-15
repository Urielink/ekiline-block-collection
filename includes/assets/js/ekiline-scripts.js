/**
 * Ekiline Block Collection, complementary scripts for each block:
 * - Modal
 * - Popover
 * - Tabs
 * - Toast
 * - Carousel
 * - Video extras
 */

/**
 * Modal.
 */
// Cerrar una ventana modal si está abierta.
function ekiline_collection_js_close_modal () {
  // Buscar un modal abierto.
  const ventanasAbiertas = document.querySelectorAll('.modal.show')
  // Si existe cerrar con click.
  if (ventanasAbiertas.length !== 0) {
    ventanasAbiertas.forEach(function (el) {
      el.click()
    })
  }
}
// Abrir un modal programado.
function ekiline_collection_js_launch_modal () {
  // Bucar un modal programado.
  const modalProgramado = document.querySelectorAll('[data-ek-time]')
  // Si existe ejecutar.
  if (modalProgramado.length !== 0) {
    modalProgramado.forEach(function (modalItem) {
      // Modal programado.
      const nuevoModal = new bootstrap.Modal(modalItem, {})
      // Tiempo de lanzado.
      const modalData = modalItem.dataset.ekTime
      setTimeout(
        function () {
          // Si existe un modal abierto, cerrar.
          ekiline_collection_js_close_modal()
          // Despues de cerrar, mostrar.
          nuevoModal.show()
        },
        // tiempo.
        modalData
      )
    })
  }
}
ekiline_collection_js_launch_modal()

// Cambiar el tamaño de modal.
function ekiline_collection_js_modal_behavior () {
  const modalResizeBtn = document.querySelectorAll('.modal-resize')
  if (modalResizeBtn.length !== 0) {
      modalResizeBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const modalOpen = document.querySelector('.modal-dialog')
        modalOpen.classList.toggle('modal-fullscreen')
        this.firstElementChild.classList.toggle('text-success')
      }, false)
    })
  }
}
ekiline_collection_js_modal_behavior()

// Modal: detectar click y error de no abrir modal.
function ekiline_collection_js_modal_error_detect () {
  const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]')
  if (modalTriggers.length !== 0) {
    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (ev) {
        const modalTarget = document.querySelector(trigger.dataset.bsTarget)
        if (!modalTarget) {
          console.error('No se encontró el modal objetivo:', trigger.dataset.bsTarget)
          alert('No se encontró el modal objetivo: ' + trigger.dataset.bsTarget)
        }
      })
    })
  }
}
// ekiline_collection_js_modal_error_detect()


/**
 * Popover.
 */
function ekiline_collection_js_init_popovers () {
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip)
    })

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })
}
ekiline_collection_js_init_popovers()

/**
 * Tabs.
 */
function ekiline_collection_js_persist_tab_select (allTabs, linkItem) {
  // Confirmar la existencia de tabs.
  const gtabs = document.querySelectorAll(allTabs)
  if (!gtabs.length) return

  // Loop: Identificar cada grupo de tabs.
  gtabs.forEach(tgroup => {
    // ID de grupo para localStorage.
    const gtabId = tgroup.id

    // Identificar botones dentro de grupo.
    const tabLinks = tgroup.querySelectorAll(linkItem)

    // Loop: Agregar evento a cada boton.
    tabLinks.forEach(tlink => {
      tlink.addEventListener('show.bs.tab', function (ev) {
        // Nomenclatura BS:  target = Tab seleccionado. relatedTarget = Tab previo.
        const tabActivo = ev.target.getAttribute('data-bs-target')
        // Local storage selected tab.
        localStorage.setItem(gtabId, tabActivo)
      })
    })

    // En la recarga, buscar dato segun el id.
    const savedTab = localStorage.getItem(gtabId)

    if (savedTab) {
      const someTabTriggerEl = document.querySelector('[data-bs-target="' + savedTab + '"]')
      const tab = new bootstrap.Tab(someTabTriggerEl)
      tab.show()
    }
  })
}
ekiline_collection_js_persist_tab_select('.tabs-wrapper', '[data-bs-target]')

/**
 * Toast.
 */
function ekiline_collection_js_init_toast (item = null) {
  document.querySelectorAll(item)
    .forEach(function (toastNode) {
      const toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })
      // Dont run if .hide classname presents.
      if (!toastNode.classList.contains('hide')) {
        toast.show()
      }
    })
}
ekiline_collection_js_init_toast('.toast')

// Abrir un toast programado.
function ekiline_collection_js_launch_toast () {
  // Bucar un toast programado.
  const toastProgramado = document.querySelectorAll('[data-ek-launch-time]')
  // Si existe ejecutar.
  if (toastProgramado.length !== 0) {
    toastProgramado.forEach(function (toastItem) {
      // Toast programado.
      const nuevoToast = new bootstrap.Toast(toastItem, {
        autohide: false
      })
      // Tiempo de lanzado.
      const toastData = toastItem.dataset.ekLaunchTime
      setTimeout(
        function () {
          // Mostrar.
          nuevoToast.show()
        },
        // tiempo.
        toastData
      )
    })
  }
}
ekiline_collection_js_launch_toast()

// Abrir un toast con scroll.
function ekiline_collection_js_scroll_toast () {
  // Buscar un toast programado.
  const toastScroll = document.querySelectorAll('.launch-scroll')
  // Si existe ejecutar.
  if (toastScroll.length !== 0) {
    toastScroll.forEach(function (toastItem) {
      // Toast programado.
      const nuevoToast = new bootstrap.Toast(toastItem, {
        autohide: false
      })
      // Activacion por scroll.
      window.addEventListener('scroll',
        function () {
          if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
            nuevoToast.show()
          }
        }
      )
    })
  }
}
ekiline_collection_js_scroll_toast()

/**
 * Carousel Scripts.
 */
function ekiline_collection_transform_carousel (carrusel) {
  // Si no hay carrusel cancelar todo.
  const loaditem = document.querySelector(carrusel)
  if (!loaditem) {
    return
  }
  // if ( 0 < loaditem.getElementsByTagName('figure').length ) {
  // 	return;
  // }

  // Funcion envoltorio (Wrapper).
  function envolver (fuente, col) {
    const hijos = fuente.children
    // crear envoltorio
    const wrapper = document.createElement('figure')
    wrapper.className = 'col-md-' + col
    // envolver los hijos.
    for (let i = hijos.length - 1; i >= 0; i--) {
      wrapper.appendChild(hijos[i])
    }
    fuente.appendChild(wrapper)
  }

  // Si hay carrusel,
  const siCarruseles = document.querySelectorAll(carrusel)

  // Cuantos son, modificar cada uno
  Array.prototype.forEach.call(siCarruseles, function (unCarrusel, i) {
    // Objeto e indice. Vistas, columnas y grupo.
    const params = [['x2', '6', '0'], ['x3', '4', '1'], ['x4', '3', '2'], ['x6', '2', '4']]
    let view, item
    // Envoltorio extra para agrupar.
    for (i = 0; i < params.length; i++) {
      // Atributos por clase.
      if (unCarrusel.classList.contains(params[i][0])) {
        item = params[i][1]
        view = params[i][2]
      }
    }

    // Resultado de seleccion por carrusel
    // Carrusel padre. Items para envoltorio.
    const hijosCarrusel = unCarrusel.querySelectorAll('.carousel-item')

    // Carrusel hijo. Envoltorio por item.
    Array.prototype.forEach.call(hijosCarrusel, function (el, i) {
      envolver(el, item)
    })

    // Loop grupos.
    Array.prototype.forEach.call(hijosCarrusel, function (el, i) {
      // Copiar el primer slide y agregarlo.
      let next = el.nextElementSibling
      if (!next) {
        next = el.parentNode.children[0]
      }

      // Elemento siguiente. Clonar.
      let firstChildClone = next.children[0].cloneNode(true)
      const firstChildSet = el.parentNode.children[i]
      firstChildSet.appendChild(firstChildClone)

      // Agrupar slides (view).
      for (i = 0; i < view; i++) {
        next = next.nextElementSibling
        if (!next) {
          next = el.parentNode.children[0]
        }
        firstChildClone = next.children[0].cloneNode(true)
        firstChildSet.appendChild(firstChildClone)
      }
    })
  })
}
ekiline_collection_transform_carousel('.carousel-multiple')

function ekiline_collection_carousel_text_indicators (indicadores) {
  const controlExterno = document.querySelectorAll(indicadores)
  // Verificar si existe text-indicators.
  if (controlExterno.length > 0) {
    // Por cada control, agregar un evento.
    controlExterno.forEach(control => {
      // Verificar el carrusel padre.
      const padreCarrusel = control.parentNode
      // Saber que indice se activa.
      padreCarrusel.addEventListener('slide.bs.carousel', e => {
        // Quitar clase css active.
        control.children[e.from].classList.remove('active')
        // Agregar clase css active.
        control.children[e.to].classList.add('active')
        // Agregar un inidice de ayuda.
        padreCarrusel.classList.remove('index-' + [e.from])
        padreCarrusel.classList.add('index-' + [e.to])
      })
      padreCarrusel.classList.add('has-text-indicators')
    })
  }
}
ekiline_collection_carousel_text_indicators('.carousel-text-indicators')

/**
 * Extension para el uso de videos en modal o en offcanvas.
 */
// Desactivar video dentro de un modal al cerrar el modal.
function ekiline_collection_js_modal_has_video () {
  const modalVideo = document.querySelectorAll('.modal')
  if (modalVideo.length !== 0) {
    modalVideo.forEach(function (videoItem) {
      videoItem.addEventListener('hidden.bs.modal', function () {
        // if has almost one video stop all.
        const video = this.querySelectorAll('video')
        if (video.length !== 0) {
          video.forEach(function (video) {
            video.pause()
          })
        }
      })
    })
  }
}
ekiline_collection_js_modal_has_video()

// Desactivar video dentro de un offcanvas al cerrar el offcanvas.
function ekiline_collection_js_offcanvas_has_video () {
  const offcanvasVideo = document.querySelectorAll('.offcanvas')
  if (offcanvasVideo.length !== 0) {
    offcanvasVideo.forEach(function (videoItem) {
      videoItem.addEventListener('hidden.bs.offcanvas', function () {
        // if has almost one video stop all.
        const video = this.querySelectorAll('video')
        if (video.length !== 0) {
          video.forEach(function (video) {
            video.pause()
          })
        }
      })
    })
  }
}
ekiline_collection_js_offcanvas_has_video()

/**
 * Dropdown anidados en navbar.
 */
function ekiline_extend_bootstrap_init_bundle_items () {
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
  if (dropdownElementList.length !== 0) {
    dropdownElementList.forEach(dropdownToggleEl => {
      dropdownToggleEl.addEventListener('click', function (e) {
        const dropdownMenu = e.target.closest('.dropdown-menu')
        if (dropdownMenu) {
          e.stopPropagation()
        }
      })
    })
  }
}
ekiline_extend_bootstrap_init_bundle_items()

/**
 * Cerrar un menu al redimensionar la ventana.
 */
function ekiline_collection_js_close_navbar_window_resize () {
  const navbars = document.querySelectorAll('.navbar-collapse')
  if (navbars.length > 0) {
    window.addEventListener('resize', () => {
      navbars.forEach(navbar => {
        navbar.classList.remove('show')
      })
    })
  }
}
ekiline_collection_js_close_navbar_window_resize()

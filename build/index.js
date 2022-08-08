/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accordion/index.js":
/*!********************************!*\
  !*** ./src/accordion/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('path', {
  d: 'M1,1V6.04H19V1H1ZM18.1,5.14H1.9V1.9H18.1v3.24Zm-2.8,12.51l1.44-1.17-1.44-1.17v2.34Zm-14.3,1.35H19v-5.04H1v5.04Zm.9-4.14H18.1v3.24H1.9v-3.24Zm-.9-2.34H19V7.48H1v5.04Zm16.19-3.24l-1.17,1.44-1.17-1.44h2.34Zm-1.89-6.93v2.34l1.44-1.17-1.44-1.17Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import '../editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * Bloques necesarios para acordion.
 * - .accordion
 * - - .accordion-item
 * - - - .accordion-header
 * - - - - .accordion-button / [ RichText ]
 * - - - .accordion-collapse collapse / show
 * - - - - .accordion-body [bloques]
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-accordion', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show your content as an accordion.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true
  },
  attributes: {
    noStyle: {
      type: 'boolean',
      default: false // add classname .accordion-flush.

    }
  },

  /**
   * Se ocupara contexto para pasar valores.
   * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
   */
  providesContext: {
    'ekiline-accordion/anchor': 'anchor'
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-accordion-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-accordion-item'], ['ekiline-collection/ekiline-accordion-item'], ['ekiline-collection/ekiline-accordion-item']]; // Personalizar clase.

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-accordion'
    }); // Precargar nombre ID.

    if (!attributes.anchor) {
      function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      setAttributes({
        anchor: 'accordion' + getRandomArbitrary(10, 150)
      });
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear style.', 'ekiline-collection'),
      checked: attributes.noStyle,
      onChange: noStyle => setAttributes({
        noStyle
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: !attributes.noStyle ? 'accordion' : 'accordion accordion-flush'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});
/**
 * Bloque interno
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-accordion-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion item', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-accordion'],
  icon: 'menu-alt',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set tittle and content in your accordion container', 'ekiline-collection'),
  category: 'design',
  //Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-accordion/anchor'],
  supports: {
    anchor: true,
    html: false,
    reusable: false
  },
  attributes: {
    showDefault: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].

    },
    keepOpen: {
      type: 'boolean',
      default: true // remove dataset [data-bs-parent].

    },
    parentId: {
      type: 'string',
      default: '' // retrive parent Id (Anchor).

    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Item title.', 'ekiline-collection')
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Cargar un preset.

    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Item content.', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'child-item-accordion'
    }); // Precargar nombre ID en hijos.

    if (!attributes.anchor) {
      function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      setAttributes({
        anchor: 'accordionChild' + getRandomArbitrary(10, 150)
      });
    } // Precargar nombre de ID Padre en objetos internos.


    if (!attributes.parentId || attributes.parentId !== props.context['ekiline-accordion/anchor']) {
      setAttributes({
        parentId: props.context['ekiline-accordion/anchor']
      });
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Item Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show element by default.', 'ekiline-collection'),
      checked: attributes.showDefault,
      onChange: showDefault => setAttributes({
        showDefault
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toggle.', 'ekiline-collection'),
      checked: attributes.keepOpen,
      onChange: keepOpen => setAttributes({
        keepOpen
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close previously active accordion elements.', 'ekiline-collection')
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      withoutInteractiveFormatting: true,
      allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/align'] //Formatos de texto.
      ,
      tagName: "p" // The tag here is the element output and editable in the admin
      ,
      className: 'item-title',
      value: attributes.content // Any existing content, either from the database or an attribute default
      ,
      onChange: content => setAttributes({
        content
      }) // Store updated content as a block attribute
      ,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Title', 'ekiline-collection') // Display this text before any content has been added by the user

    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref2 => {
    let {
      attributes
    } = _ref2;
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'accordion-item'
    });
    const itemBlockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      headingId: !blockProps.id ? null : 'heading' + blockProps.id,
      itemId: !blockProps.id ? null : 'item' + blockProps.id,
      itemClassName: !attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("h2", {
      class: "accordion-header",
      id: itemBlockProps.headingId
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "button",
      className: 'accordion-button',
      type: "button",
      value: attributes.content,
      "data-bs-toggle": "collapse",
      "data-bs-target": itemBlockProps.itemId ? '#' + itemBlockProps.itemId : null
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      id: itemBlockProps.itemId,
      className: itemBlockProps.itemClassName,
      "data-bs-parent": attributes.keepOpen && attributes.parentId ? '#' + attributes.parentId : null
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)));
  }
});

/***/ }),

/***/ "./src/carousel-extra/index.js":
/*!*************************************!*\
  !*** ./src/carousel-extra/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRemind": () => (/* binding */ UserRemind)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Funciones personalizadas.
 * withSelect se ocupara para obtener datos del core.
 * Classname dinamica para el envoltorio del carrusel.
 */



/**
 * tutorial
 *  @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
 */




/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)('path', {
  d: 'M10.51,15.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.93,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm2.96-6.23v2.34l1.44-1.17-1.44-1.17ZM1,2.8v14.4H19V2.8H1Zm16.92,13.32H2.08V3.88h15.84v12.24Zm-9.34-1.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm-3.98-6.23l-1.44,1.17,1.44,1.17v-2.34Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
//  import './editor.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Funciones personalizadas
 */

/**
 * Crear nuevo array de categorias por ID.
 * @param {*} nombres slugs (url) de cada categoria.
 * @param {*} matriz grupo de categorias existentes.
 * @param {*} devolucion nombre de dato que buscas obtener, en este caso IDs.
 * @returns array de IDs por cada categoria.
 */

function cambiarNombrePorIds(nombres, matriz, devolucion) {
  const agrupoIds = [];
  nombres.forEach(nombre => {
    // Encontrar objeto por value
    const encontrado = matriz.find(objeto => (objeto.slug || objeto.id) === nombre);
    agrupoIds.push(encontrado);
  });
  return agrupoIds.map(itm => itm[devolucion]);
}
/** 
 * Prueba para exportar
 * nueva prueba: renderToString
 * https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#rendertostring
 * // let lacosa = renderToString(<EntriesList/>);
 * // console.log(lacosa);
 * Control personalizado: recordatorio.
 */

/**
 * Mensaje de categorias seleccionadas.
 * @param {*} addSlug incorpora la categoria en un aviso.
 * @returns HTML code with message.
 */


function UserRemind(_ref) {
  let {
    slugname
  } = _ref;

  let message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Sin selecciones. ', 'ekiline-collection');

  let classname = 'editor-modal-route';

  if (slugname.length != 0) {
    let element = slugname?.map(el => el);
    message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Selecciones: ', 'ekiline-collection') + element;
    classname = classname + ' has-anchor';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    class: classname
  }, message);
}
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-carousel-extra', {
  apiVersion: 2,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel Extra', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Add a carousel to your posts, choose between posts or images, colmuns and more.', 'ekiline-collection'),
  category: 'media',
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: ['wide', 'full']
  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    SetCatSlug: {
      type: 'array',
      default: ''
    },
    SetCatIds: {
      type: 'array',
      default: ''
    },
    SetAmount: {
      type: 'number',
      default: 3
    },
    AddControls: {
      type: 'boolean',
      default: true
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'div'
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes,
      isSelected
    } = props; // Personalizar clase.

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-carousel-extra'
    });
    /**
     * Selector de categorias.
     * @returns Custom component: FormTokenField.
     */
    //  const TokenCategoriesSelect = () => {

    function TokenCategoriesSelect() {
      // el dato.
      const categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category'), []); // console.log('hayDato? ' + attributes.SetCatSlug + ' hayDatoEnd.');
      // Recursos.

      const [selectedCategories, setSelectedCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]); // Componente.

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Find and select categories:', 'ekiline-collection'),
        value: !attributes.SetCatSlug ? selectedCategories : attributes.SetCatSlug,
        suggestions: // Solicitar por id, name, slug.
        categories?.map(el => el.slug),
        onChange: tokens => {
          // console.log('haytokens? ' + tokens + ' haytokensEnd.');
          setAttributes({
            SetCatSlug: tokens
          });
          setAttributes({
            SetCatIds: cambiarNombrePorIds(tokens, categories, 'id')
          });
          setSelectedCategories(tokens);
        }
      });
    }

    ;
    /**
     * Bloque de entradas por categoría.
     * Dato, elegir segun el postType: page/post.
     * Atributos de query:
     * per_page, categories = numero entero
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/
     * @link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
     * @link https://wordpress.stackexchange.com/questions/352323/how-to-return-a-list-of-custom-taxonomy-terms-via-the-gutenberg-getentityrecords 
     *
     * @returns Custom component: EntriesList.
     */

    function EntriesList() {
      // Categoria default: todas.
      const selCats = attributes.SetCatIds > 0 ? attributes.SetCatIds : []; // Cantidad de entradas: 3.

      const selAmount = attributes.SetAmount <= 0 ? '-1' : attributes.SetAmount;
      const posts = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getEntityRecords('postType', 'post', {
        per_page: selAmount,
        categories: selCats
      }), []);
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(PostsList, {
        posts: posts
      });
    }
    /**
     * Medios
     * @link https://wholesomecode.ltd/wpquery-wordpress-block-editor-gutenberg-equivalent-is-getentityrecords
     * @param {*} item pagina como objeto.
     * @returns HTML imagen.
     */
    // function entradaImagen( item ){


    function EntradaImagen(_ref2) {
      let {
        item
      } = _ref2;
      // Construir nuevo objeto: media.
      const media = {};
      media[item.id] = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getMedia(item.featured_media)); // Leer nuevo objeto y extraer atributos.

      if (media[item.id]) {
        // Url de medio, aún por definir mas atributos.
        let imageThumbnailSrc = media[item.id].media_details.sizes.thumbnail.source_url;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("img", {
          src: imageThumbnailSrc
        });
      }

      return null;
    }
    /**
     * Contenido con: dangerouslySetInnerHTML
     * https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
     * O reformateando el string, es para fines de muestra.
     * https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/edit.js
     */
    // function entradaExtracto(extracto){


    function EntradaExtracto(_ref3) {
      let {
        extracto
      } = _ref3;
      const document = new window.DOMParser().parseFromString(extracto, 'text/html');
      let texto = document.body.textContent || document.body.innerText || '';
      return texto;
    }

    function PostsList(_ref4) {
      let {
        posts
      } = _ref4;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null, posts?.map(post => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
        key: post.id
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("a", {
        href: post.link
      }, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__.decodeEntities)(post.title.rendered)), post.featured_media ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(EntradaImagen, {
        item: post
      }) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
        className: 'hola'
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(EntradaExtracto, {
        extracto: post.excerpt.rendered
      }), " "))));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel extra settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(TokenCategoriesSelect, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Number of items', 'ekiline-collection'),
      type: "number",
      min: "0",
      value: attributes.SetAmount,
      onChange: newval => setAttributes({
        SetAmount: parseInt(newval)
      }),
      help: 0 === attributes.SetAmount ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Danger! 0 shows all.', 'ekiline-collection') : ''
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(EntriesList, null), isSelected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(UserRemind, {
      slugname: attributes.SetCatSlug
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref5 => {
    let {
      attributes
    } = _ref5;
    // Personalizar clase.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'group-carousel-extra-front'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(UserRemind, {
      slugname: attributes.SetCatSlug
    }));
  }
});

/***/ }),

/***/ "./src/carousel/edit.js":
/*!******************************!*\
  !*** ./src/carousel/edit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

/**
 * Funciones personalizadas.
 * withSelect se ocupara para obtener datos del core.
 * Classname dinamica para el envoltorio del carrusel.
 */



const setClassName = () => {
  var rand = Math.floor(Math.random() * 100) + 1,
      name = 'ekiline-box-' + rand + '-wrapper';
  return name;
};
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */


function Edit(props) {
  const {
    attributes,
    setAttributes,
    blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  } = props;
  const boxClass = setClassName(); // Componente dinamico: categoriasss.

  const MyCategoryList = _ref => {
    let {
      categories
    } = _ref;

    if (categories) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
        multiple: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose category', 'ekiline-collection'),
        value: attributes.SetIds,
        options: categories.map(category => ({
          label: category.name,
          value: category.id
        })),
        onChange: newval => setAttributes({
          SetIds: newval
        }),
        style: {
          height: 'auto'
        }
      });
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };

  const MyCategorySelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.withSelect)(select => ({
    categories: select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1
    })
  }))(MyCategoryList);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Carousel content', 'ekiline-collection'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content type', 'ekiline-collection'),
    value: attributes.ChooseType,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Posts', 'ekiline-collection'),
      value: 'posts'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Images / Video', 'ekiline-collection'),
      value: 'images'
    }],
    onChange: ChooseType => setAttributes({
      ChooseType
    })
  }), 'posts' === attributes.ChooseType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyCategorySelect, null), 'images' === attributes.ChooseType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Carousel Images', 'ekiline-collection'),
    onSelect: media => {
      const img_ids = [];

      for (let i = 0, max = media.length; i < max; i += 1) {
        img_ids.push(media[i].id);
      }

      setAttributes({
        SetIds: img_ids
      });
    } // ref: https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md.
    ,
    allowedTypes: ['image', 'video'],
    multiple: true,
    value: attributes.SetIds,
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        isSecondary: true,
        onClick: open
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add images', 'ekiline-collection'));
    },
    gallery: false,
    addToGallery: false
  })), 'posts' === attributes.ChooseType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post amount', 'ekiline-collection'),
    type: "number",
    value: attributes.SetAmount,
    onChange: newval => setAttributes({
      SetAmount: parseInt(newval)
    })
  }), 'posts' === attributes.ChooseType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sort by', 'ekiline-collection'),
    value: attributes.SetOrderBy,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'ekiline-collection'),
      value: 'date'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modified', 'ekiline-collection'),
      value: 'modified'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'ekiline-collection'),
      value: 'title'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'ekiline-collection'),
      value: 'name'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Author', 'ekiline-collection'),
      value: 'author'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Random', 'ekiline-collection'),
      value: 'rand'
    }],
    onChange: SetOrderBy => setAttributes({
      SetOrderBy
    })
  }), 'posts' === attributes.ChooseType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Find a block in content', 'ekiline-collection'),
    value: attributes.FindBlock,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('None', 'ekiline-collection'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cover', 'ekiline-collection'),
      value: 'core/cover'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image', 'ekiline-collection'),
      value: 'core/image'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Media and text', 'ekiline-collection'),
      value: 'core/media-text'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video', 'ekiline-collection'),
      value: 'core/video'
    }],
    onChange: FindBlock => setAttributes({
      FindBlock
    })
  }), 'none' !== attributes.FindBlock && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show post if there is no block', 'ekiline-collection'),
    checked: attributes.AllowMixed,
    onChange: AllowMixed => setAttributes({
      AllowMixed
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Carousel Look', 'ekiline-collection'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns', 'ekiline-collection'),
    value: attributes.SetColumns,
    onChange: newval => setAttributes({
      SetColumns: parseInt(newval)
    }),
    min: 1,
    max: 4
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show controls', 'ekiline-collection'),
    checked: attributes.AddControls,
    onChange: AddControls => setAttributes({
      AddControls
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show indicators', 'ekiline-collection'),
    checked: attributes.AddIndicators,
    onChange: AddIndicators => setAttributes({
      AddIndicators
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Auto start', 'ekiline-collection'),
    checked: attributes.SetAuto,
    onChange: SetAuto => setAttributes({
      SetAuto
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Transition in milliseconds', 'ekiline-collection'),
    type: "number",
    value: attributes.SetTime,
    onChange: newval => setAttributes({
      SetTime: parseInt(newval)
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Animation type', 'ekiline-collection'),
    value: attributes.SetAnimation,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Default', 'ekiline-collection'),
      value: ''
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fade', 'ekiline-collection'),
      value: 'fade'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vertical', 'ekiline-collection'),
      value: 'vertical'
    }],
    onChange: SetAnimation => setAttributes({
      SetAnimation
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Height in pixels, set zero to see full display height.', 'ekiline-collection'),
    type: "number",
    value: attributes.SetHeight,
    onChange: newval => setAttributes({
      SetHeight: parseInt(newval)
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarItem, {
    as: _wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button,
    icon: "dashicons dashicons-visibility",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'ekiline-collection'),
    onClick: () => {
      ekiline_transformarCarrusel('.' + boxClass + ' .carousel-multiple');
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: boxClass
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4___default()), {
    block: "ekiline-collection/ekiline-carousel",
    attributes: props.attributes
  }))));
}

/***/ }),

/***/ "./src/carousel/index.js":
/*!*******************************!*\
  !*** ./src/carousel/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/carousel/edit.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)('path', {
  d: 'M10.51,15.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.93,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm2.96-6.23v2.34l1.44-1.17-1.44-1.17ZM1,2.8v14.4H19V2.8H1Zm16.92,13.32H2.08V3.88h15.84v12.24Zm-9.34-1.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm-3.98-6.23l-1.44,1.17,1.44,1.17v-2.34Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 */

 // import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-carousel', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Carousel', 'ekiline-collection'),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add a carousel to your posts, choose between posts or images, colmuns and more.', 'ekiline-collection'),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
   */
  category: 'media',

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: customIcon,

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: ['wide', 'full']
  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    ChooseType: {
      type: 'string',
      default: 'posts'
    },
    SetIds: {
      type: 'array',
      default: ''
    },
    SetAmount: {
      type: 'number',
      default: 3
    },
    SetOrderBy: {
      type: 'string',
      default: 'date'
    },
    SetColumns: {
      type: 'number',
      default: 1
    },
    FindBlock: {
      type: 'string',
      default: 'none'
    },
    AllowMixed: {
      type: 'boolean',
      default: false
    },
    AddControls: {
      type: 'boolean',
      default: true
    },
    AddIndicators: {
      type: 'boolean',
      default: true
    },
    SetAuto: {
      type: 'boolean',
      default: true
    },
    SetTime: {
      type: 'number',
      default: '5000'
    },
    SetAnimation: {
      type: 'string',
      default: ''
    },
    SetHeight: {
      type: 'number',
      default: '480'
    }
  },

  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
  /**
   * @see ./save.js
   */
  // save,

});

/***/ }),

/***/ "./src/collapse/index.js":
/*!*******************************!*\
  !*** ./src/collapse/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('path', {
  d: 'M15.55,11.31h-1.74v1.08h1.74v-1.08Zm-3.12,0h-1.74v1.08h1.74v-1.08ZM1,1V19H19V1H1Zm16.19,1.8l-1.17,1.44-1.17-1.44h2.34Zm.73,8.51h-.98v1.08h.98v5.53H2.08v-5.53h.97v-1.08h-.97V6.04h15.84v5.27Zm-11.74,0h-1.74v1.08h1.74v-1.08Zm3.12,0h-1.74v1.08h1.74v-1.08Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para collapse.
 * - button/a: {data-bs-toggle:collapse, href:#id} (usar filtros.)
 * - .collapse, #id
 * - ó -
 * - div:{min-height}
 * - collapse, #id
 * - div:{width:opcional}
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-collapse', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Collapse', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set a collapse behavior block. You can activate from any button.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true
  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    horizontal: {
      type: 'boolean',
      default: false // set horizontal (.collapse-horizontal).

    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // const PARENT_ALLOWED_BLOCKS = [ 'core/buttons' ];

    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your content', 'ekiline-collection')
    }]];
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-collapse'
    });
    /**
     * Control personalizado: recordatorio
     */

    function CollapseUserRemind() {
      if (attributes.anchor) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
          class: "editor-collapse-route has-anchor"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("pre", null, '#' + attributes.anchor, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')));
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
        class: "editor-collapse-route"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do not forget to add an anchor. ', 'ekiline-collection'));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Collapse Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Horizontal collapse', 'ekiline-collection'),
      checked: attributes.horizontal,
      onChange: horizontal => setAttributes({
        horizontal
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(CollapseUserRemind, null));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'collapse' + (attributes.horizontal ? ' collapse-horizontal' : ''),
      style: {
        'min-height': attributes.horizontal ? '120px' : null
      },
      contentStyle: {
        'min-width': attributes.horizontal ? '300px' : null
      }
    }); // Condicion para crear envoltorio.

    function CollapseWrapper() {
      if (attributes.horizontal) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
          style: attributes.horizontal ? blockProps.contentStyle : null
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
      } else {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null);
      }
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(CollapseWrapper, null));
  }
});
/**
 * Importar otras dependencias de WP.
 */

 // este permite crear filtros.

 // UI.

 // UI.

 // UI.
// Restringir el uso a botones.

const allowedBlocks = ['core/button', 'core/buttons'];
/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */

function addAttributesBtnCollpase(settings) {
  //Restriccion
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      addDataBtnCollapse: {
        type: 'string',
        default: ''
      }
    });
  }

  return settings;
}
/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 *
 * @return {function} Devuelve el BlockEdit modificado.
 */


const withAdvancedControlsBtnCollapse = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (allowedBlocks.includes(props.name)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Collapse anchor for execute it.', 'ekiline-collection'),
        value: props.attributes.addDataBtnCollapse,
        onChange: newData => props.setAttributes({
          addDataBtnCollapse: newData
        })
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(BlockEdit, props);
  };
}, 'withAdvancedControlsBtnCollapse');
/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */

function applyExtraClassBtnCollpase(element, block, attributes) {
  if (allowedBlocks.includes(block.name)) {
    if (attributes.addDataBtnCollapse && attributes.url) {
      return wp.element.cloneElement(element, {}, wp.element.cloneElement(element.props.children, {
        'data-bs-target': attributes.addDataBtnCollapse,
        'data-bs-toggle': 'collapse' // 'type': 'button',

      }));
    }
  }

  return element;
}

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.registerBlockType', 'ekilineCollapseBtnData/dataAttribute', addAttributesBtnCollpase);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'ekilineCollapseBtnData/dataInput', withAdvancedControlsBtnCollapse);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.getSaveElement', 'ekilineCollapseBtnData/dataModified', applyExtraClassBtnCollpase);

/***/ }),

/***/ "./src/modal/index.js":
/*!****************************!*\
  !*** ./src/modal/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);


/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)('path', {
  d: 'M15.32,5.14l.64-.64,.64,.64,.76-.76-.64-.64,.63-.63-.76-.76-.63,.63-.63-.63-.76,.76,.63,.63-.64,.64,.76,.76Zm2.78-4.14H1.9c-.5,0-.9,.4-.9,.9V18.1c0,.5,.4,.9,.9,.9H18.1c.5,0,.9-.4,.9-.9V1.9c0-.5-.4-.9-.9-.9Zm-.18,16.92H2.08v-3.36h15.84v3.36Zm0-4.44H2.08V6.52h15.84v6.97Zm0-8.05H2.08V2.08h15.84v3.36Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para modal.
 * - .modal
 * - - .modal-dialog
 * - - - .modal-content
 * - - - - .modal-header, modal-title, btn-close
 * - - - - .modal-body, [bloques]
 * - - - - .modal-footer, btn-close, [bloques]
 *
 * Variables:
 * - staticBackdrop = data-bs-backdrop="static"
 * - longcontent = .modal-dialog-scrollable
 * - centrado = modal-dialog-centered
 * - size = modal-xl, modal-lg, modal-sm, modal-fullscreen
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 *
 * Uso de Lock
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/docs/reference-guides/block-api/block-templates.md#individual-block-locking.
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/packages/block-editor/src/components/inner-blocks/README.md#templatelock
 *
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-modal', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true
  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    modalShow: {
      type: 'string',
      default: 'default' // top, right, bottom, left.

    },
    modalSize: {
      type: 'string',
      default: 'default' // small, large, extralarge, fullwindow.

    },
    modalAlign: {
      type: 'boolean',
      default: true // center.

    },
    modalBackdrop: {
      type: 'boolean',
      default: true // cerrar modal dando clic fuera.

    },
    modalKeyboard: {
      type: 'boolean',
      default: true // cerrar modal con teclado.

    },
    modalGrow: {
      type: 'boolean',
      default: false
    },
    modalTime: {
      type: 'number',
      default: 0
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-modal-header', 'ekiline-collection/ekiline-modal-body', 'ekiline-collection/ekiline-modal-footer'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-modal-header', {
      lock: {
        remove: false,
        move: true
      }
    }], ['ekiline-collection/ekiline-modal-body', {
      lock: {
        remove: false,
        move: true
      }
    }], ['ekiline-collection/ekiline-modal-footer', {
      lock: {
        remove: false,
        move: true
      }
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-modal'
    });
    /**
     * Control personalizado: recordatorio
     */

    function ModalUserRemind() {
      if (attributes.anchor) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
          class: "editor-modal-route has-anchor"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("pre", null, '#' + attributes.anchor, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')));
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
        class: "editor-modal-route"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Do not forget to add an anchor. ', 'ekiline-collection'));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Rise modal', 'ekiline-collection'),
      value: attributes.modalShow,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Default', 'ekiline-collection'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Right', 'ekiline-collection'),
        value: ' right-aside'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Bottom', 'ekiline-collection'),
        value: ' move-from-bottom'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Left', 'ekiline-collection'),
        value: ' left-aside'
      }],
      onChange: modalShow => setAttributes({
        modalShow
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Size modal', 'ekiline-collection'),
      value: attributes.modalSize,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Default', 'ekiline-collection'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Small', 'ekiline-collection'),
        value: ' modal-sm'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Large', 'ekiline-collection'),
        value: ' modal-lg'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Extra Large', 'ekiline-collection'),
        value: ' modal-xl'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Full window', 'ekiline-collection'),
        value: ' modal-fullscreen'
      }],
      onChange: modalSize => setAttributes({
        modalSize
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Center in window', 'ekiline-collection'),
      checked: attributes.modalAlign,
      onChange: modalAlign => setAttributes({
        modalAlign
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable background click to close', 'ekiline-collection'),
      checked: attributes.modalBackdrop,
      onChange: modalBackdrop => setAttributes({
        modalBackdrop
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable ESC key to close', 'ekiline-collection'),
      checked: attributes.modalKeyboard,
      onChange: modalKeyboard => setAttributes({
        modalKeyboard
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show resize modal button', 'ekiline-collection'),
      checked: attributes.modalGrow,
      onChange: modalGrow => setAttributes({
        modalGrow
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show with timer', 'ekiline-collection'),
      type: "number",
      value: attributes.modalTime,
      onChange: newval => setAttributes({
        modalTime: parseInt(newval)
      }),
      help: attributes.modalTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Run after page load "' + attributes.modalTime + '" milliseconds.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('"' + attributes.modalTime + '" do nothing.', 'ekiline-collection')
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE // templateLock="all"
      // templateLock="insert"

    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(ModalUserRemind, null));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'group-modal modal fade' + (attributes.modalShow != 'default' ? attributes.modalShow : ''),
      'data-bs-backdrop': attributes.modalBackdrop,
      'data-bs-keyboard': attributes.modalKeyboard,
      'data-ek-time': attributes.modalTime || null
    });
    const dialogProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'modal-dialog' + (attributes.modalAlign ? ' modal-dialog-centered' : '') + (attributes.modalSize != 'default' ? attributes.modalSize : '')
    }); // Componente Boton.

    function ModalGrowBtn() {
      if (attributes.modalGrow) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("button", {
          type: "button",
          class: "modal-resize btn btn-sm btn-outline-secondary",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('play btn', 'ekiline-collection')
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("span", {
          class: "dashicons dashicons-editor-expand"
        }));
      }
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": blockProps.id + 'Label',
      "aria-hidden": "true"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      class: dialogProps.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", {
      class: "modal-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(ModalGrowBtn, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null))));
  }
});
/**
 * - ekiline-modal-header
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-modal-header', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal header', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal header content. ', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/heading', 'core/paragraph']; // Cargar un preset.

    const CHILD_TEMPLATE = [['core/heading', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add modal title', 'ekiline-collection'),
      level: 4
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'editor-modal-header'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'modal-header'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("button", {
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }));
  }
});
/**
 * - ekiline-modal-body
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-modal-body', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal body content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal body content. ', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  edit: () => {
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add modal content blocks', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'editor-modal-body'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'modal-body'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * - ekiline-modal-footer
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-modal-footer', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal footer', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inner footer content. ', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/paragraph', 'core/buttons', 'core/button']; // Cargar un preset.

    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add modal footer text', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'editor-modal-footer'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'modal-footer'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * Controles auxiliares
 * @see https://mariecomet.fr/en/2021/12/14/adding-options-controls-existing-gutenberg-block/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-button/
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/
 * genera un nuevo control, general en el panel.
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit
 * genera agregar una nueva clase o atributo.
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blocklistblock
 * nuevo experimento
 * @see https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
 * nuevo, LinkControl.
 * @see https://wp-gb.com/linkcontrol/
 * prueba, como formato extra
 * @see https://developer.wordpress.org/block-editor/how-to-guides/format-api/
 * Este ejemplo trae parametros que no estan en la doc.
 * @see https://jeffreycarandang.com/how-to-create-custom-text-formats-for-gutenberg-block-editor/
 * Prueba nueva uso de Hooks.
 * hya que instalar: npm install @wordpress/hooks --save
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/
 * Prueba con otra inforamcion, es la mejor!!
 * @see https://chap.website/adding-a-custom-attribute-to-gutenberg-block/
 */

/**
 * Importar otras dependencias de WP.
 */

 // este permite crear filtros.

 // UI.

 // UI.

 // UI.
// Restringir el uso a botones.

const allowedBlocks = ['core/button', 'core/buttons'];
/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */

function addAttributesBtn(settings) {
  //Restriccion
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      addDataBtn: {
        type: 'string',
        default: ''
      },
      // Nuevo: Cerrar modal
      closeModal: {
        type: 'boolean',
        default: true
      }
    });
  }

  return settings;
}
/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 *
 * @return {function} Devuelve el BlockEdit modificado.
 */


const withAdvancedControlsBtn = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Nuevo: Cerrar modal
    const {
      attributes,
      setAttributes
    } = props;
    const {
      closeModal
    } = attributes;

    if (allowedBlocks.includes(props.name)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Modal anchor for execute it.', 'ekiline-collection'),
        value: props.attributes.addDataBtn,
        onChange: newData => props.setAttributes({
          addDataBtn: newData
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Close modal button.', 'ekiline-collection'),
        checked: !closeModal,
        onChange: () => setAttributes({
          closeModal: !closeModal
        }),
        help: !closeModal ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Yes.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No.', 'ekiline-collection')
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(BlockEdit, props);
  };
}, 'withAdvancedControlsBtn');
/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */

function applyExtraClassBtn(element, block, attributes) {
  // Nuevo: Cerrar modal, sobrescribe los atributos.
  const {
    closeModal
  } = attributes;

  if (allowedBlocks.includes(block.name)) {
    if (attributes.addDataBtn && attributes.url && closeModal) {
      return wp.element.cloneElement(element, {}, wp.element.cloneElement(element.props.children, {
        'data-bs-target': attributes.addDataBtn,
        'data-bs-toggle': 'modal' // 'type': 'button',

      }));
    }

    if (!closeModal && attributes.addDataBtn && attributes.url) {
      return wp.element.cloneElement(element, {}, wp.element.cloneElement(element.props.children, {
        'data-bs-dismiss': 'modal'
      }));
    }
  }

  return element;
}

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.registerBlockType', 'ekilineModalBtnData/dataAttribute', addAttributesBtn);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('editor.BlockEdit', 'ekilineModalBtnData/dataInput', withAdvancedControlsBtn);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.getSaveElement', 'ekilineModalBtnData/dataModified', applyExtraClassBtn);

/***/ }),

/***/ "./src/popovers/index.js":
/*!*******************************!*\
  !*** ./src/popovers/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('path', {
  d: 'M10.57,13.14l1.15-2.18h5.48c.99,0,1.8-.81,1.8-1.8V1.78c0-.99-.81-1.8-1.8-1.8H2.8c-.99,0-1.8,.81-1.8,1.8v7.38c0,.99,.81,1.8,1.8,1.8h5.48l1.15,2.18H1v4.88H19v-4.88H10.57Zm-1.33-2.68l-.3-.57H2.8c-.4,0-.72-.32-.72-.72V1.78c0-.4,.32-.72,.72-.72h14.4c.4,0,.72,.32,.72,.72v7.38c0,.4-.32,.72-.72,.72h-6.13l-.3,.57-.77,1.45-.77-1.45Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
//  import './editor.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-popovers', {
  apiVersion: 2,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add popovers to your links or buttons.', 'ekiline-collection'),
  category: 'design',

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("p", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popovers have rules added to the core buttons.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You need to create a button. And then text an anchor (#name) link.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will allow you to use the advanced options for the button.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can remove this notice, it won\'t be published in your content.', 'ekiline-collection'));
  }
  /**
   * @see ./save.js
   */
  // save,

});
/**
 * Importar otras dependencias de WP.
 */

 // este permite crear filtros.

 // UI.

 // UI.

 // UI.
// Restringir el uso a botones.

const allowedBlocks = ['core/button', 'core/buttons'];
/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */

function addAttributesLnkPopover(settings) {
  //Restriccion
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      addDataLnkPopover: {
        type: 'string',
        default: ''
      },
      addPositionLnkPopover: {
        type: 'string',
        // Posicion de texto (top,right,bottom,left,auto).
        default: 'auto'
      },
      defineTooltip: {
        type: 'boolean',
        // Posicion de texto (top,right,bottom,left,auto).
        default: false
      }
    });
  }

  return settings;
}
/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 *
 * @return {function} Devuelve el BlockEdit modificado.
 */


const withAdvancedControlsBtnCollapse = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (allowedBlocks.includes(props.name)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover text to show.', 'ekiline-collection'),
        value: props.attributes.addDataLnkPopover,
        onChange: newData => props.setAttributes({
          addDataLnkPopover: newData
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover  position', 'ekiline-collection'),
        value: props.attributes.addPositionLnkPopover,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover position', 'ekiline-collection'),
          value: 'auto'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top', 'ekiline-collection'),
          value: 'top'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'ekiline-collection'),
          value: 'right'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'ekiline-collection'),
          value: 'bottom'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'ekiline-collection'),
          value: 'left'
        }],
        onChange: addPositionLnkPopover => props.setAttributes({
          addPositionLnkPopover
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Is tooltip', 'ekiline-collection'),
        checked: props.attributes.defineTooltip,
        onChange: defineTooltip => props.setAttributes({
          defineTooltip
        })
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(BlockEdit, props);
  };
}, 'withAdvancedControlsBtnCollapse');
/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */

function applyExtraClassLnkPopover(element, block, attributes) {
  if (allowedBlocks.includes(block.name)) {
    if (attributes.addDataLnkPopover && attributes.url) {
      return wp.element.cloneElement(element, {}, wp.element.cloneElement(element.props.children, {
        'data-bs-content': attributes.addDataLnkPopover,
        'data-bs-toggle': attributes.defineTooltip ? 'tooltip' : 'popover',
        'data-bs-placement': attributes.addPositionLnkPopover,
        'title': attributes.text // 'type': 'button',

      }));
    }
  }

  return element;
}

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.registerBlockType', 'ekilineLnkPopoverData/dataAttribute', addAttributesLnkPopover);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'ekilineLnkPopoverData/dataInput', withAdvancedControlsBtnCollapse);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.getSaveElement', 'ekilineLnkPopoverData/dataModified', applyExtraClassLnkPopover);

/***/ }),

/***/ "./src/progress/index.js":
/*!*******************************!*\
  !*** ./src/progress/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);


/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)('path', {
  d: 'M12.16,5.26l-.76-.76-3.56,3.56,.76,.76,3.56-3.56Zm-2.99,.57c.28-.28,.28-.74,0-1.02s-.74-.28-1.02,0c-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.65,1.65c-.28,.28-.28,.74,0,1.02s.74,.28,1.02,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0Zm3.46,3.13H1v5.04H19v-5.04h-4.72Zm-7.16,4.14h-1.08v-3.24h1.08v3.24Zm2.47,0h-1.15v-3.24h1.15v3.24Zm3.38,0h-2.07v-3.24h2.07v3.24Zm5.13,0h-3.82v-3.24h3.82v3.24Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * Bloques necesarios:
 * - .progress + style:{height:val}
 * - - .progress-bar acumulable.
 * - - .progress-bar + bg-* + progress-bar-striped + progress-bar-animated
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-progress', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Progress', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show a bootstrap progress bar for your data.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true,
    color: {
      // Text UI control is enabled.
      background: true,
      // Disable background UI control.
      gradients: true,
      // Enable gradients UI control.
      text: false // Enable gradients UI control.

    }
  },
  attributes: {
    progHeight: {
      type: 'number',
      default: 50 // Alto de barra, 0 a 100px.

    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-progress-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-progress-item']]; // Personalizar clase.

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-progress',
      style: {
        // 22 pixeles de padding para maniobrar.
        height: attributes.progHeight + 22 + 'px'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Progress bar Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Height bar (pixels)', 'ekiline-collection'),
      type: "number",
      value: attributes.progHeight,
      onChange: newval => setAttributes({
        progHeight: parseInt(!newval || '0' === newval ? 1 : newval)
      }),
      min: "1"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      orientation: "horizontal",
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'progress',
      style: {
        height: attributes.progHeight + 'px'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * Bloque interno
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-progress-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Progress data bar', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-progress'],
  icon: 'ellipsis',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Progress data, could be multiple bars between 1 to 100.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: false,
    color: {
      // Text UI control is enabled.
      background: true,
      // Disable background UI control.
      gradients: true,
      // Enable gradients UI control.
      text: true // Enable gradients UI control.

    }
  },
  attributes: {
    progRange: {
      type: 'number',
      default: 10 // Rango o contador, 0 a 100 int.

    },
    progLabel: {
      type: 'boolean',
      default: false // Mostrar texto.

    },
    progStripes: {
      type: 'boolean',
      default: false // Mostrar rayas + progress-bar-striped.

    },
    progAnimation: {
      type: 'boolean',
      default: false // Animar rayas + progress-bar-animated.

    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Personalizar clase.

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'item-progress progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : '') // Se suple con un filtro en el editor (ver newWrapperAtts).
      // style:{
      // 	width: attributes.progRange+'%',
      // },

    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Progress bar Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Data range min 1% max 100%', 'ekiline-collection'),
      type: "number",
      value: attributes.progRange,
      onChange: newval => setAttributes({
        progRange: parseInt(!newval || '0' === newval ? 1 : newval)
      }),
      min: "1",
      max: "100"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Hide number in bar.', 'ekiline-collection'),
      checked: attributes.progLabel,
      onChange: progLabel => setAttributes({
        progLabel
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show stripes over background.', 'ekiline-collection'),
      checked: attributes.progStripes,
      onChange: progStripes => setAttributes({
        progStripes
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show animation.', 'ekiline-collection'),
      checked: attributes.progAnimation,
      onChange: progAnimation => setAttributes({
        progAnimation
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("p", null, attributes.progRange));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref2 => {
    let {
      attributes
    } = _ref2;
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : ''),
      style: {
        width: attributes.progRange + '%'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", blockProps, !attributes.progLabel ? attributes.progRange : null);
  }
});
/**
 * Modificar envoltorio de editor para ver en tiempo real los cambios.
 * @link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/
 * @link https://gist.github.com/tousignant-christopher/cd6d08c8145bb1866fd275fcb61890ca 
 * Conocer atributos.
 * console.log(props.name, props.attributes, props.attributes.progRange)
 */

 // este permite crear filtros.

 // UI.

const newWrapperAtts = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    // Aplicar solo a bloque item progress.
    if (props.name === 'ekiline-collection/ekiline-progress-item') {
      // Hook para maniobrar (wrapperProps).
      const wrapperProps = { ...props.wrapperProps,
        style: {
          width: props.attributes.progRange + '%'
        }
      };
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        // className={ 'myfix-' + props.clientId }
        wrapperProps: wrapperProps
      }));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.createElement)(BlockListBlock, props);
  };
}, 'newWrapperAtts');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('editor.BlockListBlock', 'ekiline-collection/ekiline-progress-item', newWrapperAtts);

/***/ }),

/***/ "./src/tabs/index.js":
/*!***************************!*\
  !*** ./src/tabs/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('path', {
  d: 'M10,1H1V19H19V1H10Zm-3.33,1.8l-1.17,1.44-1.17-1.44h2.34Zm11.25,15.12H2.08V6.04h15.84v11.88Zm0-13.23h-7.92V2.08h7.92v2.61Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para tabs.
 * .tabs-wrapper
 * - .tabs-navbar
 * - - .tab-link
 * - .tabs-container
 * - - .tab-content
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-tabs', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tabs', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add a tabs for your posts, full control.', 'ekiline-collection'),
  category: 'design',
  supports: {
    inserter: true,
    anchor: true,
    align: ['wide', 'full'],
    html: false,
    color: {
      background: true
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-tabs-navbar', 'ekiline-collection/ekiline-tabs-container'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-tabs-navbar', {
      className: 'is-style-nav-tabs'
    }], ['ekiline-collection/ekiline-tabs-container']]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-wrapper'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tabs-wrapper'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});
/**
 * tabs-navbar
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-tabs-navbar', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tabs Nav Bar', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs'],
  icon: 'editor-kitchensink',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab navigation, add your links.', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: false
  },
  // Register block styles.
  styles: [{
    name: 'nav-tabs',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tabs'),
    className: 'nav-tabs',
    isDefault: true
  }, {
    name: 'nav-pills',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pills'),
    className: 'nav-pills'
  }],
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-tab-link'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab link 1', 'ekiline-collection'),
      className: 'active'
    }], ['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab link 2', 'ekiline-collection')
    }]];
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-navbar'
    }); // Nueva clase de apoyo, reemplazar para ocupar bootstrap.

    if (attributes.className) {
      function addnewClassName(clase) {
        if (clase.includes('is-style-nav-tabs')) {
          if (clase.includes('nav-pills')) {
            clase = clase.replaceAll('nav-pills', '');
          }

          clase = clase.replace('is-style-nav-tabs', 'nav-tabs');
        }

        if (clase.includes('is-style-nav-pills')) {
          if (clase.includes('nav-tabs')) {
            clase = clase.replaceAll('nav-tabs', '');
          }

          clase = clase.replace('is-style-nav-pills', 'nav-pills');
        }

        return clase;
      }

      setAttributes({
        className: addnewClassName(attributes.className)
      });
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      orientation: "horizontal",
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'nav'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});
/**
 * - - tab-link
 * p1) Requiere RichText
 * p2) Requiere Registrar un nuevo formato para insertar un boton.
 */


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-tab-link', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab Link', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs-navbar'],
  icon: 'button',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab button link. Copy Anchor text and paste on Tab Content Anchor field.', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    // inserter: false,
    color: {
      background: true
    }
  },
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab link', 'ekiline-collection')
    },
    dataBsTarget: {
      type: 'string',
      default: '' // id from title.

    }
  },
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tab-link'
    }); // limpiar tambien caracteres especiales. anchor + replace/lowercase.
    // https://ricardometring.com/javascript-replace-special-characters

    const replaceSpecialChars = str => {
      return str.normalize('NFD').replace(/(<([^>]+)>)/gi, "") // Eliminar HTML
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
      .replace(/\-\-+/g, '-') // Replaces multiple hyphens by one hyphen
      .replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
      .toLowerCase(); // convierte a minusculas
    };

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab Link Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Copy this value in a Content Tab HTML anchor field.', 'ekiline-collection'),
      type: "string",
      value: attributes.dataBsTarget = replaceSpecialChars(attributes.content),
      onChange: dataBsTarget => setAttributes({
        dataBsTarget
      }),
      readOnly: true
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      withoutInteractiveFormatting: true,
      allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/align', 'ekiline-format/find-anchor'] //un formato nuevo para TAB.
      ,
      tagName: "p" // The tag here is the element output and editable in the admin
      ,
      className: blockProps.className,
      value: attributes.content // Any existing content, either from the database or an attribute default
      ,
      onChange: content => setAttributes({
        content
      }) // Store updated content as a block attribute
      // placeholder={ __( 'Titlulo de tab...' ) } // Display this text before any content has been added by the user

    }));
  },
  save: _ref => {
    let {
      attributes
    } = _ref;
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tab-link nav-link',
      anchorData: '#' + attributes.dataBsTarget
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "button",
      className: blockProps.className,
      value: attributes.content,
      "data-bs-toggle": "pill",
      "data-bs-target": blockProps.anchorData,
      type: "button"
    });
  }
});
/**
 * P2) Boton auxiliar:
 * Declaro un estilo y lo ocupo como control para acceder a una funcion.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/format-api/
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/introducing-attributes-and-editable-fields/
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/format-api/3-apply-format/
 */




 // Boton.

const findAnchorButton = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichTextToolbarButton, {
    icon: "code-standards",
    title: "Find anchor",
    onClick: () => {
      // console.log( props.value.text );
      // limpiar tambien caracteres especiales. anchor + replace/lowercase.
      const replaceSpecialChars = str => {
        return str.normalize('NFD').replace(/(<([^>]+)>)/gi, "") // Eliminar HTML
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
        .replace(/\-\-+/g, '-') // Replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
        .toLowerCase(); // convierte a minusculas
      };

      const linkToTab = replaceSpecialChars(props.value.text);
      alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab-Content Anchor: ' + linkToTab, 'ekiline-collection'));
    }
  });
}; // Condicion.


const ConditionalButton = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.compose)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.withSelect)(function (select) {
  return {
    selectedBlock: select('core/block-editor').getSelectedBlock()
  };
}), (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.ifCondition)(function (props) {
  return (// props.selectedBlock && props.selectedBlock.name === 'core/paragraph'
    props.selectedBlock && props.selectedBlock.name === 'ekiline-collection/ekiline-tab-link'
  );
}))(findAnchorButton); // Formato a registrar.

(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_6__.registerFormatType)('ekiline-format/find-anchor', {
  title: 'Find anchor',
  tagName: 'findanchor',
  className: null,
  edit: ConditionalButton
});
/**
 * - tabs-container
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-tabs-container', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tabs container', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs'],
  icon: 'editor-kitchensink',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('All tabs add here.', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: false
  },
  edit: () => {
    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-tab-content'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-tab-content', {
      className: 'active show',
      anchor: 'tab-link-1'
    }], ['ekiline-collection/ekiline-tab-content', {
      anchor: 'tab-link-2'
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-container'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tabs-container tab-content'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});
/**
 * - - tab-content
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-tab-content', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab Content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs-container'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inner tab content. Find Tab Link anchor text, and paste on Anchor field.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true,
    html: false,
    reusable: false // multiple: false,
    // inserter: false,

  },
  edit: () => {
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your content and blocks, then copy anchor name to tab content block', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tab-content'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tab-content tab-pane fade'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});

/***/ }),

/***/ "./src/toast/index.js":
/*!****************************!*\
  !*** ./src/toast/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */


const customIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('svg', {
  width: 20,
  height: 20
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)('path', {
  d: 'M5.35,3.63l-2.03,.3,.84,5.66,2.03-.3-.84-5.66Zm.73,6.69c-.48-.36-1.16-.26-1.51,.22s-.26,1.16,.22,1.51c.48,.36,1.16,.26,1.51-.22s.26-1.16-.22-1.51Zm12.93-1.1h-5.4V1H1V19H13.6v-2.22h5.4v-7.56Zm-6.48,8.7H2.08V2.08H12.52v7.14h-2.88c-.99,0-1.8,.81-1.8,1.8v3.96c0,.99,.81,1.8,1.8,1.8h2.88v1.14Zm-2.88-2.22c-.4,0-.72-.32-.72-.72v-3.96c0-.4,.32-.72,.72-.72h8.28v5.4H9.64Zm7.86-4.37l-.76-.76-.63,.63-.63-.63-.76,.76,.63,.63-.64,.64,.76,.76,.64-.64,.64,.64,.76-.76-.64-.64,.63-.63Z'
}));
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-toast', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toast', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show small bootstrap-style notices.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true,
    html: false
  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    toastPosition: {
      type: 'string',
      default: ' bottom-0 end-0'
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-toast'
    }); // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-toast-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-toast-item', {
      lock: {
        remove: false,
        move: true
      }
    }]];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toast group options', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display position', 'ekiline-collection'),
      value: attributes.toastPosition,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom right', 'ekiline-collection'),
        value: ' bottom-0 end-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom left', 'ekiline-collection'),
        value: ' bottom-0 start-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top right', 'ekiline-collection'),
        value: ' top-0 end-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top left', 'ekiline-collection'),
        value: ' top-0 start-0'
      }],
      onChange: toastPosition => setAttributes({
        toastPosition
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
  }
});
/**
 * Toast Item.
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-toast-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ekiline toast item.', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-toast'],
  icon: 'lightbulb',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Each toast can be executed by time, at the end of scrolling, or with the cursor outside the window. You can stack as many as you need.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true,
    html: false,
    multiple: false,
    reusable: true // inserter: false,

  },

  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    toastTime: {
      type: 'number',
      default: 0
    },
    toastScroll: {
      type: 'boolean',
      default: false
    }
  },

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'toast-item'
    }); // Cargar un preset.

    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add toast content.', 'ekiline-modal')
    }]];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toast Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run by time', 'ekiline-collection'),
      type: "number",
      value: attributes.toastTime,
      onChange: newval => setAttributes({
        toastTime: parseInt(newval)
      }),
      help: attributes.toastTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run after page load "' + attributes.toastTime + '" milliseconds.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('"' + attributes.toastTime + '" run immediately on page load.', 'ekiline-collection')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run at end of page scroll.', 'ekiline-collection'),
      checked: attributes.toastScroll,
      onChange: toastScroll => setAttributes({
        toastScroll
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      tagName: "p",
      value: attributes.content,
      allowedFormats: ['core/bold', 'core/italic'],
      onChange: content => setAttributes({
        content
      }),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add toast title', 'ekiline-collection'),
      className: 'item-title'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref2 => {
    let {
      attributes
    } = _ref2;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'toast-item toast' + (attributes.toastScroll ? ' launch-scroll hide' : '') + (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
      'data-ek-launch-time': attributes.toastTime || null
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      class: "toast-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("p", {
      class: "me-auto my-0"
    }, attributes.content), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "toast",
      "aria-label": "Close"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      class: "toast-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)));
  }
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/html-entities":
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
/***/ ((module) => {

module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["richText"];

/***/ }),

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ ((module) => {

module.exports = window["wp"]["serverSideRender"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _accordion_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordion/index */ "./src/accordion/index.js");
/* harmony import */ var _collapse_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapse/index */ "./src/collapse/index.js");
/* harmony import */ var _popovers_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popovers/index */ "./src/popovers/index.js");
/* harmony import */ var _progress_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./progress/index */ "./src/progress/index.js");
/* harmony import */ var _toast_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast/index */ "./src/toast/index.js");
/* harmony import */ var _tabs_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs/index */ "./src/tabs/index.js");
/* harmony import */ var _modal_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal/index */ "./src/modal/index.js");
/* harmony import */ var _carousel_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./carousel/index */ "./src/carousel/index.js");
/* harmony import */ var _carousel_extra_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./carousel-extra/index */ "./src/carousel-extra/index.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_10__);
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */
// import './collection/index';










/**
 * Incorporar bloques a coleccion.
 */


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_10__.registerBlockCollection)('ekiline-collection', {
  title: 'Ekiline Collection' // icon: customIcon,

});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
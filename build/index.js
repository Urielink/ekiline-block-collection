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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
    html: false,
    // no permitir HTML
    anchor: true // id personalizado.
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
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-accordion-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-accordion-item'], ['ekiline-collection/ekiline-accordion-item'], ['ekiline-collection/ekiline-accordion-item']];

    // Personalizar clase en editor.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-accordion'
    });

    // Precargar nombre ID (anchor).
    if (!attributes.anchor) {
      setAttributes({
        anchor: 'accordion' + getRandomArbitrary(10, 150)
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Settings', 'ekiline-collection'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use bootstrap default style.', 'ekiline-collection'),
            checked: attributes.noStyle,
            onChange: noStyle => setAttributes({
              noStyle
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: !attributes.noStyle ? 'accordion accordion-flush' : 'accordion'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/**
 * Bloque interno accordion-item
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-accordion-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion item', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-accordion'],
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set tittle and content in your accordion container', 'ekiline-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-accordion/anchor'],
  supports: {
    html: false,
    // no permitir HTML
    reusable: false
  },
  attributes: {
    showDefault: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].
    },
    keepOpen: {
      type: 'boolean',
      default: false // remove dataset [data-bs-parent].
    },
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'button',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Item title.', 'ekiline-collection')
    }
  },
  /**
  * Se ocupara contexto para pasar valores.
  * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
  */
  providesContext: {
    'ekiline-accordion-item/showDefault': 'showDefault',
    'ekiline-accordion-item/keepOpen': 'keepOpen',
    'ekiline-accordion-item/itemTarget': 'itemTarget'
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

    // Cargar un preset.
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-accordion-item-header'], ['ekiline-collection/ekiline-accordion-item-body']];

    // personalizar clase en editor.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'child-item-accordion'
    });

    // Precargar nombre ID en hijos.
    if (!attributes.itemTarget) {
      setAttributes({
        itemTarget: props.context['ekiline-accordion/anchor'] + 'item' + getRandomArbitrary(10, 150)
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Item Params', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show element by default.', 'ekiline-collection'),
            checked: attributes.showDefault,
            onChange: showDefault => setAttributes({
              showDefault
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toggle.', 'ekiline-collection'),
            checked: attributes.keepOpen,
            onChange: keepOpen => setAttributes({
              keepOpen
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close previously active accordion elements.', 'ekiline-collection')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'accordion-item'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/**
 * Bloque interno accordion-item-header
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-accordion-item-header', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion item header', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-accordion-item'],
  icon: 'button',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set tittle and content in your accordion container', 'ekiline-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-accordion-item/anchor', 'ekiline-accordion-item/itemTarget'],
  supports: {
    html: false,
    // no permitir HTML
    reusable: false,
    inserter: false,
    color: {
      gradients: true // Enables the gradients UI control.
    }
  },
  attributes: {
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
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
    } = props;

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'child-item-accordion-header'
    });

    // Precargar nombre ID en hijos.
    if (!attributes.itemTarget) {
      setAttributes({
        itemTarget: props.context['ekiline-accordion-item/itemTarget']
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        withoutInteractiveFormatting: true,
        allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/align'] // Formatos de texto.
        ,
        tagName: "p" // The tag here is the element output and editable in the admin
        ,
        className: "item-title-header",
        value: attributes.content // Any existing content, either from the database or an attribute default
        ,
        onChange: content => setAttributes({
          content
        }) // Store updated content as a block attribute
        ,
        placeholder: attributes.default
      })
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'accordion-header'
    });
    // Adecuar clases para boton.
    const buttonClasses = blockProps.className.replace('wp-block-ekiline-collection-ekiline-accordion-item-header accordion-header', '');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
        tagName: "button",
        className: 'accordion-button' + buttonClasses,
        type: "button",
        value: attributes.content,
        "data-bs-toggle": "collapse",
        "data-bs-target": attributes.itemTarget ? '#' + attributes.itemTarget : null,
        style: blockProps.style ? blockProps.style : null
      })
    });
  }
});

/**
 * Bloque interno accordion-item-body
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-accordion-item-body', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion item body', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-accordion-item'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set tittle and content in your accordion container', 'ekiline-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-accordion/anchor', 'ekiline-accordion-item/showDefault', 'ekiline-accordion-item/keepOpen', 'ekiline-accordion-item/itemTarget'],
  supports: {
    anchor: true,
    html: false,
    // no permitir HTML
    reusable: false,
    inserter: false,
    color: {
      gradients: true // Enables the gradients UI control.
    }
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
    itemParent: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
    },
    itemTarget: {
      type: 'string',
      default: '' // remove dataset [data-bs-parent].
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
    } = props;

    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Item content.', 'ekiline-collection')
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'child-item-accordion-body'
    });

    // Precargar nombre ID en hijos y valores heredados de contexto.
    if (!attributes.itemParent) {
      setAttributes({
        itemParent: props.context['ekiline-accordion/anchor']
      });
    }

    // Actualizar estado showDefault.
    setAttributes({
      showDefault: props.context['ekiline-accordion-item/showDefault']
    });
    // Actualizar estado keepOpen.
    setAttributes({
      keepOpen: props.context['ekiline-accordion-item/keepOpen']
    });
    if (!attributes.anchor) {
      setAttributes({
        anchor: props.context['ekiline-accordion-item/itemTarget']
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: !attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show',
      'data-bs-parent': attributes.keepOpen && attributes.itemParent ? '#' + attributes.itemParent : null
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "accordion-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
      })
    });
  }
});

/**
 * Función auxiliar.
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/***/ }),

/***/ "./src/carousel-blocks/index.js":
/*!**************************************!*\
  !*** ./src/carousel-blocks/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
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
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para carousel.
 * .carousel
 * - .carousel-inner
 * - - .carousel-item
 * - .controls
 * - .inidicators
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-carousel-blocks', {
  /**
  * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
  */
  apiVersion: 2,
  /**
  * Parametros de alta.
  * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
  */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Carousel Blocks', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Customize the carousel slide by slide, with existing blocks, full control.', 'ekiline-collection'),
  category: 'media',
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
  * Argumentos para personalizacion.
  */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    CountChildren: {
      type: 'number',
      default: ''
    },
    // Controles de carrusel.
    SetColumns: {
      type: 'number',
      default: 1
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
  * Se ocupara contexto para pasar valores.
  * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
  */
  providesContext: {
    'ekiline-carousel-blocks/height': 'SetHeight'
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
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-carousel-blocks-content'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-carousel-blocks-content', {
      className: 'carousel-item active'
    }], ['ekiline-collection/ekiline-carousel-blocks-content', {
      className: 'carousel-item'
    }]];

    // Personalizar clase.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'carousel-wrapper'
    });

    // Precargar nombre ID.
    if (!attributes.anchor) {
      function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
      setAttributes({
        anchor: 'carouselblocks' + getRandomArbitrary(10, 150)
      });
    }

    // Obtener el indice de los bloques agregados.
    const {
      clientId
    } = props;
    const innerBlockCount = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/block-editor').getBlock(clientId).innerBlocks);
    setAttributes({
      CountChildren: innerBlockCount.length
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Carousel Look', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Columns', 'ekiline-collection'),
            value: attributes.SetColumns,
            onChange: newval => setAttributes({
              SetColumns: parseInt(newval)
            }),
            min: 1,
            max: 4
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show controls', 'ekiline-collection'),
            checked: attributes.AddControls,
            onChange: AddControls => setAttributes({
              AddControls
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show indicators', 'ekiline-collection'),
            checked: attributes.AddIndicators,
            onChange: AddIndicators => setAttributes({
              AddIndicators
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Auto start', 'ekiline-collection'),
            checked: attributes.SetAuto,
            onChange: SetAuto => setAttributes({
              SetAuto
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Transition in milliseconds', 'ekiline-collection'),
            type: "number",
            value: attributes.SetTime,
            onChange: newval => setAttributes({
              SetTime: parseInt(newval)
            }),
            min: 0
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Animation type', 'ekiline-collection'),
            value: attributes.SetAnimation,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Fade', 'ekiline-collection'),
              value: 'fade'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Vertical', 'ekiline-collection'),
              value: 'vertical'
            }],
            onChange: SetAnimation => setAttributes({
              SetAnimation
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Height in pixels.', 'ekiline-collection'),
            type: "number",
            value: attributes.SetHeight,
            onChange: newval => setAttributes({
              SetHeight: parseInt(newval)
            }),
            min: 0,
            help: attributes.SetHeight === 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Zero sets carousel at full display height.', 'ekiline-collection') : ''
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Al inicio del componente, todas las variables.
    const carId = `#${attributes.anchor}`;
    const carCol = attributes.SetColumns > 1 ? ' carousel-multiple x' + attributes.SetColumns : '';
    const carAni = attributes.SetAnimation ? ' carousel-' + attributes.SetAnimation : '';
    const carStr = attributes.SetAuto ? 'carousel' : null;
    // Reglas CSS inline.
    const min_height = {
      height: attributes.SetHeight !== 0 ? attributes.SetHeight + 'px' : '100vh'
    };

    // personalizar attributos.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'carousel-wrapper carousel slide' + carCol + carAni,
      'data-bs-ride': carStr,
      'data-bs-Interval': attributes.SetTime,
      style: min_height
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      ...blockProps,
      children: [attributes.AddIndicators && attributes.CountChildren && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "carousel-indicators",
        children: Array.from({
          length: attributes.CountChildren
        }).map((_, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
          type: "button",
          "data-bs-target": carId,
          "data-bs-slide-to": i,
          className: i === 0 ? 'active' : null,
          "aria-current": i === 0 ? 'true' : null,
          "aria-label": `Slide ${i + 1}`
        }, i))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "carousel-inner",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
      }), attributes.AddControls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
          class: "carousel-control-prev",
          type: "button",
          "data-bs-target": carId,
          "data-bs-slide": "prev",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            class: "carousel-control-prev-icon",
            "aria-hidden": "true"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            class: "visually-hidden",
            children: "Previous"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
          class: "carousel-control-next",
          type: "button",
          "data-bs-target": carId,
          "data-bs-slide": "next",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            class: "carousel-control-next-icon",
            "aria-hidden": "true"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            class: "visually-hidden",
            children: "Next"
          })]
        })]
      })]
    });
  }
});

/**
 * - - carousel-blocks-content
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-carousel-blocks-content', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Carousel Content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-carousel-blocks'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inner carousel content.', 'ekiline-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-carousel-blocks/height'],
  supports: {
    anchor: true,
    html: false,
    reusable: false,
    color: {
      background: true
    }
  },
  attributes: {
    parentHeight: {
      type: 'number',
      default: '480'
    }
  },
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;

    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add your blocks', 'ekiline-collection')
    }]];

    // Precargar altura Padre en objetos internos.
    if (!attributes.parentHeight || attributes.parentHeight !== props.context['ekiline-carousel-blocks/height']) {
      setAttributes({
        parentHeight: props.context['ekiline-carousel-blocks/height']
      });
    }

    // personalizar atributos.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'carousel-content'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })
    });
  },
  save: ({
    attributes
  }) => {
    // Reglas CSS inline.
    const min_height = {
      height: attributes.parentHeight !== 0 ? attributes.parentHeight + 'px' : '100vh'
    };

    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'carousel-content carousel-item',
      style: min_height
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
/* harmony export */   CarosuelMarkupHtml: () => (/* binding */ CarosuelMarkupHtml),
/* harmony export */   UserRemind: () => (/* binding */ UserRemind)
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Componente MediaUpload inicializacion.
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md
 */
// import { addFilter } from '@wordpress/hooks';
// const replaceMediaUpload = () => MediaUpload;
// addFilter(
// 	'editor.MediaUpload',
// 	'core/edit-post/components/media-upload/replace-media-upload',
// 	replaceMediaUpload
// );

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
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-carousel-extra', {
  apiVersion: 2,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel basic', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Add a non dynamic carousel to your posts, choose between posts or images.', 'ekiline-collection'),
  category: 'media',
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: ['wide', 'full'],
    anchor: true
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
      default: []
    },
    SetCatIds: {
      type: 'array',
      default: []
    },
    SetAmount: {
      type: 'number',
      default: 3
    },
    SavePosts: {
      type: 'array',
      default: []
    },
    // Opciones de posts.
    ChooseType: {
      type: 'string',
      default: 'posts'
    },
    ShowPostsBy: {
      type: 'string',
      default: 'date'
    },
    SortPosts: {
      type: 'string',
      default: 'desc'
    },
    // Opciones de imagen.
    SaveImages: {
      type: 'array',
      default: []
    },
    // Controles de carrusel.
    SetColumns: {
      type: 'number',
      default: 1
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
    },
    ShowCaption: {
      type: 'boolean',
      default: true
    },
    SetLinks: {
      type: 'boolean',
      default: false
    },
    AddIndicatorsText: {
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
      setAttributes,
      isSelected
    } = props;
    // Personalizar clase.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-carousel-extra'
    });

    /**
     * Selector de categorias, maneja la informacion que se guarda en el bloque.
     * @param {*} attributes Accede a los registros en el bloque.
     * @param {*} setAttributes Actualiza los registros en el bloque.
     * @returns Custom component: FormTokenField.
     */
    const TokenCategoriesSelect = () => {
      // Array de categorias existentes.
      // 230123 Fix, mostrar todas las categorias.
      const categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category', {
        per_page: -1
      }), []);
      // Actualizacion de categorias seleccionadas.
      const [selectedCategories, setSelectedCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
      // Componente, necesita de cambiarNombrePorIds.
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Find and select categories:', 'ekiline-collection'),
        value: !attributes.SetCatSlug ? selectedCategories : attributes.SetCatSlug
        // Mostrar sugerencias por nombre de url. (id, name, slug).
        ,
        suggestions: categories?.map(el => el.slug)
        // Varias operaciones: mostrar categorias seleccionadas, actualizar/guardar datos.
        ,
        onChange: tokens => {
          setSelectedCategories(tokens);
          setAttributes({
            SetCatSlug: tokens,
            SetCatIds: cambiarNombrePorIds(tokens, categories, 'id'),
            SavePosts: []
          });
        }
      });
    };

    /**
     * Bloque principal de entradas por categoría.
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
    function EntriesList({
      attributes
    }) {
      // Categoria default: todas.
      const setCats = attributes.SetCatIds > 0 ? attributes.SetCatIds : [];
      // Cantidad de entradas: 3.
      const setAmount = attributes.SetAmount <= 0 ? '-1' : attributes.SetAmount;
      // Orden: Ascendente.
      const queryPosts = {
        categories: setCats,
        per_page: setAmount,
        orderby: attributes.ShowPostsBy,
        order: attributes.SortPosts
      };
      const posts = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getEntityRecords('postType', 'post', queryPosts), []);

      /**
       * Hay una cuestion con el computo.
       * Si ocupas el editor muy rapido, no permites que concluya la organizacion del array.
       * Esto genera un error. Por ello esta solucion provisional podria ser necesaria.
       * Nota: queda pendiente averiguar como restablecer el bloque cuando falle.
       */
      // Orden invertido a posts.
      // if (sort === 'asc'){
      // 	posts?.reverse();
      // }

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(PostsList, {
        posts: posts
      });
    }
    function PostsList({
      posts
    }) {
      /**
       * Nota: Revisar estados, para confirmar que existe un cambio en la informacion.
       * Si eran los estados, repercuten en los arrays.
       */
      const postsStored = attributes.SavePosts;

      // Reducir array de posts.
      // Condicion, si el arreglo existe, es mayor a cero y es igual en extension.
      if (posts !== null && posts?.length > 0 && posts?.length === posts?.length) {
        // No requiero todos los valores solo 5.
        const nuevoArray = filtrarEntriesList(posts);
        // Guardar array en propiedades de bloque.
        const savethis = newval => setAttributes({
          SavePosts: newval
        });
        // Si no hay dato en el bloque o si no tienen la misma extension el dato guardado con el nuevo array.
        if (!postsStored || !postsStored?.length > 0 || nuevoArray?.length != postsStored?.length) {
          savethis(nuevoArray);
        }
      }
      if (!postsStored) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {});
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(CarosuelMarkupHtml, {
        attributes: attributes,
        postsStored: postsStored
      });
    }

    /**
     * Callback para los medios.
     * @param {*} media arreglo de imagenes.
     */

    const onSelectMedia = media => {
      const theImagesArray = media?.map(media => (
      // console.log(media)
      {
        post_id: media.id,
        post_permalink: media.link,
        post_title: media.caption,
        post_excerpt: media.alt,
        post_thumbnail_url: media.url,
        post_thumbnail_alt: media.alt
      }));
      setAttributes({
        SaveImages: theImagesArray
      });
    };
    // console.log(attributes.SaveImages);

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel content', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Content type', 'ekiline-collection'),
            value: attributes.ChooseType,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Posts', 'ekiline-collection'),
              value: 'posts'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Images', 'ekiline-collection'),
              value: 'images'
            }],
            onChange: ChooseType => {
              setAttributes({
                ChooseType,
                SavePosts: [],
                SaveImages: []
              });
            }
          }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TokenCategoriesSelect, {}), 'images' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel Images', 'ekiline-collection'),
              onSelect: media => onSelectMedia(media),
              allowedTypes: ['image', 'video'],
              multiple: true,
              value: attributes.SaveImages?.map(item => item.post_id),
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                variant: "secondary",
                onClick: open,
                children: attributes.SaveImages.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Manage images', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Add images', 'ekiline-collection')
              }),
              gallery: true,
              addToGallery: true
            })
          }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Show posts by', 'ekiline-collection'),
            value: attributes.ShowPostsBy,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Date', 'ekiline-collection'),
              value: 'date'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Title', 'ekiline-collection'),
              value: 'title'
            }],
            onChange: ShowPostsBy => {
              setAttributes({
                ShowPostsBy,
                SavePosts: []
              });
            }
          }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Items to show', 'ekiline-collection'),
            type: "number",
            min: "0",
            value: attributes.SetAmount,
            onChange: newval => {
              setAttributes({
                SetAmount: parseInt(newval),
                SavePosts: []
              });
            },
            help: 0 === attributes.SetAmount ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Danger! 0 shows all.', 'ekiline-collection') : ''
          }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Sort items', 'ekiline-collection'),
            value: attributes.SortPosts,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Descend', 'ekiline-collection'),
              value: 'desc'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Ascend', 'ekiline-collection'),
              value: 'asc'
            }],
            onChange: SortPosts => {
              setAttributes({
                SortPosts,
                SavePosts: []
              });
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Carousel Look', 'ekiline-collection'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Columns', 'ekiline-collection'),
            value: attributes.SetColumns,
            onChange: newval => setAttributes({
              SetColumns: parseInt(newval)
            }),
            min: 1,
            max: 4
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Show controls', 'ekiline-collection'),
            checked: attributes.AddControls,
            onChange: AddControls => setAttributes({
              AddControls
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Show indicators', 'ekiline-collection'),
            checked: attributes.AddIndicators,
            onChange: AddIndicators => setAttributes({
              AddIndicators
            })
          }), attributes.SetColumns === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Show text indicators', 'ekiline-collection'),
            checked: attributes.AddIndicatorsText,
            onChange: AddIndicatorsText => setAttributes({
              AddIndicatorsText
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Auto start', 'ekiline-collection'),
            checked: attributes.SetAuto,
            onChange: SetAuto => setAttributes({
              SetAuto
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Show caption', 'ekiline-collection'),
            checked: attributes.ShowCaption,
            onChange: ShowCaption => setAttributes({
              ShowCaption
            })
          }), attributes.ShowCaption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Link titles', 'ekiline-collection'),
            checked: attributes.SetLinks,
            onChange: SetLinks => setAttributes({
              SetLinks
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Transition in milliseconds', 'ekiline-collection'),
            type: "number",
            value: attributes.SetTime,
            onChange: newval => setAttributes({
              SetTime: parseInt(newval)
            }),
            min: 0
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Animation type', 'ekiline-collection'),
            value: attributes.SetAnimation,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade', 'ekiline-collection'),
              value: 'fade'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Vertical', 'ekiline-collection'),
              value: 'vertical'
            }],
            onChange: SetAnimation => setAttributes({
              SetAnimation
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Height in pixels.', 'ekiline-collection'),
            type: "number",
            value: attributes.SetHeight,
            onChange: newval => setAttributes({
              SetHeight: parseInt(newval)
            }),
            min: 0,
            help: 0 === attributes.SetHeight ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Zero sets carousel at full display height.', 'ekiline-collection') : ''
          })]
        })]
      }), 'posts' === attributes.ChooseType && attributes.SavePosts && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EntriesList, {
        attributes: attributes
      }), 'posts' === attributes.ChooseType && isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(UserRemind, {
        slugname: attributes.SetCatSlug
      }), 'images' === attributes.ChooseType && attributes.SaveImages && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(CarosuelMarkupHtml, {
        attributes: attributes,
        postsStored: attributes.SaveImages
      })]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    // Personalizar clase.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'group-carousel-extra-front'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: ['posts' === attributes.ChooseType && attributes.SavePosts && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(CarosuelMarkupHtml, {
        attributes: attributes,
        postsStored: attributes.SavePosts
      }), 'images' === attributes.ChooseType && attributes.SaveImages && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(CarosuelMarkupHtml, {
        attributes: attributes,
        postsStored: attributes.SaveImages
      })]
    });
  }
});

/**
 * Mis funciones y componentes.
 */

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
function UserRemind({
  slugname
}) {
  let message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('No category selected. ', 'ekiline-collection');
  let classname = 'editor-modal-route';
  if (slugname.length != 0) {
    let element = slugname?.map(el => el);
    message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Selected categories: ', 'ekiline-collection') + element;
    classname = classname + ' has-anchor';
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    class: classname,
    children: message
  });
}

/**
 * Transformo una cadena id por nombre.
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
 * Filtrar los resultados para crear un arreglo con lo neceesario.
 * @param {*} posts Arreglo, selección de informacion.
 * @returns thePostsArray nuevo arreglo con la informacion procesada.
 */
function filtrarEntriesList(posts) {
  const thePostsArray = posts?.map(post => ({
    post_id: post.id,
    post_permalink: post.link,
    post_title: post.title.rendered,
    post_excerpt: datoEntradaExtracto(post.excerpt.rendered),
    post_thumbnail_url: post.featured_media ? datoEntradaImagen(post.featured_media, 'url') : 0,
    post_thumbnail_alt: post.featured_media ? datoEntradaImagen(post.featured_media, 'alt') : 0
  }));
  return thePostsArray;
}

/**
 * Medios
 * @link https://wholesomecode.ltd/wpquery-wordpress-block-editor-gutenberg-equivalent-is-getentityrecords
 * @param {*} item pagina como objeto.
 * @returns HTML imagen.
 */
function datoEntradaImagen(item, src) {
  if (!item || !src) return null;
  // Construir nuevo objeto: media.
  let media = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getMedia(item));
  if (media) {
    // Leer nuevo objeto y extraer atributos.
    if ('url' === src) {
      // Url de medio, aún por definir mas atributos. Opciones: full, large, medium, medium_large, thumbnail
      media = media.media_details.sizes.full.source_url;
    }
    if ('alt' === src) {
      // Url de medio, aún por definir mas atributos.
      media = media.alt_text;
    }
    return media;
  }
}

/**
 * Contenido con: dangerouslySetInnerHTML
 * dangerouslySetInnerHTML={ {__html: post.excerpt.rendered} }
 * https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
 * O reformateando el string, es para fines de muestra.
 * https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/edit.js
 */
function datoEntradaExtracto(extracto) {
  if (!extracto) return null;
  const document = new window.DOMParser().parseFromString(extracto, 'text/html');
  let texto = document.body.textContent || document.body.innerText || '';
  return texto;
}

/**
 * Marcado de carrusel, editor + front.
 */
function CarosuelMarkupHtml({
  postsStored,
  attributes
}) {
  const carId = attributes.anchor + 'block';
  const carCol = 1 < attributes.SetColumns ? ' carousel-multiple x' + attributes.SetColumns : '';
  const carAni = attributes.SetAnimation ? ' carousel-' + attributes.SetAnimation : '';
  const carInd = attributes.SetColumns === 1 && attributes.AddIndicatorsText ? ' has-text-indicators' : '';
  const carStr = attributes.SetAuto ? 'carousel' : null;
  // Reglas CSS inline.
  const min_height = {
    height: 0 !== attributes.SetHeight ? attributes.SetHeight + 'px' : '100vh'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    id: carId,
    className: 'carousel slide' + carCol + carAni + carInd,
    "data-bs-ride": carStr,
    "data-bs-interval": attributes.SetTime,
    style: min_height,
    children: [attributes.AddIndicators && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      class: "carousel-indicators",
      children: postsStored?.map((post, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
        type: "button",
        "data-bs-target": '#' + carId,
        "data-bs-slide-to": index,
        className: index === 0 ? 'active' : null,
        "aria-current": index === 0 ? true : null,
        "aria-label": 'Slide ' + (index + 1)
      }, post.id))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: 'carousel-inner',
      children: postsStored?.map((post, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: index === 0 ? 'carousel-item active' : 'carousel-item',
        style: min_height,
        children: [post.post_thumbnail_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
          className: "d-block w-100",
          src: post.post_thumbnail_url,
          alt: post.post_thumbnail_alt ? post.post_thumbnail_alt : null
        }) : null, attributes.ShowCaption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          class: "carousel-caption",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h3", {
            children: [!attributes.SetLinks && (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__.decodeEntities)(post.post_title), attributes.SetLinks && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              href: post.post_permalink,
              title: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__.decodeEntities)(post.post_title),
              children: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__.decodeEntities)(post.post_title)
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
            children: post.post_excerpt
          })]
        })]
      }, post.post_id))
    }), attributes.AddControls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
        class: "carousel-control-prev",
        type: "button",
        "data-bs-target": carId ? '#' + carId : null,
        "data-bs-slide": "prev",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "carousel-control-prev-icon",
          "aria-hidden": "true"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "visually-hidden",
          children: "Previous"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
        class: "carousel-control-next",
        type: "button",
        "data-bs-target": carId ? '#' + carId : null,
        "data-bs-slide": "next",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "carousel-control-next-icon",
          "aria-hidden": "true"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "visually-hidden",
          children: "Next"
        })]
      })]
    }), attributes.SetColumns === 1 && attributes.AddIndicatorsText && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("ul", {
      class: "carousel-text-indicators carousel-caption list-unstyled d-none d-md-flex",
      children: postsStored?.map((post, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("li", {
        type: "button",
        "data-bs-target": '#' + carId,
        "data-bs-slide-to": index,
        className: index === 0 ? 'active' : null,
        "aria-current": index === 0 ? true : null,
        "aria-label": 'Slide ' + (index + 1),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "h5",
          children: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_6__.decodeEntities)(post.post_title)
        })
      }, post.id))
    })]
  });
}

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
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
 * Funciones personalizadas.
 * Selector de categorias con busqueda.
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

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
    blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)()
  } = props;

  /**
   * Selector de categorias, maneja la informacion que se guarda en el bloque.
   * @param {*} attributes Accede a los registros en el bloque.
   * @param {*} setAttributes Actualiza los registros en el bloque.
   * @returns Custom component: FormTokenField.
   */
  const TokenCategoriesSelect = () => {
    // Array de categorias existentes.
    const categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1
    }), []);
    // Actualizacion de categorias seleccionadas.
    const [selectedCategories, setSelectedCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
    // Componente, necesita de cambiarNombrePorIds.
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Find and select categories:', 'ekiline-collection'),
      value: !attributes.SetCatSlug ? selectedCategories : attributes.SetCatSlug
      // Mostrar sugerencias por nombre de url. (id, name, slug).
      ,
      suggestions: categories?.map(el => el.slug)
      // Varias operaciones: mostrar categorias seleccionadas, actualizar/guardar datos.
      ,
      onChange: tokens => {
        setSelectedCategories(tokens);
        setAttributes({
          SetCatSlug: tokens,
          // SetCatIds: (cambiarNombrePorIds(tokens,categories,'id')),
          SetIds: cambiarNombrePorIds(tokens, categories, 'id')
        });
      }
    });
  };

  /**
   * Callback para los medios.
   * @ref https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md.
   * @param {*} media arreglo de imagenes.
   */
  const onSelectMedia = media => {
    const theImagesArray = media?.map(media => media.id);
    setAttributes({
      SetIds: theImagesArray
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel content', 'ekiline-collection'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content type', 'ekiline-collection'),
          value: attributes.ChooseType,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Posts', 'ekiline-collection'),
            value: 'posts'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Images', 'ekiline-collection'),
            value: 'images'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Video + Images', 'ekiline-collection'),
            value: 'videos'
          }],
          onChange: ChooseType => {
            setAttributes({
              ChooseType,
              SetIds: []
            });
          }
        }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TokenCategoriesSelect, {}), 'posts' !== attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
            title: 'images' === attributes.ChooseType ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel Images', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel Video and Images', 'ekiline-collection'),
            onSelect: media => onSelectMedia(media),
            allowedTypes: 'images' === attributes.ChooseType ? ['image'] : ['image', 'video'],
            multiple: true,
            value: attributes.SetIds,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              variant: "secondary",
              onClick: open,
              children: attributes.SetIds.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Manage media', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add media', 'ekiline-collection')
            }),
            gallery: 'images' === attributes.ChooseType ? true : false,
            addToGallery: 'images' === attributes.ChooseType ? true : false
          })
        }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post amount', 'ekiline-collection'),
          type: "number",
          value: attributes.SetAmount,
          onChange: newval => setAttributes({
            SetAmount: parseInt(newval)
          })
        }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sort by', 'ekiline-collection'),
          value: attributes.SetOrderBy,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date', 'ekiline-collection'),
            value: 'date'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Modified', 'ekiline-collection'),
            value: 'modified'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title', 'ekiline-collection'),
            value: 'title'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name', 'ekiline-collection'),
            value: 'name'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Author', 'ekiline-collection'),
            value: 'author'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Random', 'ekiline-collection'),
            value: 'rand'
          }],
          onChange: SetOrderBy => setAttributes({
            SetOrderBy
          })
        }), 'posts' === attributes.ChooseType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Find a block in content', 'ekiline-collection'),
          value: attributes.FindBlock,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'ekiline-collection'),
            value: 'none'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cover', 'ekiline-collection'),
            value: 'core/cover'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image', 'ekiline-collection'),
            value: 'core/image'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media and text', 'ekiline-collection'),
            value: 'core/media-text'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Video', 'ekiline-collection'),
            value: 'core/video'
          }],
          onChange: FindBlock => setAttributes({
            FindBlock
          })
        }), 'none' !== attributes.FindBlock && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show post if there is no block', 'ekiline-collection'),
          checked: attributes.AllowMixed,
          onChange: AllowMixed => setAttributes({
            AllowMixed
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel Look', 'ekiline-collection'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns', 'ekiline-collection'),
          value: attributes.SetColumns,
          onChange: newval => setAttributes({
            SetColumns: parseInt(newval)
          }),
          min: 1,
          max: 4
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show controls', 'ekiline-collection'),
          checked: attributes.AddControls,
          onChange: AddControls => setAttributes({
            AddControls
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show indicators', 'ekiline-collection'),
          checked: attributes.AddIndicators,
          onChange: AddIndicators => setAttributes({
            AddIndicators
          })
        }), attributes.SetColumns === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show text indicators', 'ekiline-collection'),
          checked: attributes.AddIndicatorsText,
          onChange: AddIndicatorsText => setAttributes({
            AddIndicatorsText
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Auto start', 'ekiline-collection'),
          checked: attributes.SetAuto,
          onChange: SetAuto => setAttributes({
            SetAuto
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show caption', 'ekiline-collection'),
          checked: attributes.ShowCaption,
          onChange: ShowCaption => setAttributes({
            ShowCaption
          })
        }), attributes.ShowCaption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: 'posts' === attributes.ChooseType ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link titles', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link images', 'ekiline-collection'),
          checked: attributes.SetLinks,
          onChange: SetLinks => setAttributes({
            SetLinks
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Transition in milliseconds', 'ekiline-collection'),
          type: "number",
          value: attributes.SetTime,
          onChange: newval => setAttributes({
            SetTime: parseInt(newval)
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animation type', 'ekiline-collection'),
          value: attributes.SetAnimation,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'ekiline-collection'),
            value: ''
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Fade', 'ekiline-collection'),
            value: 'fade'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical', 'ekiline-collection'),
            value: 'vertical'
          }],
          onChange: SetAnimation => setAttributes({
            SetAnimation
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Height in pixels, set zero to see full display height.', 'ekiline-collection'),
          type: "number",
          value: attributes.SetHeight,
          onChange: newval => setAttributes({
            SetHeight: parseInt(newval)
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default()), {
      block: "ekiline-collection/ekiline-carousel",
      attributes: props.attributes
    })]
  });
}

/**
 * Transformo una cadena id por nombre.
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Carousel dynamic', 'ekiline-collection'),
  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add a dynamic carousel to your posts, choose between posts, images, blocks and more.', 'ekiline-collection'),
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
    align: ['wide', 'full'],
    anchor: true
  },
  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    anchor: {
      type: 'string',
      default: ''
    },
    ChooseType: {
      type: 'string',
      default: 'posts'
    },
    SetIds: {
      type: 'array',
      default: []
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
    },
    ShowCaption: {
      type: 'boolean',
      default: true
    },
    SetLinks: {
      type: 'boolean',
      default: false
    },
    AddIndicatorsText: {
      type: 'boolean',
      default: false
    },
    // 23ENE23: Apoyo para la busqueda de categorias.
    SetCatSlug: {
      type: 'array',
      default: []
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
    } = props;
    // const PARENT_ALLOWED_BLOCKS = [ 'core/buttons' ];
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
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          class: "editor-collapse-route has-anchor",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("pre", {
            children: ['#' + attributes.anchor, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')]
          })
        });
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        class: "editor-collapse-route",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do not forget to add an anchor. ', 'ekiline-collection')
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Collapse Params', 'ekiline-collection'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Horizontal collapse', 'ekiline-collection'),
            checked: attributes.horizontal,
            onChange: horizontal => setAttributes({
              horizontal
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(CollapseUserRemind, {})]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'collapse' + (attributes.horizontal ? ' collapse-horizontal' : ''),
      style: {
        'min-height': attributes.horizontal ? '120px' : null
      },
      contentStyle: {
        'min-width': attributes.horizontal ? '300px' : null
      }
    });

    // Condicion para crear envoltorio.
    function CollapseWrapper() {
      if (attributes.horizontal) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          style: attributes.horizontal ? blockProps.contentStyle : null,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
        });
      } else {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {});
      }
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(CollapseWrapper, {})
    });
  }
});

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Nuevo complemento:
 * Permitir enlazar componentes bs desde boton.
 *
 * Referencia de bloques y filtros:
 * @see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
 * @see https://joshpress.net/blog/add-block-attributes
 * @see https://jschof.com/gutenberg-blocks/using-gutenberg-filters-to-extend-blocks/
 * @see https://www.liip.ch/en/blog/writing-a-wrapper-block-for-gutenberg-in-wordpress
 * @see https://www.liip.ch/en/blog/how-to-extend-existing-gutenberg-blocks-in-wordpress
 * @see https://stackoverflow.com/questions/36064277/how-to-inject-pass-attributes-to-nested-elements
 *
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

// Restringir el uso a botones:'core/button, buttons, paragraph, image, gallery, navigation-link'.

const bsBtnAllowedBlocks = ['core/button', 'core/buttons'];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBsButtonLink(settings) {
  // Restriccion.
  if (bsBtnAllowedBlocks.includes(settings.name)) {
    // Atributos: anchor, componente y dismiss.
    settings.attributes = Object.assign(settings.attributes, {
      anchorBsComponent: {
        type: 'string',
        default: ''
      },
      selectBsComponent: {
        type: 'string',
        default: ''
      },
      dissmissBsComponent: {
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
 * @return {function} Devuelve el BlockEdit modificado.
 */
const withAdvancedControlsBsButtonLink = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Cerrar Bslink.
    const {
      attributes,
      setAttributes
    } = props;
    const {
      dissmissBsComponent
    } = attributes;
    if (bsBtnAllowedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
          ...props
        }), props.attributes.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to Block (Ekiline)', 'ekiline-collection'),
            initialOpen: true,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Anchor block name', 'ekiline-collection'),
              value: props.attributes.anchorBsComponent,
              onChange: newData => props.setAttributes({
                anchorBsComponent: newData
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose block', 'ekiline-collection'),
              value: attributes.selectBsComponent,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'ekiline-collection'),
                value: ''
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Collapse', 'ekiline-collection'),
                value: 'collapse'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Modal', 'ekiline-collection'),
                value: 'modal'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Offcanvas', 'ekiline-collection'),
                value: 'offcanvas'
              }],
              onChange: selectBsComponent => setAttributes({
                selectBsComponent
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is close button?', 'ekiline-collection'),
              checked: !dissmissBsComponent,
              onChange: () => setAttributes({
                dissmissBsComponent: !dissmissBsComponent
              }),
              help: !dissmissBsComponent ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Yes.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No.', 'ekiline-collection')
            })]
          })
        })]
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
      ...props
    });
  };
}, 'withAdvancedControlsBsButtonLink');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBsButtonLink(element, block, attributes) {
  // Nuevo: Cerrar Bslink, sobrescribe los atributos.
  const {
    dissmissBsComponent
  } = attributes;
  if (bsBtnAllowedBlocks.includes(block.name)) {
    if (dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element, {}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element.props.children, {
        'data-bs-target': attributes.anchorBsComponent,
        'data-bs-toggle': attributes.selectBsComponent
      }));
    }
    if (!dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element, {}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element.props.children, {
        'data-bs-dismiss': attributes.selectBsComponent
      }));
    }
  }
  return element;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'ekilineBsButtonLinkData/dataAttribute', addAttributesBsButtonLink);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'ekilineBsButtonLinkData/dataInput', withAdvancedControlsBsButtonLink);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.getSaveElement', 'ekilineBsButtonLinkData/dataModified', applyExtraClassBsButtonLink);

/**
 * Nuevo complemento:
 * Permitir enlazar componentes bs desde imagen.
 */

// Restringir el uso a botones:'core/button, buttons, paragraph, image, gallery, navigation-link'.
const bsImgAllowedBlocks = ['core/image'];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBsImageLink(settings) {
  // Restriccion.
  if (bsImgAllowedBlocks.includes(settings.name)) {
    // Atributos: anchor, componente y dismiss.
    settings.attributes = Object.assign(settings.attributes, {
      anchorBsComponent: {
        type: 'string',
        default: ''
      },
      selectBsComponent: {
        type: 'string',
        default: ''
      },
      dissmissBsComponent: {
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
 * @return {function} Devuelve el BlockEdit modificado.
 */
const withAdvancedControlsBsImageLink = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Cerrar Bslink.
    const {
      attributes,
      setAttributes
    } = props;
    const {
      dissmissBsComponent
    } = attributes;
    if (bsImgAllowedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
          ...props
        }), props.attributes.href && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to Ekiline Block', 'ekiline-collection'),
            initialOpen: true,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Anchor block name', 'ekiline-collection'),
              value: props.attributes.anchorBsComponent,
              onChange: newData => props.setAttributes({
                anchorBsComponent: newData
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose block', 'ekiline-collection'),
              value: attributes.selectBsComponent,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'ekiline-collection'),
                value: ''
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Collapse', 'ekiline-collection'),
                value: 'collapse'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Modal', 'ekiline-collection'),
                value: 'modal'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Offcanvas', 'ekiline-collection'),
                value: 'offcanvas'
              }],
              onChange: selectBsComponent => setAttributes({
                selectBsComponent
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is close button?', 'ekiline-collection'),
              checked: !dissmissBsComponent,
              onChange: () => setAttributes({
                dissmissBsComponent: !dissmissBsComponent
              }),
              help: !dissmissBsComponent ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Yes.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No.', 'ekiline-collection')
            })]
          })
        })]
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
      ...props
    });
  };
}, 'withAdvancedControlsBsImageLink');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBsImageLink(element, block, attributes) {
  // Nuevo: Cerrar Bslink, sobrescribe los atributos.
  const {
    dissmissBsComponent
  } = attributes;
  if (bsImgAllowedBlocks.includes(block.name)) {
    if (dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.href) {
      /**
       * Nota: la manipulación del marcado por objetos:
       * - cloneElement( element.props, ... ) queda en un nivel superior.
       * Se necesita ir a profundidad y encontrar el elemento de marcado requerido:
       * - - console.log(element.props.children.props.children[0])  // revisar objeto.
       * - - console.log(element.props.children.props.children[0].type)  // revisar objeto tipo.
       * - cloneElement( element.props.children.props.children[0], ...)
       * Probablemente, debo crear una función que valide la existencia de <a/> con type: 'a'.
       * - - Por ello hay una validacion, podria cambiar el metodo.
       */
      if ('a' === element.props.children.props.children[0].type) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element, {}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element.props.children.props.children[0], {
          'data-bs-target': attributes.anchorBsComponent,
          'data-bs-toggle': attributes.selectBsComponent
        }));
      }
    }
    if (!dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.href) {
      if ('a' === element.props.children.props.children[0].type) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element, {}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(element.props.children.props.children[0], {
          'data-bs-dismiss': attributes.selectBsComponent
        }));
      }
    }
  }
  return element;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'ekilineBsImageLinkData/dataAttribute', addAttributesBsImageLink);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'ekilineBsImageLinkData/dataInput', withAdvancedControlsBsImageLink);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.getSaveElement', 'ekilineBsImageLinkData/dataModified', applyExtraClassBsImageLink);

/***/ }),

/***/ "./src/modal/index.js":
/*!****************************!*\
  !*** ./src/modal/index.js ***!
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-modal', {
  /**
  * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
  */
  apiVersion: 2,
  /**
  * Parametros de alta.
  * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
  */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true
  },
  /**
  * Atributos para personalizacion.
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
      // boton tamaño.
      type: 'boolean',
      default: false
    },
    modalTime: {
      type: 'number',
      default: 0
    }
  },
  /**
  * Se ocupara contexto para pasar valores.
  * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
  */
  providesContext: {
    'ekiline-modal-item/modalGrow': 'modalGrow'
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

    // Restringir los bloques, Cargar un preset.
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
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-modal'
    });

    /**
    * Control personalizado: recordatorio
    */
    function ModalUserRemind() {
      if (attributes.anchor) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          class: "editor-modal-route has-anchor",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("pre", {
            children: ['#' + attributes.anchor, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')]
          })
        });
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        class: "editor-modal-route",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do not forget to add an anchor. ', 'ekiline-collection')
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal Params', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rise modal', 'ekiline-collection'),
            value: attributes.modalShow,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'ekiline-collection'),
              value: ' right-aside'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'ekiline-collection'),
              value: ' move-from-bottom'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'ekiline-collection'),
              value: ' left-aside'
            }],
            onChange: modalShow => setAttributes({
              modalShow
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Size modal', 'ekiline-collection'),
            value: attributes.modalSize,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Small', 'ekiline-collection'),
              value: ' modal-sm'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Large', 'ekiline-collection'),
              value: ' modal-lg'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Extra Large', 'ekiline-collection'),
              value: ' modal-xl'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full window', 'ekiline-collection'),
              value: ' modal-fullscreen'
            }],
            onChange: modalSize => setAttributes({
              modalSize
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Center in window', 'ekiline-collection'),
            checked: attributes.modalAlign,
            onChange: modalAlign => setAttributes({
              modalAlign
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable background click to close', 'ekiline-collection'),
            checked: attributes.modalBackdrop,
            onChange: modalBackdrop => setAttributes({
              modalBackdrop
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable ESC key to close', 'ekiline-collection'),
            checked: attributes.modalKeyboard,
            onChange: modalKeyboard => setAttributes({
              modalKeyboard
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show resize modal button', 'ekiline-collection'),
            checked: attributes.modalGrow,
            onChange: modalGrow => setAttributes({
              modalGrow
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show with timer', 'ekiline-collection'),
            type: "number",
            value: attributes.modalTime,
            onChange: newval => setAttributes({
              modalTime: parseInt(newval)
            }),
            help: attributes.modalTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run after page load ', 'ekiline-collection') + attributes.modalTime + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' milliseconds.', 'ekiline-collection') : attributes.modalTime + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' do nothing.', 'ekiline-collection')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ModalUserRemind, {})]
    });
  },
  /**
  * @see ./save.js
  */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'group-modal modal fade' + (attributes.modalShow != 'default' ? attributes.modalShow : ''),
      'data-bs-backdrop': attributes.modalBackdrop,
      'data-bs-keyboard': attributes.modalKeyboard,
      'data-ek-time': attributes.modalTime || null
    });
    const dialogProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'modal-dialog' + (attributes.modalAlign ? ' modal-dialog-centered' : '') + (attributes.modalSize != 'default' ? attributes.modalSize : '')
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": blockProps.id + 'Label',
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        class: dialogProps.className,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          class: "modal-content",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
        })
      })
    });
  }
});

/**
 * - ekiline-modal-header
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-modal-header', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal header', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal header content. ', 'ekiline-collection'),
  category: 'design',
  usesContext: ['ekiline-modal-item/modalGrow'],
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  attributes: {
    modalGrow: {
      type: 'boolean',
      default: false
    }
  },
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/heading', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add modal title', 'ekiline-collection'),
      level: 4
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'editor-modal-header'
    });

    // Agregar clase de bootstrap en campo de clase
    if (!attributes.className) {
      setAttributes({
        className: 'justify-content-between'
      });
    }

    // Heredar boton para crecer modal
    if (!attributes.modalGrow) {
      setAttributes({
        modalGrow: props.context['ekiline-modal-item/modalGrow']
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
  },
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'modal-header'
    });

    // Componente boton crecer ventana.
    function ModalGrowBtn() {
      if (attributes.modalGrow) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          class: "modal-resize btn btn-md",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('play btn', 'ekiline-collection'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            class: "dashicons dashicons-fullscreen-alt"
          })
        });
      }
    }
    // Componente boton cerrar ventana.
    function ModalCloseBtn() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close btn', 'ekiline-collection')
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ModalGrowBtn, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ModalCloseBtn, {})]
    });
  }
});

/**
 * - ekiline-modal-body
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-modal-body', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal body content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal body content. ', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add modal content blocks', 'ekiline-collection')
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'editor-modal-body'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'modal-body'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/**
 * - ekiline-modal-footer
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-modal-footer', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal footer', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inner footer content. ', 'ekiline-collection'),
  category: 'design',
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/paragraph', 'core/buttons', 'core/button'];
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add modal footer text', 'ekiline-collection')
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'editor-modal-footer'
    });

    // agregar clase de bootstrap en campo de clase
    if (!attributes.className) {
      setAttributes({
        className: 'justify-content-between'
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'modal-footer'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/***/ }),

/***/ "./src/offcanvas/index.js":
/*!********************************!*\
  !*** ./src/offcanvas/index.js ***!
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
  d: 'M9.46,12.43h1.08v-1.74h-1.08v1.74Zm0,3.12h1.08v-1.74h-1.08v1.74Zm0-6.25h1.08v-1.74h-1.08v1.74ZM13.42,1H1V19H19V1h-5.58Zm0,16.92h-2.88v-.98h-1.08v.98H2.08V2.08h7.38v.97h1.08v-.97h2.88v15.84Zm3.51-6.76l-1.44-1.17,1.44-1.17v2.34Zm-7.47-4.98h1.08v-1.74h-1.08v1.74Z'
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
 * Bloques necesarios para offcanvas.
 * - .offcanvas
 * - - .offcanvas-header
 * - - - variable: h5
 * - - - variable: .btn-close
 * - - .offcanvas-body
 * - - - variable: [bloques]
 * Variables:
 * attributos:
 * - anchor: true
 * Look:
 * - ocPosition: string, default: offcanvas-end. Opciones:  *-start, end, top, bottom
 * - ocWidth: string, default: ''. // Opciones: w-25, w-50, w-75, w-100
 * - ocHeight: string, default: ''. // Opciones: h-25, h-50, h-75, h-100
 * - ocScroll: boolean, default: false. // true. attr: data-bs-scroll="true"
 * - ocBackdrop: string, default: true. // Opciones: false,static. attr: data-bs-backdrop="false"
 * - ocDisplay: string, default: offcanvas. Opciones: offcanvas-sm, md, lg, xl, xxl.
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 * Uso de Lock
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/docs/reference-guides/block-api/block-templates.md#individual-block-locking.
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/packages/block-editor/src/components/inner-blocks/README.md#templatelock
 *
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-offcanvas', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,
  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection'),
  category: 'design',
  supports: {
    anchor: true
  },
  /**
   * Argumentos para personalizacion.
   */
  attributes: {
    ocPosition: {
      type: 'string',
      default: ' offcanvas-end' // -start, -end, -top, -bottom.
    },
    ocWidth: {
      type: 'string',
      default: '' // w-25, w-50, w-75, w-100.
    },
    ocHeight: {
      type: 'string',
      default: '' // h-25, h-50, h-75, h-100.
    },
    ocScroll: {
      type: 'boolean',
      default: false // true = data-bs-scroll="true".
    },
    ocBackdrop: {
      type: 'string',
      default: 'true' // false, static = data-bs-backdrop="false".
    },
    ocDisplay: {
      type: 'string',
      default: ' offcanvas' // -sm, -md, -lg, -xl, -xxl.
    },
    parentAnchor: {
      type: 'string'
    }
  },
  /**
   * Se ocupara contexto para pasar valores.
   * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
   */
  providesContext: {
    'ekiline-offcanvas/anchor': 'anchor'
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

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-offcanvas-header', 'ekiline-collection/ekiline-offcanvas-body'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-offcanvas-header', {
      lock: {
        remove: false,
        move: true
      }
    }], ['ekiline-collection/ekiline-offcanvas-body', {
      lock: {
        remove: false,
        move: true
      }
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-offcanvas'
    });

    /**
     * Control personalizado: recordatorio
     */
    function OffcanvasUserRemind() {
      if (attributes.anchor) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          class: "editor-offcanvas-route has-anchor",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("pre", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add this anchor: #', 'ekiline-collection'), attributes.anchor, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(', in a button link field and in its advanced options.', 'ekiline-collection')]
          })
        });
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        class: "editor-offcanvas-route",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do not forget to add an #anchor. ', 'ekiline-collection')
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas Params', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Position', 'ekiline-collection'),
            value: attributes.ocPosition,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'ekiline-collection'),
              value: ' offcanvas-end'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'ekiline-collection'),
              value: ' offcanvas-bottom'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'ekiline-collection'),
              value: ' offcanvas-start'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top', 'ekiline-collection'),
              value: ' offcanvas-top'
            }],
            onChange: ocPosition => setAttributes({
              ocPosition
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Width', 'ekiline-collection'),
            value: attributes.ocWidth,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Small', 'ekiline-collection'),
              value: ' w-25'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Half', 'ekiline-collection'),
              value: ' w-50'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Large', 'ekiline-collection'),
              value: ' w-75'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full window', 'ekiline-collection'),
              value: ' w-100'
            }],
            onChange: ocWidth => setAttributes({
              ocWidth
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Height', 'ekiline-collection'),
            value: attributes.ocHeight,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'ekiline-collection'),
              value: ''
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Small', 'ekiline-collection'),
              value: ' h-25'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Half', 'ekiline-collection'),
              value: ' h-50'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Large', 'ekiline-collection'),
              value: ' h-75'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full window', 'ekiline-collection'),
              value: ' h-100'
            }],
            onChange: ocHeight => setAttributes({
              ocHeight
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display run', 'ekiline-collection'),
            value: attributes.ocDisplay,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('All', 'ekiline-collection'),
              value: ' offcanvas'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Small', 'ekiline-collection'),
              value: ' offcanvas-sm'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Medium', 'ekiline-collection'),
              value: ' offcanvas-md'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Large', 'ekiline-collection'),
              value: ' offcanvas-lg'
            }],
            onChange: ocDisplay => setAttributes({
              ocDisplay
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run only on specific screen sizes', 'ekiline-collection')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Keep scroll window', 'ekiline-collection'),
            checked: attributes.ocScroll,
            onChange: ocScroll => setAttributes({
              ocScroll
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Backdrop behavior', 'ekiline-collection'),
            value: attributes.ocBackdrop,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'ekiline-collection'),
              value: 'true'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Static', 'ekiline-collection'),
              value: 'static'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('False', 'ekiline-collection'),
              value: 'false'
            }],
            onChange: ocBackdrop => setAttributes({
              ocBackdrop
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run only on specific screen sizes', 'ekiline-collection')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
        // templateLock="all"
        // templateLock="insert"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OffcanvasUserRemind, {})]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'group-offcanvas' + attributes.ocDisplay + attributes.ocPosition + attributes.ocWidth + attributes.ocHeight,
      'data-bs-backdrop': attributes.ocBackdrop,
      'data-bs-scroll': attributes.ocScroll
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": blockProps.id + 'Label',
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/**
 * - ekiline-offcanvas-header
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-offcanvas-header', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas header', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-offcanvas'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas header content. ', 'ekiline-collection'),
  category: 'design',
  //Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-offcanvas/anchor'],
  supports: {
    html: false,
    reusable: false,
    multiple: false,
    inserter: true
  },
  attributes: {
    parentId: {
      type: 'string',
      default: '' // retrive parent Id (Anchor).
    }
  },
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/heading', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add offcanvas title', 'ekiline-collection'),
      level: 4
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'editor-offcanvas-header'
    });

    // Precargar nombre de ID Padre en objetos internos.
    if (!attributes.parentId || attributes.parentId !== props.context['ekiline-offcanvas/anchor']) {
      setAttributes({
        parentId: props.context['ekiline-offcanvas/anchor']
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
  },
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'offcanvas-header'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "offcanvas",
        "data-bs-target": attributes.parentId ? '#' + attributes.parentId : null,
        "aria-label": "Close"
      })]
    });
  }
});

/**
 * - ekiline-offcanvas-body
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-offcanvas-body', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas body content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-offcanvas'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offcanvas body content. ', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add offcanvas content blocks', 'ekiline-collection')
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'editor-offcanvas-body'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'offcanvas-body'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

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
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(),
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popovers have rules added to the core buttons.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You need to create a button. And then text an anchor (#name) link.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will allow you to use the advanced options for the button.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can remove this notice, it won\'t be published in your content.', 'ekiline-collection')]
    });
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
const withAdvancedControlsBtnCollapse = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (allowedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
          ...props
        }), props.attributes.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button to Popover (Ekiline)', 'ekiline-collection'),
            initialOpen: true,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover text to show.', 'ekiline-collection'),
              value: props.attributes.addDataLnkPopover,
              onChange: newData => props.setAttributes({
                addDataLnkPopover: newData
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popover position', 'ekiline-collection'),
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
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Is tooltip', 'ekiline-collection'),
              checked: props.attributes.defineTooltip,
              onChange: defineTooltip => props.setAttributes({
                defineTooltip
              })
            })]
          })
        })]
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
      ...props
    });
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
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.cloneElement)(element, {}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.cloneElement)(element.props.children, {
        'data-bs-content': attributes.addDataLnkPopover,
        'data-bs-toggle': attributes.defineTooltip ? 'tooltip' : 'popover',
        'data-bs-placement': attributes.addPositionLnkPopover,
        'title': attributes.text
        // 'type': 'button',
      }));
    }
  }
  return element;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.registerBlockType', 'ekilineLnkPopoverData/dataAttribute', addAttributesLnkPopover);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('editor.BlockEdit', 'ekilineLnkPopoverData/dataInput', withAdvancedControlsBtnCollapse);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.getSaveElement', 'ekilineLnkPopoverData/dataModified', applyExtraClassLnkPopover);

/***/ }),

/***/ "./src/progress/index.js":
/*!*******************************!*\
  !*** ./src/progress/index.js ***!
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
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-progress', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,
  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Progress', 'ekiline-collection'),
  icon: customIcon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show a bootstrap progress bar for your data.', 'ekiline-collection'),
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
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-progress-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-progress-item']];

    // Personalizar clase.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'group-progress',
      style: {
        // 22 pixeles de padding para maniobrar.
        height: attributes.progHeight + 22 + 'px'
      }
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Progress bar Settings', 'ekiline-collection'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Height bar (pixels)', 'ekiline-collection'),
            type: "number",
            value: attributes.progHeight,
            onChange: newval => setAttributes({
              progHeight: parseInt(!newval || '0' === newval ? 1 : newval)
            }),
            min: "1"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        orientation: "horizontal",
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'progress',
      style: {
        height: attributes.progHeight + 'px'
      }
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
  }
});

/**
 * Bloque interno
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-progress-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Progress data bar', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-progress'],
  icon: 'ellipsis',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Progress data, could be multiple bars between 1 to 100.', 'ekiline-collection'),
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
    } = props;

    // Personalizar clase.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'item-progress progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : '')
      // Se suple con un filtro en el editor (ver newWrapperAtts).
      // style:{
      // 	width: attributes.progRange+'%',
      // },
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Progress bar Settings', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Data range min 1% max 100%', 'ekiline-collection'),
            type: "number",
            value: attributes.progRange,
            onChange: newval => setAttributes({
              progRange: parseInt(!newval || '0' === newval ? 1 : newval)
            }),
            min: "1",
            max: "100"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide number in bar.', 'ekiline-collection'),
            checked: attributes.progLabel,
            onChange: progLabel => setAttributes({
              progLabel
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show stripes over background.', 'ekiline-collection'),
            checked: attributes.progStripes,
            onChange: progStripes => setAttributes({
              progStripes
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show animation.', 'ekiline-collection'),
            checked: attributes.progAnimation,
            onChange: progAnimation => setAttributes({
              progAnimation
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
        children: attributes.progRange
      })]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : ''),
      style: {
        width: attributes.progRange + '%'
      }
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: !attributes.progLabel ? attributes.progRange : null
    });
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
      const wrapperProps = {
        ...props.wrapperProps,
        style: {
          width: props.attributes.progRange + '%'
        }
      };
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
        ...props,
        // className={ 'myfix-' + props.clientId }
        wrapperProps: wrapperProps
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
      ...props
    });
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
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
    }], ['ekiline-collection/ekiline-tabs-container']];
    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-wrapper'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
    } = props;

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-tab-link'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab link 1', 'ekiline-collection'),
      className: 'active'
    }], ['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab link 2', 'ekiline-collection')
    }]];
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-navbar'
    });

    // Nueva clase de apoyo, reemplazar para ocupar bootstrap.
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        orientation: "horizontal",
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'nav'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
    } = props;

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tab-link'
    });

    // limpiar tambien caracteres especiales. anchor + replace/lowercase.
    // https://ricardometring.com/javascript-replace-special-characters
    const replaceSpecialChars = str => {
      return str.normalize('NFD').replace(/(<([^>]+)>)/gi, "") // Eliminar HTML
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
      .replace(/\-\-+/g, '-') // Replaces multiple hyphens by one hyphen
      .replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
      .toLowerCase(); // convierte a minusculas
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tab Link Params', 'ekiline-collection'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Copy this value in a Content Tab HTML anchor field.', 'ekiline-collection'),
            type: "string",
            value: attributes.dataBsTarget = replaceSpecialChars(attributes.content),
            onChange: dataBsTarget => setAttributes({
              dataBsTarget
            }),
            readOnly: true
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
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
      })]
    });
  },
  save: ({
    attributes
  }) => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tab-link nav-link',
      anchorData: '#' + attributes.dataBsTarget
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichTextToolbarButton, {
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
};

// Condicion.
const ConditionalButton = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.compose)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.withSelect)(function (select) {
  return {
    selectedBlock: select('core/block-editor').getSelectedBlock()
  };
}), (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.ifCondition)(function (props) {
  return (
    // props.selectedBlock && props.selectedBlock.name === 'core/paragraph'
    props.selectedBlock && props.selectedBlock.name === 'ekiline-collection/ekiline-tab-link'
  );
}))(findAnchorButton);

// Formato a registrar.
(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__.registerFormatType)('ekiline-format/find-anchor', {
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
    }]];
    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tabs-container'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tabs-container tab-content'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
    reusable: false
    // multiple: false,
    // inserter: false,
  },
  edit: () => {
    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your content and blocks, then copy anchor name to tab content block', 'ekiline-collection')
    }]];

    // personalizar clase
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'tab-content'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })
    });
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'tab-content tab-pane fade'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
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
    });

    // Restringir los bloques, Cargar un preset.
    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-toast-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-toast-item', {
      lock: {
        remove: false,
        move: true
      }
    }]];
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toast group options', 'ekiline-collection'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
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
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: PARENT_ALLOWED_BLOCKS,
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
    });
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
    reusable: true
    // inserter: false,
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
    });

    // Cargar un preset.
    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add toast content.', 'ekiline-modal')
    }]];
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toast Params', 'ekiline-collection'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run by time', 'ekiline-collection'),
            type: "number",
            value: attributes.toastTime,
            onChange: newval => setAttributes({
              toastTime: parseInt(newval)
            }),
            help: attributes.toastTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run after page load ', 'ekiline-collection') + attributes.toastTime + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' milliseconds.', 'ekiline-collection') : attributes.toastTime + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' run immediately on page load.', 'ekiline-collection'),
            min: 0
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Run at end of page scroll.', 'ekiline-collection'),
            checked: attributes.toastScroll,
            onChange: toastScroll => setAttributes({
              toastScroll
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        tagName: "p",
        value: attributes.content,
        allowedFormats: ['core/bold', 'core/italic'],
        onChange: content => setAttributes({
          content
        }),
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add toast title', 'ekiline-collection'),
        className: 'item-title'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        template: CHILD_TEMPLATE
      })]
    });
  },
  /**
   * @see ./save.js
   */
  // save,
  save: ({
    attributes
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'toast-item toast' + (attributes.toastScroll ? ' launch-scroll hide' : '') + (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
      'data-ek-launch-time': attributes.toastTime || null
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        class: "toast-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
          tagName: "p",
          value: attributes.content,
          className: "me-auto my-0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          class: "btn-close",
          "data-bs-dismiss": "toast",
          "aria-label": "Close"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        class: "toast-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
      })]
    });
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

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/* harmony import */ var _carousel_blocks_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./carousel-blocks/index */ "./src/carousel-blocks/index.js");
/* harmony import */ var _offcanvas_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./offcanvas/index */ "./src/offcanvas/index.js");
/* harmony import */ var _hooks_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hooks/index */ "./src/hooks/index.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_13__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_13__.registerBlockCollection)('ekiline-collection', {
  title: 'Ekiline Collection'
  // icon: customIcon,
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
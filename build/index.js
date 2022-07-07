/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accordion/index.js":
/*!********************************!*\
  !*** ./src/accordion/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);


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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-accordion', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Ekiline Accordion, full control', 'ekiline-collection'),
  icon: 'menu-alt',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show your content as an accordion.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
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

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accordion Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Clear style.', 'ekiline-collection'),
      checked: attributes.noStyle,
      onChange: noStyle => setAttributes({
        noStyle
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
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
      className: !attributes.noStyle ? 'accordion' : 'accordion accordion-flush'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * Bloque interno
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-accordion-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accordion item', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-accordion'],
  icon: 'menu-alt',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set tittle and content in your accordion container', 'ekiline-collection'),
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
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Item title.', 'ekiline-collection')
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Item content.', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
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

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accordion Item Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show element by default.', 'ekiline-collection'),
      checked: attributes.showDefault,
      onChange: showDefault => setAttributes({
        showDefault
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Toggle.', 'ekiline-collection'),
      checked: attributes.keepOpen,
      onChange: keepOpen => setAttributes({
        keepOpen
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Close previously active accordion elements.', 'ekiline-collection')
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
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
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accordion Title', 'ekiline-collection') // Display this text before any content has been added by the user

    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'accordion-item'
    });
    const itemBlockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      headingId: !blockProps.id ? null : 'heading' + blockProps.id,
      itemId: !blockProps.id ? null : 'item' + blockProps.id,
      itemClassName: !attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      class: "accordion-header",
      id: itemBlockProps.headingId
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
      tagName: "button",
      className: 'accordion-button',
      type: "button",
      value: attributes.content,
      "data-bs-toggle": "collapse",
      "data-bs-target": itemBlockProps.itemId ? '#' + itemBlockProps.itemId : null
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: itemBlockProps.itemId,
      className: itemBlockProps.itemClassName,
      "data-bs-parent": attributes.keepOpen && attributes.parentId ? '#' + attributes.parentId : null
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)));
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
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/carousel/edit.js");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ekiline Carousel', 'ekiline-collection'),

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
  icon: 'slides',

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
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-collapse', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Collapse, full control', 'ekiline-collection'),
  icon: 'arrow-down',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set a collapse behavior block. You can activate from any button.', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add your content', 'ekiline-collection')
    }]];
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-collapse'
    });
    /**
     * Control personalizado: recordatorio
     */

    function CollapseUserRemind() {
      if (attributes.anchor) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          class: "editor-collapse-route has-anchor"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, '#' + attributes.anchor, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')));
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        class: "editor-collapse-route"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Do not forget to add an anchor. ', 'ekiline-collection'));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Collapse Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Horizontal collapse', 'ekiline-collection'),
      checked: attributes.horizontal,
      onChange: horizontal => setAttributes({
        horizontal
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CollapseUserRemind, null));
  },

  /**
   * @see ./save.js
   */
  // save,
  save: _ref => {
    let {
      attributes
    } = _ref;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
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
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: attributes.horizontal ? blockProps.contentStyle : null
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
      } else {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null);
      }
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CollapseWrapper, null));
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
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Collapse anchor for execute it.', 'ekiline-collection'),
        value: props.attributes.addDataBtnCollapse,
        onChange: newData => props.setAttributes({
          addDataBtnCollapse: newData
        })
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props);
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

/***/ "./src/collection/edit.js":
/*!********************************!*\
  !*** ./src/collection/edit.js ***!
  \********************************/
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
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../editor.scss */ "./src/editor.scss");


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


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ekiline Block Collection – hello from the editor!', 'ekiline-collection'));
}

/***/ }),

/***/ "./src/collection/index.js":
/*!*********************************!*\
  !*** ./src/collection/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../editor.scss */ "./src/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/collection/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/collection/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
//  import '../style.scss';


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('ekiline-collection/ekiline-collection', {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],

  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/collection/save.js":
/*!********************************!*\
  !*** ./src/collection/save.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);


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
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ekiline Block Collection – hello from the saved content!', 'ekiline-collection'));
}

/***/ }),

/***/ "./src/modal/index.js":
/*!****************************!*\
  !*** ./src/modal/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-modal', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal group, full control', 'ekiline-collection'),
  icon: 'editor-kitchensink',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'group-modal'
    });
    /**
     * Control personalizado: recordatorio
     */

    function ModalUserRemind() {
      if (attributes.anchor) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          class: "editor-modal-route has-anchor"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("pre", null, '#' + attributes.anchor, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add this #anchor to a button and its advanced options.', 'ekiline-collection')));
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "editor-modal-route"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Do not forget to add an anchor. ', 'ekiline-collection'));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Rise modal', 'ekiline-collection'),
      value: attributes.modalShow,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default', 'ekiline-collection'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Right', 'ekiline-collection'),
        value: ' right-aside'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Bottom', 'ekiline-collection'),
        value: ' move-from-bottom'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Left', 'ekiline-collection'),
        value: ' left-aside'
      }],
      onChange: modalShow => setAttributes({
        modalShow
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Size modal', 'ekiline-collection'),
      value: attributes.modalSize,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default', 'ekiline-collection'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Small', 'ekiline-collection'),
        value: ' modal-sm'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Large', 'ekiline-collection'),
        value: ' modal-lg'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Extra Large', 'ekiline-collection'),
        value: ' modal-xl'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Full window', 'ekiline-collection'),
        value: ' modal-fullscreen'
      }],
      onChange: modalSize => setAttributes({
        modalSize
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Center in window', 'ekiline-collection'),
      checked: attributes.modalAlign,
      onChange: modalAlign => setAttributes({
        modalAlign
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Enable background click to close', 'ekiline-collection'),
      checked: attributes.modalBackdrop,
      onChange: modalBackdrop => setAttributes({
        modalBackdrop
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Enable ESC key to close', 'ekiline-collection'),
      checked: attributes.modalKeyboard,
      onChange: modalKeyboard => setAttributes({
        modalKeyboard
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show resize modal button', 'ekiline-collection'),
      checked: attributes.modalGrow,
      onChange: modalGrow => setAttributes({
        modalGrow
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show with timer', 'ekiline-collection'),
      type: "number",
      value: attributes.modalTime,
      onChange: newval => setAttributes({
        modalTime: parseInt(newval)
      }),
      help: attributes.modalTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Run after page load "' + attributes.modalTime + '" milliseconds.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('"' + attributes.modalTime + '" do nothing.', 'ekiline-collection')
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE // templateLock="all"
      // templateLock="insert"

    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ModalUserRemind, null));
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'group-modal modal fade' + (attributes.modalShow != 'default' ? attributes.modalShow : ''),
      'data-bs-backdrop': attributes.modalBackdrop,
      'data-bs-keyboard': attributes.modalKeyboard,
      'data-ek-time': attributes.modalTime || null
    });
    const dialogProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'modal-dialog' + (attributes.modalAlign ? ' modal-dialog-centered' : '') + (attributes.modalSize != 'default' ? attributes.modalSize : '')
    }); // Componente Boton.

    function ModalGrowBtn() {
      if (attributes.modalGrow) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
          type: "button",
          class: "modal-resize btn btn-sm btn-outline-secondary",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('play btn', 'ekiline-collection')
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          class: "dashicons dashicons-editor-expand"
        }));
      }
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": blockProps.id + 'Label',
      "aria-hidden": "true"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      class: dialogProps.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      class: "modal-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ModalGrowBtn, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, null))));
  }
});
/**
 * - ekiline-modal-header
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-modal-header', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal header', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal header content. ', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add modal title', 'ekiline-collection'),
      level: 4
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'editor-modal-header'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'modal-header'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-modal-body', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal body content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal body content. ', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add modal content blocks', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'editor-modal-body'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'modal-body'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, null));
  }
});
/**
 * - ekiline-modal-footer
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-modal-footer', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal footer', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-modal'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Inner footer content. ', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add modal footer text', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'editor-modal-footer'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'modal-footer'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, null));
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
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Modal anchor for execute it.', 'ekiline-collection'),
        value: props.attributes.addDataBtn,
        onChange: newData => props.setAttributes({
          addDataBtn: newData
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Close modal button.', 'ekiline-collection'),
        checked: !closeModal,
        onChange: () => setAttributes({
          closeModal: !closeModal
        }),
        help: !closeModal ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Yes.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No.', 'ekiline-collection')
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props);
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-popovers', {
  apiVersion: 2,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pop overs, full control', 'ekiline-collection'),
  icon: 'admin-comments',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add popovers to your links or buttons.', 'ekiline-collection'),
  category: 'design',

  /**
   * @see ./edit.js
   */
  // edit: Edit,
  edit: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)(), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Popovers have rules added to the core buttons.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('You need to create a button. And then text an anchor (#name) link.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to use the advanced options for the button.', 'ekiline-collection'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('You can remove this notice, it won\'t be published in your content.', 'ekiline-collection'));
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
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), props.attributes.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Popover text to show.', 'ekiline-collection'),
        value: props.attributes.addDataLnkPopover,
        onChange: newData => props.setAttributes({
          addDataLnkPopover: newData
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Popover  position', 'ekiline-collection'),
        value: props.attributes.addPositionLnkPopover,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Popover position', 'ekiline-collection'),
          value: 'auto'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Top', 'ekiline-collection'),
          value: 'top'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Right', 'ekiline-collection'),
          value: 'right'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Bottom', 'ekiline-collection'),
          value: 'bottom'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Left', 'ekiline-collection'),
          value: 'left'
        }],
        onChange: addPositionLnkPopover => props.setAttributes({
          addPositionLnkPopover
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Is tooltip', 'ekiline-collection'),
        checked: props.attributes.defineTooltip,
        onChange: defineTooltip => props.setAttributes({
          defineTooltip
        })
      })));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props);
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-progress', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Ekiline progress, full control', 'ekiline-collection'),
  icon: 'ellipsis',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show a bootstrap progress bar for your data.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'group-progress',
      style: {
        // 22 pixeles de padding para maniobrar.
        height: attributes.progHeight + 22 + 'px'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Progress bar Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Height bar (pixels)', 'ekiline-collection'),
      type: "number",
      value: attributes.progHeight,
      onChange: newval => setAttributes({
        progHeight: parseInt(!newval || '0' === newval ? 1 : newval)
      }),
      min: "1"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'progress',
      style: {
        height: attributes.progHeight + 'px'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, null));
  }
});
/**
 * Bloque interno
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('ekiline-collection/ekiline-progress-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Progress data bar', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-progress'],
  icon: 'ellipsis',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Progress data, could be multiple bars between 1 to 100.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'item-progress progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : '') // Se suple con un filtro en el editor (ver newWrapperAtts).
      // style:{
      // 	width: attributes.progRange+'%',
      // },

    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Progress bar Settings', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Data range min 1% max 100%', 'ekiline-collection'),
      type: "number",
      value: attributes.progRange,
      onChange: newval => setAttributes({
        progRange: parseInt(!newval || '0' === newval ? 1 : newval)
      }),
      min: "1",
      max: "100"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Hide number in bar.', 'ekiline-collection'),
      checked: attributes.progLabel,
      onChange: progLabel => setAttributes({
        progLabel
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show stripes over background.', 'ekiline-collection'),
      checked: attributes.progStripes,
      onChange: progStripes => setAttributes({
        progStripes
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show animation.', 'ekiline-collection'),
      checked: attributes.progAnimation,
      onChange: progAnimation => setAttributes({
        progAnimation
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, attributes.progRange));
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: 'progress-bar' + (attributes.progAnimation ? ' progress-bar-animated' : '') + (attributes.progStripes ? ' progress-bar-striped' : ''),
      style: {
        width: attributes.progRange + '%'
      }
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, !attributes.progLabel ? attributes.progRange : null);
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
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        // className={ 'myfix-' + props.clientId }
        wrapperProps: wrapperProps
      }));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, props);
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-tabs', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Ekiline Tabs', 'ekiline-collection'),
  icon: 'table-row-after',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add a tabs for your posts, full control.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'tabs-wrapper'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'tabs-wrapper'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * tabs-navbar
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-tabs-navbar', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tabs Nav Bar', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs'],
  icon: 'editor-kitchensink',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab navigation, add your links.', 'ekiline-collection'),
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
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tabs'),
    className: 'nav-tabs',
    isDefault: true
  }, {
    name: 'nav-pills',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pills'),
    className: 'nav-pills'
  }],
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props; // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-tab-link'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab link 1', 'ekiline-collection'),
      className: 'active'
    }], ['ekiline-collection/ekiline-tab-link', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab link 2', 'ekiline-collection')
    }]];
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
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

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      orientation: "horizontal",
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'nav'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * - - tab-link
 * p1) Requiere RichText
 * p2) Requiere Registrar un nuevo formato para insertar un boton.
 */


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-tab-link', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab Link', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs-navbar'],
  icon: 'button',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab button link. Copy Anchor text and paste on Tab Content Anchor field.', 'ekiline-collection'),
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
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab link', 'ekiline-collection')
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
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

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab Link Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Copy this value in a Content Tab HTML anchor field.', 'ekiline-collection'),
      type: "string",
      value: attributes.dataBsTarget = replaceSpecialChars(attributes.content),
      onChange: dataBsTarget => setAttributes({
        dataBsTarget
      }),
      readOnly: true
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'tab-link nav-link',
      anchorData: '#' + attributes.dataBsTarget
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichTextToolbarButton, {
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
      alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab-Content Anchor: ' + linkToTab, 'ekiline-collection'));
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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-tabs-container', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tabs container', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs'],
  icon: 'editor-kitchensink',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('All tabs add here.', 'ekiline-collection'),
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

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'tabs-container'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      allowedBlocks: PARENT_ALLOWED_BLOCKS,
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // personalizar clase
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'tabs-container tab-content'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * - - tab-content
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-tab-content', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tab Content', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-tabs-container'],
  icon: 'feedback',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inner tab content. Find Tab Link anchor text, and paste on Anchor field.', 'ekiline-collection'),
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
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add your content and blocks, then copy anchor name to tab content block', 'ekiline-collection')
    }]]; // personalizar clase

    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'tab-content'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
      template: CHILD_TEMPLATE
    }));
  },
  save: () => {
    // Clases y atributos auxiliares, incluir save.
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'tab-content tab-pane fade'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});

/***/ }),

/***/ "./src/toast/index.js":
/*!****************************!*\
  !*** ./src/toast/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);


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

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-toast', {
  /**
   * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
   */
  apiVersion: 2,

  /**
   * Parametros de alta.
   * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
   */
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Ekiline toast, full control', 'ekiline-collection'),
  icon: 'lightbulb',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show small bootstrap-style notices.', 'ekiline-collection'),
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
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'group-toast'
    }); // Restringir los bloques, Cargar un preset.

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-toast-item'];
    const CHILD_TEMPLATE = [['ekiline-collection/ekiline-toast-item', {
      lock: {
        remove: false,
        move: true
      }
    }]];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Toast group options', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Display position', 'ekiline-collection'),
      value: attributes.toastPosition,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Bottom right', 'ekiline-collection'),
        value: ' bottom-0 end-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Bottom left', 'ekiline-collection'),
        value: ' bottom-0 start-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Top right', 'ekiline-collection'),
        value: ' top-0 end-0'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Top left', 'ekiline-collection'),
        value: ' top-0 start-0'
      }],
      onChange: toastPosition => setAttributes({
        toastPosition
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
});
/**
 * Toast Item.
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('ekiline-collection/ekiline-toast-item', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Ekiline toast item.', 'ekiline-collection'),
  parent: ['ekiline-collection/ekiline-toast'],
  icon: 'lightbulb',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Each toast can be executed by time, at the end of scrolling, or with the cursor outside the window. You can stack as many as you need.', 'ekiline-collection'),
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
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'toast-item'
    }); // Cargar un preset.

    const CHILD_TEMPLATE = [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add toast content.', 'ekiline-modal')
    }]];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Toast Params', 'ekiline-collection'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Run by time', 'ekiline-collection'),
      type: "number",
      value: attributes.toastTime,
      onChange: newval => setAttributes({
        toastTime: parseInt(newval)
      }),
      help: attributes.toastTime > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Run after page load "' + attributes.toastTime + '" milliseconds.', 'ekiline-collection') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('"' + attributes.toastTime + '" run immediately on page load.', 'ekiline-collection')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Run at end of page scroll.', 'ekiline-collection'),
      checked: attributes.toastScroll,
      onChange: toastScroll => setAttributes({
        toastScroll
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
      tagName: "p",
      value: attributes.content,
      allowedFormats: ['core/bold', 'core/italic'],
      onChange: content => setAttributes({
        content
      }),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add toast title', 'ekiline-collection'),
      className: 'item-title'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: 'toast-item toast' + (attributes.toastScroll ? ' launch-scroll hide' : '') + (attributes.toastTime !== 0 ? ' launch-time hide' : ''),
      'data-ek-launch-time': attributes.toastTime || null
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "toast-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      class: "me-auto my-0"
    }, attributes.content), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "toast",
      "aria-label": "Close"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "toast-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)));
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
/* harmony import */ var _collection_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collection/index */ "./src/collection/index.js");
/* harmony import */ var _accordion_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordion/index */ "./src/accordion/index.js");
/* harmony import */ var _collapse_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapse/index */ "./src/collapse/index.js");
/* harmony import */ var _popovers_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popovers/index */ "./src/popovers/index.js");
/* harmony import */ var _progress_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./progress/index */ "./src/progress/index.js");
/* harmony import */ var _toast_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast/index */ "./src/toast/index.js");
/* harmony import */ var _tabs_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs/index */ "./src/tabs/index.js");
/* harmony import */ var _modal_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal/index */ "./src/modal/index.js");
/* harmony import */ var _carousel_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./carousel/index */ "./src/carousel/index.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__);
/**
 * Internal dependencies
 */









/**
 * Incorporar bloques a coleccion.
 */


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__.registerBlockCollection)('ekiline-collection', {
  title: 'Ekiline Collection',
  icon: 'layout'
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
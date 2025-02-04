import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useBlockProps, useSelect } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Registrar el bloque
registerBlockType('ekiline-block-collection/ekiline-navigation', {
    title: __('Navegación Extendida', 'ekiline-block-collection'),
    category: 'widgets',
    icon: 'menu',
    supports: {
        html: false,  // Solo para bloques de React
    },
    attributes: {
        className: {
            type: 'string',
            default: 'navbar',
        },
        navShow: {
            type: 'string',
            default: 'lg', // Por defecto, el menú se expande en pantallas grandes
        },
        customText: {
            type: 'string',
            default: 'Menú de navegación',
        },
        toggler: {
            type: 'boolean',
            default: true, // Mostrar el botón toggler por defecto
        },
    },
    // Editar el bloque
    edit: ({ attributes, setAttributes }) => {
        const { className, navShow, customText, toggler } = attributes;

        // Cambiar clases según el valor de navShow
        const navClass = `navbar-expand-${navShow}`;

        return (
            <div {...useBlockProps()}>
                <BlockControls>
                    {/* Aquí puedes agregar controles de edición, como cambiar el alineado del bloque */}
                </BlockControls>

                {/* Panel de controles en el inspector */}
                <InspectorControls>
                    <PanelBody title={__('Ajustes de Navegación', 'ekiline-block-collection')}>
                        <TextControl
                            label={__('Texto del Menú', 'ekiline-block-collection')}
                            value={customText}
                            onChange={(newText) => setAttributes({ customText: newText })}
                        />
                        <ToggleControl
                            label={__('Mostrar botón de Toggler', 'ekiline-block-collection')}
                            checked={toggler}
                            onChange={() => setAttributes({ toggler: !toggler })}
                        />
                        <TextControl
                            label={__('Clase de Navegación', 'ekiline-block-collection')}
                            value={navShow}
                            onChange={(newNavShow) => setAttributes({ navShow: newNavShow })}
                            help={__('Elije cómo expandir el menú: "lg", "md", "sm", o "none".')}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* Renderizar el bloque de navegación con las clases y valores configurados */}
                <nav className={`navbar ${className} ${navClass}`}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">{customText}</a>
                        {toggler && (
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        )}
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    },
    // Guardar el bloque
    save: ({ attributes }) => {
        const { className, navShow, customText, toggler } = attributes;
        const navClass = `navbar-expand-${navShow}`;
        return (
            <nav className={`navbar ${className} ${navClass}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{customText}</a>
                    {toggler && (
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    )}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Services</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    },
});



import { Button, List, ListItem } from '@wordpress/components';

registerBlockType('ekiline-block-collection/interactive-menu', {
  title: __('Menú Interactivo', 'ekiline-block-collection'),
  category: 'widgets',
  icon: 'menu',
  attributes: {
    menuItems: {
      type: 'array',
      default: [],
    },
    className: {
      type: 'string',
      default: 'navbar',
    },
  },
  // Editar el bloque
  edit: ({ attributes, setAttributes }) => {
    const { menuItems, className } = attributes;

    // Función para agregar un nuevo elemento al menú
    const addMenuItem = () => {
      const newItem = { title: '', url: '' }; // Nuevo ítem del menú vacío
      setAttributes({ menuItems: [...menuItems, newItem] });
    };

    // Función para actualizar un ítem del menú
    const updateMenuItem = (index, field, value) => {
      const updatedItems = [...menuItems];
      updatedItems[index][field] = value;
      setAttributes({ menuItems: updatedItems });
    };

    // Función para eliminar un ítem del menú
    const deleteMenuItem = (index) => {
      const updatedItems = menuItems.filter((_, i) => i !== index);
      setAttributes({ menuItems: updatedItems });
    };

    return (
      <div {...useBlockProps()}>
        <BlockControls>
          {/* Controles adicionales si se requieren */}
        </BlockControls>

        {/* Inspector con controles de configuración */}
        <InspectorControls>
          <PanelBody title={__('Configuración del Menú', 'ekiline-block-collection')}>
            <TextControl
              label={__('Clase de Navegación', 'ekiline-block-collection')}
              value={className}
              onChange={(newClass) => setAttributes({ className: newClass })}
            />
          </PanelBody>
        </InspectorControls>

        {/* Contenido principal del bloque */}
        <div className={`navbar ${className}`}>
          <div className="container-fluid">
            <ul className="navbar-nav">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <input
                    type="text"
                    value={item.title}
                    placeholder={__('Título del enlace', 'ekiline-block-collection')}
                    onChange={(e) => updateMenuItem(index, 'title', e.target.value)}
                  />
                  <input
                    type="url"
                    value={item.url}
                    placeholder={__('URL del enlace', 'ekiline-block-collection')}
                    onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
                  />
                  <Button onClick={() => deleteMenuItem(index)} isDestructive>
                    {__('Eliminar', 'ekiline-block-collection')}
                  </Button>
                </li>
              ))}
            </ul>
            <Button onClick={addMenuItem} isPrimary>
              {__('Agregar Elemento al Menú', 'ekiline-block-collection')}
            </Button>
          </div>
        </div>
      </div>
    );
  },

  // Guardar el bloque
  save: ({ attributes }) => {
    const { menuItems, className } = attributes;

    return (
      <nav className={`navbar ${className}`}>
        <div className="container-fluid">
          <ul className="navbar-nav">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.url} className="nav-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  },
});
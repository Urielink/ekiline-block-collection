import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Notice, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { serialize } from '@wordpress/blocks';

// Helpers: remove Gutenberg block comments and ensure UL has a class
const stripWPBlockComments = (html) => html
  ? html.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '').trim()
  : '';
const ensureUlHasClass = (html, className) => {
  if (!html) return html;
  // if UL already has class attribute
  if (/<ul[^>]*class\s*=\s*["'][^"']*["'][^>]*>/.test(html)) {
    return html.replace(/<ul([^>]*)class\s*=\s*["']([^"']*)["']([^>]*)>/,
      (m, pre, cls, post) => {
        // Ensure no duplicate class, insert className if not present
        const classes = cls.split(' ');
        if (!classes.includes(className)) {
          return `<ul${pre}class="${cls} ${className}".trim()${post}>`.replace('  ', ' ');
        }
        return `<ul${pre}class="${cls}"${post}>`;
      }
    );
  }
  // add class attribute
  return html.replace(/<ul([^>]*)>/, `<ul$1 class="${className}">`);
};

const LIST_TEMPLATE = [
  [ 'core/list', {}, [
    [ 'core/list-item', { content: 'Home' } ],
    [ 'core/list-item', { content: 'Features' } ],
    [ 'core/list-item', { content: 'Pricing' } ],
    [ 'core/list-item', { content: 'Dropdown link' }, [
      [ 'core/list', {}, [
        [ 'core/list-item', { content: 'Action' } ],
        [ 'core/list-item', { content: 'Another action' } ],
        [ 'core/list-item', { content: 'Something else here' } ],
      ] ]
    ] ],
  ] ]
];

const ALLOWED = [ 'core/list' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
  const {
    menuHtml, isEditingMenu,
    navStyle, navShow, navPosition, alignItems,
    container, brandText, targetId
  } = attributes;

  const blockProps = useBlockProps();

  // Obtener los innerBlocks para poder serializar la lista cuando el usuario da "Guardar menú".
  const { getBlocks } = useSelect( ( select ) => {
    const editor = select( blockEditorStore );
    return {
      getBlocks: () => editor.getBlocks( clientId ),
    };
  }, [ clientId ] );

  const { replaceInnerBlocks } = useDispatch( blockEditorStore );

  const handleSaveMenu = () => {
    // Buscamos el primer bloque 'core/list' dentro de este bloque.
    const children = getBlocks();
    const listBlock = children.find( ( b ) => b.name === 'core/list' );
    if ( ! listBlock ) {
      // Si no hay lista, intentamos serializar todo y extraer el <ul>.
      const htmlAll = serialize( children );
      const ul = htmlAll.match( /<ul[\s\S]*<\/ul>/ );
      const cleaned = ensureUlHasClass( stripWPBlockComments( ul ? ul[0] : '' ), 'navbar-nav' );
      setAttributes( {
        menuHtml: cleaned,
        isEditingMenu: false,
      } );
      return;
    }
    // Serializamos SOLO ese bloque lista.
    const ulHtml = serialize( [ listBlock ] );
    // Aseguramos que solo guarde el <ul> (sin comentarios de bloques).
    const matchUl = ulHtml.match( /<ul[\s\S]*<\/ul>/ );
    const cleaned = ensureUlHasClass( stripWPBlockComments( matchUl ? matchUl[0] : '' ), 'navbar-nav' );
    setAttributes( {
      menuHtml: cleaned,
      isEditingMenu: false,
    } );
    // Opcional: limpiar el editor interno para no confundir.
    replaceInnerBlocks( clientId, [], false );
  };

  const handleEditMenu = () => {
    // Cuando vuelve a editar, reinyectamos una lista desde el atributo (si existe)
    // como bloques. Si no existe, dejamos la plantilla.
    setAttributes( { isEditingMenu: true } );
  };

  return (
    <div { ...blockProps }>
      {/* De aquí surge el error */}
      <BlockControls
        group="block"
        controls={[
          {
            icon: 'edit',
            title: __('Editar navegación', 'ekiline'),
            onClick: handleEditMenu,
            isDisabled: isEditingMenu,
          },
          {
            icon: 'yes',
            title: __('Guardar menú', 'ekiline'),
            onClick: handleSaveMenu,
            isDisabled: !isEditingMenu,
          },
        ]}
      />

      <InspectorControls>
        <PanelBody title={ __( 'Comportamiento', 'ekiline' ) } initialOpen={ true }>
          <SelectControl
            label="Estilo"
            value={ navStyle }
            options={[
              { label: 'Colapsable', value: 'collapse' },
              { label: 'Offcanvas', value: 'offcanvas' },
            ]}
            onChange={ (v)=> setAttributes({ navStyle: v }) }
          />
          <SelectControl
            label="Breakpoint"
            value={ navShow }
            options={[
              { label: 'Expand LG', value: ' navbar-expand-lg' },
              { label: 'Expand MD', value: ' navbar-expand-md' },
              { label: 'Expand SM', value: ' navbar-expand-sm' },
              { label: 'Siempre colapsado', value: '' },
            ]}
            onChange={ (v)=> setAttributes({ navShow: v }) }
          />
          <SelectControl
            label={__('Align nav items', 'ekiline-block-collection')}
            value={alignItems}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Center', 'ekiline-block-collection'), value: ' justify-content-md-center' }
            ]}
            onChange={(v) => setAttributes({ alignItems: v })}
          />
          <SelectControl
            label="Posición"
            value={ navPosition }
            options={[
              { label: 'Normal', value: '' },
              { label: 'Fija arriba', value: ' fixed-top' },
              { label: 'Fija abajo', value: ' fixed-bottom' },
              { label: 'Sticky top', value: ' sticky-top' },
            ]}
            onChange={ (v)=> setAttributes({ navPosition: v }) }
          />
          <SelectControl
            label="Container"
            value={ container }
            options={[
              { label: 'container-fluid', value: 'container-fluid' },
              { label: 'container', value: 'container' },
              { label: 'sin contenedor', value: '' },
            ]}
            onChange={ (v)=> setAttributes({ container: v }) }
          />
          <TextControl
            label="Texto de marca"
            value={ brandText }
            onChange={ (v)=> setAttributes({ brandText: v }) }
          />
          <TextControl
            label="ID del target (collapse/offcanvas)"
            value={ targetId }
            onChange={ (v)=> setAttributes({ targetId: v }) }
            help="Debe ser único en la página."
          />
        </PanelBody>
        <PanelBody title={ __( 'Estado', 'ekiline' ) } initialOpen={ false }>
          <Notice status="info" isDismissible={ false }>
            { isEditingMenu
              ? 'Modo edición: usa el bloque Lista para armar el menú y presiona “Guardar menú”.'
              : 'Modo preview: así se verá tu navegación. Usa la barra para editar de nuevo.' }
          </Notice>
        </PanelBody>
      </InspectorControls>

      { isEditingMenu ? (
        <>
          <p><strong>1)</strong> Crea/edita tu menú con <em>Lista</em>. Puedes anidar sublistas para dropdowns.</p>
          <hr className="wp-block-separator"/>
          <InnerBlocks
            allowedBlocks={ ALLOWED }
            templateLock={ false }
            template={ LIST_TEMPLATE }
            renderAppender={ InnerBlocks.ButtonBlockAppender }
          />
          <hr className="wp-block-separator"/>
          <Button variant="primary" onClick={ handleSaveMenu }>
            Guardar menú
          </Button>
        </>
      ) : (
        <>
          <p style={{opacity:.7, marginBottom:'8px'}}>
            Vista previa (usa la barra superior para “Editar navegación”).
          </p>
          {/* Pequeña preview plana: mostramos el HTML crudo de la lista */}
          <div style={{border:'1px dashed #ccc', padding:'8px', borderRadius:'8px'}}>
            <code>{ menuHtml ? menuHtml.replace(/\n/g,' ') : '(sin menú)' }</code>
          </div>
        </>
      ) }
    </div>
  );
}
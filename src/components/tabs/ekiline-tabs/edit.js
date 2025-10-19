import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { replaceSpecialChars } from '../../../shared/collection';
import { TextControl, Button } from '@wordpress/components';

/**
 * Imports the icons used in the block.
 */
import icons from '../../../shared/icons';
const { tabsIcon } = icons;


export default function Edit({ attributes, setAttributes }) {

  // variables predeterminadas.
  const { numberTabs = 3, template, isConfigured = false } = attributes;
  // clase de envoltorio.
  const blockProps = useBlockProps({ className: 'tabs-wrapper' });
  // bloques permitidos.
  const allowedBlocks = [
    'ekiline-block-collection/ekiline-tabs-navbar',
    'ekiline-block-collection/ekiline-tabs-container'
  ];

  // Auxiliar, resuelve la plantilla desde attributes.template
  const resolvedTemplate = Array.isArray(template)
    ? template
    : (() => {
        if (typeof template === 'string' && template.trim()) {
          try {
            const parsedTemplate = JSON.parse(template);
            return Array.isArray(parsedTemplate) ? parsedTemplate : [];
          } catch (error) {
            return [];
          }
        }
        return [];
      })();

  // Función para crear la plantilla dinámica.
  // Devuelve un arreglo de contenidos.
  // Se guarda en attributes.template
  function createTemplate(numberTabs) {
    const newTemplate = [
      [
        'ekiline-block-collection/ekiline-tabs-navbar',
        { className: 'is-style-nav-tabs' },
        Array.from({ length: numberTabs }, (_, index) => [
          'ekiline-block-collection/ekiline-tab-link',
          {
            content: `Tab link ${index + 1}`,
            className: index === 0 ? 'active' : ''
          }
        ])
      ],
      [
        'ekiline-block-collection/ekiline-tabs-container',
        { className: 'tabs-container tab-content' },
        Array.from({ length: numberTabs }, (_, index) => [
          'ekiline-block-collection/ekiline-tab-content',
          {
            className: index === 0 ? 'active show' : '',
            anchor: replaceSpecialChars(`Tab link ${index + 1}`)
          },
          [
            [
              'core/paragraph',
              {
                content: `Tab link ${index + 1} content`
              }
            ]
          ]
        ])
      ]
    ];
    return newTemplate;
  }

  // Estado inicial: si no hay plantilla, mostrar controles
  if (!isConfigured) {
    return (
      <div {...blockProps}>
        <div className='setup-tabs'>
          <div className="components-placeholder__label">
            {tabsIcon}
            <label>{__('Tabs', 'ekiline-block-collection')}</label>
          </div>
          <div class="components-placeholder__instructions">
            {__('Displays content in tab format.', 'ekiline-block-collection')}
          </div>
          <div className='tabs-form'>
            <TextControl
              label={__('Number of tabs', 'ekiline-block-collection')}
              type="number"
              min={2}
              max={30}
              value={numberTabs}
              onChange={(val) => setAttributes({ numberTabs: parseInt(val) || 1 })}
              className="number-tabs"
            />
            <Button
              variant="primary"
              onClick={() => {
                const newTemplate = createTemplate(numberTabs);
                setAttributes({
                  template: newTemplate,
                  isConfigured: true
                });
              }}
              disabled={numberTabs < 2 || numberTabs > 30}
              className="create-tabs"
            >
              {__('Create tabs', 'ekiline-block-collection')}
            </Button>
          </div>
          <label>
            {
              numberTabs < 2 || numberTabs > 30
                ? __('Please enter a number between 2 and 30', 'ekiline-block-collection')
                : __('You can change the number of tabs later by adding or removing tab link and tab content blocks.', 'ekiline-block-collection')
            }
          </label>
        </div>
      </div>
    );
  }

  // Si ya está configurado, mostrar el contenido real
  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={allowedBlocks}
        template={resolvedTemplate}
        // Opcional: bloquea estructura base
        // templateLock="all"
      />
    </div>
  );
}

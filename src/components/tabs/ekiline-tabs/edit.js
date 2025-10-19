import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { replaceSpecialChars } from '../../../shared/collection';
import { TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

  const { numberTabs = 3, template, isConfigured = false } = attributes;
  const blockProps = useBlockProps({ className: 'tabs-wrapper' });

  const allowedBlocks = [
    'ekiline-block-collection/ekiline-tabs-navbar',
    'ekiline-block-collection/ekiline-tabs-container'
  ];

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
            content: `Tab link x${index + 1}`,
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
            className: index === 0 ? 'active show' : 'active',
            anchor: replaceSpecialChars(`Tab link x${index + 1}`),
            content: `Tab link x${index + 1}`
          },
          [
            [
              'core/paragraph',
              {
                content: `Tab link x${index + 1}`
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
        <TextControl
          label={__('Number of tabs', 'ekiline-block-collection')}
          type="number"
          min={2}
          max={30}
          value={numberTabs}
          onChange={(val) => setAttributes({ numberTabs: parseInt(val) || 1 })}
          help={__('Maximum number of tabs to create 30', 'ekiline-block-collection')}
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
        >
          {__('Create tabs', 'ekiline-block-collection')}
        </Button>
      </div>
    );
  }

  console.log(attributes.template)

  // Si ya está configurado, mostrar el contenido real
  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={allowedBlocks}
        template={resolvedTemplate}
        templateLock="all" // Opcional: bloquea estructura base
      />
    </div>
  );
}

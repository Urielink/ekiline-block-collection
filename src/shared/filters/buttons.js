import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, SelectControl, PanelBody } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { Fragment, cloneElement } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

const bsBtnAllowedBlocks = ['core/button', 'core/buttons'];

function addAttributesBsButtonLink(settings) {
  if (bsBtnAllowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      anchorBsComponent: { type: 'string', default: '' },
      selectBsComponent: { type: 'string', default: '' },
      dismissBsComponent: { type: 'boolean', default: true }
    });
  }
  return settings;
}

const withAdvancedControlsBsButtonLink = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes } = props;
    const { dismissBsComponent } = attributes;

    if (bsBtnAllowedBlocks.includes(props.name)) {
      return (
        <Fragment>
          <BlockEdit {...props} />
          {props.attributes.url && (
            <InspectorControls>
              <PanelBody title={__('Link to Block (Ekiline)', 'ekiline-block-collection')} initialOpen>
                <TextControl
                  label={__('Anchor block name', 'ekiline-block-collection')}
                  value={props.attributes.anchorBsComponent}
                  onChange={newData => props.setAttributes({ anchorBsComponent: newData })}
                />
                <SelectControl
                  label={__('Choose block', 'ekiline-block-collection')}
                  value={attributes.selectBsComponent}
                  options={[
                    { label: __('None', 'ekiline-block-collection'), value: '' },
                    { label: __('Collapse', 'ekiline-block-collection'), value: 'collapse' },
                    { label: __('Modal', 'ekiline-block-collection'), value: 'modal' },
                    { label: __('Offcanvas', 'ekiline-block-collection'), value: 'offcanvas' }
                  ]}
                  onChange={(selectBsComponent) => setAttributes({ selectBsComponent })}
                />
                <ToggleControl
                  label={__('Is close button?', 'ekiline-block-collection')}
                  checked={!dismissBsComponent}
                  onChange={() => setAttributes({ dismissBsComponent: !dismissBsComponent })}
                  help={!dismissBsComponent ? __('Yes.', 'ekiline-block-collection') : __('No.', 'ekiline-block-collection')}
                />
              </PanelBody>
            </InspectorControls>
          )}
        </Fragment>
      );
    }

    return <BlockEdit {...props} />;
  };
}, 'withAdvancedControlsBsButtonLink');

function applyExtraClassBsButtonLink(element, block, attributes) {
  const { dismissBsComponent } = attributes;

  if (bsBtnAllowedBlocks.includes(block.name)) {
    if (dismissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url) {
      return cloneElement(element, {}, cloneElement(element.props.children, {
        'data-bs-target': attributes.anchorBsComponent,
        'data-bs-toggle': attributes.selectBsComponent
      }));
    }
    if (!dismissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url) {
      return cloneElement(element, {}, cloneElement(element.props.children, {
        'data-bs-dismiss': attributes.selectBsComponent
      }));
    }
  }

  return element;
}

addFilter('blocks.registerBlockType', 'ekilineBsButtonLinkData/dataAttribute', addAttributesBsButtonLink);
addFilter('editor.BlockEdit', 'ekilineBsButtonLinkData/dataInput', withAdvancedControlsBsButtonLink);
addFilter('blocks.getSaveElement', 'ekilineBsButtonLinkData/dataModified', applyExtraClassBsButtonLink);

const withButtonPopoverPreview = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const { name, attributes, className } = props;
    if (bsBtnAllowedBlocks.includes(name) && attributes.addDataLnkPopover && attributes.url) {
      const additionalClass = 'has-ekiline-popover-preview';
      const newClassName = className ? `${className} ${additionalClass}` : additionalClass;
      return <BlockListBlock {...props} className={newClassName} />;
    }
    return <BlockListBlock {...props} />;
  };
}, 'withButtonPopoverPreview');

addFilter('editor.BlockListBlock', 'ekilineBsButtonLinkData/editorPreview', withButtonPopoverPreview);

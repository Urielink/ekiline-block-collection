import { __ } from '@wordpress/i18n';
import {
	TextControl,
	SelectControl,
	ToggleControl,
	PanelBody
} from '@wordpress/components';
import { Fragment, cloneElement } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
/**
 * Lista de bloques permitidos para aplicar popovers.
 */
export const allowedBlocks = ['core/button', 'core/buttons'];

/**
 * Agrega atributos personalizados al bloque permitido.
 */
function addAttributesLnkPopover(settings) {
	if (allowedBlocks.includes(settings.name)) {
		settings.attributes = Object.assign(settings.attributes, {
			addDataLnkPopover: { type: 'string', default: '' },
			addPositionLnkPopover: { type: 'string', default: 'auto' },
			defineTooltip: { type: 'boolean', default: false }
		});
	}
	return settings;
}

/**
 * Crea controles adicionales en el inspector del bloque.
 */
const withAdvancedControlsBtnCollapse = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!allowedBlocks.includes(props.name)) return <BlockEdit {...props} />;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{props.attributes.url && (
					<InspectorControls>
						<PanelBody title={__('Button to Popover (Ekiline)', 'ekiline-block-collection')} initialOpen>
							<TextControl
								label={__('Popover text to show.', 'ekiline-block-collection')}
								value={props.attributes.addDataLnkPopover}
								onChange={(value) => props.setAttributes({ addDataLnkPopover: value })}
							/>
							<SelectControl
								label={__('Popover position', 'ekiline-block-collection')}
								value={props.attributes.addPositionLnkPopover}
								options={[
									{ label: __('Auto', 'ekiline-block-collection'), value: 'auto' },
									{ label: __('Top', 'ekiline-block-collection'), value: 'top' },
									{ label: __('Right', 'ekiline-block-collection'), value: 'right' },
									{ label: __('Bottom', 'ekiline-block-collection'), value: 'bottom' },
									{ label: __('Left', 'ekiline-block-collection'), value: 'left' }
								]}
								onChange={(value) => props.setAttributes({ addPositionLnkPopover: value })}
							/>
							<ToggleControl
								label={__('Is tooltip', 'ekiline-block-collection')}
								checked={props.attributes.defineTooltip}
								onChange={(value) => props.setAttributes({ defineTooltip: value })}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, 'withAdvancedControlsBtnCollapse');

/**
 * Aplica los atributos al HTML final guardado.
 */
function applyExtraClassLnkPopover(element, block, attributes) {
	if (!allowedBlocks.includes(block.name)) return element;

	const { addDataLnkPopover, addPositionLnkPopover, defineTooltip, url, text } = attributes;

	if (addDataLnkPopover && url && text?.text) {
		return cloneElement(
			element,
			{},
			cloneElement(element.props.children, {
				'data-bs-content': addDataLnkPopover,
				'data-bs-toggle': defineTooltip ? 'tooltip' : 'popover',
				'data-bs-placement': addPositionLnkPopover,
				title: defineTooltip ? addDataLnkPopover : text.text
			})
		);
	}

	return element;
}

// Hooks
addFilter('blocks.registerBlockType', 'ekilineLnkPopoverData/dataAttribute', addAttributesLnkPopover);
addFilter('editor.BlockEdit', 'ekilineLnkPopoverData/dataInput', withAdvancedControlsBtnCollapse);
addFilter('blocks.getSaveElement', 'ekilineLnkPopoverData/dataModified', applyExtraClassLnkPopover);

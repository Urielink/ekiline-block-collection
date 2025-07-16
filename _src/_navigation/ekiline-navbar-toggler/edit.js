import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const edit = (props) => {
	const { attributes, setAttributes, context } = props;

	const blockProps = useBlockProps({
		className: 'editor-navbar-toggler'
	});

	if (!attributes.parentAnchor) {
		setAttributes({ parentAnchor: context['ekiline-navbar/anchor'] });
	}
	if (!attributes.anchor) {
		setAttributes({ anchor: context['ekiline-navbar/anchor'] + 'Toggler' });
	}
	setAttributes({ parentNavStyle: context['ekiline-navbar/navStyle'] });

	return (
		<button {...blockProps}>
			<span className='dashicons dashicons-menu' />
		</button>
	);
};

export default edit;
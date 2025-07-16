import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = ({ attributes }) => {
	const blockProps = useBlockProps.save({
		className: 'navbar-toggler',
		'data-bs-toggle': attributes.parentNavStyle,
		'data-bs-target': '#' + attributes.parentAnchor + 'Child',
		'aria-controls': attributes.parentAnchor + 'Child',
		'aria-expanded': (attributes.parentNavStyle !== 'offcanvas') ? 'false' : null,
		'aria-label': __('Toggle navigation', 'ekiline-block-collection')
	});

	return (
		<button {...blockProps}>
			<span className='navbar-toggler-icon' />
		</button>
	);
};

export default save;
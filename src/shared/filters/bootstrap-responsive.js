/**
 * Filtro global: Responsividad Bootstrap
 *
 * Agrega un panel "Responsivo Bootstrap" al InspectorControls de todos los bloques
 * que soporten la propiedad `className`. Permite aplicar clases CSS de Bootstrap para:
 *  - Visibilidad por breakpoint (d-none, d-sm-block, etc.)
 *  - Columnas de grid por breakpoint (col-12, col-md-6, etc.)
 *  - Dirección flex y orden por breakpoint (flex-column, flex-md-row, order-md-first, etc.)
 *
 * Las clases generadas se almacenan en el atributo estándar `className` del bloque,
 * por lo que son compatibles con bloques estáticos y dinámicos (PHP render_callback).
 */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// ── Breakpoints ────────────────────────────────────────────────────────────────
const BREAKPOINTS = [
	{ id: 'xs',  prefix: '',    label: 'xs',  hint: '<576px'  },
	{ id: 'sm',  prefix: 'sm',  label: 'sm',  hint: '≥576px'  },
	{ id: 'md',  prefix: 'md',  label: 'md',  hint: '≥768px'  },
	{ id: 'lg',  prefix: 'lg',  label: 'lg',  hint: '≥992px'  },
	{ id: 'xl',  prefix: 'xl',  label: 'xl',  hint: '≥1200px' },
	{ id: 'xxl', prefix: 'xxl', label: 'xxl', hint: '≥1400px' },
];

// Construye nombre de clase Bootstrap con prefijo de breakpoint.
// bpCls('d', 'sm', 'none') → 'd-sm-none'
// bpCls('d', '',   'none') → 'd-none'
function bpCls( ...parts ) {
	return parts.filter( Boolean ).join( '-' );
}

// ── Generadores de clases ───────────────────────────────────────────────────────

function generateVisibilityClasses( visibility = {} ) {
	const classes = [];
	let currentState = 'show';

	for ( const { id, prefix } of BREAKPOINTS ) {
		const desired = visibility[ id ] || '';
		if ( ! desired || desired === currentState ) continue;

		if ( desired === 'hide' ) {
			classes.push( bpCls( 'd', prefix, 'none' ) );
		} else {
			classes.push( bpCls( 'd', prefix, 'block' ) );
		}
		currentState = desired;
	}
	return classes.join( ' ' );
}

function generateColumnClasses( columns = {} ) {
	return BREAKPOINTS
		.filter( ( { id } ) => columns[ id ] )
		.map( ( { id, prefix } ) =>
			bpCls( 'col', prefix, columns[ id ] )
		)
		.join( ' ' );
}

function generateFlexClasses( flex = {} ) {
	const classes = [];
	for ( const { id, prefix } of BREAKPOINTS ) {
		const { direction = '', order = '' } = flex[ id ] || {};
		if ( direction ) classes.push( bpCls( 'flex', prefix, direction ) );
		if ( order !== '' ) classes.push( bpCls( 'order', prefix, order ) );
	}
	return classes.join( ' ' );
}

function generateAllResponsiveClasses( bootstrapResponsive = {} ) {
	const { visibility = {}, columns = {}, flex = {} } = bootstrapResponsive;
	return [
		generateVisibilityClasses( visibility ),
		generateColumnClasses( columns ),
		generateFlexClasses( flex ),
	].filter( Boolean ).join( ' ' );
}

// ── Limpieza de clases anteriores en className ─────────────────────────────────
const RESPONSIVE_PATTERNS = [
	// display: d-none, d-sm-none, d-md-block, d-xl-flex, etc.
	/\bd-(?:(?:xs|sm|md|lg|xl|xxl)-)?(?:none|block|flex|inline(?:-flex)?|grid)\b/g,
	// columns: col-6, col-sm-6, col-md-auto, etc.
	/\bcol-(?:(?:xs|sm|md|lg|xl|xxl)-)?(?:auto|\d{1,2})\b/g,
	// flex direction: flex-row, flex-md-column, flex-column-reverse, etc.
	/\bflex-(?:(?:xs|sm|md|lg|xl|xxl)-)?(?:row|column|row-reverse|column-reverse)\b/g,
	// order: order-first, order-md-last, order-1, etc.
	/\border-(?:(?:xs|sm|md|lg|xl|xxl)-)?(?:first|last|\d)\b/g,
];

function removeResponsiveClasses( className = '' ) {
	let result = className;
	for ( const pattern of RESPONSIVE_PATTERNS ) {
		result = result.replace( pattern, '' );
	}
	return result.replace( /\s+/g, ' ' ).trim();
}

// ── Opciones de los controles ──────────────────────────────────────────────────
const VISIBILITY_OPTIONS = [
	{ label: '—', value: '' },
	{ label: __( 'Visible', 'ekiline-block-collection' ), value: 'show' },
	{ label: __( 'Oculto', 'ekiline-block-collection' ),  value: 'hide' },
];

const COLUMN_OPTIONS = [
	{ label: '—', value: '' },
	{ label: 'Auto', value: 'auto' },
	...Array.from( { length: 12 }, ( _, i ) => ( { label: String( i + 1 ), value: String( i + 1 ) } ) ),
];

const DIRECTION_OPTIONS = [
	{ label: '—', value: '' },
	{ label: 'row',            value: 'row' },
	{ label: 'column',         value: 'column' },
	{ label: 'row-reverse',    value: 'row-reverse' },
	{ label: 'column-reverse', value: 'column-reverse' },
];

const ORDER_OPTIONS = [
	{ label: '—',      value: '' },
	{ label: 'first',  value: 'first' },
	{ label: 'last',   value: 'last' },
	...Array.from( { length: 6 }, ( _, i ) => ( { label: String( i ), value: String( i ) } ) ),
];

// ── Atributo ───────────────────────────────────────────────────────────────────
addFilter(
	'blocks.registerBlockType',
	'ekiline/bootstrap-responsive-attributes',
	( settings ) => {
		// Excluir bloques que deshabilitan className explícitamente.
		if ( settings.supports?.className === false ) return settings;

		return {
			...settings,
			attributes: {
				...settings.attributes,
				bootstrapResponsive: {
					type: 'object',
					default: {},
				},
			},
		};
	}
);

// ── HOC: InspectorControls ─────────────────────────────────────────────────────
const withBootstrapResponsive = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;

		// Bloques sin className (ej. core/html) no reciben el atributo.
		if ( ! Object.prototype.hasOwnProperty.call( attributes, 'bootstrapResponsive' ) ) {
			return <BlockEdit { ...props } />;
		}

		const { bootstrapResponsive = {}, className = '' } = attributes;
		const { visibility = {}, columns = {}, flex = {} } = bootstrapResponsive;

		// Actualiza el atributo `bootstrapResponsive` Y regenera `className`.
		const updateResponsive = ( newResponsive ) => {
			const newClasses  = generateAllResponsiveClasses( newResponsive );
			const base        = removeResponsiveClasses( className );
			const newClassName = [ base, newClasses ].filter( Boolean ).join( ' ' ).trim();
			setAttributes( { bootstrapResponsive: newResponsive, className: newClassName } );
		};

		const setVisibility = ( bp, value ) =>
			updateResponsive( { ...bootstrapResponsive, visibility: { ...visibility, [ bp ]: value } } );

		const setColumns = ( bp, value ) =>
			updateResponsive( { ...bootstrapResponsive, columns: { ...columns, [ bp ]: value } } );

		const setFlex = ( bp, key, value ) =>
			updateResponsive( {
				...bootstrapResponsive,
				flex: { ...flex, [ bp ]: { ...( flex[ bp ] || {} ), [ key ]: value } },
			} );

		const generatedClasses = generateAllResponsiveClasses( bootstrapResponsive );
		const panelIsOpen      = !! generatedClasses;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Responsivo Bootstrap', 'ekiline-block-collection' ) }
						initialOpen={ panelIsOpen }
					>

						{ /* ── Visibilidad ─────────────────────────────── */ }
						<p style={ sectionLabelStyle }>
							{ __( 'Visibilidad', 'ekiline-block-collection' ) }
						</p>
						{ BREAKPOINTS.map( ( { id, label, hint } ) => (
							<SelectControl
								key={ id }
								label={ `${ label } (${ hint })` }
								value={ visibility[ id ] || '' }
								options={ VISIBILITY_OPTIONS }
								onChange={ ( val ) => setVisibility( id, val ) }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						) ) }

						{ /* ── Columnas ─────────────────────────────────── */ }
						<p style={ { ...sectionLabelStyle, marginTop: '16px' } }>
							{ __( 'Columnas grid', 'ekiline-block-collection' ) }
						</p>
						{ BREAKPOINTS.map( ( { id, label, hint } ) => (
							<SelectControl
								key={ id }
								label={ `${ label } (${ hint })` }
								value={ columns[ id ] || '' }
								options={ COLUMN_OPTIONS }
								onChange={ ( val ) => setColumns( id, val ) }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						) ) }

						{ /* ── Flex / Orden ──────────────────────────────── */ }
						<p style={ { ...sectionLabelStyle, marginTop: '16px' } }>
							{ __( 'Flex / Orden', 'ekiline-block-collection' ) }
						</p>
						{ BREAKPOINTS.map( ( { id, label, hint } ) => (
							<Fragment key={ id }>
								<SelectControl
									label={ `${ __( 'Dirección', 'ekiline-block-collection' ) } ${ label } (${ hint })` }
									value={ flex[ id ]?.direction || '' }
									options={ DIRECTION_OPTIONS }
									onChange={ ( val ) => setFlex( id, 'direction', val ) }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
								<SelectControl
									label={ `${ __( 'Orden', 'ekiline-block-collection' ) } ${ label } (${ hint })` }
									value={ flex[ id ]?.order ?? '' }
									options={ ORDER_OPTIONS }
									onChange={ ( val ) => setFlex( id, 'order', val ) }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
							</Fragment>
						) ) }

						{ /* ── Preview de clases generadas ──────────────── */ }
						{ generatedClasses && (
							<p style={ classPreviewStyle }>
								{ generatedClasses }
							</p>
						) }

					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withBootstrapResponsive' );

addFilter(
	'editor.BlockEdit',
	'ekiline/bootstrap-responsive',
	withBootstrapResponsive
);

// ── Estilos inline del panel ───────────────────────────────────────────────────
const sectionLabelStyle = {
	margin: '0 0 8px',
	fontWeight: 600,
	fontSize: '11px',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
	color: '#1e1e1e',
};

const classPreviewStyle = {
	marginTop: '12px',
	padding: '8px',
	background: '#f0f0f1',
	borderRadius: '4px',
	fontSize: '11px',
	fontFamily: 'monospace',
	wordBreak: 'break-all',
	color: '#1e1e1e',
};

/**
 * Review sidebar panels: Gasp Factor sliders, Triggers and Related reviews.
 * Plain browser JS on the wp.* globals so the plugin ships with no build step.
 */
( function ( wp ) {
	const { createElement: el, Fragment, useMemo, useRef, useState } = wp.element;
	const { __, sprintf } = wp.i18n;
	const { registerPlugin } = wp.plugins;
	const { PluginDocumentSettingPanel } = wp.editor;
	const { RangeControl, TextControl, FormTokenField } = wp.components;
	const { useSelect, useDispatch } = wp.data;
	const { decodeEntities } = wp.htmlEntities || { decodeEntities: ( s ) => s };

	const STATS = [
		{ key: 'gasp_suspense', label: __( 'Suspense', 'gasp-reviews' ), help: __( 'How long it keeps you on the edge of your seat.', 'gasp-reviews' ) },
		{ key: 'gasp_scariness', label: __( 'Scariness', 'gasp-reviews' ), help: __( 'How much it makes you jump, wince or sleep with the light on.', 'gasp-reviews' ) },
		{ key: 'gasp_bloodiness', label: __( 'Bloodiness', 'gasp-reviews' ), help: __( 'How much gore is on screen.', 'gasp-reviews' ) },
	];
	const STAT_DEFAULT = 50;
	const RELATED_MAX = 3;
	// Without this the REST API only returns published reviews, so linked drafts would vanish from the field.
	const ANY_STATUS = [ 'publish', 'future', 'draft', 'pending', 'private' ];

	// Mirrors gasp_reviews_calculate_score() in includes/gasp-factor.php.
	const calculateScore = ( values ) => ( values.reduce( ( sum, v ) => sum + v, 0 ) / values.length / 10 ).toFixed( 2 );

	function useMeta() {
		const meta = useSelect( ( select ) => select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {}, [] );
		const { editPost } = useDispatch( 'core/editor' );
		const setMeta = ( key, value ) => editPost( { meta: { [ key ]: value } } );
		return [ meta, setMeta ];
	}

	function GaspFactorPanel() {
		const [ meta, setMeta ] = useMeta();
		const values = STATS.map( ( s ) => meta[ s.key ] ?? STAT_DEFAULT );

		return el(
			PluginDocumentSettingPanel,
			{ name: 'gasp-factor', title: __( 'Gasp Factor', 'gasp-reviews' ), initialOpen: true },
			el(
				'p',
				{ style: { fontSize: 32, lineHeight: 1, margin: '0 0 4px', fontWeight: 600 } },
				calculateScore( values )
			),
			el( 'p', { style: { margin: '0 0 16px', color: '#757575' } }, __( 'Worked out from the three scores below.', 'gasp-reviews' ) ),
			STATS.map( ( s, i ) =>
				el( RangeControl, {
					key: s.key,
					label: s.label,
					help: s.help,
					value: values[ i ],
					min: 1,
					max: 100,
					onChange: ( v ) => setMeta( s.key, v ?? STAT_DEFAULT ),
					__nextHasNoMarginBottom: true,
				} )
			)
		);
	}

	function TriggersPanel() {
		const [ meta, setMeta ] = useMeta();
		return el(
			PluginDocumentSettingPanel,
			{ name: 'gasp-triggers', title: __( 'Triggers', 'gasp-reviews' ) },
			el( TextControl, {
				label: __( 'Content warnings', 'gasp-reviews' ),
				help: __( 'Separate with commas, e.g. haunted house, self-harm, animal death', 'gasp-reviews' ),
				value: meta.gasp_triggers || '',
				onChange: ( v ) => setMeta( 'gasp_triggers', v ),
				__nextHasNoMarginBottom: true,
			} )
		);
	}

	function RelatedPanel() {
		const [ meta, setMeta ] = useMeta();
		const [ search, setSearch ] = useState( '' );
		const titleToId = useRef( new Map() );
		const ids = meta.gasp_related || [];

		const { currentId, selected, suggestions } = useSelect(
			( select ) => {
				const core = select( 'core' );
				const id = select( 'core/editor' ).getCurrentPostId();
				return {
					currentId: id,
					selected: ids.length
						? core.getEntityRecords( 'postType', 'review', { include: ids, status: ANY_STATUS, per_page: ids.length, _fields: 'id,title' } )
						: [],
					suggestions: core.getEntityRecords( 'postType', 'review', { search, exclude: [ id ], status: ANY_STATUS, per_page: 20, _fields: 'id,title' } ),
				};
			},
			[ search, ids.join( ',' ) ]
		);

		const titleOf = ( record ) => decodeEntities( record.title.rendered || record.title.raw || '' );
		[ ...( selected || [] ), ...( suggestions || [] ) ].forEach( ( r ) => titleToId.current.set( titleOf( r ), r.id ) );

		const value = useMemo( () => {
			const byId = new Map( ( selected || [] ).map( ( r ) => [ r.id, titleOf( r ) ] ) );
			return ids.map( ( id ) => byId.get( id ) ).filter( Boolean );
		}, [ selected, ids.join( ',' ) ] );

		return el(
			PluginDocumentSettingPanel,
			{ name: 'gasp-related', title: __( 'Related reviews', 'gasp-reviews' ) },
			el( FormTokenField, {
				label: sprintf( __( 'Pick up to %d reviews', 'gasp-reviews' ), RELATED_MAX ),
				value,
				suggestions: ( suggestions || [] ).map( titleOf ),
				maxLength: RELATED_MAX,
				onInputChange: setSearch,
				onChange: ( titles ) =>
					setMeta(
						'gasp_related',
						titles.map( ( t ) => titleToId.current.get( t ) ).filter( ( id ) => id && id !== currentId )
					),
				__experimentalShowHowTo: false,
				__nextHasNoMarginBottom: true,
			} ),
			el( 'p', { style: { color: '#757575', marginTop: 8 } }, __( 'Leave empty to show the latest reviews instead.', 'gasp-reviews' ) )
		);
	}

	registerPlugin( 'gasp-reviews', {
		render: () => el( Fragment, null, el( GaspFactorPanel ), el( TriggersPanel ), el( RelatedPanel ) ),
	} );
} )( window.wp );

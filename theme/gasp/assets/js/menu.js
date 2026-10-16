/**
 * Mobile menu toggle for the header (below 760px). Closes on Escape and when a link is chosen.
 */
( function () {
	const header = document.querySelector( '[data-menu]' );
	const toggle = header && header.querySelector( '[data-menu-toggle]' );
	const nav = toggle && document.getElementById( toggle.getAttribute( 'aria-controls' ) );
	if ( ! nav ) {
		return;
	}

	const setOpen = ( open ) => {
		header.classList.toggle( 'is-open', open );
		toggle.setAttribute( 'aria-expanded', String( open ) );
		nav.hidden = ! open;
	};

	toggle.addEventListener( 'click', () => setOpen( nav.hidden ) );
	nav.addEventListener( 'click', ( event ) => event.target.closest( 'a' ) && setOpen( false ) );
	document.addEventListener( 'keydown', ( event ) => {
		if ( event.key === 'Escape' && ! nav.hidden ) {
			setOpen( false );
			toggle.focus();
		}
	} );
} )();

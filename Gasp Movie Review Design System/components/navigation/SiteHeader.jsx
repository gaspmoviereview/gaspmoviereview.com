import React from 'react';
import { Logo } from '../brand/Logo.jsx';
const DEFAULT_LINKS = ['Reviews', 'About', 'Author', 'Contact'];
export function SiteHeader({ assetBase = '', menuOpen = false, onMenuToggle, links = DEFAULT_LINKS, current, onNavigate, onHome, compact }) {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  React.useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  const mobile = compact ?? w < 760;
  const go = l => e => { e.preventDefault(); onNavigate && onNavigate(l); };
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--surface-chrome)', backdropFilter: 'var(--blur-chrome)', WebkitBackdropFilter: 'var(--blur-chrome)', borderBottom: '1px solid var(--line-1)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', height: 64, padding: '0 var(--gutter)', display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#" onClick={e => { e.preventDefault(); onHome && onHome(); }} title="Back to home"><Logo assetBase={assetBase} width={58} /></a>
        {!mobile && <nav style={{ display: 'flex', gap: 28, marginLeft: 'auto' }}>
          {links.map(l => <a key={l} href="#" onClick={go(l)} style={{ fontSize: 13, fontWeight: 500, letterSpacing: '.02em', color: current === l ? 'var(--fg-1)' : 'var(--fg-2)', position: 'relative', padding: '6px 0' }}>{l}{current === l && <i style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2, background: 'var(--gasp-red)', boxShadow: '0 0 10px var(--gasp-red)' }}></i>}</a>)}
        </nav>}
        {mobile && <button aria-label="Menu" onClick={onMenuToggle} style={{ marginLeft: 'auto', width: 44, height: 44, marginRight: -10, border: 0, background: 'transparent', color: 'var(--fg-1)', fontSize: 24, cursor: 'pointer', display: 'grid', placeItems: 'center' }}><i className={menuOpen ? 'ti ti-x' : 'ti ti-menu-2'}></i></button>}
      </div>
      {mobile && menuOpen && <nav style={{ borderTop: '1px solid var(--line-1)', padding: '12px var(--gutter) 28px' }}>
        {links.map(l => <a key={l} href="#" onClick={go(l)} style={{ display: 'block', padding: '10px 0', fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.05, color: current === l ? 'var(--gasp-red)' : 'var(--fg-1)' }}>{l}</a>)}
      </nav>}
    </header>
  );
}
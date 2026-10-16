import React from 'react';
import { SocialButton } from './SocialButton.jsx';
import { Logo } from '../brand/Logo.jsx';
const LINKS = ['About', 'Reviews', 'Contact'];
const GENRES = ['Action', 'Dark Comedy', 'Drama', 'Horror', 'Mystery', 'Thriller', 'Sci-Fi'];
export function SiteFooter({ assetBase = '', links = LINKS, genres = GENRES, onNavigate }) {
  const h = { margin: '0 0 16px', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-3)' };
  const a = { color: 'var(--fg-2)', fontSize: 14, lineHeight: '28px' };
  const go = l => e => { e.preventDefault(); onNavigate && onNavigate(l); };
  const col = (t, items) => <div><h3 style={h}>{t}</h3><ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>{items.map(l => <li key={l}><a href="#" onClick={go(l)} style={a}>{l}</a></li>)}</ul></div>;
  return (
    <footer style={{ position: 'relative', background: 'var(--surface-footer)', borderTop: '1px solid var(--line-1)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: 0, width: 900, height: 300, transform: 'translate(-50%,-60%)', background: 'radial-gradient(closest-side, rgba(13,58,103,.55), transparent)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: '72px var(--gutter) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40 }}>
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <Logo assetBase={assetBase} width={120} />
            <p style={{ margin: '20px 0 20px', fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.15, color: 'var(--fg-1)', maxWidth: 340 }}>Find films and tv-shows that will make you gasp.</p>
            <SocialButton />
          </div>
          {col('Useful links', links)}{col('Genres', genres)}
        </div>
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: '1px solid var(--line-1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.04em', color: 'var(--fg-3)' }}>
          <span>© Gasp Movie Review</span>
        </div>
      </div>
    </footer>
  );
}
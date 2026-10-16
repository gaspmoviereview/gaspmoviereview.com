import React from 'react';
export function GenreTag({ children, href, onClick, active = false }) {
  const [h, setH] = React.useState(false);
  const on = active || h;
  const st = { display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 14px', borderRadius: 999, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 12, letterSpacing: '.02em', textDecoration: 'none', transition: 'all var(--dur-fast) var(--ease-out)', cursor: href || onClick ? 'pointer' : 'default',
    color: active ? '#fff' : on ? 'var(--fg-1)' : 'var(--fg-2)', background: active ? 'var(--gasp-navy)' : 'rgba(255,255,255,.03)', boxShadow: active ? 'inset 0 0 0 1px var(--gasp-navy-400), 0 0 18px var(--gasp-navy-glow)' : 'inset 0 0 0 1px ' + (on ? 'var(--line-2)' : 'var(--line-1)') };
  const p = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), style: st };
  return href || onClick ? <a href={href || '#'} onClick={onClick} {...p}>{children}</a> : <span {...p}>{children}</span>;
}
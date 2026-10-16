import React from 'react';
export function Button({ children, variant = 'primary', size = 'md', icon, href, onClick, style }) {
  const [h, setH] = React.useState(false);
  const sm = size === 'sm';
  const base = { display: 'inline-flex', alignItems: 'center', gap: 10, height: sm ? 36 : 48, padding: sm ? '0 16px' : '0 24px', borderRadius: 999, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: sm ? 13 : 15, letterSpacing: '.01em', cursor: 'pointer', border: 0, textDecoration: 'none', transition: 'all var(--dur-fast) var(--ease-out)', whiteSpace: 'nowrap' };
  const v = variant === 'primary'
    ? { background: h ? '#ff5a4a' : 'var(--gasp-red)', color: '#fff', boxShadow: h ? '0 0 32px var(--gasp-red-glow)' : '0 0 18px rgba(255,68,51,.3)' }
    : variant === 'ghost'
    ? { background: h ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.03)', color: 'var(--fg-1)', boxShadow: 'inset 0 0 0 1px ' + (h ? 'var(--line-2)' : 'var(--line-1)'), backdropFilter: 'var(--blur-chrome)' }
    : { background: 'transparent', color: h ? 'var(--gasp-red)' : 'var(--fg-1)', padding: 0, height: 'auto' };
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...v, ...style }}>
    {children}{icon && <i className={'ti ti-' + icon} style={{ fontSize: sm ? 15 : 18, transform: h ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-fast) var(--ease-out)' }}></i>}
  </Tag>;
}
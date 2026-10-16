import React from 'react';
export function SocialButton({ icon = 'ti ti-brand-instagram', href = 'https://www.instagram.com/gaspmoviereview', label = 'Instagram' }) {
  const [h, setH] = React.useState(false);
  return <a href={href} title={label} aria-label={label} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ width: 44, height: 44, borderRadius: 999, display: 'inline-grid', placeItems: 'center', fontSize: 20, color: h ? '#fff' : 'var(--fg-1)', background: h ? 'var(--gasp-red)' : 'rgba(255,255,255,.04)', boxShadow: h ? '0 0 22px var(--gasp-red-glow)' : 'inset 0 0 0 1px var(--line-2)', transition: 'all var(--dur-fast) var(--ease-out)' }}><i className={icon}></i></a>;
}
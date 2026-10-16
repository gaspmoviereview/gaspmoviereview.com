import React from 'react';
export function AuthorByline({ name, role, avatar, href, meta }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src={avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flex: 'none', boxShadow: '0 0 0 1px var(--line-2)' }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--fg-1)' }}>{href ? <a href={href}>{name}</a> : name}<span style={{ color: 'var(--fg-3)', fontWeight: 400 }}> · {role}</span></div>
        {meta && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 4, letterSpacing: '.04em' }}>{meta}</div>}
      </div>
    </div>
  );
}
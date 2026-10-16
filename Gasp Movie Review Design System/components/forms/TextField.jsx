import React from 'react';
export function TextField({ label, name, value, onChange, type = 'text', multiline = false, rows = 6, hint, error, placeholder, required }) {
  const [f, setF] = React.useState(false);
  const ring = error ? 'var(--gasp-red)' : f ? 'var(--gasp-navy-400)' : 'var(--line-2)';
  const glow = error ? ', 0 0 0 4px rgba(255,68,51,.14)' : f ? ', 0 0 0 4px var(--gasp-navy-glow)' : '';
  const field = { width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,.03)', border: 0, outline: 'none', borderRadius: 10, boxShadow: 'inset 0 0 0 1px ' + ring + glow, color: 'var(--fg-1)', fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.5, padding: multiline ? '14px 16px' : '0 16px', height: multiline ? 'auto' : 48, resize: 'vertical', transition: 'box-shadow var(--dur-fast) var(--ease-out)' };
  const p = { id: name, name, value, onChange, placeholder, required, onFocus: () => setF(true), onBlur: () => setF(false), style: field, 'aria-invalid': !!error };
  return (
    <label htmlFor={name} style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>{label}</span>
      {multiline ? <textarea rows={rows} {...p}></textarea> : <input type={type} {...p} />}
      {(error || hint) && <span style={{ fontSize: 12, color: error ? 'var(--gasp-red)' : 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>{error && <i className="ti ti-alert-circle" style={{ fontSize: 14 }}></i>}{error || hint}</span>}
    </label>
  );
}
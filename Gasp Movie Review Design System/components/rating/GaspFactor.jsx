import React from 'react';
const GASP_STATS = [
  { key: 'suspense', icon: 'fa-regular fa-face-grimace', label: 'Suspense' },
  { key: 'scariness', icon: 'fa-regular fa-face-surprise', label: 'Scariness' },
  { key: 'bloodiness', icon: 'ti ti-droplets', label: 'Bloodiness' },
];
const mono = { fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '.04em' };
export function GaspFactor({ score, suspense, scariness, bloodiness, size = 'full', caption = 'Average of suspense, scariness and bloodiness' }) {
  const vals = { suspense, scariness, bloodiness };
  const s = Number(score).toFixed(2);
  if (size === 'badge') return (
    <span title={'Gasp Factor ' + s} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 30, padding: '0 12px 0 10px', borderRadius: 999, background: 'rgba(5,8,13,.66)', backdropFilter: 'var(--blur-chrome)', boxShadow: 'inset 0 0 0 1px var(--line-2)', color: 'var(--fg-1)', ...mono, fontSize: 13 }}>
      <i style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--gasp-red)', boxShadow: '0 0 10px var(--gasp-red), 0 0 2px var(--gasp-red)' }}></i>{s}
    </span>);
  if (size === 'compact') return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 18 }}>
      {GASP_STATS.map(st => <li key={st.key} title={st.label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-2)', ...mono, fontSize: 12 }}>
        <i className={st.icon} style={{ fontSize: 15, color: 'var(--fg-2)' }}></i>{vals[st.key]}%
      </li>)}
    </ul>);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,auto) minmax(0,1fr)', gap: 'clamp(24px,5vw,64px)', alignItems: 'center', color: 'var(--fg-1)' }}>
      <div>
        <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gasp-red)' }}>Gasp Factor</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(88px,12vw,128px)', lineHeight: .9, marginTop: 10, textShadow: '0 0 40px rgba(255,68,51,.35)' }}>{s}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 10, maxWidth: 200 }}>{caption}</div>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {GASP_STATS.map(st => <li key={st.key}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <i className={st.icon} style={{ fontSize: 20, width: 22, textAlign: 'center' }}></i>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{st.label}</span>
            <span style={{ marginLeft: 'auto', ...mono, fontSize: 13, color: 'var(--gasp-red)' }}>{vals[st.key]}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, background: 'var(--line-1)', overflow: 'hidden' }}>
            <div style={{ width: vals[st.key] + '%', height: '100%', borderRadius: 999, background: 'var(--gasp-red)', boxShadow: '0 0 12px var(--gasp-red-glow)' }}></div>
          </div>
        </li>)}
      </ul>
    </div>);
}
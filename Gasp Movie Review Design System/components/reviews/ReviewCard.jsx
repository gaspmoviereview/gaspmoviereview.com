import React from 'react';
import { GaspFactor } from '../rating/GaspFactor.jsx';
export function ReviewCard({ title, excerpt, image, href = '#', onClick, gasp, style }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', flexDirection: 'column', color: 'var(--fg-1)', background: h ? 'var(--surface-card-hover)' : 'var(--surface-card)', borderRadius: 14, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px ' + (h ? 'var(--line-2)' : 'var(--line-1)') + ', var(--shadow-card)', transition: 'all var(--dur-base) var(--ease-out)', ...style }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#000' }}>
        <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: h ? 'scale(1.04)' : 'scale(1)', transition: 'transform var(--dur-slow) var(--ease-out)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-card)' }}></div>
        {gasp && <div style={{ position: 'absolute', top: 12, right: 12 }}><GaspFactor size="badge" {...gasp} /></div>}
      </div>
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.08, textWrap: 'balance' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{excerpt}</p>
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {gasp ? <GaspFactor size="compact" {...gasp} /> : <span></span>}
          <i className="ti ti-arrow-up-right" style={{ fontSize: 18, color: h ? 'var(--gasp-red)' : 'var(--fg-2)', transition: 'color var(--dur-fast)' }}></i>
        </div>
      </div>
    </a>
  );
}
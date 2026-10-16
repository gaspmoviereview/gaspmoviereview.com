import React from 'react';
import { GaspFactor } from '../rating/GaspFactor.jsx';
export function Hero({ image, eyebrow = 'Latest review', title, excerpt, gasp, actions, minHeight = 'min(86vh, 760px)' }) {
  return (
    <section style={{ position: 'relative', minHeight, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#000' }}>
      <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,8,13,.7), rgba(5,8,13,0) 60%)' }}></div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 'var(--container)', margin: '0 auto', padding: '120px var(--gutter) clamp(40px,7vw,88px)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gasp-red)' }}>{eyebrow}</span>
          {gasp && <GaspFactor size="badge" {...gasp} />}
        </div>
        <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,9vw,120px)', lineHeight: 1.02, letterSpacing: '-.01em', color: 'var(--fg-1)', maxWidth: 900, textWrap: 'balance' }}>{title}</h1>
        {excerpt && <p style={{ margin: '20px 0 0', fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: 560, textWrap: 'pretty' }}>{excerpt}</p>}
        {actions && <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>{actions}</div>}
      </div>
    </section>
  );
}
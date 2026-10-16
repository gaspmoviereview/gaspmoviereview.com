function AboutScreen({ onOpen }) {
  const { GaspFactor, Button } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const a = window.GASP_ABOUT;
  const ex = window.GASP_REVIEWS[0];
  const defs = [
    ['fa-regular fa-face-grimace', 'Suspense', 'How long it keeps you on the edge of your seat.'],
    ['fa-regular fa-face-surprise', 'Scariness', 'Jump scares, dread and pillow-hiding moments.'],
    ['ti ti-droplets', 'Bloodiness', 'How much of the red stuff ends up on screen.'],
  ];
  return (<main>
    <section style={{ position: 'relative', minHeight: 'min(70vh, 620px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#000' }}>
      <img src={a.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }}></div>
      <div style={{ position: 'relative', width: '100%', ...gaspPage, paddingTop: 120, paddingBottom: 48, boxSizing: 'border-box' }}>
        <p style={gaspEyebrow}>About</p>
        <h1 style={{ ...gaspTitle, marginTop: 18, maxWidth: 900 }}>Films that will make you <em>gasp.</em></h1>
      </div>
    </section>
    <section style={{ ...gaspPage, paddingTop: 'clamp(56px,8vw,96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,6vw,96px)' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.3, color: 'var(--fg-1)', textWrap: 'pretty' }}>{a.intro}</p>
      <div>{a.body.map((p, i) => <p key={i} style={{ margin: '0 0 20px', fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: 'var(--fg-2)' }}>{p}</p>)}
        <div style={{ marginTop: 28 }}><Button icon="arrow-right" onClick={e => { e.preventDefault(); onOpen('reviews'); }}>Browse reviews</Button></div>
      </div>
    </section>
    <section style={{ ...gaspPage, paddingTop: 'clamp(80px,10vw,128px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <div style={{ position: 'relative', borderRadius: 20, background: 'var(--surface-panel)', boxShadow: 'inset 0 0 0 1px var(--line-1)', overflow: 'hidden', padding: 'clamp(28px,5vw,64px)' }}>
        <div style={{ position: 'absolute', right: -160, top: -160, width: 520, height: 520, background: 'radial-gradient(closest-side, rgba(13,58,103,.6), transparent)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
          <div>
            <p style={gaspEyebrow}>What is the Gasp Factor?</p>
            <p style={{ margin: '18px 0 0', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)' }}>{a.gasp}</p>
            <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {defs.map(([ic, t, dsc]) => <li key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <i className={ic} style={{ fontSize: 22, width: 24, textAlign: 'center', color: 'var(--fg-1)', marginTop: 2 }}></i>
                <div><div style={{ fontWeight: 500, fontSize: 15, color: 'var(--fg-1)' }}>{t}</div><div style={{ fontSize: 14, color: 'var(--fg-3)', marginTop: 2 }}>{dsc}</div></div>
              </li>)}
            </ul>
          </div>
          <div style={{ paddingTop: 8 }}>
            <GaspFactor {...ex.gasp} caption={'e.g. ' + ex.title} />
          </div>
        </div>
      </div>
    </section>
  </main>);
}
window.AboutScreen = AboutScreen;
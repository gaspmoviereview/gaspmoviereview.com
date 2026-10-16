function AuthorScreen({ onOpen }) {
  const { ReviewCard, SocialButton } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const a = window.GASP_AUTHOR;
  return (<main>
    <section style={{ ...gaspPage, paddingTop: 'clamp(64px,9vw,120px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px,6vw,96px)', alignItems: 'start' }}>
      <div style={{ position: 'relative', maxWidth: 440 }}>
        <div style={{ position: 'absolute', inset: '-10%', background: 'radial-gradient(closest-side, rgba(13,58,103,.55), transparent)', pointerEvents: 'none' }}></div>
        <img src={a.photo} alt={a.name} style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 20, boxShadow: 'inset 0 0 0 1px var(--line-1), var(--shadow-card)' }} />
      </div>
      <div>
        <p style={gaspEyebrow}>Author</p>
        <h1 style={{ ...gaspTitle, marginTop: 18 }}>{a.name}</h1>
        <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--fg-2)' }}>{a.role}</p>
        <div style={{ marginTop: 32 }}>{a.bio.map((p, i) => <p key={i} style={{ margin: '0 0 20px', fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: 620 }}>{p}</p>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}><SocialButton /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>@gaspmoviereview</span></div>
      </div>
    </section>
    <section style={{ ...gaspPage, paddingTop: 'clamp(80px,10vw,128px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--line-1)', paddingBottom: 18, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 40, color: 'var(--fg-1)' }}>Reviews by Ania</h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.04em', color: 'var(--fg-3)' }}>{String(window.GASP_REVIEWS.length).padStart(2, '0')} films</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {window.GASP_REVIEWS.map(r => <ReviewCard key={r.slug} title={r.title} excerpt={r.excerpt} image={r.image} gasp={r.gasp} onClick={e => { e.preventDefault(); onOpen(r.slug); }} />)}
      </div>
    </section>
  </main>);
}
window.AuthorScreen = AuthorScreen;
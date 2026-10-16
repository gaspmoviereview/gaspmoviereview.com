function HomeScreen({ onOpen }) {
  const { Hero, ReviewCard, Button } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [lead, ...rest] = window.GASP_REVIEWS;
  const open = s => e => { e.preventDefault(); onOpen(s); };
  return (<main>
    <Hero image={lead.feature} title={lead.title} excerpt={lead.excerpt} gasp={lead.gasp}
      actions={<><Button icon="arrow-right" onClick={open(lead.slug)}>Read review</Button><Button variant="ghost" onClick={open('reviews')}>All reviews</Button></>} />
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(64px,9vw,128px) var(--gutter) 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px,5vw,80px)', alignItems: 'end' }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.02, letterSpacing: '-.01em', color: 'var(--fg-1)', textWrap: 'balance' }}>Reviews from the <em style={{ color: 'var(--gasp-red)' }}>darkest corners</em> of cinema.</h2>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', maxWidth: 520, textWrap: 'pretty' }}>Your independent haven for horror and thrillers: the films that keep you on the edge of your seat and leave you gasping for more. Every review gets a Gasp Factor for suspense, scariness and bloodiness.</p>
    </section>
    <section id="latest" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--gutter) clamp(80px,10vw,140px)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--line-1)', paddingBottom: 18, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>Latest reviews</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.04em', color: 'var(--fg-3)' }}>{String(window.GASP_REVIEWS.length).padStart(2, '0')} films</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {rest.map(r => <ReviewCard key={r.slug} title={r.title} excerpt={r.excerpt} image={r.image} gasp={r.gasp} onClick={open(r.slug)} />)}
      </div>
    </section>
  </main>);
}
window.HomeScreen = HomeScreen;
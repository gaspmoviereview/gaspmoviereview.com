function ReviewScreen({ slug, onOpen }) {
  const { AuthorByline, GaspFactor, GenreTag, ReviewCard } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const all = window.GASP_REVIEWS;
  const r0 = all.find(r => r.slug === slug) || all[0];
  const r = { ...r0, body: r0.body || [], feature: r0.feature || r0.image, related: r0.related || all.filter(x => x.slug !== r0.slug).slice(0, 3).map(x => x.slug) };
  const col = { maxWidth: 'var(--measure)', margin: '0 auto', padding: '0 var(--gutter)' };
  const eyebrow = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-3)', margin: '0 0 16px', fontWeight: 500 };
  const m = r.title.match(/^(.*)\s(\(\d{4}\))$/);
  return (<main>
    <section style={{ position: 'relative', minHeight: 'min(78vh, 680px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#000' }}>
      <img src={r.feature} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }}></div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 'var(--container)', margin: '0 auto', padding: '120px var(--gutter) 48px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>{(r.genres || []).map(gn => <GenreTag key={gn} onClick={e => { e.preventDefault(); onOpen('genre:' + gn); }}>{gn}</GenreTag>)}</div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(52px,8vw,112px)', lineHeight: 1.0, letterSpacing: '-.01em', color: 'var(--fg-1)' }}>{m ? <>{m[1]} <em style={{ color: 'var(--fg-2)' }}>{m[2]}</em></> : r.title}</h1>
        <div style={{ marginTop: 28 }}><AuthorByline name="Ania Twardowska" role="Writer and film enthusiast" avatar="../../assets/author-ania.jpg" meta={r.published ? r.published + ' · Updated ' + r.updated : undefined} /></div>
      </div>
    </section>
    <div style={{ ...col, paddingTop: 56 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(24px,2.6vw,30px)', lineHeight: 1.35, color: 'var(--fg-1)', textWrap: 'pretty' }}>{r.excerpt}</p>
      {r.body.length > 0 && <div style={{ marginTop: 40 }}>{r.body.map((p, i) => <p key={i} style={{ margin: '0 0 22px', fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: 'var(--fg-2)' }}>{p}</p>)}</div>}
      {r.alsoLike && <p style={{ margin: '32px 0 0', fontSize: 15, color: 'var(--fg-2)' }}><span style={{ color: 'var(--fg-3)' }}>You might also like: </span>{r.alsoLike.map(([t, y], i) => <span key={t} style={{ color: 'var(--fg-1)' }}><em style={{ fontFamily: 'var(--font-display)', fontSize: 19 }}>{t}</em> ({y}){i < r.alsoLike.length - 1 ? ', ' : ''}</span>)}</p>}
    </div>
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '64px var(--gutter) 0' }}>
      <div style={{ position: 'relative', padding: 'clamp(28px,5vw,48px)', borderRadius: 20, background: 'var(--surface-panel)', boxShadow: 'inset 0 0 0 1px var(--line-1)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -120, top: -120, width: 420, height: 420, background: 'radial-gradient(closest-side, rgba(13,58,103,.6), transparent)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative' }}><GaspFactor {...r.gasp} /></div>
      </div>
      {r.triggers && <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 24, paddingTop: 24, borderTop: '1px solid var(--line-1)' }}>
        <div><h3 style={eyebrow}>Triggers</h3><p style={{ margin: 0, fontSize: 15, color: 'var(--fg-1)' }}>{r.triggers}</p></div>
              </div>}
    </div>
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(80px,10vw,128px) var(--gutter)' }}>
      <h2 style={{ margin: '0 0 28px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 40, color: 'var(--fg-1)' }}>Related reviews</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {r.related.map(s => all.find(x => x.slug === s)).filter(Boolean).map(x => <ReviewCard key={x.slug} title={x.title} excerpt={x.excerpt} image={x.image} gasp={x.gasp} onClick={e => { e.preventDefault(); onOpen(x.slug); }} />)}
      </div>
    </section>
  </main>);
}
window.ReviewScreen = ReviewScreen;
const SORTS = [
  { id: 'latest', label: 'Latest' },
  { id: 'score', label: 'Highest Gasp', key: 'score' },
  { id: 'suspense', label: 'Most suspense', key: 'suspense', icon: 'fa-regular fa-face-grimace' },
  { id: 'scariness', label: 'Scariest', key: 'scariness', icon: 'fa-regular fa-face-surprise' },
  { id: 'bloodiness', label: 'Bloodiest', key: 'bloodiness', icon: 'ti ti-droplets' },
];
function ReviewsScreen({ genre, onOpen }) {
  const { ReviewCard, GenreTag } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [sort, setSort] = React.useState('latest');
  const all = window.GASP_REVIEWS;
  const count = g => all.filter(r => (r.genres || []).includes(g)).length;
  let list = genre ? all.filter(r => (r.genres || []).includes(genre)) : all.slice();
  const s = SORTS.find(x => x.id === sort);
  if (s.key) list = list.slice().sort((a, b) => b.gasp[s.key] - a.gasp[s.key]);
  const go = t => e => { e.preventDefault(); onOpen(t); };
  const label = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-3)', minWidth: 64 };
  return (<main>
    <PageIntro eyebrow={genre ? 'Genre' : 'Reviews'} title={genre ? genre + ' reviews' : 'All reviews'}
      lede={genre ? list.length + ' ' + (list.length === 1 ? 'film' : 'films') + ' tagged ' + genre.toLowerCase() + '. Sort by what you’re in the mood for.' : 'Find the right film for your mood: filter by genre, then sort by how suspenseful, scary or bloody you want your night to be.'} />
    <div style={{ position: 'sticky', top: 64, zIndex: 10, background: 'var(--surface-chrome)', backdropFilter: 'var(--blur-chrome)', WebkitBackdropFilter: 'var(--blur-chrome)', borderTop: '1px solid var(--line-1)', borderBottom: '1px solid var(--line-1)' }}>
      <div style={{ ...gaspPage, paddingTop: 14, paddingBottom: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto' }}>
          <span style={label}>Genre</span>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            <GenreTag active={!genre} onClick={go('reviews')}>All · {all.length}</GenreTag>
            {window.GASP_GENRES.map(g => { const n = count(g); return n ? <GenreTag key={g} active={genre === g} onClick={go('genre:' + g)}>{g} · {n}</GenreTag> : null; })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto' }}>
          <span style={label}>Sort</span>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            {SORTS.map(x => <GenreTag key={x.id} active={sort === x.id} onClick={e => { e.preventDefault(); setSort(x.id); }}>{x.icon && <i className={x.icon} style={{ marginRight: 6, fontSize: 13 }}></i>}{x.label}</GenreTag>)}
          </div>
        </div>
      </div>
    </div>
    <section style={{ ...gaspPage, paddingTop: 32, paddingBottom: 'clamp(80px,10vw,140px)' }}>
      {list.length ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {list.map(r => <ReviewCard key={r.slug} title={r.title} excerpt={r.excerpt} image={r.image} gasp={r.gasp} onClick={go(r.slug)} />)}
      </div> : <p style={{ color: 'var(--fg-2)' }}>No reviews in this genre yet.</p>}
    </section>
  </main>);
}
window.ReviewsScreen = ReviewsScreen;
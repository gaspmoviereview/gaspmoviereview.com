const gaspPage = { maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' };
const gaspEyebrow = { fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gasp-red)', margin: 0 };
const gaspTitle = { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(52px,8vw,104px)', lineHeight: 1, letterSpacing: '-.01em', color: 'var(--fg-1)', textWrap: 'balance' };
function PageIntro({ eyebrow, title, lede, children }) {
  return <header style={{ ...gaspPage, paddingTop: 'clamp(64px,9vw,120px)', paddingBottom: 40 }}>
    <p style={gaspEyebrow}>{eyebrow}</p>
    <h1 style={{ ...gaspTitle, marginTop: 18 }}>{title}</h1>
    {lede && <p style={{ margin: '22px 0 0', maxWidth: 620, fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.6, color: 'var(--fg-2)', textWrap: 'pretty' }}>{lede}</p>}
    {children}
  </header>;
}
Object.assign(window, { PageIntro, gaspPage, gaspEyebrow, gaspTitle });
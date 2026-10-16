function ContactScreen() {
  const { TextField, Button, SocialButton } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [v, setV] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [tried, setTried] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const errs = {
    name: v.name.trim().length < 3 && 'Minimum 3 letters',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) && 'Must be a valid email',
    subject: v.subject.trim().length < 3 && 'Minimum 3 letters',
    message: v.message.trim().length < 3 && 'Minimum 3 letters',
  };
  const ok = !Object.values(errs).some(Boolean);
  const set = k => e => setV({ ...v, [k]: e.target.value });
  const f = k => ({ name: k, value: v[k], onChange: set(k), error: tried ? errs[k] || undefined : undefined, hint: k === 'email' ? 'Must be a valid email' : 'Minimum 3 letters' });
  const submit = e => { e.preventDefault(); setTried(true); if (ok) setSent(true); };
  return (<main>
    <PageIntro eyebrow="Contact" title="Contact us" lede="Have questions? Want to get in touch? Have a great film recommendation? You’re in the right place!" />
    <section style={{ ...gaspPage, paddingBottom: 'clamp(80px,10vw,140px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,6vw,96px)', alignItems: 'start' }}>
      <div style={{ position: 'relative', borderRadius: 20, background: 'var(--surface-panel)', boxShadow: 'inset 0 0 0 1px var(--line-1)', padding: 'clamp(24px,4vw,40px)', gridColumn: 'span 1' }}>
        {sent ? <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <i className="ti ti-circle-check" style={{ fontSize: 40, color: 'var(--gasp-red)', textShadow: '0 0 20px var(--gasp-red-glow)' }}></i>
          <h2 style={{ margin: '16px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 40, color: 'var(--fg-1)' }}>Message sent.</h2>
          <p style={{ margin: '10px 0 24px', color: 'var(--fg-2)' }}>Thanks, {v.name.split(' ')[0]}. We’ll get back to you soon.</p>
          <Button variant="ghost" size="sm" onClick={() => { setSent(false); setTried(false); setV({ name: '', email: '', subject: '', message: '' }); }}>Send another</Button>
        </div> : <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, color: 'var(--fg-1)' }}>Get in touch</h2>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--fg-3)' }}>Use the form below to get in contact with us for any reason at all.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <TextField label="Name" {...f('name')} />
            <TextField label="Email" type="email" {...f('email')} />
          </div>
          <TextField label="Subject" {...f('subject')} />
          <TextField label="Message" multiline {...f('message')} />
          <div><Button icon="arrow-right">Send message</Button></div>
        </form>}
      </div>
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 8 }}>
        <div>
          <p style={{ ...gaspEyebrow, color: 'var(--fg-3)' }}>Recommend a film</p>
          <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.3, color: 'var(--fg-1)' }}>Seen something that made you gasp? Tell us, and it might get the Gasp Factor treatment.</p>
        </div>
        <div style={{ borderTop: '1px solid var(--line-1)', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <SocialButton />
          <div><div style={{ fontWeight: 500, fontSize: 14, color: 'var(--fg-1)' }}>Follow me</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>@gaspmoviereview</div></div>
        </div>
      </aside>
    </section>
  </main>);
}
window.ContactScreen = ContactScreen;
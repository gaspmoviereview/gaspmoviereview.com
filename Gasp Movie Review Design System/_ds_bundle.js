/* @ds-bundle: {"format":4,"namespace":"GaspMovieReviewDesignSystem_ad6a6f","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Hero","sourcePath":"components/layout/Hero.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"SocialButton","sourcePath":"components/navigation/SocialButton.jsx"},{"name":"GaspFactor","sourcePath":"components/rating/GaspFactor.jsx"},{"name":"AuthorByline","sourcePath":"components/reviews/AuthorByline.jsx"},{"name":"ReviewCard","sourcePath":"components/reviews/ReviewCard.jsx"},{"name":"GenreTag","sourcePath":"components/tags/GenreTag.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"031fd28ef8fb","components/brand/Logo.jsx":"ead9626fad23","components/forms/TextField.jsx":"185dbf12cf1a","components/layout/Hero.jsx":"e122cd0952ce","components/navigation/SiteFooter.jsx":"83689ed567c6","components/navigation/SiteHeader.jsx":"7d213e919555","components/navigation/SocialButton.jsx":"1518802207a4","components/rating/GaspFactor.jsx":"d2ebc84e03c1","components/reviews/AuthorByline.jsx":"0e7880512a52","components/reviews/ReviewCard.jsx":"1a4ff05936c3","components/tags/GenreTag.jsx":"52c47eea9a62","ui_kits/website/AboutScreen.jsx":"1372b835aaf8","ui_kits/website/AuthorScreen.jsx":"2d34138804b9","ui_kits/website/ContactScreen.jsx":"b512b64efe4f","ui_kits/website/HomeScreen.jsx":"288c490da0ad","ui_kits/website/PageIntro.jsx":"6843fd6e05af","ui_kits/website/ReviewScreen.jsx":"835bca83f553","ui_kits/website/ReviewsScreen.jsx":"105fe415c71c","ui_kits/website/data.js":"e9e22e6d7b4b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GaspMovieReviewDesignSystem_ad6a6f = window.GaspMovieReviewDesignSystem_ad6a6f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  const sm = size === 'sm';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    height: sm ? 36 : 48,
    padding: sm ? '0 16px' : '0 24px',
    borderRadius: 999,
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: sm ? 13 : 15,
    letterSpacing: '.01em',
    cursor: 'pointer',
    border: 0,
    textDecoration: 'none',
    transition: 'all var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap'
  };
  const v = variant === 'primary' ? {
    background: h ? '#ff5a4a' : 'var(--gasp-red)',
    color: '#fff',
    boxShadow: h ? '0 0 32px var(--gasp-red-glow)' : '0 0 18px rgba(255,68,51,.3)'
  } : variant === 'ghost' ? {
    background: h ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.03)',
    color: 'var(--fg-1)',
    boxShadow: 'inset 0 0 0 1px ' + (h ? 'var(--line-2)' : 'var(--line-1)'),
    backdropFilter: 'var(--blur-chrome)'
  } : {
    background: 'transparent',
    color: h ? 'var(--gasp-red)' : 'var(--fg-1)',
    padding: 0,
    height: 'auto'
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...v,
      ...style
    }
  }, children, icon && /*#__PURE__*/React.createElement("i", {
    className: 'ti ti-' + icon,
    style: {
      fontSize: sm ? 15 : 18,
      transform: h ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function Logo({
  variant = 'light',
  width = 64,
  assetBase = '',
  alt = 'Gasp Movie Review',
  style
}) {
  const src = assetBase + (variant === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png');
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width,
      height: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 6,
  hint,
  error,
  placeholder,
  required
}) {
  const [f, setF] = React.useState(false);
  const ring = error ? 'var(--gasp-red)' : f ? 'var(--gasp-navy-400)' : 'var(--line-2)';
  const glow = error ? ', 0 0 0 4px rgba(255,68,51,.14)' : f ? ', 0 0 0 4px var(--gasp-navy-glow)' : '';
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,.03)',
    border: 0,
    outline: 'none',
    borderRadius: 10,
    boxShadow: 'inset 0 0 0 1px ' + ring + glow,
    color: 'var(--fg-1)',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    lineHeight: 1.5,
    padding: multiline ? '14px 16px' : '0 16px',
    height: multiline ? 'auto' : 48,
    resize: 'vertical',
    transition: 'box-shadow var(--dur-fast) var(--ease-out)'
  };
  const p = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    required,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: field,
    'aria-invalid': !!error
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--fg-2)'
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, p)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, p)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--gasp-red)' : 'var(--fg-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, error && /*#__PURE__*/React.createElement("i", {
    className: "ti ti-alert-circle",
    style: {
      fontSize: 14
    }
  }), error || hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
const DEFAULT_LINKS = ['Reviews', 'About', 'Author', 'Contact'];
function SiteHeader({
  assetBase = '',
  menuOpen = false,
  onMenuToggle,
  links = DEFAULT_LINKS,
  current,
  onNavigate,
  onHome,
  compact
}) {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  React.useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const mobile = compact ?? w < 760;
  const go = l => e => {
    e.preventDefault();
    onNavigate && onNavigate(l);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--surface-chrome)',
      backdropFilter: 'var(--blur-chrome)',
      WebkitBackdropFilter: 'var(--blur-chrome)',
      borderBottom: '1px solid var(--line-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      height: 64,
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onHome && onHome();
    },
    title: "Back to home"
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    assetBase: assetBase,
    width: 58
  })), !mobile && /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      marginLeft: 'auto'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: go(l),
    style: {
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: '.02em',
      color: current === l ? 'var(--fg-1)' : 'var(--fg-2)',
      position: 'relative',
      padding: '6px 0'
    }
  }, l, current === l && /*#__PURE__*/React.createElement("i", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -2,
      height: 2,
      borderRadius: 2,
      background: 'var(--gasp-red)',
      boxShadow: '0 0 10px var(--gasp-red)'
    }
  })))), mobile && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Menu",
    onClick: onMenuToggle,
    style: {
      marginLeft: 'auto',
      width: 44,
      height: 44,
      marginRight: -10,
      border: 0,
      background: 'transparent',
      color: 'var(--fg-1)',
      fontSize: 24,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: menuOpen ? 'ti ti-x' : 'ti ti-menu-2'
  }))), mobile && menuOpen && /*#__PURE__*/React.createElement("nav", {
    style: {
      borderTop: '1px solid var(--line-1)',
      padding: '12px var(--gutter) 28px'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: go(l),
    style: {
      display: 'block',
      padding: '10px 0',
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      lineHeight: 1.05,
      color: current === l ? 'var(--gasp-red)' : 'var(--fg-1)'
    }
  }, l))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SocialButton.jsx
try { (() => {
function SocialButton({
  icon = 'ti ti-brand-instagram',
  href = 'https://www.instagram.com/gaspmoviereview',
  label = 'Instagram'
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    title: label,
    "aria-label": label,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      display: 'inline-grid',
      placeItems: 'center',
      fontSize: 20,
      color: h ? '#fff' : 'var(--fg-1)',
      background: h ? 'var(--gasp-red)' : 'rgba(255,255,255,.04)',
      boxShadow: h ? '0 0 22px var(--gasp-red-glow)' : 'inset 0 0 0 1px var(--line-2)',
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon
  }));
}
Object.assign(__ds_scope, { SocialButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SocialButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
const LINKS = ['About', 'Reviews', 'Contact'];
const GENRES = ['Action', 'Dark Comedy', 'Drama', 'Horror', 'Mystery', 'Thriller', 'Sci-Fi'];
function SiteFooter({
  assetBase = '',
  links = LINKS,
  genres = GENRES,
  onNavigate
}) {
  const h = {
    margin: '0 0 16px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: 'var(--fg-3)'
  };
  const a = {
    color: 'var(--fg-2)',
    fontSize: 14,
    lineHeight: '28px'
  };
  const go = l => e => {
    e.preventDefault();
    onNavigate && onNavigate(l);
  };
  const col = (t, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: h
  }, t), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, items.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go(l),
    style: a
  }, l)))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'relative',
      background: 'var(--surface-footer)',
      borderTop: '1px solid var(--line-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      width: 900,
      height: 300,
      transform: 'translate(-50%,-60%)',
      background: 'radial-gradient(closest-side, rgba(13,58,103,.55), transparent)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '72px var(--gutter) 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 2',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    assetBase: assetBase,
    width: 120
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 20px',
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      lineHeight: 1.15,
      color: 'var(--fg-1)',
      maxWidth: 340
    }
  }, "Find films and tv-shows that will make you gasp."), /*#__PURE__*/React.createElement(__ds_scope.SocialButton, null)), col('Useful links', links), col('Genres', genres)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 20,
      borderTop: '1px solid var(--line-1)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.04em',
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Gasp Movie Review"), /*#__PURE__*/React.createElement("a", {
    href: "https://paulsingh.dev",
    style: {
      color: 'inherit'
    }
  }, "Made by Paul Singh"))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/rating/GaspFactor.jsx
try { (() => {
const GASP_STATS = [{
  key: 'suspense',
  icon: 'fa-regular fa-face-grimace',
  label: 'Suspense'
}, {
  key: 'scariness',
  icon: 'fa-regular fa-face-surprise',
  label: 'Scariness'
}, {
  key: 'bloodiness',
  icon: 'ti ti-droplets',
  label: 'Bloodiness'
}];
const mono = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  letterSpacing: '.04em'
};
function GaspFactor({
  score,
  suspense,
  scariness,
  bloodiness,
  size = 'full',
  caption = 'Average of suspense, scariness and bloodiness'
}) {
  const vals = {
    suspense,
    scariness,
    bloodiness
  };
  const s = Number(score).toFixed(2);
  if (size === 'badge') return /*#__PURE__*/React.createElement("span", {
    title: 'Gasp Factor ' + s,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 30,
      padding: '0 12px 0 10px',
      borderRadius: 999,
      background: 'rgba(5,8,13,.66)',
      backdropFilter: 'var(--blur-chrome)',
      boxShadow: 'inset 0 0 0 1px var(--line-2)',
      color: 'var(--fg-1)',
      ...mono,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--gasp-red)',
      boxShadow: '0 0 10px var(--gasp-red), 0 0 2px var(--gasp-red)'
    }
  }), s);
  if (size === 'compact') return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      gap: 18
    }
  }, GASP_STATS.map(st => /*#__PURE__*/React.createElement("li", {
    key: st.key,
    title: st.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--fg-2)',
      ...mono,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: st.icon,
    style: {
      fontSize: 15,
      color: 'var(--fg-2)'
    }
  }), vals[st.key], "%")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,auto) minmax(0,1fr)',
      gap: 'clamp(24px,5vw,64px)',
      alignItems: 'center',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--gasp-red)'
    }
  }, "Gasp Factor"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(88px,12vw,128px)',
      lineHeight: .9,
      marginTop: 10,
      textShadow: '0 0 40px rgba(255,68,51,.35)'
    }
  }, s), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-3)',
      marginTop: 10,
      maxWidth: 200
    }
  }, caption)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, GASP_STATS.map(st => /*#__PURE__*/React.createElement("li", {
    key: st.key
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: st.icon,
    style: {
      fontSize: 20,
      width: 22,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, st.label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      ...mono,
      fontSize: 13,
      color: 'var(--gasp-red)'
    }
  }, vals[st.key], "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 999,
      background: 'var(--line-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: vals[st.key] + '%',
      height: '100%',
      borderRadius: 999,
      background: 'var(--gasp-red)',
      boxShadow: '0 0 12px var(--gasp-red-glow)'
    }
  }))))));
}
Object.assign(__ds_scope, { GaspFactor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/rating/GaspFactor.jsx", error: String((e && e.message) || e) }); }

// components/layout/Hero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Hero({
  image,
  eyebrow = 'Latest review',
  title,
  excerpt,
  gasp,
  actions,
  minHeight = 'min(86vh, 760px)'
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(5,8,13,.7), rgba(5,8,13,0) 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '120px var(--gutter) clamp(40px,7vw,88px)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--gasp-red)'
    }
  }, eyebrow), gasp && /*#__PURE__*/React.createElement(__ds_scope.GaspFactor, _extends({
    size: "badge"
  }, gasp))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '18px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(56px,9vw,120px)',
      lineHeight: 1.02,
      letterSpacing: '-.01em',
      color: 'var(--fg-1)',
      maxWidth: 900,
      textWrap: 'balance'
    }
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      fontSize: 'clamp(15px,1.4vw,18px)',
      lineHeight: 1.55,
      color: 'var(--fg-2)',
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, excerpt), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, actions)));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Hero.jsx", error: String((e && e.message) || e) }); }

// components/reviews/AuthorByline.jsx
try { (() => {
function AuthorByline({
  name,
  role,
  avatar,
  href,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "",
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      objectFit: 'cover',
      flex: 'none',
      boxShadow: '0 0 0 1px var(--line-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 14,
      color: 'var(--fg-1)'
    }
  }, href ? /*#__PURE__*/React.createElement("a", {
    href: href
  }, name) : name, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)',
      fontWeight: 400
    }
  }, " \xB7 ", role)), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-3)',
      marginTop: 4,
      letterSpacing: '.04em'
    }
  }, meta)));
}
Object.assign(__ds_scope, { AuthorByline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reviews/AuthorByline.jsx", error: String((e && e.message) || e) }); }

// components/reviews/ReviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ReviewCard({
  title,
  excerpt,
  image,
  href = '#',
  onClick,
  gasp,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--fg-1)',
      background: h ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px ' + (h ? 'var(--line-2)' : 'var(--line-1)') + ', var(--shadow-card)',
      transition: 'all var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 10',
      overflow: 'hidden',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: h ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-card)'
    }
  }), gasp && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.GaspFactor, _extends({
    size: "badge"
  }, gasp)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 28,
      lineHeight: 1.08,
      textWrap: 'balance'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--fg-2)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 14,
      borderTop: '1px solid var(--line-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, gasp ? /*#__PURE__*/React.createElement(__ds_scope.GaspFactor, _extends({
    size: "compact"
  }, gasp)) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("i", {
    className: "ti ti-arrow-up-right",
    style: {
      fontSize: 18,
      color: h ? 'var(--gasp-red)' : 'var(--fg-2)',
      transition: 'color var(--dur-fast)'
    }
  }))));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reviews/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/tags/GenreTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GenreTag({
  children,
  href,
  onClick,
  active = false
}) {
  const [h, setH] = React.useState(false);
  const on = active || h;
  const st = {
    display: 'inline-flex',
    alignItems: 'center',
    height: 30,
    padding: '0 14px',
    borderRadius: 999,
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: '.02em',
    textDecoration: 'none',
    transition: 'all var(--dur-fast) var(--ease-out)',
    cursor: href || onClick ? 'pointer' : 'default',
    color: active ? '#fff' : on ? 'var(--fg-1)' : 'var(--fg-2)',
    background: active ? 'var(--gasp-navy)' : 'rgba(255,255,255,.03)',
    boxShadow: active ? 'inset 0 0 0 1px var(--gasp-navy-400), 0 0 18px var(--gasp-navy-glow)' : 'inset 0 0 0 1px ' + (on ? 'var(--line-2)' : 'var(--line-1)')
  };
  const p = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: st
  };
  return href || onClick ? /*#__PURE__*/React.createElement("a", _extends({
    href: href || '#',
    onClick: onClick
  }, p), children) : /*#__PURE__*/React.createElement("span", p, children);
}
Object.assign(__ds_scope, { GenreTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tags/GenreTag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AboutScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AboutScreen({
  onOpen
}) {
  const {
    GaspFactor,
    Button
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const a = window.GASP_ABOUT;
  const ex = window.GASP_REVIEWS[0];
  const defs = [['fa-regular fa-face-grimace', 'Suspense', 'How long it keeps you on the edge of your seat.'], ['fa-regular fa-face-surprise', 'Scariness', 'Jump scares, dread and pillow-hiding moments.'], ['ti ti-droplets', 'Bloodiness', 'How much of the red stuff ends up on screen.']];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(70vh, 620px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: a.image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      ...gaspPage,
      paddingTop: 120,
      paddingBottom: 48,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: gaspEyebrow
  }, "About"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...gaspTitle,
      marginTop: 18,
      maxWidth: 900
    }
  }, "Films that will make you ", /*#__PURE__*/React.createElement("em", null, "gasp.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingTop: 'clamp(56px,8vw,96px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(32px,6vw,96px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(26px,3vw,36px)',
      lineHeight: 1.3,
      color: 'var(--fg-1)',
      textWrap: 'pretty'
    }
  }, a.intro), /*#__PURE__*/React.createElement("div", null, a.body.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 20px',
      fontWeight: 300,
      fontSize: 17,
      lineHeight: 1.75,
      color: 'var(--fg-2)'
    }
  }, p)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: "arrow-right",
    onClick: e => {
      e.preventDefault();
      onOpen('reviews');
    }
  }, "Browse reviews")))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingTop: 'clamp(80px,10vw,128px)',
      paddingBottom: 'clamp(80px,10vw,140px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 20,
      background: 'var(--surface-panel)',
      boxShadow: 'inset 0 0 0 1px var(--line-1)',
      overflow: 'hidden',
      padding: 'clamp(28px,5vw,64px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -160,
      top: -160,
      width: 520,
      height: 520,
      background: 'radial-gradient(closest-side, rgba(13,58,103,.6), transparent)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: gaspEyebrow
  }, "What is the Gasp Factor?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--fg-2)'
    }
  }, a.gasp), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '32px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, defs.map(([ic, t, dsc]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: ic,
    style: {
      fontSize: 22,
      width: 24,
      textAlign: 'center',
      color: 'var(--fg-1)',
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 15,
      color: 'var(--fg-1)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg-3)',
      marginTop: 2
    }
  }, dsc)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(GaspFactor, _extends({}, ex.gasp, {
    caption: 'e.g. ' + ex.title
  })))))));
}
window.AboutScreen = AboutScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AuthorScreen.jsx
try { (() => {
function AuthorScreen({
  onOpen
}) {
  const {
    ReviewCard,
    SocialButton
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const a = window.GASP_AUTHOR;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingTop: 'clamp(64px,9vw,120px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(32px,6vw,96px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-10%',
      background: 'radial-gradient(closest-side, rgba(13,58,103,.55), transparent)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: a.photo,
    alt: a.name,
    style: {
      position: 'relative',
      display: 'block',
      width: '100%',
      aspectRatio: '4 / 5',
      objectFit: 'cover',
      borderRadius: 20,
      boxShadow: 'inset 0 0 0 1px var(--line-1), var(--shadow-card)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: gaspEyebrow
  }, "Author"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...gaspTitle,
      marginTop: 18
    }
  }, a.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 26,
      color: 'var(--fg-2)'
    }
  }, a.role), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, a.bio.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 20px',
      fontWeight: 300,
      fontSize: 17,
      lineHeight: 1.75,
      color: 'var(--fg-2)',
      maxWidth: 620
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(SocialButton, null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, "@gaspmoviereview")))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingTop: 'clamp(80px,10vw,128px)',
      paddingBottom: 'clamp(80px,10vw,140px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--line-1)',
      paddingBottom: 18,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--fg-1)'
    }
  }, "Reviews by Ania"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.04em',
      color: 'var(--fg-3)'
    }
  }, String(window.GASP_REVIEWS.length).padStart(2, '0'), " films")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 24
    }
  }, window.GASP_REVIEWS.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    gasp: r.gasp,
    onClick: e => {
      e.preventDefault();
      onOpen(r.slug);
    }
  })))));
}
window.AuthorScreen = AuthorScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AuthorScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ContactScreen() {
  const {
    TextField,
    Button,
    SocialButton
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [v, setV] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [tried, setTried] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const errs = {
    name: v.name.trim().length < 3 && 'Minimum 3 letters',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) && 'Must be a valid email',
    subject: v.subject.trim().length < 3 && 'Minimum 3 letters',
    message: v.message.trim().length < 3 && 'Minimum 3 letters'
  };
  const ok = !Object.values(errs).some(Boolean);
  const set = k => e => setV({
    ...v,
    [k]: e.target.value
  });
  const f = k => ({
    name: k,
    value: v[k],
    onChange: set(k),
    error: tried ? errs[k] || undefined : undefined,
    hint: k === 'email' ? 'Must be a valid email' : 'Minimum 3 letters'
  });
  const submit = e => {
    e.preventDefault();
    setTried(true);
    if (ok) setSent(true);
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageIntro, {
    eyebrow: "Contact",
    title: "Contact us",
    lede: "Have questions? Want to get in touch? Have a great film recommendation? You\u2019re in the right place!"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingBottom: 'clamp(80px,10vw,140px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(32px,6vw,96px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 20,
      background: 'var(--surface-panel)',
      boxShadow: 'inset 0 0 0 1px var(--line-1)',
      padding: 'clamp(24px,4vw,40px)',
      gridColumn: 'span 1'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ti ti-circle-check",
    style: {
      fontSize: 40,
      color: 'var(--gasp-red)',
      textShadow: '0 0 20px var(--gasp-red-glow)'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '16px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--fg-1)'
    }
  }, "Message sent."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 24px',
      color: 'var(--fg-2)'
    }
  }, "Thanks, ", v.name.split(' ')[0], ". We\u2019ll get back to you soon."), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setSent(false);
      setTried(false);
      setV({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 32,
      color: 'var(--fg-1)'
    }
  }, "Get in touch"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      color: 'var(--fg-3)'
    }
  }, "Use the form below to get in contact with us for any reason at all.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, _extends({
    label: "Name"
  }, f('name'))), /*#__PURE__*/React.createElement(TextField, _extends({
    label: "Email",
    type: "email"
  }, f('email')))), /*#__PURE__*/React.createElement(TextField, _extends({
    label: "Subject"
  }, f('subject'))), /*#__PURE__*/React.createElement(TextField, _extends({
    label: "Message",
    multiline: true
  }, f('message'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    icon: "arrow-right"
  }, "Send message")))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      ...gaspEyebrow,
      color: 'var(--fg-3)'
    }
  }, "Recommend a film"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 28,
      lineHeight: 1.3,
      color: 'var(--fg-1)'
    }
  }, "Seen something that made you gasp? Tell us, and it might get the Gasp Factor treatment.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line-1)',
      paddingTop: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SocialButton, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 14,
      color: 'var(--fg-1)'
    }
  }, "Follow me"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, "@gaspmoviereview"))))));
}
window.ContactScreen = ContactScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function HomeScreen({
  onOpen
}) {
  const {
    Hero,
    ReviewCard,
    Button
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [lead, ...rest] = window.GASP_REVIEWS;
  const open = s => e => {
    e.preventDefault();
    onOpen(s);
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    image: lead.feature,
    title: lead.title,
    excerpt: lead.excerpt,
    gasp: lead.gasp,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      icon: "arrow-right",
      onClick: open(lead.slug)
    }, "Read review"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: open('reviews')
    }, "All reviews"))
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'clamp(64px,9vw,128px) var(--gutter) 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(24px,5vw,80px)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(40px,5vw,64px)',
      lineHeight: 1.02,
      letterSpacing: '-.01em',
      color: 'var(--fg-1)',
      textWrap: 'balance'
    }
  }, "Reviews from the ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--gasp-red)'
    }
  }, "darkest corners"), " of cinema."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--fg-2)',
      maxWidth: 520,
      textWrap: 'pretty'
    }
  }, "Your independent haven for horror and thrillers: the films that keep you on the edge of your seat and leave you gasping for more. Every review gets a Gasp Factor for suspense, scariness and bloodiness.")), /*#__PURE__*/React.createElement("section", {
    id: "latest",
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'clamp(56px,7vw,96px) var(--gutter) clamp(80px,10vw,140px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--line-1)',
      paddingBottom: 18,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, "Latest reviews"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.04em',
      color: 'var(--fg-3)'
    }
  }, String(window.GASP_REVIEWS.length).padStart(2, '0'), " films")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 24
    }
  }, rest.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    gasp: r.gasp,
    onClick: open(r.slug)
  })))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PageIntro.jsx
try { (() => {
const gaspPage = {
  maxWidth: 'var(--container)',
  margin: '0 auto',
  padding: '0 var(--gutter)'
};
const gaspEyebrow = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--gasp-red)',
  margin: 0
};
const gaspTitle = {
  margin: 0,
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(52px,8vw,104px)',
  lineHeight: 1,
  letterSpacing: '-.01em',
  color: 'var(--fg-1)',
  textWrap: 'balance'
};
function PageIntro({
  eyebrow,
  title,
  lede,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      ...gaspPage,
      paddingTop: 'clamp(64px,9vw,120px)',
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: gaspEyebrow
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...gaspTitle,
      marginTop: 18
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 0',
      maxWidth: 620,
      fontSize: 'clamp(16px,1.4vw,18px)',
      lineHeight: 1.6,
      color: 'var(--fg-2)',
      textWrap: 'pretty'
    }
  }, lede), children);
}
Object.assign(window, {
  PageIntro,
  gaspPage,
  gaspEyebrow,
  gaspTitle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PageIntro.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ReviewScreen.jsx
try { (() => {
function ReviewScreen({
  slug,
  onOpen
}) {
  const {
    AuthorByline,
    GaspFactor,
    GenreTag,
    ReviewCard
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const all = window.GASP_REVIEWS;
  const r0 = all.find(r => r.slug === slug) || all[0];
  const r = {
    ...r0,
    body: r0.body || [],
    feature: r0.feature || r0.image,
    related: r0.related || all.filter(x => x.slug !== r0.slug).slice(0, 3).map(x => x.slug)
  };
  const col = {
    maxWidth: 'var(--measure)',
    margin: '0 auto',
    padding: '0 var(--gutter)'
  };
  const eyebrow = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: 'var(--fg-3)',
    margin: '0 0 16px',
    fontWeight: 500
  };
  const m = r.title.match(/^(.*)\s(\(\d{4}\))$/);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(78vh, 680px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: r.feature,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '120px var(--gutter) 48px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, (r.genres || []).map(gn => /*#__PURE__*/React.createElement(GenreTag, {
    key: gn,
    onClick: e => {
      e.preventDefault();
      onOpen('genre:' + gn);
    }
  }, gn))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(52px,8vw,112px)',
      lineHeight: 1.0,
      letterSpacing: '-.01em',
      color: 'var(--fg-1)'
    }
  }, m ? /*#__PURE__*/React.createElement(React.Fragment, null, m[1], " ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--fg-2)'
    }
  }, m[2])) : r.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(AuthorByline, {
    name: "Ania Twardowska",
    role: "Writer and film enthusiast",
    avatar: "../../assets/author-ania.jpg",
    meta: r.published ? r.published + ' · Updated ' + r.updated : undefined
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...col,
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(24px,2.6vw,30px)',
      lineHeight: 1.35,
      color: 'var(--fg-1)',
      textWrap: 'pretty'
    }
  }, r.excerpt), r.body.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, r.body.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 22px',
      fontWeight: 300,
      fontSize: 17,
      lineHeight: 1.75,
      color: 'var(--fg-2)'
    }
  }, p))), r.alsoLike && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '32px 0 0',
      fontSize: 15,
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)'
    }
  }, "You might also like: "), r.alsoLike.map(([t, y], i) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19
    }
  }, t), " (", y, ")", i < r.alsoLike.length - 1 ? ', ' : '')))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      padding: '64px var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: 'clamp(28px,5vw,48px)',
      borderRadius: 20,
      background: 'var(--surface-panel)',
      boxShadow: 'inset 0 0 0 1px var(--line-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -120,
      top: -120,
      width: 420,
      height: 420,
      background: 'radial-gradient(closest-side, rgba(13,58,103,.6), transparent)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(GaspFactor, r.gasp))), r.triggers && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
      gap: 24,
      paddingTop: 24,
      borderTop: '1px solid var(--line-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: eyebrow
  }, "Triggers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      color: 'var(--fg-1)'
    }
  }, r.triggers)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'clamp(80px,10vw,128px) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 28px',
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--fg-1)'
    }
  }, "Related reviews"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 24
    }
  }, r.related.map(s => all.find(x => x.slug === s)).filter(Boolean).map(x => /*#__PURE__*/React.createElement(ReviewCard, {
    key: x.slug,
    title: x.title,
    excerpt: x.excerpt,
    image: x.image,
    gasp: x.gasp,
    onClick: e => {
      e.preventDefault();
      onOpen(x.slug);
    }
  })))));
}
window.ReviewScreen = ReviewScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ReviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ReviewsScreen.jsx
try { (() => {
const SORTS = [{
  id: 'latest',
  label: 'Latest'
}, {
  id: 'score',
  label: 'Highest Gasp',
  key: 'score'
}, {
  id: 'suspense',
  label: 'Most suspense',
  key: 'suspense',
  icon: 'fa-regular fa-face-grimace'
}, {
  id: 'scariness',
  label: 'Scariest',
  key: 'scariness',
  icon: 'fa-regular fa-face-surprise'
}, {
  id: 'bloodiness',
  label: 'Bloodiest',
  key: 'bloodiness',
  icon: 'ti ti-droplets'
}];
function ReviewsScreen({
  genre,
  onOpen
}) {
  const {
    ReviewCard,
    GenreTag
  } = window.GaspMovieReviewDesignSystem_ad6a6f;
  const [sort, setSort] = React.useState('latest');
  const all = window.GASP_REVIEWS;
  const count = g => all.filter(r => (r.genres || []).includes(g)).length;
  let list = genre ? all.filter(r => (r.genres || []).includes(genre)) : all.slice();
  const s = SORTS.find(x => x.id === sort);
  if (s.key) list = list.slice().sort((a, b) => b.gasp[s.key] - a.gasp[s.key]);
  const go = t => e => {
    e.preventDefault();
    onOpen(t);
  };
  const label = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: 'var(--fg-3)',
    minWidth: 64
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageIntro, {
    eyebrow: genre ? 'Genre' : 'Reviews',
    title: genre ? genre + ' reviews' : 'All reviews',
    lede: genre ? list.length + ' ' + (list.length === 1 ? 'film' : 'films') + ' tagged ' + genre.toLowerCase() + '. Sort by what you’re in the mood for.' : 'Find the right film for your mood: filter by genre, then sort by how suspenseful, scary or bloody you want your night to be.'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 64,
      zIndex: 10,
      background: 'var(--surface-chrome)',
      backdropFilter: 'var(--blur-chrome)',
      WebkitBackdropFilter: 'var(--blur-chrome)',
      borderTop: '1px solid var(--line-1)',
      borderBottom: '1px solid var(--line-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...gaspPage,
      paddingTop: 14,
      paddingBottom: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: label
  }, "Genre"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(GenreTag, {
    active: !genre,
    onClick: go('reviews')
  }, "All \xB7 ", all.length), window.GASP_GENRES.map(g => {
    const n = count(g);
    return n ? /*#__PURE__*/React.createElement(GenreTag, {
      key: g,
      active: genre === g,
      onClick: go('genre:' + g)
    }, g, " \xB7 ", n) : null;
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: label
  }, "Sort"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flex: 'none'
    }
  }, SORTS.map(x => /*#__PURE__*/React.createElement(GenreTag, {
    key: x.id,
    active: sort === x.id,
    onClick: e => {
      e.preventDefault();
      setSort(x.id);
    }
  }, x.icon && /*#__PURE__*/React.createElement("i", {
    className: x.icon,
    style: {
      marginRight: 6,
      fontSize: 13
    }
  }), x.label)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...gaspPage,
      paddingTop: 32,
      paddingBottom: 'clamp(80px,10vw,140px)'
    }
  }, list.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 24
    }
  }, list.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    gasp: r.gasp,
    onClick: go(r.slug)
  }))) : /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-2)'
    }
  }, "No reviews in this genre yet.")));
}
window.ReviewsScreen = ReviewsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ReviewsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.GASP_REVIEWS = [{
  slug: 'his-house-2020',
  title: 'His House (2020)',
  image: '../../assets/reviews/his-house-card.png',
  feature: '../../assets/reviews/his-house.jpg',
  excerpt: 'The life after escaping a war-torn country to be relocated to an unfamiliar land and call it home could be an end to a long-lived horror and a beginning of a new promising endeavour.',
  gasp: {
    score: 8.03,
    suspense: 97,
    scariness: 89,
    bloodiness: 55
  },
  genres: ['Horror', 'Thriller', 'Drama'],
  triggers: 'haunted house, Brexit, Rwanda asylum plan',
  published: '1 Apr 2024, 09:35',
  updated: '21 Oct 2025, 09:20',
  body: ['When the hopeful refugee couple, Rial (Wunmi Mosaku) and Bol (Sope Dirisu), are finally assigned a place to live in the UK, briefly, it feels like a second chance. Unfortunately, once arrived at the destination, the pair is shocked to see that their new residence is a crumbling ruin located in a racist neighbourhood.', 'Rial occupies herself with cleaning and preparing meals, while Bol begins renovations of the neglected accommodation. Together, they try to make it look more habitable. The wife wants to honour their traditions and reminisce their daughter that has died in a tragic accident, while the husband focuses on moving forward and creating a new routine. Their differences create rising tensions in the house and move them apart.', 'As time passes and the external is being worked on, the harrowing memories from the past are haunting Bol with an increasing intensity, personified within the walls of their new house. Bol must face the trauma and accept his history before it is too late and he loses himself in madness completely.'],
  alsoLike: [['The Shining', '1980'], ['Get Out', '2017'], ['Host', '2020']],
  related: ['the-conjuring-2013', 'host-2020', 'substance-2024']
}, {
  slug: 'host-2020',
  genres: ['Horror', 'Mystery'],
  title: 'Host (2020)',
  image: '../../assets/reviews/host.png',
  excerpt: '2020 was the year of practically living in our laptops and mobile devices due to the pandemic. For young people, the long hours spent at home, while relying on online communication were slow and unexciting. So… what could be so scary about this horror?',
  gasp: {
    score: 6.20,
    suspense: 95,
    scariness: 80,
    bloodiness: 11
  }
}, {
  slug: 'till-death-2021',
  genres: ['Horror', 'Thriller'],
  title: 'Till Death (2021)',
  image: '../../assets/reviews/till-death.png',
  excerpt: 'Tagging along on a journey with the main character on a quest to escape the near-death experiences, whilst trying to solve the mystery and outrun the villains has a long history in film.',
  gasp: {
    score: 5.17,
    suspense: 87,
    scariness: 35,
    bloodiness: 33
  }
}, {
  slug: 'substance-2024',
  genres: ['Horror', 'Drama', 'Sci-Fi'],
  title: 'The Substance (2024)',
  image: '../../assets/reviews/substance.png',
  excerpt: 'When an opportunity to be young again conveniently appears right in front of you during an intense midlife crisis… would you take it? And at what cost?',
  gasp: {
    score: 6.70,
    suspense: 100,
    scariness: 18,
    bloodiness: 83
  }
}, {
  slug: 'revenge-2017',
  genres: ['Horror', 'Thriller', 'Drama', 'Action'],
  title: 'Revenge (2017)',
  image: '../../assets/reviews/revenge.png',
  excerpt: 'Wouldn’t it be fun to invite a secret lover to a hunting retreat with mates? Said no one ever, but a man that is wishing for something bad to happen.',
  gasp: {
    score: 5.57,
    suspense: 65,
    scariness: 12,
    bloodiness: 90
  }
}, {
  slug: 'the-conjuring-2013',
  genres: ['Horror', 'Thriller', 'Mystery'],
  title: 'The Conjuring (2013)',
  image: '../../assets/reviews/conjuring.png',
  excerpt: 'This old-school film inspired by a true story is an excellent introduction to the Conjuring Universe: full of quality scare jumps and guaranteed to have you screaming and hiding behind a pillow.',
  gasp: {
    score: 5.90,
    suspense: 74,
    scariness: 95,
    bloodiness: 8
  }
}];
window.GASP_GENRES = ['Action', 'Dark Comedy', 'Drama', 'Horror', 'Mystery', 'Thriller', 'Sci-Fi'];
window.GASP_ABOUT = {
  image: '../../assets/about-feature.jpg',
  intro: 'Gasp Movie Review presents a collection of horror movies and tv-series that have one thing in common: they will make you gasp.',
  body: ['Gasp Movie Review website launched in April 2024 and serves as a horror film guide for people looking for a variety of different scary, suspenseful or bloody movie experiences.', 'Sometimes, searching for a specific movie that matches your mood can be a hassle. Gasp Movie Review provides a solution with bespoke categories so you can find the right film for you to enjoy at your own leisure.'],
  gasp: 'Gasp Factor is calculated by combining the level of suspense, scariness and bloodiness of the movie to generate a number to guide you on the intensity of the horror. The general rule is the higher the Gasp Factor, the higher the % of the categories i.e. Gasp Factor 10 is the highest therefore the most suspenseful, scary and bloody, and naturally Gasp Factor 0 would be the lowest on that scale.'
};
window.GASP_AUTHOR = {
  name: 'Ania Twardowska',
  role: 'Writer and film enthusiast',
  photo: '../../assets/author-ania-large.jpg',
  bio: ['Ania Twardowska has been passionate about writing from the age of eight. It would have probably happened for her sooner if only mastering the craft of learning letters in Polish was not so complex and boring. However, she got there in the end and a few years later, she even started to study English to help her fulfil the dream to move to London by herself as a teenager.', 'Following years of working in hospitality and media, writing has always stayed close to her heart and on the very top of the mind. Recently, she started to feel more confident about showcasing her work and decided to launch a horror film review blog. For years, she has been enjoying being spooked by watching horror films and now is the time to share her recommendations and guide the viewers so they can find good movies too.', 'She also loves writing screenplays, novellas, short stories and poetry. Her style can be described as drama, thriller with just the right amount of supernatural.']
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.SocialButton = __ds_scope.SocialButton;

__ds_ns.GaspFactor = __ds_scope.GaspFactor;

__ds_ns.AuthorByline = __ds_scope.AuthorByline;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.GenreTag = __ds_scope.GenreTag;

})();

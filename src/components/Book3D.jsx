export default function Book3D({
  b,
  size = 1,
  rot = -25,
  onClick,
  className = "",
}) {
  const w = 120 * size;
  const h = (150 + b.h * 10) * size;
  const d = (20 + b.t * 6) * size;

  const c1 = `hsl(${b.hue} 55% 30%)`;
  const c2 = `hsl(${b.hue + 35} 60% 13%)`;
  const gold = `hsl(${b.hue + 35} 65% 72%)`;

  return (
    <div
      className={`b3d lum-book-3d ${className}`}
      onClick={onClick}
      style={{
        width: w,
        height: h,
        "--w": `${w}px`,
        "--d": `${d}px`,
        "--rot": `${rot}deg`,
        "--book-color": c1,
        "--book-dark": c2,
        "--book-gold": gold,
      }}
    >
      <div className="bk lum-book">
        {/* Front cover */}
        <div
          className="f front lum-book-front"
          style={{
            background: `
              linear-gradient(145deg, ${c1}, ${c2})
            `,
          }}
        >
          <div className="lum-cover-shine" />
          <div className="lum-cover-frame">
            <div className="lum-cover-top">
              <span className="lum-book-mark">✦</span>
              <span className="lum-book-label">LUMINA EDITIONS</span>
            </div>

            <div className="lum-cover-center">
              <span className="lum-cover-author">{b.author}</span>
              <strong>{b.title}</strong>
              <span className="lum-cover-line" />
              <span className="lum-cover-symbol">✧</span>
            </div>

            <div className="lum-cover-bottom">
              <span>EST. MMXXVI</span>
              <span>VOL. 01</span>
            </div>
          </div>
        </div>

        {/* Spine */}
        <div className="f spine lum-book-spine" style={{ background: c2 }}>
          <span className="lum-spine-title">{b.title}</span>
          <span className="lum-spine-mark">✦</span>
          <span className="lum-spine-brand">LUMINA</span>
        </div>

        {/* Back cover */}
        <div className="f back lum-book-back" style={{ background: c2 }}>
          <div className="lum-back-frame">
            <span>✦</span>
            <p>{b.title}</p>
            <i />
            <small>{b.author}</small>
            <span className="lum-back-brand">LUMINA LIBRARY</span>
          </div>
        </div>

        {/* Pages */}
        <div className="f pages lum-book-pages">
          <div className="lum-page-lines" />
        </div>
      </div>
    </div>
  );
}

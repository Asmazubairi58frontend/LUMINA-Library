import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bookmark, Maximize } from "lucide-react";
import { books, chapters } from "../data/books";
import { useStore } from "../context/Store";
export default function ReadingRoom() {
  const [sp, setSp] = useSearchParams();
  const b = books.find((x) => x.id === +sp.get("b")) || books[4];
  const { marks, toggleMark, setProgress } = useStore();
  const [t, setT] = useState(0);
  const [tilt, setTilt] = useState([0, 0]);
  const [z, setZ] = useState(1);
  const ref = useRef();
  const L = 1 + b.pages.length / 2;
  const go = (n) => setT(Math.max(0, Math.min(L, n)));
  useEffect(() => {
    setT(0);
  }, [b.id]);
  useEffect(() => {
    if (t > 0)
      setProgress((p) => ({ ...p, [b.id]: Math.round((t / L) * 100) }));
  }, [t, b.id, L, setProgress]);
  useEffect(() => {
    const w = innerWidth < 700 ? innerWidth / 700 : 1;
    setZ(w);
  }, []);
  const pg = (i) => (
    <div className="ptxt">
      {b.pages[i].h && <h4>{b.pages[i].h}</h4>}
      <p>{b.pages[i].text}</p>
      <span className="pn">{i + 1}</span>
    </div>
  );
  const mark = (marks[b.id] || []).includes(t);
  return (
    <section className="rr" ref={ref}>
      <div className="sun" />
      <div className="win" />
      <div className="rr-heading">
        <span className="eyebrow">THE LUMINA READING EXPERIENCE</span>
        <h1>Make yourself at home.</h1>
        <p>A quieter space for uninterrupted reading.</p>
      </div>
      <div className="rr-top glass">
        <select
          className="inp2"
          value={b.id}
          onChange={(e) => setSp({ b: e.target.value })}
        >
          {books.map((x) => (
            <option key={x.id} value={x.id}>
              {x.title}
            </option>
          ))}
        </select>
        <div className="prog">
          <i style={{ width: (t / L) * 100 + "%" }} />
        </div>
        <small>
          {t === 0 ? "Closed" : `Pages ${2 * t - 2}–${2 * t - 1}`} ·{" "}
          {Math.round((t / L) * 100)}%
        </small>
      </div>
      <aside className="toc glass">
        <b>Contents</b>
        {chapters.map((c, i) => (
          <button key={c} onClick={() => go(i + 1)}>
            {i + 1}. {c}
          </button>
        ))}
      </aside>
      <div
        className="stage-rr"
        onWheel={(e) =>
          setZ((v) => Math.max(0.5, Math.min(1.6, v - e.deltaY * 0.001)))
        }
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTilt([
            -((e.clientY - r.top) / r.height - 0.5) * 10,
            ((e.clientX - r.left) / r.width - 0.5) * 14,
          ]);
        }}
        onMouseLeave={() => setTilt([0, 0])}
      >
        <div
          className="bookwrap"
          style={{
            transform: `scale(${z}) translateX(${t === 0 ? -160 : t === L ? 160 : 0}px) rotateX(${tilt[0] + 12}deg) rotateY(${tilt[1]}deg)`,
          }}
        >
          {Array.from({ length: L }, (_, i) => (
            <div
              key={i}
              className={"leaf " + (i < t ? "f" : "")}
              style={{ zIndex: i < t ? i : L - i }}
            >
              <div
                className={"pg " + (i === 0 ? "cover" : "")}
                style={
                  i === 0
                    ? {
                        background: `linear-gradient(135deg,hsl(${b.hue} 55% 30%),hsl(${b.hue + 35} 60% 13%))`,
                      }
                    : null
                }
                onClick={() => go(i + 1)}
              >
                {i === 0 ? (
                  <div className="ctext">
                    <small>{b.author}</small>
                    <h3>{b.title}</h3>
                    <em>LUMINA</em>
                  </div>
                ) : (
                  pg(2 * i - 2)
                )}
              </div>
              <div className="pg back" onClick={() => go(i)}>
                {i === 0 ? (
                  <div className="ptxt">
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                    {chapters.map((c, k) => (
                      <p key={c}>
                        {k + 1}. {c}
                      </p>
                    ))}
                  </div>
                ) : (
                  pg(2 * i - 1)
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="desk" />
      </div>
      <div className="reading-tip glass">
        <b>Reader’s note</b>
        <span>
          Take your time. Your progress and bookmarks are saved automatically.
        </span>
      </div>
      <div className="rr-ctl glass">
        <button
          className="ibtn"
          aria-label="Previous page"
          onClick={() => go(t - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className={"ibtn " + (mark ? "on" : "")}
          aria-label="Bookmark"
          onClick={() => toggleMark(b.id, t)}
        >
          <Bookmark size={16} fill={mark ? "currentColor" : "none"} />
        </button>
        <button
          className="ibtn"
          aria-label="Fullscreen"
          onClick={() =>
            document.fullscreenElement
              ? document.exitFullscreen()
              : ref.current.requestFullscreen?.()
          }
        >
          <Maximize size={16} />
        </button>
        <button
          className="ibtn"
          aria-label="Next page"
          onClick={() => go(t + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

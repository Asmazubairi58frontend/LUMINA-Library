import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Maximize2,
  BookOpen,
  Headphones,
  Volume2,
} from "lucide-react";
import { seedBooks } from "../data/books";
import { getPublicDomainText } from "../services/bookService";
import { useApp } from "../context/AppContext";
const samplePages = [
  [
    "A ROOM OF ONE’S OWN",
    "There is a particular kind of stillness that arrives when the world narrows to a sentence, a thought, a page. The noise does not disappear; it simply finds its proper distance.",
  ],
  [
    "THE FIRST THRESHOLD",
    "A book asks for something rare: not our agreement, but our attention. It opens a door and waits, without hurry, for us to decide whether to enter.",
  ],
  [
    "ON NOTICING",
    "To read is to practise noticing. A small detail gathers meaning; a passing thought becomes a question. Slowly, the ordinary world grows larger.",
  ],
  [
    "A QUIETER KIND OF DISCOVERY",
    "Perhaps the best journeys do not take us away from ourselves. Perhaps they return us with better questions, and a little more room for wonder.",
  ],
];
export default function Reader() {
  const { progress, setProgress } = useApp();
  const [book, setBook] = useState(
    () =>
      JSON.parse(sessionStorage.getItem("lumora-current-book") || "null") ||
      seedBooks[0],
  );
  const [page, setPage] = useState(1);
  const [font, setFont] = useState(18);
  const [text, setText] = useState(null);
  const [notice, setNotice] = useState("");
  const [music, setMusic] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    setPage(progress[book.id] || 1);
  }, [book, progress]);
  useEffect(() => {
    let live = true;
    if (book.gutenbergId)
      getPublicDomainText(book.gutenbergId)
        .then((t) => {
          if (live) setText(t);
        })
        .catch(() => setText(null));
    else setText(null);
    return () => {
      live = false;
    };
  }, [book]);
  function change(n) {
    const p = Math.max(1, Math.min(4, n));
    setPage(p);
    setProgress((old) => ({ ...old, [book.id]: p }));
  }
  return (
    <div className={`page reader-page ${fullscreen ? "reader-full" : ""}`}>
      <div className="reader-heading">
        <div>
          <span className="eyebrow">THE READING ROOM</span>
          <h1>
            Leave the world <em>outside.</em>
          </h1>
          <p>A little quiet, a page at a time.</p>
        </div>
        <div className="reader-tools">
          <button
            className="icon-btn"
            onClick={() => setFont(Math.max(14, font - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="font-label">Aa</span>
          <button
            className="icon-btn"
            onClick={() => setFont(Math.min(24, font + 1))}
          >
            <Plus size={16} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setFullscreen(!fullscreen)}
            title="Toggle focus mode"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <div className="reader-workspace">
        <aside className="reader-sidebar">
          <span className="eyebrow">NOW READING</span>
          <div className="mini-cover">
            <img src={book.cover} alt="" />
          </div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <div className="reading-progress">
            <div>
              <span>YOUR PROGRESS</span>
              <b>{Math.round((page / 4) * 100)}%</b>
            </div>
            <i>
              <b style={{ width: `${(page / 4) * 100}%` }} />
            </i>
          </div>
          <div className="reader-side-actions">
            <button
              onClick={() => setMusic(!music)}
              className={music ? "side-active" : ""}
            >
              <Headphones size={16} />
              {music ? "Ambient mode on" : "Ambient mode"}
            </button>
            <span className="muted small">
              Ambient audio is an optional integration point. No sound plays
              automatically.
            </span>
          </div>
        </aside>
        <section className="open-book">
          <div className="book-spine" />
          <article className="paper-page">
            <span className="paper-kicker">LUMORA · READING EDITION</span>
            <span className="paper-number">{page * 2 - 1}</span>
            <div className="paper-content" style={{ fontSize: font }}>
              <span className="eyebrow">{samplePages[page - 1][0]}</span>
              <h2>
                {page === 1
                  ? book.title
                  : samplePages[page - 1][0]
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
              </h2>
              <p>{samplePages[page - 1][1]}</p>
              <p className="paper-extra">
                Take your time. There is nowhere else you need to be.
              </p>
            </div>
            <span className="paper-footer">LUMORA READING ROOM</span>
          </article>
          <article className="paper-page paper-right">
            <span className="paper-number">{page * 2}</span>
            <div className="paper-content" style={{ fontSize: font }}>
              <span className="eyebrow">A MOMENT TO CONSIDER</span>
              <h2>
                What stays
                <br />
                <em>with you?</em>
              </h2>
              <p>
                Which idea would you carry beyond this page? What might it
                change about the way you see something familiar?
              </p>
              <p className="paper-extra">
                A note to return to, whenever you are ready.
              </p>
            </div>
            <span className="paper-footer">{book.author?.toUpperCase()}</span>
          </article>
        </section>
      </div>
      <div className="reader-controls">
        <button
          className="secondary-btn"
          onClick={() => change(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={17} /> Previous
        </button>
        <span>
          SPREAD <b>{page}</b> <i>/</i> 4
        </span>
        <button
          className="primary-btn"
          onClick={() => change(page + 1)}
          disabled={page === 4}
        >
          Next page <ChevronRight size={17} />
        </button>
      </div>
      <p className="reader-disclaimer">
        This reading-room preview uses original demonstration passages.
        Public-domain text availability is checked through Project Gutenberg
        where supported; this preview does not reproduce full copyrighted books.
      </p>
    </div>
  );
}

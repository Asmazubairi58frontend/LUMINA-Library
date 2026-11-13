import { Link } from "react-router-dom";
import { books } from "../data/books";
import Book3D from "../components/Book3D";
import { useStore } from "../context/Store";
import "../index.css";

export default function MySpace() {
  const { favs, marks, progress, goal, setGoal } = useStore();

  const by = (id) => books.find((b) => b.id === +id);

  const rec = Object.keys(progress).map(by).filter(Boolean);
  const fav = favs.map(by).filter(Boolean);
  const saved = Object.keys(marks)
    .filter((k) => marks[k].length)
    .map(by)
    .filter(Boolean);

  const done = Object.values(progress).filter((p) => p >= 100).length;

  const avg = rec.length
    ? Math.round(
        Object.values(progress).reduce((a, b) => a + b, 0) / rec.length,
      )
    : 0;

  const goalProgress = Math.min(
    100,
    Math.round((done / Math.max(1, goal)) * 100),
  );

  const stats = [
    {
      icon: "◈",
      value: rec.length,
      label: "Books Started",
      note: "Your reading journey",
    },
    {
      icon: "✧",
      value: done,
      label: "Books Finished",
      note: "Stories completed",
    },
    {
      icon: "◎",
      value: `${avg}%`,
      label: "Average Progress",
      note: "Your reading pace",
    },
    {
      icon: "♡",
      value: fav.length,
      label: "Favorite Books",
      note: "Your treasured stories",
    },
  ];

  const Row = ({ title, subtitle, list, icon }) => (
    <div className="ms-section">
      <div className="ms-section-heading">
        <div>
          <span className="ms-kicker">{subtitle}</span>
          <h3>{title}</h3>
        </div>
        <span className="ms-section-icon">{icon}</span>
      </div>

      {list.length ? (
        <div className="ms-book-grid">
          {list.map((b) => (
            <Link key={b.id} to={"/reading?b=" + b.id} className="ms-book-card">
              <div className="ms-book-cover">
                <Book3D b={b} size={0.85} />
              </div>
              <span className="ms-book-title">{b.title}</span>
              <span className="ms-book-action">Continue exploring ↗</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="ms-empty">
          <span>✧</span>
          <p>Your collection is waiting for its first story.</p>
          <Link to="/library">Explore the library ↗</Link>
        </div>
      )}
    </div>
  );

  return (
    <section className="sec myspace-page ms-page">
      {/* HERO */}
      <div className="ms-hero">
        <div className="ms-hero-content">
          <span className="ms-kicker">YOUR PERSONAL READING SANCTUARY</span>

          <h1>
            Welcome to your
            <br />
            <em>reading space.</em>
          </h1>

          <p>
            A quiet corner of the world, where every page holds a new
            possibility and every story becomes part of you.
          </p>

          <div className="ms-member">
            <div className="ms-avatar">A</div>
            <div>
              <strong>Alex Reader</strong>
              <span>Member since 2026 · Reader profile</span>
            </div>
          </div>
        </div>

        <div className="ms-hero-art">
          <div className="ms-art-glow" />
          <div className="ms-art-circle">
            <span>✦</span>
          </div>
          <div className="ms-art-caption">
            <span>THE ART OF</span>
            <strong>SLOW READING</strong>
          </div>
        </div>

        <span className="ms-hero-decoration">L</span>
      </div>

      {/* STATS */}
      <div className="ms-stats">
        {stats.map((s) => (
          <div className="ms-stat" key={s.label}>
            <div className="ms-stat-top">
              <span className="ms-stat-icon">{s.icon}</span>
              <span className="ms-stat-dot" />
            </div>
            <strong>{s.value}</strong>
            <span className="ms-stat-label">{s.label}</span>
            <small>{s.note}</small>
          </div>
        ))}
      </div>

      {/* READING GOAL */}
      <div className="ms-goal-panel">
        <div className="ms-goal-info">
          <span className="ms-kicker">YOUR ANNUAL CHALLENGE</span>
          <h2>
            A year of <em>stories.</em>
          </h2>
          <p>
            Every book you finish is another world discovered. Set a goal and
            make this year a chapter worth remembering.
          </p>

          <div className="ms-goal-input">
            <label htmlFor="reading-goal">My reading goal</label>
            <div className="ms-goal-control">
              <input
                id="reading-goal"
                type="number"
                min="1"
                value={goal}
                onChange={(e) => setGoal(Math.max(1, +e.target.value || 1))}
              />
              <span>BOOKS / YEAR</span>
            </div>
          </div>
        </div>

        <div className="ms-goal-visual">
          <div
            className="ms-progress-ring"
            style={{
              "--progress": `${goalProgress * 3.6}deg`,
            }}
          >
            <div className="ms-ring-inner">
              <strong>{goalProgress}%</strong>
              <span>COMPLETED</span>
            </div>
          </div>

          <div className="ms-goal-count">
            <strong>
              {done} <span>/ {goal}</span>
            </strong>
            <small>Books completed</small>
          </div>
        </div>
      </div>

      {/* READING RHYTHM */}
      <div className="ms-quote">
        <span className="ms-kicker">A THOUGHT TO KEEP</span>
        <h2>
          "Every page is a<em> new beginning.</em>"
        </h2>
        <p>
          Keep your favorite ideas close. Return to unfinished chapters.
          Celebrate every little discovery along the way.
        </p>
        <span className="ms-quote-symbol">“</span>
      </div>

      {/* READING PROGRESS */}
      {rec.length > 0 && (
        <div className="ms-section ms-reading-progress">
          <div className="ms-section-heading">
            <div>
              <span className="ms-kicker">PICK UP WHERE YOU LEFT OFF</span>
              <h3>Your reading journey</h3>
            </div>
            <span className="ms-section-icon">↗</span>
          </div>

          <div className="ms-progress-list">
            {rec.map((b) => (
              <Link
                to={"/reading?b=" + b.id}
                key={b.id}
                className="ms-progress-item"
              >
                <div className="ms-progress-book">
                  <Book3D b={b} size={0.42} />
                </div>

                <div className="ms-progress-details">
                  <strong>{b.title}</strong>
                  <div className="ms-progress-track">
                    <i
                      style={{
                        width: `${Math.min(100, progress[b.id] || 0)}%`,
                      }}
                    />
                  </div>
                </div>

                <span className="ms-progress-percent">{progress[b.id]}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* COLLECTIONS */}
      <Row
        title="Recently Read"
        subtitle="YOUR CURRENT CHAPTERS"
        list={rec}
        icon="◈"
      />

      <Row
        title="Favorite Books"
        subtitle="THE ONES YOU LOVE"
        list={fav}
        icon="♡"
      />

      <Row
        title="Saved for Later"
        subtitle="YOUR PRIVATE COLLECTION"
        list={saved}
        icon="✧"
      />

      {/* ABOUT */}
      <div className="ms-about">
        <div className="ms-about-mark">L.</div>
        <span className="ms-kicker">A WORLD BEYOND THE PAGES</span>
        <h2>
          More than a library.
          <br />
          <em>A feeling.</em>
        </h2>
        <p>
          LUMINA is a digital library designed to bring the magic of physical
          reading into a digital world. Explore beautiful bookshelves, discover
          meaningful stories, and enter a reading room made for slow, focused
          reading.
        </p>
        <span className="ms-about-footer">
          LUMINA DIGITAL LIBRARY · READ BEYOND
        </span>
      </div>
    </section>
  );
}

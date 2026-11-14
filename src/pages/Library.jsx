import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Star,
  X,
  Heart,
  BookOpen,
  Sparkles,
  ArrowDown,
  Library as LibraryIcon,
} from "lucide-react";

import { books, cats } from "../data/books";
import BookShelf from "../components/BookShelf";
import Book3D from "../components/Book3D";
import { useStore } from "../context/Store";
import "../index.css";
export default function Library() {
  const [sp] = useSearchParams();
  const [q, setQ] = useState("");
  const [c, setC] = useState(sp.get("c") || "All");
  const [sel, setSel] = useState(null);
  const [ry, setRy] = useState(0);

  const { add, toggleFav, favs } = useStore();
  const nav = useNavigate();

  const list = useMemo(
    () =>
      books.filter(
        (b) =>
          (c === "All" || b.cat === c) &&
          (b.title + b.author).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, c],
  );

  const rows = [];
  for (let i = 0; i < list.length; i += 5) {
    rows.push(list.slice(i, i + 5));
  }

  return (
    <section
      className="lib lum-library"
      onMouseMove={(e) => setRy((e.clientX / window.innerWidth - 0.5) * 8)}
    >
      {/* HERO SECTION */}

      <header className="lum-lib-hero">
        <div className="lum-hero-content">
          <div className="lum-hero-label">
            <Sparkles size={13} />
            <span>THE ART OF DISCOVERY</span>
          </div>

          <h1>
            A world of
            <br />
            <em>infinite stories.</em>
          </h1>

          <p>
            Step inside a universe of knowledge, imagination, and inspiration.
            Your next extraordinary discovery is waiting on the shelf.
          </p>

          <div className="lum-hero-meta">
            <div>
              <strong>{books.length.toString().padStart(2, "0")}</strong>
              <span>CURATED TITLES</span>
            </div>

            <div className="lum-meta-divider" />

            <div>
              <strong>
                {cats.length - 1 > 0 ? cats.length - 1 : cats.length}
              </strong>
              <span>COLLECTIONS</span>
            </div>

            <div className="lum-meta-divider" />

            <div>
              <strong>2026</strong>
              <span>ESTABLISHED</span>
            </div>
          </div>
        </div>

        <div className="lum-hero-visual">
          <div className="lum-hero-orbit lum-orbit-one" />
          <div className="lum-hero-orbit lum-orbit-two" />

          <div className="lum-hero-star lum-star-one">✦</div>
          <div className="lum-hero-star lum-star-two">✧</div>

          <div className="lum-hero-emblem">
            <LibraryIcon size={66} strokeWidth={0.8} />
            <span>LUMINA</span>
            <small>THE READING ROOM</small>
          </div>

          <div className="lum-hero-visual-caption">
            EST. IN THE SPIRIT OF DISCOVERY
          </div>
        </div>

        <span className="lum-hero-watermark">L.</span>
      </header>

      {/* SEARCH AND CATEGORY CONTROLS */}

      <div className="lum-explore-heading">
        <div>
          <span className="lum-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Explore the collection</h2>
        </div>

        <div className="lum-total-count">
          <BookOpen size={16} />
          <span>{list.length} titles available</span>
        </div>
      </div>

      <div className="lum-discovery-panel">
        <div className="lum-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Find a book, author, or idea..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search books by title or author"
          />

          {q && (
            <button
              className="lum-clear-search"
              onClick={() => setQ("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="lum-category-area">
          <span className="lum-category-label">EXPLORE BY GENRE</span>

          <div className="lum-categories">
            {cats.map((x) => (
              <button
                key={x}
                className={`lum-category ${c === x ? "active" : ""}`}
                onClick={() => setC(x)}
              >
                {x}
                {c === x && <span className="lum-category-dot" />}
              </button>
            ))}
          </div>
        </div>

        {(q || c !== "All") && (
          <div className="lum-filter-status">
            <span>Showing {list.length} matching books</span>

            <button
              onClick={() => {
                setQ("");
                setC("All");
              }}
            >
              Clear filters <X size={13} />
            </button>
          </div>
        )}
      </div>

      {/* 3D LIBRARY ROOM */}

      <div className="lum-room-heading">
        <div>
          <span className="lum-eyebrow">A PLACE FOR CURIOUS MINDS</span>
          <h2>Walk through the shelves.</h2>
          <p>Explore the collection and select a book to discover its story.</p>
        </div>

        <div className="lum-room-indicator">
          <span />
          THE GRAND LIBRARY
        </div>
      </div>

      <div className="lum-room-frame">
        <div className="lum-room-top">
          <span>01 / THE COLLECTION</span>
          <span>SELECT A BOOK TO EXPLORE</span>
        </div>

        <div className="room lum-room">
          <div
            className="roomin"
            style={{
              transform: `rotateX(3deg) rotateY(${ry}deg)`,
            }}
          >
            {rows.length ? (
              rows.map((r, i) => (
                <BookShelf key={i} books={r} onPick={setSel} />
              ))
            ) : (
              <div className="lum-no-results">
                <Search size={35} />
                <h3>No stories found.</h3>
                <p>Try another title, author, or category.</p>
                <button
                  className="lum-reset-btn"
                  onClick={() => {
                    setQ("");
                    setC("All");
                  }}
                >
                  Explore all books
                </button>
              </div>
            )}
          </div>

          <div className="floor" />
        </div>

        <div className="lum-room-bottom">
          <span>✦ LUMINA DIGITAL LIBRARY</span>
          <span>READ · DISCOVER · IMAGINE</span>
        </div>
      </div>

      {/* LIBRARIAN NOTE */}

      <div className="lum-librarian-note">
        <div className="lum-note-icon">✧</div>

        <div className="lum-note-content">
          <span className="lum-eyebrow">A NOTE FROM THE LIBRARIAN</span>

          <h3>"Some books find you exactly when you need them."</h3>

          <p>
            The right book rarely gives you only what you came looking for. It
            leaves a little something unexpected.
          </p>

          <small>Explore slowly. There is no rush here.</small>
        </div>

        <div className="lum-note-decoration">“</div>
      </div>

      {/* BOOK DETAIL MODAL */}

      {sel && (
        <div className="overlay lum-overlay" onClick={() => setSel(null)}>
          <div
            className="modal3 glass lum-book-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ibtn x lum-modal-close"
              onClick={() => setSel(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="lum-modal-visual">
              <span className="lum-modal-overline">
                DISCOVER YOUR NEXT READ
              </span>

              <div className="stage big lum-book-stage">
                <Book3D b={sel} size={1.4} rot={-20} />
              </div>

              <div className="lum-modal-visual-footer">
                <span>✦</span> A LUMINA COLLECTION
              </div>
            </div>

            <div className="lum-modal-details">
              <span className="lum-book-category">{sel.cat}</span>

              <h2>{sel.title}</h2>

              <p className="lum-book-author">Written by {sel.author}</p>

              <div className="lum-modal-divider" />

              <p className="lum-book-description">{sel.desc}</p>

              <div className="lum-book-facts">
                <div>
                  <Star size={15} />
                  <strong>{sel.rating}</strong>
                  <span>RATING</span>
                </div>

                <div>
                  <strong>${sel.price.toFixed(2)}</strong>
                  <span>PRICE</span>
                </div>
              </div>

              <div className="lum-modal-actions">
                <button className="lum-add-cart" onClick={() => add(sel.id)}>
                  Add to Cart <span>↗</span>
                </button>

                <button
                  className="lum-read-sample"
                  onClick={() => nav("/reading?b=" + sel.id)}
                >
                  <BookOpen size={16} />
                  Read Sample
                </button>

                <button
                  className={`lum-favorite-btn ${
                    favs.includes(sel.id) ? "is-favorite" : ""
                  }`}
                  aria-label="Toggle favorite"
                  aria-pressed={favs.includes(sel.id)}
                  onClick={() => toggleFav(sel.id)}
                >
                  <Heart
                    size={19}
                    fill={favs.includes(sel.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <small className="lum-modal-footer">
                LUMINA · A WORLD BEYOND THE PAGES
              </small>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

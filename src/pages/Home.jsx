import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Mail,
  Star,
  Compass,
} from "lucide-react";

import { books, cats } from "../data/books";
import BookCard from "../components/BookCard";
import Book3D from "../components/Book3D";
import { useStore } from "../context/Store";
import "../index.css";

const Sec = ({ t, list, subtitle, number }) => (
  <section className="sec lum-home-section">
    <div className="lum-home-section-heading">
      <div>
        <span className="lum-home-eyebrow">{subtitle}</span>
        <h2>{t}</h2>
      </div>

      <Link to="/library" className="lum-home-view-all">
        Explore all <ArrowUpRight size={16} />
      </Link>
    </div>

    <div className="grid4 lum-home-books">
      {list.map((b) => (
        <BookCard key={b.id} b={b} />
      ))}
    </div>
  </section>
);

export default function Home() {
  const { notify } = useStore();
  const [em, setEm] = useState("");

  const dots = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        l: Math.random() * 100,
        t: Math.random() * 100,
        d: 5 + Math.random() * 9,
        s: 1 + Math.random() * 3,
        i,
      })),
    [],
  );

  const mv = (e) => {
    const s = e.currentTarget.style;
    s.setProperty("--mx", (e.clientX / window.innerWidth - 0.5) * 2);
    s.setProperty("--my", (e.clientY / window.innerHeight - 0.5) * 2);
  };

  const moods = [
    ["01", "For the curious", "Science · Technology", "✧", "Science"],
    ["02", "For the thoughtful", "Philosophy · Psychology", "◈", "Philosophy"],
    ["03", "For the dreamers", "Fiction · Literature", "✦", "Fiction"],
    ["04", "For the time travellers", "History", "⌛", "History"],
  ];

  return (
    <main className="lum-home-page">
      {/* HERO EXPERIENCE */}

      <header className="hero lum-home-hero" onMouseMove={mv}>
        <div className="lum-hero-ambient" />

        {dots.map((p) => (
          <span
            key={p.i}
            className="dot"
            style={{
              left: p.l + "%",
              top: p.t + "%",
              width: p.s,
              height: p.s,
              animationDuration: p.d + "s",
            }}
          />
        ))}

        <div className="lum-home-topline">
          <span>
            <Sparkles size={13} /> A NEW DIMENSION OF READING
          </span>
          <span>EST. 2026 · LUMINA DIGITAL LIBRARY</span>
        </div>

        <div className="floaters lum-home-floaters">
          {books.slice(0, 5).map((b, i) => (
            <div key={b.id} className={"fl fl" + i}>
              <Book3D b={b} size={0.7} rot={-30} />
            </div>
          ))}
        </div>

        <div className="hero-in lum-home-hero-content">
          <div className="lum-home-pretitle">
            <span />
            ENTER THE WORLD OF LUMINA
          </div>

          <h1>
            A universe
            <br />
            between every
            <br />
            <em>page.</em>
          </h1>

          <p>
            Not just books. Entire worlds waiting to be discovered. Explore
            stories, uncover ideas, and find the words that stay with you long
            after the last page.
          </p>

          <div className="lum-home-hero-actions">
            <Link to="/library" className="btn-gold mag lum-home-primary">
              Explore the Library <ArrowUpRight size={17} />
            </Link>

            <a href="#featured" className="lum-home-secondary">
              Discover more <ArrowRight size={15} />
            </a>
          </div>

          <div className="lum-home-hero-foot">
            <div className="lum-home-hero-stat">
              <strong>{books.length}+</strong>
              <span>CURATED STORIES</span>
            </div>
            <div className="lum-home-hero-stat">
              <strong>{cats.length - 1}+</strong>
              <span>BOOK CATEGORIES</span>
            </div>
            <div className="lum-home-hero-stat">
              <strong>∞</strong>
              <span>WORLDS TO EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="openbook lum-home-openbook">
          <div className="ob l" />
          <div className="ob r" />
          <div className="ob flip" />
        </div>

        <div className="lum-home-scroll">
          <span>SCROLL TO DISCOVER</span>
          <div />
        </div>

        <span className="lum-home-watermark">L.</span>
      </header>

      {/* INTRODUCTION */}

      <section className="lum-home-intro">
        <div className="lum-home-intro-symbol">
          <BookOpen size={27} strokeWidth={1} />
        </div>

        <div>
          <span className="lum-home-eyebrow">MORE THAN A DIGITAL LIBRARY</span>
          <h2>
            Every book opens a door.
            <br />
            <em>Where will yours lead?</em>
          </h2>
        </div>

        <p>
          From timeless classics to fascinating discoveries, find something that
          speaks to your curiosity.
        </p>
      </section>

      {/* FEATURED BOOKS */}

      <div id="featured">
        <Sec
          t="Stories worth discovering"
          subtitle="HANDPICKED FOR YOU"
          number="01"
          list={books.slice(0, 4)}
        />
      </div>

      {/* CATEGORIES */}

      <section className="sec lum-home-category-section">
        <div className="lum-home-section-heading">
          <div>
            <span className="lum-home-eyebrow">FIND YOUR KIND OF WONDER</span>
            <h2>Explore by curiosity.</h2>
          </div>

          <Compass className="lum-home-heading-icon" size={34} />
        </div>

        <div className="lum-home-category-grid">
          {moods.map(([n, title, desc, symbol, category]) => (
            <Link
              key={n}
              to={
                category === "Science" ||
                category === "Philosophy" ||
                category === "Fiction" ||
                category === "History"
                  ? "/library?c=" + category
                  : "/library"
              }
              className="lum-home-category-card"
            >
              <span className="lum-home-category-number">{n}</span>
              <span className="lum-home-category-symbol">{symbol}</span>

              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>

              <ArrowUpRight className="lum-home-category-arrow" size={19} />
            </Link>
          ))}
        </div>

        <div className="lum-home-all-categories">
          <span>MORE WAYS TO EXPLORE</span>

          {cats.slice(1).map((c) => (
            <Link key={c} to={"/library?c=" + encodeURIComponent(c)}>
              {c} <ArrowUpRight size={12} />
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}

      <div className="lum-home-trending">
        <Sec
          t="The books everyone's talking about"
          subtitle="CURRENTLY TRENDING"
          list={[...books].sort((a, b) => b.rating - a.rating).slice(0, 4)}
        />
      </div>

      {/* DISCOVERY SECTION */}

      <section className="sec discovery-grid lum-home-discovery">
        <div className="discovery-copy">
          <span className="lum-home-eyebrow">A BETTER WAY TO WANDER</span>

          <h2>
            Follow the thread
            <br />
            <i>of your curiosity.</i>
          </h2>

          <p>
            Choose a mood. Find a new world. Let your next favourite book
            surprise you.
          </p>

          <Link to="/library" className="text-link">
            Find your next read <ArrowUpRight size={16} />
          </Link>

          <div className="lum-home-discovery-mark">✧</div>
        </div>

        <div className="mood-list lum-home-mood-list">
          {moods.map(([n, t, d, symbol, category]) => (
            <Link
              to={
                category === "Science" ||
                category === "Philosophy" ||
                category === "Fiction" ||
                category === "History"
                  ? "/library?c=" + category
                  : "/library"
              }
              className="mood-row"
              key={n}
            >
              <span>{n}</span>

              <div>
                <b>{t}</b>
                <small>{d}</small>
              </div>

              <strong>{symbol} ↗</strong>
            </Link>
          ))}
        </div>
      </section>

      {/* RECOMMENDATIONS */}

      <Sec
        t="A little something for you"
        subtitle="SELECTED WITH CURIOSITY"
        list={books.slice(8, 12)}
      />

      {/* EDITOR'S CHOICE */}

      <section className="sec editor-pick lum-home-editor">
        <div className="editor-cover lum-home-editor-cover">
          <div className="lum-home-editor-glow" />
          <Book3D b={books[4]} size={1.12} rot={-22} />
        </div>

        <div className="lum-home-editor-copy">
          <span className="lum-home-eyebrow">
            THE EDITOR'S DESK · THIS WEEK
          </span>

          <div className="lum-home-editor-rating">
            <Star size={13} fill="currentColor" />
            <span>EDITOR'S SELECTION</span>
          </div>

          <h2>
            A little room
            <br />
            <em>for big questions.</em>
          </h2>

          <p>
            Our current favourite is a thoughtful invitation to slow down, look
            closer, and make space for ideas that stay with you.
          </p>

          <Link to={"/reading?b=" + books[4].id} className="btn-gold">
            Open the featured read <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="editor-index">
          05 <span>/ 14</span>
        </div>
      </section>

      {/* LIBRARY STATS */}

      <section className="sec stats lum-home-stats">
        <div className="lum-home-stats-heading">
          <span className="lum-home-eyebrow">OUR LITTLE UNIVERSE</span>
          <h2>Built for the love of reading.</h2>
        </div>

        {[
          ["14+", "Curated titles"],
          ["7", "Categories"],
          ["120k", "Pages read"],
          ["4.6★", "Average rating"],
        ].map(([n, l]) => (
          <div key={l} className="glass stat">
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </section>

      {/* NEWSLETTER */}

      <section className="sec lum-home-news-section">
        <div className="glass news lum-home-news">
          <div className="lum-home-news-icon">
            <Mail size={25} strokeWidth={1.2} />
          </div>

          <span className="lum-home-eyebrow">LETTERS FROM LUMINA</span>

          <h2>
            A little inspiration,
            <br />
            <em>delivered quietly.</em>
          </h2>

          <p>
            New arrivals, thoughtful recommendations, and reading inspiration.
            Once a month, straight to your inbox.
          </p>

          <form
            className="lum-home-news-form"
            onSubmit={(e) => {
              e.preventDefault();
              notify("Subscribed — welcome to LUMINA!");
              setEm("");
            }}
          >
            <input
              required
              type="email"
              className="form-control inp"
              placeholder="Enter your email address"
              value={em}
              onChange={(e) => setEm(e.target.value)}
            />

            <button className="btn-gold" type="submit">
              Join the Circle <ArrowUpRight size={16} />
            </button>
          </form>

          <small className="lum-home-news-note">
            ✦ No noise. Just beautiful things worth reading.
          </small>
        </div>
      </section>

      {/* CLOSING */}

      <footer className="lum-home-footer">
        <span className="lum-home-footer-logo">L.</span>
        <p>
          The world is full of stories.
          <br />
          <em>Find yours.</em>
        </p>
        <Link to="/library">
          ENTER THE LIBRARY <ArrowUpRight size={14} />
        </Link>
      </footer>
    </main>
  );
}

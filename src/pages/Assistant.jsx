import React, { useState } from "react";
import { Sparkles, Send, BookOpen, Search } from "lucide-react";
import { searchBooks } from "../services/books";
export default function Assistant() {
  const [mode, setMode] = useState("ask");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I can help you explore a book, understand its themes, or find a legal reading edition. Choose a book and ask away.",
    },
  ]);
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    const q = prompt.trim();
    setPrompt("");
    if (mode === "find") {
      setBusy(true);
      try {
        setResults(await searchBooks(q));
      } catch {
        setResults([]);
      } finally {
        setBusy(false);
      }
      return;
    }
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "assistant",
        text: "This workspace is ready for an AI provider connection. To generate genuine AI answers, connect a backend endpoint and keep the API key on the server. I won't invent an AI response or pretend this demo is connected.",
      },
    ]);
  }
  return (
    <main className="page-wrap assistant-page">
      <div className="page-heading">
        <span className="eyebrow">THE ORACLE</span>
        <h1>
          Ask beyond <i>the page.</i>
        </h1>
        <p>Book discovery and thoughtful reading, in one place.</p>
      </div>
      <div className="assistant-tabs">
        <button
          className={mode === "ask" ? "active" : ""}
          onClick={() => setMode("ask")}
        >
          <Sparkles size={16} /> Ask about books
        </button>
        <button
          className={mode === "find" ? "active" : ""}
          onClick={() => setMode("find")}
        >
          <Search size={16} /> Find a book
        </button>
      </div>
      {mode === "ask" ? (
        <section className="chat-panel">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <span>{m.role === "assistant" ? "L" : "YOU"}</span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={submit}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about a title, theme, or author…"
            />
            <button aria-label="Send">
              <Send size={17} />
            </button>
          </form>
          <small className="demo-note">
            AI connection not configured · No simulated AI output.
          </small>
        </section>
      ) : (
        <>
          <form className="search-bar assistant-search" onSubmit={submit}>
            <BookOpen size={18} />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Title, author, or topic…"
            />
            <button className="gold-button">
              {busy ? "Searching…" : "Find editions"}
            </button>
          </form>
          <div className="search-results">
            {results.map((book) => (
              <a
                key={book.id}
                href={`https://openlibrary.org${book.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <b>{book.title}</b>
                <span>
                  {book.author} · {book.year}
                </span>
              </a>
            ))}
          </div>
          <p className="rights-note">
            PDF access is shown only when a publisher or library makes an
            edition legally available. Search results do not guarantee a
            downloadable PDF.
          </p>
        </>
      )}
    </main>
  );
}

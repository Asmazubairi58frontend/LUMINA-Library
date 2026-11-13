import React from "react";
import { Bookmark, ArrowUpRight } from "lucide-react";
import BookCard from "../components/BookCard";
export default function MyLibrary({ saved, onSave, onSelect }) {
  return (
    <main className="page-wrap library-page">
      <div className="page-heading">
        <span className="eyebrow">YOUR PRIVATE SHELF</span>
        <h1>
          Kept <i>close.</i>
        </h1>
        <p>Your saved books, gathered in one place.</p>
      </div>
      {saved.length ? (
        <div className="catalog-grid">
          {saved.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              saved
              onSave={onSave}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="empty-shelf">
          <Bookmark size={30} />
          <h2>Your shelf is waiting.</h2>
          <p>Save a book from the collection to keep it here.</p>
          <a href="/explore" className="text-link">
            Browse the collection <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </main>
  );
}

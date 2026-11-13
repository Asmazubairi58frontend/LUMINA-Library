import React,{useState} from "react";
import {Search,SlidersHorizontal} from "lucide-react";
import {searchBooks} from "../services/books";
import {featuredBooks} from "../data/books";
import BookCard from "../components/BookCard";
export default function Explore({saved,onSave,onSelect}) {
 const [query,setQuery]=useState("");const [books,setBooks]=useState(featuredBooks);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
 async function search(e){e.preventDefault();if(!query.trim())return;setLoading(true);setError("");try{setBooks(await searchBooks(query));}catch(err){setError(err.message);}finally{setLoading(false);}}
 return <main className="page-wrap explore-page"><div className="page-heading"><span className="eyebrow">THE COLLECTION</span><h1>Find your <i>next world.</i></h1><p>Real books. Real authors. A catalogue connected to Open Library.</p></div><form className="search-bar" onSubmit={search}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, author, or subject…"/><button className="gold-button" disabled={loading}>{loading?"Searching…":"Search"}</button></form>{error&&<p className="form-error">{error}</p>}<div className="collection-label"><span><SlidersHorizontal size={15}/> CURATED & DISCOVERED</span><small>{books.length} TITLES</small></div><div className="catalog-grid">{books.map(book=><BookCard key={book.id} book={book} saved={saved.some(x=>x.id===book.id)} onSave={onSave} onSelect={onSelect}/>)}</div></main>
}
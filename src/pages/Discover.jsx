import React,{useEffect,useRef,useState} from "react";
import {Link} from "react-router-dom";
import {ArrowDown,ArrowUpRight,ChevronDown} from "lucide-react";
import BookstoreScene from "../components/BookstoreScene";
import BookCard from "../components/BookCard";
import {featuredBooks} from "../data/books";
export default function Discover({saved,onSave,onSelect}) {
 const progress=useRef(0);const [scroll,setScroll]=useState(0);
 useEffect(()=>{function update(){const max=document.documentElement.scrollHeight-window.innerHeight;const p=max>0?window.scrollY/max:0;progress.current=p;setScroll(p);}window.addEventListener("scroll",update,{passive:true});update();return()=>window.removeEventListener("scroll",update);},[]);
 return <main className="discover-page">
  <section className="cinema-stage"><BookstoreScene progress={progress}/><div className="stage-vignette"/><div className="hero-content"><span className="eyebrow">THE ART OF GETTING LOST</span><h1>Enter a world<br/><i>beyond books.</i></h1><p>Walk in. Wander. Find your next world.</p><Link className="gold-button hero-cta" to="/explore">Explore the shelves <ArrowUpRight size={17}/></Link></div><div className="scroll-cue"><span>SCROLL TO ENTER</span><ArrowDown size={16}/></div><div className="stage-index">01 <span>—</span> THE HOUSE</div></section>
  <section className="story-section story-arrival"><span className="eyebrow">THE FIRST AISLE</span><h2>Stories worth<br/><i>staying for.</i></h2><p>Six reader favourites. One quiet afternoon.</p><div className="featured-grid">{featuredBooks.slice(0,3).map(book=><BookCard key={book.id} book={book} saved={saved.some(x=>x.id===book.id)} onSave={onSave} onSelect={onSelect}/>)}</div></section>
  <section className="wide-quote"><span>✦</span><p>“A room without books<br/>is like a body without a soul.”</p><small>— CICERO</small></section>
  <section className="story-section lower-shelves"><div className="lower-heading"><div><span className="eyebrow">THE READING TABLE</span><h2>Take a <i>closer look.</i></h2></div><Link to="/explore" className="text-link">View collection <ArrowUpRight size={15}/></Link></div><div className="featured-grid">{featuredBooks.slice(3).map(book=><BookCard key={book.id} book={book} saved={saved.some(x=>x.id===book.id)} onSave={onSave} onSelect={onSelect}/>)}</div></section>
  <div className="scroll-progress"><span style={{transform:`scaleX(${scroll})`}}/></div>
 </main>
}
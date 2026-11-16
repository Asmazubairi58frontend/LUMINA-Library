import {useMemo,useState} from 'react';import {Link} from 'react-router-dom';
import {books,cats} from '../data/books';import BookCard from '../components/BookCard';import Book3D from '../components/Book3D';import {useStore} from '../context/Store';
const Sec=({t,list})=><section className="sec"><h2>{t}</h2><div className="grid4">{list.map(b=><BookCard key={b.id} b={b}/>)}</div></section>;
export default function Home(){const {notify}=useStore();const [em,setEm]=useState('');
 const dots=useMemo(()=>Array.from({length:36},(_,i)=>({l:Math.random()*100,t:Math.random()*100,d:4+Math.random()*8,s:1+Math.random()*3,i})),[]);
 const mv=e=>{const s=e.currentTarget.style;s.setProperty('--mx',(e.clientX/innerWidth-.5)*2);s.setProperty('--my',(e.clientY/innerHeight-.5)*2)};
 return <>
 <header className="hero" onMouseMove={mv}>{dots.map(p=><span key={p.i} className="dot" style={{left:p.l+'%',top:p.t+'%',width:p.s,height:p.s,animationDuration:p.d+'s'}}/>)}
  <div className="floaters">{books.slice(0,5).map((b,i)=><div key={b.id} className={'fl fl'+i}><Book3D b={b} size={.7} rot={-30}/></div>)}</div>
  <div className="hero-in"><h1>A Universe Between Every Page.</h1><p>Discover, explore, and experience the world of books in a whole new dimension.</p>
   <Link to="/library" className="btn-gold mag">Explore Library</Link></div>
  <div className="openbook"><div className="ob l"/><div className="ob r"/><div className="ob flip"/></div></header>
 <Sec t="Featured Books" list={books.slice(0,4)}/>
 <section className="sec"><h2>Popular Categories</h2><div className="d-flex flex-wrap gap-3 justify-content-center">{cats.slice(1).map(c=><Link key={c} className="chip mag" to={'/library?c='+c}>{c}</Link>)}</div></section>
 <Sec t="Trending Now" list={[...books].sort((a,b)=>b.rating-a.rating).slice(0,4)}/>
 <Sec t="Recommended For You" list={books.slice(8,12)}/>
 <section className="sec discovery-grid"><div className="discovery-copy"><span className="eyebrow">A BETTER WAY TO WANDER</span><h2>Follow the thread<br/><i>of your curiosity.</i></h2><p>Choose a mood. Find a new world. Let your next favourite book surprise you.</p><Link to="/library" className="text-link">Find your next read ↗</Link></div><div className="mood-list">{[['01','For the curious','Science · Technology'],['02','For the thoughtful','Philosophy · Psychology'],['03','For the dreamers','Fiction · Literature'],['04','For the time travellers','History']].map(([n,t,d])=><Link to="/library" className="mood-row" key={n}><span>{n}</span><div><b>{t}</b><small>{d}</small></div><strong>↗</strong></Link>)}</div></section>
 <section className="sec editor-pick"><div className="editor-cover"><Book3D b={books[4]} size={1.12} rot={-22}/></div><div><span className="eyebrow">THE EDITOR’S DESK · THIS WEEK</span><h2>A little room<br/>for big questions.</h2><p>Our current favourite is a thoughtful invitation to slow down, look closer, and make space for ideas that stay with you.</p><Link to={'/reading?b='+books[4].id} className="btn-gold">Open the featured read</Link></div><div className="editor-index">05 <span>/ 14</span></div></section>
 <section className="sec stats">{[['14+','Curated titles'],['7','Categories'],['120k','Pages read'],['4.6★','Average rating']].map(([n,l])=><div key={l} className="glass stat"><b>{n}</b><span>{l}</span></div>)}</section>
 <section className="sec"><div className="glass news"><h2>Join the Reading Circle</h2><p>New arrivals and quiet recommendations, once a month.</p>
  <form className="d-flex gap-2 justify-content-center flex-wrap" onSubmit={e=>{e.preventDefault();notify('Subscribed — welcome to LUMINA!');setEm('')}}>
  <input required type="email" className="form-control inp" placeholder="you@email.com" value={em} onChange={e=>setEm(e.target.value)}/><button className="btn-gold">Subscribe</button></form></div></section></>}

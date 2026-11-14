import Book3D from './Book3D';import {Star} from 'lucide-react';
export default function BookShelf({books,onPick}){
 return <div className="shelf"><div className="row3d">{books.map(b=><div className="slot" key={b.id}>
  <div className="tip"><b>{b.title}</b><span>{b.author}</span><span><Star size={12}/> {b.rating} · ${b.price.toFixed(2)}</span></div>
  <Book3D b={b} size={.85} onClick={()=>onPick(b)}/></div>)}</div><div className="board"/></div>}

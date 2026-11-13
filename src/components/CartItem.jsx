import {Plus,Minus,Trash2} from 'lucide-react';import Book3D from './Book3D';import {useStore} from '../context/Store';
export default function CartItem({b}){const {qty,remove}=useStore();
 return <div className="citem glass"><Book3D b={b} size={.5}/><div className="flex-grow-1"><h6>{b.title}</h6><small>{b.author}</small><div>${b.price.toFixed(2)}</div></div>
  <div className="d-flex align-items-center gap-2"><button className="ibtn" onClick={()=>qty(b.id,-1)}><Minus size={14}/></button><b>{b.qty}</b><button className="ibtn" onClick={()=>qty(b.id,1)}><Plus size={14}/></button></div>
  <b className="gold">${(b.price*b.qty).toFixed(2)}</b><button className="ibtn" aria-label="Remove" onClick={()=>remove(b.id)}><Trash2 size={16}/></button></div>}

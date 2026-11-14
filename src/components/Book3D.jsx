export default function Book3D({b,size=1,rot=-25,onClick,className=''}){
 const w=120*size,h=(150+b.h*10)*size,d=(20+b.t*6)*size,c1=`hsl(${b.hue} 55% 30%)`,c2=`hsl(${b.hue+35} 60% 13%)`;
 return <div className={'b3d '+className} onClick={onClick} style={{width:w,height:h,'--w':w+'px','--d':d+'px','--rot':rot+'deg'}}>
  <div className="bk">
   <div className="f front" style={{background:`linear-gradient(135deg,${c1},${c2})`}}><i/><small>{b.author}</small><strong>{b.title}</strong><em>LUMINA</em></div>
   <div className="f spine" style={{background:c2}}><span>{b.title}</span></div>
   <div className="f back" style={{background:c2}}/><div className="f pages"/>
  </div></div>}

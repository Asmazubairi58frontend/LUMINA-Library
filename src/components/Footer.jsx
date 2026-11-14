import {Link} from 'react-router-dom';
export default function Footer(){return <footer className="foot"><div className="logo">LUMINA</div><p>A universe between every page.</p>
 <div className="d-flex gap-4 justify-content-center flex-wrap"><Link to="/library">Library</Link><Link to="/reading">Reading Room</Link><Link to="/cart">Cart</Link><Link to="/my-space">My Space</Link></div>
 <small>© 2026 LUMINA Digital Library</small></footer>}

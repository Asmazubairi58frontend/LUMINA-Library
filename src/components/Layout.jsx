import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, LibraryBig } from "lucide-react";
export default function Layout({theme,setTheme}) {
 const navigate=useNavigate();
 function logout(){localStorage.removeItem("lumora-session");navigate("/login");}
 return <div className={`app-shell ${theme}`}>
  <header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark">L</span><span>LUMORA<small>THE READING HOUSE</small></span></NavLink>
   <nav><NavLink to="/">Discover</NavLink><NavLink to="/explore">Collection</NavLink><NavLink to="/assistant">The Oracle</NavLink><NavLink to="/library">My Shelf</NavLink></nav>
   <div className="top-actions"><button className="icon-btn" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button><button className="icon-btn" onClick={logout} aria-label="Sign out"><LogOut size={17}/></button></div>
  </header><Outlet/><footer className="site-footer"><span>LUMORA</span><small>A quieter kind of discovery.</small><span>© 2026</span></footer>
 </div>
}
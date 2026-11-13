import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingBag, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useStore } from "../context/Store";
const L = [
  ["/", "Home"],
  ["/library", "Library"],
  ["/reading", "Reading Room"],
  ["/my-space", "My Space"],
];
export default function Navbar({ user, onLogout }) {
  const [o, setO] = useState(false);
  const { cart } = useStore();
  const n = cart.reduce((a, c) => a + c.qty, 0);
  return (
    <nav className="nav glass">
      <Link to="/" className="logo">
        LUMINA
      </Link>
      <div className={"links " + (o ? "open" : "")}>
        {L.map(([p, t]) => (
          <NavLink key={p} to={p} end={p === "/"} onClick={() => setO(false)}>
            {t}
          </NavLink>
        ))}
      </div>
      <div className="d-flex gap-2 align-items-center">
        <span className="nav-user">{user?.name?.split(" ")[0]}</span>
        <ThemeToggle />
        <Link to="/cart" className="ibtn mag" aria-label="Cart">
          <ShoppingBag size={18} />
          {n > 0 && <b className="badge2">{n}</b>}
        </Link>
        <button
          className="ibtn logout"
          onClick={onLogout}
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>
        <button
          className="ibtn burger"
          aria-label="Menu"
          onClick={() => setO(!o)}
        >
          {o ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>
  );
}

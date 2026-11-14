import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingBag, LogOut, Sparkles } from "lucide-react";
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
    <nav className="nav glass nav-premium">
      <Link to="/" className="logo nav-brand">
        <span className="nav-brand-icon">
          <Sparkles size={17} />
        </span>
        <span>LUMINA</span>
        <span className="nav-brand-dot">.</span>
      </Link>

      <div className={"links nav-links " + (o ? "open" : "")}>
        {L.map(([p, t]) => (
          <NavLink key={p} to={p} end={p === "/"} onClick={() => setO(false)}>
            {t}
          </NavLink>
        ))}
      </div>

      <div className="d-flex gap-2 align-items-center nav-actions">
        <span className="nav-user">
          <span className="nav-status-dot" />
          {user?.name?.split(" ")[0]}
        </span>

        <ThemeToggle />

        <Link to="/cart" className="ibtn mag nav-cart" aria-label="Cart">
          <ShoppingBag size={18} />
          {n > 0 && <b className="badge2">{n}</b>}
        </Link>

        <button
          className="ibtn logout nav-logout"
          onClick={onLogout}
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>

        <button
          className="ibtn burger nav-burger"
          aria-label="Menu"
          aria-expanded={o}
          onClick={() => setO(!o)}
        >
          {o ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </nav>
  );
}

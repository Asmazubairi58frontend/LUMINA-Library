import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Library from "./pages/Library";
import ReadingRoom from "./pages/ReadingRoom";
import Cart from "./pages/Cart";
import MySpace from "./pages/MySpace";
import Login from "./pages/Login";
export default function App() {
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lm-user"));
    } catch {
      return null;
    }
  });
  const loc = useLocation();
  useEffect(() => {
    const t = setTimeout(() => setLoad(false), 1400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  useEffect(() => {
    const m = (e) => {
      const c = document.getElementById("cur");
      if (c) c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      document
        .querySelectorAll(".mag")
        .forEach((x) => (x.style.transform = ""));
      const t = e.target.closest?.(".mag");
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }
    };
    addEventListener("mousemove", m);
    return () => removeEventListener("mousemove", m);
  }, []);
  if (!user) return <Login onLogin={setUser} />;
  return (
    <>
      {load && (
        <div className="loader">
          <div className="logo">LUMINA</div>
          <div className="bar">
            <i />
          </div>
        </div>
      )}
      <div id="cur" className="cursor" />
      <Navbar
        user={user}
        onLogout={() => {
          localStorage.removeItem("lm-user");
          setUser(null);
        }}
      />
      <main key={loc.pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/reading" element={<ReadingRoom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-space" element={<MySpace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

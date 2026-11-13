import { createContext, useContext, useEffect, useState } from "react";
const C = createContext();
export const useStore = () => useContext(C);
const ls = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
const useLS = (k, d) => {
  const [v, s] = useState(() => ls(k, d));
  useEffect(() => localStorage.setItem(k, JSON.stringify(v)), [k, v]);
  return [v, s];
};
export function Provider({ children }) {
  const [theme, setTheme] = useLS("lm-theme", "dark"),
    [cart, setCart] = useLS("lm-cart", []),
    [favs, setFavs] = useLS("lm-favs", []);
  const [marks, setMarks] = useLS("lm-marks", {}),
    [progress, setProgress] = useLS("lm-prog", {}),
    [goal, setGoal] = useLS("lm-goal", 12);
  const [toast, setToast] = useState("");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const notify = (m) => {
    setToast(m);
    clearTimeout(window.__t);
    window.__t = setTimeout(() => setToast(""), 2200);
  };
  const add = (id) => {
    setCart((c) =>
      c.some((x) => x.id === id)
        ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { id, qty: 1 }],
    );
    notify("Added to cart");
  };
  const qty = (id, d) =>
    setCart((c) =>
      c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)),
    );
  const remove = (id) => {
    setCart((c) => c.filter((x) => x.id !== id));
    notify("Removed from cart");
  };
  const toggleFav = (id) => {
    notify(favs.includes(id) ? "Removed from favorites" : "Added to favorites");
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };
  const toggleMark = (id, p) => {
    const on = (marks[id] || []).includes(p);
    notify(on ? "Bookmark removed" : "Page bookmarked");
    setMarks((m) => {
      const a = m[id] || [];
      return {
        ...m,
        [id]: a.includes(p) ? a.filter((x) => x !== p) : [...a, p],
      };
    });
  };
  return (
    <C.Provider
      value={{
        theme,
        setTheme,
        cart,
        setCart,
        add,
        qty,
        remove,
        favs,
        toggleFav,
        marks,
        toggleMark,
        progress,
        setProgress,
        goal,
        setGoal,
        notify,
      }}
    >
      {children}
      <div className={"toast " + (toast ? "show" : "")}>{toast}</div>
    </C.Provider>
  );
}

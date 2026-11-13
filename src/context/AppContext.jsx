import { createContext, useContext, useEffect, useMemo, useState } from "react";
const C = createContext(null);
export function AppProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("lumora-theme") || "dark",
  );
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("lumora-favorites") || "[]"),
  );
  const [progress, setProgress] = useState(() =>
    JSON.parse(localStorage.getItem("lumora-progress") || "{}"),
  );
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("lumora-user") || "null"),
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("lumora-theme", theme);
  }, [theme]);
  useEffect(
    () => localStorage.setItem("lumora-favorites", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(
    () => localStorage.setItem("lumora-progress", JSON.stringify(progress)),
    [progress],
  );
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      favorites,
      setFavorites,
      progress,
      setProgress,
      user,
      setUser,
    }),
    [theme, favorites, progress, user],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useApp = () => useContext(C);

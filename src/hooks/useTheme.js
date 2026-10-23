import { useCallback, useEffect, useState } from "react";
import { THEMES, STORAGE_KEY, DEFAULT_THEME } from "../themes.js";

const isValid = (id) => THEMES.some((t) => t.id === id);

function initialTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  return isValid(current) ? current : DEFAULT_THEME;
}

export default function useTheme() {
  const [theme, setThemeState] = useState(initialTheme);

  // keep <html data-theme> and the browser UI colour in sync
  useEffect(() => {
    const t = THEMES.find((x) => x.id === theme) || THEMES[0];
    document.documentElement.setAttribute("data-theme", t.id);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t.meta);
  }, [theme]);

  const setTheme = useCallback((id) => {
    if (!isValid(id)) return;
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
    setThemeState(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* storage unavailable */ }
  }, []);

  return [theme, setTheme];
}

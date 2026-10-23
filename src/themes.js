// Single source of truth for the theme list.
// `bg` and `accent` are only used to paint the swatch buttons in the header;
// the real colours live in src/styles.css under [data-theme="<id>"].
export const THEMES = [
  { id: "midnight", label: "Midnight", bg: "#0b1020", accent: "#6ee7c8", meta: "#0b1020" },
  { id: "ocean",    label: "Ocean",    bg: "#eef5ff", accent: "#1d6fdc", meta: "#ffffff" },
  { id: "emerald",  label: "Emerald",  bg: "#effaf4", accent: "#0f8a5f", meta: "#ffffff" },
  { id: "royal",    label: "Royal",    bg: "#171030", accent: "#b69cff", meta: "#0f0a1f" },
  { id: "sunset",   label: "Sunset",   bg: "#fff3e6", accent: "#c2410c", meta: "#fffdf9" },
];

export const STORAGE_KEY = "rokesh-theme";
export const DEFAULT_THEME = "midnight";

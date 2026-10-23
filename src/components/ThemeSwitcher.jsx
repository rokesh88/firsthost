import useTheme from "../hooks/useTheme.js";
import { THEMES } from "../themes.js";

// Vector swatch: stays razor-sharp at any size, zoom level or pixel density.
function Swatch({ bg, accent }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" shapeRendering="geometricPrecision">
      <circle cx="16" cy="16" r="15" fill={bg} />
      <path d="M26.607 5.393A15 15 0 0 1 5.393 26.607Z" fill={accent} />
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeOpacity=".28" strokeWidth="1.5" />
    </svg>
  );
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();
  return (
    <div className="theme-switch" role="group" aria-label="Colour theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`swatch${theme === t.id ? " active" : ""}`}
          data-label={t.label}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id)}
        >
          <Swatch bg={t.bg} accent={t.accent} />
        </button>
      ))}
    </div>
  );
}

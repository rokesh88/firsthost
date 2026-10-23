import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

const LINKS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="wrap">
        <nav>
          <a href="#home" className="logo">Rokesh<span>.dev</span></a>
          <div
            className={`links${open ? " open" : ""}`}
            onClick={(e) => { if (e.target.tagName === "A") setOpen(false); }}
          >
            {LINKS.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </div>
          <div className="nav-right">
            <ThemeSwitcher />
            <button
              className="menu-btn"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              Menu
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

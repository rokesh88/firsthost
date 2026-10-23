import Reveal from "./Reveal.jsx";

const STATS = [
  ["3.5+", "Years of experience"],
  ["100%", "On-time delivery"],
  ["1 → 3+", "Colleges onboarded"],
  ["99%+", "Application uptime"],
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <span className="tag"><i className="dot" /> Open to new opportunities</span>
        <h1>
          Hi, I'm <span className="grad">Rokesh R</span>.<br />
          I build reliable web applications.
        </h1>
        <p>
          Full Stack Developer specialising in PHP, MVC architecture, RESTful APIs and MySQL, with
          3.5+ years delivering end-to-end web platforms for educational institutions.
        </p>
        <div className="cta">
          <a href="#contact" className="btn primary">Hire me</a>
          <a href="#projects" className="btn ghost">View projects</a>
        </div>
        <div className="socials">
          <a href="https://github.com/rokesh88" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/rokeshr/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:rokesh88official@gmail.com">rokesh88official@gmail.com</a>
        </div>
        <div className="stats">
          {STATS.map(([value, label]) => (
            <Reveal className="stat" key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

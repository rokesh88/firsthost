import Reveal from "./Reveal.jsx";

const SKILLS = [
  ["Frontend", ["HTML5", "CSS3", "JavaScript (ES6+)", "jQuery", "Bootstrap", "DataTables"]],
  ["Backend", ["PHP", "RESTful API", "JWT Auth", "MVC Architecture"]],
  ["Database", ["MySQL"]],
  ["Dev Tools", ["Postman", "Git", "GitHub"]],
  ["Soft Skills", ["Client Communication", "Deadline Management", "Team Collaboration", "Problem-Solving"]],
];

export default function About() {
  return (
    <section className="about alt" id="about">
      <div className="wrap grid2">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2>Results-driven PHP developer</h2>
          <p>
            I build and maintain end-to-end web applications for private-sector clients across multiple
            educational institutions. I have a strong command of PHP, MVC architecture, RESTful API
            development and JWT-based authentication.
          </p>
          <p>
            I have a proven record of on-time delivery, helped grow my company's client base from 1 to
            3+ colleges, and built a mission-critical digital evaluation platform that runs in production.
          </p>
          <p>
            I'm skilled in MySQL database design and have hands-on experience across the full lifecycle,
            from requirement gathering to deployment and support.
          </p>
        </Reveal>
        <Reveal className="skill-box">
          {SKILLS.map(([title, chips]) => (
            <div className="skill-row" key={title}>
              <h4>{title}</h4>
              <div className="chips">
                {chips.map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

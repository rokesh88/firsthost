import Reveal from "./Reveal.jsx";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2>Where I've worked</h2>
        </Reveal>
        <Reveal className="job">
          <div className="job-top">
            <div>
              <h3>Full Stack Developer</h3>
              <span className="co">SVN Imaging Private Limited</span>
            </div>
            <div className="when">Oct 2022 – Mar 2026<br />Chennai, India</div>
          </div>
          <ul className="pts">
            <li>Delivered <b>100% of client requirements</b> within agreed deadlines across all projects, with zero deadline breaches over 3.5+ years.</li>
            <li>Scaled the company's client base from <b>1 to 3+ educational institutions</b> by delivering high-quality, scalable web applications built on Core PHP and MVC architecture.</li>
            <li>Designed and developed the <b>Onscreen Digital Evaluation System</b>, a mission-critical platform for answer sheet scanning, digital marking, result computation and report generation.</li>
            <li>Built and maintained secure <b>RESTful APIs with JWT authentication</b>, ensuring reliable, stateless communication between frontend and backend.</li>
            <li>Managed <b>MySQL</b> databases including schema design, query optimization and data integrity.</li>
            <li>Conducted end-to-end API testing with <b>Postman</b> so integrations met functional and performance requirements before deployment.</li>
            <li>Provided continuous post-deployment support, resolving client issues promptly and maintaining <b>99%+ uptime</b>.</li>
            <li>Worked directly with clients to gather requirements and turn them into functional, deadline-driven deliverables.</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

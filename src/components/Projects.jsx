import Reveal from "./Reveal.jsx";

export default function Projects() {
  return (
    <section id="projects" className="alt">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Projects</span>
          <h2>Featured Client Projects</h2>
        </Reveal>
        <div className="projects">
          <Reveal as="article" className="card feature">
            <span className="badge">Flagship</span>
            <h3>Onscreen Digital Evaluation System</h3>
            <div className="stack">PHP · MySQL · RESTful API · JWT · Postman · Bootstrap</div>
            <ul className="pts">
              <li>Replaced manual paper-based answer sheet correction for college examinations.</li>
              <li>Secure login with role-based access (Admin, Examiner, Coordinator) using JWT and session management.</li>
              <li>Answer sheet upload and assignment module so administrators can digitize papers and assign them to evaluators.</li>
              <li>Onscreen marking interface to annotate, mark and submit scores with real-time validation.</li>
              <li>Automated result engine that aggregates marks, applies grace-marks logic and generates final reports.</li>
              <li>PDF/Excel exports for results, evaluator performance and audit trails.</li>
              <li>Optimized MySQL queries that handle concurrent multi-examiner sessions without data conflicts.</li>
              <li>Deployed across 3+ college clients, <b>cutting result processing time by 60%+</b>.</li>
            </ul>
          </Reveal>

          <Reveal as="article" className="card">
            <h3>College Management System (ERP)</h3>
            <div className="stack">PHP · MySQL · AJAX</div>
            <ul className="pts">
              <li>Covers admissions, attendance, fee management and academic records.</li>
              <li>Role-based dashboards for Admin, Faculty and Students with real-time AJAX updates.</li>
              <li>Database design and query optimization in MySQL.</li>
            </ul>
          </Reveal>

          <Reveal as="article" className="card">
            <h3>Recruitment Management Portal</h3>
            <div className="stack">PHP · MySQL · Payment Gateway</div>
            <ul className="pts">
              <li>Candidate recruitment and examination portals for large hiring drives with high concurrent traffic.</li>
              <li>Secure candidate login with CAPTCHA and document upload workflow.</li>
              <li>Online payment integration with reference-number reconciliation.</li>
              <li>Notifications, hall ticket generation and status look-up, in a bilingual interface.</li>
            </ul>
          </Reveal>

          <Reveal as="article" className="card feature">
            <h3>Business &amp; E-Commerce Websites</h3>
            <div className="stack">HTML5 · CSS3 · JavaScript · PHP · Bootstrap</div>
            <ul className="pts single">
              <li>Informational and catalog-style websites for private clients in agricultural services and retail/monuments.</li>
              <li>Food products e-commerce storefront with product catalog, category browsing and shopping cart.</li>
              <li>Responsive, mobile-friendly layouts with admin-managed content across all client sites.</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

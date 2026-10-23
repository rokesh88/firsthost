import Reveal from "./Reveal.jsx";

const EDU = [
  ["Master of Science in Computer Science", "VELS University, Pallavaram", "2019 – 2021"],
  ["Bachelor of Science in Computer Science", "Jayagovind Harigopal Agarwal Agarsan College, Madhavaram", "2015 – 2018"],
];

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Education</span>
          <h2>Academic background</h2>
        </Reveal>
        <div className="edu">
          {EDU.map(([degree, school, years]) => (
            <Reveal className="card" key={degree}>
              <h3>{degree}</h3>
              <p>{school}</p>
              <p>{years}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

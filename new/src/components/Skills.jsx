export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-bg-text" data-parallax="-0.4">SKILLS</div>
      <div className="skills-header">
        <div className="section-label" data-reveal>03 — Toolkit</div>
        <h2 className="skills-title" data-reveal-words>What I work <em>with</em></h2>
      </div>

      <div className="skills-grid">
        <div className="skill-card card-a" data-reveal>
          <div className="skill-num">/01</div>
          <h3>Frontend</h3>
          <ul>
            <li>React · Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind · GSAP</li>
            <li>Three.js</li>
          </ul>
        </div>
        <div className="skill-card card-b" data-reveal>
          <div className="skill-num">/02</div>
          <h3>Mobile</h3>
          <ul>
            <li>Swift · SwiftUI</li>
            <li>Kotlin · Jetpack</li>
            <li>React Native</li>
            <li>Flutter</li>
          </ul>
        </div>
        <div className="skill-card card-c" data-reveal>
          <div className="skill-num">/03</div>
          <h3>Backend</h3>
          <ul>
            <li>Node · Express</li>
            <li>Postgres · Mongo</li>
            <li>GraphQL · tRPC</li>
            <li>AWS · Vercel</li>
          </ul>
        </div>
        <div className="skill-card card-d" data-reveal>
          <div className="skill-num">/04</div>
          <h3>Design</h3>
          <ul>
            <li>Figma · Framer</li>
            <li>Motion design</li>
            <li>Design systems</li>
            <li>Prototyping</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

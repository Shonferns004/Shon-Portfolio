export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-number" data-parallax="0.5">01</div>
      <div className="about-grid">
        <div className="about-label" data-reveal>About</div>
        <h2 className="about-text" data-reveal-words>
          Six years deep into shipping. I bridge the gap between design and engineering — turning sketches into
          smooth, performant products people actually love using.
        </h2>
        <div className="about-meta">
          <div className="meta-item" data-reveal>
            <span className="meta-num">60+</span>
            <span className="meta-label">Projects shipped</span>
          </div>
          <div className="meta-item" data-reveal>
            <span className="meta-num">12</span>
            <span className="meta-label">Awards</span>
          </div>
          <div className="meta-item" data-reveal>
            <span className="meta-num">∞</span>
            <span className="meta-label">Cups of coffee</span>
          </div>
        </div>
      </div>
    </section>
  )
}

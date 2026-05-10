export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="section-label" data-reveal>04 — Contact</div>
        <h2 className="contact-title">
          <span className="line" data-reveal>Got a project</span>
          <span className="line line-offset" data-reveal>in <em>mind?</em></span>
        </h2>
        <a href="mailto:hello@alexcarter.dev" className="contact-mail" data-reveal>
          hello@alexcarter.dev
          <span className="arrow">↗</span>
        </a>
        <div className="contact-socials" data-reveal>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Dribbble</a>
        </div>
      </div>

      <footer className="footer">
        <div>© 2026 Alex Carter</div>
        <div>Made with caffeine &amp; curiosity</div>
        <div>v3.2.1</div>
      </footer>
    </section>
  )
}

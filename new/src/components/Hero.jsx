import { useEffect, useRef } from 'react'

export default function Hero({ lenisRef }) {
  const words = ['React', '•', 'Next.js', '•', 'Swift', '•', 'Kotlin', '•', 'Three.js', '•', 'GSAP', '•', 'Node', '•', 'Figma', '•']
  const particlesRef = useRef(null)
  const heroRef = useRef(null)
  const scrollProgress = useRef(0)
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = particlesRef.current
    const hero = heroRef.current
    const lenis = lenisRef?.current
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      baseY: Math.random() * h,
      depth: Math.random() * 0.5 + 0.3,
    }))
    starsRef.current = stars

    const heroInner = hero.querySelector('.hero-inner')
    const heroBg = hero.querySelector('.hero-grid-bg')
    const heroMarquee = hero.querySelector('.hero-marquee')
    const heroGlow = hero.querySelector('.hero-img-glow-ring')
    const heroOrbs = hero.querySelectorAll('.hero-img-orb')
    const scrollInd = hero.querySelector('.scroll-indicator')
    const heroLines = hero.querySelectorAll('.hero-title .line')
    const scrollFill = hero.querySelector('.hero-scroll-fill')

    let ticking = false

    const updateHero = () => {
      const p = scrollProgress.current

      if (heroInner) {
        heroInner.style.transform = p > 0 ? `translateY(${-p * 60}px)` : ''
        heroInner.style.opacity = p > 0 ? `${Math.max(0, 1 - p * 1.5)}` : '1'
      }

      if (heroBg) {
        heroBg.style.transform = p > 0 ? `translateY(${-p * 30}px)` : ''
        heroBg.style.opacity = p > 0 ? `${0.15 * (1 - p * 0.5)}` : '0.15'
      }

      if (heroMarquee) {
        heroMarquee.style.opacity = p > 0 ? `${Math.max(0, 1 - p * 2)}` : '1'
      }

      if (scrollInd) {
        scrollInd.style.opacity = p > 0 ? `${Math.max(0, 1 - p * 3)}` : '1'
      }

      if (heroGlow) {
        heroGlow.style.transform = p > 0 ? `rotate(${p * 180}deg) scale(${1 - p * 0.1})` : ''
        heroGlow.style.opacity = p > 0 ? `${0.4 * (1 - p * 0.5)}` : '0.4'
      }

      heroOrbs.forEach((orb, i) => {
        const dir = i === 0 ? 1 : -1
        orb.style.transform = p > 0 ? `translate(${dir * p * 40}px, ${-p * 30}px) scale(${1 - p * 0.2})` : ''
        orb.style.opacity = p > 0 ? `${1 - p * 1.5}` : '1'
      })

      if (scrollFill) {
        scrollFill.style.width = `${p * 100}%`
      }

      heroLines.forEach((line, i) => {
        const offset = (i + 1) * 15
        line.style.transform = p > 0 ? `translateY(${-p * offset}px)` : ''
      })

      stars.forEach((s) => {
        s.dy = (Math.random() - 0.5) * 0.3 + p * 0.8
      })

      ticking = false
    }

    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / rect.height))
      scrollProgress.current = p

      if (!ticking) {
        requestAnimationFrame(updateHero)
        ticking = true
      }
    }

    if (lenis) {
      lenis.on('scroll', onScroll)
      onScroll()
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }

    setTimeout(() => {
      hero.querySelectorAll('[data-reveal], [data-reveal-words], .hero-title .line')
        .forEach((el) => el.classList.add('in'))
    }, 0)

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      stars.forEach((s) => {
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0) s.x = w
        if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h
        if (s.y > h) s.y = 0
        const alpha = s.o * (0.6 + 0.4 * Math.sin(t * 0.001 + s.phase)) * (1 - scrollProgress.current * 0.6)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * (1 - scrollProgress.current * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      if (lenis) lenis.off('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
    }
  }, [lenisRef])

  return (
    <section className="hero" ref={heroRef}>
      <canvas ref={particlesRef} className="hero-particles" />
      <div className="hero-grid-bg" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-tag" data-reveal>
            <span className="dot"></span>
            <span>Building digital experiences</span>
          </div>
          <h1 className="hero-title">
            <span className="line" data-reveal><em className="hero-em">Crafting</em></span>
            <span className="line" data-reveal>
              pixel-perfect
              <svg className="hero-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l1.5 6.5L20 9l-5 4.5 1.5 7L12 15l-5.5 5.5L8 13.5 3 9l6.5-0.5z" />
              </svg>
            </span>
            <span className="line" data-reveal>web &amp; <em className="hero-em">mobile</em></span>
            <span className="line hero-line-last" data-reveal>
              <span className="hero-gradient-text">products.</span>
            </span>
          </h1>

          <div className="hero-stats" data-reveal>
            <div className="hero-stat">
              <span className="hero-stat-num">6+</span>
              <span className="hero-stat-label">Years Exp</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">60+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">∞</span>
              <span className="hero-stat-label">Dedication</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-wrapper">
            <div className="hero-img-glow-ring" />
            <div className="hero-img" data-parallax="0.3">
              <div className="hero-img-inner">
                <div className="hero-img-grain" />
              </div>
              <div className="hero-img-border" />
            </div>
            <div className="hero-img-orb" />
            <div className="hero-img-orb hero-img-orb-2" />
          </div>
          <p className="hero-desc" data-reveal>
            I'm <strong>Alex Carter</strong> — a developer designing and shipping fast, accessible interfaces
            for ambitious teams across the globe.
          </p>

          <div className="hero-actions" data-reveal>
            <a href="#work" className="hero-btn hero-btn-primary">
              View my work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-progress">
        <div className="hero-scroll-fill" />
      </div>

      <div className="hero-marquee">
        <div className="marquee-track">
          {words.concat(words).map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

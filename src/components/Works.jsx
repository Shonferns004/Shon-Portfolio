import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import { useReveal, revealStyle } from './useReveal'

export default function Works() {
  const sectionRef = useRef(null)
  const labelRef = useReveal()
  const descRef = useReveal()
  const bannerRef = useReveal()

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.works-stack-card')
      if (!cards.length) return

      const isDesktop = window.matchMedia('(min-width: 1025px)').matches
      if (!isDesktop) return

      gsap.set(cards, { xPercent: -50, yPercent: -50, left: '50%', top: '50%' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.works-stack-wrap',
          start: 'top top',
          end: `+=${cards.length * 360}`,
          pin: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: cards.length - i })

        tl.fromTo(
          card,
          {
            y: 150,
            scale: 0.86,
            opacity: 0,
            rotateX: 12,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            duration: 0.38,
            ease: 'power3.out',
          },
          i * 0.42,
        )

        tl.to(
          card,
          {
            opacity: i === cards.length - 1 ? 1 : 0,
            scale: i === cards.length - 1 ? 1 : 0.92,
            y: i === cards.length - 1 ? 0 : -40,
            duration: 0.28,
            ease: 'power2.inOut',
          },
          i * 0.42 + 0.24,
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="works" ref={sectionRef} className="works-section" style={{ padding: '100px 48px', background: 'var(--bg2)' }}>
      <div className="works-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
        <div ref={labelRef} style={revealStyle(0)} className="section-label">Featured Works</div>
        <p ref={descRef} style={{ ...revealStyle(100), maxWidth: 360, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
          Full-screen center stack. Each project rises in and layers above the previous one as you scroll.
        </p>
      </div>

      <div className="works-stack-wrap">
        <div className="works-stack-stage">
          {projects.map((project, i) => (
            <WorkCard
              key={project.slug}
              title={project.title}
              slug={project.slug}
              tags={project.tags}
              coverImage={project.coverImage}
              index={i}
            />
          ))}
        </div>
      </div>

      <div ref={bannerRef} style={{ ...revealStyle(200), marginTop: 24, border: '1px solid var(--border)', background: 'var(--bg3)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '0.05em', color: 'var(--text)' }}>
          HIRE ME · WEB DESIGN · APP DESIGN · DEVELOPMENT
        </div>
        <HireLink />
      </div>
    </section>
  )
}

function HireLink() {
  const [hov, setHov] = useState(false)
  return (
    <a href="#contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 28px',
        background: hov ? 'rgba(200,240,96,0.85)' : 'var(--accent)',
        color: '#0a0a0a',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
        transition: 'opacity 0.2s',
        opacity: hov ? 0.85 : 1,
      }}
    >Let's Talk -&gt;</a>
  )
}

function WorkCard({ title, tags, slug, coverImage, index }) {
  const [hov, setHov] = useState(false)
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const showOverlay = hov || isCoarsePointer

  return (
    <a
      href={`/projects?project=${slug}`}
      className="hoverable works-stack-card"
      style={{ zIndex: 20 + index }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)), url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.4s ease',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '28px 32px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        transform: showOverlay ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {tags.map((t) => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(200,240,96,0.3)' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text)', letterSpacing: '0.04em' }}>{title}</div>
      </div>
    </a>
  )
}

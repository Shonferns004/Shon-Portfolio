import { useEffect, useRef, useState } from 'react'
import { useReveal, revealStyle, useParallax } from './useReveal'
import { projects } from '../data/projects'

const uniqueProjects = projects.filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)

const gradients = [
  'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
  'linear-gradient(45deg, #c8f060, #a0d830, #fff3e0)',
  'linear-gradient(225deg, #2d4a3e, #c8f060 80%)',
  'linear-gradient(135deg, #6a1b9a, #ec407a, #c8f060)',
]

export default function Works() {
  const containerRef = useRef(null)
  const labelRef = useReveal()
  const descRef = useReveal()
  const bannerRef = useReveal()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const visuals = container.querySelectorAll('.project-visual')

    // Store handlers in a Map so removeEventListener works correctly
    const handlers = new Map()

    const createHandlers = (visual) => {
      const onMove = (e) => {
        const rect = visual.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const img = visual.querySelector('.project-img')
        if (img) img.style.transform = `scale(1.04) translate(${x * 0.04}px, ${y * 0.04}px)`
      }
      const onLeave = () => {
        const img = visual.querySelector('.project-img')
        if (img) img.style.transform = ''
      }
      handlers.set(visual, { onMove, onLeave })
      visual.addEventListener('mousemove', onMove)
      visual.addEventListener('mouseleave', onLeave)
    }

    visuals.forEach((v) => createHandlers(v))

    return () => {
      visuals.forEach((v) => {
        const h = handlers.get(v)
        if (h) {
          v.removeEventListener('mousemove', h.onMove)
          v.removeEventListener('mouseleave', h.onLeave)
        }
      })
    }
  }, [])

  return (
    <section id="works" ref={containerRef} className="works-section" style={{ padding: '100px 48px', background: 'var(--bg2)' }}>
      <div className="works-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
        <div ref={labelRef} style={revealStyle(0)} className="section-label">Featured Works</div>
        <p ref={descRef} style={{ ...revealStyle(100), maxWidth: 400, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, textAlign: 'right' }}>
          Selected projects that showcase my approach to design, development, and problem-solving.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        {uniqueProjects.map((project, i) => {
          const align = i % 2 === 0 ? 'left' : 'right'
          const isWide = i === 2
          const gradient = gradients[i % gradients.length]

          return (
            <ProjectRow
              key={project.slug}
              project={project}
              align={align}
              isWide={isWide}
              gradient={gradient}
              index={i}
            />
          )
        })}
      </div>

      <div ref={bannerRef} style={{ ...revealStyle(200), marginTop: 80, border: '1px solid var(--border)', background: 'var(--bg3)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '0.05em', color: 'var(--text)' }}>
          HIRE ME · WEB DESIGN · APP DESIGN · DEVELOPMENT
        </div>
        <HireLink />
      </div>
    </section>
  )
}

function ProjectRow({ project, align, isWide, gradient, index }) {
  const infoRef = useReveal()
  const metaRef = useReveal()
  const titleRef = useReveal()
  const visualParallax = useParallax(align === 'right' ? 0.25 : 0.2)
  const [hov, setHov] = useState(false)

  const isRight = align === 'right'

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: isWide ? '1fr 3fr' : isRight ? '1.5fr 2fr 1fr' : '1fr 2fr 1.5fr',
    gap: '24px 32px',
    alignItems: isWide ? 'start' : 'center',
    paddingLeft: isRight ? '8%' : '0',
    paddingRight: isWide ? '5%' : '0',
    position: 'relative',
  }

  const metaStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--muted)',
    letterSpacing: '0.08em',
    textAlign: isRight ? 'right' : 'left',
  }

  const imageStyle = {
    width: '100%',
    height: '100%',
    background: gradient,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.8s cubic-bezier(.2,.8,.2,1)',
  }

  return (
    <div style={rowStyle}>
      {!isRight && !isWide && (
        <div ref={metaRef} style={{ ...revealStyle(0), ...metaStyle }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent)', lineHeight: 1, letterSpacing: '0.04em' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>2025</span>
        </div>
      )}

      <a
        href={`/projects?project=${project.slug}`}
        ref={visualParallax}
        className="project-visual"
        style={{
          aspectRatio: isWide ? '16 / 9' : '4 / 5',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          borderRadius: 4,
          position: 'relative',
          cursor: 'pointer',
          display: 'block',
          gridColumn: isWide ? '2' : 'auto',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div className="project-img" style={imageStyle} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${project.coverImage}) center/cover`,
          opacity: 0.7,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 4px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: hov ? 'rgba(200,240,96,0.04)' : 'transparent',
          transition: 'background 0.4s',
        }} />
      </a>

      <div
        ref={titleRef}
        style={{
          ...revealStyle(100),
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          gridColumn: isWide ? '2' : 'auto',
          gridRow: isWide ? '2' : 'auto',
          maxWidth: isWide ? 480 : 'none',
          justifySelf: isWide ? 'end' : 'auto',
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.2vw, 42px)', letterSpacing: '0.04em', lineHeight: 1, color: 'var(--text)' }}>
          {project.title}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 8px', border: '1px solid rgba(200,240,96,0.2)',
            }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 380 }}>
          {project.summary}
        </p>
        <a
          href={`/projects?project=${project.slug}`}
          style={{
            fontSize: 12, fontFamily: 'var(--font-mono)',
            color: 'var(--text)',
            borderBottom: '1px solid var(--text)',
            paddingBottom: 3,
            alignSelf: 'flex-start',
            transition: 'color 0.3s, border-color 0.3s',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
        >
          View case study →
        </a>
      </div>

      {isRight && (
        <div ref={metaRef} style={{ ...revealStyle(0), ...metaStyle, textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent)', lineHeight: 1, letterSpacing: '0.04em' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>2025</span>
        </div>
      )}
    </div>
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
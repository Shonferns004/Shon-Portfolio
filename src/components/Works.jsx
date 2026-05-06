import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'
import { projects } from '../data/projects'

export default function Works() {
  const labelRef = useReveal()
  const descRef = useReveal()
  const bannerRef = useReveal()

  return (
    <section id="works" className="works-section" style={{ padding: '100px 48px', background: 'var(--bg2)' }}>
      <div className="works-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
        <div ref={labelRef} style={revealStyle(0)} className="section-label">Featured Works</div>
        <p ref={descRef} style={{ ...revealStyle(100), maxWidth: 360, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
          A curated selection of projects that reflect a commitment to simplicity and purposeful design.
        </p>
      </div>

      <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {projects.map((project, i) => (
          <WorkCard
            key={project.slug}
            title={project.title}
            slug={project.slug}
            tags={project.tags}
            coverImage={project.coverImage}
            delay={i * 80}
          />
        ))}
      </div>

      <div ref={bannerRef} style={{ ...revealStyle(200), marginTop: 2, border: '1px solid var(--border)', background: 'var(--bg3)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
    >Let's Talk →</a>
  )
}

function WorkCard({ title, tags, delay, slug, coverImage }) {
  const [hov, setHov] = useState(false)
  const ref = useReveal()
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const showOverlay = hov || isCoarsePointer

  return (
    <a
      href={`/projects?project=${slug}`}
      ref={ref}
      className="hoverable"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...revealStyle(delay), position: 'relative', overflow: 'hidden', background: 'var(--bg3)', cursor: 'pointer', aspectRatio: '16/10', display: 'block' }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)), url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.4s ease',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
      }}>
      </div>
      {/* overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '28px 32px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        transform: showOverlay ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(200,240,96,0.3)' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text)', letterSpacing: '0.04em' }}>{title}</div>
      </div>
    </a>
  )
}

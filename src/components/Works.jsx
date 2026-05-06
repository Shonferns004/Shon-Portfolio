import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'

const works = [
  { title: 'AGENCIFY', tags: ['React', 'Node.js'], wide: false },
  { title: 'ONLY BILLS', tags: ['React', 'Firebase'], wide: false },
  { title: 'CANDREVA', tags: ['UI/UX', 'Framer'], wide: false },
  { title: 'TESLA REDESIGN', tags: ['UI/UX', 'Design'], wide: false },
]

export default function Works() {
  const labelRef = useReveal()
  const descRef = useReveal()
  const bannerRef = useReveal()

  return (
    <section id="works" style={{ padding: '100px 48px', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
        <div ref={labelRef} style={revealStyle(0)} className="section-label">Featured Works</div>
        <p ref={descRef} style={{ ...revealStyle(100), maxWidth: 360, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
          A curated selection of projects that reflect a commitment to simplicity and purposeful design.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {works.map((w, i) => <WorkCard key={i} {...w} delay={i * 80} />)}
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

function WorkCard({ title, tags, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className="hoverable"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...revealStyle(delay), position: 'relative', overflow: 'hidden', background: 'var(--bg3)', cursor: 'pointer', aspectRatio: '16/10' }}
    >
      {/* placeholder bg */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.4s ease',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'rgba(240,236,227,0.06)', letterSpacing: '0.05em' }}>{title}</span>
      </div>
      {/* overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '28px 32px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        transform: hov ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(200,240,96,0.3)' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text)', letterSpacing: '0.04em' }}>{title}</div>
      </div>
    </div>
  )
}

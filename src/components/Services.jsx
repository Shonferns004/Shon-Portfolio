import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'

const services = [
  { num: '01', name: 'APP DEV', sub: 'Mobile Applications', tags: ['React Native', 'iOS & Android', 'Supabase'] },
  { num: '02', name: 'UI/UX', sub: 'Web & App Design', tags: ['UX Research', 'Prototyping', 'Design Systems'] },
  { num: '03', name: 'WEBSITE', sub: 'Web Development', tags: ['React / Next.js', 'PWD', 'Performance SEO'] },
  { num: '04', name: 'BACKEND', sub: 'Server & APIs', tags: ['Node.js / Express', 'Fastify', 'Database Design'] },
]

export default function Services() {
  const labelRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="services" className="services-section" style={{ padding: '100px 48px' }}>
      <div ref={labelRef} style={{ ...revealStyle(0) }} className="section-label">Services</div>
      <div className="services-grid" ref={gridRef} style={{ ...revealStyle(100), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)' }}>
        {services.map((s, i) => <ServiceItem key={i} {...s} last={i === services.length - 1} />)}
      </div>
    </section>
  )
}

function ServiceItem({ num, name, sub, tags, last }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="service-item hoverable"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '40px 32px',
        borderRight: last ? 'none' : '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--accent)',
        transform: hov ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'bottom',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: hov ? '#0a0a0a' : 'var(--muted)', marginBottom: 20, transition: 'color 0.25s' }}>{num}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '0.04em', color: hov ? '#0a0a0a' : 'var(--text)', lineHeight: 1, marginBottom: 8, transition: 'color 0.25s' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: hov ? '#0a0a0a' : 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24, transition: 'color 0.25s' }}>{sub}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: hov ? '#0a0a0a' : 'var(--muted)', transition: 'color 0.25s' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

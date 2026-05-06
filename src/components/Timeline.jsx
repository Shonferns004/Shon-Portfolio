import { useReveal, revealStyle } from './useReveal'

const timeline = [
  {
    year: '2020',
    entries: [
      { role: 'Bachelor Degree of IT', org: 'University of Mumbai' },
      { role: 'Web Dev Certification', org: 'Udemy / FreeCodeCamp' },
    ],
  },
  // {
  //   year: '2019 – 2022',
  //   entries: [
  //     { role: 'Frontend Developer Intern', org: 'Startup Studio, Mumbai' },
  //     { role: 'Freelance Web Developer', org: 'Self-employed' },
  //   ],
  // },
  // {
  //   year: '2022 – NOW',
  //   entries: [
  //     { role: 'Full Stack Developer', org: 'Tech Agency, Mumbai' },
  //     { role: 'Solo Developer / Founder', org: 'Alex Studio' },
  //   ],
  // },
]

export default function Timeline() {
  const labelRef = useReveal()

  return (
    <section id="timeline" style={{ padding: '100px 48px', background: 'var(--bg2)' }}>
      <div ref={labelRef} style={revealStyle(0)} className="section-label">Education &amp; Experience</div>
      {timeline.map((group, i) => (
        <TimelineGroup key={i} {...group} delay={i * 80} />
      ))}
    </section>
  )
}

function TimelineGroup({ year, entries, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} style={{ ...revealStyle(delay), display: 'grid', gridTemplateColumns: '200px 1fr', marginBottom: 0 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', paddingTop: 20, borderTop: '1px solid var(--border)', position: 'sticky', top: 100, alignSelf: 'start' }}>
        {year}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: 48 }}>
        {entries.map((e, i) => <TimelineEntry key={i} {...e} />)}
      </div>
    </div>
  )
}

function TimelineEntry({ role, org }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        background: hov ? 'rgba(200,240,96,0.02)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{role}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.05em' }}>{org}</div>
      </div>
    </div>
  )
}

import { useState } from 'react'

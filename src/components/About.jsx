import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'

const skills = ['React JS', 'React Native', 'Node.js', 'Express', 'Firebase', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'Figma']
const stats = [{ num: '20+', label: 'Projects Completed' }, { num: '3+', label: 'Years Experience' }, { num: '15', label: 'Happy Clients' }]

export default function About() {
  const labelRef = useReveal()
  const headRef = useReveal()
  const bodyRef = useReveal()
  const skillsRef = useReveal()
  const statsRef = useReveal()
  const card1 = useReveal(), card2 = useReveal(), card3 = useReveal()
  const btnRef = useReveal()

  return (
    <section id="about" className="about-section" style={{ padding: '100px 48px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 80, alignItems: 'start' }}>
      <div>
        <div ref={labelRef} style={revealStyle(0)} className="section-label">Who Am I</div>
        <h2 ref={headRef} style={{ ...revealStyle(80), fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 8vw, 100px)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 32 }}>
          App Dev /<br /><span style={{ color: 'var(--accent)' }}>Website Dev</span>
        </h2>
        <p ref={bodyRef} style={{ ...revealStyle(160), fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
          I'm a passionate app and web developer focused on detail. Based in Mumbai, I build digital products that balance performance with great user experiences — from backend APIs to polished front-ends.
        </p>
        <div ref={skillsRef} style={{ ...revealStyle(220), display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {skills.map(s => <SkillChip key={s}>{s}</SkillChip>)}
        </div>
        <div className="about-stats" ref={statsRef} style={{ ...revealStyle(280), display: 'flex', gap: 48 }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1, color: 'var(--text)' }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 80 }}>
        {[
          { label: 'Location', value: 'Mumbai', ref: card1 },
          { label: 'Email', value: 'shawnferns004@gmail.com', ref: card2, small: true },
          // { label: 'Worldwide clients in', value: '15 Countries', ref: card3 },
        ].map((c) => (
          <div key={c.label} ref={c.ref} style={{ ...revealStyle(0), border: '1px solid var(--border)', background: 'var(--bg2)', padding: 28, marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: c.small ? 18 : 28, letterSpacing: '0.04em', color: 'var(--text)' }}>{c.value}</div>
          </div>
        ))}
        <ResumeBtn ref={btnRef} />
      </div>
    </section>
  )
}

function SkillChip({ children }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      className="hoverable"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '7px 14px',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: hov ? 'var(--accent)' : 'var(--muted)',
        letterSpacing: '0.05em',
        transition: 'border-color 0.2s, color 0.2s',
        cursor: 'default',
      }}
    >{children}</span>
  )
}

import { forwardRef } from 'react'
const ResumeBtn = forwardRef((_, ref) => {
  const [hov, setHov] = useState(false)
  return (
    <a ref={ref} href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...revealStyle(0),
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        width: '100%', padding: 16,
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border-hover)'}`,
        color: 'var(--text)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginTop: 24,
        background: hov ? 'rgba(200,240,96,0.05)' : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >↓ Download CV / Resume</a>
  )
})

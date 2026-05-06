import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'

export default function Contact() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal()

  return (
    <section id="contact" className="contact-section" style={{ padding: '100px 48px', background: 'var(--bg2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(200,240,96,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <p ref={r1} style={{ ...revealStyle(0), fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, position: 'relative' }}>
        Ready to collaborate?
      </p>
      <h2 ref={r2} style={{ ...revealStyle(80), fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 90px)', letterSpacing: '0.02em', lineHeight: 0.95, color: 'var(--text)', marginBottom: 24, position: 'relative' }}>
        HAVE A PROJECT<br />IN MIND?
      </h2>
      <p ref={r3} style={{ ...revealStyle(160), fontSize: 15, color: 'var(--muted)', marginBottom: 48, position: 'relative' }}>
        Let's create something extraordinary together.
      </p>
      <CTABtn ref={r4} />
    </section>
  )
}

import { forwardRef } from 'react'
const CTABtn = forwardRef((_, ref) => {
  const [hov, setHov] = useState(false)
  return (
    <a ref={ref} href="mailto:shawnferns004@gmail.com"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...revealStyle(240),
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '18px 40px',
        background: 'var(--accent)',
        color: '#0a0a0a',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
        transition: 'opacity 0.2s, transform 0.2s',
        opacity: hov ? 0.88 : 1,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
      }}
    >Contact Now →</a>
  )
})

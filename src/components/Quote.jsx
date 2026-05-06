import { useReveal, revealStyle } from './useReveal'

export default function Quote() {
  const ref = useReveal()
  return (
    <div ref={ref} style={{ ...revealStyle(0), padding: '80px 48px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', fontFamily: 'var(--font-display)', fontSize: 400, color: 'rgba(200,240,96,0.04)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '0.04em', color: 'var(--text)', maxWidth: 800, margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
        "GOOD DESIGN IS GOOD BUSINESS"
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
        Thomas J. Watson · Chairman of IBM
      </p>
    </div>
  )
}

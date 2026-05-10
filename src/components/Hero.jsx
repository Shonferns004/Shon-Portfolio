import { useState, useEffect, useRef } from 'react'
import { useReveal, revealStyle, useScrollProgress } from './useReveal'
import { useLenis } from '../context/LenisContext'

const badges = ['Available', 'NDA Ready', 'On-time Delivery']
const stack = ['React', 'Node.js', 'React Native', 'Supabase', 'Python', 'Express', 'MongoDB', 'TailwindCSS', 'HTML5']

export default function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal()
  const r5 = useReveal(), r6 = useReveal()
  const scrollPb = useScrollProgress()
  const heroRef = useRef(null)
  const lenisRef = useLenis()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return
    const onScroll = () => setScrollY(window.scrollY)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenisRef])

  const particleField = [
    { x: 8, y: 18, size: 5, depth: 0.45 },
    { x: 18, y: 72, size: 7, depth: 0.9 },
    { x: 28, y: 36, size: 6, depth: 0.75 },
    { x: 42, y: 22, size: 4, depth: 0.5 },
    { x: 56, y: 80, size: 8, depth: 1.1 },
    { x: 64, y: 48, size: 5, depth: 0.65 },
    { x: 73, y: 14, size: 6, depth: 0.8 },
    { x: 82, y: 64, size: 7, depth: 1.0 },
    { x: 92, y: 34, size: 5, depth: 0.6 },
  ]

  const progress = scrollPb.getProgress()
  const heroFade = Math.max(0, 1 - progress * 1.5)
  const heroTranslate = -progress * 50

  const onMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setPointer({ x, y })
  }
  const onTouchMove = (event) => {
    const touch = event.touches[0]
    if (!touch) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2
    setPointer({ x, y })
  }

  return (
    <section
      id="hero"
      className="hero-section"
      ref={heroRef}
      style={{
        ...heroStyle,
        transform: `translateY(${heroTranslate}px)`,
        opacity: heroFade,
        transition: progress > 0 ? 'none' : 'opacity 0.5s, transform 0.5s',
      }}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchMove}
      onTouchMove={onTouchMove}
    >
      <div style={{
        ...gridBg,
        transform: `translateY(${-progress * 30}px)`,
        opacity: 0.15 * (1 - progress * 0.5),
      }} />
      <div style={{
        ...glowStyle,
        transform: `translate(-50%, -50%) scale(${1 - progress * 0.2})`,
        opacity: 1 - progress * 1.5,
      }} />
      <div className="hero-particles" aria-hidden>
        {particleField.map((particle, index) => (
          <span
            key={`${particle.x}-${particle.y}-${index}`}
            className="hero-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              transform: `translate3d(${pointer.x * particle.depth * 14}px, ${(pointer.y * particle.depth * 14) + scrollY * 0.05 * particle.depth}px, 0)`,
              opacity: 1 - progress * 0.5,
            }}
          />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1, transform: `translateY(${-progress * 30}px)`, opacity: heroFade }}>
        <div ref={r1} style={{ ...tagStyle, ...revealStyle(0) }}>
          <span style={dotStyle} />
          Available for new projects
        </div>
        <span ref={r2} style={{ ...revealStyle(100), display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 13vw, 160px)', lineHeight: 0.88, letterSpacing: '0.01em', color: 'var(--text)' }}>
          SHON
        </span>
        <span ref={r3} style={{ ...revealStyle(180), display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 13vw, 160px)', lineHeight: 0.88, letterSpacing: '0.01em', color: 'var(--accent)', marginBottom: 32 }}>
          .DEV
        </span>
        <p ref={r4} style={{ ...revealStyle(240), fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
          Web & App Developer
        </p>
        <p ref={r4} style={{ ...revealStyle(300), fontSize: 15, color: 'var(--muted)', maxWidth: 400, lineHeight: 1.75 }}>
          I love creating captivating and functional interfaces that evoke emotions and establish a connection between brand and user.
        </p>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end', transform: `translateY(${-progress * 40}px)`, opacity: heroFade }}>
        <div ref={r5} style={{ ...revealStyle(100), ...cardStyle }}>
          <div style={cardLabel}>Status</div>
          <div style={cardValue}>Open to freelance & full-time roles</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {badges.map((b) => <Badge key={b} active={b === 'Available'}>{b}</Badge>)}
          </div>
        </div>
        <div ref={r6} style={{ ...revealStyle(200), ...cardStyle }}>
          <div style={cardLabel}>Core Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {stack.map((s) => <Badge key={s}>{s}</Badge>)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.8); }
        }
      `}</style>
    </section>
  )
}

function Badge({ children, active }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '5px 12px',
        border: `1px solid ${active ? 'var(--accent)' : hov ? 'var(--border-hover)' : 'var(--border)'}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: active ? 'var(--accent)' : hov ? 'var(--text)' : 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >{children}</span>
  )
}

const heroStyle = {
  minHeight: '100vh',
  padding: '140px 48px 80px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: 60,
  position: 'relative',
  overflow: 'hidden',
  willChange: 'transform, opacity',
}
const gridBg = {
  position: 'absolute', inset: 0,
  backgroundImage: 'linear-gradient(rgba(200,240,96,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,96,0.03) 1px, transparent 1px)',
  backgroundSize: '60px 60px',
  pointerEvents: 'none',
  willChange: 'transform, opacity',
}
const glowStyle = {
  position: 'absolute',
  width: 600, height: 600,
  background: 'radial-gradient(circle, rgba(200,240,96,0.06) 0%, transparent 70%)',
  top: '50%', left: '30%',
  pointerEvents: 'none',
  willChange: 'transform, opacity',
}
const tagStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  border: '1px solid var(--border-hover)',
  padding: '7px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--muted)',
  letterSpacing: '0.08em',
  marginBottom: 32,
}
const dotStyle = {
  width: 6, height: 6,
  borderRadius: '50%',
  background: 'var(--accent)',
  display: 'inline-block',
  animation: 'pulse 2s infinite',
}
const cardStyle = {
  width: '100%', maxWidth: 420,
  border: '1px solid var(--border)',
  background: 'var(--bg2)',
  padding: '28px 32px',
}
const cardLabel = {
  fontFamily: 'var(--font-mono)', fontSize: 10,
  color: 'var(--muted)', letterSpacing: '0.1em',
  textTransform: 'uppercase', marginBottom: 8,
}
const cardValue = { fontSize: 15, color: 'var(--text)', fontWeight: 500 }

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useReveal, revealStyle, useScrollProgress } from './useReveal'
import { useLenis } from '../context/LenisContext'

const badges = ['Available', 'NDA Ready', 'On-time Delivery']
const stack = ['React', 'Node.js', 'React Native', 'Supabase', 'Python', 'Express', 'MongoDB', 'TailwindCSS', 'HTML5']
const cubeColors = ['#22c55e', '#4ade80', '#c8f060', '#10b981', '#34d399', '#6ee7b7']

export default function Hero() {
  const [popped, setPopped] = useState({})
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal()
  const r5 = useReveal(), r6 = useReveal()
  const scrollPb = useScrollProgress()
  const heroRef = useRef(null)
  const lenisRef = useLenis()
  const [scrollY, setScrollY] = useState(0)
  const mouseRaf = useRef(null)

  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return
    const onScroll = () => setScrollY(window.scrollY)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenisRef])

  const cubes = useMemo(() => {
    const result = []
    const cols = 14, rows = 10
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({
          id: `${r}-${c}`,
          x: (c / (cols - 1)) * 100,
          y: (r / (rows - 1)) * 100,
          color: cubeColors[Math.floor(Math.random() * cubeColors.length)],
          rx: -12 + Math.random() * 24,
          ry: -12 + Math.random() * 24,
          size: 7 + Math.random() * 6,
        })
      }
    }
    return result
  }, [])

  const onMouseMove = useCallback((e) => {
    if (mouseRaf.current) cancelAnimationFrame(mouseRaf.current)
    mouseRaf.current = requestAnimationFrame(() => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      const newPopped = {}
      for (const cube of cubes) {
        const dx = cube.x - px
        const dy = cube.y - py
        if (Math.sqrt(dx * dx + dy * dy) < 10) newPopped[cube.id] = true
      }
      setPopped(newPopped)
    })
  }, [cubes])

  const onTouchMove = useCallback((e) => {
    const touch = e.touches[0]
    if (!touch) return
    onMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
  }, [onMouseMove])

  const progress = scrollPb.getProgress()
  const heroFade = Math.max(0, 1 - progress * 1.5)
  const heroTranslate = -progress * 50

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

      {/* Cubes */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, perspective: '800px',
      }}>
        {cubes.map((cube) => {
          const isPopped = !!popped[cube.id]
          return (
            <div key={cube.id} style={{
              position: 'absolute', left: `${cube.x}%`, top: `${cube.y}%`,
              width: cube.size, height: cube.size,
              marginLeft: -cube.size / 2, marginTop: -cube.size / 2,
              background: isPopped ? '#c8f060' : cube.color,
              transform: `perspective(800px) rotateX(${cube.rx}deg) rotateY(${cube.ry}deg) scale(${isPopped ? 1.8 : 0}) translateZ(${isPopped ? 20 : -20}px)`,
              opacity: isPopped ? 1 : 0.07,
              transition: isPopped
                ? 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s, background 0.2s'
                : 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s, background 0.3s',
              boxShadow: isPopped ? `0 0 12px ${cube.color}66` : 'none',
            }} />
          )
        })}
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

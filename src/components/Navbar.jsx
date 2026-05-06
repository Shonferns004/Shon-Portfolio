import { useState, useEffect } from 'react'

export default function Navbar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit',
        hour12: false, timeZone: 'Asia/Kolkata'
      })
      setTime(t + ' IST')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav style={navStyle}>
      <a href="#hero" style={logoStyle}>
        SHON<span style={{ color: 'var(--accent)' }}>.</span>
      </a>
      <div style={metaStyle}>
        <span>Mumbai, India</span>
        <span style={{ color: 'var(--text)' }}>{time}</span>
        <span>shawnferns004@gmail.com</span>
      </div>
      <a href="#contact" style={ctaStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#0a0a0a' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
      >
        Contact Now →
      </a>
    </nav>
  )
}

const navStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '20px 48px',
  borderBottom: '1px solid var(--border)',
  background: 'rgba(10,10,10,0.85)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
}
const logoStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 22,
  letterSpacing: '0.08em',
  color: 'var(--text)',
}
const metaStyle = {
  display: 'flex', gap: 32, alignItems: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--muted)',
  letterSpacing: '0.05em',
}
const ctaStyle = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '10px 22px',
  border: '1px solid var(--accent)',
  color: 'var(--accent)',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  background: 'transparent',
  transition: 'background 0.2s, color 0.2s',
}

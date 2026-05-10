import { useEffect, useRef, useState } from 'react'

const quotes = [
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Programs must be written for people to read.', author: 'Harold Abelson' },
  { text: 'Good code is its own best documentation.', author: 'Steve McConnell' },
  { text: 'The only way to learn a new language is by writing programs in it.', author: 'Dennis Ritchie' },
  { text: 'First do it, then do it right, then do it better.', author: 'Addy Osmani' },
  { text: 'The art of programming is the art of organizing complexity.', author: 'Edsger Dijkstra' },
  { text: 'Code never lies, comments sometimes do.', author: 'Ron Jeffries' },
  { text: 'A language that doesn\'t affect the way you think about programming is not worth knowing.', author: 'Alan Perlis' },
  { text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupéry' },
  { text: 'Debugging is twice as hard as writing the code in the first place.', author: 'Brian Kernighan' },
]

export default function SplashScreen({ onFinish }) {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])
  const [gone, setGone] = useState(false)
  const splashRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      if (splashRef.current) {
        splashRef.current.style.transition = 'transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)'
        splashRef.current.style.transform = 'translateY(-100%)'
      }
      setTimeout(() => { setGone(true); onFinish() }, 600)
    }, 8000)
    return () => { clearTimeout(timer); document.body.style.overflow = '' }
  }, [])

  if (gone) return null

  const s = (v) => ({ ...v })

  return (
    <div ref={splashRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a', color: '#c9c6c5',
      fontFamily: '"Hanken Grotesk", sans-serif',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
        opacity: 0.04,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      }} />

      {/* Marquee background text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'none', userSelect: 'none',
      }}>
        <div style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(60px, 12vw, 160px)',
          fontWeight: 900, letterSpacing: '-0.04em',
          color: 'rgba(201,198,197,0.04)',
          whiteSpace: 'nowrap',
          animation: 'spMarquee 18s linear infinite',
          transform: 'rotate(12deg)',
        }}>
          PORTFOLIO.SHON.DEV &nbsp;&nbsp;&nbsp; PORTFOLIO.SHON.DEV &nbsp;&nbsp;&nbsp; PORTFOLIO.SHON.DEV
        </div>
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        width: '100%', maxWidth: 1280, padding: '0 64px',
      }}>
        {/* Meta */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32,
          opacity: 0.4,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, letterSpacing: '0.05em',
        }}>
          <span>&gt;&gt;</span>
          <span>PORTFOLIO.SHON.DEV</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(56px, 12vw, 120px)',
          fontWeight: 900,
          lineHeight: '110px',
          letterSpacing: '-0.04em',
          color: '#b4d400',
          margin: '0 0 16px',
          textTransform: 'uppercase',
        }}>
          Shon
        </h1>

        {/* Roles */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          color: '#c9c6c5', opacity: 0.8,
          fontSize: 18, letterSpacing: '0.01em',
          marginBottom: 120,
        }}>
          <span>Developer</span>
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span>Designer</span>
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span>Creator</span>
        </div>

        {/* Quote */}
        <div style={{
          width: '100%', maxWidth: 560,
          textAlign: 'left',
          borderLeft: '1px solid rgba(180,212,0,0.3)',
          padding: '16px 0 16px 32px',
        }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 24,
            fontStyle: 'italic',
            color: '#b4d400',
            opacity: 0.9,
            lineHeight: 1.3,
            margin: '0 0 16px',
          }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12, letterSpacing: '0.05em',
            color: 'rgba(201,198,197,0.6)',
          }}>
            <span style={{ width: 16, height: 1, background: 'rgba(201,198,197,0.2)' }} />
            <span>{quote.author.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div style={{
        position: 'absolute', bottom: 48,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12, letterSpacing: '0.05em', opacity: 0.4,
      }}>
        <span style={{ letterSpacing: '0.3em' }}>
          LOADING <span style={{ animation: 'spDot 1.4s steps(1) infinite' }}>.</span>
          <span style={{ animation: 'spDot 1.4s steps(1) 0.35s infinite' }}>.</span>
          <span style={{ animation: 'spDot 1.4s steps(1) 0.7s infinite' }}>.</span>
        </span>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, #b4d400, transparent)',
        }} />
      </div>

      <style>{`
        @keyframes spDot { 0%,100% { opacity:0.2 } 50% { opacity:1 } }
        @keyframes spMarquee {
          0% { transform: rotate(12deg) translateX(0); }
          100% { transform: rotate(12deg) translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}

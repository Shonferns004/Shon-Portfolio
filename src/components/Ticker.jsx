const items = [
  'APP DEVELOPMENT', 'WEB DESIGN', 'UI/UX RESEARCH',
  'BACKEND DEV', 'RESULT-DRIVEN', 'ON-TIME DELIVERY',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0', background: 'var(--bg2)' }}>
      <div style={trackStyle}>
        {doubled.map((item, i) => (
          <div key={i} style={itemStyle}>
            {item} <span style={{ color: 'var(--accent)' }}>//</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}

const trackStyle = {
  display: 'flex',
  width: 'max-content',
  animation: 'ticker 28s linear infinite',
}
const itemStyle = {
  display: 'flex', alignItems: 'center', gap: 24,
  padding: '0 40px',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--muted)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
}

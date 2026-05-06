import { useState } from 'react'

const links = ['GITHUB', 'IG', 'LINKEDIN']

export default function Footer() {
  return (
    <footer className="site-footer" style={{ padding: '28px 48px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
      <span>©2025 Shon.Dev</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {links.map(l => <FooterLink key={l}>{l}</FooterLink>)}
      </div>
      <a href="#hero" style={footerLinkBase} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
        ↑ Back to Top
      </a>
    </footer>
  )
}

function FooterLink({ children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...footerLinkBase, color: hov ? 'var(--accent)' : 'var(--muted)' }}
    >{children}</a>
  )
}

const footerLinkBase = { letterSpacing: '0.08em', transition: 'color 0.2s', color: 'var(--muted)' }

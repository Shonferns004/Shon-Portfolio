import { useState } from 'react'
import { useReveal, revealStyle } from './useReveal'

const faqs = [
  { q: 'What do I need to get started?', a: 'Simply share your project details and goals. I\'ll guide you through the process and provide the tools and support needed to bring your vision to life — from initial scoping to final delivery.' },
  { q: 'What kind of projects do you take on?', a: 'I work on web apps, mobile apps, landing pages, SaaS products, and UI/UX design projects. If it involves building something great on the web, I\'m interested.' },
  { q: 'Do you sign NDAs?', a: 'Yes, absolutely. I\'m happy to sign NDAs before discussing any sensitive project details. Confidentiality is a standard part of my professional process.' },
  { q: 'What is your typical timeline?', a: 'Timelines vary by project scope. A landing page may take 1–2 weeks, while a full web or mobile app can take 4–12 weeks. I commit to deadlines and communicate proactively.' },
  { q: 'How do we communicate during the project?', a: 'I use email, Slack, or WhatsApp — whatever works best for you. You\'ll get regular updates and access to a shared project board so you\'re never in the dark.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const labelRef = useReveal()

  return (
    <section id="faq" style={{ padding: '100px 48px', maxWidth: 900 }}>
      <div ref={labelRef} style={revealStyle(0)} className="section-label">FAQ</div>
      {faqs.map((f, i) => (
        <FAQItem key={i} num={String(i + 1).padStart(2, '0')} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </section>
  )
}

function FAQItem({ num, q, a, open, onToggle }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <button
        className="hoverable"
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: '100%', background: 'none', border: 'none',
          color: hov || open ? 'var(--accent)' : 'var(--text)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
          textAlign: 'left', padding: '22px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 24, cursor: 'pointer',
          transition: 'color 0.2s',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 28 }}>{num}</span>
          <span>{q}</span>
        </div>
        <span style={{
          fontSize: 20, color: 'var(--accent)', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.25s',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
        fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: 44,
      }}>
        <p style={{ paddingBottom: 20 }}>{a}</p>
      </div>
    </div>
  )
}

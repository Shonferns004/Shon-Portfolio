import { useEffect, useRef } from 'react'
import { useReveal, revealStyle } from './useReveal'

const items = [
  {
    num: '01', colStart: 1, colSpan: 7, mt: 0,
    numPos: { top: -64, left: -32 },
    bg: 'rgba(28,27,27,0.8)',
    highlight: true,
    slideFrom: 'left',
    q: 'What do I need to get started?',
    a: 'Simply share your project details and goals. I\'ll guide you through the process and provide the tools and support needed to bring your vision to life — from initial scoping to final delivery.',
  },
  {
    num: '02', colStart: 6, colSpan: 6, mt: -96,
    numPos: { top: -64, right: -32 },
    bg: 'rgba(43,42,42,0.8)',
    slideFrom: 'right',
    q: 'What kind of projects do you take on?',
    a: 'I focus on high-impact architectural systems, ranging from monolithic digital structures to complex editorial experiences. If it requires structural integrity and soul, it\'s a project for me.',
  },
  {
    num: '03', colStart: 2, colSpan: 5, mt: 0,
    numPos: { bottom: -64, left: -48 },
    bg: 'rgba(14,14,14,0.8)',
    slideFrom: 'left',
    q: 'Do you sign NDAs?',
    a: 'Standard mutual non-disclosure agreements are part of my onboarding flow for all sensitive commercial ventures to ensure project integrity.',
  },
  {
    num: '04', colStart: 8, colSpan: 5, mt: 48,
    numPos: { top: '50%', right: -64, centerY: true },
    bg: 'rgba(20,19,19,0.8)',
    slideFrom: 'right',
    q: 'What is your typical timeline?',
    a: 'Project durations vary based on structural complexity. Initial prototypes are usually delivered within 4 weeks, with full-scale completion ranging from 2-4 months.',
  },
  {
    num: '05', colStart: 4, colSpan: 6, mt: -48,
    numPos: { top: -96, left: '25%' },
    bg: 'rgba(28,27,27,0.8)',
    slideFrom: 'left',
    q: 'How do we communicate during the project?',
    a: 'I utilize a direct asynchronous portal for all updates. Bi-weekly syncs are scheduled to review structural milestones and refine the architectural direction.',
  },
]

export default function FAQ() {
  const labelRef = useReveal()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const structRef = useRef(null)
  const lastScrollY = useRef(window.scrollY)
  const prevVisible = useRef(new Map())

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY
          const goingDown = sy > lastScrollY.current
          lastScrollY.current = sy

          if (structRef.current) {
            structRef.current.style.transform = `translateY(${sy * 0.06}px)`
          }

          const cards = gridRef.current?.querySelectorAll('.reveal-card')
          if (cards) {
            cards.forEach((card, i) => {
              const rect = card.getBoundingClientRect()
              const inView = rect.top < window.innerHeight - 80 && rect.bottom > 80
              const wasInView = prevVisible.current.get(i) || false
              const item = items[i]
              const hiddenX = item.slideFrom === 'left' ? -120 : 120

              if (inView && !wasInView) {
                prevVisible.current.set(i, true)
                if (goingDown) {
                  card.style.opacity = '1'
                  card.style.transform = 'translateX(0)'
                  card.style.transitionDelay = `${i * 0.12}s`
                } else {
                  card.style.opacity = '0'
                  card.style.transform = `translateX(${hiddenX}px)`
                  card.style.transitionDelay = '0s'
                }
              } else if (!inView && wasInView) {
                prevVisible.current.set(i, false)
                card.style.opacity = '0'
                card.style.transform = `translateX(${hiddenX}px)`
                card.style.transitionDelay = '0s'
              } else if (inView) {
                card.style.opacity = '1'
                card.style.transform = 'translateX(0)'
              }

              const num = card.querySelector('.parallax-num')
              if (num && rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.04 + i * 0.015
                const offset = (window.innerHeight - rect.top) * speed
                num.style.transform = `translateY(${offset}px)`
              }
            })
          }

          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section id="faq" className="faq-section" ref={sectionRef} style={{
        padding: '100px 48px',
        position: 'relative', overflow: 'hidden',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div ref={structRef} style={{
          position: 'absolute', top: 0, right: 0, opacity: 0.04,
          pointerEvents: 'none', overflow: 'hidden', userSelect: 'none',
          fontFamily: '"Playfair Display", serif', fontSize: 300,
          lineHeight: 1, color: '#c9c6c5',
          willChange: 'transform',
        }}>
          STRUCT
        </div>

        <div ref={labelRef} className="faq-header" style={{ ...revealStyle(0), width: '33.33%', marginBottom: 80 }}>
          <h1 className="faq-title" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 80, lineHeight: '88px', letterSpacing: '-0.02em', fontWeight: 900,
            color: '#c9c6c5', marginBottom: 32,
          }}>
            FAQ
          </h1>
          <div style={{ width: 48, height: 2, background: '#b4d400', marginBottom: 24 }} />
          <p style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: 18, lineHeight: '28px', letterSpacing: '0.01em',
            color: 'rgba(196,199,199,0.8)', maxWidth: 320,
          }}>
            Find answers to common inquiries regarding my architectural development methodology and engagement process.
          </p>
        </div>

        <div ref={gridRef} className="faq-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
        }}>
          {items.map((item, i) => (
            <div
              key={item.num}
              className="reveal-card faq-card"
              style={{
                gridColumn: `${item.colStart} / span ${item.colSpan}`,
                marginTop: item.mt,
                opacity: 0,
                transform:
                  item.slideFrom === 'left'
                    ? 'translateX(-120px)'
                    : 'translateX(120px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{
                position: 'relative',
                padding: 48,
                background: item.bg,
                backdropFilter: 'blur(4px)',
                boxShadow: '24px 24px 0px 0px rgba(0,0,0,0.6)',
              }}>
                <div
                  className="parallax-num"
                  style={{
                    position: 'absolute',
                    top: item.numPos.top,
                    left: item.numPos.left,
                    right: item.numPos.right,
                    bottom: item.numPos.bottom,
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 180, lineHeight: 1,
                    fontWeight: 900,
                    WebkitTextStroke: '1px rgba(229,226,225,0.1)',
                    color: 'transparent',
                    userSelect: 'none', pointerEvents: 'none',
                    zIndex: 0,
                    willChange: 'transform',
                  }}
                >
                  {item.num}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 32, lineHeight: 1.2,
                    fontWeight: 700, letterSpacing: '-0.01em',
                    color: item.highlight ? '#b4d400' : '#c9c6c5',
                    marginBottom: 40,
                    paddingRight: 40,
                  }}>
                    {item.q}
                  </h3>
                  <p style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11, lineHeight: 1.8,
                    letterSpacing: '0.05em',
                    color: 'rgba(229,226,225,0.7)',
                    textTransform: 'uppercase',
                    maxWidth: 432,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <style>{`
        @media (max-width: 1024px) {
          .faq-header { width: 100% !important; }
          .faq-title { font-size: 56px !important; line-height: 60px !important; }
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-card {
            grid-column: 1 !important;
            margin-top: 0 !important;
            margin-bottom: 16px;
          }
          .faq-card .parallax-num { display: none !important; }
          .faq-card > div { padding: 24px !important; box-shadow: 12px 12px 0px 0px rgba(0,0,0,0.6) !important; }
          .faq-card h3 { font-size: 24px !important; margin-bottom: 20px !important; padding-right: 0 !important; }
          .faq-card p { max-width: 100% !important; }
          .faq-header .faq-title { font-size: 44px !important; line-height: 48px !important; }
          .faq-header p { max-width: 100% !important; }
          .faq-section .faq-num-bg { display: none !important; }
          .faq-bottom-graphic { height: 300px !important; }
          .faq-bottom-graphic h2 { font-size: 36px !important; }
          .faq-bottom-graphic > div:last-child { left: 24px !important; bottom: 24px !important; }
          .faq-bottom-section { margin-top: 80px !important; }
        }
      `}</style>
    </>
  )
}

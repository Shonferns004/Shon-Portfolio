import { useEffect, useRef } from 'react'

const projects = [
  {
    id: 1,
    num: '01',
    year: '2025',
    imgClass: 'img-1',
    title: 'Lumen Banking App',
    tags: 'iOS · SwiftUI · Fintech',
    desc: 'A reimagined mobile banking experience with biometric flows and zero-friction transfers.',
    position: 'left',
  },
  {
    id: 2,
    num: '02',
    year: '2025',
    imgClass: 'img-2',
    title: 'Nova Commerce',
    tags: 'Next.js · Stripe · E-commerce',
    desc: 'Headless storefront with sub-second loads and an animation-first product browser.',
    position: 'right',
  },
  {
    id: 3,
    num: '03',
    year: '2024',
    imgClass: 'img-3',
    title: 'Atlas Travel',
    tags: 'React Native · Maps · GSAP',
    desc: 'Cross-platform travel companion with offline maps and AI-powered itineraries.',
    position: 'wide',
  },
  {
    id: 4,
    num: '04',
    year: '2024',
    imgClass: 'img-4',
    title: 'Pulse Dashboard',
    tags: 'SaaS · D3.js · Real-time',
    desc: 'Real-time analytics platform handling 10M+ events daily with buttery smooth charts.',
    position: 'right',
  },
]

export default function Work() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const visuals = container.querySelectorAll('.project-visual')

    const onMove = (e, visual) => {
      const rect = visual.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const img = visual.querySelector('.project-img')
      if (img) img.style.transform = `scale(1.04) translate(${x * 0.04}px, ${y * 0.04}px)`
    }

    const onLeave = (e) => {
      const img = e.currentTarget.querySelector('.project-img')
      if (img) img.style.transform = ''
    }

    visuals.forEach((v) => {
      v.addEventListener('mousemove', (e) => onMove(e, v))
      v.addEventListener('mouseleave', onLeave)
    })

    return () => {
      visuals.forEach((v) => {
        v.removeEventListener('mousemove', (e) => onMove(e, v))
        v.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <section className="work" id="work" ref={containerRef}>
      <div className="work-header">
        <div className="section-label" data-reveal>02 — Selected Work</div>
        <h2 className="work-title" data-reveal-words>Recent <em>projects</em></h2>
      </div>

      <div className="projects">
        {projects.map((p) => {
          const isRight = p.position === 'right'
          const isWide = p.position === 'wide'

          return (
            <article className={`project project-${p.id}`} key={p.id}>
              {!isRight && !isWide && (
                <div className="project-meta" data-reveal>
                  <span>{p.num}</span>
                  <span>{p.year}</span>
                </div>
              )}

              <div
                className={`project-visual ${isWide ? 'project-visual-wide' : ''} ${isRight ? 'project-visual-right' : ''}`}
                data-parallax={isWide ? '0.15' : isRight ? '0.25' : '0.2'}
              >
                <div className={`project-img ${p.imgClass}`}></div>
              </div>

              <div className={`project-info ${isRight ? 'project-info-left' : ''} ${isWide ? 'project-info-bottom' : ''}`}>
                <h3 className="project-title" data-reveal-words>{p.title}</h3>
                <p className="project-tags" data-reveal>{p.tags}</p>
                <p className="project-desc" data-reveal>{p.desc}</p>
                <a href="#" className="project-link" data-reveal>View case study →</a>
              </div>

              {isRight && (
                <div className="project-meta project-meta-right" data-reveal>
                  <span>{p.num}</span>
                  <span>{p.year}</span>
                </div>
              )}

              {isWide && (
                <div className="project-meta" data-reveal>
                  <span>{p.num}</span>
                  <span>{p.year}</span>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

import { useMemo } from 'react'
import { useReveal, revealStyle } from './useReveal'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const labelRef = useReveal()
  const contentRef = useReveal()
  const querySlug = useMemo(() => new URLSearchParams(window.location.search).get('project'), [])
  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === querySlug) ?? projects[0],
    [querySlug]
  )

  return (
    <section id="projects" className="projects-page mx-auto max-w-7xl" style={{ padding: '140px 48px 80px' }}>
      <div ref={labelRef} style={revealStyle(0)} className="section-label">Detailed Projects</div>
      <div className="projects-layout">
        <aside className="projects-sidebar">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/projects?project=${project.slug}`}
              className={project.slug === selectedProject.slug ? 'project-link active' : 'project-link'}
            >
              <span>{project.title}</span>
              <span>{project.category}</span>
            </a>
          ))}
        </aside>
        <article ref={contentRef} className="projects-content" style={revealStyle(120)}>
          <p className="projects-kicker">{selectedProject.category}</p>
          <h1 className="projects-title">{selectedProject.title}</h1>
          <img className="projects-main-image" src={selectedProject.coverImage} alt={`${selectedProject.title} preview`} />
          <p className="projects-summary">{selectedProject.summary}</p>
          <div className="projects-tags">
            {selectedProject.tags.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="projects-explanation">
            {selectedProject.detailedExplanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="projects-points">
            {selectedProject.highlights.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
          <div className="projects-gallery">
            {selectedProject.gallery.map((image) => (
              <img key={image} src={image} alt={`${selectedProject.title} case study visual`} />
            ))}
          </div>
          <a href="/#contact" className="projects-cta">Start Similar Project</a>
        </article>
      </div>
    </section>
  )
}

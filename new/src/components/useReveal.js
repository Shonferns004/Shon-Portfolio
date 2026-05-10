import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => entry.target.classList.add('in'), delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    const targets = el.querySelectorAll('[data-reveal], [data-reveal-words], .hero-title .line, .contact-title .line')
    targets.forEach((t, i) => {
      if (t.classList.contains('line')) t.dataset.delay = i * 90
      observer.observe(t)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}

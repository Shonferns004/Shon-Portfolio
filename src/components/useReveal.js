import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'perspective(1100px) translateY(0) rotateX(0deg) scale(1)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function revealStyle(delay = 0) {
  return {
    opacity: 0,
    transform: 'perspective(1100px) translateY(28px) rotateX(7deg) scale(0.985)',
    transformOrigin: '50% 100%',
    willChange: 'transform, opacity',
    transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  }
}

import { useEffect, useRef } from 'react'
import { useLenis } from '../context/LenisContext'

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

export function useParallax(speed = 0.2) {
  const ref = useRef(null)
  const lenisRef = useLenis()

  useEffect(() => {
    const el = ref.current
    const lenis = lenisRef?.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vh = window.innerHeight / 2
      const offset = -(center - vh) * speed
      if (el.style.transform !== `translate3d(0, ${offset}px, 0)`) {
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }

    if (lenis) {
      lenis.on('scroll', update)
      update()
    } else {
      window.addEventListener('scroll', update, { passive: true })
      update()
    }

    return () => {
      if (lenis) lenis.off('scroll', update)
      else window.removeEventListener('scroll', update)
    }
  }, [speed, lenisRef])

  return ref
}

export function useScrollProgress() {
  const ref = useRef(null)
  const progress = useRef(0)
  const lenisRef = useLenis()

  useEffect(() => {
    const el = ref.current
    const lenis = lenisRef?.current
    if (!el) return

    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / rect.height))
      progress.current = p
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    if (lenis) {
      lenis.on('scroll', onScroll)
      onScroll()
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
    }
  }, [lenisRef])

  return { ref, getProgress: () => progress.current }
}

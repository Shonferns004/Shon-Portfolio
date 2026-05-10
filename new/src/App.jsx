import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    document.querySelectorAll('[data-reveal-words]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/)
      el.innerHTML = words.map((w) => `<span class="word"><span>${w}</span></span>`).join(' ')
    })

    document.querySelectorAll('.hero-title .line, .contact-title .line').forEach((line) => {
      line.innerHTML = `<span>${line.innerHTML}</span>`
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => entry.target.classList.add('in'), delay)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    document.querySelectorAll('[data-reveal], [data-reveal-words], .hero-title .line, .contact-title .line')
      .forEach((el, i) => {
        if (el.classList.contains('line')) el.dataset.delay = i * 90
        revealObserver.observe(el)
      })

    const parallaxEls = document.querySelectorAll('[data-parallax]')
    lenis.on('scroll', () => {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax)
        const rect = el.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const distance = elementCenter - viewportCenter
        const offset = -distance * speed
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      })
    })

    lenis.emit('scroll')

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div className="noise" />
      <Cursor />
      <Navbar />
      <main>
        <Hero lenisRef={lenisRef} />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

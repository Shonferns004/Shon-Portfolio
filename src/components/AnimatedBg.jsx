import { useEffect, useRef } from 'react'

export default function AnimatedBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w, h, scrollY = 0, particles = []
    const count = 50
    let raf

    function resize() {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * devicePixelRatio; canvas.height = h * devicePixelRatio
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    function init() {
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: 0.6 + Math.random() * 1.8,
          a: 0.06 + Math.random() * 0.12,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    resize(); init()

    const onScroll = () => { scrollY = window.scrollY || window.pageYOffset }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { resize() })

    function loop() {
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        const drift = Math.sin(scrollY * 0.002 + p.phase) * 6
        const bob = Math.sin(scrollY * 0.0015 + p.phase * 0.7) * 4
        const dx = p.x + drift
        const dy = p.y + bob

        ctx.beginPath()
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74, 222, 128, ${p.a})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i += 3) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.02 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', width: '100vw', height: '100vh',
      }}
    />
  )
}

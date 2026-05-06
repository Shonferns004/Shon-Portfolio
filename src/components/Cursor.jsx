import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx - 18) * 0.12
      pos.current.ry += (my - pos.current.ry - 18) * 0.12
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.current.rx}px, ${pos.current.ry}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const addHover = () => ringRef.current?.classList.add('cursor-hover')
    const removeHover = () => ringRef.current?.classList.remove('cursor-hover')
    const targets = document.querySelectorAll('a, button, .hoverable')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={dotStyle} className="cursor-dot" />
      <div ref={ringRef} style={ringStyle} className="cursor-ring" />
      <style>{`
        .cursor-ring { transition: width 0.25s, height 0.25s, border-color 0.25s; }
        .cursor-ring.cursor-hover { width: 56px !important; height: 56px !important; border-color: #c8f060 !important; }
      `}</style>
    </>
  )
}

const dotStyle = {
  width: 10, height: 10,
  background: '#c8f060',
  borderRadius: '50%',
  position: 'fixed',
  top: 0, left: 0,
  pointerEvents: 'none',
  zIndex: 9999,
  mixBlendMode: 'difference',
}

const ringStyle = {
  width: 36, height: 36,
  border: '1px solid rgba(200,240,96,0.4)',
  borderRadius: '50%',
  position: 'fixed',
  top: 0, left: 0,
  pointerEvents: 'none',
  zIndex: 9998,
}

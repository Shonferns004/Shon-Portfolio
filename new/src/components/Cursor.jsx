import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const follow = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouch = 'ontouchstart' in window
    if (isTouch) {
      document.body.classList.add('touch-device')
      return
    }

    const onMouse = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      follow.current.x += (mouse.current.x - follow.current.x) * 0.15
      follow.current.y += (mouse.current.y - follow.current.y) * 0.15
      if (followRef.current) {
        followRef.current.style.left = follow.current.x + 'px'
        followRef.current.style.top = follow.current.y + 'px'
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouse)
    requestAnimationFrame(animate)

    const hoverEls = document.querySelectorAll('a, .skill-card, .project-visual, .nav-cta')
    const addHover = () => followRef.current?.classList.add('hover')
    const rmHover = () => followRef.current?.classList.remove('hover')
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmHover)
    })

    return () => {
      document.removeEventListener('mousemove', onMouse)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', rmHover)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followRef} className="cursor-follow" />
    </>
  )
}

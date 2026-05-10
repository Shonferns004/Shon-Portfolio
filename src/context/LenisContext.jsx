import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const LenisCtx = createContext(null)

export function LenisProvider({ children }) {
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

    return () => lenis.destroy()
  }, [])

  return <LenisCtx.Provider value={lenisRef}>{children}</LenisCtx.Provider>
}

export function useLenis() {
  return useContext(LenisCtx)
}

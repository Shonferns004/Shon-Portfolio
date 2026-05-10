import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1, 6.5)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Brighter lights
    scene.add(new THREE.AmbientLight(0x444466, 0.6))
    const dl = new THREE.DirectionalLight(0xc8f060, 1.2); dl.position.set(5, 10, 7); scene.add(dl)
    const fl = new THREE.DirectionalLight(0x8888ff, 0.5); fl.position.set(-5, -3, 5); scene.add(fl)
    const bl = new THREE.DirectionalLight(0x4ade80, 0.6); bl.position.set(0, -3, -5); scene.add(bl)
    const fill = new THREE.DirectionalLight(0xffffff, 0.3); fill.position.set(-2, 5, -3); scene.add(fill)

    const group = new THREE.Group()
    scene.add(group)

    // ── Canvas texture for terminal screen ─────────────────────
    const texCanvas = document.createElement('canvas')
    texCanvas.width = 640; texCanvas.height = 400
    const ctx = texCanvas.getContext('2d')

    const screenTexture = new THREE.CanvasTexture(texCanvas)
    screenTexture.minFilter = THREE.LinearFilter

    const messages = [
      '┌─────────────────────────────────────────┐',
      '│  portfolio@shon:~$ _                     │',
      '│                                         │',
      '│  > Initializing environment...          │',
      '│  > Loading modules...                   │',
      '│  > Status: READY                        │',
      '│                                         │',
      '│  ─── shon.dev ───                       │',
      '│                                         │',
      '│  Welcome to my portfolio                │',
      '│                                         │',
      '│  Skills:  React  Three.js  Node  Go     │',
      '│  Projects: 12+  •  Open source           │',
      '│  Status: Available for work             │',
      '│                                         │',
      '│  $ _                                     │',
      '└─────────────────────────────────────────┘',
    ]
    const fullText = messages.join('\n')
    let charIndex = 0
    let typing = true
    let lastCharTime = 0

    function drawScreen(typed, showCursor) {
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, texCanvas.width, texCanvas.height)

      const lines = typed.split('\n')
      ctx.font = '15px "Courier New", monospace'

      lines.forEach((line, i) => {
        if (line.includes('$ _') || line.includes('$')) {
          ctx.fillStyle = '#4ade80'
        } else if (line.includes('>')) {
          ctx.fillStyle = '#22c55e'
        } else if (line.includes('───')) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.25)'
        } else if (line.includes('┌') || line.includes('└') || line.includes('│') || line.includes('┘') || line.includes('┐')) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.35)'
        } else if (line.includes('Skills') || line.includes('Projects') || line.includes('Status')) {
          ctx.fillStyle = '#c8f060'
        } else {
          ctx.fillStyle = '#4ade80'
        }
        ctx.fillText(line, 30, 34 + i * 24)
      })

      if (showCursor) {
        const lastLine = lines[lines.length - 1] || ''
        const cx = 30 + ctx.measureText(lastLine).width
        const cy = 34 + (lines.length - 1) * 24
        ctx.fillStyle = '#4ade80'
        ctx.fillRect(cx + 2, cy - 11, 8, 15)
      }

      screenTexture.needsUpdate = true
    }

    // ── Terminal monitor geometry (lighter, more visible) ──────
    const term = new THREE.Group()
    group.add(term)

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xc0c0c0,
      metalness: 0.7,
      roughness: 0.25,
      envMapIntensity: 0.5,
    })
    const bezelMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, metalness: 0.3, roughness: 0.6 })
    const standMat = new THREE.MeshPhysicalMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.3 })
    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.1,
      metalness: 0.3,
      roughness: 0.4,
    })

    // Main body (now silver)
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.7, 0.25), bodyMat)
    term.add(body)

    // Back panel
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.02), bodyMat)
    back.position.z = -0.14
    term.add(back)

    // Front bezel (dark frame around screen)
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.04), bezelMat)
    bezel.position.z = 0.14
    term.add(bezel)

    // Screen
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 1.32),
      new THREE.MeshBasicMaterial({ map: screenTexture })
    )
    screenMesh.position.z = 0.17
    term.add(screenMesh)

    // Brighter screen glow
    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.4),
      new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      })
    )
    glowPlane.position.z = 0.16
    term.add(glowPlane)

    // Outer glow (larger, softer)
    const outerGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 1.7),
      new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        transparent: true,
        opacity: 0.025,
        side: THREE.DoubleSide,
      })
    )
    outerGlow.position.z = 0.14
    term.add(outerGlow)

    // LED
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x4ade80 })
    )
    led.position.set(1.05, -0.75, 0.15)
    term.add(led)

    const ledGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.2 })
    )
    ledGlow.position.set(1.05, -0.75, 0.15)
    term.add(ledGlow)

    // Stand neck - lighter
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), standMat)
    neck.position.set(0, -0.98, 0)
    term.add(neck)

    // Stand base - lighter
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.6), standMat)
    standBase.position.set(0, -1.12, 0.05)
    term.add(standBase)

    // Green accent strip at bottom of bezel
    const accent = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.005), accentMat)
    accent.position.set(0, -0.72, 0.17)
    term.add(accent)

    // Vent lines
    const ventMat = new THREE.MeshBasicMaterial({ color: 0x555555 })
    for (let i = 0; i < 6; i++) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.01, 0.005), ventMat)
      vent.position.set(-0.5 + i * 0.2, 0.86, 0)
      term.add(vent)
    }

    // ── Screen glow light ──────────────────────────────────────
    const screenLight = new THREE.PointLight(0x4ade80, 0.5, 3)
    screenLight.position.set(0, 0, 0.5)
    term.add(screenLight)

    const backLight = new THREE.PointLight(0x4ade80, 0.2, 2.5)
    backLight.position.set(0, 0, -0.3)
    term.add(backLight)

    // ── Stars (brighter) ──────────────────────────────────────
    const starCount = 400
    const starPos = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 10 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
      const c = 0.4 + Math.random() * 0.6
      starColors[i * 3] = c
      starColors[i * 3 + 1] = c
      starColors[i * 3 + 2] = c + Math.random() * 0.2
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPos, 3)).setAttribute('color', new THREE.BufferAttribute(starColors, 3)),
      new THREE.PointsMaterial({ size: 0.04, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, sizeAttenuation: true, vertexColors: true })
    )
    scene.add(stars)

    // Floor reflection glow
    const floorGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.015, side: THREE.DoubleSide })
    )
    floorGlow.rotation.x = -Math.PI / 2
    floorGlow.position.y = -1.3
    scene.add(floorGlow)

    // ── Scroll ─────────────────────────────────────────────────
    let scrollY = 0
    let targetScroll = 0
    const onScroll = () => {
      targetScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let mouseX = 0, mouseY = 0
    const onMouse = (e) => { mouseX = (e.clientX / window.innerWidth - 0.5) * 2; mouseY = (e.clientY / window.innerHeight - 0.5) * 2 }
    document.addEventListener('mousemove', onMouse)

    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }
    window.addEventListener('resize', onResize)

    // ── Animation ──────────────────────────────────────────────
    const clock = new THREE.Clock()
    let driftPhase = 0

    function animate() {
      requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      scrollY += (targetScroll - scrollY) * 0.05
      driftPhase += 0.015

      if (typing) {
        const speed = Math.max(25, 60 - scrollY * 25)
        if (t - lastCharTime > speed * 0.001) {
          lastCharTime = t
          charIndex++
          if (charIndex <= fullText.length) {
            drawScreen(fullText.slice(0, charIndex), true)
          }
          if (charIndex >= fullText.length) {
            typing = false
            setTimeout(() => { typing = true; charIndex = 0 }, 4000)
          }
        }
      }

      term.rotation.y = scrollY * 2.5 + Math.sin(t * 0.08) * 0.02
      term.rotation.x = Math.sin(t * 0.12) * 0.015 - scrollY * 0.08
      term.rotation.z = Math.sin(t * 0.1) * 0.01

      term.position.y = scrollY * 3 + Math.sin(t * 0.2) * 0.02
      term.position.x = Math.sin(driftPhase * 0.7) * scrollY * 0.3
      term.position.z = -scrollY * 1.5

      term.position.x += (mouseX * 0.5 - (term.position.x - Math.sin(driftPhase * 0.7) * scrollY * 0.3)) * 0.02
      term.position.z += (-mouseY * 0.3 - (term.position.z + scrollY * 1.5)) * 0.02

      // Brighter glow effects
      glowPlane.material.opacity = 0.06 + Math.sin(t * 0.4) * 0.03 + scrollY * 0.04
      outerGlow.material.opacity = 0.02 + Math.sin(t * 0.3) * 0.01 + scrollY * 0.02
      screenLight.intensity = 0.4 + Math.sin(t * 0.3) * 0.15 + scrollY * 0.2
      backLight.intensity = 0.15 + Math.sin(t * 0.2 + 1) * 0.08 + scrollY * 0.1
      led.material.color.setHSL(0.3 + Math.sin(t * 0.2) * 0.02, 1, 0.5 + Math.sin(t * 0.5) * 0.15)
      accent.material.emissiveIntensity = 0.08 + Math.sin(t * 0.4) * 0.05 + scrollY * 0.08

      stars.rotation.y = t * 0.003
      stars.rotation.x = scrollY * 0.02

      floorGlow.material.opacity = 0.01 + Math.sin(t * 0.15) * 0.005 + scrollY * 0.01

      camera.position.z = 6.5 - scrollY * 1.5
      camera.position.y = 1 + term.position.y * 0.2
      camera.lookAt(term.position.x, term.position.y + 0.1, -scrollY * 0.5)

      renderer.render(scene, camera)
    }

    const raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}

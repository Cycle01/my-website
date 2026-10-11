"use client"

import { useEffect, useRef } from "react"

interface Mote {
  x: number
  y: number
  r: number
  /** Parallax depth: 0 sits far back, 1 close to the viewer. */
  z: number
  vx: number
  vy: number
  phase: number
  speed: number
  tint: string
}

const TINTS = ["237,233,226", "237,233,226", "237,233,226", "226,104,60", "150,164,255"]

/**
 * The page's living background: a solid near-black base, three slow pools of
 * light (CSS), drifting dust motes that parallax with the scroll and pointer
 * (one small canvas; motes near the cursor brighten), and a soft warm
 * spotlight that trails the mouse. Everything
 * is decoration: it ignores the pointer, idles while the tab is hidden, and
 * renders a single still frame for reduced motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const spot = spotRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !spot || !ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let w = 0
    let h = 0
    let dpr = 1
    let motes: Mote[] = []
    let raf = 0
    let last = 0
    let scrollY = window.scrollY
    // Pointer position, eased: tx/ty is the target, px/py what is drawn.
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0
    let sx = window.innerWidth / 2
    let sy = window.innerHeight / 3
    let stx = sx
    let sty = sy
    let lit = false

    const seed = () => {
      const count = Math.round(Math.min(140, Math.max(44, (w * h) / 14000)))
      motes = Array.from({ length: count }, () => {
        const z = Math.random() ** 1.6
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + z * 1.5,
          z,
          vx: (Math.random() - 0.5) * 3,
          vy: -(2 + Math.random() * 9) * (0.4 + z),
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw(0, true)
    }

    const wrap = (v: number, max: number) => ((v % max) + max) % max

    const draw = (t: number, still = false) => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        const x = wrap(m.x + px * m.z * 26, w + 20) - 10
        const y = wrap(m.y - scrollY * m.z * 0.28 + py * m.z * 18, h + 20) - 10
        const tw = still ? 0.75 : 0.55 + 0.45 * Math.sin(t * 0.001 * m.speed + m.phase)
        // Dust close to the cursor catches its light.
        const near = lit ? Math.max(0, 1 - Math.hypot(x - sx, y - sy) / 150) : 0
        const a = Math.min(1, (0.12 + m.z * 0.5) * tw + near * 0.55)
        ctx.fillStyle = `rgba(${m.tint},${a.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, m.r, 0, Math.PI * 2)
        ctx.fill()
        if (m.z > 0.55) {
          // A faint halo on the nearest motes gives the field some depth.
          ctx.fillStyle = `rgba(${m.tint},${(a * 0.16).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, m.r * 4.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016)
      last = t
      for (const m of motes) {
        m.x += m.vx * dt * (0.4 + m.z)
        m.y += m.vy * dt
      }
      px += (tx - px) * 0.05
      py += (ty - py) * 0.05
      sx += (stx - sx) * 0.12
      sy += (sty - sy) * 0.12
      spot.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`
      draw(t)
    }

    const start = () => {
      if (raf || reduced.matches || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // The glow only lights up over the header, the hero and the games, not the whole page.
    let hasPointer = false
    const setGlow = (on: boolean) => {
      lit = on
      spot.classList.toggle("is-on", on)
    }
    const updateGlow = () => {
      if (!hasPointer || !finePointer.matches || reduced.matches) return setGlow(false)
      const el = document.elementFromPoint(stx, sty)
      setGlow(!!el?.closest("header, #top, #games"))
    }
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
      stx = e.clientX
      sty = e.clientY
      hasPointer = true
      updateGlow()
    }
    const onLeave = () => {
      hasPointer = false
      setGlow(false)
    }
    const onScroll = () => {
      scrollY = window.scrollY
      updateGlow() // the section under a resting cursor changes as the page scrolls
      if (!raf) draw(performance.now(), true) // reduced motion: keep the parallax honest
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onMotionChange = () => {
      stop()
      if (reduced.matches) setGlow(false)
      draw(performance.now(), true)
      start()
    }

    resize()
    start()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointermove", onPointer, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)
    reduced.addEventListener("change", onMotionChange)
    return () => {
      stop()
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onPointer)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      reduced.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    // The essential layout is inline too: even if the stylesheet fails to load,
    // the background stays fixed behind the page instead of pushing it down.
    <div
      className="s-bg"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", background: "#050506" }}
    >
      <div className="s-orb s-orb-a" />
      <div className="s-orb s-orb-b" />
      <div className="s-orb s-orb-c" />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div ref={spotRef} className="s-spot" />
      <div className="s-vignette" />
    </div>
  )
}

"use client"

import { useEffect, type RefObject } from "react"

/**
 * Moves `inner` a few percent against the scroll while `frame` crosses the
 * viewport, for a slow parallax drift inside a clipped frame. Desktop only,
 * transform only, idle offscreen, off for reduced motion.
 */
export function useScrollDrift(frame: RefObject<HTMLElement | null>, inner: RefObject<HTMLElement | null>, amount = 6) {
  useEffect(() => {
    const f = frame.current
    const el = inner.current
    if (!f || !el) return
    if (!window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return

    let raf = 0
    let visible = false
    const update = () => {
      raf = 0
      const r = f.getBoundingClientRect()
      const vh = window.innerHeight
      // -1 when the frame's centre is at the bottom of the viewport, 1 at the top.
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)))
      el.style.transform = `translate3d(0, ${(p * amount).toFixed(3)}%, 0) scale(1.12)`
    }
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) onScroll()
    })
    io.observe(f)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    update()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      el.style.transform = ""
    }
  }, [frame, inner, amount])
}

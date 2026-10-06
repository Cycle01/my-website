"use client"

import { useEffect } from "react"

/**
 * Opens every `.s-mask` image frame on the page the first time it scrolls
 * into view (the clipping itself is CSS, and only applies while scripts run).
 */
export function MaskReveal() {
  useEffect(() => {
    const frames = Array.from(document.querySelectorAll<HTMLElement>(".s-mask"))
    if (typeof IntersectionObserver === "undefined") {
      frames.forEach((f) => f.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.2 },
    )
    frames.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])
  return null
}

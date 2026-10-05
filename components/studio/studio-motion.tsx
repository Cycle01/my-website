"use client"

import { useEffect } from "react"

/**
 * Turns on the studio page's one-time reveals. Elements with `s-reveal` start
 * hidden only after this runs (it adds `s-motion` to the page root), so the
 * page is fully readable if scripts fail or motion is reduced. Each element
 * reveals once, the first time it scrolls into view.
 */
export function StudioMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver === "undefined") return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    root.querySelectorAll(".s-reveal").forEach((el) => io.observe(el))
    root.classList.add("s-motion")
    return () => {
      io.disconnect()
      root.classList.remove("s-motion")
    }
  }, [rootId])

  return null
}

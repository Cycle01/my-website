"use client"

import { useEffect } from "react"

/**
 * Page-level motion, with no markup of its own:
 *  - arms the scroll reveals ([data-sr], .s-mask) once scripts are running.
 *    Whatever is already on screen is shown first, so nothing flashes;
 *    everything else rises in as it scrolls into view, once.
 *  - publishes the scroll progress as --sp on the page root (the nav's hairline).
 *  - lets the games cards' glow follow the pointer (--mx / --my per card).
 */
export function StudioMotion() {
  useEffect(() => {
    const root = document.getElementById("studio-root")
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-sr], .s-mask"))

    const vh = window.innerHeight
    for (const el of targets) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("is-in")
    }

    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-in"))
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue
            e.target.classList.add("is-in")
            io?.unobserve(e.target)
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      )
      targets.forEach((el) => !el.classList.contains("is-in") && io?.observe(el))
    }
    root.dataset.motion = "on"

    let raf = 0
    const progress = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      root.style.setProperty("--sp", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0")
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(progress)
    }
    progress()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const card = (e.target as HTMLElement).closest<HTMLElement>(".s-card")
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`)
      card.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`)
    }
    root.addEventListener("pointermove", onPointer, { passive: true })

    return () => {
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      root.removeEventListener("pointermove", onPointer)
      delete root.dataset.motion
    }
  }, [])
  return null
}

"use client"

import { useEffect, useRef } from "react"

export interface WordPart {
  text: string
  className?: string
}

/**
 * A paragraph whose words light up one by one as it scrolls through the
 * viewport. The text is ordinary text (selectable, readable by assistive tech);
 * only each word's opacity moves, driven by one custom property. With no
 * script or with reduced motion every word simply stays lit.
 */
export function ScrollWords({ parts, className = "" }: { parts: WordPart[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = parts.flatMap((p) => p.text.split(" ").map((w) => ({ w, className: p.className })))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.88 - r.top) / (r.height + vh * 0.3)
      el.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      el.style.removeProperty("--p")
    }
  }, [])

  return (
    <p ref={ref} className={className} style={{ ["--n" as string]: words.length }}>
      {words.map((w, i) => (
        <span key={i} className={`s-word ${w.className ?? ""}`} style={{ ["--i" as string]: i }}>
          {w.w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  )
}

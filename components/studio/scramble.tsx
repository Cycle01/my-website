"use client"

import { useRef, type ReactNode } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_"

/** Text whose letters briefly scramble and resolve when hovered or focused. */
export function Scramble({ text, className = "" }: { text: string; className?: string }): ReactNode {
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  const run = () => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const duration = 420
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const settled = Math.floor(t * text.length)
      el.textContent = text
        .split("")
        .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("")
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else el.textContent = text
    }
    raf.current = requestAnimationFrame(tick)
  }

  return (
    <span className={className} onPointerEnter={run} onFocus={run}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

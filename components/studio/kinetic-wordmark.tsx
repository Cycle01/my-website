"use client"

import { useEffect, useRef } from "react"

/**
 * "Cycle Studios" set in Geist's variable weight axis. On desktop each letter
 * gets heavier as the pointer gets closer; on touch devices a slow weight wave
 * runs through the word instead. Static for reduced motion.
 */
export function KineticWordmark({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".kinetic-letter").forEach((l) => (l.style.fontWeight = "600"))
      return
    }
    if (!window.matchMedia("(pointer: fine)").matches) {
      el.classList.add("kinetic-wave")
      return
    }
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".kinetic-letter"))
    let raf = 0
    let x = -9999
    let y = -9999
    const apply = () => {
      raf = 0
      for (const l of letters) {
        const r = l.getBoundingClientRect()
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
        const k = Math.max(0, 1 - d / 320)
        l.style.fontWeight = String(Math.round(300 + 600 * k * k))
      }
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  let n = 0
  return (
    <h1
      ref={ref}
      aria-label={lines.join(" ")}
      className="select-none text-[17vw] leading-[0.86] tracking-[-0.055em] text-foreground md:text-[13.5vw] xl:text-[12.5rem]"
    >
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap" aria-hidden="true">
          {line.split("").map((ch, i) => {
            const idx = n++
            return (
              <span key={i} className="kinetic-letter" style={{ animationDelay: `${idx * 0.12}s` }}>
                {ch === " " ? " " : ch}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

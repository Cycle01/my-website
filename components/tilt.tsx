"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Subtle 3D tilt with a light glare that follows the pointer.
 * Mouse/trackpad only; touch devices and reduced-motion users get a flat card.
 */
export function Tilt({ children, max = 6, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let px = 0.5
    let py = 0.5
    const apply = () => {
      raf = 0
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`
      el.style.setProperty("--gx", `${px * 100}%`)
      el.style.setProperty("--gy", `${py * 100}%`)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px = (e.clientX - r.left) / r.width
      py = (e.clientY - r.top) / r.height
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = 0
      el.style.transform = ""
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [max])

  return (
    <div ref={ref} className={`tilt relative h-full ${className}`}>
      {children}
      <div className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
    </div>
  )
}

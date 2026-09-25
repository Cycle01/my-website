"use client"

import { useEffect, useState } from "react"
import { useInView } from "@/components/studio/rise"

/** Counts up to `to` the first time it scrolls into view. Renders the final value without JS or with reduced motion. */
export function CountUp({ to, prefix = "", duration = 1600 }: { to: number; prefix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4)
  const [value, setValue] = useState(to)
  const [armed, setArmed] = useState(false)

  // Start from zero once mounted, unless the visitor prefers less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setValue(0)
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed || !inView) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / duration)
      setValue(Math.round(to * (1 - Math.pow(1 - k, 4))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [armed, inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("en-US")}
    </span>
  )
}

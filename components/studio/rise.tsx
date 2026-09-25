"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

/**
 * A heading whose lines rise out of a mask when it scrolls into view.
 * Each entry in `lines` is one masked line; styling goes on the heading.
 */
export function Rise({
  as: Tag = "h2",
  lines,
  className = "",
  id,
}: {
  as?: ElementType
  lines: ReactNode[]
  className?: string
  id?: string
}) {
  const [ref, inView] = useInView<HTMLElement>(0.3)
  return (
    <Tag ref={ref} id={id} className={`${className} ${inView ? "rise-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="rise-line">
          <span className="rise-inner" style={{ transitionDelay: `${i * 0.09}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/** Fades its children up when they scroll into view. */
export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15)
  return (
    <div ref={ref} className={`fade-up ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

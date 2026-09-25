"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type RevealVariant = "up" | "left" | "right" | "zoom"

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Delay in ms, used to stagger siblings. */
  delay?: number
  className?: string
  style?: CSSProperties
}

/** Fades its children in the first time they scroll into view. Styles live in globals.css. */
export function Reveal({ children, variant = "up", delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-visible={visible}
      className={className}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

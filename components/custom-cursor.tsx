"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const hovering = useRef(false)

  useEffect(() => {
    // Only show on non-touch devices
    const mql = window.matchMedia("(pointer: fine)")
    if (!mql.matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        if (outerRef.current) outerRef.current.style.opacity = "1"
        if (innerRef.current) innerRef.current.style.opacity = "1"
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onLeave = () => {
      visible.current = false
      if (outerRef.current) outerRef.current.style.opacity = "0"
      if (innerRef.current) innerRef.current.style.opacity = "0"
    }

    const onEnter = () => {
      visible.current = true
      if (outerRef.current) outerRef.current.style.opacity = "1"
      if (innerRef.current) innerRef.current.style.opacity = "1"
    }

    // Detect hover over interactive elements
    const onOverInteractive = () => {
      hovering.current = true
      if (outerRef.current) {
        outerRef.current.style.width = "48px"
        outerRef.current.style.height = "48px"
        outerRef.current.style.borderColor = "oklch(0.8 0.16 80 / 0.6)"
        outerRef.current.style.backgroundColor = "oklch(0.63 0.22 25 / 0.08)"
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(0.5)`
      }
    }
    const onOutInteractive = () => {
      hovering.current = false
      if (outerRef.current) {
        outerRef.current.style.width = "36px"
        outerRef.current.style.height = "36px"
        outerRef.current.style.borderColor = "oklch(0.63 0.22 25 / 0.5)"
        outerRef.current.style.backgroundColor = "transparent"
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(1)`
      }
    }

    // Smooth trailing animation for outer ring
    let raf: number
    const animate = () => {
      const dx = pos.current.x - outerPos.current.x
      const dy = pos.current.y - outerPos.current.y
      outerPos.current.x += dx * 0.12
      outerPos.current.y += dy * 0.12
      if (outerRef.current) {
        const size = hovering.current ? 48 : 36
        outerRef.current.style.transform = `translate(${outerPos.current.x - size / 2}px, ${outerPos.current.y - size / 2}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    // Add hover listeners to interactive elements
    const interactiveSelector = "a, button, [role='button'], input, textarea, select"
    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onOverInteractive)
        el.addEventListener("mouseleave", onOutInteractive)
      })
    }
    addHoverListeners()

    // Re-apply on DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      observer.disconnect()
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onOverInteractive)
        el.removeEventListener("mouseleave", onOutInteractive)
      })
    }
  }, [])

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border"
        style={{
          width: 36,
          height: 36,
          opacity: 0,
          borderColor: "oklch(0.63 0.22 25 / 0.5)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
      {/* Inner dot - removed so native cursor stays visible */}
    </>
  )
}

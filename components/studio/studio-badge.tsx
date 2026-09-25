"use client"

import { useEffect, useRef } from "react"
import { asset } from "@/lib/asset"

/*
  The studio's badge: a thick metal coin built from stacked CSS 3D layers.
  Front: the Cycle Studios mark with an engraved rim. Back: the gold figure.
  It turns slowly on its own, leans toward the pointer, and can be dragged
  to spin with momentum. Paused offscreen; still for reduced motion.
*/

const EDGE_LAYERS = 18
const THICKNESS = 26 // px at full size, scaled with the coin

function RimText({ id, text }: { id: string; text: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
      <text fill="rgba(232,229,223,0.55)" fontSize="8.4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        {/* Stretched to exactly one lap (2πr ≈ 515) so the text never overlaps its own start. */}
        <textPath href={`#${id}`} startOffset="0" textLength="512" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  )
}

export function StudioBadge({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const coin = coinRef.current
    if (!stage || !coin) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches

    let angle = -18 // Y rotation, degrees
    let velocity = 0 // degrees per second added by dragging
    let tiltX = 8
    let tiltY = 0
    let targetTiltX = 8
    let targetTiltY = 0
    let dragging = false
    let lastX = 0
    let lastT = 0
    let raf = 0
    let last = performance.now()
    let visible = true

    const render = () => {
      coin.style.transform = `rotateX(${tiltX}deg) rotateY(${angle + tiltY}deg)`
      // Sheen slides across the faces as the coin turns.
      const a = (((angle % 360) + 360) % 360) / 360
      coin.style.setProperty("--sheen", `${a * 200 - 50}%`)
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!dragging) {
        angle += (14 + velocity) * dt
        velocity *= Math.pow(0.12, dt) // momentum fades
      }
      tiltX += (targetTiltX - tiltX) * Math.min(1, dt * 4)
      tiltY += (targetTiltY - tiltY) * Math.min(1, dt * 4)
      render()
      raf = visible ? requestAnimationFrame(frame) : 0
    }

    if (reduced) {
      render()
      return
    }

    const start = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(stage)

    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const now = performance.now()
        const dx = e.clientX - lastX
        angle += dx * 0.45
        velocity = (dx * 0.45) / Math.max(0.008, (now - lastT) / 1000) - 14
        lastX = e.clientX
        lastT = now
        return
      }
      if (!fine) return
      const r = stage.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
      const py = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      targetTiltX = 8 - py * 22
      targetTiltY = px * 26
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastT = performance.now()
      stage.setPointerCapture(e.pointerId)
    }
    const onUp = () => {
      dragging = false
      velocity = Math.max(-900, Math.min(900, velocity))
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    stage.addEventListener("pointerdown", onDown)
    stage.addEventListener("pointerup", onUp)
    stage.addEventListener("pointercancel", onUp)
    start()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerdown", onDown)
      stage.removeEventListener("pointerup", onUp)
      stage.removeEventListener("pointercancel", onUp)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className={`badge-stage relative aspect-square touch-pan-y select-none ${className}`}
      role="img"
      aria-label="The Cycle Studios badge: the studio logo on a dark metal coin, with a gold figure on the back"
    >
      {/* Cold key light behind the coin and a soft shadow beneath it. */}
      <div className="glow pointer-events-none absolute inset-[-25%] text-[#8fb0c6]/[0.14]" />
      <div className="pointer-events-none absolute -bottom-[14%] left-1/2 h-[12%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />

      <div className="absolute inset-0" style={{ perspective: "1400px" }}>
        <div ref={coinRef} className="badge-coin relative h-full w-full cursor-grab active:cursor-grabbing">
          {/* Edge: stacked discs give the coin real thickness when it turns. */}
          {Array.from({ length: EDGE_LAYERS }, (_, i) => {
            const z = (i / (EDGE_LAYERS - 1) - 0.5) * THICKNESS
            return (
              <div
                key={i}
                className="badge-edge absolute inset-0 rounded-full"
                style={{ transform: `translateZ(calc(${z}px * var(--badge-scale, 1)))` }}
              />
            )
          })}

          {/* Front face */}
          <div className="badge-face absolute inset-0 rounded-full" style={{ transform: `translateZ(calc(${THICKNESS / 2 + 0.5}px * var(--badge-scale, 1)))` }}>
            <RimText id="rim-front" text="CYCLE STUDIOS ✦ ATMOSPHERIC HORROR ✦ PC & MOBILE ✦" />
            <div className="absolute inset-[24%] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/images/studio/logo-mark.webp")}
                alt=""
                draggable={false}
                className="h-full w-full object-contain [filter:drop-shadow(0_1px_0_rgba(0,0,0,0.9))_drop-shadow(0_-1px_0_rgba(255,255,255,0.12))]"
              />
            </div>
            <div className="badge-sheen absolute inset-0 rounded-full" />
          </div>

          {/* Back face */}
          <div
            className="badge-face badge-face-back absolute inset-0 rounded-full"
            style={{ transform: `rotateY(180deg) translateZ(calc(${THICKNESS / 2 + 0.5}px * var(--badge-scale, 1)))` }}
          >
            <RimText id="rim-back" text="ONE DEVELOPER ✦ MADE BY CYCLE01 ✦ ONE DEVELOPER ✦ MADE BY CYCLE01 ✦" />
            <div className="absolute inset-[22%] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/studio/figure-gold.webp")} alt="" draggable={false} className="h-full w-auto object-contain" />
            </div>
            <div className="badge-sheen absolute inset-0 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

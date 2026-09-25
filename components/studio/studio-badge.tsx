"use client"

import { useEffect, useRef } from "react"
import { asset } from "@/lib/asset"

/*
  The studio badge: a thick silver coin built from stacked CSS 3D layers.
  Front: the Cycle's Studios logo inside an engraved rim. Back: a crescent
  moon and "Made by Cycle01". It turns slowly on its own, leans toward the
  pointer, and can be dragged or flicked to spin with momentum. Paused
  offscreen; held still for reduced motion.
*/

const EDGE_LAYERS = 16
const THICKNESS = 24 // px at full size, scaled with the coin

function RimText({ id, text }: { id: string; text: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="73" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      <text fill="rgba(236,240,246,0.6)" fontSize="8.2" style={{ fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.5px" }}>
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

    const SPIN = 16 // idle degrees per second
    let angle = -20
    let velocity = 0 // extra degrees per second from a drag
    let tiltX = 6
    let tiltY = 0
    let targetTiltX = 6
    let targetTiltY = 0
    let dragging = false
    let lastX = 0
    let lastT = 0
    let raf = 0
    let last = performance.now()
    let visible = true

    const render = () => {
      coin.style.transform = `rotateX(${tiltX}deg) rotateY(${angle + tiltY}deg)`
      // The sheen slides across the faces as the coin turns.
      const a = (((angle % 360) + 360) % 360) / 360
      coin.style.setProperty("--sheen", `${a * 200 - 50}%`)
    }

    if (reduced) {
      render()
      return
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!dragging) {
        angle += (SPIN + velocity) * dt
        velocity *= Math.pow(0.15, dt) // momentum fades
      }
      tiltX += (targetTiltX - tiltX) * Math.min(1, dt * 4)
      tiltY += (targetTiltY - tiltY) * Math.min(1, dt * 4)
      render()
      raf = visible ? requestAnimationFrame(frame) : 0
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
        angle += dx * 0.5
        velocity = (dx * 0.5) / Math.max(0.008, (now - lastT) / 1000) - SPIN
        lastX = e.clientX
        lastT = now
        return
      }
      if (!fine) return
      const r = stage.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
      const py = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      targetTiltX = 6 - py * 20
      targetTiltY = px * 24
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      velocity = 0
      lastX = e.clientX
      lastT = performance.now()
      stage.setPointerCapture(e.pointerId)
    }
    const onUp = () => {
      if (!dragging) return
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

  const face = THICKNESS / 2 + 0.5

  return (
    <div
      ref={stageRef}
      className={`badge-stage relative aspect-square touch-pan-y select-none ${className}`}
      role="img"
      aria-label="The Cycle's Studios badge: the studio logo on a silver coin, with a crescent moon on the back. Drag to spin it."
    >
      {/* Soft shadow beneath the coin. */}
      <div className="pointer-events-none absolute -bottom-[12%] left-1/2 h-[10%] w-[64%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />

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

          {/* Front: the logo. */}
          <div className="badge-face absolute inset-0 rounded-full" style={{ transform: `translateZ(calc(${face}px * var(--badge-scale, 1)))` }}>
            <RimText id="rim-front" text="CYCLE'S STUDIOS ✦ ATMOSPHERIC HORROR ✦ PC & MOBILE ✦" />
            <div className="absolute inset-[27%] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/images/studio/logo-white.webp")}
                alt=""
                draggable={false}
                width={295}
                height={285}
                className="badge-emboss h-full w-full object-contain"
              />
            </div>
            <div className="badge-sheen absolute inset-0 rounded-full" />
          </div>

          {/* Back: a crescent moon. */}
          <div
            className="badge-face absolute inset-0 rounded-full"
            style={{ transform: `rotateY(180deg) translateZ(calc(${face}px * var(--badge-scale, 1)))` }}
          >
            <RimText id="rim-back" text="MADE BY CYCLE01 ✦ ONE DEVELOPER ✦ MADE BY CYCLE01 ✦ ONE DEVELOPER ✦" />
            <svg viewBox="0 0 200 200" className="badge-emboss absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <mask id="badge-crescent">
                  <rect width="200" height="200" fill="black" />
                  <circle cx="100" cy="100" r="42" fill="white" />
                  <circle cx="118" cy="88" r="36" fill="black" />
                </mask>
              </defs>
              <circle cx="100" cy="100" r="42" fill="#e9edf2" mask="url(#badge-crescent)" />
              <circle cx="132" cy="70" r="1.6" fill="#e9edf2" />
              <circle cx="146" cy="98" r="1.1" fill="#e9edf2" />
              <circle cx="124" cy="126" r="1.3" fill="#e9edf2" />
            </svg>
            <div className="badge-sheen absolute inset-0 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

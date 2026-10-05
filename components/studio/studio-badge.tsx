"use client"

import { useEffect, useRef } from "react"
import { asset } from "@/lib/asset"

/*
  The studio emblem: the Cycle's Studios logo on a thick silver coin, built
  from stacked CSS 3D layers and set in front of the hero's moon. It rests at
  a slight angle and, on mouse/trackpad devices, leans a few degrees toward
  the pointer. Touch devices and reduced motion get the resting pose only.
*/

const EDGE_LAYERS = 14
const THICKNESS = 22 // px at full size, scaled with the coin
const REST = { x: 4, y: -16 }

function RimText({ id, text }: { id: string; text: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,248,236,0.16)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="73" fill="none" stroke="rgba(255,248,236,0.12)" strokeWidth="0.6" />
      <text fill="rgba(236,230,219,0.6)" fontSize="8.2" style={{ fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.5px" }}>
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
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let x = REST.x
    let y = REST.y
    let tx = REST.x
    let ty = REST.y
    let raf = 0
    let visible = true

    // Ease toward the target, then stop the loop until the pointer moves again.
    const step = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      coin.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`
      coin.style.setProperty("--sheen", `${40 + (y - REST.y) * 2}%`)
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(step) : 0
    }
    const onMove = (e: PointerEvent) => {
      if (!visible) return
      const r = stage.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
      const py = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      tx = REST.x - Math.max(-1, Math.min(1, py)) * 10
      ty = REST.y + Math.max(-1, Math.min(1, px)) * 14
      if (!raf) raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(stage)
    // The inline transition from CSS would fight the per-frame easing.
    coin.style.transition = "none"
    window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      coin.style.transition = ""
    }
  }, [])

  const face = THICKNESS / 2 + 0.5

  return (
    <div
      ref={stageRef}
      className={`badge-stage relative aspect-square select-none ${className}`}
      role="img"
      aria-label="The Cycle's Studios emblem: the studio logo on a silver coin, in front of the moon"
    >
      <div className="pointer-events-none absolute -bottom-[12%] left-1/2 h-[10%] w-[64%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />
      <div className="absolute inset-0" style={{ perspective: "1400px" }}>
        <div ref={coinRef} className="badge-coin relative h-full w-full">
          {/* Edge: stacked discs give the coin real thickness at an angle. */}
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
          <div className="badge-face absolute inset-0 rounded-full" style={{ transform: `translateZ(calc(${face}px * var(--badge-scale, 1)))` }}>
            <RimText id="rim-front" text="CYCLE'S STUDIOS ✦ INDEPENDENT GAMES ✦ MADE BY CYCLE01 ✦" />
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
        </div>
      </div>
    </div>
  )
}

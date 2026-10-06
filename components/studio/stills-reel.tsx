"use client"

import { useEffect, useRef, useState, type PointerEvent } from "react"
import { stills } from "@/lib/studio"

/**
 * A horizontal reel of large frames from the games. Native horizontal scroll
 * with snapping (swipe, trackpad, Shift+wheel), mouse drag, and prev/next
 * buttons. The vertical page scroll is never captured.
 */
export function StillsReel() {
  const reelRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [ends, setEnds] = useState({ start: true, end: false })
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)

  // Track which frame is at the start edge, and the progress hairline.
  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = reel.scrollWidth - reel.clientWidth
      const p = max > 0 ? reel.scrollLeft / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`
      const items = Array.from(reel.children) as HTMLElement[]
      const start = reel.getBoundingClientRect().left + parseFloat(getComputedStyle(reel).paddingLeft)
      let best = 0
      let bestD = Infinity
      items.forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().left - start)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      setIndex(p > 0.98 ? items.length - 1 : best)
      setEnds({ start: reel.scrollLeft < 4, end: reel.scrollLeft > max - 4 })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    reel.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      reel.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const go = (dir: 1 | -1) => {
    const reel = reelRef.current
    if (!reel) return
    const target = reel.children[Math.max(0, Math.min(stills.length - 1, index + dir))] as HTMLElement | undefined
    if (!target) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const padLeft = parseFloat(getComputedStyle(reel).paddingLeft)
    reel.scrollTo({ left: target.offsetLeft - padLeft, behavior: reduced ? "auto" : "smooth" })
  }

  // Mouse drag to scroll; touch and pens keep their native behaviour.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !reelRef.current) return
    drag.current = { x: e.clientX, left: reelRef.current.scrollLeft, moved: false }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const reel = reelRef.current
    if (!d || !reel) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true
      reel.classList.add("is-dragging")
      reel.setPointerCapture(e.pointerId)
    }
    if (d.moved) reel.scrollLeft = d.left - dx
  }
  const onUp = () => {
    const reel = reelRef.current
    if (drag.current?.moved && reel) {
      // Let snapping settle on the nearest frame.
      const left = reel.scrollLeft
      reel.classList.remove("is-dragging")
      reel.scrollLeft = left
    }
    drag.current = null
  }

  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border)] text-foreground transition-colors duration-200 hover:border-foreground/50 hover:bg-white/[0.05] disabled:opacity-30 disabled:hover:border-[color:var(--border)] disabled:hover:bg-transparent"

  return (
    <section id="stills" aria-labelledby="stills-title" className="scroll-mt-4 pt-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 id="stills-title" data-sr className="s-serif s-h2">
            Stills
          </h2>
          <div className="hidden gap-2 pb-2 sm:flex">
            <button type="button" onClick={() => go(-1)} disabled={ends.start} className={btn} aria-label="Previous still">
              ←
            </button>
            <button type="button" onClick={() => go(1)} disabled={ends.end} className={btn} aria-label="Next still">
              →
            </button>
          </div>
        </div>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />
      </div>

      <div
        ref={reelRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        tabIndex={0}
        aria-label="Stills from the games. Scroll sideways or use the buttons."
        className="s-reel mt-8 flex cursor-grab gap-4 overflow-x-auto pb-1 md:mt-10 md:gap-6"
      >
        {stills.map((s, i) => (
          <figure key={s.src} className="shrink-0" aria-label={`${i + 1} of ${stills.length}`}>
            <div
              className="s-mask aspect-[4/3] w-[84vw] overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--card)] sm:aspect-auto sm:h-[min(58vh,560px)] sm:w-auto"
              style={{ ["--ar" as string]: `${s.width} / ${s.height}` }}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={s.srcSmall} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover sm:aspect-[var(--ar)] sm:w-auto"
                  style={{ objectPosition: s.position }}
                />
              </picture>
            </div>
            <figcaption className="s-label mt-3 flex justify-between gap-6">
              <span className="text-foreground/80">{s.game}</span>
              <span>{s.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]">
          <div ref={barRef} className="h-px origin-left bg-[color:var(--accent)]" style={{ transform: "scaleX(0.04)" }} />
        </div>
      </div>
    </section>
  )
}

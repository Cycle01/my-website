"use client"

import { useEffect, useRef } from "react"
import { heroShot } from "@/lib/studio"

/** The one hero screenshot. Its frame opens from a smaller rectangle the first time it comes into view. */
export function HeroShot({ className = "" }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const watch = frame?.parentElement // observe the unclipped figure, not the clipped frame
    if (!frame || !watch) return
    if (typeof IntersectionObserver === "undefined") {
      frame.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          frame.classList.add("is-in")
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(watch)
    return () => io.disconnect()
  }, [])

  return (
    <figure className={className}>
      <div ref={frameRef} className="s-mask aspect-[16/9] overflow-hidden bg-[color:var(--card)]">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroShot.srcSmall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroShot.src}
            alt={heroShot.alt}
            width={heroShot.width}
            height={heroShot.height}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: heroShot.position }}
          />
        </picture>
      </div>
      <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        <span>Secrets of Sundown</span>
        <span>In-game screenshot</span>
      </figcaption>
    </figure>
  )
}

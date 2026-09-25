"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { sundown2 } from "@/lib/studio"
import { releasedGames } from "@/lib/projects"

const original = releasedGames.find((g) => g.title === "Secrets of Sundown")!

export function SundownFeature() {
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [shown, setShown] = useState(false)

  // Cinematic reveal the first time the art scrolls into view.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Subtle depth: the art drifts against the pointer (mouse/trackpad only).
  useEffect(() => {
    const frame = frameRef.current
    const img = imgRef.current
    if (!frame || !img) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      img.style.transform = `scale(1.06) translate3d(${x * -14}px, ${y * -10}px, 0)`
    }
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect()
      x = (e.clientX - r.left) / r.width - 0.5
      y = (e.clientY - r.top) / r.height - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }
    frame.addEventListener("pointermove", onMove)
    frame.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      frame.removeEventListener("pointermove", onMove)
      frame.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <section id="sundown-2" className="relative px-5 py-24 md:px-8 md:py-32" aria-labelledby="sundown-2-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Next release · In development
            </p>
            <h2 id="sundown-2-title" className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Secrets of Sundown <span className="text-primary">2</span>
            </h2>
          </div>
        </div>

        <div
          ref={frameRef}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#1a0f0a] motion-reduce:!transition-none sm:aspect-[16/8]"
          style={{
            clipPath: shown ? "inset(0 0 0 0 round 16px)" : "inset(8% 12% 8% 12% round 16px)",
            transition: "clip-path 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={sundown2.image}
            alt="Secrets of Sundown 2 key art: a fire lookout tower above a pine forest under an amber sky, a kingfisher perched on the roof"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out motion-reduce:!transition-none"
            style={{ transform: shown ? "scale(1.06)" : "scale(1.18)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              The sequel to Secrets of Sundown, my psychological horror game set in the strange suburb of Sundown. It&apos;s
              the biggest project I&apos;ve taken on, and the one I&apos;m giving the most time and care.
            </p>
            <p>
              I&apos;ll share more when there&apos;s something real to show. Until then, the best place to follow it is on X,
              and the first game is on itch.io.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="https://twitter.com/cycledadev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground"
              >
                Follow development on X
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={original.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Play the first game
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {sundown2.facts.map((f) => (
              <div key={f.label} className="bg-[#120c0a] p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{f.label}</dt>
                <dd className="mt-2 text-sm font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

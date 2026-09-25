"use client"

import { useEffect, useRef, useState } from "react"
import { DuskScene } from "@/components/studio/dusk-scene"
import { sundown2 } from "@/lib/studio"
import { releasedGames } from "@/lib/projects"

const original = releasedGames.find((g) => g.title === "Secrets of Sundown")!

export function SundownFeature() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

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
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="work" className="px-5 pt-24 md:px-10 md:pt-40" aria-labelledby="sundown-2-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Featured — In development</span>
          <span>01</span>
        </div>

        {/* Observe the unclipped wrapper: Chrome counts a fully clipped target as not intersecting. */}
        <div ref={frameRef} className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
          <div
            className="absolute inset-0 overflow-hidden rounded-md motion-reduce:!transition-none"
            style={{
              clipPath: shown ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              transition: "clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            <DuskScene />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <h2 id="sundown-2-title" className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-6xl">
            Secrets of
            <br />
            Sundown 2
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4 text-[17px] leading-relaxed text-foreground/80">
              <p>
                The sequel to Secrets of Sundown, my psychological horror game set in the strange suburb of Sundown. It&apos;s the
                biggest project I&apos;ve taken on, and the one I&apos;m giving the most time and care.
              </p>
              <p>I&apos;ll share more when there&apos;s something real to show.</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 font-mono text-[12px] uppercase tracking-[0.08em]">
                <a href="https://twitter.com/cycledadev" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
                  Follow on X ↗
                </a>
                <a href={original.link} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
                  Play the first game ↗
                </a>
              </div>
            </div>
            <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08] self-start">
              {sundown2.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                  <dd className="text-right text-[15px] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

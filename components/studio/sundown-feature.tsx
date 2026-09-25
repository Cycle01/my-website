"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { DuskScene } from "@/components/studio/dusk-scene"
import { sundown2 } from "@/lib/studio"
import { releasedGames } from "@/lib/projects"

const original = releasedGames.find((g) => g.title === "Secrets of Sundown")!

export function SundownFeature() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  // The panel opens up the first time it scrolls into view.
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="sundown-2" className="relative px-5 py-24 md:px-8 md:py-32" aria-labelledby="sundown-2-title">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="text-accent">I</span> — Next release
        </p>

        <div
          ref={frameRef}
          className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[20px] motion-reduce:!transition-none sm:aspect-[16/10] lg:aspect-[16/8]"
          style={{
            clipPath: shown ? "inset(0 0 0 0 round 20px)" : "inset(6% 10% 6% 10% round 20px)",
            transition: "clip-path 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <DuskScene />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ffd59a]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb35c] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb35c]" />
              </span>
              In development
            </p>
            <h2 id="sundown-2-title" className="font-display mt-3 text-5xl font-semibold leading-[0.9] text-white md:text-8xl">
              Secrets of Sundown <span className="italic text-[#ff9a4d]">2</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/75">
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
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground"
              >
                Follow development on X
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={original.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Play the first game
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {sundown2.facts.map((f) => (
              <div key={f.label} className="bg-card p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

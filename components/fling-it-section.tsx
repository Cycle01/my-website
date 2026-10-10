"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { flingIt } from "@/lib/projects"

const SLIDE_MS = 3600

export function FlingItSection() {
  const shots = flingIt.screenshots
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setActive((i) => (i + 1) % shots.length), [shots.length])

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(next, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [paused, next])

  const behind = (active + 1) % shots.length

  return (
    <section id="fling-it" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-cyan-400/60" />

      {/* Space backdrop in the game's own cyan palette */}
      <div className="pointer-events-none absolute inset-0 starfield opacity-60 animate-twinkle" />
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[700px] w-[700px] glow text-cyan-400/[0.07]" />
      <div className="pointer-events-none absolute left-[-10%] bottom-0 h-[500px] w-[500px] glow text-fuchsia-500/[0.05]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Mobile Game"
          zh="手游"
          title={
            <>
              Fling It
              <span className="mt-3 block text-lg font-medium tracking-[0.3em] uppercase text-cyan-300 md:text-xl">
                {flingIt.tagline}
              </span>
            </>
          }
        />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal className="mb-10 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                {"My first mobile game. Pull back, let go, and fling a tiny pixel-art astronaut as far as physics (and your upgrades) allow. Chain boosts, bounce, grab coins and gems, and chase distances measured in kilometres."}
              </p>
              <p>
                {"It's built around that one-more-run feeling: every flight pays out, every payout buys an upgrade, and every upgrade makes the next fling go further."}
              </p>
            </Reveal>

            {/* How a run works, as a plain list instead of feature cards. */}
            <Reveal delay={100}>
              <p className="text-sm font-semibold text-foreground">How a run works</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground">
                <li>Pull back and let go. Release inside the timing window for a Perfect Launch, worth a ×1.25 bonus.</li>
                <li>Mid-flight, burn boost fuel. Flying with style stacks up a style multiplier.</li>
                <li>
                  Every flight pays out. The money goes into eight upgrade tracks: {flingIt.upgrades.slice(0, -1).join(", ").toLowerCase()} and{" "}
                  {flingIt.upgrades[flingIt.upgrades.length - 1].toLowerCase()}.
                </li>
                <li>Then rebirth for a permanent multiplier, and go even further.</li>
              </ol>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Planets unlock as you go (Mars, Neon, Ice and more), climbing from the Dunes to the Exosphere. There are also missions,
                crew and gear, and a daily spin.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                My best run so far: <span className="font-semibold text-foreground">30.0 km</span>. Portrait, built solo, out later this year.
              </p>
              {flingIt.storeLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {flingIt.storeLinks.map((store) => (
                    <a
                      key={store.href}
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-[6px] hover:decoration-primary"
                    >
                      {store.label}
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* Phone carousel */}
          <Reveal variant="zoom" delay={150}>
            <div
              className="relative mx-auto w-full max-w-[320px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Back phone showing the next screen */}
              <div className="absolute -right-10 top-10 hidden w-[78%] rotate-[9deg] opacity-40 blur-[1px] sm:block">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-[6px] border-[#1b1f2a] bg-black">
                  <Image src={shots[behind].src} alt="" fill sizes="250px" className="object-cover" />
                </div>
              </div>

              {/* Front phone */}
              <div className="relative animate-float" style={{ animationDuration: "6s" }}>
                <div className="glow absolute -inset-10 text-cyan-400/20" />
                <div className="relative aspect-[9/16] overflow-hidden rounded-[2.5rem] border-[8px] border-[#1b1f2a] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-cyan-400/20">
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                  {shots.map((shot, i) => (
                    <Image
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="320px"
                      className={`object-cover transition-all duration-700 ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-cyan-200" aria-live="polite">
                {shots[active].caption}
              </p>

              <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Fling It screenshots">
                {shots.map((shot, i) => (
                  <button
                    key={shot.src}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={shot.caption}
                    onClick={() => setActive(i)}
                    className={`relative h-14 w-9 overflow-hidden rounded-md border transition-all duration-300 ${
                      i === active ? "border-cyan-300 opacity-100 -translate-y-1" : "border-border opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image src={shot.src} alt="" fill sizes="36px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

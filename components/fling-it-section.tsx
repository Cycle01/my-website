"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Flame, Orbit, Rocket, Smartphone, TrendingUp, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { flingIt } from "@/lib/projects"

const features = [
  {
    icon: Rocket,
    title: "Pull back & let go",
    text: "A slingshot launch with a timing window. Nail a Perfect Launch for a x1.25 bonus.",
  },
  {
    icon: Flame,
    title: "Boost & style",
    text: "Burn boost fuel mid-flight and fly stylish to stack up a style multiplier.",
  },
  {
    icon: Orbit,
    title: "Planets to unlock",
    text: "Mars, Neon, Ice and more, climbing from the Dunes all the way to the Exosphere.",
  },
  {
    icon: TrendingUp,
    title: "Upgrade & rebirth",
    text: "Eight upgrade tracks, then rebirth for a permanent multiplier and go even further.",
  },
  {
    icon: Users,
    title: "Crew, gear, missions, daily spin",
    text: "Missions to clear, crew and gear to kit out, and a daily spin to come back for.",
  },
]

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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 80} className={i === features.length - 1 ? "sm:col-span-2" : ""}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground">{feature.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Upgrade tracks</p>
              <div className="flex flex-wrap gap-2">
                {flingIt.upgrades.map((upgrade) => (
                  <span
                    key={upgrade}
                    className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 font-mono text-[11px] text-cyan-200"
                  >
                    {upgrade}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="rounded-2xl border border-lime-300/30 bg-lime-300/5 px-5 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">My best run</div>
                  <div className="text-2xl font-bold text-lime-300">30.0 km</div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Smartphone className="h-4 w-4 text-cyan-300" />
                  Portrait · Built solo
                </div>
                {flingIt.storeLinks.map((store) => (
                  <a
                    key={store.href}
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  >
                    {store.label}
                  </a>
                ))}
              </div>
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

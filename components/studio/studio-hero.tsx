"use client"

import { useRef } from "react"
import { MoonScene } from "@/components/studio/moon-scene"
import { StudioBadge } from "@/components/studio/studio-badge"

export function StudioHero() {
  // The moon in the scene is drawn right behind the emblem, so the coin eclipses it.
  const emblemRef = useRef<HTMLDivElement>(null)

  return (
    <section id="top" className="relative isolate overflow-hidden" aria-labelledby="studio-title">
      <MoonScene anchor={emblemRef} className="-z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#0b0a09]" />

      <div className="mx-auto grid min-h-[min(100svh,880px)] max-w-[1440px] grid-cols-1 content-center gap-8 px-4 pb-16 pt-24 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-10 md:px-10 md:pb-20 md:pt-28">
        <div className="flex justify-center md:order-2">
          <div ref={emblemRef} className="s-in w-[44vw] max-w-[380px] md:w-[28vw]" style={{ animationDelay: "0.15s" }}>
            <StudioBadge />
          </div>
        </div>

        <div className="md:order-1">
          <h1
            id="studio-title"
            className="s-in text-[16vw] font-medium leading-[0.9] tracking-[-0.045em] text-foreground sm:text-[13vw] md:text-[9vw] xl:text-[8.5rem]"
          >
            Cycle&apos;s{" "}
            <br />
            Studios
          </h1>
          <p className="s-in mt-6 max-w-md text-lg leading-snug text-foreground/85 md:mt-8 md:text-xl" style={{ animationDelay: "0.08s" }}>
            Independent games by Bogdan / Cycle01.
            <br />
            <span className="text-muted-foreground">Atmospheric horror, strange places, and occasional experiments.</span>
          </p>
          <div className="s-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10" style={{ animationDelay: "0.16s" }}>
            <a
              href="#games"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-foreground px-6 text-[15px] font-medium text-background transition-colors duration-150 hover:bg-[#c9a46a]"
            >
              Explore games <span className="s-arrow s-arrow-d" aria-hidden="true">↓</span>
            </a>
            <a
              href="#sundown-2"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[color:var(--border)] px-6 text-[15px] text-foreground transition-colors duration-150 hover:border-foreground/60"
            >
              See Secrets of Sundown 2 <span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 right-4 font-mono text-[11px] text-foreground/60 sm:right-6 md:right-10">Site illustration, not game footage</p>
    </section>
  )
}

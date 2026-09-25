"use client"

import { useRef } from "react"
import { KineticWordmark } from "@/components/studio/kinetic-wordmark"
import { MoonScene } from "@/components/studio/moon-scene"
import { StudioBadge } from "@/components/studio/studio-badge"

const facts = [
  { label: "Founded by", value: "Bogdan (Cycle01)" },
  { label: "Focus", value: "Atmospheric horror" },
  { label: "Platforms", value: "PC & mobile" },
  { label: "Released", value: "6 games" },
]

export function StudioHero() {
  // The moon in the scene is drawn right behind the badge, so the coin eclipses it.
  const badgeRef = useRef<HTMLDivElement>(null)

  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden" aria-label="Cycle's Studios">
      <MoonScene anchor={badgeRef} className="-z-10" />
      {/* Fade the scene into the page below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28">
        <div className="relative flex flex-1 flex-col md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="order-1 flex justify-center py-6 md:order-2 md:py-0">
            <div ref={badgeRef} className="animate-hero-in w-[54vw] max-w-[440px] md:w-[30vw]" style={{ animationDelay: "0.35s" }}>
              <StudioBadge />
            </div>
          </div>

          <div className="order-2 mt-auto md:order-1 md:mt-0">
            <div
              className="animate-hero-in mb-8 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground md:mb-12"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dd97d] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7dd97d]" />
              </span>
              Now building Secrets of Sundown 2
            </div>
            <KineticWordmark lines={["Cycle's", "Studios"]} />
          </div>
        </div>

        <div
          className="animate-hero-in mt-10 grid grid-cols-1 gap-10 border-t border-white/[0.1] pt-8 md:mt-14 md:grid-cols-[1.2fr_2fr] md:gap-16"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="max-w-md text-lg leading-snug text-foreground md:text-xl">
            An independent game studio of one. I make atmospheric horror games for PC and mobile.
          </p>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 text-[15px] text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

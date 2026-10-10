"use client"

import { useRef, type PointerEvent } from "react"
import { DevNote } from "@/components/studio/dev-note"
import { OrbitArt } from "@/components/studio/orbit-art"

/** Splits a word into letters that rise out of a mask one after another (CSS only, so it runs from first paint). */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} className="s-letter" style={{ ["--i" as string]: i + offset }}>
            {ch === "’" ? "’" : ch}
          </span>
        ))}
      </span>
    </>
  )
}

export function StudioHero() {
  const ref = useRef<HTMLElement>(null)

  // The rings lean a few pixels toward the pointer (CSS eases it).
  const onPointer = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--hx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty("--hy", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }

  return (
    <section ref={ref} onPointerMove={onPointer} id="top" aria-labelledby="studio-title" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-12 pt-28 md:pb-16 md:pt-32">
      <OrbitArt className="right-[-30vw] top-[-5svh] h-[min(88vw,50svh)] w-[min(88vw,50svh)] opacity-50 sm:right-[-14vw] sm:top-[6svh] sm:h-[min(80vw,60svh)] sm:w-[min(80vw,60svh)] md:right-[-4vw] md:top-1/2 md:h-[min(60vw,86svh)] md:w-[min(60vw,86svh)] md:-translate-y-[54%] md:opacity-100" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* A short line over the title, in the page's one typeface. */}
        <p className="s-fade mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-foreground/70 md:mb-8 md:text-[13px]" style={{ animationDelay: "80ms" }}>
          <span className="h-px w-8 bg-[color:var(--accent)]" aria-hidden="true" />
          Game studio by Bogdan / Cycle01
        </p>

        {/* Both words share one typeface, weight and tracking. */}
        <h1 id="studio-title" className="text-[clamp(4.25rem,min(21vw,24svh),12.5rem)] font-medium leading-[0.86] tracking-[-0.055em] md:text-[clamp(5.5rem,min(13vw,24svh),13.5rem)]">
          <span className="s-line">
            <Letters text="Cycle’s" />
          </span>
          <span className="s-line pl-[0.5em] md:pl-[1.1em]">
            <Letters text="Studios" offset={7} />
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="s-fade max-w-md text-[16px] leading-relaxed text-foreground/75 md:text-[17px]" style={{ animationDelay: "620ms" }}>
              Atmospheric horror for PC and mobile, built in Unreal Engine 5, with the occasional lighter experiment.
            </p>
            <a href="#games" className="s-btn s-fade mt-6" style={{ animationDelay: "720ms" }}>
              Explore the games <span className="s-arrow s-arrow-d" aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="s-fade md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8" style={{ animationDelay: "820ms" }}>
            <DevNote />
          </div>
        </div>
      </div>
    </section>
  )
}

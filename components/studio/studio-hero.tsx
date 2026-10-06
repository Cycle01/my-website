"use client"

import { useRef } from "react"
import { DevNote } from "@/components/studio/dev-note"
import { useScrollDrift } from "@/components/studio/use-scroll-drift"
import { heroShot } from "@/lib/studio"

export function StudioHero() {
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  useScrollDrift(frameRef, imgRef, 5)

  return (
    <section id="top" aria-labelledby="studio-title" className="pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <h1
          id="studio-title"
          className="relative z-10 text-[clamp(4rem,19vw,7.5rem)] font-medium leading-[0.84] tracking-[-0.055em] md:col-span-8 md:-mb-[0.24em] md:text-[clamp(6rem,11vw,11.5rem)]"
        >
          <span className="s-line">
            <span>Cycle&rsquo;s</span>
          </span>{" "}
          <span className="s-line pl-[0.8em] md:pl-[1.3em]">
            <span className="s-serif tracking-[-0.035em]" style={{ animationDelay: "90ms" }}>
              Studios
            </span>
          </span>
        </h1>

        <div className="flex flex-col md:col-span-4 md:pb-8 md:pt-3">
          <p className="s-fade s-serif max-w-sm text-balance text-[1.6rem] leading-[1.15] md:text-[1.85rem]" style={{ animationDelay: "260ms" }}>
            Independent games by Bogdan / Cycle01.
          </p>
          <p className="s-fade mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground" style={{ animationDelay: "320ms" }}>
            Atmospheric horror for PC and mobile, built in Unreal Engine 5, with the occasional lighter experiment.
          </p>
          <a href="#games" className="s-fade mt-5 inline-flex min-h-11 w-fit items-center text-[15px]" style={{ animationDelay: "380ms" }}>
            <span className="s-link">Explore the games</span>&nbsp;<span className="s-arrow s-arrow-d" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* The title's negative bottom margin lets "Studios" sit over the screenshot's top edge, but never over the intro. */}
      <figure className="mx-auto mt-10 max-w-[1440px] sm:px-6 md:mt-0 md:px-10">
        <div ref={frameRef} className="s-mask relative aspect-[4/3] overflow-hidden bg-[color:var(--card)] sm:aspect-[16/9] lg:aspect-[21/9]">
          <picture>
            <source media="(max-width: 767px)" srcSet={heroShot.srcSmall} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={heroShot.src}
              alt={heroShot.alt}
              width={heroShot.width}
              height={heroShot.height}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover will-change-transform md:scale-[1.12]"
              style={{ objectPosition: heroShot.position }}
            />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-6 px-4 pt-3 sm:px-0 md:grid-cols-12 md:gap-10">
          <figcaption className="flex items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground md:col-span-6">
            <span>Secrets of Sundown</span>
            <span className="md:hidden">In-game</span>
            <span className="hidden md:inline">In-game screenshot</span>
          </figcaption>
          <div className="s-fade md:col-span-5 md:col-start-8" style={{ animationDelay: "440ms" }}>
            <DevNote />
          </div>
        </div>
      </figure>
    </section>
  )
}

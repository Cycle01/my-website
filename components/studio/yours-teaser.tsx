"use client"

import { useEffect, useRef } from "react"
import { asset } from "@/lib/asset"

export function YoursTeaser() {
  const stageRef = useRef<HTMLDivElement>(null)

  // A small light follows the pointer across the key art; touch devices and
  // reduced-motion users see the art fully lit instead (see .yours-art-lit).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let x = 50
    let y = 50
    const apply = () => {
      raf = 0
      stage.style.setProperty("--lx", `${x}%`)
      stage.style.setProperty("--ly", `${y}%`)
    }
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      x = ((e.clientX - r.left) / r.width) * 100
      y = ((e.clientY - r.top) / r.height) * 100
      if (!raf) raf = requestAnimationFrame(apply)
    }
    stage.addEventListener("pointermove", onMove)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <section id="yours" className="px-5 pt-32 md:px-10 md:pt-48" aria-labelledby="yours-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Announcement — Coming 2027</span>
          <span>02</span>
        </div>

        <div
          ref={stageRef}
          className="relative aspect-[16/9] select-none overflow-hidden rounded-md bg-[#0d0a0c]"
          style={{ ["--lx" as string]: "50%", ["--ly" as string]: "32%" }}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={asset("/images/studio/yours-key-art-mobile.webp")} />
            <img
              src={asset("/images/studio/yours-key-art.webp")}
              alt="Yours key art: a hillside suburb at sunset, a lone car driving up a dark forest road. Title text reads Yours, coming in 2027."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="yours-art-base absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <img
            src={asset("/images/studio/yours-key-art.webp")}
            alt=""
            aria-hidden="true"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="yours-art-lit pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <h2 id="yours-title" className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-6xl">
            Yours
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4 text-[17px] leading-relaxed text-foreground/80">
              <p className="text-2xl leading-snug tracking-[-0.02em] text-foreground md:text-3xl">
                An atmospheric horror game about one girl stalking another.
              </p>
              <p>It&apos;s about the feeling of being watched, and about the person doing the watching.</p>
            </div>
            <dl className="self-start divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                { label: "Genre", value: "Atmospheric horror" },
                { label: "Status", value: "In development" },
                { label: "Release", value: "2027" },
              ].map((f) => (
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

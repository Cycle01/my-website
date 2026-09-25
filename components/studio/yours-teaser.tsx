"use client"

import { useEffect, useRef } from "react"

export function YoursTeaser() {
  const stageRef = useRef<HTMLDivElement>(null)

  // A small light follows the pointer across the title; touch devices and
  // reduced-motion users get a fixed light instead.
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
          <span>Announcement</span>
          <span>02</span>
        </div>

        <div
          ref={stageRef}
          className="relative -mx-2 select-none overflow-hidden border-y border-white/[0.08] py-6 md:py-10"
          style={{ ["--lx" as string]: "30%", ["--ly" as string]: "50%" }}
        >
          <h2 id="yours-title" className="text-[34vw] font-extralight leading-[0.8] tracking-[-0.07em] text-[#1c1c1c] md:text-[26vw] xl:text-[22rem]">
            Yours
          </h2>
          <span
            aria-hidden="true"
            className="yours-lit pointer-events-none absolute inset-x-0 top-6 text-[34vw] font-extralight leading-[0.8] tracking-[-0.07em] text-[#f2f2f2] md:top-10 md:text-[26vw] xl:text-[22rem]"
          >
            Yours
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">Atmospheric horror · No footage or release date yet</p>
          <div className="max-w-xl space-y-4 text-[17px] leading-relaxed text-foreground/80">
            <p className="text-2xl leading-snug tracking-[-0.02em] text-foreground md:text-3xl">
              An atmospheric horror game about one girl stalking another.
            </p>
            <p>It&apos;s about the feeling of being watched, and about the person doing the watching.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

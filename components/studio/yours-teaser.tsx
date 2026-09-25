"use client"

import { useEffect, useRef } from "react"

export function YoursTeaser() {
  const stageRef = useRef<HTMLDivElement>(null)

  // A small light follows the pointer across the title. Touch devices and
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
    <section id="yours" className="relative overflow-hidden bg-[#050404] px-5 py-28 md:px-8 md:py-40" aria-labelledby="yours-title">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-foreground/45">
          Announcement · Atmospheric horror
        </p>

        <div
          ref={stageRef}
          className="yours-stage relative select-none"
          style={{ ["--lx" as string]: "38%", ["--ly" as string]: "55%" }}
        >
          <h2
            id="yours-title"
            className="text-[26vw] font-bold leading-[0.8] tracking-[-0.04em] text-[#241917] md:text-[19vw] xl:text-[15rem]"
          >
            Yours
          </h2>
          <span
            aria-hidden="true"
            className="yours-lit pointer-events-none absolute inset-0 text-[26vw] font-bold leading-[0.8] tracking-[-0.04em] text-[#e9ddd2] md:text-[19vw] xl:text-[15rem]"
          >
            Yours
          </span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div className="max-w-xl space-y-4 text-lg leading-relaxed text-foreground/75">
            <p className="text-2xl font-medium leading-snug text-foreground md:text-3xl">
              An atmospheric horror game about one girl stalking another.
            </p>
            <p>It&apos;s about the feeling of being watched, and about the person doing the watching.</p>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/45">
              Announced · No footage or release date yet
            </p>
            <p className="mt-6 font-serif text-2xl italic text-foreground/60">— yours</p>
          </div>
        </div>
      </div>
    </section>
  )
}

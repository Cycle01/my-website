"use client"

import { useEffect, useRef } from "react"
import { asset } from "@/lib/asset"
import { FadeUp, Rise } from "@/components/studio/rise"

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
              alt="Yours key art: a hillside town at sunset, a lone car driving up a dark forest road. Title text reads Yours, coming in 2027."
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

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <div>
            <Rise
              id="yours-title"
              lines={["Yours"]}
              className="text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-foreground md:text-8xl"
            />
            <dl className="mt-8 max-w-sm divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                { label: "Genre", value: "First-person psychological horror" },
                { label: "You play as", value: "Maya" },
                { label: "Status", value: "In development" },
                { label: "Release", value: "2027" },
              ].map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                  <dd className="text-right text-[15px] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="max-w-2xl">
            <FadeUp>
              <p className="text-2xl leading-snug tracking-[-0.02em] text-foreground md:text-3xl">
                A game about friendship, obsession, and the unsettling line between caring about someone and needing to possess them.
              </p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-8 space-y-4 text-[17px] leading-relaxed text-foreground/75">
              <p>
                You play as Maya, a young woman whose closest friend, Amy, leaves for a quiet trip in the mountains. But Maya isn&apos;t
                ready to be apart.
              </p>
            </FadeUp>

            <Rise
              as="p"
              lines={["Follow Amy from a distance.", "Watch where she goes.", "Learn her routine."]}
              className="my-12 text-3xl font-light leading-[1.15] tracking-[-0.03em] text-foreground md:my-16 md:text-5xl"
            />

            <FadeUp className="space-y-4 text-[17px] leading-relaxed text-foreground/75">
              <p>
                Follow her into restaurants, linger outside her hotel, and find ways into places you were never invited to. All the while,
                Amy still talks to you.
              </p>
              <p>
                Through messages and conversations, you&apos;ll experience two versions of the same friendship: the one Amy believes she has,
                and the one you&apos;re secretly creating around her.
              </p>
              <p className="text-foreground">The further you go, the harder it becomes to justify your actions.</p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { DuskScene } from "@/components/studio/dusk-scene"
import { FadeUp } from "@/components/studio/rise"
import { sundown2 } from "@/lib/studio"
import { releasedGames } from "@/lib/projects"

const original = releasedGames.find((g) => g.title === "Secrets of Sundown")!

// Shown one at a time while the scene is pinned. Facts only.
const captions = ["The sequel to Secrets of Sundown.", "My biggest project yet.", "Built in Unreal Engine 5.", "Release date not announced."]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (v: number) => 1 - Math.pow(1 - clamp01(v), 3)

/*
  A pinned, scroll-driven scene: the dusk panel opens up to full screen, the
  camera eases back, the title comes up and the captions step through. Reduced
  motion gets a plain panel with every caption listed.
*/
export function SundownFeature() {
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const captionRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true)
      return
    }
    const track = trackRef.current
    const frame = frameRef.current
    const scene = sceneRef.current
    const title = titleRef.current
    if (!track || !frame || !scene || !title) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = track.getBoundingClientRect()
      const span = Math.max(1, r.height - window.innerHeight)
      const p = clamp01(-r.top / span)

      // 0 → 0.22: the panel opens to full bleed while the camera eases back.
      const open = ease(p / 0.22)
      const inset = (1 - open) * 9
      frame.style.clipPath = `inset(${inset}% ${inset * 0.9}% ${inset}% ${inset * 0.9}% round ${(1 - open) * 10}px)`
      scene.style.transform = `scale(${1.22 - 0.22 * ease(p / 0.6)})`

      // Title arrives as the panel finishes opening.
      const ti = ease((p - 0.12) / 0.18)
      title.style.opacity = String(ti)
      title.style.transform = `translateY(${(1 - ti) * 40}px)`

      // Captions step through the rest of the track.
      const start = 0.3
      const step = (1 - start) / captions.length
      let current = 0
      captionRefs.current.forEach((el, i) => {
        if (!el) return
        const local = (p - start - i * step) / step // 0..1 while this caption is current
        const fadeIn = clamp01(local / 0.25)
        const fadeOut = i === captions.length - 1 ? 1 : clamp01((1 - local) / 0.25)
        const o = Math.min(fadeIn, fadeOut)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(1 - fadeIn) * 24 - (1 - fadeOut) * 24}px)`
        if (local >= 0) current = i
      })
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      if (countRef.current) countRef.current.textContent = `0${current + 1}`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section id="work" className="pt-24 md:pt-40" aria-labelledby="sundown-2-title">
      <div className="mx-auto mb-6 flex max-w-[1440px] items-baseline justify-between px-5 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground md:px-10">
        <span>Featured — In development</span>
        <span>01</span>
      </div>

      {still ? (
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[16/10] lg:aspect-[21/9]">
            <DuskScene />
          </div>
          <h2 id="sundown-2-title" className="mt-8 text-5xl font-medium leading-[0.92] tracking-[-0.045em] text-foreground md:text-8xl">
            Secrets of Sundown 2
          </h2>
          <ul className="mt-6 space-y-2 text-xl text-foreground/80">
            {captions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div ref={trackRef} className="relative h-[320vh]">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div ref={frameRef} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(9% 8.1% 9% 8.1% round 10px)" }}>
              <div ref={sceneRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.22)" }}>
                <DuskScene />
              </div>
              {/* Darken the lower part so the type stays readable. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-10 md:px-10 md:pb-14">
                <div className="relative mb-8 h-[3.2em] text-2xl leading-snug tracking-[-0.02em] text-foreground md:mb-10 md:text-4xl">
                  {captions.map((c, i) => (
                    <p
                      key={c}
                      ref={(el) => {
                        captionRefs.current[i] = el
                      }}
                      className="absolute bottom-0 left-0 max-w-xl"
                      style={{ opacity: 0 }}
                    >
                      {c}
                    </p>
                  ))}
                </div>
                <div ref={titleRef} style={{ opacity: 0 }}>
                  <h2
                    id="sundown-2-title"
                    className="text-[13vw] font-medium leading-[0.88] tracking-[-0.05em] text-foreground md:text-[9vw] xl:text-[9rem]"
                  >
                    Secrets of
                    <br />
                    Sundown 2
                  </h2>
                </div>
                <div className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground/70">
                  <span>
                    <span ref={countRef}>01</span> / 0{captions.length}
                  </span>
                  <div className="h-px flex-1 bg-white/15">
                    <div ref={barRef} className="h-px origin-left bg-white/80" style={{ transform: "scaleX(0)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-1 gap-12 px-5 md:mt-24 md:grid-cols-[1.2fr_2fr] md:gap-16 md:px-10">
        <FadeUp>
          <p className="max-w-sm text-2xl leading-snug tracking-[-0.02em] text-foreground md:text-3xl">
            The one I&apos;m giving the most time and care.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.08em]">
            <a
              href="https://twitter.com/cycledadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"
            >
              Follow on X ↗
            </a>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <FadeUp delay={0.08} className="space-y-4 text-[17px] leading-relaxed text-foreground/80">
            <p>
              The sequel to Secrets of Sundown, my psychological horror game set in the strange suburb of Sundown. It&apos;s the biggest
              project I&apos;ve taken on.
            </p>
            <p>I&apos;ll share more when there&apos;s something real to show. Until then, the first game is the best way in.</p>
            <dl className="!mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {sundown2.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                  <dd className="text-right text-[15px] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* Where it started */}
          <FadeUp delay={0.16}>
            <a
              href={original.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-md border border-white/[0.08] bg-[#111] transition-colors hover:border-white/25"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={original.image}
                  alt="Secrets of Sundown artwork"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Where it started · {original.year}</p>
                <p className="mt-2 text-xl tracking-[-0.02em] text-foreground">Secrets of Sundown</p>
                <p className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  <span>Rated {original.rating} on itch.io</span>
                  <span className="text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">Play ↗</span>
                </p>
              </div>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

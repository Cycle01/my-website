import { ArrowDown } from "lucide-react"
import { DuskScene } from "@/components/studio/dusk-scene"
import { Seal } from "@/components/chinese-decor"

export function StudioHero() {
  return (
    <section id="top" className="relative flex min-h-svh items-end overflow-hidden" aria-labelledby="studio-title">
      <DuskScene />
      {/* Keeps the headline readable over the brightest part of the sky. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0706]/85 via-[#0b0706]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pb-32">
        <div className="max-w-2xl animate-hero-in">
          <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            <Seal text="循环" size={30} className="rotate-[-6deg]" />
            Independent game studio
          </div>
          <h1 id="studio-title" className="text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Cycle
            <br />
            Studios
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
            A one-person studio run by Bogdan, known online as Cycle01. I make atmospheric horror games for PC and
            mobile, and right now I&apos;m building Secrets of Sundown 2.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#sundown-2"
              className="btn-shine inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-[0_0_40px_rgba(200,60,30,0.45)]"
            >
              Secrets of Sundown 2
            </a>
            <a
              href="#games"
              className="inline-flex items-center gap-2 rounded-lg border border-foreground/25 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              The games
            </a>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/55">
            7 games released · PC & mobile · Unreal Engine 5
          </p>
        </div>
      </div>

      <a
        href="#sundown-2"
        aria-label="Scroll to Secrets of Sundown 2"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/50 transition-colors hover:text-primary"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}

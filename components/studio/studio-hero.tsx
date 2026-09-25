import { ArrowDown } from "lucide-react"
import { StudioBadge } from "@/components/studio/studio-badge"

export function StudioHero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden" aria-labelledby="studio-title">
      {/* A single cold light from above, falling on the badge. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_70%_35%,rgba(143,176,198,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-24 pt-28 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pt-24">
        <div className="order-2 animate-hero-in lg:order-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">Independent game studio</p>
          <h1 id="studio-title" className="font-display mt-5 text-[4.2rem] font-semibold leading-[0.85] tracking-[-0.01em] text-foreground sm:text-8xl lg:text-[8.5rem]">
            Cycle
            <br />
            <span className="italic text-foreground/85">Studios</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/70">
            A one-person studio run by Bogdan, known online as Cycle01. Atmospheric horror for PC and mobile. Currently
            building Secrets of Sundown 2.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#sundown-2"
              className="btn-shine inline-flex items-center rounded-full bg-primary px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Secrets of Sundown 2
            </a>
            <a
              href="#games"
              className="inline-flex items-center rounded-full border border-foreground/20 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              The games
            </a>
          </div>
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
              ["7", "games released"],
              ["PC", "& mobile"],
              ["1", "developer"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-semibold text-foreground">{v}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 mx-auto w-[min(72vw,340px)] sm:w-[min(60vw,400px)] lg:order-2 lg:w-[min(38vw,470px)]">
          <StudioBadge />
          <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
            Drag to spin
          </p>
        </div>
      </div>

      <a
        href="#sundown-2"
        aria-label="Scroll to Secrets of Sundown 2"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/40 transition-colors hover:text-accent"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}

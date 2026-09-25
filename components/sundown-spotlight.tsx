import Image from "next/image"
import { ArrowRight, Youtube } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { sundown2 } from "@/lib/projects"

export function SundownSpotlight() {
  return (
    <section id="sundown-2" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Now Building"
          zh="进行中"
          title={
            <>
              Secrets of Sundown <span className="text-primary">2</span>
            </>
          }
          description="The most important project I'm working on right now."
        />

        <Reveal variant="zoom">
          <div className="group relative overflow-hidden rounded-3xl border border-primary/25 shadow-[0_0_80px_rgba(180,50,20,0.12)]">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/8.6]">
              <Image
                src={sundown2.image}
                alt="Secrets of Sundown 2: first-person view of a sunlit suburban street, flashlight in hand"
                fill
                priority={false}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover animate-ken-burns"
              />
              {/* VHS treatment, a nod to the original's look */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-foreground md:left-8 md:top-8 md:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-rec" />
                REC
              </div>
              <div className="absolute right-5 top-5 hidden font-mono text-xs tracking-[0.2em] text-foreground/80 sm:block md:right-8 md:top-8">
                SUNDOWN · CH 02
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  In development
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-foreground/90 md:text-base">
                  Return to Sundown. New areas, deeper mysteries, and more terrifying encounters.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              {"Secrets of Sundown 2 is the sequel to my first-person psychological horror game, set in the strange suburb of Sundown. It takes everything I learned from the original, the VHS look, the stalker, the choice-driven story, and pushes it further."}
            </p>
            <p>
              {"It has my full attention right now. Everything else on this page, from the mobile game to the browser tools, keeps me sharp while Sundown 2 gets built properly."}
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href={sundown2.original.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(180,50,20,0.4)]"
              >
                Play the original
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://youtube.com/@cycle01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <Youtube className="h-4 w-4" />
                Follow on YouTube
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <dl className="grid grid-cols-2 gap-3">
              {sundown2.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-border bg-card/60 p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-accent/25 bg-accent/5 p-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">The original</p>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{sundown2.original.title}</p>
              </div>
              <span className="font-mono text-sm font-bold text-accent">{sundown2.original.rating} on itch.io</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

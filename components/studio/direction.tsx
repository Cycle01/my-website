import { Reveal } from "@/components/reveal"
import { audience, direction } from "@/lib/studio"

export function Direction() {
  return (
    <section id="direction" className="relative px-5 py-24 md:px-8 md:py-32" aria-labelledby="direction-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* The audience so far */}
          <Reveal>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">The audience so far</p>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <p className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">~{audience.downloads.toLocaleString("en-US")}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">downloads</p>
              </div>
              <div>
                <p className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">~{audience.views.toLocaleString("en-US")}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">page views</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/55">
              Approximate totals across all my games on itch.io. Not sales, and not a count of unique players.
            </p>
            <p className="mt-8 max-w-md leading-relaxed text-foreground/75">
              It&apos;s a small start, and I&apos;m grateful for every one of those downloads. Most of the attention so far has come
              through itch.io. Steam has been slower, and growing there is one of the next things I&apos;m working toward.
            </p>
          </Reveal>

          {/* Where the studio is heading */}
          <Reveal delay={120}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">The next five years</p>
            <h2 id="direction-title" className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Better work, made more in the open
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {direction.map((item, i) => (
                <li key={item.title} className="border-t border-white/10 pt-5">
                  <p className="font-mono text-[11px] text-primary">0{i + 1}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{item.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-foreground/50">These are goals, not promises or a release schedule.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

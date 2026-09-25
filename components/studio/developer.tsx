import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Seal } from "@/components/chinese-decor"
import { announcements } from "@/lib/projects"
import { studioLinks } from "@/lib/studio"

export function Developer() {
  const latest = announcements[0]
  return (
    <section id="developer" className="relative border-t border-white/5 bg-[#0e0908] px-5 py-24 md:px-8 md:py-32" aria-labelledby="developer-title">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Meet the developer</p>
          <h2 id="developer-title" className="flex items-center gap-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Bogdan, aka Cycle01
            <Seal text="循环" size={40} className="rotate-[6deg]" />
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/75">
            <p>
              Cycle Studios is me. I design, program and put together every game here myself, mostly in Unreal Engine 5, alongside
              my studies. There&apos;s no team behind the name, just the work.
            </p>
            <p>
              I&apos;ve placed 6th nationally in a Romanian game jam, shipped a mobile game, and built Chrome extensions on the side.
              My personal portfolio has all of it, including the jam story, the experiments and the projects that never became
              games.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-shine mt-10 inline-flex items-center gap-2 rounded-lg border border-accent/50 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Personal Portfolio
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {latest && (
            <div className="mt-14 max-w-2xl border-l-2 border-primary/60 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                Latest note · {latest.date}
              </p>
              <p className="mt-2 font-semibold text-foreground">{latest.title}</p>
              <p className="mt-2 leading-relaxed text-foreground/65">{latest.body[0]}</p>
              <Link href="/portfolio/#news" className="mt-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary underline-offset-4 hover:underline">
                Read the full note
              </Link>
            </div>
          )}
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Follow or get in touch</p>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block font-semibold text-foreground transition-colors group-hover:text-primary">{l.label}</span>
                    <span className="mt-0.5 block font-mono text-xs text-foreground/50">{l.handle}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

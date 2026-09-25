import Link from "next/link"
import { audience, direction } from "@/lib/studio"
import { announcements } from "@/lib/projects"

export function StudioAbout() {
  const latest = announcements[0]
  return (
    <section id="studio" className="px-5 pt-32 md:px-10 md:pt-48" aria-labelledby="studio-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>The studio</span>
          <span>04</span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <h2 id="studio-heading" className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-6xl">
            One developer.
            <br />
            <span className="text-muted-foreground">No team behind the name.</span>
          </h2>
          <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-foreground/80">
            <p>
              Cycle Studios is me, Bogdan. I design, program and build every game myself, mostly in Unreal Engine 5, alongside my
              studies. Some releases went well, some didn&apos;t go the way I planned, and I&apos;d rather be upfront about both.
            </p>
            <p>
              My personal side, with the game jams, experiments and tools I&apos;ve built, lives in{" "}
              <Link href="/portfolio" className="text-foreground underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
                my personal portfolio
              </Link>
              .
            </p>
          </div>
        </div>

        {/* The audience so far */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-10 md:mt-28 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">The audience so far</p>
          <div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl font-light tracking-[-0.05em] text-foreground md:text-8xl">~{audience.downloads.toLocaleString("en-US")}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Downloads</p>
              </div>
              <div>
                <p className="text-5xl font-light tracking-[-0.05em] text-foreground md:text-8xl">~{audience.views.toLocaleString("en-US")}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Page views</p>
              </div>
            </div>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Approximate totals across all my games on itch.io. Not sales, and not a count of unique players. It&apos;s a small
              start and I&apos;m grateful for it. Most of it came through itch.io; growing on Steam is one of the next goals.
            </p>
          </div>
        </div>

        {/* The next five years */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-10 md:mt-28 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">The next five years</p>
            <p className="mt-4 max-w-xs text-2xl leading-snug tracking-[-0.02em] text-foreground">Better work, made more in the open.</p>
          </div>
          <div>
            <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {direction.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 md:grid-cols-[3rem_14rem_1fr] md:gap-6">
                  <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
                  <span className="text-[17px] text-foreground">{item.title}</span>
                  <span className="col-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-auto">{item.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Goals, not promises or a release schedule</p>
          </div>
        </div>

        {latest && (
          <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-10 md:mt-28 md:grid-cols-[1.2fr_2fr] md:gap-16">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">Latest note · {latest.date}</p>
            <div className="max-w-2xl">
              <p className="text-2xl leading-snug tracking-[-0.02em] text-foreground">{latest.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{latest.body[0]}</p>
              <Link href="/portfolio/#news" className="mt-4 inline-block font-mono text-[12px] uppercase tracking-[0.08em] text-foreground underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
                Read the full note ↗
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

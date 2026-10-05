import Link from "next/link"
import { audience } from "@/lib/studio"
import { announcements } from "@/lib/projects"

export function StudioAbout() {
  const latest = announcements[0]
  return (
    <section id="about" className="scroll-mt-16 pt-28 md:pt-44" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="s-reveal md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">About</p>
          <h2 id="about-title" className="mt-3 text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
            One developer,{" "}
            <br />
            <span className="text-muted-foreground">every part of the game.</span>
          </h2>
        </div>

        <div className="s-reveal max-w-2xl md:col-span-7 md:pt-8" style={{ transitionDelay: "80ms" }}>
          <p className="text-lg leading-relaxed text-foreground/85">
            Cycle&apos;s Studios is me, Bogdan, known online as Cycle01. I design, program and build every game myself, mostly in Unreal
            Engine 5, alongside my studies. Some releases went well, some didn&apos;t go the way I planned, and I&apos;d rather be upfront
            about both.
          </p>

          <div className="mt-8 border-l-2 border-[#c9a46a] pl-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Current focus</p>
            <p className="mt-2 text-[17px] leading-relaxed text-foreground">
              Secrets of Sundown 2 comes first. Yours is announced for 2027, and Fling It is coming to mobile later this year. I also
              want to share more of the process as I go.
            </p>
          </div>

          <p className="mt-8 text-[14px] leading-relaxed text-muted-foreground">
            So far, across my games on itch.io: {audience.downloads} downloads and {audience.views} page views (approximate totals).
          </p>

          <div className="mt-6 flex flex-col gap-1 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link href="/portfolio" className="s-link inline-block py-2.5 text-foreground">
              Game jams, tools and more in my personal portfolio&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
            </Link>
            {latest && (
              <Link href="/portfolio/#news" className="s-link inline-block py-2.5 text-foreground">
                Latest note: {latest.title}&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

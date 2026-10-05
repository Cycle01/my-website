import { DuskScene } from "@/components/studio/dusk-scene"
import { ExtLink } from "@/components/studio/ext-link"
import { sundown2, sundownGame } from "@/lib/studio"

/*
  The featured project. Secrets of Sundown 2 has no public artwork yet, so the
  panel is the site's own dusk illustration, labelled as such.
*/
export function SundownFeature() {
  return (
    <section id="sundown-2" className="scroll-mt-16 pt-20 md:pt-32" aria-labelledby="sundown-2-title">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <p className="s-reveal mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground md:mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c9a46a]" aria-hidden="true" />
          Featured · In development
        </p>
        <figure className="s-reveal">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
            <DuskScene />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
            Site illustration, not footage from the game. No screenshots of Secrets of Sundown 2 have been shared yet.
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 md:mt-14 md:grid-cols-12 md:gap-10 md:px-10">
        <h2
          id="sundown-2-title"
          className="s-reveal text-5xl font-medium leading-[0.92] tracking-[-0.045em] text-foreground md:col-span-6 md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Secrets of{" "}
          <br />
          Sundown 2
        </h2>

        <div className="s-reveal md:col-span-6 md:pt-2" style={{ transitionDelay: "80ms" }}>
          <p className="max-w-xl text-lg leading-relaxed text-foreground/85">{sundown2.summary}</p>
          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-[color:var(--border)] pt-6">
            {sundown2.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                <dd className={`mt-1.5 text-[16px] ${f.label === "Status" ? "text-[#c9a46a]" : "text-foreground"}`}>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col items-start gap-1 text-[15px] lg:flex-row lg:gap-8">
            <ExtLink href={sundown2.follow.href} className="s-link inline-block py-2.5 text-foreground">
              {sundown2.follow.label}&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
            </ExtLink>
            <ExtLink href={sundownGame.link.href} className="s-link inline-block py-2.5 text-foreground">
              Play the first game on itch.io&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
            </ExtLink>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { extensions, type Extension } from "@/lib/projects"

/*
  Browser tools: three Chrome extensions, with the AI disclosure in one line.
  Only real screenshots are shown; extensions without any get text alone.
  (The section keeps the id "vibe-coding" so existing links still land here.)
*/

function StoreLink({ ext }: { ext: Extension }) {
  return (
    <a
      href={ext.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary"
    >
      {ext.name} on the Chrome Web Store
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

function Details({ ext }: { ext: Extension }) {
  return (
    <>
      <div className="flex items-center gap-3">
        {ext.icon && <Image src={ext.icon} alt="" width={36} height={36} className="rounded-lg" />}
        <h3 className="text-2xl font-bold text-foreground md:text-3xl">{ext.name}</h3>
      </div>
      <p className="mt-4 leading-relaxed text-muted-foreground">{ext.description}</p>
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-border">
        {ext.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="mt-6">
        <StoreLink ext={ext} />
      </div>
    </>
  )
}

export function VibeCodingSection() {
  const withShots = extensions.filter((e) => e.screenshots.length > 0)
  const textOnly = extensions.filter((e) => e.screenshots.length === 0)

  return (
    <section id="vibe-coding" className="relative px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Browser tools"
          zh="工具"
          title="Three Chrome extensions"
          description={
            <p>I built these extensions with AI assistance, then tested and refined them in the browser before publishing them.</p>
          }
        />

        {/* The one with real screenshots gets the room for them. */}
        {withShots.map((ext) => (
          <article key={ext.slug} className="mb-20 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal>
              <Details ext={ext} />
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {ext.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <div className="relative aspect-[39/64] overflow-hidden rounded-xl border border-border">
                      <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover object-top" />
                    </div>
                    <figcaption className="mt-2 text-sm text-muted-foreground">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </article>
        ))}

        {/* The others, side by side as plain text. */}
        <div className="grid grid-cols-1 gap-14 border-t border-border pt-14 md:grid-cols-2">
          {textOnly.map((ext, i) => (
            <Reveal key={ext.slug} delay={i * 100}>
              <article>
                <Details ext={ext} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

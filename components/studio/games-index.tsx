import Link from "next/link"
import { ArtImage } from "@/components/studio/art-image"
import { ExtLink } from "@/components/studio/ext-link"
import { flingItGame, moonfallGame, sundownGame } from "@/lib/studio"

const label = "font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
const linkClass = "s-link inline-flex min-h-11 items-center text-[15px] text-foreground"

/** Platform · year · status line. The status can be highlighted. */
function Meta({ items, status, warn = false }: { items: string[]; status: string; warn?: boolean }) {
  return (
    <p className={label}>
      {items.join(" · ")} · <span className={warn ? "text-[#c9a46a]" : "text-foreground/80"}>{status}</span>
    </p>
  )
}

export function GamesIndex() {
  return (
    <section id="games" className="scroll-mt-16 pt-28 md:pt-44" aria-labelledby="games-title">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="s-reveal flex flex-col gap-3 border-b border-[color:var(--border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="games-title" className="text-4xl font-medium tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
            Selected games
          </h2>
          <p className="max-w-sm text-[15px] text-muted-foreground">Artwork and screenshots below are from the games themselves.</p>
        </div>

        {/* Secrets of Sundown: large key art, text beside it, screenshots below. */}
        <article className="mt-12 md:mt-16" aria-labelledby="sos-title">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <ExtLink href={sundownGame.link.href} className="s-reveal block lg:col-span-8">
              <span className="s-art block aspect-[16/10] overflow-hidden bg-[#13110f] sm:aspect-[2/1]">
                <ArtImage art={sundownGame.keyArt} />
              </span>
              <span className="sr-only">{sundownGame.link.label}</span>
            </ExtLink>
            <div className="s-reveal flex flex-col lg:col-span-4 lg:pt-2" style={{ transitionDelay: "80ms" }}>
              <Meta items={[sundownGame.platform, sundownGame.year]} status={sundownGame.status} />
              <h3 id="sos-title" className="mt-3 text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">
                {sundownGame.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-foreground/80">{sundownGame.summary}</p>
              <p className="mt-4 text-[14px] text-muted-foreground">Rated {sundownGame.rating} on itch.io</p>
              <div className="mt-4 lg:mt-auto lg:pt-6">
                <ExtLink href={sundownGame.link.href} className={linkClass}>
                  {sundownGame.link.short}&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
                </ExtLink>
              </div>
            </div>
          </div>

          <figure className="mt-6 md:mt-10">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
              {sundownGame.screenshots.map((shot, i) => (
                <div
                  key={shot.src}
                  className={`s-reveal overflow-hidden bg-[#13110f] ${
                    i === 0 ? "col-span-2 aspect-[16/9] md:col-span-6 md:aspect-auto md:min-h-full" : "aspect-[4/3] md:col-span-3 md:aspect-[3/4]"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <ArtImage art={shot} />
                </div>
              ))}
            </div>
            <figcaption className={`mt-3 ${label}`}>Secrets of Sundown · In-game screenshots</figcaption>
          </figure>
        </article>

        {/* Moonfall: Protocol: text first, art on the right, crew art below. */}
        <article className="mt-20 md:mt-32" aria-labelledby="moonfall-title">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <ExtLink href={moonfallGame.link.href} className="s-reveal block lg:order-2 lg:col-span-8">
              <span className="s-art block aspect-[16/10] overflow-hidden bg-[#13110f] sm:aspect-[1232/706]">
                <ArtImage art={moonfallGame.keyArt} />
              </span>
              <span className="sr-only">{moonfallGame.link.label}</span>
            </ExtLink>
            <div className="s-reveal flex flex-col lg:order-1 lg:col-span-4 lg:pt-2" style={{ transitionDelay: "80ms" }}>
              <Meta items={[moonfallGame.platform, moonfallGame.year]} status={moonfallGame.status} warn />
              <h3 id="moonfall-title" className="mt-3 text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">
                {moonfallGame.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-foreground/80">{moonfallGame.summary}</p>
              <p className="mt-4 text-[14px] text-muted-foreground">{moonfallGame.players}</p>
              <details className="group mt-5 border-y border-[color:var(--border)]">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[15px] text-foreground transition-colors duration-150 hover:text-[#c9a46a] [&::-webkit-details-marker]:hidden">
                  Why there are no further updates
                  <span aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-4 text-[15px] leading-relaxed text-foreground/75">{moonfallGame.note}</p>
              </details>
              <div className="mt-4 lg:mt-auto lg:pt-6">
                <ExtLink href={moonfallGame.link.href} className={linkClass}>
                  {moonfallGame.link.short}&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
                </ExtLink>
              </div>
            </div>
          </div>

          <figure className="s-reveal mt-6 md:mt-10">
            <div className="aspect-[16/9] overflow-hidden bg-[#13110f] sm:aspect-[3/1]">
              <ArtImage art={moonfallGame.crewArt} />
            </div>
            <figcaption className={`mt-3 ${label}`}>Moonfall: Protocol · Store art</figcaption>
          </figure>
        </article>

        {/* Fling It: portrait phone screenshots, a smaller treatment. */}
        <article className="mt-20 grid grid-cols-1 gap-8 border-t border-[color:var(--border)] pt-12 md:mt-32 md:grid-cols-12 md:gap-10 md:pt-16" aria-labelledby="fling-title">
          <div className="s-reveal md:col-span-5">
            <Meta items={[flingItGame.platform]} status={flingItGame.status} />
            <h3 id="fling-title" className="mt-3 text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">
              {flingItGame.title}
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-foreground/80">{flingItGame.summary}</p>
            <Link href={flingItGame.link.href} className={`${linkClass} mt-4`}>
              {flingItGame.link.short}&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
            </Link>
          </div>
          <figure className="s-reveal md:col-span-7" style={{ transitionDelay: "80ms" }}>
            <div className="grid max-w-xl grid-cols-3 gap-3 md:ml-auto md:gap-4">
              {flingItGame.screenshots.map((shot) => (
                <div key={shot.src} className="aspect-[9/16] overflow-hidden rounded-[14px] border border-[color:var(--border)] bg-[#0d1216]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" width={720} height={1280} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <figcaption className={`mt-3 md:text-right ${label}`}>Fling It · In-game screenshots</figcaption>
          </figure>
        </article>
      </div>
    </section>
  )
}

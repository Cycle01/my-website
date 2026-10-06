import Link from "next/link"
import { ExtLink } from "@/components/studio/ext-link"
import { projects, type StudioProject } from "@/lib/studio"

/*
  Games, in the order the studio ranks them: Secrets of Sundown 2 gets the wide
  feature row, then the rest follow in a two-column grid. Every game uses the
  same 16:9 frame, the same overlay and the same hover, whether its picture is
  promo art, store art or phone screenshots.
*/

const toneDot: Record<StudioProject["tone"], string> = {
  live: "bg-emerald-400/90",
  dev: "bg-[color:var(--accent)]",
  paused: "bg-foreground/40",
}

function Frame({ p, eager = false }: { p: StudioProject; eager?: boolean }) {
  return (
    <div className="s-frame s-mask">
      {p.art && (
        <picture>
          <source media="(max-width: 767px)" srcSet={p.art.srcSmall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.art.src}
            alt={p.art.alt}
            width={p.art.width}
            height={p.art.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: p.art.position }}
          />
        </picture>
      )}
      {p.phones && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 22% 100%, rgba(0,224,255,0.22), transparent 70%), radial-gradient(55% 80% at 82% 0%, rgba(150,70,255,0.28), transparent 70%), #070a12",
            }}
          />
          <div className="s-phones" role="group" aria-label={`${p.title} screenshots`}>
            {p.phones.map((ph) => (
              <div key={ph.src} className="s-phone">
                <div className="s-float h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ph.src} alt={ph.alt} loading="lazy" decoding="async" width={720} height={1280} className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Status({ p }: { p: StudioProject }) {
  return (
    <p className="s-label flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[p.tone]} ${p.tone === "dev" ? "s-pulse" : ""}`} aria-hidden="true" />
      <span className="text-foreground/90">{p.status}</span>
      <span aria-hidden="true">·</span>
      <span>{p.meta}</span>
    </p>
  )
}

function Action({ p }: { p: StudioProject }) {
  if (!p.action) return null
  const inner = (
    <>
      <span className="s-link">{p.action.label}</span>&nbsp;
      <span className={`s-arrow ${p.action.external ? "" : "s-arrow-r"}`} aria-hidden="true">
        {p.action.external ? "↗" : "→"}
      </span>
    </>
  )
  const cls = "inline-flex min-h-11 items-center text-[16px] text-foreground"
  return p.action.external ? (
    <ExtLink href={p.action.href} className={cls}>
      {inner}
    </ExtLink>
  ) : (
    <Link href={p.action.href} className={cls}>
      {inner}
    </Link>
  )
}

function Body({ p, featured = false }: { p: StudioProject; featured?: boolean }) {
  const facts = [...(p.facts ?? []), p.noArt].filter(Boolean).join(" · ")
  return (
    <>
      <Status p={p} />
      <h3 className={`mt-3 font-medium tracking-[-0.045em] text-balance ${featured ? "text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.95]" : "text-[clamp(1.9rem,2.9vw,2.75rem)] leading-[1]"}`}>
        {p.title}
      </h3>
      <p className={`mt-4 leading-relaxed text-foreground/80 ${featured ? "max-w-md text-[17px]" : "text-[16px]"}`}>{p.summary}</p>
      {facts && <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{facts}</p>}
      {p.notice && (
        <details className="group mt-5 border-l-2 border-[color:var(--accent)] pl-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
            {p.notice.title}
            <span className="s-label transition-colors duration-150 group-hover:text-foreground">
              <span className="group-open:hidden">Why</span>
              <span className="hidden group-open:inline">Close</span>
            </span>
          </summary>
          <p className="pb-1 text-[14px] leading-relaxed text-foreground/75">{p.notice.text}</p>
        </details>
      )}
      <div className={featured ? "mt-5" : "mt-auto pt-3"}>
        <Action p={p} />
      </div>
    </>
  )
}

export function GamesShowcase() {
  const [feature, ...rest] = projects
  return (
    <section id="games" aria-labelledby="games-title" className="scroll-mt-4 pt-20 md:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <h2 id="games-title" data-sr className="s-serif s-h2">
          Games
        </h2>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />

        {/* Primary focus: wide feature row, text left. */}
        <div data-sr className="mt-8 lg:mt-12">
          <article id={`game-${feature.id}`} className="s-card grid grid-cols-1 gap-6 p-3 sm:p-4 lg:grid-cols-12 lg:gap-10 lg:p-5">
            <div className="flex flex-col justify-center px-1.5 pb-2 pt-1 lg:col-span-5 lg:px-6 lg:py-6">
              <Body p={feature} featured />
            </div>
            <div className="max-lg:order-first lg:col-span-7">
              <Frame p={feature} eager />
            </div>
          </article>
        </div>

        {/* The rest, in order, two to a row, all left-aligned. */}
        <ul className="mt-5 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2 md:gap-6">
          {rest.map((p, i) => (
            <li key={p.id} className="flex" data-sr style={{ ["--d" as string]: (i % 2) * 120 }}>
              <article id={`game-${p.id}`} className="s-card flex w-full flex-col p-3 sm:p-4">
                <Frame p={p} />
                <div className="flex flex-1 flex-col px-1.5 pb-2 pt-6">
                  <Body p={p} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

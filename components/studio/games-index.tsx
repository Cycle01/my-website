"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { studioGames, type StudioGame } from "@/lib/studio"

function GameLink({ link }: { link: NonNullable<StudioGame["link"]> }) {
  const cls =
    "inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={cls}>
        {link.label}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    )
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {link.label}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  )
}

function Art({ game, className = "" }: { game: StudioGame; className?: string }) {
  if (game.shape === "portrait") {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#12303a,#070b10_70%)] ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.image} alt={`${game.title} screenshot`} loading="lazy" className="h-[88%] w-auto rounded-[1.4rem] border-4 border-[#1b1f2a] shadow-2xl" />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={game.image} alt={`${game.title} screenshot`} loading="lazy" className={`object-cover ${className}`} />
  )
}

export function GamesIndex() {
  const [active, setActive] = useState(0)

  return (
    <section id="games" className="relative px-5 py-24 md:px-8 md:py-32" aria-labelledby="games-title">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="text-accent">III</span> — Released games
        </p>
        <h2 id="games-title" className="font-display max-w-2xl text-5xl font-semibold leading-[0.95] text-foreground md:text-7xl">
          What I&apos;ve shipped so far
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {studioGames.map((game, i) => {
              const on = active === i
              return (
                <li
                  key={game.title}
                  onPointerEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                  className="group py-7"
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`font-mono text-xs transition-colors ${on ? "text-accent" : "text-foreground/35"}`}>
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3
                          className={`font-display text-3xl font-semibold transition-colors md:text-4xl ${
                            on ? "text-foreground" : "text-foreground/70"
                          }`}
                        >
                          {game.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                          {[game.year, game.platform].filter(Boolean).join(" · ")}
                        </span>
                      </div>

                      {/* Phones and tablets: art inline. */}
                      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl lg:hidden">
                        <Art game={game} className="absolute inset-0 h-full w-full" />
                      </div>

                      <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">{game.summary}</p>

                      {game.note && (
                        <div className="mt-5 max-w-xl rounded-lg border-l-2 border-accent/70 bg-accent/[0.06] px-4 py-3">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                            Status · {game.note.label}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/75">{game.note.text}</p>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                        {game.link && <GameLink link={game.link} />}
                        {game.meta && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{game.meta}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Desktop: one large preview that changes with the hovered or focused game. */}
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/3] overflow-hidden rounded-[20px] bg-card ring-1 ring-white/10">
              {studioGames.map((game, i) => (
                <div
                  key={game.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                >
                  <Art game={game} className="h-full w-full" />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80">
                  {studioGames[active].title}
                </span>
                <span className="font-mono text-[11px] text-foreground/50">
                  0{active + 1} / 0{studioGames.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-foreground/65">
          CyborgDash, The Way Back Ball, Safe Place and my smaller projects are in{" "}
          <Link href="/portfolio/#projects" className="font-medium text-accent underline-offset-4 hover:underline">
            my portfolio
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

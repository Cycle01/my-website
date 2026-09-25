"use client"

import Link from "next/link"
import { useRef, type ReactNode } from "react"
import { studioGames, type StudioGame } from "@/lib/studio"
import { FadeUp, Rise } from "@/components/studio/rise"

function GameLink({ game, className, children }: { game: StudioGame; className: string; children: ReactNode }) {
  if (!game.link) return null
  if (game.link.href.startsWith("/")) {
    return (
      <Link href={game.link.href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={game.link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

const linkClass =
  "inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-foreground underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"

/** Artwork that leans toward the pointer, with a soft glare. Flat on touch and for reduced motion. */
function TiltArt({ game }: { game: StudioGame }) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`
      el.style.setProperty("--gx", `${x * 100}%`)
      el.style.setProperty("--gy", `${y * 100}%`)
    })
  }
  const onLeave = () => {
    cancelAnimationFrame(raf.current)
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/art relative aspect-[16/10] overflow-hidden rounded-md bg-[#111] transition-transform duration-300 ease-out will-change-transform"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={game.image}
        alt={`${game.title} artwork`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover/art:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/art:opacity-100"
        style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.14), transparent 45%)" }}
      />
      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground backdrop-blur-sm">
        Flagship
      </span>
    </div>
  )
}

function FlagshipCard({ game, index }: { game: StudioGame; index: number }) {
  return (
    <FadeUp delay={index * 0.12} className="flex flex-col">
      <TiltArt game={game} />
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">{game.title}</h3>
        <span className="font-mono text-[12px] text-muted-foreground">0{index + 1}</span>
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {game.platform} · {game.year} ·{" "}
        <span className={game.note ? "text-[#e0b25c]" : "text-foreground/80"}>{game.status}</span>
      </p>
      <p className="mt-4 text-[16px] leading-relaxed text-foreground/75">{game.summary}</p>
      {game.note && <p className="mt-4 border-l border-[#e0b25c]/60 pl-4 text-[15px] leading-relaxed text-foreground/70">{game.note.text}</p>}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
        {game.meta ? <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{game.meta}</span> : <span />}
        {game.link && (
          <GameLink game={game} className={linkClass}>
            {game.link.label} <span aria-hidden="true">↗</span>
          </GameLink>
        )}
      </div>
    </FadeUp>
  )
}

function UpcomingCard({ game }: { game: StudioGame }) {
  return (
    <FadeUp className="mt-16 grid grid-cols-[6.5rem_1fr] items-center gap-6 border-y border-white/[0.08] py-8 md:mt-24 md:grid-cols-[9rem_1fr_auto] md:gap-10">
      {/* Phone-shaped frame for the portrait screenshot. */}
      <div className="overflow-hidden rounded-[1.1rem] border border-white/15 bg-[#0d1216] p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.image} alt={`${game.title} main menu`} loading="lazy" decoding="async" className="aspect-[9/19] w-full rounded-[0.8rem] object-cover" />
      </div>
      <div>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e0b25c]" />
          {game.platform} · {game.status}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">{game.title}</h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/75">{game.summary}</p>
      </div>
      {game.link && (
        <GameLink game={game} className={`${linkClass} col-span-2 md:col-span-1`}>
          {game.link.label} <span aria-hidden="true">↗</span>
        </GameLink>
      )}
    </FadeUp>
  )
}

export function GamesIndex() {
  const flagships = studioGames.filter((g) => g.flagship)
  const others = studioGames.filter((g) => !g.flagship)

  return (
    <section id="games" className="px-5 pt-32 md:px-10 md:pt-48" aria-labelledby="games-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Games</span>
          <span>03</span>
        </div>
        <Rise
          id="games-title"
          lines={["What I've made", "so far"]}
          className="mb-12 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:mb-20 md:text-7xl"
        />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10 lg:gap-14">
          {flagships.map((game, i) => (
            <FlagshipCard key={game.title} game={game} index={i} />
          ))}
        </div>

        {others.map((game) => (
          <UpcomingCard key={game.title} game={game} />
        ))}

        <p className="mt-10 text-[15px] text-muted-foreground">
          CyborgDash, The Way Back Ball, Safe Place and smaller projects live in{" "}
          <Link href="/portfolio/#projects" className="text-foreground underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
            my portfolio
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { studioGames, type StudioGame } from "@/lib/studio"

function RowLink({ game, children, className }: { game: StudioGame; children: React.ReactNode; className: string }) {
  if (!game.link) return <div className={className}>{children}</div>
  if (game.link.href.startsWith("/")) {
    return (
      <Link href={game.link.href} className={className} aria-label={`${game.title}: ${game.link.label}`}>
        {children}
      </Link>
    )
  }
  return (
    <a href={game.link.href} target="_blank" rel="noopener noreferrer" className={className} aria-label={`${game.title}: ${game.link.label}`}>
      {children}
    </a>
  )
}

function Thumb({ game, className = "" }: { game: StudioGame; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={game.image} alt="" loading="lazy" className={`${game.shape === "portrait" ? "object-contain bg-[#0d1216]" : "object-cover"} ${className}`} />
}

export function GamesIndex() {
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  // Desktop: the hovered game's image trails the cursor.
  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0
    const tick = () => {
      cx += (x - cx) * (reduced ? 1 : 0.16)
      cy += (y - cy) * (reduced ? 1 : 0.16)
      preview.style.transform = `translate3d(${cx + 28}px, ${cy - 110}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onEnter = (e: PointerEvent) => {
      x = cx = e.clientX
      y = cy = e.clientY
      tick()
    }
    list.addEventListener("pointermove", onMove)
    list.addEventListener("pointerenter", onEnter)
    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener("pointermove", onMove)
      list.removeEventListener("pointerenter", onEnter)
    }
  }, [])

  return (
    <section className="px-5 pt-32 md:px-10 md:pt-48" aria-labelledby="games-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Games</span>
          <span>03</span>
        </div>
        <h2 id="games-title" className="mb-12 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:mb-16 md:text-6xl">
          What I&apos;ve made so far
        </h2>

        <div ref={listRef} onPointerLeave={() => setActive(null)}>
          <div className="hidden grid-cols-[3rem_1fr_8rem_5rem_14rem_2rem] gap-4 border-b border-white/[0.08] pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground md:grid">
            <span>No.</span>
            <span>Title</span>
            <span>Platform</span>
            <span>Year</span>
            <span>Status</span>
            <span />
          </div>

          <ol>
            {studioGames.map((game, i) => (
              <li key={game.title} className="border-b border-white/[0.08]" onPointerEnter={() => setActive(i)}>
                <RowLink
                  game={game}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors md:grid-cols-[3rem_1fr_8rem_5rem_14rem_2rem] md:py-8"
                >
                  <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
                  <span
                    className={`text-3xl font-medium tracking-[-0.035em] transition-all duration-300 md:text-5xl ${
                      active === null || active === i ? "text-foreground" : "text-foreground/25"
                    } group-hover:translate-x-2`}
                  >
                    {game.title}
                  </span>
                  <span className="hidden text-[15px] text-muted-foreground md:block">{game.platform}</span>
                  <span className="hidden text-[15px] text-muted-foreground md:block">{game.year || "—"}</span>
                  <span className={`hidden text-[15px] md:block ${game.note ? "text-[#e0b25c]" : "text-muted-foreground"}`}>{game.status}</span>
                  <span aria-hidden="true" className="text-right text-xl text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground">
                    ↗
                  </span>
                </RowLink>

                {/* Phones: image and details inline. */}
                <div className="-mt-2 pb-6 md:hidden">
                  <Thumb game={game} className="aspect-[16/9] w-full rounded-md" />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {[game.platform, game.year, game.status].filter(Boolean).join(" · ")}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[3rem_1fr] md:gap-4">
                  <span className="hidden md:block" />
                  <div className="max-w-2xl space-y-3">
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{game.summary}</p>
                    {game.note && (
                      <p className="border-l border-[#e0b25c]/60 pl-4 text-[15px] leading-relaxed text-foreground/80">{game.note.text}</p>
                    )}
                    {game.meta && <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{game.meta}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-[15px] text-muted-foreground">
          CyborgDash, The Way Back Ball, Safe Place and smaller projects live in{" "}
          <Link href="/portfolio/#projects" className="text-foreground underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
            my portfolio
          </Link>
          .
        </p>
      </div>

      {/* Cursor-following preview (desktop only). */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="cursor-preview pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-md shadow-2xl md:block"
        style={{ opacity: active === null ? 0 : 1 }}
      >
        {studioGames.map((game, i) => (
          <Thumb key={game.title} game={game} className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
    </section>
  )
}

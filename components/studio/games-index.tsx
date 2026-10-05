"use client"

import Link from "next/link"
import { useRef, useState, type KeyboardEvent } from "react"
import { ExtLink } from "@/components/studio/ext-link"
import { defaultProject, projects, type StudioProject } from "@/lib/studio"

const pad = (n: number) => String(n).padStart(2, "0")
const label = "font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"

/** Warm the browser cache so a selection swaps without waiting on the network. */
function preload(p: StudioProject, small = false) {
  if (!p.art || typeof window === "undefined") return
  const img = new window.Image()
  img.src = small ? p.art.srcSmall : p.art.src
}

/**
 * A flat ring with one tick per project. The accent arc advances (always
 * forward, wrapping) to the selected tick.
 */
function CycleMarker({ index, angle }: { index: number; angle: number }) {
  const n = projects.length
  const r = 15
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" />
      <g
        className="s-ease transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ transform: `rotate(${angle}deg)`, transformOrigin: "20px 20px" }}
      >
        {/* An arc one segment long, centred on the first tick. */}
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${c / n - 4} ${c}`}
          transform={`rotate(${-90 - 180 / n + (2 / c) * 360} 20 20)`}
        />
      </g>
      {projects.map((p, i) => {
        const a = ((i * 360) / n - 90) * (Math.PI / 180)
        const on = i === index
        return <circle key={p.id} cx={20 + r * Math.cos(a)} cy={20 + r * Math.sin(a)} r={on ? 2.2 : 1.4} fill={on ? "var(--accent)" : "var(--muted-foreground)"} />
      })}
    </svg>
  )
}

function StatusText({ p }: { p: StudioProject }) {
  return (
    <>
      {p.meta} · <span className={p.tone === "paused" ? "text-[color:var(--accent)]" : "text-foreground/85"}>{p.status}</span>
    </>
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

/** Summary, facts, notice and action for one project (shared by both layouts). */
function Details({ p }: { p: StudioProject }) {
  return (
    <>
      <p className="text-[16px] leading-relaxed text-foreground/85">{p.summary}</p>
      {p.facts && <p className="mt-2 text-[14px] text-muted-foreground">{p.facts.join(" · ")}</p>}
      {p.notice && (
        <div className="mt-4 border-l-2 border-[color:var(--accent)] pl-4">
          <p className="text-[14px] font-medium text-foreground">{p.notice.title}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-foreground/75">{p.notice.text}</p>
        </div>
      )}
      <div className="mt-2">
        <Action p={p} />
      </div>
    </>
  )
}

export function GamesIndex() {
  const n = projects.length
  const [selected, setSelected] = useState(defaultProject)
  const [visited, setVisited] = useState<Set<number>>(() => new Set([defaultProject]))
  const [angle, setAngle] = useState((defaultProject * 360) / n)
  const [openIndex, setOpenIndex] = useState<number | null>(defaultProject)
  const [mobileSeen, setMobileSeen] = useState<Set<number>>(() => new Set([defaultProject]))
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    if (i === selected) return
    const steps = (i - selected + n) % n // the ring always advances forward
    setAngle((a) => a + (steps * 360) / n)
    setSelected(i)
    setVisited((v) => (v.has(i) ? v : new Set(v).add(i)))
  }

  // Vertical tabs: arrows move and select, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1
    if (next < 0) return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const toggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i))
    setMobileSeen((v) => (v.has(i) ? v : new Set(v).add(i)))
  }

  const current = projects[selected]

  return (
    <section id="games" aria-labelledby="games-title" className="border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pb-24 md:pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="games-title" className={label}>
            Games
          </h2>
          <p className={label}>
            {pad(n)} projects<span className="hidden md:inline"> · Select one to see details</span>
          </p>
        </div>

        {/* Desktop: selection menu on the left, one shared preview on the right. */}
        <div className="mt-4 hidden md:grid md:grid-cols-12 md:gap-10">
          <div role="tablist" aria-orientation="vertical" aria-label="Games" className="md:col-span-7">
            {projects.map((p, i) => {
              const active = i === selected
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  id={`tab-${p.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="game-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  onPointerEnter={() => preload(p)}
                  onFocus={() => preload(p)}
                  className="group relative grid w-full grid-cols-[3.5rem_1fr] items-baseline border-b border-[color:var(--border)] py-5 text-left lg:py-6"
                >
                  <span className={`font-mono text-[12px] transition-colors duration-200 ${active ? "text-[color:var(--accent)]" : "text-muted-foreground"}`}>
                    {pad(i + 1)}
                  </span>
                  <span>
                    <span
                      className={`block text-[clamp(2rem,3.5vw,3.4rem)] font-medium leading-[1] tracking-[-0.04em] transition-colors duration-200 ${
                        active ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span className="mt-2.5 block font-mono text-[12px] text-muted-foreground">
                      <StatusText p={p} />
                    </span>
                  </span>
                  {/* The selected row's rule draws in over the divider. */}
                  <span
                    aria-hidden="true"
                    className={`s-ease absolute inset-x-0 -bottom-px h-px origin-left bg-[color:var(--accent)] transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div id="game-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0} className="md:col-span-5 md:pt-5">
            <div className="sticky top-6">
              <div className="mb-4 flex items-center gap-3">
                <CycleMarker index={selected} angle={angle} />
                <p className={label}>
                  <span className="text-foreground">{pad(selected + 1)}</span> / {pad(n)}
                </p>
              </div>

              {/* One frame: artwork crossfades; projects without artwork get a typeset panel. */}
              <div className="relative aspect-[16/10] overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)]">
                {projects.map((p, i) =>
                  p.art && visited.has(i) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.id}
                      src={p.art.src}
                      alt={i === selected ? p.art.alt : ""}
                      aria-hidden={i !== selected}
                      width={p.art.width}
                      height={p.art.height}
                      loading="lazy"
                      decoding="async"
                      className={`s-ease absolute inset-0 h-full w-full object-cover transition-opacity duration-[450ms] ${i === selected ? "opacity-100" : "opacity-0"}`}
                      style={{ objectPosition: p.art.position }}
                    />
                  ) : null,
                )}
                {!current.art && (
                  <div key={current.id} className="s-swap absolute inset-0 flex flex-col justify-between bg-[color:var(--card)] p-6 lg:p-8">
                    <p className={label}>No artwork yet</p>
                    <div>
                      <p className="text-[clamp(1.75rem,2.6vw,2.6rem)] font-medium leading-[1] tracking-[-0.04em] text-foreground">{current.title}</p>
                      <p className="mt-3 max-w-xs text-[14px] text-muted-foreground">{current.noArt}</p>
                    </div>
                  </div>
                )}
              </div>

              <div key={current.id} className="s-swap mt-5 min-h-[15rem]">
                <p className={label}>
                  <StatusText p={current} />
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em]">{current.title}</h3>
                <div className="mt-3">
                  <Details p={current} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: one project open at a time, at most one image inside it. */}
        <ul className="mt-4 border-t border-[color:var(--border)] md:hidden">
          {projects.map((p, i) => {
            const open = openIndex === i
            return (
              <li key={p.id} className="border-b border-[color:var(--border)]">
                <h3>
                  <button
                    type="button"
                    id={`acc-btn-${p.id}`}
                    aria-expanded={open}
                    aria-controls={`acc-${p.id}`}
                    onClick={() => toggle(i)}
                    onTouchStart={() => preload(p, true)}
                    className="grid min-h-16 w-full grid-cols-[2.25rem_1fr_auto] items-center gap-2 py-4 text-left"
                  >
                    <span className={`font-mono text-[12px] ${open ? "text-[color:var(--accent)]" : "text-muted-foreground"}`}>{pad(i + 1)}</span>
                    <span>
                      <span className="block text-balance text-[26px] font-medium leading-[1.05] tracking-[-0.035em]">{p.title}</span>
                      <span className="mt-1.5 block font-mono text-[11px] text-muted-foreground">
                        <StatusText p={p} />
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`s-ease flex h-11 w-11 items-center justify-center text-xl text-muted-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div id={`acc-${p.id}`} role="region" aria-labelledby={`acc-btn-${p.id}`} className="s-collapse" data-open={open} inert={!open}>
                  <div>
                    <div className="pb-6 pl-[2.75rem]">
                      {p.art && mobileSeen.has(i) && (
                        <div className="mb-4 aspect-[16/9] overflow-hidden bg-[color:var(--card)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.art.srcSmall}
                            alt={p.art.alt}
                            width={p.art.width}
                            height={p.art.height}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                            style={{ objectPosition: p.art.position }}
                          />
                        </div>
                      )}
                      {!p.art && p.noArt && <p className="mb-3 text-[13px] text-muted-foreground">{p.noArt}</p>}
                      <Details p={p} />
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

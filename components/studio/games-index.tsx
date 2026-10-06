"use client"

import Link from "next/link"
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { ExtLink } from "@/components/studio/ext-link"
import { defaultProject, projects, type StudioProject } from "@/lib/studio"

const pad = (n: number) => String(n).padStart(2, "0")
const label = "font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"

/** Warm the browser cache so a selection swaps without waiting on the network. */
function preload(p: StudioProject, small = false) {
  if (typeof window === "undefined") return
  const srcs = p.art ? [small ? p.art.srcSmall : p.art.src] : (p.phones ?? []).map((ph) => ph.src)
  for (const src of srcs) new window.Image().src = src
}

/** A flat ring with one tick per project; the accent arc always advances forward to the selected tick. */
function CycleMarker({ index, angle }: { index: number; angle: number }) {
  const n = projects.length
  const r = 15
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" />
      <g className="s-ease transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ transform: `rotate(${angle}deg)`, transformOrigin: "20px 20px" }}>
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

/**
 * Summary, facts, notice and action for one project (shared by both layouts).
 * On the stage the notice's longer explanation folds into an expandable note,
 * so the text never climbs over the artwork; its title stays visible.
 */
function Details({ p, compactNotice = false }: { p: StudioProject; compactNotice?: boolean }) {
  return (
    <>
      <p className="text-[16px] leading-relaxed text-foreground/85">{p.summary}</p>
      {(p.facts || p.noArt) && <p className="mt-2 text-[14px] text-muted-foreground">{[...(p.facts ?? []), p.noArt].filter(Boolean).join(" · ")}</p>}
      {p.notice &&
        (compactNotice ? (
          <details className="group mt-4 border-l-2 border-[color:var(--accent)] pl-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {p.notice.title}
              <span className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                <span className="group-open:hidden">Why</span>
                <span className="hidden group-open:inline">Close</span>
              </span>
            </summary>
            <p className="pb-1 text-[14px] leading-relaxed text-foreground/75">{p.notice.text}</p>
          </details>
        ) : (
          <div className="mt-4 border-l-2 border-[color:var(--accent)] pl-4">
            <p className="text-[14px] font-medium text-foreground">{p.notice.title}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-foreground/75">{p.notice.text}</p>
          </div>
        ))}
      <div className="mt-2">
        <Action p={p} />
      </div>
    </>
  )
}

/** What fills the stage for one project: its art, its phone screenshots, or (with nothing shown yet) a numeral. */
function StageLayer({ p, active }: { p: StudioProject; active: boolean }) {
  const base = `s-layer absolute inset-0 ${active ? "opacity-100" : "opacity-0"}`
  if (p.art) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={p.art.src}
        alt={active ? p.art.alt : ""}
        aria-hidden={!active}
        width={p.art.width}
        height={p.art.height}
        loading="lazy"
        decoding="async"
        className={`${base} h-full w-full object-cover`}
        style={{ objectPosition: p.art.position, transform: active ? "scale(1)" : "scale(1.06)" }}
      />
    )
  }
  if (p.phones) {
    return (
      <div className={`${base} flex items-start justify-center gap-[2.5%] pl-[16%] pt-[7%]`} aria-hidden={!active}>
        {p.phones.map((ph, i) => (
          <div
            key={ph.src}
            className="s-layer aspect-[9/16] h-[50%] overflow-hidden rounded-[22px] border border-white/15 bg-[#0d1216] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{ transform: active ? `translateY(${i === 1 ? "-5%" : "4%"})` : "translateY(12%)", transitionDelay: active ? `${i * 70}ms` : "0ms" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph.src} alt={active ? ph.alt : ""} loading="lazy" decoding="async" width={720} height={1280} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={`${base} flex items-center justify-end pr-[6%]`} aria-hidden="true">
      <span
        className="s-serif select-none text-[min(62vh,560px)] leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(237,233,226,0.22)", transform: active ? "translateY(0)" : "translateY(3%)", transition: "transform 1.4s cubic-bezier(0.2,0.8,0.2,1)" }}
      >
        II
      </span>
    </div>
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
  const stageRef = useRef<HTMLDivElement>(null)

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

  // The artwork drifts a few pixels against the mouse (CSS transition does the easing).
  const onStagePointer = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }

  const toggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i))
    setMobileSeen((v) => (v.has(i) ? v : new Set(v).add(i)))
  }

  const current = projects[selected]

  return (
    <section id="games" aria-labelledby="games-title" className="scroll-mt-4 pt-20 md:pt-32">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-4 sm:px-6 md:px-10">
        <h2 id="games-title" className="flex items-baseline gap-4">
          <span aria-hidden="true" className="font-mono text-[12px] text-[color:var(--accent)]">01</span>
          <span className="s-serif text-[clamp(3rem,7vw,6rem)] leading-[0.9]">Games</span>
        </h2>
        <p className={`${label} pb-2 text-right`}>
          {pad(n)} projects<span className="hidden lg:inline"> · Select a title</span>
        </p>
      </div>

      {/* Desktop: a stage. Titles on the left, the selected game's art filling the right. */}
      <div
        ref={stageRef}
        onPointerMove={onStagePointer}
        className="relative mt-8 hidden h-[min(88vh,840px)] min-h-[640px] overflow-hidden border-y border-[color:var(--border)] lg:block"
      >
        <div className="s-stage-art pointer-events-none absolute inset-y-0 right-0 w-[68%]">
          <div className="s-pan absolute -inset-4">
            {projects.map((p, i) => (visited.has(i) ? <StageLayer key={p.id} p={p} active={i === selected} /> : null))}
          </div>
        </div>
        {/* Keeps the details legible where they sit over the artwork. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#080808_0%,rgba(8,8,8,0.82)_26%,rgba(8,8,8,0.35)_48%,transparent_66%)]" />

        <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-12 gap-10 px-10">
          <div className="col-span-5 flex flex-col justify-between py-10 xl:col-span-4">
            <div role="tablist" aria-orientation="vertical" aria-label="Games">
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
                    className="group relative grid w-full grid-cols-[2.75rem_1fr] items-baseline py-3.5 text-left xl:py-4"
                  >
                    <span className={`font-mono text-[12px] transition-colors duration-200 ${active ? "text-[color:var(--accent)]" : "text-muted-foreground"}`}>
                      {pad(i + 1)}
                    </span>
                    <span className="relative">
                      <span
                        className={`block whitespace-nowrap text-[clamp(1.75rem,2.6vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors duration-200 ${
                          active ? "text-foreground" : "text-foreground/35 group-hover:text-foreground/75"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className={`mt-1.5 block font-mono text-[11px] transition-colors duration-200 ${active ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                        <StatusText p={p} />
                      </span>
                      {/* The selected title's rule draws in beneath it. */}
                      <span
                        aria-hidden="true"
                        className={`s-ease absolute -bottom-2 left-0 h-px w-16 origin-left bg-[color:var(--accent)] transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-3">
              <CycleMarker index={selected} angle={angle} />
              <p className={label}>
                <span className="text-foreground">{pad(selected + 1)}</span> / {pad(n)}
                <span className="ml-3 normal-case tracking-normal text-muted-foreground/70">↑ ↓ to browse</span>
              </p>
            </div>
          </div>

          <div
            id="game-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="col-span-5 col-start-8 flex flex-col justify-end pb-10 xl:col-span-4 xl:col-start-9"
          >
            <div key={current.id} className="s-swap">
              <p className={label}>
                <StatusText p={current} />
              </p>
              <h3 className="mt-2 text-[1.75rem] font-medium leading-tight tracking-[-0.03em]">{current.title}</h3>
              <div className="mt-3">
                <Details p={current} compactNotice />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: one project open at a time, with its art at full width. */}
      <ul className="mx-auto mt-8 max-w-[1440px] border-t border-[color:var(--border)] px-4 sm:px-6 md:px-10 lg:hidden">
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
                    <span className="block text-balance text-[26px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[34px]">{p.title}</span>
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
                  <div className="pb-8">
                    {p.art && mobileSeen.has(i) && (
                      <div className="mb-5 aspect-[16/10] overflow-hidden bg-[color:var(--card)]">
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
                    {p.phones && mobileSeen.has(i) && (
                      <div className="mb-5 grid grid-cols-3 gap-3">
                        {p.phones.map((ph) => (
                          <div key={ph.src} className="aspect-[9/16] overflow-hidden rounded-[14px] border border-white/15 bg-[#0d1216]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={ph.src} alt={ph.alt} loading="lazy" decoding="async" width={720} height={1280} className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="md:max-w-2xl md:pl-[2.75rem]">
                      <Details p={p} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

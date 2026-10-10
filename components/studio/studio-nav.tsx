"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { asset } from "@/lib/asset"

const links = [
  { id: "games", label: "Games" },
  { id: "stills", label: "Stills" },
  { id: "skills", label: "Skills" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
]

/**
 * Fixed bar that turns to frosted glass once the page moves. The link for the
 * section in view is underlined, and a hairline along the bottom edge tracks
 * the scroll. Phones get a menu button instead of a row of links.
 */
export function StudioNav() {
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el)
    if (typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
          else setActive((cur) => (cur === e.target.id ? null : cur))
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className={`s-nav fixed inset-x-0 top-0 z-50 ${stuck || open ? "is-stuck" : ""} ${open ? "is-open" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 md:h-[4.5rem] md:px-10" aria-label="Studio">
        <a href="#top" onClick={() => setOpen(false)} className="s-fade flex min-h-11 items-center gap-3 text-[15px] font-semibold tracking-[-0.01em]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/studio/logo-figure.webp")} alt="" width={133} height={281} className="h-7 w-auto" />
          <span className="hidden sm:inline">Cycle&rsquo;s Studios</span>
          <span className="sr-only sm:hidden">Cycle&rsquo;s Studios</span>
        </a>

        <ul className="hidden items-center text-[14px] md:flex">
          {links.map((l, i) => (
            <li key={l.id} className="s-fade" style={{ animationDelay: `${80 + i * 50}ms` }}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`s-navlink flex min-h-11 items-center px-3 transition-colors duration-200 hover:text-foreground ${active === l.id ? "text-foreground" : "text-muted-foreground"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="s-fade ml-3" style={{ animationDelay: "360ms" }}>
            <Link
              href="/portfolio"
              className="flex min-h-10 items-center gap-2 rounded-full border border-[color:var(--border)] px-4 text-foreground transition-colors duration-200 hover:border-foreground/50 hover:bg-white/[0.04]"
            >
              Personal portfolio <span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="studio-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span className={`absolute left-0 h-px w-6 bg-foreground transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-3 h-px w-6 bg-foreground transition-all duration-300 ${open ? "top-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div id="studio-menu" className="s-menu border-t border-[color:var(--border)] px-4 pb-6 pt-2 md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between border-b border-[color:var(--border)] text-[26px] font-medium tracking-[-0.03em]"
                >
                  {l.label}
                  <span className="text-muted-foreground" aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
            <li>
              <Link href="/portfolio" className="flex min-h-14 items-center justify-between text-[18px] text-muted-foreground">
                Personal portfolio <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="s-progress" aria-hidden="true">
        <span />
      </div>
    </header>
  )
}

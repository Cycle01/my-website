"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { LocalTime } from "@/components/studio/local-time"
import { Scramble } from "@/components/studio/scramble"

const links = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
]

export function StudioNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-[#0a0a0a]/90 md:bg-[#0a0a0a]/70 md:backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 md:px-10" aria-label="Studio">
        <a href="#top" className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
          Cycle Studios
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground">
                <Scramble text={l.label} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <LocalTime className="hidden font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground lg:inline" />
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.08em] text-foreground"
          >
            <Scramble text="Personal Portfolio" />
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

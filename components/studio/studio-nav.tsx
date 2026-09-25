"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { asset } from "@/lib/asset"

const links = [
  { href: "#sundown-2", label: "Sundown 2" },
  { href: "#yours", label: "Yours" },
  { href: "#games", label: "Games" },
  { href: "#direction", label: "Direction" },
  { href: "#developer", label: "Developer" },
]

export function StudioNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-white/5 bg-[#0b0706]/95 md:bg-[#0b0706]/80 md:backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8" aria-label="Studio">
        <a href="#top" className="flex items-center gap-3 rounded-md">
          <Image src={asset("/images/studio-logo-transparent.png")} alt="" width={32} height={32} className="shrink-0" />
          <span className="whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground sm:text-sm sm:tracking-[0.2em]">
            Cycle <span className="text-primary">Studios</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/portfolio"
          className="whitespace-nowrap rounded-full border border-accent/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground sm:px-4 sm:text-xs sm:tracking-[0.15em]"
        >
          Personal Portfolio
        </Link>
      </nav>
    </header>
  )
}

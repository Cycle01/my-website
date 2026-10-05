"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { asset } from "@/lib/asset"

const links = [
  { href: "#games", label: "Games" },
  { href: "#about", label: "About" },
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-[color:var(--border)] bg-[#0b0a09]/95" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:px-10" aria-label="Studio">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/studio/logo-figure.webp")} alt="" width={133} height={281} className="h-7 w-auto" />
          <span className="hidden sm:inline">Cycle&apos;s Studios</span>
          <span className="sr-only sm:hidden">Cycle&apos;s Studios, back to top</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center px-2 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-foreground sm:px-3 sm:text-[14px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-[color:var(--border)] sm:mx-2" />
          <Link
            href="/portfolio"
            className="flex min-h-11 items-center px-2 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-foreground sm:text-[14px]"
          >
            <span className="sm:hidden">Portfolio</span>
            <span className="hidden sm:inline">Personal portfolio</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

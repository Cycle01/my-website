"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { asset } from "@/lib/asset"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#sundown-2", label: "Sundown 2" },
  { href: "#projects", label: "Games" },
  { href: "#fling-it", label: "Fling It" },
  { href: "#vibe-coding", label: "Tools" },
  { href: "#archive", label: "Archive" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Highlight the link of the section currently crossing the middle of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-primary/10 shadow-[0_4px_30px_rgba(180,50,20,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={asset("/images/studio-logo-transparent.png")}
              alt="Cycle's Studios logo"
              width={36}
              height={36}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]"
            />
            <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-foreground leading-tight">
              Cycle<span className="text-primary">01</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-tight">
              {"Cycle's Studios"}
            </span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link, i) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-primary/40 mr-1">0{i + 1}.</span>
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-px origin-left bg-primary transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            )
          })}
          <a
            href="https://cycle01.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground box-glow rounded-lg"
          >
            itch.io
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-primary/10 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-[0.15em] transition-all hover:text-primary rounded-lg hover:bg-primary/5 ${
                  active === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-primary/40">0{i + 1}</span>
                {link.label}
              </a>
            ))}
            <a
              href="https://cycle01.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mx-4 text-center border border-primary/40 bg-primary/10 px-4 py-3 font-mono text-sm uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground rounded-lg"
            >
              itch.io
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { asset } from "@/lib/asset"

const navLinks = [
  { href: "#about", label: "About", zh: "关于" },
  { href: "#sundown-2", label: "Sundown 2", zh: "新作" },
  { href: "#projects", label: "Games", zh: "游戏" },
  { href: "#fling-it", label: "Fling It", zh: "手游" },
  { href: "#vibe-coding", label: "Tools", zh: "工具" },
  { href: "#archive", label: "Archive", zh: "档案" },
  { href: "#news", label: "News", zh: "公告" },
  { href: "#contact", label: "Contact", zh: "联系" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track the section crossing the middle of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const current = navLinks.find((l) => l.href === active)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-background/95 md:bg-background/85 md:backdrop-blur-2xl border-b border-primary/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={asset("/images/studio-logo-transparent.png")}
            alt="Cycle's Studios logo"
            width={36}
            height={36}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-foreground leading-tight">
              Cycle<span className="text-primary">01</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-tight">
              {"Cycle's Studios"}
            </span>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex items-center gap-3 rounded-full border border-border bg-card/60 py-2 pl-4 pr-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-colors hover:border-primary/50"
          >
            <span className="hidden sm:inline text-muted-foreground">{current && !open ? current.label : ""}</span>
            <span>{open ? "Close" : "Menu"}</span>
            <span className="flex w-4 flex-col gap-1">
              <span className={`block h-0.5 w-4 bg-primary transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-primary transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
          <a
            href="https://cycle01.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            itch.io
          </a>
        </div>
      </nav>

      {/* Menu overlay */}
      {open && (
        <div id="site-menu" className="border-t border-primary/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-6 py-6 sm:grid-cols-4">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline justify-between rounded-xl border px-4 py-3 transition-colors ${
                  active === link.href
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-card/40 text-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.15em]">
                  <span className="mr-2 text-primary/50">0{i + 1}</span>
                  {link.label}
                </span>
                <span lang="zh-Hans" className="font-brush text-lg text-accent/60 group-hover:text-accent">
                  {link.zh}
                </span>
              </a>
            ))}
            <a
              href="https://cycle01.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-primary sm:hidden"
            >
              itch.io
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

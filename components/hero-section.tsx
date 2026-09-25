"use client"

import { ArrowDown, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { FallingPetals, Lantern, Seal } from "@/components/chinese-decor"

const roles = ["horror games", "a mobile game", "Chrome extensions", "playful prototypes"]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const timer = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-32">
      {/* Large radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.06] blur-[150px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[120px]" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <FallingPetals />

      {/* Hanging lanterns */}
      <div className="pointer-events-none absolute top-[190px] left-3 z-10 origin-top scale-[0.6] md:top-0 md:left-[10%] md:scale-100">
        <Lantern glyph="福" size={52} string={70} />
      </div>
      <div className="pointer-events-none absolute top-0 left-[20%] z-10 hidden md:block">
        <Lantern glyph="安" size={38} string={120} delay={1.2} duration={6} />
      </div>
      <div className="pointer-events-none absolute top-[190px] right-3 z-10 origin-top scale-[0.6] md:top-0 md:right-[12%] md:scale-100">
        <Lantern glyph="梦" size={46} string={96} delay={0.6} duration={5.5} />
      </div>

      {/* Vertical calligraphy */}
      <div
        lang="zh-Hans"
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 font-brush text-4xl tracking-[0.3em] text-accent/25 vertical-text lg:block"
      >
        循环工作室
      </div>
      <div
        lang="zh-Hans"
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 font-brush text-3xl tracking-[0.3em] text-primary/25 vertical-text lg:block"
      >
        创造世界
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 mx-auto max-w-5xl text-center transition-all duration-1000 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <a
          href="#sundown-2"
          className="group mb-10 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all hover:border-primary/60 hover:bg-primary/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Now building · Secrets of Sundown 2
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Title */}
        <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
          <span>{"Cycle's "}</span>
          <span className="relative inline-block">
            <span
              className="relative inline-block text-transparent bg-clip-text text-glow"
              style={{ backgroundImage: "linear-gradient(135deg, var(--primary), var(--accent))" }}
            >
              Studios
            </span>
            <span className="absolute -right-10 -top-6 hidden rotate-[8deg] sm:block">
              <Seal text="循环" size={40} />
            </span>
          </span>
        </h1>

        <p className="mb-6 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground md:text-base">
          I make{" "}
          <span key={roleIndex} className="inline-block text-accent animate-word-in">
            {roles[roleIndex]}
          </span>
        </p>

        <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {"I'm Cycle01. I make horror games in Unreal Engine 5, plus whatever else I get curious about. Seven games released so far, and Secrets of Sundown 2 is next."}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-primary px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(180,50,20,0.4)] rounded-lg"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-accent/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </a>
          <a
            href="https://cycle01.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground transition-all hover:border-primary/50 hover:text-primary hover:bg-primary/5 rounded-lg"
          >
            Visit itch.io
          </a>
        </div>
      </div>

      {/* Scroll indicator - pinned to bottom of viewport */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}

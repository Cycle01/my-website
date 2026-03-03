"use client"

import { ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] animate-grain" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')" }} />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-[0.02]">
        <div className="absolute inset-0 animate-scanline" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
      </div>

      {/* Large radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative corner brackets */}
      <div className="pointer-events-none absolute top-24 left-8 hidden lg:block">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-px h-16 bg-primary/30" />
      </div>
      <div className="pointer-events-none absolute top-24 right-8 hidden lg:block">
        <div className="w-16 h-px bg-accent/30 ml-auto" />
        <div className="w-px h-16 bg-accent/30 ml-auto" />
      </div>
      <div className="pointer-events-none absolute bottom-24 left-8 hidden lg:block">
        <div className="w-px h-16 bg-accent/30" />
        <div className="w-16 h-px bg-accent/30" />
      </div>
      <div className="pointer-events-none absolute bottom-24 right-8 hidden lg:block">
        <div className="w-px h-16 bg-primary/30 ml-auto" />
        <div className="w-16 h-px bg-primary/30 ml-auto" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 mx-auto max-w-5xl text-center transition-all duration-1000 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Title */}
        <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
          <span>{"Cycle's "}</span>
          <span
            className="relative inline-block text-transparent bg-clip-text text-glow"
            style={{ backgroundImage: "linear-gradient(135deg, var(--primary), var(--accent))" }}
          >
            Studios
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Indie game developer crafting immersive worlds in
          <span className="text-primary font-semibold"> Unreal Engine 5</span> and
          <span className="text-accent font-semibold"> Godot</span>.
          From horror to action. From concept to launch.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-primary px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(180,50,20,0.4)] rounded-lg"
          >
            <span className="relative z-10">View My Games</span>
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

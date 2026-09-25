"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { studioLinks } from "@/lib/studio"

const EMAIL = "ciclentiu@gmail.com"

export function StudioContact() {
  const magnetRef = useRef<HTMLAnchorElement>(null)

  // The email line leans toward the pointer (mouse/trackpad only).
  useEffect(() => {
    const el = magnetRef.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let dx = 0
    let dy = 0
    const apply = () => {
      raf = 0
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      dx = (e.clientX - (r.left + r.width / 2)) * 0.06
      dy = (e.clientY - (r.top + r.height / 2)) * 0.12
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      dx = 0
      dy = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <footer id="contact" className="px-5 pb-10 pt-32 md:px-10 md:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Contact</span>
          <span>05</span>
        </div>

        <a
          ref={magnetRef}
          href={`mailto:${EMAIL}`}
          className="group block w-fit text-[9vw] font-medium leading-[0.95] tracking-[-0.05em] text-foreground transition-transform duration-500 ease-out md:text-[6.5vw] xl:text-[6rem]"
        >
          Get in touch
          <span aria-hidden="true" className="ml-3 inline-block text-muted-foreground transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-foreground">
            ↗
          </span>
          <span className="mt-3 block font-mono text-[13px] font-normal tracking-[0.02em] text-muted-foreground">{EMAIL}</span>
        </a>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
          {studioLinks
            .filter((l) => !l.href.startsWith("mailto:"))
            .map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="group">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{l.label}</span>
                <span className="mt-2 block text-[15px] text-foreground underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-white/60">
                  {l.handle} ↗
                </span>
              </a>
            ))}
          <Link href="/portfolio" className="group">
            <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Personal</span>
            <span className="mt-2 block text-[15px] text-foreground underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-white/60">
              Personal Portfolio ↗
            </span>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Cycle Studios</span>
          <span>A one-person studio</span>
        </div>
      </div>
    </footer>
  )
}

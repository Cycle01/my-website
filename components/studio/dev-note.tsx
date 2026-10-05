"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { ExtLink } from "@/components/studio/ext-link"
import { currentBuild } from "@/lib/studio"

/** "Currently building": a closed developer's note that opens in place. */
export function DevNote() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="border-t border-[color:var(--border)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group block min-h-14 w-full py-3 text-left"
      >
        <span className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
            Currently building
          </span>
          <span className="flex items-center gap-2 transition-colors duration-150 group-hover:text-foreground">
            {open ? "Close note" : "Open note"}
            <span aria-hidden="true" className={`s-ease inline-block text-base leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
              +
            </span>
          </span>
        </span>
        <span className="mt-1.5 block text-[16px] text-foreground">Currently developing {currentBuild.title}.</span>
      </button>

      <div id={panelId} className="s-collapse" data-open={open} inert={!open} aria-hidden={!open}>
        <div>
          <div className="border-l border-[color:var(--accent)] pb-2 pl-4">
            <p className="text-[15px] leading-relaxed text-foreground/85">{currentBuild.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              {currentBuild.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {currentBuild.quote && (
              <figure className="mt-4">
                <blockquote className="text-[15px] leading-relaxed text-foreground/85">&ldquo;{currentBuild.quote.text}&rdquo;</blockquote>
                <figcaption className="mt-1 text-[13px] text-muted-foreground">From my note &ldquo;{currentBuild.quote.source}&rdquo;</figcaption>
              </figure>
            )}
            <div className="mt-3 flex flex-wrap gap-x-6 text-[14px]">
              <ExtLink href={currentBuild.follow.href} className="inline-flex min-h-11 items-center">
                <span className="s-link">{currentBuild.follow.label}</span>&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
              </ExtLink>
              <Link href={currentBuild.note.href} className="inline-flex min-h-11 items-center">
                <span className="s-link">{currentBuild.note.label}</span>&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

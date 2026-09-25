"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Play, X as Close, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Seal } from "@/components/chinese-decor"
import { archiveProjects, type ArchiveProject } from "@/lib/projects"

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-[2deg]"]

function Preview({ project }: { project: ArchiveProject }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Only reveal the clip once it actually loads, so a missing file keeps the still.
  const [ready, setReady] = useState(false)
  const play = () => videoRef.current?.play().catch(() => {})
  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black" onMouseEnter={play} onMouseLeave={stop}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale-[35%] sepia-[15%] transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-start bg-[radial-gradient(circle_at_30%_30%,#3a2a1e,#0d0a08_70%)] p-4 pt-[14%] text-center">
          <span className="font-bold uppercase tracking-[0.1em] text-[#f4ede1] text-2xl">{project.title}</span>
        </div>
      )}
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ${ready ? "group-hover:opacity-100" : ""}`}
        />
      )}
      <span className="absolute right-2 top-2 rotate-[6deg] rounded-sm border-2 border-[#c8241b] bg-[#f4ede1]/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8241b]">
        For fun
      </span>
    </div>
  )
}

export function ArchiveSection() {
  const [open, setOpen] = useState<ArchiveProject | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  const openClip = (project: ArchiveProject) => {
    setVideoFailed(false)
    setOpen(project)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <section id="archive" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-accent/50" />
      {/* Cork-board dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-6">
          <SectionHeading
            kicker="The Archive"
            zh="档案"
            tone="accent"
            title="Made just for fun"
            description={
              <p>
                {"Not every project needs a launch date. These were built for the joy of it: to try a mechanic, learn a system, or chase a silly idea. Hit play on any of them to watch the clip."}
              </p>
            }
          />
          <Reveal variant="zoom" delay={200} className="hidden shrink-0 md:block">
            <Seal text="玩" size={76} className="rotate-[-8deg]" />
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2">
          {archiveProjects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 120}>
              <div
                className={`group relative rounded-sm bg-[#f4ede1] p-3 pb-5 text-[#2a1f1a] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 hover:z-10 hover:rotate-0 hover:-translate-y-2 hover:scale-[1.02] ${tilts[i % tilts.length]}`}
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-accent/40 backdrop-blur-sm" />

                <button
                  type="button"
                  onClick={() => openClip(project)}
                  className="relative block w-full text-left"
                  aria-label={`Watch the ${project.title} clip`}
                >
                  <Preview project={project} />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  </span>
                </button>

                <div className="px-1 pt-4">
                  <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-[#2a1f1a]/75">{project.description}</p>
                  {project.note && (
                    <p className="mb-3 rounded-sm border-l-2 border-[#c8241b] bg-[#c8241b]/5 px-3 py-2 text-xs leading-relaxed text-[#2a1f1a]/80">
                      {project.note}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-sm border border-[#2a1f1a]/15 px-2 py-0.5 font-mono text-[10px] text-[#2a1f1a]/70">
                        {tag}
                      </span>
                    ))}
                    <a
                      href={project.clip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#c8241b] hover:underline"
                    >
                      On {project.clip.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Clip player */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title} clip`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-[560px]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-foreground">
              <span className="font-mono text-xs uppercase tracking-[0.2em]">{open.title}</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card hover:border-primary/50 hover:text-primary"
                aria-label="Close"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-xl border border-border bg-card">
              {open.video && !videoFailed ? (
                <video src={open.video} controls autoPlay playsInline onError={() => setVideoFailed(true)} className="w-full" />
              ) : (
                <iframe
                  src={open.clip.embed}
                  title={`${open.title} on ${open.clip.source}`}
                  className="h-[70vh] w-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
            <a
              href={open.clip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
            >
              Open on {open.clip.source}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

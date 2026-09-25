import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Seal } from "@/components/chinese-decor"
import { archiveProjects, type ArchiveProject } from "@/lib/projects"

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-[2deg]"]

function Preview({ project }: { project: ArchiveProject }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black">
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
      <span className="absolute right-2 top-2 rotate-[6deg] rounded-sm border-2 border-[#c8241b] bg-[#f4ede1]/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8241b]">
        For fun
      </span>
    </div>
  )
}

export function ArchiveSection() {
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
                {"Not every project needs a launch date. These were built for the joy of it: to try a mechanic, learn a system, or chase a silly idea. Click any of them to watch the clip."}
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

                <a
                  href={project.clip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full"
                  aria-label={`Watch the full ${project.title} clip on ${project.clip.source}`}
                >
                  <Preview project={project} />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center gap-2 rounded-full bg-black/60 py-2.5 pl-3 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#c8241b]">
                      <Play className="h-4 w-4 fill-current" />
                      Watch on {project.clip.source}
                    </span>
                  </span>
                </a>

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
                      Full clip on {project.clip.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  )
}

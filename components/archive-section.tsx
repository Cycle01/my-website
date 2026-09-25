import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Seal } from "@/components/chinese-decor"
import { archiveProjects } from "@/lib/projects"

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"]

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
                {"Not every project needs a launch date. These were built for the joy of it: to try a mechanic, learn a system, or chase a silly idea. They're archived, not abandoned. Each one taught me something."}
              </p>
            }
          />
          <Reveal variant="zoom" delay={200} className="hidden shrink-0 md:block">
            <Seal text="玩" size={76} className="rotate-[-8deg]" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {archiveProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 120}>
              <div
                className={`group relative rounded-sm bg-[#f4ede1] p-3 pb-5 text-[#2a1f1a] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 hover:z-10 hover:rotate-0 hover:-translate-y-2 hover:scale-[1.02] ${tilts[i % tilts.length]}`}
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-accent/40 backdrop-blur-sm" />

                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale-[35%] sepia-[15%] transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105"
                  />
                  <span className="absolute right-2 top-2 rotate-[6deg] rounded-sm border-2 border-[#c8241b] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8241b] bg-[#f4ede1]/80">
                    For fun
                  </span>
                </div>

                <div className="px-1 pt-4">
                  <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#2a1f1a]/75">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-sm border border-[#2a1f1a]/15 px-2 py-0.5 font-mono text-[10px] text-[#2a1f1a]/70">
                        {tag}
                      </span>
                    ))}
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

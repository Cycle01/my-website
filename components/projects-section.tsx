import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { releasedGames } from "@/lib/projects"

export function ProjectsSection() {
  const featured = releasedGames.filter((g) => g.featured)
  const others = releasedGames.filter((g) => !g.featured)

  return (
    <section id="projects" className="relative px-6 py-32 overflow-hidden">
      {/* Section divider */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker="My Games" zh="游戏" title="Released games" />
          <Reveal className="mb-16 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Every game built from the ground up. Available on itch.io and Steam.
          </Reveal>
        </div>

        {/* Featured games - larger cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          {featured.map((project, i) => (
            <Reveal key={project.title} delay={i * 120}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_60px_rgba(180,50,20,0.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                  <div className="absolute right-4 top-4 rounded-lg bg-background/70 px-3 py-1.5 backdrop-blur-md border border-border/50">
                    <span className="font-mono text-xs text-foreground">{project.year}</span>
                  </div>

                  {project.rating && (
                    <div className="absolute left-4 top-4 rounded-lg bg-accent/20 px-3 py-1.5 backdrop-blur-md border border-accent/30">
                      <span className="font-mono text-xs text-accent font-bold">{project.rating}</span>
                    </div>
                  )}

                  <div className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Solo Developer</p>
                  <h3 className="mb-3 text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-secondary/80 px-2.5 py-1 font-mono text-[11px] text-secondary-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Other released games */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <Reveal key={project.title} delay={i * 120}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(180,50,20,0.08)] ${
                  project.store === "Steam" ? "border-sky-400/25 hover:border-sky-400/50" : "border-border hover:border-primary/30"
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-70" />
                  <div className="absolute right-3 top-3 rounded-md bg-background/70 px-2.5 py-1 backdrop-blur-md border border-border/50">
                    <span className="font-mono text-[10px] text-foreground">{project.year}</span>
                  </div>
                  <div
                    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 backdrop-blur-md border ${
                      project.store === "Steam" ? "border-sky-400/40 bg-sky-500/20" : "border-primary/30 bg-primary/15"
                    }`}
                  >
                    <span className={`font-mono text-[10px] font-bold ${project.store === "Steam" ? "text-sky-200" : "text-primary"}`}>
                      {project.store === "Steam" ? "On Steam" : "itch.io"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[10px] text-secondary-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

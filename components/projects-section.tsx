import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { releasedGames, type Game } from "@/lib/projects"

/** Stand-in cover for games without key art yet. */
function TitleCard({ title, tags, large = false }: { title: string; tags: string[]; large?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,oklch(0.35_0.12_25),transparent_60%),radial-gradient(circle_at_80%_90%,oklch(0.3_0.1_80),transparent_55%),oklch(0.14_0.01_30)] p-4 text-center transition-transform duration-700 group-hover:scale-105">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span className={`relative font-bold uppercase tracking-[0.08em] text-foreground ${large ? "text-4xl" : "text-2xl"}`}>{title}</span>
      <span className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{tags[0]}</span>
    </div>
  )
}

function StoreBadge({ store }: { store: Game["store"] }) {
  const steam = store === "Steam"
  return (
    <div
      className={`absolute left-3 top-3 rounded-md px-2.5 py-1 backdrop-blur-md border ${
        steam ? "border-sky-400/40 bg-sky-500/20" : "border-primary/30 bg-primary/15"
      }`}
    >
      <span className={`font-mono text-[10px] font-bold ${steam ? "text-sky-200" : "text-primary"}`}>
        {steam ? "On Steam" : "itch.io"}
      </span>
    </div>
  )
}

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
            {`${releasedGames.length} on PC, one on mobile. Secrets of Sundown and Moonfall: Protocol are the biggest so far.`}
          </Reveal>
        </div>

        {/* Flagship games */}
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
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                  ) : (
                    <TitleCard title={project.title} tags={project.tags} large />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                  <StoreBadge store={project.store} />
                  <div className="absolute right-4 top-4 rounded-lg bg-background/70 px-3 py-1.5 backdrop-blur-md border border-border/50">
                    <span className="font-mono text-xs text-foreground">{project.year}</span>
                  </div>

                  <div className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {project.rating ? `Flagship · rated ${project.rating}` : "Flagship"}
                  </p>
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(180,50,20,0.08)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <TitleCard title={project.title} tags={project.tags} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-70" />
                  <StoreBadge store={project.store} />
                  <div className="absolute right-3 top-3 rounded-md bg-background/70 px-2.5 py-1 backdrop-blur-md border border-border/50">
                    <span className="font-mono text-[10px] text-foreground">{project.year}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                    {project.rating && <span className="ml-2 font-mono text-[10px] font-bold text-accent">{project.rating}</span>}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-4">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
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

"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  role: string
  year: string
  link: string
  rating?: string
  featured: boolean
  upcoming?: boolean
}

const projects: Project[] = [
  {
    title: "Secrets of Sundown",
    description:
      "A first-person psychological horror game set in the strange suburb of Sundown. Explore a semi-open world, make choice-driven decisions, and uncover sinister secrets. Features VHS-style graphics, stalker mechanics, and dynamic environments.",
    image: "/images/secrets-of-sundown.jpg",
    tags: ["Unreal Engine 5", "C++", "Blueprints", "Horror"],
    role: "Solo Developer",
    year: "2025",
    link: "https://cycle01.itch.io/secrets-of-sundown",
    rating: "4.5/5",
    featured: true,
  },
  {
    title: "IronMade",
    description:
      "An action-packed medieval adventure. Play as a nameless knight escaping a dungeon with one goal: finding his daughter Sara. Fight through twisted creatures and haunting ruins in a tale of love, survival, and redemption.",
    image: "/images/ironmade-screenshot.jpg",
    tags: ["Unreal Engine 5", "C++", "Action", "Medieval"],
    role: "Solo Developer",
    year: "2024",
    link: "https://cycle01.itch.io/ironmade",
    rating: "5.0/5",
    featured: true,
  },
  {
    title: "VORE",
    description:
      "A slick, retro-style zombie shooter. Simple, fast, and fun. Jump in and blast through waves of the undead in this arcade-inspired action game with stylized visuals.",
    image: "/images/vore.jpg",
    tags: ["Unreal Engine 5", "Blueprints", "Shooter", "Retro"],
    role: "Solo Developer",
    year: "2026",
    link: "https://cycle01.itch.io",
    featured: false,
  },
  {
    title: "Safe Place",
    description:
      "Play as a time traveler stuck in the wrong dimension -- a gray, lifeless place crawling with patrolling robots. Solve five puzzles, avoid traps, and get your travel system back online with help from Bobbie, your AI companion.",
    image: "/images/safe-place.jpg",
    tags: ["Unreal Engine 5", "Blueprints", "Puzzle", "Sci-Fi"],
    role: "Solo Developer",
    year: "2025",
    link: "https://cycle01.itch.io/safe-place",
    featured: false,
  },
  {
    title: "Moonfall Protocol",
    description:
      "An atmospheric action-horror title set in a collapsing lunar facility. Survive hostile environments and unravel the mystery behind a failed colonization mission.",
    image: "/images/moonfall-protocol.jpg",
    tags: ["Unreal Engine 5", "C++", "Horror", "Sci-Fi"],
    role: "Solo Developer",
    year: "2025",
    link: "#",
    featured: false,
  },
  {
    title: "Secrets of Sundown 2",
    description:
      "The sequel to the acclaimed psychological horror experience. Return to Sundown with new areas, deeper mysteries, and more terrifying encounters.",
    image: "/images/secrets-of-sundown-2.jpg",
    tags: ["Unreal Engine 5", "C++", "Horror", "Sequel"],
    role: "Solo Developer",
    year: "Upcoming",
    link: "#",
    upcoming: true,
    featured: false,
  },
  {
    title: "Spidey Game",
    description:
      "A fast-paced action game with web-swinging mechanics and stylized comic book visuals. Swing through a dark city and take on enemies in thrilling combat.",
    image: "/images/spidey-game.jpg",
    tags: ["Unreal Engine 5", "Blueprints", "Action", "Superhero"],
    role: "Solo Developer",
    year: "Upcoming",
    link: "#",
    upcoming: true,
    featured: false,
  },
  {
    title: "Finding the Moose Man",
    description:
      "An atmospheric exploration game set in dense wilderness. Track down a legendary cryptid through foggy forests, abandoned campsites, and unsettling encounters.",
    image: "/images/finding-the-moose-man.jpg",
    tags: ["Unreal Engine 5", "C++", "Exploration", "Mystery"],
    role: "Solo Developer",
    year: "Upcoming",
    link: "#",
    upcoming: true,
    featured: false,
  },
]

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative px-6 py-32 overflow-hidden">
      {/* Section divider */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                My Games
              </span>
              <span className="h-px flex-1 max-w-[100px] bg-primary/30" />
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl leading-[1.1]">
              Released & Upcoming
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Every game built solo from the ground up. Available on itch.io.
          </p>
        </div>

        {/* Featured games - larger cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {projects.filter(p => p.featured).map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_rgba(180,50,20,0.1)]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    hoveredIndex === index ? "scale-110 brightness-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                {/* Year badge */}
                <div className="absolute right-4 top-4 rounded-lg bg-background/70 px-3 py-1.5 backdrop-blur-md border border-border/50">
                  <span className="font-mono text-xs text-foreground">
                    {project.year}
                  </span>
                </div>

                {/* Rating badge */}
                {project.rating && (
                  <div className="absolute left-4 top-4 rounded-lg bg-accent/20 px-3 py-1.5 backdrop-blur-md border border-accent/30">
                    <span className="font-mono text-xs text-accent font-bold">
                      {project.rating}
                    </span>
                  </div>
                )}

                {/* Hover arrow */}
                <div className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              <div className="p-6">
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {project.role}
                </p>
                <h3 className="mb-3 text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
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
          ))}
        </div>

        {/* Released games - smaller grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {projects.filter(p => !p.featured && !p.upcoming).map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target={project.link !== "#" ? "_blank" : undefined}
              rel={project.link !== "#" ? "noopener noreferrer" : undefined}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(180,50,20,0.08)]"
              onMouseEnter={() => setHoveredIndex(100 + index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    hoveredIndex === 100 + index ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-80" />

                <div className="absolute right-3 top-3 rounded-md bg-background/70 px-2.5 py-1 backdrop-blur-md border border-border/50">
                  <span className="font-mono text-[10px] text-foreground">{project.year}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-base font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
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
          ))}
        </div>

        {/* Upcoming games section */}
        {projects.some(p => p.upcoming) && (
          <>
            <div className="flex items-center gap-4 mb-8 mt-16">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Upcoming
              </span>
              <span className="h-px flex-1 bg-accent/20" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.filter(p => p.upcoming).map((project, index) => (
                <div
                  key={project.title}
                  className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-card transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(200,160,50,0.08)]"
                  onMouseEnter={() => setHoveredIndex(200 + index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Concept art for ${project.title}`}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        hoveredIndex === 200 + index ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-80" />

                    <div className="absolute right-3 top-3 rounded-md bg-accent/20 px-2.5 py-1 backdrop-blur-md border border-accent/30">
                      <span className="font-mono text-[10px] text-accent font-bold">Upcoming</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-2 text-base font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent/80 border border-accent/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

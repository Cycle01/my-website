import { Code2, Gamepad2, Palette, Skull } from "lucide-react"
import { CountUp } from "@/components/count-up"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Seal } from "@/components/chinese-decor"
import { studioStats } from "@/lib/projects"

const highlights = [
  {
    icon: Gamepad2,
    title: "Game Design",
    description:
      "Creating immersive gameplay loops, choice-driven mechanics, and player-centric horror experiences.",
    number: "01",
  },
  {
    icon: Code2,
    title: "UE5 & Godot",
    description:
      "Building with C++, Blueprints, and GDScript. From rapid prototypes to polished releases.",
    number: "02",
  },
  {
    icon: Skull,
    title: "Horror & Action",
    description:
      "Specializing in psychological horror, atmospheric tension, and visceral medieval combat.",
    number: "03",
  },
  {
    icon: Palette,
    title: "Solo Dev",
    description:
      "Handling everything from concept art and level design to programming and sound design.",
    number: "04",
  },
]

const pillars = [
  {
    title: "Atmosphere first",
    zh: "氛围",
    text: "Every game should have a mood you can feel in the first minute. Horror, action or a silly launch game, the world comes first.",
  },
  {
    title: "Ship, learn, repeat",
    zh: "学习",
    text: "Games, a mobile game, browser tools. Every release teaches me something the next one uses. Finishing things is the skill.",
  },
  {
    title: "Stay independent",
    zh: "独立",
    text: "Own the ideas, own the tools, build at my own pace. Secrets of Sundown 2 is the next big step.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 overflow-hidden">
      {/* Decorative accent */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="About Me" zh="关于我" title={"The developer behind Cycle's Studios"} />

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              {"I go by "}
              <span className="font-semibold text-foreground">Cycle01</span>
              {", the solo developer and the whole team behind Cycle's Studios. I design, code, light and sound my games myself, mostly in Unreal Engine 5 and Godot."}
            </p>
            <p>
              {"I started with small projects, and every release since has been a step up: better visuals, tighter mechanics, stronger atmosphere. I'm drawn to tension and mystery. Suburbs that feel wrong, dungeons you need to escape, forests you shouldn't walk into alone."}
            </p>
            <p>
              {"Lately I've been widening the net. I built my first mobile game, "}
              <a href="#fling-it" className="font-semibold text-accent underline-offset-4 hover:underline">
                Fling It
              </a>
              {", and I've been "}
              <a href="#vibe-coding" className="font-semibold text-primary underline-offset-4 hover:underline">
                vibe coding
              </a>
              {" browser tools, with three Chrome extensions live on the Chrome Web Store. Different formats, same rule: it has to feel good to use."}
            </p>
          </Reveal>

          <Reveal variant="right" delay={150}>
            <div className="relative rounded-2xl border border-border bg-card/60 p-6">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Studio at a glance</p>
              <div className="grid grid-cols-2 gap-4">
                {studioStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <div className="text-4xl font-bold text-foreground">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</div>
                    {stat.sub && <div className="mt-0.5 font-mono text-[10px] text-accent/80">{stat.sub}</div>}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Top rated on itch.io</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">IronMade · Secrets of Sundown</div>
                </div>
                <div className="text-right font-mono text-sm font-bold text-accent">
                  5.0 · 4.5
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_40px_rgba(180,50,20,0.06)]">
                <span className="absolute top-4 right-4 font-mono text-xs text-primary/20 group-hover:text-primary/40 transition-colors">
                  {item.number}
                </span>

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/10 transition-colors group-hover:bg-primary/15 group-hover:border-primary/20">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-6 right-6 h-px bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* The goal */}
        <Reveal className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-card via-card to-primary/[0.07] p-8 md:p-12">
            <div
              lang="zh-Hans"
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-10 font-brush text-[180px] leading-none text-accent/[0.05] md:text-[260px]"
            >
              志
            </div>
            <div className="relative flex flex-col gap-10">
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">The Goal</span>
                  <Seal text="志向" size={34} className="rotate-[-6deg]" />
                </div>
                <h3 className="mb-5 text-2xl font-bold leading-tight text-foreground md:text-4xl text-balance">
                  {"Where Cycle's Studios is headed"}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {"Grow Cycle's Studios from a one-person studio into an independent studio people recognise, known for atmospheric games that stay with you after you close them."}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {pillars.map((pillar, i) => (
                  <div key={pillar.title} className="rounded-2xl border border-border/70 bg-background/40 p-5 backdrop-blur-sm">
                    <div className="mb-3 flex items-baseline justify-between">
                      <span className="font-mono text-xs text-primary">0{i + 1}</span>
                      <span lang="zh-Hans" className="font-brush text-2xl text-accent/60">
                        {pillar.zh}
                      </span>
                    </div>
                    <h4 className="mb-2 font-semibold text-foreground">{pillar.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

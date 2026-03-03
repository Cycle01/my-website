import { Code2, Gamepad2, Palette, Skull } from "lucide-react"

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

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 overflow-hidden">
      {/* Decorative accent */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              About Me
            </span>
            <span className="h-px flex-1 max-w-[100px] bg-primary/30" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl leading-[1.1] text-balance">
            {"The developer behind Cycle's Studios"}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {"I'm an indie developer who likes experimenting with different ideas and styles. I started by building small projects, and with each game I try to improve the visuals, mechanics, and overall experience. I enjoy creating tense, atmospheric worlds. I focus a lot on atmosphere, mystery, and gameplay that feels immersive."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_40px_rgba(180,50,20,0.06)]"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}

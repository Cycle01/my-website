import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const alsoShipping = [
  "Chrome Extensions (Manifest V3)",
  "JavaScript",
  "HTML & CSS",
  "AI-assisted coding",
  "Mobile game dev",
]

const skillCategories = [
  {
    category: "Engines",
    skills: [
      { name: "Unreal Engine 5", level: 95 },
      { name: "UE5 Blueprints", level: 92 },
      { name: "Godot", level: 80 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "C++", level: 92 },
      { name: "GDScript", level: 78 },
      { name: "HLSL / GLSL", level: 65 },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "Level Design", level: 90 },
      { name: "UI/UX Design", level: 82 },
      { name: "3D Modeling", level: 70 },
      { name: "VFX / Shaders", level: 75 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Blender", level: 78 },
      { name: "Substance Painter", level: 72 },
      { name: "Perforce / Git", level: 90 },
      { name: "JIRA / Notion", level: 85 },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32 overflow-hidden">
      {/* Section divider */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Tech Stack" zh="技能" title="Skills & Tools" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.category}
              delay={i * 100}
              className="rounded-2xl border border-border bg-card/50 p-6 transition-colors duration-300 hover:border-primary/20"
            >
              <h3 className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
                {category.category}
              </h3>
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-primary tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="skill-fill h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 rounded-2xl border border-border bg-card/50 p-6">
          <h3 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Also shipping with
          </h3>
          <div className="flex flex-wrap gap-2">
            {alsoShipping.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-foreground/90"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

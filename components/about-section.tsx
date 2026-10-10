import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

/*
  About: plain paragraphs and a simple list of the tools I use. No skill cards,
  counters or philosophy cards; the selected work above carries the evidence.
*/

const tools: { name: string; note?: string }[] = [
  { name: "Unreal Engine 5", note: "C++ and Blueprints. Almost everything I make." },
  { name: "Blender and Substance Painter" },
  { name: "Character Creator and iClone", note: "Characters." },
  { name: "Marvelous Designer", note: "Clothing." },
  { name: "Godot", note: "Still early days." },
]

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="About me" zh="关于我" title={"The developer behind Cycle's Studio"} />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              {"I'm Bogdan, and I go by "}
              <span className="font-semibold text-foreground">Cycle01</span>
              {". Cycle's Studio is just me: I design, code, light and sound my games myself, almost all of them in Unreal Engine 5."}
            </p>
            <p>
              {"I'm drawn to tension and mystery: suburbs that feel wrong, dungeons you need to escape, forests you shouldn't walk into alone. Most of what I make ends up as horror."}
            </p>
            <p>
              {"Lately I've been trying other formats too. "}
              <a href="#fling-it" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                Fling It
              </a>
              {" is my first mobile game, and I've published three "}
              <a href="#vibe-coding" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                browser extensions
              </a>
              {" on the Chrome Web Store."}
            </p>
            <p>
              {"The goal is to grow Cycle's Studio into an independent studio people recognise for atmospheric games. Secrets of Sundown 2 is the next step."}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="text-sm font-semibold text-foreground">What I work with</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {tools.map((t) => (
                <li key={t.name} className="py-3">
                  <span className="text-foreground">{t.name}</span>
                  {t.note && <span className="text-muted-foreground"> · {t.note}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

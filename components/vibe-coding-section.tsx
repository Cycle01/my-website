import Image from "next/image"
import { ArrowUpRight, Bug, Lightbulb, MessageSquare, Rocket, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AdBlockPreview, IndieRadarPreview, ScreenshotGallery, TabGrouperPreview } from "@/components/extension-previews"
import { extensions, type Extension } from "@/lib/projects"

const steps = [
  {
    icon: Lightbulb,
    title: "Spot the itch",
    text: "Start from a problem I actually have: ads everywhere, forty open tabs, no time to research a genre.",
  },
  {
    icon: MessageSquare,
    title: "Describe the vibe",
    text: "Plain-language prompts: what it should do, how it should look, how it should feel to click.",
  },
  {
    icon: Bug,
    title: "Test it for real",
    text: "Load it unpacked, break it on real sites, feed every bug straight back into the loop.",
  },
  {
    icon: Rocket,
    title: "Polish & ship",
    text: "Icons, UI passes, a proper store listing, then publish it to the Chrome Web Store.",
  },
]

function ExtensionVisual({ extension }: { extension: Extension }) {
  if (extension.slug === "ai-tab-grouper-pro" && extension.screenshots.length > 0) {
    return <TabGrouperPreview screenshots={extension.screenshots} />
  }
  if (extension.screenshots.length > 0) return <ScreenshotGallery screenshots={extension.screenshots} />
  if (extension.slug === "adblock-pro") return <AdBlockPreview />
  return <IndieRadarPreview />
}

const accents: Record<Extension["slug"], { text: string; border: string; bg: string; button: string }> = {
  "adblock-pro": {
    text: "text-violet-300",
    border: "border-violet-400/30",
    bg: "bg-violet-500/10",
    button: "bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]",
  },
  "ai-tab-grouper-pro": {
    text: "text-orange-300",
    border: "border-orange-400/30",
    bg: "bg-orange-500/10",
    button: "bg-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.45)]",
  },
  "indie-radar": {
    text: "text-amber-300",
    border: "border-amber-400/30",
    bg: "bg-amber-500/10",
    button: "bg-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.45)]",
  },
}

export function VibeCodingSection() {
  return (
    <section id="vibe-coding" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Vibe Coding"
          zh="氛围编程"
          title={
            <>
              From an idea to the{" "}
              <span
                className="text-transparent bg-clip-text animate-shimmer"
                style={{ backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent), #a78bfa, var(--primary))" }}
              >
                Chrome Web Store
              </span>
            </>
          }
          description={
            <>
              <p>
                {"Outside the game engine, I build with vibe coding. I describe what I want in plain language, pair with AI to write and refactor the code, and spend my own time on what actually matters: the idea, how it feels, testing it in a real browser, and polishing it until it's worth publishing."}
              </p>
              <p className="mt-4">
                {"It turns \"I wish this existed\" into a shipped tool in a fraction of the time. Three of them are live right now."}
              </p>
            </>
          }
        />

        {/* Process */}
        <div className="relative mb-28 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-accent/0 lg:block" />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 110}>
              <div className="group relative h-full rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Shipped extensions */}
        <div className="space-y-28">
          {extensions.map((ext, i) => {
            const accent = accents[ext.slug]
            const flip = i % 2 === 1
            return (
              <article key={ext.slug} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal variant={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                  <div className="mb-5 flex items-center gap-4">
                    {ext.icon ? (
                      <Image src={ext.icon} alt="" width={52} height={52} className="rounded-xl" />
                    ) : (
                      <div className={`flex h-[52px] w-[52px] items-center justify-center rounded-xl border ${accent.border} ${accent.bg}`}>
                        <span className={`h-3 w-3 rounded-full bg-current ${accent.text} animate-pulse-glow`} />
                      </div>
                    )}
                    <div>
                      <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${accent.text}`}>Chrome extension · 0{i + 1}</p>
                      <h3 className="text-2xl font-bold text-foreground md:text-3xl">{ext.name}</h3>
                    </div>
                  </div>
                  <p className={`mb-4 text-lg font-medium ${accent.text}`}>{ext.tagline}</p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{ext.description}</p>
                  <ul className="mb-8 space-y-2.5">
                    {ext.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${accent.bg} ${accent.text}`}>
                          <Check className="h-3 w-3" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ext.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all ${accent.button}`}
                  >
                    Get it on the Chrome Web Store
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Reveal>

                <Reveal variant="zoom" delay={150} className={flip ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div className={`pointer-events-none absolute -inset-6 rounded-[2rem] ${accent.bg} blur-3xl`} />
                    <div className="relative">
                      <ExtensionVisual extension={ext} />
                    </div>
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

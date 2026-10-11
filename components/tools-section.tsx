import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AdBlockPreview, IndieRadarPreview, ScreenshotGallery, TabGrouperPreview } from "@/components/extension-previews"
import { extensions, type Extension } from "@/lib/projects"

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

export function ToolsSection() {
  return (
    <section id="tools" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 glow text-violet-500/[0.04]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Other tools"
          zh="其他工具"
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
            <p>
              {"I build Chrome extensions to solve my own problems. AdBlock Pro, AI Tab Grouper Pro and Indie Radar are live on the Chrome Web Store. I thought about what bothered me and realized we live in an era where we can solve our problems, so I began using AI-assisted tools to refactor the code, so I can focus on the UI and getting each tool live."}
            </p>
          }
        />

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
                    className={`btn-shine group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all ${accent.button}`}
                  >
                    Get it on the Chrome Web Store
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Reveal>

                <Reveal variant="zoom" delay={150} className={flip ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div className={`glow pointer-events-none absolute -inset-10 opacity-20 ${accent.text}`} />
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

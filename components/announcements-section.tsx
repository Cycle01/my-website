import { Megaphone } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Seal } from "@/components/chinese-decor"
import { announcements } from "@/lib/projects"

export function AnnouncementsSection() {
  return (
    <section id="news" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading kicker="Announcements" zh="公告" title="From the studio" align="center" />

        <div className="space-y-8">
          {announcements.map((post) => (
            <Reveal key={post.title}>
              <article className="relative rounded-3xl border border-primary/20 bg-card/70 p-8 backdrop-blur-sm md:p-10">
                <Seal text="心" size={44} className="absolute -right-3 -top-5 rotate-[8deg]" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{post.date}</p>
                    <h3 className="text-xl font-bold text-foreground md:text-2xl">{post.title}</h3>
                  </div>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">
                  {post.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-8 font-mono text-sm text-primary">— {post.signoff}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

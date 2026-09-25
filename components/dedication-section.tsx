import { Reveal } from "@/components/reveal"
import { FallingPetals, FretBorder, Lantern, PlumBranch, Seal } from "@/components/chinese-decor"

export function DedicationSection() {
  return (
    <section id="for-mom" className="relative overflow-hidden px-6 py-32" aria-labelledby="for-mom-title">
      {/* Night sky in red and ink */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0c0a] via-[#2a0d0b] to-background" />
      <div className="pointer-events-none absolute inset-0 starfield opacity-40 animate-twinkle" />
      <FretBorder id="fret-top" className="absolute left-0 right-0 top-4 text-accent/30" />
      <FretBorder id="fret-bottom" className="absolute bottom-4 left-0 right-0 rotate-180 text-accent/30" />

      {/* Moon */}
      <div className="pointer-events-none absolute right-[6%] top-10 h-24 w-24 rounded-full opacity-90 md:top-20 md:h-56 md:w-56 md:opacity-100 bg-[radial-gradient(circle_at_35%_35%,#fff8e6,#f3d9a4_60%,#d9b574)] animate-moon">
        <span className="absolute left-[30%] top-[40%] h-6 w-6 rounded-full bg-[#d9b574]/40" />
        <span className="absolute left-[58%] top-[25%] h-4 w-4 rounded-full bg-[#d9b574]/30" />
        <span className="absolute left-[50%] top-[62%] h-8 w-8 rounded-full bg-[#d9b574]/25" />
      </div>
      {/* Drifting clouds */}
      <div className="pointer-events-none absolute right-[2%] top-44 h-10 w-72 rounded-full bg-[#2a0d0b]/50 blur-xl animate-cloud md:top-64" />
      <div className="pointer-events-none absolute right-[18%] top-28 h-6 w-48 rounded-full bg-[#3a1512]/40 blur-xl animate-cloud" style={{ animationDelay: "-8s" }} />

      <PlumBranch className="absolute -left-6 top-8 w-[200px] opacity-80 md:top-10 md:w-[380px]" />
      <FallingPetals count={8} />

      <div className="pointer-events-none absolute left-[62%] top-0 hidden md:block">
        <Lantern glyph="家" size={40} string={40} delay={0.8} />
      </div>

      <div className="relative mx-auto max-w-4xl pt-28 text-center md:pt-20">
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">For Mom</span>
            <span lang="zh-Hans" className="font-brush text-lg leading-none text-primary">
              致妈妈
            </span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h2 id="for-mom-title" lang="zh-Hans" className="font-brush text-5xl leading-tight text-[#f7d36b] md:text-7xl" style={{ textShadow: "0 0 30px rgba(247,211,107,0.25)" }}>
            但愿人长久
            <br />
            千里共婵娟
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-xl text-lg italic leading-relaxed text-foreground/80">
            {"\"May we both stay well, and share the same bright moon, even a thousand miles apart.\""}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Su Shi, 1076</p>
        </Reveal>

        <Reveal delay={450}>
          <div className="relative mx-auto mt-14 max-w-2xl rounded-3xl border border-accent/20 bg-background/40 p-8 text-left backdrop-blur-md md:p-10">
            <Seal text="平安" size={52} className="absolute -right-4 -top-6 rotate-[10deg]" />
            <p className="mb-4 leading-relaxed text-foreground/90">
              {"My mom is spending a year in China. The red lanterns, the gold and the plum blossoms on this page are for her, a small way to keep her close while she's far away."}
            </p>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {"Plum blossoms flower in the middle of winter, which feels right. Whenever I update this site, I think of her looking up at the same moon from the other side of the world."}
            </p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span lang="zh-Hans" className="font-brush text-3xl text-primary">
                妈妈，一路平安
              </span>
              <span className="text-sm text-muted-foreground">Safe travels, Mom. See you when you're home.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

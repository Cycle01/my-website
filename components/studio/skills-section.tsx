import { alsoShipping, skillGroups, skillsFocus, skillsInUse, skillsIntro, type Skill } from "@/lib/studio"

function SkillList({ skills }: { skills: Skill[] }) {
  return (
    <ul className="gap-x-10 sm:columns-2">
      {skills.map((s) => (
        <li key={s.name} className="group relative mb-5 break-inside-avoid pl-4">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.35rem] h-5 w-px origin-top bg-foreground/20 transition-colors duration-300 group-hover:bg-[color:var(--accent)]"
          />
          <p className="text-[19px] font-medium leading-snug tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-0.5">{s.name}</p>
          {s.note && <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{s.note}</p>}
        </li>
      ))}
    </ul>
  )
}

function Row({ title, summary, skills, index }: { title: string; summary?: string; skills: Skill[]; index: number }) {
  return (
    <div data-sr style={{ ["--d" as string]: Math.min(index, 3) * 60 }} className="grid grid-cols-1 gap-4 border-t border-[color:var(--border)] py-8 md:grid-cols-[10.5rem_1fr] md:gap-8 md:py-10">
      <h3 className="s-label pt-1.5 text-foreground/80">{title}</h3>
      <div>
        {summary && <p className="mb-6 max-w-xl text-[16px] leading-relaxed text-foreground/80">{summary}</p>}
        <SkillList skills={skills} />
      </div>
    </div>
  )
}

/**
 * Skills, rebuilt as structured text: the studio's own working summary beside
 * grouped lists, then the existing project images shown where they were used.
 */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-4 pt-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <h2 id="skills-title" data-sr className="s-serif s-h2">
          Skills
        </h2>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {skillsIntro.map((t, i) => (
                <p key={t} data-sr style={{ ["--d" as string]: i * 80 }} className="mb-5 text-[clamp(1.3rem,1.9vw,1.65rem)] leading-[1.28] tracking-[-0.02em] text-foreground/90">
                  {t}
                </p>
              ))}
              <p data-sr style={{ ["--d" as string]: 160 }} className="mt-8 border-l-2 border-[color:var(--accent)] pl-4 text-[16px] leading-relaxed text-foreground/80">
                {skillsFocus}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {skillGroups.map((g, i) => (
              <Row key={g.id} title={g.title} summary={g.summary} skills={g.skills} index={i} />
            ))}
            <Row title="Also shipping with" skills={alsoShipping} index={skillGroups.length} />
            <div className="border-t border-[color:var(--border)]" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p data-sr className="s-label">
            Used in
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillsInUse.map((p, i) => (
              <li key={p.title} data-sr style={{ ["--d" as string]: (i % 3) * 90 }}>
                <figure className="s-card p-2.5">
                  <div className="s-frame" style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <figcaption className="px-1.5 pb-1.5 pt-4">
                    <p className="text-[18px] font-medium tracking-[-0.02em]">{p.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{p.tags.join(" · ")}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

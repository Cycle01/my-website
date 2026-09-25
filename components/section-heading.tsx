import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

interface SectionHeadingProps {
  kicker: string
  /** Chinese label shown in brush script next to the kicker. */
  zh: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  tone?: "primary" | "accent"
}

export function SectionHeading({ kicker, zh, title, description, align = "left", tone = "primary" }: SectionHeadingProps) {
  const toneText = tone === "primary" ? "text-primary" : "text-accent"
  const toneLine = tone === "primary" ? "bg-primary/30" : "bg-accent/30"
  const centered = align === "center"

  return (
    <Reveal className={`mb-16 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <div className={`mb-6 flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        {centered && <span className={`h-px w-8 ${toneLine}`} />}
        <span className={`font-mono text-xs uppercase tracking-[0.3em] ${toneText}`}>{kicker}</span>
        <span lang="zh-Hans" className="font-brush text-lg leading-none text-accent/70">
          {zh}
        </span>
        <span className={`heading-line h-px ${centered ? "w-8" : "max-w-[100px] flex-1"} ${toneLine}`} />
      </div>
      <h2 className="text-3xl font-bold leading-[1.1] text-foreground text-balance md:text-5xl">{title}</h2>
      {description && <div className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</div>}
    </Reveal>
  )
}

import { Instrument_Serif } from "next/font/google"
import "./studio.css"
import { AmbientBackground } from "@/components/studio/ambient-background"
import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { GameMarquee } from "@/components/studio/game-marquee"
import { GamesShowcase } from "@/components/studio/games-showcase"
import { StillsReel } from "@/components/studio/stills-reel"
import { SkillsSection } from "@/components/studio/skills-section"
import { StudioIntro } from "@/components/studio/studio-intro"
import { StudioContact } from "@/components/studio/studio-contact"
import { StudioMotion } from "@/components/studio/studio-motion"
import { HashRedirect } from "@/components/studio/hash-redirect"

// Loaded here rather than in the root layout, so only the studio page pays for it.
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument-serif", display: "swap" })

export default function StudioPage() {
  return (
    <div id="studio-root" className={`studio-theme relative min-h-screen ${serif.variable}`}>
      <HashRedirect />
      <StudioMotion />
      <AmbientBackground />
      <a href="#games" className="sr-only z-[80] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to games
      </a>
      <StudioNav />
      <main className="relative z-10">
        <StudioHero />
        <GameMarquee />
        <GamesShowcase />
        <StillsReel />
        <SkillsSection />
        <StudioIntro />
      </main>
      <StudioContact />
    </div>
  )
}

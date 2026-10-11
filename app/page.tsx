import "./studio.css"
import { AmbientBackground } from "@/components/studio/ambient-background"
import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { GamesShowcase } from "@/components/studio/games-showcase"
import { StillsGallery } from "@/components/studio/stills-gallery"
import { SkillsSection } from "@/components/studio/skills-section"
import { StudioIntro } from "@/components/studio/studio-intro"
import { StudioContact } from "@/components/studio/studio-contact"
import { StudioMotion } from "@/components/studio/studio-motion"
import { HashRedirect } from "@/components/studio/hash-redirect"

export default function StudioPage() {
  return (
    <div id="studio-root" className="studio-theme relative min-h-screen">
      <HashRedirect />
      <StudioMotion />
      <AmbientBackground />
      <a href="#games" className="sr-only z-[80] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to games
      </a>
      <StudioNav />
      <main className="relative z-10">
        <StudioHero />
        <GamesShowcase />
        <StillsGallery />
        <SkillsSection />
        <StudioIntro />
      </main>
      <StudioContact />
    </div>
  )
}

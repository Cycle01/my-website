import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Marquee } from "@/components/marquee"
import { AboutSection } from "@/components/about-section"
import { SundownSpotlight } from "@/components/sundown-spotlight"
import { AnnouncementsSection } from "@/components/announcements-section"
import { ProjectsSection } from "@/components/projects-section"
import { FlingItSection } from "@/components/fling-it-section"
import { VibeCodingSection } from "@/components/vibe-coding-section"
import { ArchiveSection } from "@/components/archive-section"
import { SkillsSection } from "@/components/skills-section"
import { DedicationSection } from "@/components/dedication-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"

export default function HomePage() {
  return (
    <main>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <AnnouncementsSection />
      <SundownSpotlight />
      <ProjectsSection />
      <FlingItSection />
      <VibeCodingSection />
      <ArchiveSection />
      <SkillsSection />
      <DedicationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

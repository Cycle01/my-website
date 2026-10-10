import type { Metadata } from "next"
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
import { DedicationSection } from "@/components/dedication-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"

export const metadata: Metadata = {
  title: "Cycle's Studio - Cycle01 Game Dev Portfolio",
  description:
    "Cycle01 is the solo indie developer behind Cycle's Studio: horror games in Unreal Engine 5, the mobile game Fling It, and vibe-coded Chrome extensions. Now building Secrets of Sundown 2.",
}

export default function PortfolioPage() {
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
      <DedicationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

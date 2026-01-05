import { HeroSection } from "@/components/home/hero-section"
import { StatsGrid } from "@/components/home/stats-grid"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsGrid />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}

import { PersonalStory } from "@/components/about/personal-story"
import { EducationTimeline } from "@/components/about/education-timeline"
import { SkillsSnapshot } from "@/components/about/skills-snapshot"
import { LanguagesSection } from "@/components/about/languages-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Soumyakanta Bera",
  description:
    "Learn about my journey in finance, risk management, and data analytics. MSc student with M&A experience.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <PersonalStory />
            <SkillsSnapshot />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <EducationTimeline />
            <LanguagesSection />
          </div>
        </div>
      </div>
    </div>
  )
}

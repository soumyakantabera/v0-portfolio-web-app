import { DealPipeline } from "@/components/experience/deal-pipeline"
import { ExperienceCard } from "@/components/experience/experience-card"
import { DeliverablesGrid } from "@/components/experience/deliverables-grid"
import { FormulaShowcase } from "@/components/experience/formula-showcase"
import { experiences } from "@/lib/data/experience"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deal Room | Soumyakanta Bera",
  description: "M&A experience and corporate finance deliverables. Target screening, due diligence, and KPI reporting.",
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">The Deal Room</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A behind-the-scenes look at my M&A experience. From target screening to due diligence, explore the deal
            pipeline I&apos;ve contributed to.
          </p>

          {/* Sketch annotation */}
          <div
            className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="font-sketch text-accent text-lg">Where finance meets execution</span>
          </div>
        </div>

        {/* Deal Pipeline */}
        <DealPipeline />

        {/* Experience Card */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Experience</h2>
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>

        {/* Deliverables */}
        <DeliverablesGrid />

        {/* Formula Showcase */}
        <FormulaShowcase />
      </div>
    </div>
  )
}

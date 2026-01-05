import { BadgeWall } from "@/components/certifications/badge-wall"
import { LearningArc } from "@/components/certifications/learning-arc"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certifications | Soumyakanta Bera",
  description:
    "Professional certifications in Machine Learning, Data Analytics, and Data Science from DeepLearning.AI, Google, and IBM.",
}

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Certifications</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of professional certifications demonstrating my commitment to continuous learning in finance,
            data science, and machine learning.
          </p>

          {/* Sketch annotation */}
          <div
            className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="font-sketch text-accent text-lg">Always learning, always growing</span>
          </div>
        </div>

        {/* Learning Arc */}
        <LearningArc />

        {/* Badge Wall */}
        <BadgeWall />
      </div>
    </div>
  )
}

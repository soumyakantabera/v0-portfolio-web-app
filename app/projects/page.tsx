import { ProjectsGrid } from "@/components/projects/projects-grid"
import { TechStackOverview } from "@/components/projects/tech-stack-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Soumyakanta Bera",
  description:
    "Portfolio of finance and analytics projects including DCF valuation, KPI dashboards, and time series forecasting.",
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of finance and analytics projects showcasing my skills in valuation, data visualization, and
            quantitative modeling.
          </p>

          {/* Sketch annotation */}
          <div
            className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="font-sketch text-accent text-lg">From spreadsheets to sophisticated models</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ProjectsGrid />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TechStackOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

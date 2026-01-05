import { DCFCalculator } from "@/components/calculators/dcf-calculator"
import { VaRSimulator } from "@/components/calculators/var-simulator"
import { ForecastPlayground } from "@/components/calculators/forecast-playground"
import { ScenarioToolkit } from "@/components/calculators/scenario-toolkit"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Risk Lab | Soumyakanta Bera",
  description:
    "Interactive financial calculators: DCF valuation, Value at Risk (VaR) simulation, scenario analysis, and time series forecasting.",
}

export default function RiskLabPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">The Risk Lab</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Interactive financial tools to explore valuation, risk measurement, and forecasting. Adjust parameters and
            see results in real-time.
          </p>

          {/* Sketch annotation */}
          <div
            className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="font-sketch text-accent text-lg">Where theory meets practice</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-8">
          <DCFCalculator />

          <ScenarioToolkit />

          <div className="grid lg:grid-cols-2 gap-8">
            <VaRSimulator />
            <div className="lg:col-span-1">
              <ForecastPlayground />
            </div>
          </div>
        </div>

        {/* Educational Note */}
        <div className="bg-muted/50 rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground mb-2">Educational Purpose</h3>
          <p className="text-sm text-muted-foreground">
            These tools are designed for educational and demonstration purposes. They use simplified models and
            assumptions. For actual financial analysis, please consult professional advisors and use industry-standard
            tools with proper data validation.
          </p>
        </div>
      </div>
    </div>
  )
}

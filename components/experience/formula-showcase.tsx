"use client"

import { TerminalSnippet } from "@/components/ui/terminal-snippet"

const formulas = [
  {
    title: "wacc.formula",
    code: `WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))

Where:
  E  = Market value of equity
  D  = Market value of debt
  V  = E + D (total firm value)
  Re = Cost of equity
  Rd = Cost of debt
  Tc = Corporate tax rate`,
  },
  {
    title: "dcf.formula",
    code: `Enterprise Value = Σ (FCFt / (1 + WACC)^t) + TV

Terminal Value (TV) = FCFn × (1 + g) / (WACC - g)

Where:
  FCF = Free Cash Flow
  g   = Perpetual growth rate
  n   = Forecast period`,
  },
  {
    title: "fcf.formula",
    code: `Free Cash Flow = EBIT × (1 - Tax Rate)
                  + Depreciation & Amortization
                  - Capital Expenditures
                  - Δ Net Working Capital`,
  },
]

export function FormulaShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">The Math Behind the Deals</h2>
        <p className="text-muted-foreground">Core valuation formulas I work with</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formulas.map((formula) => (
          <TerminalSnippet key={formula.title} title={formula.title} code={formula.code} />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, Info } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DCFInputs {
  revenue: number
  margin: number
  growthRate: number
  wacc: number
  terminalGrowth: number
  forecastYears: number
}

export function DCFCalculator() {
  const [inputs, setInputs] = useState<DCFInputs>({
    revenue: 100,
    margin: 15,
    growthRate: 10,
    wacc: 10,
    terminalGrowth: 2,
    forecastYears: 5,
  })

  const results = useMemo(() => {
    const { revenue, margin, growthRate, wacc, terminalGrowth, forecastYears } = inputs

    // Calculate projected FCF for each year
    const fcfProjections = []
    let currentRevenue = revenue
    let totalPV = 0

    for (let year = 1; year <= forecastYears; year++) {
      currentRevenue = currentRevenue * (1 + growthRate / 100)
      const fcf = currentRevenue * (margin / 100)
      const discountFactor = Math.pow(1 + wacc / 100, year)
      const pvFCF = fcf / discountFactor

      fcfProjections.push({
        year: `Year ${year}`,
        fcf: Math.round(fcf * 10) / 10,
        pvFCF: Math.round(pvFCF * 10) / 10,
      })

      totalPV += pvFCF
    }

    // Terminal Value
    const lastFCF = fcfProjections[fcfProjections.length - 1].fcf
    const terminalValue = (lastFCF * (1 + terminalGrowth / 100)) / (wacc / 100 - terminalGrowth / 100)
    const pvTerminalValue = terminalValue / Math.pow(1 + wacc / 100, forecastYears)

    const enterpriseValue = totalPV + pvTerminalValue

    return {
      fcfProjections,
      terminalValue: Math.round(terminalValue),
      pvTerminalValue: Math.round(pvTerminalValue),
      pvFCF: Math.round(totalPV),
      enterpriseValue: Math.round(enterpriseValue),
    }
  }, [inputs])

  const updateInput = (key: keyof DCFInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-lg border border-border p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">DCF Quick Valuation</h3>
            <p className="text-sm text-muted-foreground">Discounted Cash Flow Analysis</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Calculate enterprise value using projected free cash flows discounted at WACC.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="revenue">Base Revenue ($M)</Label>
              <span className="text-sm text-muted-foreground">${inputs.revenue}M</span>
            </div>
            <Slider
              id="revenue"
              min={10}
              max={500}
              step={10}
              value={[inputs.revenue]}
              onValueChange={([v]) => updateInput("revenue", v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="margin">FCF Margin (%)</Label>
              <span className="text-sm text-muted-foreground">{inputs.margin}%</span>
            </div>
            <Slider
              id="margin"
              min={5}
              max={40}
              step={1}
              value={[inputs.margin]}
              onValueChange={([v]) => updateInput("margin", v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="growth">Revenue Growth (%)</Label>
              <span className="text-sm text-muted-foreground">{inputs.growthRate}%</span>
            </div>
            <Slider
              id="growth"
              min={0}
              max={30}
              step={1}
              value={[inputs.growthRate]}
              onValueChange={([v]) => updateInput("growthRate", v)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wacc">WACC (%)</Label>
              <Input
                id="wacc"
                type="number"
                min={5}
                max={20}
                step={0.5}
                value={inputs.wacc}
                onChange={(e) => updateInput("wacc", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terminalGrowth">Terminal Growth (%)</Label>
              <Input
                id="terminalGrowth"
                type="number"
                min={0}
                max={4}
                step={0.5}
                value={inputs.terminalGrowth}
                onChange={(e) => updateInput("terminalGrowth", Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Chart */}
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.fcfProjections}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="fcf" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} name="FCF" />
                <Line
                  type="monotone"
                  dataKey="pvFCF"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  name="PV of FCF"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">PV of FCF</p>
              <p className="text-lg font-bold text-foreground">${results.pvFCF}M</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">PV of Terminal</p>
              <p className="text-lg font-bold text-foreground">${results.pvTerminalValue}M</p>
            </div>
          </div>

          {/* Enterprise Value */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enterprise Value</p>
                <p className="text-2xl font-bold text-primary">${results.enterpriseValue}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/50" />
            </div>
          </div>

          {/* Sketch annotation */}
          <div className="font-sketch text-accent text-sm" style={{ transform: "rotate(-1deg)" }}>
            Adjust inputs to see real-time valuation changes
          </div>
        </div>
      </div>
    </motion.div>
  )
}

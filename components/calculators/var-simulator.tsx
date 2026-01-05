"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw, Info } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell } from "recharts"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Box-Muller transform for normal distribution
function randomNormal(): number {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export function VaRSimulator() {
  const [portfolioValue, setPortfolioValue] = useState(1000000)
  const [volatility, setVolatility] = useState(20)
  const [confidenceLevel, setConfidenceLevel] = useState(95)
  const [simulations, setSimulations] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runSimulation = () => {
    setIsRunning(true)

    // Simulate portfolio returns using Monte Carlo
    const numSimulations = 1000
    const dailyVolatility = volatility / 100 / Math.sqrt(252)
    const returns: number[] = []

    for (let i = 0; i < numSimulations; i++) {
      const dailyReturn = randomNormal() * dailyVolatility
      returns.push(portfolioValue * dailyReturn)
    }

    returns.sort((a, b) => a - b)
    setSimulations(returns)
    setIsRunning(false)
  }

  const results = useMemo(() => {
    if (simulations.length === 0) return null

    const sortedReturns = [...simulations].sort((a, b) => a - b)
    const varIndex = Math.floor(((100 - confidenceLevel) / 100) * sortedReturns.length)
    const var95 = sortedReturns[varIndex]

    // Create histogram data
    const binCount = 30
    const min = Math.min(...sortedReturns)
    const max = Math.max(...sortedReturns)
    const binWidth = (max - min) / binCount

    const histogram = Array(binCount)
      .fill(0)
      .map((_, i) => ({
        range: Math.round((min + i * binWidth) / 1000),
        count: 0,
        isVaR: min + i * binWidth <= var95,
      }))

    sortedReturns.forEach((value) => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1)
      histogram[binIndex].count++
    })

    return {
      var: Math.abs(Math.round(var95)),
      varPercentage: Math.abs((var95 / portfolioValue) * 100).toFixed(2),
      expectedShortfall: Math.abs(
        Math.round(sortedReturns.slice(0, varIndex).reduce((a, b) => a + b, 0) / varIndex || 0),
      ),
      histogram,
      varThreshold: Math.round(var95 / 1000),
    }
  }, [simulations, confidenceLevel, portfolioValue])

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
          <div className="p-2 rounded-md bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">VaR / Risk Snapshot</h3>
            <p className="text-sm text-muted-foreground">Monte Carlo Simulation</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Value at Risk (VaR) estimates the maximum potential loss at a given confidence level.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Portfolio Value</Label>
              <span className="text-sm text-muted-foreground">${(portfolioValue / 1000000).toFixed(1)}M</span>
            </div>
            <Slider
              min={100000}
              max={10000000}
              step={100000}
              value={[portfolioValue]}
              onValueChange={([v]) => setPortfolioValue(v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Annual Volatility (%)</Label>
              <span className="text-sm text-muted-foreground">{volatility}%</span>
            </div>
            <Slider min={5} max={50} step={1} value={[volatility]} onValueChange={([v]) => setVolatility(v)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Confidence Level</Label>
              <span className="text-sm text-muted-foreground">{confidenceLevel}%</span>
            </div>
            <Slider
              min={90}
              max={99}
              step={1}
              value={[confidenceLevel]}
              onValueChange={([v]) => setConfidenceLevel(v)}
            />
          </div>

          <Button onClick={runSimulation} disabled={isRunning} className="w-full">
            <RefreshCw className={`mr-2 h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Running..." : "Run Simulation (1,000 trials)"}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results ? (
            <>
              {/* Histogram */}
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.histogram}>
                    <XAxis
                      dataKey="range"
                      tick={{ fontSize: 9 }}
                      stroke="var(--muted-foreground)"
                      tickFormatter={(v) => `${v}k`}
                    />
                    <YAxis tick={{ fontSize: 9 }} stroke="var(--muted-foreground)" />
                    <ReferenceLine x={results.varThreshold} stroke="var(--destructive)" strokeDasharray="3 3" />
                    <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                      {results.histogram.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isVaR ? "var(--destructive)" : "var(--primary)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-xs text-muted-foreground">{confidenceLevel}% VaR (1-day)</p>
                  <p className="text-lg font-bold text-destructive">${results.var.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{results.varPercentage}% of portfolio</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Expected Shortfall</p>
                  <p className="text-lg font-bold text-foreground">${results.expectedShortfall.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Avg loss beyond VaR</p>
                </div>
              </div>

              {/* Sketch annotation */}
              <div className="font-sketch text-accent text-sm" style={{ transform: "rotate(-1deg)" }}>
                Red area = worst {100 - confidenceLevel}% of outcomes
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Click Run Simulation to see results</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

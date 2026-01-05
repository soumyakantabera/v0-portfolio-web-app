"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Settings2,
  Info,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScenarioVariable {
  id: string
  name: string
  baseValue: number
  pessimistic: number
  optimistic: number
  unit: string
}

interface GuidedStep {
  step: number
  title: string
  description: string
  isComplete: boolean
}

const defaultVariables: ScenarioVariable[] = [
  { id: "revenue", name: "Revenue Growth", baseValue: 10, pessimistic: 5, optimistic: 15, unit: "%" },
  { id: "cogs", name: "COGS Margin", baseValue: 60, pessimistic: 65, optimistic: 55, unit: "%" },
  { id: "opex", name: "OpEx Growth", baseValue: 8, pessimistic: 12, optimistic: 5, unit: "%" },
  { id: "wacc", name: "WACC", baseValue: 10, pessimistic: 12, optimistic: 8, unit: "%" },
  { id: "terminal", name: "Terminal Growth", baseValue: 2, pessimistic: 1, optimistic: 3, unit: "%" },
]

const guidedSteps: GuidedStep[] = [
  {
    step: 1,
    title: "Define Variables",
    description: "Add or edit the key drivers that impact your model",
    isComplete: false,
  },
  {
    step: 2,
    title: "Set Scenarios",
    description: "Define pessimistic and optimistic values for each variable",
    isComplete: false,
  },
  {
    step: 3,
    title: "Analyze Impact",
    description: "Review the tornado chart to understand sensitivity",
    isComplete: false,
  },
  {
    step: 4,
    title: "Draw Conclusions",
    description: "Identify which variables have the highest impact",
    isComplete: false,
  },
]

export function ScenarioToolkit() {
  const [variables, setVariables] = useState<ScenarioVariable[]>(defaultVariables)
  const [baseOutput, setBaseOutput] = useState(1000000) // Base enterprise value
  const [currentStep, setCurrentStep] = useState(1)
  const [showGuide, setShowGuide] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Calculate sensitivity for tornado chart
  const sensitivityData = useMemo(() => {
    return variables
      .map((variable) => {
        // Simplified sensitivity calculation (in real model would be more complex)
        const sensitivityFactor = variable.name.includes("Revenue")
          ? 2.5
          : variable.name.includes("WACC")
            ? -1.8
            : variable.name.includes("Terminal")
              ? 1.5
              : variable.name.includes("COGS")
                ? -1.2
                : -0.8

        const pessimisticImpact =
          (((variable.pessimistic - variable.baseValue) / variable.baseValue) * sensitivityFactor * baseOutput) / 10
        const optimisticImpact =
          (((variable.optimistic - variable.baseValue) / variable.baseValue) * sensitivityFactor * baseOutput) / 10

        return {
          name: variable.name,
          pessimistic: Math.round(pessimisticImpact),
          optimistic: Math.round(optimisticImpact),
          range: Math.abs(optimisticImpact - pessimisticImpact),
        }
      })
      .sort((a, b) => b.range - a.range)
  }, [variables, baseOutput])

  const handleVariableChange = (id: string, field: keyof ScenarioVariable, value: string | number) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [field]:
                typeof value === "string" && field !== "name" && field !== "unit"
                  ? Number.parseFloat(value) || 0
                  : value,
            }
          : v,
      ),
    )
  }

  const addVariable = () => {
    const newId = `var-${Date.now()}`
    setVariables((prev) => [
      ...prev,
      {
        id: newId,
        name: "New Variable",
        baseValue: 0,
        pessimistic: 0,
        optimistic: 0,
        unit: "%",
      },
    ])
    setEditingId(newId)
  }

  const removeVariable = (id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id))
  }

  const completeStep = (step: number) => {
    if (step < 4) setCurrentStep(step + 1)
  }

  // Calculate scenario outcomes
  const scenarioOutcomes = useMemo(() => {
    const pessimisticTotal = sensitivityData.reduce((sum, d) => sum + d.pessimistic, 0)
    const optimisticTotal = sensitivityData.reduce((sum, d) => sum + d.optimistic, 0)

    return {
      pessimistic: baseOutput + pessimisticTotal,
      base: baseOutput,
      optimistic: baseOutput + optimisticTotal,
    }
  }, [sensitivityData, baseOutput])

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
          <div className="p-2 rounded-md bg-accent/10">
            <Settings2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Scenario & Sensitivity Toolkit</h3>
            <p className="text-sm text-muted-foreground">What-if analysis with tornado charts</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Analyze how changes in key variables affect your output. Edit the table to see impact in real-time.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Guided Steps Toggle */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
      >
        <Lightbulb className="h-4 w-4" />
        <span>Guided Walkthrough</span>
        {showGuide ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Guided Steps */}
      {showGuide && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="grid grid-cols-4 gap-2"
        >
          {guidedSteps.map((step) => (
            <button
              key={step.step}
              onClick={() => setCurrentStep(step.step)}
              className={`p-3 rounded-lg border text-left transition-all ${
                currentStep === step.step
                  ? "border-accent bg-accent/10"
                  : currentStep > step.step
                    ? "border-chart-2 bg-chart-2/10"
                    : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep > step.step ? "bg-chart-2 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.step ? "✓" : step.step}
                </span>
                <span className="text-xs font-medium text-foreground">{step.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{step.description}</p>
            </button>
          ))}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editable Variables Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Model Variables</Label>
            <Button variant="outline" size="sm" onClick={addVariable}>
              <Plus className="h-3 w-3 mr-1" />
              Add Variable
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Variable</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Base</th>
                  <th className="px-3 py-2 text-center font-medium text-red-500">Pessimistic</th>
                  <th className="px-3 py-2 text-center font-medium text-green-500">Optimistic</th>
                  <th className="px-3 py-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {variables.map((variable, index) => (
                  <motion.tr
                    key={variable.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-border hover:bg-muted/50"
                  >
                    <td className="px-3 py-2">
                      {editingId === variable.id ? (
                        <Input
                          value={variable.name}
                          onChange={(e) => handleVariableChange(variable.id, "name", e.target.value)}
                          onBlur={() => setEditingId(null)}
                          className="h-7 text-xs"
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => setEditingId(variable.id)}
                          className="text-left hover:text-accent transition-colors"
                        >
                          {variable.name}
                          <span className="text-muted-foreground ml-1">({variable.unit})</span>
                        </button>
                      )}
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        type="number"
                        value={variable.baseValue}
                        onChange={(e) => handleVariableChange(variable.id, "baseValue", e.target.value)}
                        className="h-7 text-xs text-center"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        type="number"
                        value={variable.pessimistic}
                        onChange={(e) => handleVariableChange(variable.id, "pessimistic", e.target.value)}
                        className="h-7 text-xs text-center border-red-200 focus:border-red-500"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        type="number"
                        value={variable.optimistic}
                        onChange={(e) => handleVariableChange(variable.id, "optimistic", e.target.value)}
                        className="h-7 text-xs text-center border-green-200 focus:border-green-500"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <button
                        onClick={() => removeVariable(variable.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Base Output Setting */}
          <div className="space-y-2">
            <Label className="text-sm">Base Enterprise Value ($)</Label>
            <Input
              type="number"
              value={baseOutput}
              onChange={(e) => setBaseOutput(Number.parseFloat(e.target.value) || 0)}
              className="font-mono"
            />
          </div>

          {currentStep === 1 && (
            <Button onClick={() => completeStep(1)} className="w-full" size="sm">
              Continue to Set Scenarios
            </Button>
          )}
        </div>

        {/* Tornado Chart & Results */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Sensitivity Analysis (Tornado Chart)</Label>

          {/* Tornado Chart */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sensitivityData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <XAxis
                  type="number"
                  tick={{ fontSize: 10 }}
                  stroke="var(--muted-foreground)"
                  tickFormatter={(v) => `${v >= 0 ? "+" : ""}${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  stroke="var(--muted-foreground)"
                  width={75}
                />
                <RechartsTooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="pessimistic" stackId="a" fill="var(--destructive)" radius={[4, 0, 0, 4]} />
                <Bar dataKey="optimistic" stackId="a" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scenario Outcomes */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingDown className="h-3 w-3 text-destructive" />
                <p className="text-xs text-muted-foreground">Pessimistic</p>
              </div>
              <p className="text-sm font-bold text-destructive">${(scenarioOutcomes.pessimistic / 1000).toFixed(0)}k</p>
            </div>
            <div className="p-3 bg-muted rounded-lg border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertCircle className="h-3 w-3 text-foreground" />
                <p className="text-xs text-muted-foreground">Base Case</p>
              </div>
              <p className="text-sm font-bold text-foreground">${(scenarioOutcomes.base / 1000).toFixed(0)}k</p>
            </div>
            <div className="p-3 bg-chart-2/10 rounded-lg border border-chart-2/20 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-chart-2" />
                <p className="text-xs text-muted-foreground">Optimistic</p>
              </div>
              <p className="text-sm font-bold text-chart-2">${(scenarioOutcomes.optimistic / 1000).toFixed(0)}k</p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">Key Insight</p>
                <p className="text-xs text-muted-foreground">
                  <strong>{sensitivityData[0]?.name}</strong> has the highest impact on valuation. A change from{" "}
                  {variables.find((v) => v.name === sensitivityData[0]?.name)?.pessimistic || 0}% to{" "}
                  {variables.find((v) => v.name === sensitivityData[0]?.name)?.optimistic || 0}% swings the output by{" "}
                  <strong>${Math.abs(sensitivityData[0]?.range / 1000).toFixed(0)}k</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Sketch annotation */}
          <div className="font-sketch text-accent text-sm" style={{ transform: "rotate(-1deg)" }}>
            Longer bars = higher sensitivity to that variable
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Info, RefreshCw } from "lucide-react"
import { Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Area, ComposedChart } from "recharts"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Generate sample time series data
function generateSampleData(trend: number, seasonality: number, noise: number) {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 0; i < 24; i++) {
    const trendValue = 100 + trend * i
    const seasonalValue = seasonality * Math.sin((i * Math.PI) / 6)
    const noiseValue = (Math.random() - 0.5) * noise * 2
    data.push({
      month: `${months[i % 12]} ${Math.floor(i / 12) + 23}`,
      actual: Math.round(trendValue + seasonalValue + noiseValue),
      isHistorical: true,
    })
  }

  return data
}

// Simple linear regression
function linearRegression(data: { x: number; y: number }[]) {
  const n = data.length
  const sumX = data.reduce((a, b) => a + b.x, 0)
  const sumY = data.reduce((a, b) => a + b.y, 0)
  const sumXY = data.reduce((a, b) => a + b.x * b.y, 0)
  const sumXX = data.reduce((a, b) => a + b.x * b.x, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  return { slope, intercept }
}

export function ForecastPlayground() {
  const [mode, setMode] = useState<"regression" | "timeseries">("regression")
  const [trend, setTrend] = useState(2)
  const [seasonality, setSeasonality] = useState(15)
  const [noise, setNoise] = useState(10)
  const [forecastPeriods, setForecastPeriods] = useState(6)
  const [refreshKey, setRefreshKey] = useState(0)

  const { data, forecast, metrics } = useMemo(() => {
    const historical = generateSampleData(trend, seasonality, noise)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Prepare regression data
    const regressionData = historical.map((d, i) => ({ x: i, y: d.actual }))
    const { slope, intercept } = linearRegression(regressionData)

    // Generate forecast
    const forecastData = []
    const lastIndex = historical.length

    for (let i = 0; i < forecastPeriods; i++) {
      const idx = lastIndex + i
      let forecastValue: number

      if (mode === "regression") {
        forecastValue = intercept + slope * idx
      } else {
        // Simple time series with trend + seasonality
        forecastValue = intercept + slope * idx + seasonality * Math.sin((idx * Math.PI) / 6)
      }

      // Confidence interval
      const uncertainty = noise * Math.sqrt(i + 1) * 0.5

      forecastData.push({
        month: `${months[(lastIndex + i) % 12]} ${Math.floor((lastIndex + i) / 12) + 23}`,
        forecast: Math.round(forecastValue),
        upper: Math.round(forecastValue + uncertainty * 2),
        lower: Math.round(forecastValue - uncertainty * 2),
        isHistorical: false,
      })
    }

    // Calculate metrics (using last 6 months as validation)
    const validation = historical.slice(-6)
    const predictions = validation.map((_, i) => intercept + slope * (historical.length - 6 + i))
    const mae = validation.reduce((sum, d, i) => sum + Math.abs(d.actual - predictions[i]), 0) / 6
    const mse = validation.reduce((sum, d, i) => sum + Math.pow(d.actual - predictions[i], 2), 0) / 6

    return {
      data: [...historical, ...forecastData],
      forecast: forecastData,
      metrics: {
        mae: Math.round(mae * 10) / 10,
        mse: Math.round(mse),
        rmse: Math.round(Math.sqrt(mse) * 10) / 10,
      },
    }
  }, [trend, seasonality, noise, forecastPeriods, mode, refreshKey])

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
          <div className="p-2 rounded-md bg-chart-2/10">
            <TrendingUp className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Forecast Playground</h3>
            <p className="text-sm text-muted-foreground">Regression & Time Series</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Experiment with trend, seasonality, and noise to see how forecasting models behave.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="ghost" size="icon" onClick={() => setRefreshKey((k) => k + 1)}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mode Toggle */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regression">Regression</TabsTrigger>
          <TabsTrigger value="timeseries">Time Series</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Trend Strength</Label>
              <span className="text-sm text-muted-foreground">{trend}</span>
            </div>
            <Slider min={0} max={10} step={0.5} value={[trend]} onValueChange={([v]) => setTrend(v)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Seasonality Amplitude</Label>
              <span className="text-sm text-muted-foreground">{seasonality}</span>
            </div>
            <Slider min={0} max={30} step={1} value={[seasonality]} onValueChange={([v]) => setSeasonality(v)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Noise Level</Label>
              <span className="text-sm text-muted-foreground">{noise}</span>
            </div>
            <Slider min={0} max={30} step={1} value={[noise]} onValueChange={([v]) => setNoise(v)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Forecast Periods</Label>
              <span className="text-sm text-muted-foreground">{forecastPeriods} months</span>
            </div>
            <Slider
              min={3}
              max={12}
              step={1}
              value={[forecastPeriods]}
              onValueChange={([v]) => setForecastPeriods(v)}
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">MAE</p>
              <p className="font-bold text-foreground">{metrics.mae}</p>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">MSE</p>
              <p className="font-bold text-foreground">{metrics.mse}</p>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">RMSE</p>
              <p className="font-bold text-foreground">{metrics.rmse}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="var(--muted-foreground)" interval={5} />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                {/* Confidence interval */}
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="transparent"
                  fill="var(--chart-2)"
                  fillOpacity={0.1}
                  connectNulls={false}
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="transparent"
                  fill="var(--background)"
                  fillOpacity={1}
                  connectNulls={false}
                />
                {/* Historical data */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  connectNulls={false}
                />
                {/* Forecast */}
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary" />
              <span className="text-muted-foreground">Historical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-chart-2 border-dashed border-t border-chart-2" />
              <span className="text-muted-foreground">Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-2/10 rounded" />
              <span className="text-muted-foreground">95% CI</span>
            </div>
          </div>

          {/* Sketch annotation */}
          <div className="font-sketch text-accent text-sm" style={{ transform: "rotate(-1deg)" }}>
            {mode === "regression" ? "Linear trend extrapolation" : "Capturing seasonal patterns"}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

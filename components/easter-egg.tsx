"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedKeys, setTypedKeys] = useState("")

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newTyped = (typedKeys + e.key).slice(-3).toUpperCase()
      setTypedKeys(newTyped)

      if (newTyped === "DCF") {
        setIsVisible(true)
        setTypedKeys("")
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [typedKeys])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.9, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-card border-2 border-border rounded-lg p-6 shadow-lg sketch-border"
          >
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h3 className="font-bold text-lg text-foreground">DCF Quick Tips!</h3>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="font-sketch text-xl text-foreground">You found the secret DCF cheat sheet!</p>

                <div className="bg-muted p-3 rounded-md font-mono text-xs">
                  <p className="text-foreground">Enterprise Value =</p>
                  <p className="ml-2">Σ FCF / (1 + WACC)^t</p>
                  <p className="ml-2">+ Terminal Value / (1 + WACC)^n</p>
                </div>

                <ul className="space-y-2 list-disc list-inside">
                  <li>WACC = weighted average of debt & equity costs</li>
                  <li>Terminal growth should be ≤ GDP growth (2-3%)</li>
                  <li>Always run sensitivity analysis on key assumptions</li>
                  <li>FCF = EBIT(1-t) + D&A - CapEx - ΔNWC</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Tip: Visit the Risk Lab to try the interactive DCF calculator!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

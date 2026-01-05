"use client"

import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TerminalSnippetProps {
  title: string
  code: string
  className?: string
}

export function TerminalSnippet({ title, code, className }: TerminalSnippetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("bg-foreground rounded-lg overflow-hidden", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-foreground/90 border-b border-background/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-chart-4/70" />
            <div className="w-3 h-3 rounded-full bg-chart-2/70" />
          </div>
          <span className="text-xs text-background/70 font-mono">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-background/50 hover:text-background/80 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 text-sm font-mono text-background/90 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </motion.div>
  )
}

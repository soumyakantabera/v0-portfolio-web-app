import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { EasterEgg } from "@/components/easter-egg"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })

export const metadata: Metadata = {
  title: "Soumyakanta Bera | Finance & Risk + Analytics + AI",
  description:
    "MSc Finance & Risk Management student with M&A experience. Specializing in financial modeling, FP&A, dashboards, and quantitative analysis.",
  keywords: ["Finance", "Risk Management", "M&A", "FP&A", "Data Analytics", "Python", "Power BI", "DCF", "Valuation"],
  authors: [{ name: "Soumyakanta Bera" }],
  openGraph: {
    title: "Soumyakanta Bera | Finance & Risk + Analytics + AI",
    description: "MSc Finance & Risk Management student with M&A experience.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_caveat.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen paper-bg flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <EasterEgg />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

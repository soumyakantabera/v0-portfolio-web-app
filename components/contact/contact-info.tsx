"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/data/profile"
import { withBasePath } from "@/lib/basePath"

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: profile.linkedin,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="bg-card rounded-lg border border-border p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Get in Touch</h3>

        <div className="space-y-3">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {method.href ? (
                <a
                  href={method.href}
                  target={method.label === "LinkedIn" ? "_blank" : undefined}
                  rel={method.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <method.icon className="h-5 w-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{method.label}</p>
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {method.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <method.icon className="h-5 w-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{method.label}</p>
                    <p className="text-sm text-foreground truncate">{method.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Download CV */}
      <Button asChild className="w-full bg-transparent" variant="outline">
        <a href={withBasePath("/resume.pdf")} download>
          <Download className="mr-2 h-4 w-4" />
          Download CV
        </a>
      </Button>

      {/* Open to Work Stamp */}
      <motion.div
        initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
        whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="p-6 border-2 border-dashed border-accent/50 rounded-lg bg-accent/5 text-center"
      >
        <span className="font-sketch text-2xl text-accent">Open to Opportunities!</span>
        <p className="text-sm text-muted-foreground mt-2">{profile.objective}</p>
      </motion.div>
    </div>
  )
}

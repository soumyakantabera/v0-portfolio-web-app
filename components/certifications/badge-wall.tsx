"use client"

import { BadgeCard } from "@/components/ui/badge-card"
import { certifications } from "@/lib/data/certifications"

export function BadgeWall() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
        <p className="text-muted-foreground">Professional credentials and completed courses</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <BadgeCard
            key={cert.id}
            name={cert.name}
            issuer={cert.issuer}
            icon={cert.icon}
            category={cert.category}
            description={cert.description}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

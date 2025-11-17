"use client"

import { Card } from "@/components/ui/card"
import { Job } from "./status-summary"


interface StatusSummaryProps {
  jobs: any
}

export default function JobsCardStatusSummary({ jobs }: StatusSummaryProps) {


  const summaryItems = [
    { label: "Pending", count: jobs?.pending || 0, color: "bg-gray-200 dark:bg-gray-800" },
    { label: "In Progress", count: jobs?.in_progress || 0, color: "bg-blue-100 dark:bg-blue-900" },
    { label: "Completed", count: jobs?.completed || 0, color: "bg-orange-100 dark:bg-orange-900" },
    { label: "Approved", count: jobs?.approved || 0, color: "bg-green-100 dark:bg-green-900" },
    { label: "Needs Rework", count: jobs?.rework || 0, color: "bg-red-100 dark:bg-red-900" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-[1%]">
      {summaryItems?.map((item) => (
        <Card key={item.label} className={`p-4 ${item.color}`}>
          <p className="text-xs font-medium text-muted-foreground mb-1">{item.label}</p>
          <p className="text-2xl font-bold text-foreground">{item.count}</p>
        </Card>
      ))}
    </div>
  )
}

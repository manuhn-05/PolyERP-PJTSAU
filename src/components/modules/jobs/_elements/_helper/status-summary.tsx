"use client"

import { Card } from "@/components/ui/card"

export interface Job {
    id: string
    jobType: string
    workerName: string
    skillType: string
    assignedDate: string
    completedTime: string | null
    duration: string | null
    status: "Pending" | "In Progress" | "Completed" | "Approved" | "Needs Rework"
  }
  

interface StatusSummaryProps {
  jobs: Job[]
}

export default function StatusSummary({ jobs }: StatusSummaryProps) {
  const counts = {
    pending: jobs.filter((j) => j.status === "Pending").length,
    inProgress: jobs.filter((j) => j.status === "In Progress").length,
    completed: jobs.filter((j) => j.status === "Completed").length,
    approved: jobs.filter((j) => j.status === "Approved").length,
    rework: jobs.filter((j) => j.status === "Needs Rework").length,
  }

  const summaryItems = [
    { label: "Pending", count: counts.pending, color: "bg-gray-100 dark:bg-gray-800" },
    { label: "In Progress", count: counts.inProgress, color: "bg-blue-100 dark:bg-blue-900" },
    { label: "Completed", count: counts.completed, color: "bg-orange-100 dark:bg-orange-900" },
    { label: "Approved", count: counts.approved, color: "bg-green-100 dark:bg-green-900" },
    { label: "Needs Rework", count: counts.rework, color: "bg-red-100 dark:bg-red-900" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {summaryItems.map((item) => (
        <Card key={item.label} className={`p-4 ${item.color}`}>
          <p className="text-xs font-medium text-muted-foreground mb-1">{item.label}</p>
          <p className="text-2xl font-bold text-foreground">{item.count}</p>
        </Card>
      ))}
    </div>
  )
}

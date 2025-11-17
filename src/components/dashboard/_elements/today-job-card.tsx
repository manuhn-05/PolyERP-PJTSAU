import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, Loader2 } from "lucide-react"

export type JobStatus = "pending" | "in-progress" | "completed"

export type JobCardType = {
  id: string
  title: string
  startAt: Date
  status: JobStatus
}

function getStatusConfig(status: JobStatus) {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        // using theme token (yellow)
        colorVar: "--color-chart-4",
        message: "Waiting to Begin",
        Icon: Clock,
      }
    case "in-progress":
      return {
        label: "In-Progress",
        // using theme token (blue)
        colorVar: "--color-chart-3",
        message: "Ongoing",
        Icon: Loader2,
      }
    case "completed":
      return {
        label: "Completed",
        // using theme token (green/teal)
        colorVar: "--color-chart-2",
        message: "Well Done",
        Icon: CheckCircle2,
      }
  }
}

export function DashboardJobCard({ job, className }: { job: JobCardType; className?: string }) {
    const getStatusInfo = (status: string) => {
        switch (status.toLowerCase()) {
          case "pending":
            return { label: "Pending ", color: "text-yellow-600 dark:text-yellow-400", Icon: Clock };
          case "in_progress":
            return { label: "In Progress", color: "text-blue-600 dark:text-blue-400", Icon: Loader2 };
          case "completed":
            return { label: "Completed", color: "text-green-600 dark:text-green-400" , Icon: CheckCircle2 };
          default:
            return { label: status, color: "text-gray-600 dark:text-gray-300" };
        }
      };
    
      const { label, color, Icon } = getStatusInfo(job.status);
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        "border border-border rounded-lg",
        className,
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-pretty">{job.title}</CardTitle>

          {/* Status badge uses token color via CSS var */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium w-[40%]" 
            aria-label={`Status: ${label}`}
            role="status"
          >
            {/* <Icon className={statusIconClasses} aria-hidden="true" /> */}
            <span className={`${color}`}>{label} </span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="sr-only">Start Date and Time: </span>
          {job.startAt.toLocaleString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{job.title}</p>
      </CardContent>
    </Card>
  )
}
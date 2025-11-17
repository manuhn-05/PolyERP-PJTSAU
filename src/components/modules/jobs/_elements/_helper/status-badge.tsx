"use client";



interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
   const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      case "in progress":
        return "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
         case "in_progress":
        return "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "approved":
        return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "needs_rework":
        return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium hover:scale-110 duration-100 ease-in-out ${getStatusStyles(status)}`}>
      {`${status}`.split("_").join(" ")}
    </span>
  )
}

import React from "react";

type Props = {
  title: string;
  status: "pending" | "inprogress" | "completed" | string;
  start_date: string;
  className?: string;
};

const JobCard = ({ title, status, start_date, className = "" }: Props) => {
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { label: "Pending ⏳", color: "text-yellow-600 dark:text-yellow-400" };
      case "in_progress":
        return { label: "In Progress 🚀", color: "text-blue-600 dark:text-blue-400" };
      case "completed":
        return { label: "Completed ✅", color: "text-green-600 dark:text-green-400" };
      default:
        return { label: status, color: "text-gray-600 dark:text-gray-300" };
    }
  };

  const { label, color } = getStatusInfo(status);

  return (
    <div
      className={`w-full p-[2%] border bg-[#F6F7F8] dark:bg-[#1B2B40] dark:text-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-3 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h5 className="text-[1em] font-semibold flex items-center gap-2 w-full">
          📋 {title}
        </h5>
        <span className={`text-[0.8em] font-medium px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-700 ${color} w-[35%]`}>
          {label}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-600" />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <span className="flex items-center gap-1">
          🗓 <strong>Start:</strong> {start_date}
        </span>
        {status.toLowerCase() === "completed" && <span>🎯 Well Done!</span>}
        {status.toLowerCase() === "in_progress" && <span>💪 Keep Going!</span>}
        {status.toLowerCase() === "pending" && <span>🕒 Waiting to Begin</span>}
      </div>
    </div>
  );
};

export default JobCard;

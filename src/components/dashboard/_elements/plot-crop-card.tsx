import React from "react";

interface FertilizerDetails {
  date_of_application: string;
  type: string;
  quantity_kg: number;
  remarks: string;
}

interface WateringDetails {
  last_watering: string;
  frequency: string;
  method: string;
  remarks: string;
}

interface CropDetails {
  plot_name: string;
  crop: string;
  seed_date: string;
  age_in_days: number;
  health_status: string;
  fertilizer_applied: boolean;
  fertilizer_details?: FertilizerDetails | null;
  watering_details?: WateringDetails | null;
}

interface Props {
  data: CropDetails;
}

const PlotCropCard: React.FC<Props> = ({ data }) => {
  const {
    plot_name,
    crop,
    seed_date,
    age_in_days,
    health_status,
    fertilizer_applied,
    fertilizer_details,
    watering_details,
  } = data;

  return (
    <div className="bg-white dark:bg-[#27466B] shadow-md rounded-2xl p-4 border border-gray-200 dark:border-gray-700 w-full md:w-[350px] hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
        {plot_name || "Unknown Plot"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Crop: <span className="font-medium">{crop || "N/A"}</span>
      </p>

      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <p>🌱 <strong>Age:</strong> {age_in_days ?? "N/A"} days</p>
        <p>📅 <strong>Seed Date:</strong> {seed_date || "N/A"}</p>
        <p>
          💚 <strong>Health:</strong>{" "}
          <span
            className={`font-medium ${
              health_status === "Excellent"
                ? "text-green-600"
                : health_status === "Good"
                ? "text-lime-600"
                : health_status === "Healthy"
                ? "text-emerald-600"
                : health_status === "Moderate"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {health_status || "Unknown"}
          </span>
        </p>
      </div>

      <hr className="my-3 border-gray-300 dark:border-gray-200" />

      {/* Fertilizer Section */}
      <div className="text-sm">
        <p className="font-semibold mb-1">🧪 Fertilizer:</p>
        {fertilizer_applied ? (
          fertilizer_details ? (
            <ul className="ml-3 list-disc space-y-1 text-gray-600 dark:text-gray-300">
              <li>Date: {fertilizer_details.date_of_application || "N/A"}</li>
              <li>Type: {fertilizer_details.type || "N/A"}</li>
              <li>Qty: {fertilizer_details.quantity_kg ?? "N/A"} kg</li>
              <li>Remarks: {fertilizer_details.remarks || "No remarks"}</li>
            </ul>
          ) : (
            <p className="text-gray-500 italic ml-3">Details not available</p>
          )
        ) : (
          <p className="text-gray-500 ml-3">Not Applied</p>
        )}
      </div>

      <hr className="my-3 border-gray-300 dark:border-gray-200" />

      {/* Watering Section */}
      <div className="text-sm">
        <p className="font-semibold mb-1">💧 Watering:</p>
        {watering_details ? (
          <ul className="ml-3 list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Last: {watering_details.last_watering || "N/A"}</li>
            <li>Method: {watering_details.method || "N/A"}</li>
            <li>Frequency: {watering_details.frequency || "N/A"}</li>
            <li>Remarks: {watering_details.remarks || "No remarks"}</li>
          </ul>
        ) : (
          <p className="text-gray-500 ml-3">No watering info available</p>
        )}
      </div>
    </div>
  );
};

export default PlotCropCard;

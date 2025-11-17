// types.ts
export type SensorThreshold = [number, number] | null;

export interface DeviceType {
  _id: string;
  device_id: number | string;
  device_name: string;
  type: string;
  ec?: SensorThreshold;
  moisture?: SensorThreshold;
  nitrogen?: SensorThreshold;
  ph?: SensorThreshold;
  phosphorous?: SensorThreshold;
  potassium?: SensorThreshold;
  salinity?: SensorThreshold;
  temperature?: SensorThreshold;
  polyhouse_id?: string;
}

import React from "react";

interface DeviceCardProps {
  device: DeviceType;
}

const parameterLabels: Record<string, string> = {
  ec: "EC",
  moisture: "Moisture",
  nitrogen: "Nitrogen",
  ph: "pH",
  phosphorous: "Phosphorous",
  potassium: "Potassium",
  salinity: "Salinity",
  temperature: "Temperature",
};

const units: Record<string, string> = {
  temperature: "°C",
  moisture: "%",
  nitrogen: "mg/kg",
  phosphorous: "mg/kg",
  potassium: "mg/kg",
  salinity: "g/kg",
  ec: "dS/m",
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {device.device_name}{" "}
          <span className="text-sm text-gray-500 dark:text-gray-200">#{device.device_id}</span>
        </h2>
        <p className="text-sm text-gray-500 capitalize dark:text-white">{(device.type).split("_").join(" ")}</p>
      </div>

      <div className="grid grid-cols-1 gap-y-2 text-sm">
        {Object?.keys(parameterLabels).map((key) => {
          const value = device[key as keyof DeviceType] as [number, number] | null;
          if (!value || !Array.isArray(value)) return null;

          const [min, max] = value;
          const unit = units[key] ? ` ${units[key]}` : "";

          return (
            <div key={key} className="flex justify-between text-gray-700 dark:text-white">
              <span className="font-medium">{parameterLabels[key]}:</span>
              <span>
                {min} - {max}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceCard;

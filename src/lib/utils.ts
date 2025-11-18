import { Statistics } from "@/components/modules/sensors/_components/sensor-statistics";
import { USER_TYPE_TEXTS } from "@/constants/auth-consts";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// utils.ts (or keep at the top of the same file, above your component)
export function flattenRowData(row: any): Record<string, any> {
  if (!row || typeof row !== "object") return {};
  const flattened: Record<string, any> = {};

  Object.entries(row).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Merge child keys directly into top-level
      Object.entries(value).forEach(([childKey, childValue]) => {
        flattened[childKey] = childValue;
      });
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
}

/*
* @description - Add days to a date
* @param startDate - The starting date as a string in YYYY-MM-DD format.
* @param daysToAdd - The number of days to add to the starting date.
* @returns The new date in YYYY-MM-DD format.
*/
export function addDaysToDate(startDate : string, daysToAdd = 0) {
  if (!startDate) return ""; // return empty if invalid
  const actual_date = new Date(startDate);
  if (isNaN(actual_date.getTime())) return ""; // handle invalid date

  if (typeof daysToAdd !== "number" || isNaN(daysToAdd)) daysToAdd = 0;

  const date = new Date(startDate);
  date.setDate(date.getDate() + daysToAdd);

  return date.toISOString().split("T")[0];
}


export const SkillTypeLists = [
  {
      id: "skilled",
      label: "Skilled",
      value: "skilled",
  },
  {
      id: "semi_skilled",
      label: "Semi Skilled",
      value: "semi_skilled",
  },
  {
      id: "un_skilled",
      label: "Un Skilled",
      value: "unskilled",
  },
];

export const APPROXIMATE_TIME_TO_COMPLETE = [
  {
      id: "time-1",
      label: "1 Hour",
      value: 1
  },
  {
      id: "time-2",
      label: "2 Hours",
      value: 2
  },
  {
      id: "time-3",
      label: "3 Hours",
      value: 3
  },
  {
      id: "time-4",
      label: "4 Hours",
      value: 4
  },
  {
      id: "time-5",
      label: "5 Hours",
      value: 5
  },
  {
      id: "time-6",
      label: "6 Hours",
      value: 6
  },
  {
      id: "time-7",
      label: "7 Hours",
      value: 7
  },
  {
      id: "time-8",
      label: "8 Hours",
      value: 8
  },
  {
      id: "time-9",
      label: "9 Hours",
      value: 9
  },
  {
      id: "time-10",
      label: "10 Hours",
      value: 10
  }
]


type ValidationConfig = {
  min?: number;
  max?: number;
  regex?: string;
};

type FormField = {
  key: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select";
  required?: boolean;
  validation?: ValidationConfig;
};

export const buildZodSchema = (fields: any[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let validator: any;

    // Base validator based on type
    switch (field.type) {
      case "text":
      case "email":
        validator = z.string();
        if (field.type === "email") {
          validator = validator.email(`${field.label} must be a valid email`);
        }
        break;

      case "number":
        validator = z.preprocess(
          (val) => (val === "" ? undefined : Number(val)),
          z.number({
            message: `${field.label} must be a number`,
          })
        );
        break;

      case "date":
        validator = z.string();
        break;

      case "select":
        validator = z.string();
        break;

      default:
        validator = z.any();
    }

    // ✅ Apply "required" only if field.required === true
    if (field.required) {
      if (["text", "email", "date", "select"].includes(field.type)) {
        validator = validator.nonempty(`${field.label} is required`);
      } else {
        validator = validator.refine(
          (val: any) => val !== undefined && val !== null,
          { message: `${field.label} is required` }
        );
      }
    } else {
      // If NOT required, make it optional
      validator = validator.optional();
    }

    // ✅ Apply extra validation rules (if provided)
    if (field.validation?.min)
      validator = validator.min(
        field.validation.min,
        `${field.label} too small/short`
      );

    if (field.validation?.max)
      validator = validator.max(
        field.validation.max,
        `${field.label} too large/long`
      );

    if (field.validation?.regex)
      validator = validator.regex(
        new RegExp(field.validation.regex),
        `${field.label} invalid`
      );

    shape[field.key] = validator;
  });

  return z.object(shape);
};




export function getUserAccessLevels(access: Array<any>, pathname: string, user_type: string) {
  const OWNER_ACCESS = {
    create: true,
    delete: true,
    read: true,
    update: true,
  };

  //  Case 1: Owner always gets full access
  if (user_type === USER_TYPE_TEXTS.OWNER) {
    return OWNER_ACCESS;
  }

  //  Case 2: Admin checks
  // todo - Add check for manager also
  if (user_type === USER_TYPE_TEXTS.ADMIN) {
    if (!Array.isArray(access) || access.length === 0) {
      return false;
    }

    const access_module = access.find((mod: any) => mod.path === pathname);
    if (!access_module) return false;
    return access_module.isSelected ? access_module.subAccessLevel : false;
  }

  //  Case 3: Unknown user type → safely return false
  return false;
}



export function meanMaxMinCalculator(key : string, data : Array<any>): Statistics{

  const meanvalue = (data.reduce((acc, item) => acc + (item[key] || 0), 0) / data.length).toFixed(2);
  const maxvalue = (Math.max(...data.map(item => item[key] || 0))).toFixed(2);
  const minvalue = (Math.min(...data.map(item => item[key] || 0))).toFixed(2);
  return {
    meanValue: Number(meanvalue),
    maxValue: Number(maxvalue),
    minValue: Number(minvalue),
    
  }
}

type SensorThresholdInput = {
  installation_date: string;
  sensor_name: string;
  sensor_type: string;
  status: string;
  [key: string]: any;
};

export function convertSensorDataForBackend(
  frontendData: SensorThresholdInput[],
  deviceId: number,
  deviceName: string,
  deviceType: string,
) {
  const backendData: any = {
    device_name: deviceName,
    device_id: Number(deviceId),
    type: deviceType,
    polyhouse_id : frontendData?.[0]?.polyhouse_id
    // Add Plot ID to each sensor
    // plot_id: Number(frontendData[0].plot_id),
  };


  frontendData.forEach((item) => {
    // Loop through each key in the item
    Object.keys(item).forEach((key) => {
      if (key.endsWith("_min")) {
        const baseKey = key.replace("_min", "");
        const maxKey = `${baseKey}_max`;

        // Convert both min and max to numbers
        const min = Number(item[key]);
        const max = Number(item[maxKey]);

        // Create array [min, max]
        backendData[baseKey] = [min, max];
      }
    });
  });


  return backendData;
}

export function dateToExactReadbleTime(date: string) {
  const dt = new Date(date);
  if (isNaN(dt.getTime())) return "-";
  return dt.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });
}

export type SensorChartOptions = {
  dataLabel: string;
  xAxisTitle: string;
  yAxisTitle: string;
  xKey: string;
  yKey: string;
  dataList: any[];
  min: number;
  max: number;
  crossLines: {
    range: [number, number];
    fill: string;
    stroke: string;
    strokeWidth: number;
  }[];
};
export const calculateRangesForChartOptions = (
  sensorData: any[],
  sensorKey: string,
  label: string
): SensorChartOptions => {
 

  const mins = sensorData.map(d => d[sensorKey]?.[0]).filter((v: number) => v != null);
  const maxs = sensorData.map(d => d[sensorKey]?.[1]).filter((v: number) => v != null);

  // Prevent Infinity crashes when no valid data found
  if (!mins.length || !maxs.length) {
    return {
      dataLabel: label,
      xAxisTitle: "Time",
      yAxisTitle: label,
      xKey: "time",
      yKey: sensorKey,
      dataList: [],
      min: 0,
      max: 0,
      crossLines: [],
    };
  }

  const globalMin = Math.min(...mins);
  const globalMax = Math.max(...maxs);

  const avgMin = mins.reduce((a: number, b: number) => a + b, 0) / mins.length;
  const avgMax = maxs.reduce((a: number, b: number) => a + b, 0) / maxs.length;

  // Base min always starts at 0
  let min = 0;
  let max = globalMax +100 ;


  // Special case for temperature
  if (sensorKey === "temperature" ||sensorKey === "moisture") {
    max = Math.min(max, 100);
  }
  if (sensorKey === "ec") {
    max = Math.min(max, 3);
  }
  if (sensorKey === "ph") {
    max = Math.min(max, 14);
  }

  if (sensorKey === "salinity") {
    // max = Math.min(max, 14);
        // todo : add max value for salinity the actual one instead of 1000
        max = 1000;
  }
  return {
    dataLabel: label,
    xAxisTitle: "Time",
    yAxisTitle: label,
    xKey: "time",
    yKey: sensorKey,
    dataList: [],
    min,
    max,
    crossLines: [
      { range: [min, Math.floor(avgMin)], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [Math.floor(avgMin), Math.ceil(avgMax)], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [Math.ceil(avgMax), max], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
    ],
  };
};


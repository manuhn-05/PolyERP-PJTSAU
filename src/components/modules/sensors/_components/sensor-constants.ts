import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { BsMoisture } from "react-icons/bs";
import { MdOutlineCo2 } from "react-icons/md";
import { CiLight } from "react-icons/ci";


export const DUMMY_PLOTS_DATA={
    "polyhouse_id": "PH-001",
    "location": "Pune, India",
    "plots": [
      {
        "plot_id": "P-01",
        "crop": "Tomato",
        "ideal_conditions": {
          "temperature_c": { "min": 10, "max": 40 },
          "humidity_percent": { "min": 60, "max": 80 },
          "soil_moisture_percent": { "min": 25, "max": 35 },
          "co2_ppm": { "min": 300, "max": 1000 },
          "light_lux": { "min": 15000, "max": 25000 }
        },
        "current_readings": {
          "temperature_c": 27.2,
          "humidity_percent": 74,
          "soil_moisture_percent": 28,
          "co2_ppm": 920,
          "light_lux": 21000,
          "last_updated": "2025-09-26T08:45:00Z"
        }
      },
      {
        "plot_id": "P-02",
        "crop": "Cucumber",
        "ideal_conditions": {
          "temperature_c": { "min": 12, "max": 35 },
          "humidity_percent": { "min": 70, "max": 90 },
          "soil_moisture_percent": { "min": 30, "max": 40 },
          "co2_ppm": { "min": 350, "max": 1200 },
          "light_lux": { "min": 12000, "max": 20000 }
        },
        "current_readings": {
          "temperature_c": 28.5,
          "humidity_percent": 88,
          "soil_moisture_percent": 34,
          "co2_ppm": 1050,
          "light_lux": 17500,
          "last_updated": "2025-09-26T08:50:00Z"
        }
      },
      {
        "plot_id": "P-03",
        "crop": "Capsicum",
        "ideal_conditions": {
          "temperature_c": { "min": 10, "max": 32 },
          "humidity_percent": { "min": 65, "max": 85 },
          "soil_moisture_percent": { "min": 25, "max": 35 },
          "co2_ppm": { "min": 400, "max": 1000 },
          "light_lux": { "min": 14000, "max": 22000 }
        },
        "current_readings": {
          "temperature_c": 26.0,
          "humidity_percent": 80,
          "soil_moisture_percent": 31,
          "co2_ppm": 880,
          "light_lux": 18000,
          "last_updated": "2025-09-26T08:52:00Z"
        }
      },
      {
        "plot_id": "P-04",
        "crop": "Lettuce",
        "ideal_conditions": {
          "temperature_c": { "min": 15, "max": 30 },
          "humidity_percent": { "min": 50, "max": 70 },
          "soil_moisture_percent": { "min": 20, "max": 30 },
          "co2_ppm": { "min": 300, "max": 800 },
          "light_lux": { "min": 10000, "max": 18000 }
        },
        "current_readings": {
          "temperature_c": 23.1,
          "humidity_percent": 65,
          "soil_moisture_percent": 29,
          "co2_ppm": 600,
          "light_lux": 15000,
          "last_updated": "2025-09-26T08:55:00Z"
        }
      }
    ]
  }
  
  export const SENSOR_ICONS= {
    temperature : FaTemperatureHigh,
    humidity : WiHumidity,
    moisture : BsMoisture,
    co2 : MdOutlineCo2,
    light : CiLight,
  }
  
  const temperatureSensorChartOptions = {
    dataLabel:"Temperature",
    xAxisTitle:"Time",
    yAxisTitle:"Temperature (°C)",
    xKey:"time",
    yKey:"temperature",
    dataList:[],
    min:0,
    max:50,
    crossLines:[
      { range: [0, 15], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [15, 35], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [35, 50], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
    ]
  };
  const moistureSensorChartOptions = {
    dataLabel:"Moisture",
    xAxisTitle:"Time",
    yAxisTitle:"Moisture (%)",
    xKey:"time",
    yKey:"moisture",
    dataList:[],
    min:0,
    max:100,
    crossLines:[
      { range: [0, 20], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [20, 80], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [80, 100], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
    ]
  };
  const nitrogenSensorChartOptions = {
    dataLabel:"Nitrogen",
    xAxisTitle:"Time",
    yAxisTitle:"Nitrogen (ppm)",
    xKey:"time",
    yKey:"nitrogen",
    dataList:[],
    min:0,
    max:100,
    crossLines:[
      { range: [0, 20], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [20, 80], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [80, 100], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
    ]
  };
  const phosphorousSensorChartOptions = {
    dataLabel:"Phosphorous",
    xAxisTitle:"Time",
    yAxisTitle:"Phosphorous (ppm)",
    xKey:"time",
    yKey:"phosphorous",
    dataList:[],
    min:0,
    max:100,
    crossLines:[
      { range: [0, 30], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [30, 70], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [70, 100], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
    ]
  };
  const potassiumSensorChartOptions = {
    dataLabel:"Potassium",
    xAxisTitle:"Time",
    yAxisTitle:"Potassium (ppm)",
    xKey:"time",
    yKey:"potassium",
    dataList:[],
    min:0,
    max:200,
    crossLines:[
      { range: [0, 50], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [50, 250], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [250, 300], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
    ]
  };
  const phSensorChartOptions ={
    dataLabel:"pH",
    xAxisTitle:"Time",
    yAxisTitle:"pH",
    xKey:"time",
    yKey:"ph",
    dataList:[],
    min:0,
    max:14,
    crossLines:[
      { range: [0, 3.5], fill: "rgba(232, 47, 10, 0.2)", stroke: "orange", strokeWidth: 1 },
      { range: [3.5, 8], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [8, 14], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
    ]
  };
  const salinitySensorChartOptions = {
    dataLabel:"Salinity",
    xAxisTitle:"Time",
    yAxisTitle:"Salinity (μS/m)",
    xKey:"time",
    yKey:"salinity",
    dataList:[],
    min:0,
    max:1000,
    crossLines:[
      { range: [0, 300], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [300, 700], fill: "rgba(241, 210, 8, 0.2)", stroke: "orange", strokeWidth: 1 },
      { range: [700, 1000], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
    ]
  };
  const electricalConductivitySensorChartOptions = {
    dataLabel:"Electrical Conductivity",
    xAxisTitle:"Time",
    yAxisTitle:"EC (mS/cm)",
    xKey:"time",
    yKey:"ec",
    dataList:[],
    min:0,
    max:3,
    crossLines:[
      { range: [0, 0.5], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
      { range: [0.5, 1.5], fill: "rgba(0, 200, 0, 0.2)", stroke: "green", strokeWidth: 1 },
      { range: [1.5, 3.0], fill: "rgba(232, 47, 10, 0.2)", stroke: "red", strokeWidth: 1 },
    ]
  };




  export const SENSOR_OBJECT_EXCLUDE_KEYS= ["timestamp", "device_id", "_id"];

  export const SENSORS_KEYS=[ 'ec', 'moisture', 'nitrogen', 'ph', 'phosphorous', 'potassium', 'salinity', 'temperature',];

  export const SENSOR_SELECT_LIST = [
    {
      label:"Temperature",
      value:"temperature"
    },
    {
      label:"Moisture",
      value:"moisture"
    },
    {
      label:"Nitrogen",
      value:"nitrogen"
    },
    {
      label:"Phosphorous",
      value:"phosphorous"
    },
    {
      label:"pH",
      value:"ph"
    },
    {
      label:"Potassium",
      value:"potassium"
    },
    {
      label:"Salinity",
      value:"salinity"
    },
    {
      label:"Electrical Conductivity",
      value:"ec"
    
    }
  ]


  export function isSensorSelected(sensorKey: string) : boolean {
    return SENSOR_SELECT_LIST.find((sensor) => sensor.value === sensorKey) !== undefined;
  }



  const generate24HourLabels = () => {
    return Array.from({ length: 24 }, (_, i) =>
      `${i.toString().padStart(2, "0")}:00`
    );
  };
  
  export const HOURS_24 = generate24HourLabels();
  


 export const X_AXIS_24_HOUR_FORMAT = [
  "00:00", 
  "01:00", 
  "02:00", 
  "03:00", 
  "04:00", 
  "05:00", 
  "06:00", 
  "07:00", 
  "08:00", 
  "09:00", 
  "10:00", 
  "11:00", 
  "12:00", 
  "13:00", 
  "14:00", 
  "15:00", 
  "16:00", 
  "17:00", 
  "18:00", 
  "19:00", 
  "20:00", 
  "21:00", 
  "22:00", 
  "23:00", 
 ]

import { useAppSelector } from "@/data-handling/store/hooks/redux-hooks";
import { useMemo } from "react";
import useFetchSensnorsListData from "./sub/use-fetch-sensor-data";


export const useBoxScatteredChart = ({start_date, end_date}: {start_date: string, end_date: string}) => {
  const selectedPolyhouse = useAppSelector((state)=>state.polyhouse.selectedPolyhouse);
  const {soilData} = useFetchSensnorsListData({start_date, end_date, polyhouse_ids:[`"${selectedPolyhouse?.value}"`]});

  const chartData = useMemo(() => {
    if (!soilData?.length) return {};

    // List of all sensor keys
    const sensorKeys = [
      "temperature",
      "moisture",
      "ec",
      "nitrogen",
      "phosphorous",
      "potassium",
      "salinity",
      "ph",
    ];

    // Initialize structure
    const groupedBySensor: Record<string, any[]> = {};

    // For each sensor key, group readings by device_id
    sensorKeys.forEach((sensor) => {
      const grouped = soilData.reduce((acc: any, item: any) => {
        const deviceId = item.device_id;
        if (!acc[deviceId]) acc[deviceId] = [];
        acc[deviceId].push(item[sensor]);
        return acc;
      }, {});

      // Convert each group into Plotly trace with timestamp info
      const traces = Object.keys(grouped).map((deviceId) => {
        const deviceData = soilData.filter((item: any) => item.device_id == deviceId);
        const timestamps = deviceData.map((item: any) => {
          const date = new Date(item.timestamp);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        });
        
        return {
          y: grouped[deviceId],
          name: `Device ${deviceId}`,
          type: "box",
          boxpoints: "all",
          jitter: 0.5,
          pointpos: 0,
          marker: { size: 8, opacity: 0.7 },
          line: { width: 2 },
          text: timestamps,
          hovertemplate: `<b>Device ${deviceId}</b><br>` +
                        `Value: %{y}<br>` +
                        `Time: %{text}<br>` +
                        `<extra></extra>`,
        };
      });

      groupedBySensor[sensor] = traces;
    });

    return groupedBySensor;
  }, [soilData?.length, selectedPolyhouse?.value]);

  return { chartData };
};



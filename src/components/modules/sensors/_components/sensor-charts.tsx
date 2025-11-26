"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import {
  AgChartOptions,
  AgCartesianAxisOptions,
  AgLineSeriesOptions,
} from "ag-charts-community";
import { useTheme } from "next-themes";

type CrossLine = {
  range: [number, number];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

type SensorChartsProps = {
  xKey: string;
  yKey: string;
  dataLabel: string;
  xAxisTitle: string;
  yAxisTitle: string;
  dataList: Array<any>;
  min?: number;
  max?: number;
  crossLines?: CrossLine[];
};

const SensorCharts: React.FC<SensorChartsProps> = ({
  xKey,
  yKey,
  dataLabel,
  xAxisTitle,
  yAxisTitle,
  dataList,
  min,
  max,
  crossLines = [],
}) => {
  const [options, setOptions] = useState<AgChartOptions>({} as AgChartOptions);
  const theme = useTheme();

  useEffect(() => {
    if (!dataList || dataList?.length === 0) return;

    // ✅ Group by device_id
    const grouped = dataList.reduce((acc, curr) => {
      if (!acc[curr?.device_id]) acc[curr?.device_id] = [];
      acc[curr?.device_id].push(curr);
      return acc;
    }, {} as Record<number, any[]>);

    // Sort data chronologically per device
    Object.values(grouped).forEach((deviceData: any) => {
      deviceData.sort(
        (a: any, b: any) =>
          new Date(a[xKey]).getTime() - new Date(b[xKey]).getTime()
      );
    });

    // ✅ One line per device
    const series: AgLineSeriesOptions[] = Object.keys(grouped).map(
      (deviceId) => ({
        type: "line",
        data: grouped[Number(deviceId)],
        xKey,
        yKey,
        title: `Device ${deviceId}`,
        strokeWidth: 2.5,
        marker: { enabled: true, size: 8 },
        tooltip: {
          renderer: ({ datum }) => {
            const value = datum[yKey];
            const timeDisplay = datum.timeDisplay || datum[xKey];
            return {
              title: `Device ${datum.device_id}`,
              data: [
                { label: dataLabel, value: `${value?.toFixed(2) || "N/A"}` },
                { label: "Date", value: datum.dateDisplay },
                { label: "Time", value: timeDisplay },
              ],
            };
          },
        },
      })
    );

    const chartOptions: AgChartOptions = {
      theme: theme?.theme === "dark" ? "ag-default-dark" : "ag-default",
      background: { fill: theme.theme === "dark" ? "#121F31" : "#ffffff" },
      series,
      axes: [
        {
          position: "bottom",
          type: "time",
          title: { text: xAxisTitle },
          label: {
            formatter: ({ value }) => {
              const date = new Date(value);
              const timeString = date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });

              const dateString = date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              });

              return `${timeString}\n${dateString}`;
            },
            rotation: 315,
            fontSize: 12,
          },
        } as AgCartesianAxisOptions,
        {
          position: "left",
          type: "number",
          min,
          max,
          nice: false, // <--- stops Ag Charts from rounding the axis domain
          tick: {
            interval: {
              step: (() => {
                const range = (max ?? 0) - (min ?? 0);
                if (range <= 10) return 1;
                if (range <= 30) return 2;
                if (range <= 60) return 5;
                return 10;
              })(),
            },
          },
          title: { text: yAxisTitle },
          crossLines: crossLines.map((cl) => ({
            type: "range",
            range: cl.range,
            fill: cl.fill,
            stroke: cl.stroke,
            strokeWidth: cl.strokeWidth,
          })),
        },
      ] as AgCartesianAxisOptions[],
      legend: { enabled: true, position: "bottom" },
    };

    // ✅ Always create a *new* object reference to force update
    setOptions({ ...chartOptions });
  }, [
    xKey,
    yKey,
    dataLabel,
    xAxisTitle,
    yAxisTitle,
    dataList,
    min,
    max,
    crossLines,
    theme.theme,
  ]);

  // ✅ Use key to force re-render of chart if device set changes
  const chartKey =
    dataList && dataList.length
      ? Array.from(new Set(dataList.map((d) => d.device_id))).join("-")
      : "empty";

  return (
    <div className="w-full mb-[1%] bg-white dark:bg-[#121F31] rounded-lg overflow-hidden">
      <h3 className="text-lg font-bold text-[#122031] dark:text-white p-[1%] border-b border-[#e5e7eb] dark:border-gray-500">
        Soil {dataLabel}
      </h3>
      <AgCharts key={chartKey} options={options} />
    </div>
  );
};

export default SensorCharts;

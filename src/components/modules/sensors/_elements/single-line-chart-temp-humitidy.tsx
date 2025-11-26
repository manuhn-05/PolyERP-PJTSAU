"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


type Props = {
  chartData: any[];
  title: string;
  dataKey: string;
};

const SingleLineChartForAtmosphericValues = ({ chartData, dataKey, title }: Props) => {
  const { theme } = useTheme();

  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    data: [],
    series: [
      {
        type: "line",
        xKey: "timeDisplay",
        yKey: "value",
        strokeWidth: 2,
      },
    ],
  });


  
  useEffect(() => {
    if (!chartData || chartData.length === 0) return;
  
    const formattedData = chartData.map((item) => ({
      timeDisplay: item.timeDisplay,
      dateDisplay: item.dateDisplay,
      timestamp: new Date(item.time).getTime(),   // ⬅ REAL unique value for X-axis
      value: item[dataKey],
    }));
    

  
    const options: any = {
      data: formattedData,
      theme: theme === "dark" ? "ag-default-dark" : "ag-default",
      background: {
        fill: theme === "dark" ? "#121F31" : "#ffffff",
      },
      series: [
        {
          type: "line",
          xKey: "timestamp",
          yKey: "value",
          strokeWidth: 2,
          marker: { enabled: true, size: 8 },
          tooltip: {
            renderer: ({ datum }:any) => ({
              title: `${datum.dateDisplay} ${datum.timeDisplay}`,
              content: `<div><strong>Value:</strong> ${datum.value}</div>`,
            }),
          },
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "category",
          title: { text: "Time" },
          min: formattedData[0]?.timestamp,   // ⬅ ensures starts from zero relative to first point
          tick: {
            values: (() => {
              const ticks: number[] = [];
              const start = formattedData[0]?.timestamp;
              const end = formattedData[formattedData.length - 1]?.timestamp;

              let current = new Date(start);
              current.setHours(0, 0, 0, 0);

              while (current.getTime() <= end) {
                ticks.push(current.getTime());
                current.setDate(current.getDate() + 1);
              }

              return ticks;
            })(),
          },
          label: {
            formatter: ({ value }: any) => {
              const date = new Date(value);

              // Round time to the nearest hour
              const roundedDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getMinutes() >= 30 ? date.getHours() + 1 : date.getHours(),
                0,
                0,
                0
              );

              const timeString = roundedDate.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              const dateString = roundedDate.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              });

              return `${timeString}\n${dateString}`; // Multi-line label
            },
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontSize: 12,
            rotation: 315,
            minSpacing: 0,
          },
        },
        {
          position: "left",
          type: "number",
          title: { text: title },
          min: 0,                               // ⬅ Y Axis starts from 0 always
          label: { color: theme === "dark" ? "#ffffff" : "#000000" },
        },
      ],
      
      legend: { enabled: false },
    };
    
  
    setChartOptions(options);
  }, [chartData, dataKey, theme]);
  

  return (
 <Card className={`my-[1.5%]  shadow-lg`}>
<CardContent>

<div className="w-full mb-[1%] bg-white dark:bg-[#121F31] rounded-lg overflow-hidden">
      <h3 className="text-lg font-bold text-[#122031] dark:text-white p-[1%] border-b border-[#e5e7eb] dark:border-gray-500">
        {title}
      </h3>
      <AgCharts options={chartOptions} />
    </div>
</CardContent>

 </Card>
  );
};

export default SingleLineChartForAtmosphericValues;

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


  /*
  
  So The chart is finr plotting for today's data when we select the date for yester day or any prevvious daate plotting is not working. means
  the chart is not plotting the data for the last one but from API I am getting the data it's not auto scaling the data. and plotting the chart
  */

  useEffect(() => {
    if (!chartData || chartData.length === 0) return;
  
    const formattedData = chartData.map((item) => ({
      timeDisplay: item.timeDisplay,
      dateDisplay: item.dateDisplay,
      timestamp: new Date(item.time).getTime(),   // ⬅ REAL unique value for X-axis
      value: item[dataKey],
    }));
    

  
    const options: AgChartOptions = {
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
            renderer: ({ datum }) => ({
              title: `${datum.dateDisplay} ${datum.timeDisplay}`,
              content: `<div><strong>Value:</strong> ${datum.value}</div>`,
            }),
          },
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "number",
          title: { text: "Time" },
          min: formattedData[0]?.timestamp,   // ⬅ ensures starts from zero relative to first point
          label: {
            formatter: ({ value }) => {
              const date = new Date(value);
              const roundedDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getMinutes() >= 30 ? date.getHours() + 1 : date.getHours(),
                0,
                0,
                0
              );
              return roundedDate.toLocaleTimeString("en-IN", { hour: "numeric", hour12: true });
            },
            color: theme === "dark" ? "#ffffff" : "#000000",
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

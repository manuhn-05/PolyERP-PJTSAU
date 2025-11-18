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
      dateDisplay: item.dateDisplay,   // ⬅ include this field
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
          xKey: "timeDisplay",
          yKey: "value",
          strokeWidth: 2,
          marker: { enabled: true, size: 8 },
          tooltip: {
            renderer: ({ datum }) => {
              return {
                title: `Date: ${datum.dateDisplay}`,
                content: `
                  <div>
                    <div><strong>Value:</strong> ${datum.value}</div>
                    <div><strong>Date:</strong> ${datum.dateDisplay}</div>
                  </div>
                `,
              };
            },
          },
          
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "category",
          title: { text: "Time" },
          label: { color: theme === "dark" ? "#ffffff" : "#000000" },
        },
        {
          position: "left",
          type: "number",
          title: { text: title },
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

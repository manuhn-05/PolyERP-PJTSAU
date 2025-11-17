import React, { useMemo } from 'react';
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { useTheme } from 'next-themes';

type Props = {
  title: string;
  angleKey: string;
  legendItemKey: string;
  chartData: any[];
};

const PieChartComponent = ({ title, angleKey, legendItemKey, chartData }: Props) => {
  const theme = useTheme()
  const options: AgChartOptions = useMemo(() => ({
    data: chartData,
    theme : theme.theme === "dark" ? "ag-default-dark" : "ag-default",
    background: { fill: theme.theme === "dark" ? "#121F31" : "#ffffff" },
    
    title: { text: title },
    series: [
      {
        type: "pie",
        angleKey,        // numeric field
        legendItemKey,   // label field
      },
    ],
  }), [chartData, title, angleKey, legendItemKey, theme]);

  return <AgCharts  options={options} />;
};

export default PieChartComponent;

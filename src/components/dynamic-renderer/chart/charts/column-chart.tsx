import React from 'react';
import Chart from 'react-apexcharts'

type Props = {
  chartData : any[];
  customLegendItems?: Array<string>;
}

const DynamicColumnChartComponent = ({chartData, customLegendItems=["Actual", "Expected"]}: Props) => {
  return (
    <div>
       <Chart
       options={{
        chart: { type: "bar" },
        // plotOptions: { bar: { columnWidth: "30%" } },
        colors: ["#00E396"],
        dataLabels: { enabled: false },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: customLegendItems,
          markers: { fillColors: ["#00E396", "#775DD0"] },
        },
      }}
      series={chartData}
      type="bar"
      height={350}
      width={650}
       />
    </div>
  )
}

export default DynamicColumnChartComponent;
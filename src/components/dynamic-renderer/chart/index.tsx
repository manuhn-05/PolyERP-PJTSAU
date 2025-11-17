import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { buildChartSeries } from '@/utils/chart-data-creator';
import React from 'react';
import Chart from 'react-apexcharts';
import DynamicColumnChartComponent from '@/components/dynamic-renderer/chart/charts/column-chart';
type Props = {
  endpoint : string;
}

const ChartComponent = (props: Props) => {
  const {selectedPolyhouse} = useAppSelector((state) => state.polyhouse)
  const { data : listOfAssignedJobs} = useFetchDataAsPerEndpoint(`${selectedPolyhouse?.value}`,`jobs_allotment`);

  const chartData = buildChartSeries(listOfAssignedJobs?.data,{primaryKey   : `skill_type`, secondaryKey: `status`, } );


//  todo : Today Complete the chart component Dynamically
  return (
    <div className={`bg-white dark:bg-[#212B36] p-[1.5%]`}>
       {/* <Chart
       options={{
        chart: { type: "pie" },
        // plotOptions: { bar: { columnWidth: "30%" } },
        colors: ["#00E396"],
        dataLabels: { enabled: false },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Actual", "Expected"],
          markers: { fillColors: ["#00E396", "#775DD0"] },
        },
      }}
      series={chartData}
      type="bar"
      height={350}
      width={650}
       /> */}

{/* todo : Add Dynamic Column Chart Component */}
       {/* Chart Component Need Implementation */}

       {/* <DynamicColumnChartComponent chartData={chartData} /> */}
    </div>
  )
}

export default ChartComponent
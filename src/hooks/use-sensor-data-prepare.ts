import useFetchSensnorsListData from "@/hooks/sub/use-fetch-sensor-data";
import usePrepareChartData from "@/hooks/sub/use-prepare-chart-data";
import { useMemo } from "react";


export const usePrepareDataForSensorCharts = ({start_date, end_date,polyhouse_ids }: {start_date: string, end_date: string, polyhouse_ids: Array<string>}) => {
  const polyhouses = useMemo(()=>{
    return polyhouse_ids?.map((item: any) => `"${item.value}"`) || [];
  },[polyhouse_ids]);

  const {soilData, refetchAll, chartOptions, atmosphereData} = useFetchSensnorsListData({start_date, end_date, polyhouse_ids : polyhouses});


  const {chartData} = usePrepareChartData({soilData, chartOptions, atmosphereData});

 

  return {...chartData,  refetchAll};
};


import { meanMaxMinCalculator } from '@/lib/utils';
import { useMemo } from 'react'

type Props = {
    soilData : any,
    chartOptions : any,
    atmosphereData : any
}

const usePrepareChartData = ({soilData, chartOptions, atmosphereData}: Props) => {
    /**
   * Prepare chart data for sensor visualization
   * @param soilData - Raw sensor data array
   * @returns Formatted chart data with statistics
   */
  const chartData = useMemo(() => {
    if (!soilData?.length) {
      return {
        temperatureData: [],
        moistureData: [],
        temperatureStatistics: { meanValue: 0, maxValue: 0, minValue: 0 },
        moistureStatistics: { meanValue: 0, maxValue: 0, minValue: 0 },
      };
    }

    if(!atmosphereData?.length) {
      return {
        atmosphericTemperatureData: [],
        atmosphericHumidityData: [],
        atmosphericTemperatureStatistics: { meanValue: 0, maxValue: 0, minValue: 0 },
        atmosphericHumidityStatistics: { meanValue: 0, maxValue: 0, minValue: 0 },
      }
    }

    // Group data by device
    const groupedByDevice: Record<number, any[]> = {};
    soilData.forEach((item: any) => {
      if (!groupedByDevice[item.device_id]) groupedByDevice[item.device_id] = [];
      groupedByDevice[item.device_id].push(item);
    });

    // Helper: round timestamp to 30-minute intervals
    const get30MinRoundedDate = (timestamp: string) => {
      const date = new Date(timestamp);
      const minutes = date.getMinutes();
      date.setMinutes(minutes < 60 ? 0 : 60, 0, 0);
      return date;
    };

    // Map actual data with 30-minute rounding
    // const mapDataWith30MinRounding = (deviceData: any[], valueKey: string) => {
    //   return deviceData
    //     .filter(dev => dev[valueKey] !== undefined && dev[valueKey] !== null)
    //     .map(dev => {
    //       const roundedDate = get30MinRoundedDate(dev.timestamp);
    //       const timeStr = `${roundedDate.getHours().toString().padStart(2, '0')}:${roundedDate.getMinutes().toString().padStart(2, '0')}`;
    //       const dateStr = roundedDate.toLocaleDateString();

    //       return {
    //         device_id: dev.device_id,
    //         time: roundedDate,
    //         timeDisplay: timeStr,
    //         dateDisplay: dateStr,
    //         [valueKey]: valueKey === 'ec' ? dev[valueKey] / 1000 : dev[valueKey],
    //       };
    //     });
    // };

    const tempData: any[] = [];
    const moistData: any[] = [];
    const nitrogenData: any[] = [];
    const phosphorousData: any[] = [];
    const phData: any[] = [];
    const potassiumData: any[] = [];
    const salinityData: any[] = [];
    const electricalConductivityData: any[] = [];

    const atmosphericTemperatureData = atmosphereData?.map((item : any)=>{
      const roundedDate = get30MinRoundedDate(item.timestamp);
      const timeStr = `${roundedDate.getHours().toString().padStart(2, '0')}:${roundedDate.getMinutes().toString().padStart(2, '0')}`;
      const dateStr = roundedDate.toLocaleDateString();

      return {
        time: roundedDate,
        timeDisplay: timeStr,
        dateDisplay: dateStr,
        temperature: item.temperature,
      }

    });

    const atmosphericHumidityData = atmosphereData?.map((item : any)=>{
      const roundedDate = get30MinRoundedDate(item.timestamp);
      const timeStr = `${roundedDate.getHours().toString().padStart(2, '0')}:${roundedDate.getMinutes().toString().padStart(2, '0')}`;
      const dateStr = roundedDate.toLocaleDateString();

      return {
        time: roundedDate,
        timeDisplay: timeStr,
        dateDisplay: dateStr,
        humidity: item.humidity,
      }

    })


    Object.values(groupedByDevice).forEach(deviceData => {
      deviceData.forEach(dev => {
        const roundedDate = get30MinRoundedDate(dev.timestamp);
        const timeStr = `${roundedDate.getHours().toString().padStart(2, '0')}:${roundedDate.getMinutes().toString().padStart(2, '0')}`;
        const dateStr = roundedDate.toLocaleDateString();

        const entry = {
          device_id: dev.device_id,
          time: roundedDate,
          timeDisplay: timeStr,
          dateDisplay: dateStr,
        };

        if (dev.temperature != null) tempData.push({ ...entry, temperature: dev.temperature });
        if (dev.moisture != null) moistData.push({ ...entry, moisture: dev.moisture });
        if (dev.nitrogen != null) nitrogenData.push({ ...entry, nitrogen: dev.nitrogen });
        if (dev.phosphorous != null) phosphorousData.push({ ...entry, phosphorous: dev.phosphorous });
        if (dev.ph != null) phData.push({ ...entry, ph: dev.ph });
        if (dev.potassium != null) potassiumData.push({ ...entry, potassium: dev.potassium });
        if (dev.salinity != null) salinityData.push({ ...entry, salinity: dev.salinity });
        if (dev.ec != null) electricalConductivityData.push({ ...entry, ec: dev.ec / 1000 });
      });
    });


    return {
      // refetchData,
      temperatureData: tempData,
      moistureData: moistData,
      nitrogenData,
      phosphorousData,
      phData,
      potassiumData,
      salinityData,
      electricalConductivityData,

      atmosphericTemperatureData,
      atmosphericHumidityData,

      temperatureStatistics: meanMaxMinCalculator('temperature', soilData),
      moistureStatistics: meanMaxMinCalculator('moisture', soilData),
      nitrogenStatistics: meanMaxMinCalculator('nitrogen', soilData),
      phosphorousStatistics: meanMaxMinCalculator('phosphorous', soilData),
      phStatistics: meanMaxMinCalculator('ph', soilData),
      potassiumStatistics: meanMaxMinCalculator('potassium', soilData),
      salinityStatistics: meanMaxMinCalculator('salinity', soilData),
      electricalConductivityStatistics: meanMaxMinCalculator('ec', soilData),

      temperatureSensorChartOptions: chartOptions?.temperature,
      moistureSensorChartOptions: chartOptions?.moisture,
      nitrogenSensorChartOptions: chartOptions?.nitrogen,
      phosphorousSensorChartOptions: chartOptions?.phosphorous,
      phSensorChartOptions: chartOptions?.ph,
      potassiumSensorChartOptions: chartOptions?.potassium,
      salinitySensorChartOptions: chartOptions?.salinity,
      electricalConductivitySensorChartOptions: chartOptions?.ec,
    };
  }, [JSON.stringify(soilData), JSON.stringify(chartOptions)]);

  return { chartData }
}

export default usePrepareChartData;
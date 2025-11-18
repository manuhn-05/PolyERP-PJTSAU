import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';
import { USER_ENDPOINTS } from '@/data-handling/endpoints/server-endpoints';
import { 
  useFetchDevicesListBasedOnPolyhouse, 
  useFetchSensnorDataBasedOnDevicesList
} from '@/data-handling/queries/dynamic-component-queries';
import { calculateRangesForChartOptions } from '@/lib/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';

type Props = {
  start_date: string;
  end_date: string;
  polyhouse_ids: string[];
};

export type DEVICE_DATA_PROPS_TYPE = {
  start_date: string;
  end_date: string;
  device_id: number[];
  endpoint: string;
};

const useFetchSensnorsListData = ({ start_date, end_date, polyhouse_ids }: Props) => {
  const [soilData, setSoilData] = useState<any[]>([]);
  const [atmosphereData, setAtmosphereData] = useState<any[]>([]);

  // fetch devices list
  const { data: fetchedDevicesData, refetch: refetchOnPolyhouseChange } =
    useFetchDevicesListBasedOnPolyhouse(
      `${CLIENT_ENDPOINTS.FETCH_SENSORS_LIST}`,
      polyhouse_ids
    );


  const chartOptions = useMemo(() => {
    const temperature = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'temperature', "Temperature (°C)");
    const moisture = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'moisture', "Moisture (%)");
    const nitrogen = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'nitrogen', "Nitrogen (mg/kg)");
    const phosphorous = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'phosphorous', "Phosphorous (mg/kg)");

    const potassium = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'potassium', "Potassium (mg/kg)");
    const salinity = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'salinity', "Salinity (g/kg)");
    const ec = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'ec', "EC (dS/m)");
    const ph = calculateRangesForChartOptions(fetchedDevicesData?.data || [], 'ph', "pH");

    return {
      temperature,
      moisture,
      nitrogen,
      phosphorous,
      potassium,
      salinity,
      ec,
      ph,
    }
  }, [fetchedDevicesData?.data])


  const { mutateAsync: fetchSensnorDataBasedOnDevicesList } =
    useFetchSensnorDataBasedOnDevicesList();

  const fetchActualSensnorDataBasedOnDevices = useCallback(
    async (device_id: number[]) => {
      try {
        const response = await fetchSensnorDataBasedOnDevicesList({
          end_date,
          start_date,
          device_id: device_id || [],
          endpoint: `${USER_ENDPOINTS.SOIL_PROBE_SENSOR_DATA}`
        });
        const atmResponse = await fetchSensnorDataBasedOnDevicesList({
          end_date,
          start_date,
          device_id: device_id || [],
          endpoint: `${USER_ENDPOINTS.ATMOSPHERE_SENSOR_DATA}`
        });
     
        setSoilData(response?.data || []);
        setAtmosphereData(atmResponse?.data || []);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    },
    [fetchSensnorDataBasedOnDevicesList, start_date, end_date]
  );

  // Memoize device IDs
  const deviceIds = useMemo(() => {
    const list = fetchedDevicesData?.data;
    return Array.isArray(list)
      ? list.map((item: any) => item.device_id)
      : [];
  }, [fetchedDevicesData?.data]);

  // 🚀 Effect: Run on mount and whenever inputs change
  useEffect(() => {
    fetchActualSensnorDataBasedOnDevices(deviceIds);
  }, [
    start_date,
    end_date,
    polyhouse_ids.join(','),
    deviceIds.join(','),
    fetchActualSensnorDataBasedOnDevices,
  ]);

  // ✅ Safe refetch handler
  const refetchAll = useCallback(async () => {
    try {
      const devicesResult = await refetchOnPolyhouseChange();
      const list = devicesResult?.data;
      const device_id = Array.isArray(list)
        ? list.map((item: any) => item.device_id)
        : [];

      await fetchActualSensnorDataBasedOnDevices(device_id);
    } catch (error) {
      console.error('Error during refetchAll:', error);
      setSoilData([]);
    }
  }, [refetchOnPolyhouseChange, fetchActualSensnorDataBasedOnDevices]);

  return { soilData, atmosphereData, refetchAll, chartOptions };
};

export default useFetchSensnorsListData;

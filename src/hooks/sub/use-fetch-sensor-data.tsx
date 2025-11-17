import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';
import { 
  useFetchDevicesListBasedOnPolyhouse, 
  useFetchSensnorDataBasedOnDevicesList
} from '@/data-handling/queries/dynamic-component-queries';
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
};

const useFetchSensnorsListData = ({ start_date, end_date, polyhouse_ids }: Props) => {
  const [soilData, setSoilData] = useState<any[]>([]);

  // fetch devices list
  const { data: fetchedDevicesData, refetch: refetchOnPolyhouseChange } =
    useFetchDevicesListBasedOnPolyhouse(
      `${CLIENT_ENDPOINTS.FETCH_SENSORS_LIST}`,
      polyhouse_ids
    );

  const { mutateAsync: fetchSensnorDataBasedOnDevicesList } =
    useFetchSensnorDataBasedOnDevicesList();

  const fetchActualSensnorDataBasedOnDevices = useCallback(
    async (device_id: number[]) => {
      try {
        const response = await fetchSensnorDataBasedOnDevicesList({
          end_date,
          start_date,
          device_id: device_id || [],
        });
        setSoilData(response?.data || []);
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

  return { soilData, refetchAll };
};

export default useFetchSensnorsListData;

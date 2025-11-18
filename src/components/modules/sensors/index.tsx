"use client";
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import SensorDisplayCard, { DeviceType } from '@/components/modules/sensors/_components/sensor-display-card';
import { convertSensorDataForBackend } from '@/lib/utils';
import {  useFetchDevicesListBasedOnPolyhouse, useRegisterNewSensorDevice } from '@/data-handling/queries/dynamic-component-queries';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';
import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';
import SetupSensorForSensor from '@/components/modules/sensors/_components/setup-sensor-for-plots';
import PolyhousesDropdownMultiSelect from '@/components/(owner)/market-place/polyhouse/_components/multi-polyhouse-dropdown';
import { Button } from '@chakra-ui/react';


const SensorsModuleComponent = () => {
  const modalRef = React.useRef<ModalWindowRef>(null);
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const selectedPolyhouse = useAppSelector(state => state.polyhouse.selectedPolyhouse);
  const { mutateAsync: registerNewSensorDevice } = useRegisterNewSensorDevice();

  const [selectedPlotsId, setSelectedPlotsId] = useState<Array<string>>([]);

  const { data: listOfSensorDevices, refetch: refetchListOfSensorDevices } = useFetchDevicesListBasedOnPolyhouse(`${CLIENT_ENDPOINTS.FETCH_SENSORS_LIST}`, selectedPlotsId);

  const { data: selectedModulesData } = useFetchSelectedModules(selectedPolyhouse?.value);
  const selectedModule = selectedModulesData?.data?.find((mod: any) => mod?.path === pathname?.split('/')[3]);

  async function handleSensorsFormSubmission(formData: any) {
    const results = convertSensorDataForBackend(formData, formData?.[0]?.device_id, formData?.[0]?.sensor_name, formData?.[0]?.sensor_type)
    try {

      const response = await registerNewSensorDevice(results);
      if (response?.status === HTTP_RESPONSE_CODES.CREATED) {
        queryClient.invalidateQueries({ queryKey: [`devices`] });
        modalRef.current?.closeModal();
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handlePlotSelection(option: any) {
    setSelectedPlot(option);
  }

  useEffect(() => {
    const ids = selectedPlot?.map((plot: any) => `"${plot?.value}"`);
    setSelectedPlotsId(ids);

  }, [selectedPlot])

  function onSearchClick() {
    refetchListOfSensorDevices()
  }
  return (
    <article className={`w-full text-[4vw] md:text-[2.2vw] mb-[1%]`}>
      <section className={`flex w-full justify-between items-center mb-[1%]`}>
        <h3>Sensors</h3>
        <div>
          <ModalWindow
            OpenComponent={IoCloseCircleSharp}
            CloseComponent={IoCloseCircleSharp}
            isItButton={true}
            buttonText="Configure"
            title="Configure Sensors"
            modalClassName="md:w-[60%] dark:bg-[#122031] md:h-[50dvh] overflow-y-auto"
            ref={modalRef}
            // todo :  Uncomment and Enable for PolyERP
            isOpenDisabled={true}
          >
            <SetupSensorForSensor handleFormSubmission={(data: any) => handleSensorsFormSubmission(data)} pathname={`${pathname?.split('/')[3]}`} selectedModule={selectedModule as any} />

          </ModalWindow>
        </div>
      </section>
      <div className={`flex items-center justify-start gap-[1%] mb-[1%] bg-[#fff] dark:bg-[#122031] w-full rounded-lg p-[1.5%]`}>
        <PolyhousesDropdownMultiSelect className='md:w-[40%]' selectedPolyhouse={selectedPlot} handleSelectOption={handlePlotSelection} placeHolder={"Select Plot"} />
        <Button onClick={onSearchClick}>Search</Button>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2%] md:min-h-[90dvh] overflow-y-auto`}>
        {/* <ListOfSensorsRegistered /> */}
        {
          listOfSensorDevices?.data?.map((sensor: DeviceType) => (
            <SensorDisplayCard key={sensor?._id}
              device={sensor}
            />
          ))
        }
      </div>
    </article>
  )
}

export default SensorsModuleComponent;
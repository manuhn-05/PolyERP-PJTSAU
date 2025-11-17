import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import SetupSensorForSensor from './setup-sensor-for-plots';

type FormField = {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  editable?: boolean;
  options?: { [key: string]: string }[];
};

type ConfigureSensorsInPolyhouseProps = {
  pathname: string;
  selectedModule: { form: { fields: FormField[] } };
  handleFormSubmission: (data: any) => void;
};

const ConfigureSensorsInPolyhouse: React.FC<ConfigureSensorsInPolyhouseProps> = ({
  selectedModule, pathname,
  handleFormSubmission,
}) => {
  

  return (
    <ModalWindow
      OpenComponent={IoCloseCircleSharp}
      CloseComponent={IoCloseCircleSharp}
      isItButton={true}
      buttonText="Configure"
      title="Configure Sensors"
      modalClassName="md:w-[60%] dark:bg-[#122031] md:h-[50dvh] overflow-y-auto"

    >
      <SetupSensorForSensor handleFormSubmission={handleFormSubmission} pathname={pathname} selectedModule={selectedModule as any} />
     
    </ModalWindow>
  );
};

export default ConfigureSensorsInPolyhouse;

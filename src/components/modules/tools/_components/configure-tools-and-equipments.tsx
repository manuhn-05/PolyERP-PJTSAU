import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import { IoCloseCircle } from "react-icons/io5";
import React, { useCallback, useRef } from 'react';
import { BiSolidEyedropper } from 'react-icons/bi';
import ToolsPage from '@/components/modules/tools/_components/tools-configuration-page';

const ConfigureToolsAndEquipments = () => {
  const modalRef = useRef<ModalWindowRef>(null);
 
  const handleModalCloseFromParent = useCallback(() => {
    modalRef.current?.closeModal();
  }, []);
  
  return (
    <ModalWindow
    OpenComponent={BiSolidEyedropper}
    CloseComponent={IoCloseCircle}
    // todo - Enable for PolyERP
    isOpenDisabled={true}
    title={'Configure Tools And Equipments'} titleStyles={`md:text-[0.5em]`}
    isItButton={true} buttonText={`Configure`}
modalClassName={`md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto`}
ref={modalRef}
    >
        <section>
            <ToolsPage handleModalCloseFromParent={handleModalCloseFromParent} />
        </section>
    </ModalWindow>
  )
}

export default ConfigureToolsAndEquipments
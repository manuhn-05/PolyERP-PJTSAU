import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef, } from 'react';
import DynamicForm from '@/components/dynamic-renderer/actions/dynamic-form';
import { DYNAMIC_FORM_OBJ, } from '@/components/selected-modules/_components/constants';
import { IoMdCloseCircle } from 'react-icons/io';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useUpdateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useQueryClient } from '@tanstack/react-query';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';

import { FiEdit2 } from "react-icons/fi";

import { usePathname } from 'next/navigation';
import EditSupplierDetails from '@/components/modules/suppliers/_components/edit-suppliers';
import { ACCESS_LEVELS_TYPE } from '@/types';
import { getUserAccessLevels } from '@/lib/utils';

type EditDetailsCompProps = {
  endpoint: string;
  item: any;
  isItButton?: boolean;

}

const EditDetailsComp: React.FC<EditDetailsCompProps> = ({ endpoint, item, }: EditDetailsCompProps) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<ModalWindowRef>(null);
  const { selectedPolyhouse } = useAppSelector((state) => state.polyhouse);
  const currentUser = useAppSelector((state) => state?.user.currentUser);
  const path = usePathname();
  const { mutateAsync: updateDataAsPerEndpoint } = useUpdateDataAsPerEndpoint(`${endpoint}`);

  const pathname = usePathname()?.split("/")[3];
  const { update }: ACCESS_LEVELS_TYPE = getUserAccessLevels(currentUser?.access || [], `${pathname}`, `${currentUser?.user_type}`);


  async function handleFormSubmission(data: any) {
    try {

      const response = await updateDataAsPerEndpoint({ ...data, _id: item._id, polyhouse_id: selectedPolyhouse?.value, supervisor: currentUser?._id });

      if (response?.status === HTTP_RESPONSE_CODES.OK) {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
        modalRef.current?.closeModal();
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>

      <ModalWindow modalClassName='md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto md:text-[1.15em]' isItButton={false}
                closeButtonClassName={`text-red-500 hover:text-red-700 hover:scale-105 md:text-[1.5em]`}
        openButtonClassName='dark:text-[#6BBBE9] lg:text-[1.15em]'
        isIconInsideButton={true}
        buttonText={'Edit Details'} OpenComponent={FiEdit2} CloseComponent={IoMdCloseCircle} title={'Edit'}
        ref={modalRef} 
        // todo : Enable for PolyERP
        // isOpenDisabled={!update}
        isOpenDisabled={true}

      >
        {
          endpoint === "suppliers" ? (
            <EditSupplierDetails item={item} />
          ) : (
            <DynamicForm initialValue={item} schema={DYNAMIC_FORM_OBJ?.[`${path?.split('/')?.[3]}`]}
              handleFormSubmission={(data: any) => handleFormSubmission(data)} />
          )
        }
      </ModalWindow>
    </>
  )
}

export default EditDetailsComp;
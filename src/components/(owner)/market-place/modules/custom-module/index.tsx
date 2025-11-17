"use client"
import React from 'react'
import CustomModuleBuilder from './custom-module-builder';
import BackHome from '@/components/utils-ui/back-home';
import { useAddToSelectedModulesFromAvailableList } from '@/data-handling/queries/market-place-queries';
import { CustomModuleSchema } from '@/types/custom-module';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';


const CustomModuleComponent = () => {
  const { mutateAsync : saveCustomModule} = useAddToSelectedModulesFromAvailableList();
  const {selectedPolyhouse} = useAppSelector((state) => state.polyhouse);
  const queryClient = useQueryClient()

  async function handleCustomModuleSave(schema: CustomModuleSchema) {
  try {
    const response = await saveCustomModule({...schema, polyhouse_id : `${selectedPolyhouse?.value}`});
    console.log(response);
    if(response?.status===HTTP_RESPONSE_CODES.CREATED){
      queryClient.invalidateQueries({queryKey: ['selected_modules_list']})
    }
  
  } catch (error) {
    console.log(error);
  }
  }
  return (
    <section className={``}>
      <BackHome />
        <CustomModuleBuilder handleCustomModuleSave={(schema: CustomModuleSchema) => handleCustomModuleSave(schema)} />
    </section>
  )
}

export default CustomModuleComponent;
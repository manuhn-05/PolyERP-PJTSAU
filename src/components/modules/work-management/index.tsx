"use client";
import DynamicComponentRenderer from '@/components/dynamic-renderer';
import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useFetchPolyhousesList, useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CreateDetails from '@/components/dynamic-renderer/actions/create-details';




const WorkManagementModuleComponent = () => {
  const path = usePathname()
const [modifiedSelectedModule, setModifiedSelectedModule] = useState<any>(null);
  const modified_path:string = `labours_data`;
  const  selectedPolyhouse  = useAppSelector(state => state.polyhouse.selectedPolyhouse);
  const  user= useAppSelector(state => state.user.currentUser);

  const {data : polyhousesList, } = useFetchPolyhousesList(`${user?._id}`,Boolean(user));

  const polyhouse_id = user?.user_type === USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : user?.polyhouse_id;
  const { data: fetchedData, } = useFetchDataAsPerEndpoint(`${polyhouse_id}`,  `${modified_path}`,)
  const { data: selectedModulesData } = useFetchSelectedModules(selectedPolyhouse?.value);
  const selectedModule = selectedModulesData?.data?.find((mod: any) => mod?.path === path?.split('/')[3]);

  useEffect(() => {
    if (!selectedModule?.form?.fields || !polyhousesList?.data) return;

    // 1️⃣ Create worksite options dynamically
    const worksite_options = polyhousesList.data.map((item: any) => ({
      worksite: item?.polyhouse_name,
      value: item?._id,
    }));

    // 2️⃣ Clone form to avoid mutating original
    const updatedForm = {
      ...selectedModule.form,
      fields: selectedModule.form.fields.map((field: any) =>
        field.key === 'worksite'
          ? { ...field, options: worksite_options }
          : field
      ),
    };

    // 3️⃣ Store modified module in state
    setModifiedSelectedModule({
      ...selectedModule,
      form: updatedForm,
    });
  }, [selectedModule?.form, polyhousesList?.data]);
  return (
    <article>
    
    <CreateDetails
        btnTitle='Add Labour Details'
        path={modified_path}
        selectedModuleForm={modifiedSelectedModule?.form}
      />

      <DynamicComponentRenderer  listOfData={fetchedData?.data} path={`${modified_path}`} layout={selectedModule?.layout ?? []} />
    </article>
  )
}

export default WorkManagementModuleComponent;
"use client";
import React, { useEffect } from 'react'
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import DynamicComponentRenderer from "@/components/dynamic-renderer";
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import CreateDetails from '@/components/dynamic-renderer/actions/create-details';
import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import BackHome from '@/components/utils-ui/back-home';

type Props = {
    path : string
}

const SelectedModulesComponent = ({path}: Props) => {
  const modified_path = path === "jobs" ? "jobs_allotment" : path==="work-management" ? "labours_data" : path;
  const { selectedPolyhouse } = useAppSelector(state => state.polyhouse);
  const { currentUser } = useAppSelector(state => state.user);

  const polyhouse_id = currentUser?.user_type === USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : currentUser?.polyhouse_id;

  const { data: fetchedData, refetch: refetchDataBasedOnEndpoint } = useFetchDataAsPerEndpoint(`${polyhouse_id}`,  `${modified_path}`,)
  const { data: selectedModulesData , } = useFetchSelectedModules(selectedPolyhouse?.value);
  const selectedModule = selectedModulesData?.data?.find((mod: any) => mod.path === path);

  useEffect(() => {
    if (selectedPolyhouse) {
      refetchDataBasedOnEndpoint();
    }
  }, [selectedPolyhouse])

  if (!selectedModule) return <div>
    <BackHome />
    <span>No layout found</span>
    </div>;
  return (
    <div>
      <CreateDetails selectedModuleForm={selectedModule?.form} btnTitle={`Create ${path?.split(/[,-_]/).join(" ")}`} path={modified_path} />
      <DynamicComponentRenderer listOfData={fetchedData?.data} path={modified_path} layout={selectedModule?.layout ?? []} />
     </div>
  )
}

export default SelectedModulesComponent;
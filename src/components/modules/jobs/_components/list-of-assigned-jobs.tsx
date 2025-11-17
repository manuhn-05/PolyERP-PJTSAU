import DynamicComponentRenderer from '@/components/dynamic-renderer';

import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import dynamic from 'next/dynamic';
import AssignJobToLabours from '@/components/modules/jobs/_components/assign-job';

import React, { useMemo } from 'react'
import ApproveReassignJob from '@/components/modules/jobs/_components/approve-re-assign-job';
import JobsCardStatusSummary from '@/components/modules/jobs/_elements/_helper/job-card-status-summary';
const DeleteDetailsDynamic = dynamic(() => import('@/components/dynamic-renderer/actions/delete-details'));
const EditJobAssignmentDetailsDynamic = dynamic(() => import('@/components/modules/jobs/_components/edit-job-assignment-details'));

type Props = {
    pathname : string
}

const ListOfAssignedJobs = ({pathname}: Props) => {
    const  selectedPolyhouse  = useAppSelector(state => state.polyhouse.selectedPolyhouse);
    const  user= useAppSelector(state => state.user.currentUser);
    const modified_path : string= "jobs_allotment"

    const polyhouse_id = user?.user_type === USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : user?.polyhouse_id;
    const { data: fetchedData,  } = useFetchDataAsPerEndpoint(`${polyhouse_id}`,  `${modified_path}`,)
    const { data: selectedModulesData } = useFetchSelectedModules(selectedPolyhouse?.value);
    const selectedModule = selectedModulesData?.data?.find((mod: any) => mod?.path === pathname);
    const default_components = [
      (props: any) => <DeleteDetailsDynamic {...props} isItButton={true} />,
      (props: any) => <EditJobAssignmentDetailsDynamic {...props} isItButton={true} />,
      (props: any) => <ApproveReassignJob {...props} isItButton={true} />,

  ];

  const JOBS_CARD_COUNT = useMemo(() => {

    const counts = fetchedData?.data?.reduce((acc: any, curr: any) => {
      const status = curr?.status || "unknown"; // fallback if status missing
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return counts;
  }, [fetchedData?.data]);

  return (
    <>
      <JobsCardStatusSummary jobs={JOBS_CARD_COUNT} />

      <section className={`bg-white dark:bg-[#121F31] rounded-lg shadow-lg`}>
        <div className={`flex justify-between items-center px-[2%] pt-[1%]`}>
          <h3 className={`text-pretty text-2xl font-semibold tracking-tight text-foreground md:text-3xl capitalize`}>{pathname} Management</h3>
          <AssignJobToLabours endpoint={`${pathname}`} />
        </div>
        <DynamicComponentRenderer components={default_components} listOfData={fetchedData?.data} path={`${modified_path}`} layout={selectedModule?.layout ?? []} />
      </section>
    </>
  )
}

export default ListOfAssignedJobs;
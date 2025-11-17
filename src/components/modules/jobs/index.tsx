"use client";
import {  usePathname } from 'next/navigation'
import ListOfAssignedJobs from '@/components/modules/jobs/_components/list-of-assigned-jobs';
import withAuth from '@/hoc/withAuth';

const JobsModuleComponent = () => {
    const path = usePathname();
  return (
    <>
      <ListOfAssignedJobs pathname={`${path?.split('/')[3]}`} />
    </>
  )
}

export default withAuth(JobsModuleComponent);
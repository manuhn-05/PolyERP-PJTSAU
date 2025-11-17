import DashboardHomeComponent from '@/components/dashboard'
import React from 'react';
type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};


const DashboardPage =async ({ searchParams }: PropsType) => {
  const params = await searchParams;
  return (
    <>
    <DashboardHomeComponent searchParams={params} />
    </>
  )
}

export default DashboardPage
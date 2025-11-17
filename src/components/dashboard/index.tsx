"use client";
import withAuth from "@/hoc/withAuth";
import DashboardClientHomeComponent from '@/components/dashboard/dashboard-client-component';


const DashboardHomeComponent = () => {
  return (
    <>
    <DashboardClientHomeComponent />
    </>
  );
}

export default withAuth(DashboardHomeComponent);
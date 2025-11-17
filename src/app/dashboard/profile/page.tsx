"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserProfileCOmponent from "@/components/profile";

export default function Page() {
  
  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />
      <UserProfileCOmponent />

    
    </div>
  );
}

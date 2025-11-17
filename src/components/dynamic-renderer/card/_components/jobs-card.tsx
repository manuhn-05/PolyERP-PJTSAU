"use client";
import ApproveReassignJob from "@/components/modules/jobs/_components/approve-re-assign-job";
import StatusBadge from "@/components/modules/jobs/_elements/_helper/status-badge";
import { Edit2, Trash2, Calendar, Badge } from "lucide-react";
import dynamic from "next/dynamic";
import { FC } from "react";

const DeleteDetailsDynamic = dynamic(() => import('@/components/dynamic-renderer/actions/delete-details'));
const EditJobAssignmentDetailsDynamic = dynamic(() => import('@/components/modules/jobs/_components/edit-job-assignment-details'));

type JobsCardComponentProps = {
    job : any;
    endpoint:string
}

const JobsCardComponent : FC<JobsCardComponentProps> = ({job, endpoint}) => {
  return (
    <>
       <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.job}
                </h3>
              </div>
            
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {job?.full_name
                      .split(" ")
                      .map((n : any) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-medium text-foreground">{job.full_name}</p>
                </div>
              </div>

              {/* Skill */}
              <div className="flex items-center gap-3">
                <Badge className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Skill Type</p>
                  <p className="text-sm font-medium text-foreground">{`${job.skill_type}`.split("_").join(" ")}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium text-foreground">{new Date(job.start_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              {/* <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                {job.status}
              </span> */}
              <StatusBadge  status={job.status} />
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity items-center">
              <EditJobAssignmentDetailsDynamic endpoint={endpoint} item={job} status={job.status} />

                <DeleteDetailsDynamic endpoint={endpoint} item={job} />
               
                <ApproveReassignJob status={job.status} />
              </div>
            </div>
          </div>
    </>
  )
}

export default JobsCardComponent
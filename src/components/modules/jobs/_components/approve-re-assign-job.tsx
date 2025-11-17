import React, { FC } from 'react'
import { CheckCircle2, XCircle, Play, Check } from "lucide-react"
import { Button } from '@chakra-ui/react'
import { JOB_STATUS } from '@/constants/titles'

type ApproveReassignJobType={
    status:string

}

const ApproveReassignJob :FC<ApproveReassignJobType>= ({status}) => {

    if(status!==JOB_STATUS.COMPLETED) return null;
    // todo : add condition for re-assign job
    // todo : implement functionality for reassigning and approving job completed

    // todo Enable Both Buton for PolyERP
    return (
        <section className={`flex`}>
            <div>
                <Button _hover={{bgColor : "#6BBBE9"}}  bg={'transparent'} className={`group`} disabled={true} >
                    <CheckCircle2 className="h-4 w-4 text-green-600 group-hover:text-green-700" />

                </Button>
            </div>
            <div>
                <Button bg={'transparent'} _hover={{bgColor : "#6BBBE9"}}  className=" " disabled={true} >
                    <XCircle className="h-4 w-4 text-red-600 hover:text-red-700" />

                </Button>
            </div>
        </section>
    )
}

export default ApproveReassignJob
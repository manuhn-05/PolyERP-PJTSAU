import dynamic from 'next/dynamic';
import React from 'react';
const EditDetailsDynamic = dynamic(() => import('@/components/dynamic-renderer/actions/edit-details'));
const DeleteDetailsDynamic = dynamic(() => import('@/components/dynamic-renderer/actions/delete-details'));

type Props = {
    item : any;
    endpoint : string;
}

const DefaultCrudComponents = ({item, endpoint}: Props) => {

  return (
    <div className='flex items-center'>
         <EditDetailsDynamic endpoint={`${endpoint}`} item={{...item}}  />
           <DeleteDetailsDynamic endpoint={`${endpoint}`} item={{...item}}  />
    </div>
  )
}

export default DefaultCrudComponents;
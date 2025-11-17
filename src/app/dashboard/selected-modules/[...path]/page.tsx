import SelectedModulesComponent from '@/components/selected-modules'
import React from 'react'

type Props = {
    params :  Promise<{ path: string[] }>; 
}

const ModulePage = async (props: Props) => {
  const {params} = props;
  const {path} = await params;

  return (
    <div>
        <SelectedModulesComponent path={path.join("/")} />
    </div>
  )
}

export default ModulePage;
import React from 'react'
import AddNewSupplier from '@/components/modules/suppliers/_components/add-supplier'
import ListOfSuppliersData from '@/components/modules/suppliers/_components/display-list-of-suppliers'




const SuppliersPageModuleView =async () => {


  return (
    <div className={``}>

      <AddNewSupplier />
      <ListOfSuppliersData  />
    </div>
  )
}

export default SuppliersPageModuleView
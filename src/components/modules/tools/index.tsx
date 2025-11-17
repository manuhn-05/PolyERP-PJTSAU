"use client";
import ConfigureToolsAndEquipments from '@/components/modules/tools/_components/configure-tools-and-equipments'
import withAuth from '@/hoc/withAuth';
import InventoryDashboard from '@/components/modules/tools/_components/tools-inventory-dashboard';


const ToolsModuleComponent = () => {
  return (
    <article className={`w-full text-[4vw] md:text-[2.2vw] `}>
        <div className={`flex justify-between w-full items-center`}>
            <h3>Polyhouse Tools & Equipment Inventory</h3>
            <ConfigureToolsAndEquipments />
        </div>
        <InventoryDashboard />
    </article>
  )
}

export default withAuth(ToolsModuleComponent);
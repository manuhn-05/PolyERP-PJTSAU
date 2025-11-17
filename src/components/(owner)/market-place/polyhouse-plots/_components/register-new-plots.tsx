import ModalWindow from '@/components/modal/ModalWindow';
import React from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdAddCircleOutline } from "react-icons/md";
import PolyhousePlotsForm from '@/components/(owner)/market-place/polyhouse-plots/_components/polyhouse-plots-form';


const RegisterNewPlot = () => {
  return (
    <ModalWindow title=" "
      OpenComponent={MdAddCircleOutline}
modalClassName={`w-[60%] h-[75%] overflow-y-auto dark:bg-[#122031]`}
      CloseComponent={IoMdCloseCircleOutline}
      closeButtonClassName='text-red-500 lg:text-[0.7em] hover:scale-110'
      isItButton={true} buttonText='Register New Plot'
    > 
     <section className="mx-auto max-w-5xl p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">Register Polyhouse Plots</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add one or more plots under a polyhouse. Grouped by details, fertiliser, and watering.
        </p>
      </header>
      </section>
    <PolyhousePlotsForm />
    </ModalWindow>
  )
}

export default RegisterNewPlot;
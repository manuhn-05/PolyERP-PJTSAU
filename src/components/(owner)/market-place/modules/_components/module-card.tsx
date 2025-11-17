import { Box,  FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { Switch } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useConfigureSelectedModules } from '@/data-handling/queries/market-place-queries';
const ConfigureSelectedModuleDynamic = dynamic(() => import('@/components/(owner)/market-place/modules/_elements/configure-selected-modules'), {ssr: false,});

type Props = {
  module: any;
  handleModuleSelection (val : any) : void;
  displayWarning?(flag :any) : void
  isConigurable? : boolean
}

const ModuleCard = ({ module , handleModuleSelection, displayWarning, isConigurable}: Props) => {
  const {mutateAsync : configureSelectedModules, isPending} = useConfigureSelectedModules();

  async function handleSelectedModuleConfiguration(data: any) {
    try {

      const results = await configureSelectedModules({...module, layout: [...data.layout], form :{...data?.form}});
      console.log(results)

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Box className='shadow-lg rounded-lg bg-[#f6f7f8] dark:bg-[#28466B] dark:text-white p-[2.5%] md:text-[0.5em] flex flex-col justify-between'>
       <div className='flex justify-between items-start w-full'> 
       <span className='w-full'> {module?.title}</span>
        <FormControl className='w-[30%] flex justify-end ' display='flex' alignItems='center'>
          <FormLabel htmlFor='email-alerts' mb='0'>
         
          </FormLabel>
           {/* todo :  Uncomment for PolyERP */}
          <Switch 
disabled={true}
          isChecked={module?.isSelected}  onChange={(e) => {
            if (e.target.checked) {
              // Switch turned ON → Add module
              handleModuleSelection(module);
            } else {
              // Switch turned OFF → Show warning
              displayWarning?.(module);
            }
          }} id='email-alerts' />
        </FormControl>
        </div>
        <div>
          <span className='text-[0.8em]'>{module?.desc}</span>
        </div>
        <div>
          {isConigurable && <ConfigureSelectedModuleDynamic 
          handleSubmitModuleConfiguration={(val : any) => handleSelectedModuleConfiguration(val)} 
          configurableModule={module} />}
        </div>
      </Box>
    </>
  )
}

export default ModuleCard;
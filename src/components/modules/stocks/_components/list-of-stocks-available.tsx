import DynamicComponentRenderer from '@/components/dynamic-renderer';
import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { usePathname } from 'next/navigation';
import React from 'react'

const ListOfStocksAvailable = () => {
  const pathname = usePathname()
  const { selectedPolyhouse } = useAppSelector(state => state.polyhouse);
  const { currentUser } = useAppSelector(state => state.user);

  const polyhouse_id = currentUser?.user_type === USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : currentUser?.polyhouse_id;
  const { data: fetchedData, } = useFetchDataAsPerEndpoint(`${polyhouse_id}`, `${pathname?.split('/')[3]}`,)
  const { data: selectedModulesData } = useFetchSelectedModules(selectedPolyhouse?.value);
  const selectedModule = selectedModulesData?.data?.find((mod: any) => mod?.path === pathname?.split('/')[3]);
  return (
    <>
      <section className='md:w-[78vw] overflow-x-auto h-full'>
        <DynamicComponentRenderer listOfData={fetchedData?.data} path={`${pathname?.split('/')[3]}`} layout={selectedModule?.layout ?? []} />
      </section>
    </>
  )
}

export default ListOfStocksAvailable;
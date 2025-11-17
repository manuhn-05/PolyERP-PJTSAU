"use client";
import ModuleCard from '@/components/(owner)/market-place/modules/_components/module-card';
import { useAddToSelectedModulesFromAvailableList, useDeleteSelectedModule, 
    useFetchAvailableModules, useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import { Box, Button, Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { Input } from '@chakra-ui/react'
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';
import UnselectModule from '@/components/(owner)/market-place/modules/_components/unselect-module';
import Link from 'next/link';
import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';

const AvailableModules = () => {
    const queryClient = useQueryClient();
    const { data: availableModulesData, refetch : refetchAvailableModules } = useFetchAvailableModules();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { selectedPolyhouse } = useAppSelector(state => state.polyhouse);
    const [isUnSelectModule, setIsUnSelectModule] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState<any>(null);
    // Selected Modules
    const { data: selectedModulesData, refetch : refetchSelectedModules } = useFetchSelectedModules(selectedPolyhouse?.value);
    const { mutateAsync: addToSelectedModulesFromAvailableList } = useAddToSelectedModulesFromAvailableList();
    const { mutateAsync: deleteSelectedModule } = useDeleteSelectedModule();



    useEffect(() => {
        refetchAvailableModules();
        refetchSelectedModules();
    }, [selectedPolyhouse?.value])
    // TODO - Make Add Selected Modules to accept the Array of object which consists of modules object
    async function handleModuleSelection(res: any) {
        try {
            const { _id, ...rest } = res;

            const response = await addToSelectedModulesFromAvailableList({
                polyhouse_id: `${selectedPolyhouse?.value}`,
                ...rest, isSelected: true

            })
            if (response?.status === HTTP_RESPONSE_CODES.CREATED) {
                queryClient.invalidateQueries({ queryKey: [`available_modules_list`] });
                queryClient.invalidateQueries({ queryKey: [`selected_modules_list`] });

            }


        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteSelectedModule(res: any) {
        try {
            const response = await deleteSelectedModule(res?._id);

            if (response?.status === HTTP_RESPONSE_CODES.OK) {
                queryClient.invalidateQueries({ queryKey: [`available_modules_list`] });
                queryClient.invalidateQueries({ queryKey: [`selected_modules_list`] });
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Open alert when user toggles switch OFF
    function handleDisplayWarning(module: any) {
        setModuleToDelete(module);
        setIsUnSelectModule(true);
    }

// Confirm deletion
async function confirmDelete() {

    if (moduleToDelete) {
        await handleDeleteSelectedModule(moduleToDelete);
        setIsUnSelectModule(false);
        setModuleToDelete(null);
    }
}
    function handleSearch(e: any) {
        setSearchTerm(e.target.value);
    }

    const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: T) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(...args);
            }, delay);
        }
    }

    const debounceSearch = debounce(handleSearch, 500);

    //  const filteredModulesData = availableModulesData?.data?.filter((module : any) => module?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredModulesData = availableModulesData?.data?.filter((module: any) => {
        const isInSelectedModules = selectedModulesData?.data?.some((selectedModule: any) => selectedModule?.path === module?.path);

        // Keep only modules NOT in DUMMY_MODULES and match search term
        return !isInSelectedModules && module?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    });


    return (
        <Container maxW={"100%"} className='w-full h-full shadow-md bg-white dark:bg-[#122031] p-[2%] rounded-lg text-[4vw] md:text-[2.2vw]'>
            <UnselectModule selectedModule={moduleToDelete} isOpen={isUnSelectModule} onClose={() => setIsUnSelectModule(false)} confirmDelete={confirmDelete}  />
            <article>
                <section className='flex items-center w-full justify-between mb-[2.5%]'>
                    <div>
                        <h2 className='text-[2.5vw] md:text-[1.5vw]'>Available Modules</h2>
                    </div>
                    <div className={`flex justify-between items-center md:w-[40%] border rounded-lg`}>
                        <Input placeholder='Search Modules'
                            sx={{ border: 'none', outline: 'none', }}
                            _focus={{ border: 'none', outline: 'none', ring: 'none' }}
                            onChange={debounceSearch}
                        />
                        <CiSearch className={`text-[#9CA3AF]`} />
                    </div>
                </section>
                <Box className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 `}>
                    {
                        filteredModulesData?.map((module: any) => (
                            <ModuleCard handleModuleSelection={(res: any) => handleModuleSelection(res)} key={module._id} module={module} />
                        ))
                    }
                </Box>
            </article>
            <article className={`my-[1.5%]`}>
                {selectedModulesData?.data?.length > 0 && (
                    <>
                        <div>
                            <h2 className='text-[2.5vw] md:text-[1.5vw]'>Selected Modules</h2>
                        </div>
                        <Box className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 `}>
                            {
                                selectedModulesData?.data?.map((module: any) => (
                                    <ModuleCard displayWarning={(module : any) => handleDisplayWarning(module)} isConigurable={true}
                                    handleModuleSelection={(res: any) => handleDeleteSelectedModule(res)} key={module._id} module={module} />
                                ))
                            }
                            <div className={`shadow-lg rounded-lg bg-[#f6f7f8] dark:bg-[#28466B] dark:text-white p-[2.5%] md:text-[0.5em] flex flex-col justify-between`}>
                            Looking for something specific? Build a custom module.
                            <Link href={`${CLIENT_ENDPOINTS?.CUSTOM_MODULE}`}>
                            {/*   todo :  Enable  Button for PolyERP */}
                           <Button disabled={true} colorScheme='blue'>
                           Create Here
                           </Button>
                            </Link>
                        </div>
                        </Box>
                        
                    </>
                )}
            </article>
        </Container>
    )
}

export default AvailableModules;
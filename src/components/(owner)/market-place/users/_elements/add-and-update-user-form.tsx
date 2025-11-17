import { ASSIGN_USER_FORM_TYPE, ASSIGN_USER_SCHEMA, ASSIGN_USER_TO_POLYHOUSE, POLYHOUSE_USER_TYPES } from '@/constants/market-place';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, SimpleGrid, Text } from "@chakra-ui/react";
import PolyhousesDropdown from "@/components/(owner)/market-place/polyhouse/_components/polyhouses-dropdown"
import Select from 'react-select';
import { useFetchSelectedModules } from '@/data-handling/queries/market-place-queries';
import AccessLevelCard from './access-level-card';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useTheme } from 'next-themes';
import { useDispatch } from 'react-redux';
import { setSelectedPolyhouse } from '@/data-handling/store/slices/polyhouse-slice';
import LoaderAnimation from '@/components/animation/loader';

type ASSIGN_USER_DROPDOWNS = {
  polyhouse_id?: string,
  user_type: string,
  access?: Array<any>,
}
type RegisterUserWithPolyhouseAndAssignThemProps = {
  INITIAL_VALUES: ASSIGN_USER_FORM_TYPE & ASSIGN_USER_DROPDOWNS,
  handleOnFormSubmit: (data: ASSIGN_USER_FORM_TYPE & ASSIGN_USER_DROPDOWNS) => void;
  isPending: boolean,
  isItUpdaingComponent: boolean,
}

const RegisterUserWithPolyhouseAndAssignThem: React.FC<RegisterUserWithPolyhouseAndAssignThemProps> = ({ INITIAL_VALUES, handleOnFormSubmit,
  isPending, isItUpdaingComponent }) => {
  const { selectedPolyhouse: selectedPolyhouseFromDropdown } = useAppSelector((store) => store.polyhouse);
  const { data: selectedModulesData, refetch: refetchSelectedModules } = useFetchSelectedModules(selectedPolyhouseFromDropdown?.value);
  const dispatch = useDispatch();

  // const [selectedPolyhouse, setSelectedPolyhouse] = useState<{label : string, value : string}>();
  const [accessLevelSelection, setAccessLevelSelection] = useState<any>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";



  //  TODO :As of Now All the available modules are used to give access - change it to selected modules when APIs are done;
  const [user_type, setUserType] = React.useState<{ label: string, value: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ASSIGN_USER_FORM_TYPE & ASSIGN_USER_DROPDOWNS>({
    resolver: zodResolver(ASSIGN_USER_SCHEMA as any),
    defaultValues: { ...INITIAL_VALUES },
    mode: "onTouched",
  });
  useEffect(() => {
    refetchSelectedModules();
    setValue("polyhouse_id", selectedPolyhouseFromDropdown?.value);
  }, [selectedPolyhouseFromDropdown]);


// If the user already exists, and we are trying update then it autofills the user_type in the Form 
  useEffect(() => {
    if (INITIAL_VALUES?.user_type) {
      const matched = POLYHOUSE_USER_TYPES.find(
        (type) => type.value === INITIAL_VALUES.user_type
      );
      if (matched) {
        setUserType(matched);
        setValue("user_type", matched.value);
      }
    }
  }, [INITIAL_VALUES, setValue]);

  async function handleFormSubmit(data: ASSIGN_USER_FORM_TYPE & ASSIGN_USER_DROPDOWNS) {
    const accessableRoutes = accessLevelSelection?.filter((access: any) => access.accessLevelGiven)
    handleOnFormSubmit({ ...data, access: accessableRoutes });
  }

  function handlePolyouseSelectionChange(data: { label: string, value: string }) {
    dispatch(setSelectedPolyhouse(data));
  }
  function handleUserTypeChange(data: any) {
    setUserType(data);
    setValue("user_type", data.value);
  }
  /**
  Handles access level initialization:
  - For a NEW user: all modules are included with accessLevelGiven = false and subAccessLevel = false.
  - For an EXISTING user: merges API modules with INITIAL_VALUES.access 
    so previously granted access levels are pre-populated.
    @param modulesFromApi - List of modules fetched from the API for a polyhouse
*/
  async function mergeUserAccessWithModules(modulesFromApi: any) {
    try {
      if (!Array.isArray(modulesFromApi)) return;

      const selectedModules = modulesFromApi
        .filter((module) => module?.isSelected)
        .map((module) => {
          const matchedAccess = INITIAL_VALUES?.access?.find(
            (access) => access?.mod_id === module?.mod_id
          );

          return {
            ...module,
            accessLevelGiven: !!matchedAccess,
            subAccessLevel: {
              create: !!matchedAccess?.subAccessLevel?.create,
              read: !!matchedAccess?.subAccessLevel?.read,
              update: !!matchedAccess?.subAccessLevel?.update,
              delete: !!matchedAccess?.subAccessLevel?.delete,
            },
          };
        });

      setAccessLevelSelection(selectedModules);
    } catch (error) {
      console.error("Error defining access levels:", error);
    }
  }

//  caches the mergeUserAccessWithModules function to avoid re-creation on every render
  const accessLevelConfigurator = useCallback(mergeUserAccessWithModules, [mergeUserAccessWithModules]);
  useEffect(() => {
    accessLevelConfigurator(selectedModulesData?.data);
  }, [selectedModulesData?.data]);

  function handleUserLevelAccess(moduleIndex: number, subAccessId = null) {
    const updatedAccessLevelSelection: any = [...accessLevelSelection];

    if (subAccessId === null) {
      // Toggle the main module access level
      const currentAccess = updatedAccessLevelSelection[moduleIndex]?.accessLevelGiven;
      updatedAccessLevelSelection[moduleIndex].accessLevelGiven = !currentAccess;

      // Sync all sub-access levels to match the main module toggle
      Object.keys(updatedAccessLevelSelection?.[moduleIndex].subAccessLevel).forEach((key) => {
        updatedAccessLevelSelection[moduleIndex].subAccessLevel[key] = !currentAccess;
      });
    } else {
      // Toggle specific sub-access level
      const currentSubAccess = updatedAccessLevelSelection[moduleIndex].subAccessLevel[subAccessId];
      updatedAccessLevelSelection[moduleIndex].subAccessLevel[subAccessId] = !currentSubAccess;

      // Check if any sub-access level is true to keep the main access on
      const anySubAccessGiven = Object.values(updatedAccessLevelSelection[moduleIndex].subAccessLevel).some(
        (access) => access
      );
      updatedAccessLevelSelection[moduleIndex].accessLevelGiven = anySubAccessGiven;
    }

    setAccessLevelSelection(updatedAccessLevelSelection);
  }
  return (
    <article>
      <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
        <section className='grid md:grid-cols-2 gap-[2%] my-[2%]'>
          {
            ASSIGN_USER_TO_POLYHOUSE?.map((item: any) => {
              const fieldName = `${item?.name}` as keyof ASSIGN_USER_FORM_TYPE;
              return (
                <div key={item?.name}>
                  <label htmlFor={`${item?.name}`}>{item.label}</label>
                  <Input
                    className="border-none outline-none ring-0 focus:ring-0"
                    {...register(fieldName)}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                    required={item.required}
                  />
                  {errors?.[fieldName] && <p className="text-red-500 md:text-[0.8em]">{errors?.[fieldName]?.message}</p>}
                </div>
              )
            })
          }
          <div>
            <label htmlFor="polyhouse_id">Select Polyhouse</label>
            <PolyhousesDropdown handleSelectOption={handlePolyouseSelectionChange} placeHolder="Select a polyhouse"
              selectedPolyhouse={selectedPolyhouseFromDropdown} />
          </div>
          <div>
            <label htmlFor="user_type">Select User Type</label>
            <Select
              styles={SELECT_COMPONENT_STYLES(isDarkMode)}
              options={POLYHOUSE_USER_TYPES} // Pass the defined options
              onChange={(selectedOption) => handleUserTypeChange(selectedOption)} // Update state on selection change
              value={user_type} // Control the selected value
              placeholder={`${"Select user type"}`} // Optional placeholder text
              className='border rounded-lg'
            />
            {errors?.[`user_type`] && <p className="text-red-500 md:text-[0.8em]">{errors?.[`user_type`]?.message}</p>}
          </div>
        </section>
        <section>

          <div className='w-full py-[2%]'>
            <Text className='font-bold text-[1.5em]'>Access Levels</Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={'0.5em'} my={'0.5em'}>
              {accessLevelSelection?.map((module: any, moduleIndex: number) => {

                return (
                  <AccessLevelCard
                    key={moduleIndex}
                    {...module}
                    moduleIndex={moduleIndex}
                    handleUserLevelAccess={handleUserLevelAccess}
                  />
                )
              })}

            </SimpleGrid>

          </div>
        </section>
        <div className={`flex my-[3.5%] ${isItUpdaingComponent ? 'justify-end' : 'justify-start'}`}>
          <Button disabled={isPending} className={`disabled:bg-opacity-40 bg-[#6BBBE9] text-white`} 
          color={"#FFF"} bg={"#6BBBE9"} type='submit'>Save</Button>
          {
            isPending && (
              <LoaderAnimation />
            )
          }
        </div>
      </form>
    </article>
  )
}

export default RegisterUserWithPolyhouseAndAssignThem;
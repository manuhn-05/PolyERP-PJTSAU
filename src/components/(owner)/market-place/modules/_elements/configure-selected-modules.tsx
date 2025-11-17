"use client";
import { MODULE_LAYOUT_COMPONENTS_MAP, MODULE_LAYOUT_FIELDS_SELECTOR } from '@/components/selected-modules/_components/constants';
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef, useState } from 'react';
import { SlSettings } from "react-icons/sl";
import { IoMdCloseCircle } from 'react-icons/io';
import Select from 'react-select';
import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useTheme } from 'next-themes';
import { Box } from '@chakra-ui/react';


type ModuleField = {
  key: string;
  label: string;
  required?: boolean;
  type: "text" | "select" | "date" | "time";
  options?: any[];
  multi?: boolean;
};

type ModuleForm = {
  fields: ModuleField[];
  validation?: Record<string, unknown>;
};

type ModuleLayoutComponent = {
  type: string;
  props: Record<string, unknown>;
  search?: string[];
};

type ConfigurableModule = {
  _id: string;
  title: string;
  path: string;
  desc: string;
  layout: ModuleLayoutComponent[];
  form: ModuleForm;
};

type GroupComponent = {
  type: string;
  checked: boolean;
  selectedFields?: string[];
};

type Group = {
  id: number;
  components: GroupComponent[];
};


// Initialize a component list with checked = false
// Initialize a component list with checked = true if it exists in configurableModule.layout
const initComponentList = (path: string, layout: any[] = []) => {

  return MODULE_LAYOUT_COMPONENTS_MAP?.[`${path}`]?.map((c: any) => {
    const matchedComp = layout.find((comp: any) => comp.type === c.type);
    return {
      ...c,
      checked: !!matchedComp,
      selectedFields: matchedComp?.props?.fields || matchedComp?.props?.tableHeaders || []
    };
  });
};


type ConfigurableModuleProps = {
  configurableModule: any;
  handleSubmitModuleConfiguration(val : any) : void
}
const ConfigureSelectedModule : React.FC<ConfigurableModuleProps> = ({configurableModule, handleSubmitModuleConfiguration}) => {
  const modalRef = useRef<ModalWindowRef>(null);
  const [selectedSearchFields, setSelectedSearchFields] = useState<any[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";


 
const [requiredFields, setRequiredFields] = useState<
{ key: string; required: boolean }[]
>(() =>
configurableModule?.form?.fields?.map((field : any) => ({
  key: field.key,
  required: field.required ?? false,
})) || []
);
  

  const [groups, setGroups] = useState([
    {
      id: Date.now(),
      components: initComponentList(
        `${configurableModule?.path}`,
        configurableModule?.layout || [] // <-- pass existing layout
      ),
    },
  ]);
  

  // Toggle checkbox inside a group
  const handleCheckboxChange = (groupId: number, type: string) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              components: group.components.map((comp: any) =>
                comp.type === type ? { ...comp, checked: !comp.checked } : comp
              ),
            }
          : group
      )
    );
  };

  // Add new group
  const addAnotherSelector = () => {
    setGroups(prev => [
      ...prev,
      { id: Date.now(), components: initComponentList(`${configurableModule?.path}`) },
    ]);
  };

  // Delete a group
  const deleteGroup = (groupId: number) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
  };

  // Submit (send to server)
  const handleSubmit = (): void => {
    const modulePath = configurableModule?.path;
    const searchFields = selectedSearchFields.map(
      (field: { value: string }) => field.value
    );
  
    // Merge updated required fields
    const updatedFields: ModuleField[] =
      configurableModule?.form?.fields?.map((field : any) => {
        const requiredInfo = requiredFields.find((f) => f.key === field.key);
        return {
          ...field,
          required: requiredInfo?.required ?? field.required,
        };
      }) || [];
  
    // Build final layout
    const finalConfig: { id: number; components: ModuleLayoutComponent[] }[] =
      groups.map((group) => ({
        id: group.id,
        components: group.components
          .filter((comp: any) => comp.checked)
          .map((comp: any) => {
            const selector =
              MODULE_LAYOUT_FIELDS_SELECTOR?.[modulePath]?.[comp.type];
  
            if (!selector) return { type: comp.type, props: {} };
  
            if (comp.type === "table") {
              return {
                type: "table",
                props: { tableHeaders: selector.tableHeaders || [], data: [] },
                search: [...searchFields],
              };
            }
  
            if (comp.type === "card") {
              return {
                type: "card",
                props: { cardHeaders: selector.cardHeaders || [], data: [] },
                search: [...searchFields],
              };
            }
  
            const propKey = Object.keys(selector)[0] as string;
  
            return {
              type: comp.type,
              props: {
                [propKey]: comp.selectedFields || selector[propKey] || [],
              },
            };
          }),
      }));
  
    // ✅ Create final data object
    const final_data = {
      layout: finalConfig?.[0]?.components || [],
      form: {
        ...configurableModule.form,
        fields: updatedFields,
      },
    };
  
    // ✅ Pass entire object now
    handleSubmitModuleConfiguration(final_data);
  
    modalRef.current?.closeModal();
  };
  
  
  
  // Let User Selects which fields are mandatory and this function will handle check and uncheck
  const handleRequiredToggle = (key: string) => {
    setRequiredFields((prev:any) =>
      prev.map((field:any) =>
        field.key === key ? { ...field, required: !field.required } : field
      )
    );
  };
  
function handleSearchFieldSelection(selectedOptions: any) {
  setSelectedSearchFields(selectedOptions);
}

const fieldsList = configurableModule?.layout?.find((comp: any) => comp.type === 'table')?.props?.tableHeaders

  return (
    <div className="w-full h-full text-[4vw] md:text-[2.2vw]">
      <ModalWindow
      ref={modalRef}
        CloseComponent={IoMdCloseCircle}
        openButtonClassName="text-[#6BBBE9] lg:text-[0.7em]"
        OpenComponent={SlSettings}
        closeButtonClassName="text-[#FF0000] lg:text-[0.7em]"
        title={`Configure Selected Module - ${configurableModule?.title}`}
        modalClassName={`w-[70%] h-[80%] mt-[3%] overflow-y-auto dark:bg-[#122031]`}
      >
        <section className="w-full h-full md:text-[0.5em]">
          <div className="flex justify-between items-center">
            <h2>Available Components</h2>
            {/* TODO : Uncomment when seed to add extra section of selectors when done with backend logic */}
            {/* <button
              onClick={addAnotherSelector}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Add Another
            </button> */}
          </div>

          <div className="grid md:grid-cols-2 gap-[2%]">
            {groups.map((group, index) => (
              <div
                key={group.id}
                className="border p-3 rounded-md shadow relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    Selector {index + 1}
                  </h3>
                  {groups.length > 1 && (
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>

             <div className={`flex justify-evenly flex-wrap gap-[1.5%]`}>
             {group?.components?.map((comp: any) => (
                  <label key={comp.type} htmlFor={comp.type} className="block capitalize">
                    <input
                      type="checkbox"
                      name={comp.type}

                      id={comp.type}
                      checked={comp.checked}
                      onChange={() =>
                        handleCheckboxChange(group.id, comp.type)
                      }
                      className="mr-2"
                    />
                    {comp.type}
                  </label>
                ))}
            
             </div>
              </div>
            ))}
          </div>
          <div>
            <h3>Configure Layout</h3>
            <span>Select fields for searching and filtering <span className={`md:text-[0.65em]`}>(Only for Table and Card Element)</span></span>
            <div className='md:w-[40%]'>
              <Select
                className='border rounded-lg'
                isMulti
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                options={fieldsList} // Pass the defined options
                onChange={(selectedOption: any) => handleSearchFieldSelection(selectedOption)} // Update state on selection change
                value={selectedSearchFields} // Control the selected value
                placeholder={`Select Fields`} // Optional placeholder text
              />


            </div>

          </div>

          <Box>
  <p className="font-semibold">Mark Mandatory Fields</p>
  <div className="w-full grid md:grid-cols-3 gap-2 mt-2">
    {configurableModule?.form?.fields?.map((field: any) => {
      const isChecked = requiredFields.find(f => f.key === field.key)?.required;
      return (
        <div key={field.key}  className="flex items-center">
          <input
            type="checkbox"
            id={field.key}
            name={field.key}
            checked={isChecked}
            disabled={field.disabled}
            onChange={() => handleRequiredToggle(field.key)}
            className="mr-2 "
          />
          <label htmlFor={field.key}>{field.label}</label>
        </div>
      );
    })}
  </div>
</Box>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="px-3 py-2 bg-green-600 text-white rounded md:text-[0.65em]"
            >
              Save Configuration
            </button>
          </div>
        </section>
        {/* <section>
          <div>
            <h3>Configure Fields</h3>
          </div>
          
        </section> */}
      </ModalWindow>
    </div>
  );
};

export default ConfigureSelectedModule;

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import {
  useDeleteDataAsPerEndpoint,
  useFetchDataAsPerEndpoint,
} from "@/data-handling/queries/dynamic-component-queries";
import { SELECT_COMPONENT_STYLES } from "@/constants/styles";
import { useTheme } from "next-themes";
import { Box, Button, Input } from "@chakra-ui/react";
import CreateNewTool from "@/components/modules/tools/_components/create-new-tool";

import { MdDelete } from "react-icons/md";
import ModalWindow, { ModalWindowRef } from "@/components/modal/ModalWindow";

import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { HTTP_RESPONSE_CODES } from "@/data-handling/endpoints/server-endpoints";
import {
  TOOL_AVAILABILITY_STATUS,
  TOOL_MAINTENANCE_INTERVAL,
} from "@/components/modules/tools/_components/tools-constants";

export type ToolItem = {
  _id: string;
  type: string;
  count?: string;
  availability_status?: { value: string; label: string };
  maintenance_interval?: { value: string; label: string };
  isCustomTool?: boolean;
  [key: string]: any; // 👈 allows additional properties without TS error
};


export type FormDataState = {
  [category: string]: ToolItem[];
};

type Props = {
  handleModalCloseFromParent: () => void;
};

const ToolsPage: React.FC<Props> = ({ handleModalCloseFromParent }) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  }>({ value: "irrigation_tools", label: "Irrigation Tools" });

  const modalRef = useRef<ModalWindowRef>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCustomTool } = useDeleteDataAsPerEndpoint(
    `${selectedCategory?.value}`
  );
  const [formData, setFormData] = useState<FormDataState>({});
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const { data: listOfInventoryItems } = useFetchDataAsPerEndpoint(
    ``,
    `inventory`
  );
  const {
    data: availableToolsAndEquipments,
    refetch: refetchToolsAndEquipmentList,
  } = useFetchDataAsPerEndpoint(``, `${selectedCategory?.value}`);

  // ✅ Refetch whenever category changes
  useEffect(() => {
    refetchToolsAndEquipmentList();
  }, [selectedCategory]);

  // ✅ Initialize formData for the selected category
  useEffect(() => {
    if (!availableToolsAndEquipments?.data) return;

    setFormData((prev) => {
      if (prev[selectedCategory.value]) return prev;

      return {
        ...prev,
        [selectedCategory.value]: availableToolsAndEquipments.data.map(
          (tool: ToolItem) => ({
            ...tool,
            count: "",
            availability_status: TOOL_AVAILABILITY_STATUS[0],
            maintenance_interval: TOOL_MAINTENANCE_INTERVAL[0],
          })
        ),
      };
    });
  }, [selectedCategory, availableToolsAndEquipments]);

  // ✅ Handle count change per tool
  const handleChange = (id: string, value: string) => {
    setFormData((prev) => {
      const updatedCategoryData = prev[selectedCategory.value]?.map((tool) =>
        tool._id === id ? { ...tool, count: value } : tool
      );

      return { ...prev, [selectedCategory.value]: updatedCategoryData };
    });
  };

  // ✅ Handle status change per tool
  const handleStatusChange = (toolId: string, selectedStatus: any) => {
    setFormData((prev) => {
      const updatedCategoryData = prev[selectedCategory.value]?.map((tool) =>
        tool._id === toolId
          ? { ...tool, availability_status: selectedStatus }
          : tool
      );

      return { ...prev, [selectedCategory.value]: updatedCategoryData };
    });
  };

  // ✅ Handle interval change per tool
  const handleIntervalChange = (toolId: string, selectedInterval: any) => {
    setFormData((prev) => {
      const updatedCategoryData = prev[selectedCategory.value]?.map((tool) =>
        tool._id === toolId
          ? { ...tool, maintenance_interval: selectedInterval }
          : tool
      );

      return { ...prev, [selectedCategory.value]: updatedCategoryData };
    });
  };

  const handleFinalSubmit = () => {
    const currentCategory = selectedCategory.value;
    const tools = formData[currentCategory] || [];

    const modifiedTools = tools
      .map((tool) => ({
        ...tool,
        availability_status: tool.availability_status?.value,
        maintenance_interval: tool.maintenance_interval?.value,
      }))
      .filter((tool) => tool.count && tool.count !== "");

    console.log("FINAL PAYLOAD:", { [currentCategory]: modifiedTools });

    // TODO: send modifiedTools to backend here
  };

  const memoizeInventoryItemList = useMemo(() => {
    return listOfInventoryItems?.data?.[0]?.inventory_items.map(
      (item: string) => ({
        value: item,
        label:
          `${item?.split("_").join(" ")}`?.slice(0, 1).toUpperCase() +
          `${item?.split("_").join(" ")}`?.slice(1),
      })
    );
  }, [listOfInventoryItems]);

  async function handleDeleteCustomTool(item_id: string) {
    try {
      const response = await deleteCustomTool(`${item_id}`);
      if (response?.status === HTTP_RESPONSE_CODES.OK) {
        queryClient.invalidateQueries({
          queryKey: [`${selectedCategory?.value}`],
        });
        modalRef.current?.closeModal();
        handleModalCloseFromParent();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="p-6 space-y-6">
      {/* Category Selector */}
      <section className="flex justify-between items-center">
        <Select
          styles={SELECT_COMPONENT_STYLES(isDarkMode)}
          options={memoizeInventoryItemList}
          onChange={(selectedOption: any) => setSelectedCategory(selectedOption)}
          value={selectedCategory}
          placeholder="Select category"
          className="border rounded-lg"
        />
        <CreateNewTool
          handleModalCloseFromParent={handleModalCloseFromParent}
          path={selectedCategory?.value}
        />
      </section>

      {/* Tools List */}
      <form onSubmit={(e) => e.preventDefault()}>
        <section className="md:min-h-[55dvh] overflow-y-auto element">
          {selectedCategory && formData[selectedCategory.value] && (
            <div className="grid md:grid-cols-2 gap-[1.5%]">
              {formData[selectedCategory?.value].map((tool) => {
                const tool_name =
                  tool?.name || tool.fertilizer_name || tool?.generic_name;
                const tool_description =  tool?.description || tool?.mode_of_action;

                return (
                  <div
                    key={tool._id}
                    className="flex max-md:flex-col items-center justify-between mb-3 border-b pb-2"
                  >
                    <section className="w-full">
                      <div className="md:text-[0.4em] w-full">
                        <p className="font-medium">{tool_name}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {tool_description}
                        </p>
                      </div>

                      <Box className="w-full">
                        <div className="md:w-[70%]">
                          <Input
                            type="number"
                            min="0"
                            value={tool.count ?? ""}
                            onChange={(e) => handleChange(tool._id, e.target.value)}
                            placeholder="Enter count"
                            className="border rounded w-full"
                          />
                        </div>

                        {/* Per-tool dropdowns */}
                        <Box className="flex w-full gap-[1.5%]">
                          <div className="w-full">
                            <label
                              className="md:text-[0.375em]"
                              htmlFor="availability_status"
                            >
                              Availability Status
                            </label>
                            <Select
                              styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                              options={TOOL_AVAILABILITY_STATUS}
                              onChange={(selectedOption: any) =>
                                handleStatusChange(tool._id, selectedOption)
                              }
                              value={
                                tool.availability_status ??
                                TOOL_AVAILABILITY_STATUS[0]
                              }
                            />
                          </div>

                          <div className="w-full">
                            <label
                              className="md:text-[0.375em]"
                              htmlFor="maintenance_interval"
                            >
                              Maintenance Interval
                            </label>
                            <Select
                              styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                              options={TOOL_MAINTENANCE_INTERVAL}
                              onChange={(selectedOption: any) =>
                                handleIntervalChange(tool._id, selectedOption)
                              }
                              value={
                                tool.maintenance_interval ??
                                TOOL_MAINTENANCE_INTERVAL[0]
                              }
                            />
                          </div>
                        </Box>
                      </Box>
                    </section>

                    {/* Delete button for custom tools */}
                    {tool?.isCustomTool && (
                      <div className="md:text-[0.6em] flex items-center h-full">
                        <ModalWindow
                          OpenComponent={MdDelete}
                          openButtonClassName="text-red-500 hover:text-red-800 bg-transparent rounded-md cursor-pointer bg-none"
                          CloseComponent={IoCloseCircle}
                          title="Delete !"
                          titleStyles="md:text-[1.15em]"
                          isItButton={false}
                          buttonText="Configure"
                          modalClassName="md:w-[30%] dark:bg-[#122031] md:h-[30dvh] overflow-y-auto"
                          ref={modalRef}
                        >
                          <section className="flex flex-col justify-between h-full">
                            <p className="md:text-[0.75em]">
                              Are you sure you want to delete this tool
                            </p>
                            <div className="flex justify-between md:w-[40%] mx-auto">
                              <Button
                                onClick={() => modalRef.current?.closeModal()}
                              >
                                Cancel
                              </Button>

                              <Button
                                bg="#FF0000"
                                color="#FFF"
                                onClick={() => handleDeleteCustomTool(tool._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </section>
                        </ModalWindow>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Submit Button */}
        <div className="my-[3%]">
          <Button
            onClick={handleFinalSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            bg="#6BBBE9"
            color="#FFF"
            _dark={{ bg: "#6BBBE9", color: "#FFF" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </article>
  );
};

export default ToolsPage;

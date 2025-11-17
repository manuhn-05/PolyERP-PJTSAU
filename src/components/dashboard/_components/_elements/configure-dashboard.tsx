import React, { useState } from "react";
import { GrConfigure } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import ModalWindow from "@/components/modal/ModalWindow";
import { useFetchSelectedModules } from "@/data-handling/queries/market-place-queries";
import { useAppSelector } from "@/data-handling/store/hooks/redux-hooks";

const chartTypes = ["Pie", "Bar", "Line", "Donut", "Column"];

const ConfigureDashboardModal = () => {
  const { selectedPolyhouse } = useAppSelector((state) => state.polyhouse);
  const { data: selectedModules } = useFetchSelectedModules(
    `${selectedPolyhouse?.value}`
  );

  const [config, setConfig] = useState<any[]>([]);

  // ✅ Add / Update Chart for a Module
  const updateModuleConfig = (moduleId: string, chartIndex: number, key: string, value: any) => {
    setConfig((prev) =>
      prev.map((mod) =>
        mod.moduleId === moduleId
          ? {
              ...mod,
              charts: mod.charts.map((chart :any, idx : number) =>
                idx === chartIndex ? { ...chart, [key]: value } : chart
              ),
            }
          : mod
      )
    );
  };

  // ✅ Add new Chart to a Module
  const addChartToModule = (moduleId: string) => {
    setConfig((prev) =>
      prev.map((mod) =>
        mod.moduleId === moduleId
          ? { ...mod, charts: [...mod.charts, { chartType: "", fields: [] }] }
          : mod
      )
    );
  };

  // ✅ Toggle Module Selection
  const toggleModule = (module: any) => {
    setConfig((prev) => {
      if (prev.find((m) => m.moduleId === module._id)) {
        return prev.filter((m) => m.moduleId !== module._id); // remove
      } else {
        return [
          ...prev,
          { moduleId: module._id, moduleTitle: module.title, charts: [] },
        ]; // add
      }
    });
  };

  const handleSubmit = () => {
    console.log("Final Dashboard Config:", config);
    // 🔥 Send to server via mutation
  };

  return (
    <ModalWindow
      OpenComponent={GrConfigure}
      CloseComponent={IoMdCloseCircle}
      title="Configure Dashboard"
      isItButton={true}
      buttonText="Configure"
      bothIconAndNameNeeded={true}
      openButtonClassName={`text-white`}
      modalClassName={`md:w-[70%] w-[90%]`}
      closeButtonClassName={`md:text-red-500 text-2xl hover:text-red-800 cursor-pointer hover:scale-105`}
    >
      <section>
        {selectedModules?.data?.map((module: any) => {
          const isSelected = config.some((m) => m.moduleId === module._id);

          return (
            <div key={module._id} className="border p-3 mb-3 rounded">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleModule(module)}
                />
                {module.title}
              </label>

              {isSelected &&
                config
                  .find((m) => m.moduleId === module._id)
                  ?.charts.map((chart : any, chartIndex : number) => (
                    <div
                      key={chartIndex}
                      className="ml-6 mt-3 p-3 border rounded bg-gray-50"
                    >
                      {/* Chart Type */}
                      <select
                        value={chart.chartType}
                        onChange={(e) =>
                          updateModuleConfig(module._id, chartIndex, "chartType", e.target.value)
                        }
                      >
                        <option value="">Select Chart</option>
                        {chartTypes.map((ct) => (
                          <option key={ct} value={ct.toLowerCase()}>
                            {ct}
                          </option>
                        ))}
                      </select>

                      {/* Field Selection (replace with react-select later) */}
                      <input
                        type="text"
                        placeholder="Enter fields (comma separated)"
                        value={chart.fields.join(",")}
                        onChange={(e) =>
                          updateModuleConfig(
                            module._id,
                            chartIndex,
                            "fields",
                            e.target.value.split(",").map((f) => f.trim())
                          )
                        }
                        className="ml-3 border px-2 py-1"
                      />
                    </div>
                  ))}

              {isSelected && (
                <button
                  className="ml-6 mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => addChartToModule(module._id)}
                >
                  + Add Chart
                </button>
              )}
            </div>
          );
        })}
      </section>

      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleSubmit}
        >
          Save Config
        </button>
      </div>
    </ModalWindow>
  );
};

export default ConfigureDashboardModal;

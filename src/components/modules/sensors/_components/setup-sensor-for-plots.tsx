// import PlotsDropdownBasedOnPolyhouse from "@/components/(owner)/market-place/polyhouse-plots/_components/plots-dropdown-based-polyhouse";
// import { DUMMY_PLOT_LISTS } from "@/constants/dummy-modules";
import PolyhousesDropdown from "@/components/(owner)/market-place/polyhouse/_components/polyhouses-dropdown";
import { Input } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type ThresholdField = {
    key: string;
    label: string;
    type: string;
    unit?: string;
};

type OptionWithThresholds = {
    value: string;
    sensor_type: string;
    thresholds?: ThresholdField[];
};

type FormField = {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    editable?: boolean;
    options?: OptionWithThresholds[];
};

type ConfigureSensorsInPolyhouseProps = {
    pathname: string;
    selectedModule: { form: { fields: FormField[] } };
    handleFormSubmission: (data: any) => void;
};

const SetupSensorForSensor: FC<ConfigureSensorsInPolyhouseProps> = ({
    handleFormSubmission,
    pathname,
    selectedModule,
}) => {
    const [formsFields, setFormsFields] = useState<any[]>([]);
    const [selectedPlot, setSelectedPlot] = useState<any>(null);


    function handlePlotSelection(plot: any) {
        setSelectedPlot(plot);
    }
    // Initialize default form fields
    useEffect(() => {
        if (!selectedModule?.form?.fields) return;

        const initialForm = selectedModule?.form?.fields?.reduce((acc: any, field) => {
            acc[field.key] = "";
            return acc;
        }, {});

        setFormsFields([initialForm]);
    }, [selectedModule]);

    const handleChange = (index: number, key: string, value: any) => {
        setFormsFields((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };

            return updated;
        });
    };

    useEffect(() => {
        if (!selectedPlot) return;

        setFormsFields(prev =>
            prev.map(form => ({
                ...form,
                polyhouse_id: selectedPlot?.value, // adapt based on your structure
            }))
        );
    }, [selectedPlot]);

    const removeForm = (index: number) => {
        setFormsFields((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmitAll = () => {
        const formsWithPolyhouseId = formsFields.map(form => ({
            ...form,
            polyhouse_id: selectedPlot?.value
        }));
        handleFormSubmission(formsWithPolyhouseId);
    };

    const addNewForm = () => {
        if (!selectedModule?.form?.fields) return;

        const newForm = selectedModule.form.fields.reduce((acc: any, field) => {
            acc[field.key] = "";
            return acc;
        }, {});
        
        if (selectedPlot?.value) {
            newForm.polyhouse_id = selectedPlot.value;
        }

        setFormsFields((prev) => [...prev, newForm]);
    };

    const renderField = (field: FormField, formIndex: number) => {
        const value = formsFields?.[formIndex]?.[field.key];

        switch (field?.type) {
            case "text":
            case "date":
            case "number":
            case "email":
                return (
                    <Input
                        type={field?.type}
                        value={value}
                        onChange={(e) => handleChange(formIndex, field.key, e.target.value)}
                        className="border w-full p-2 rounded-md text-sm"
                        placeholder={field?.label}
                    />
                );

            case "select":
                return (
                    <select
                        value={value}
                        onChange={(e) => handleChange(formIndex, field.key, e.target.value)}
                        className="border w-full p-2 rounded-md text-sm"
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt, idx) => (
                            <option key={idx} value={opt.value}>
                                {opt.sensor_type || opt.value}
                            </option>
                        ))}
                    </select>
                );

            default:
                return null;
        }
    };

    const renderThresholdFields = (sensorType: string, formIndex: number) => {
        const sensorField = selectedModule.form.fields.find(
            (f) => f.key === "sensor_type"
        );
        const selectedOption = sensorField?.options?.find(
            (opt) => opt.value === sensorType
        );
        const thresholds = selectedOption?.thresholds;

        if (!thresholds?.length) return null;

        return (
            <div className="mt-3 border-t pt-3">
                <h5 className="font-medium text-xs mb-2 text-gray-600">
                    {selectedOption?.sensor_type} Thresholds
                </h5>

                <div className="grid grid-cols-1 gap-2">
                    {thresholds.map((param) => (
                        <div
                            key={param.key}
                            className="border p-2 rounded-md grid grid-cols-3 items-center gap-2"
                        >
                            <span className="text-xs font-medium">
                                {param.label} {param.unit && <span>({param.unit})</span>}
                            </span>

                            <input
                                type={param.type}
                                placeholder="Min"
                                value={formsFields[formIndex]?.[`${param.key}_min`] || ""}
                                onChange={(e) =>
                                    handleChange(formIndex, `${param.key}_min`, e.target.value)
                                }
                                className="border p-1 rounded-md text-xs w-full"
                            />

                            <input
                                type={param.type}
                                placeholder="Max"
                                value={formsFields[formIndex]?.[`${param.key}_max`] || ""}
                                onChange={(e) =>
                                    handleChange(formIndex, `${param.key}_max`, e.target.value)
                                }
                                className="border p-1 rounded-md text-xs w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <article>
            <div>
                {/* todo : Uncomment when backend sccepts multiple sensors at a time */}
                {/* <button
                    type="button"
                    onClick={addNewForm}
                    className="bg-blue-500 text-white rounded-md px-3 py-1 text-sm mb-3"
                >
                    + Add Another Sensor
                </button> */}
                <div className={"mb-3 md:w-[50%]"}>
                    {/* <PlotsDropdownBasedOnPolyhouse isLabelNeeded={true} listOfPlots={DUMMY_PLOT_LISTS} onPlotSelection={handlePlotSelection} selectedPlot={selectedPlot} /> */}

                    <PolyhousesDropdown handleSelectOption={handlePlotSelection} placeHolder={"Select a polyhouse"} selectedPolyhouse={selectedPlot} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {formsFields.map((form, index) => {
                        const selectedSensorType = form.sensor_type; // ✅ now correctly defined per form

                        return (
                            <div key={index} className="border p-3 rounded-md relative">
                                <h4 className="font-semibold mb-2 text-sm">
                                    Sensor {index + 1}
                                </h4>


                                {selectedModule.form.fields.map((field) => (
                                    <div className="mb-2" key={field.key}>
                                        <label className="block text-xs mb-1">{field.label}</label>
                                        {renderField(field, index)}
                                    </div>
                                ))}

                                {/* ✅ Conditionally render threshold fields */}
                                {selectedSensorType &&
                                    renderThresholdFields(selectedSensorType, index)}

                                {formsFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeForm(index)}
                                        className="absolute top-2 right-2 text-red-500 text-xs"
                                    >
                                        ✕ Remove
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleSubmitAll}
                    className="bg-green-500 text-white rounded-md px-4 py-2 mt-4 text-sm"
                >
                    Submit All
                </button>
            </div>
        </article>
    );
};

export default SetupSensorForSensor;

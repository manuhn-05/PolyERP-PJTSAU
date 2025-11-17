"use client";
import React, { useState } from "react";
import type { CustomModuleSchema, FieldType, TableHeader } from "@/types/custom-module";
import ModulePreview from "@/components/(owner)/market-place/modules/custom-module/module-preview";

const fieldTypes: FieldType[] = ["text", "number", "date", "dropdown"];

type CustomModuleBuilderProps = {
    handleCustomModuleSave: (schema: CustomModuleSchema) => void;
}

const CustomModuleBuilder: React.FC<CustomModuleBuilderProps> = ({ handleCustomModuleSave }) => {
    const [layoutType, setLayoutType] = useState<"table" | "card">("table");

  const [step, setStep] = useState<number>(1);

  // Step 1
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  // Step 2
  const [fields, setFields] = useState<TableHeader[]>([]);
  const [fieldLabel, setFieldLabel] = useState<string>("");
  const [fieldType, setFieldType] = useState<FieldType>("text");

  // Step 3
  const [searchFields, setSearchFields] = useState<string[]>([]);

  // Add new field
  const handleAddField = () => {
    if (!fieldLabel.trim()) return;

    const key = fieldLabel.toLowerCase().replace(/\s+/g, "_");

    const newField: TableHeader = {
      key,
      label: fieldLabel,
      value: key,
      type: fieldType,
    };

    setFields((prev) => [...prev, newField]);

    setFieldLabel("");
    setFieldType("text");
  };

  // Build final schema
  const buildSchema = (): CustomModuleSchema => {
    const path = title.toLowerCase().replace(/\s+/g, "_");
  
    const base = {
      title,
      desc,
      isSelected: true,
      path,
      polyhouse_id: "auto-set",
    };
  
    if (layoutType === "table") {
      return {
        ...base,
        layout: [
          {
            type: "table",
            props: { data: [], tableHeaders: fields },
            search: searchFields,
          },
        ],
      };
    }
  
    return {
      ...base,
      layout: [
        {
          type: "card",
          props: { fields },
        },
      ],
    };
  };
  

  return (
    <div className="p-6 max-w-2xl mx-auto bg-[#efeeee] rounded-xl shadow-md">
          {step === 1 && (
              <div>
                  <h2 className="text-xl font-bold mb-4">Step 1: Module Details</h2>
                  <input
                      className="border p-2 w-full mb-3"
                      placeholder="Module Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                      className="border p-2 w-full mb-3"
                      placeholder="Module Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                  />
                  <div className="mb-3">
                      <label className="block font-semibold mb-1">Select Layout Type</label>
                      <select
                          className="border p-2 w-full"
                          value={layoutType}
                          onChange={(e) => setLayoutType(e.target.value as "table" | "card")}
                      >
                          <option value="table">Table</option>
                          <option value="card">Card</option>
                      </select>
                  </div>
                  <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => setStep(2)}
                      disabled={!title || !desc}
                  >
                      Next
                  </button>
              </div>
          )}


      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Add Fields</h2>
          <div className="flex gap-2 mb-3">
            <input
              className="border p-2 flex-1"
              placeholder="Field Label"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
            />
            <select
              className="border p-2"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value as FieldType)}
            >
              {fieldTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              className="bg-green-500 text-white px-3 rounded"
              onClick={handleAddField}
            >
              Add
            </button>
          </div>

          <ul className="mb-4">
            {fields.map((f, i) => (
              <li key={i} className="border-b py-1">
                {f.label} ({f.type})
              </li>
            ))}
          </ul>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(3)}
            disabled={fields.length === 0}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Step 3: Select Searchable Fields
          </h2>
          <div className="space-y-2 mb-4">
            {fields.map((f) => (
              <label key={f.key} className="block">
                <input
                  type="checkbox"
                  checked={searchFields.includes(f.key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSearchFields((prev) => [...prev, f.key]);
                    } else {
                      setSearchFields((prev) =>
                        prev.filter((s) => s !== f.key)
                      );
                    }
                  }}
                />{" "}
                {f.label}
              </label>
            ))}
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(4)}
          >
            Next
          </button>
        </div>
      )}

{step === 4 && (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 4: Preview</h2>
    <ModulePreview schema={buildSchema()} />
    <button
      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      onClick={() => {
        const schema = buildSchema();
        handleCustomModuleSave(schema); // Call the parent component's function( schema);

      }}
    >
      Save Module
    </button>
  </div>
)}

    </div>
  );
};

export default CustomModuleBuilder;

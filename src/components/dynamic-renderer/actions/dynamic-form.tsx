"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { buildZodSchema } from "@/lib/utils";

// Types
type FormField = {
  key: string;
  label: string;
  type: "text" | "date" | "time" | "number" | "email" | "select" | "object" | "auto";
  required?: boolean;
  options?: string[];
  fields?: FormField[];
  editable?: boolean;
  value?: any;
  validation?: Record<string, any>; // <-- server-driven validation rules
};

type FormSchema = {
  fields: FormField[];
};

const DynamicForm = ({
  schema,
  initialValue,
  handleFormSubmission,
  className="md:min-h-[70vh]"
}: {
  schema: FormSchema;
  initialValue?: Record<string, any>;
  handleFormSubmission?: (data: any) => void; 
  className?: string;

}) => {

  const zodSchema = buildZodSchema(schema?.fields);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: zodResolver(zodSchema),
    mode : 'onTouched',
  });

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "date":
      case "time":
      case "number":
      case "email":
        return (
          <>
            <input
              className="border w-full p-[1.5%] rounded-lg"
              type={field.type}
              placeholder={field.label}
              {...register(field.key)}
            />
            {errors[field.key] && (
              <p className="text-red-500 text-sm">{errors[field.key]?.message as string}</p>
            )}
          </>
        );

      case "select":
        return (
          <>
            <select
              className="border w-full p-[1.5%] rounded-lg"
              {...register(field.key)}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt : any, idx) => {

                return (
                  <option key={idx} value={opt?.value }>
                    {opt?.[`${field.key}`  as any]}
                  </option>
                )
              })}
            </select>
            {errors[field.key] && (
              <p className="text-red-500 text-sm">{errors[field.key]?.message as string}</p>
            )}
          </>
        );

      case "object":
        return (
          <div className="nested w-full border p-[1.5%] rounded-lg">
            <label>{field.label}</label>
            {field.fields?.map((nestedField) => (
              <div key={nestedField.key}>{renderField(nestedField)}</div>
            ))}
          </div>
        );

      case "auto":
        return (
          <input
            type="text"
            className="border w-full p-[1.5%] rounded-lg"
            defaultValue={field.value || ""}
            disabled={!field.editable}
            readOnly={!field.editable}
            {...register(field.key)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {

        handleFormSubmission?.(data);
      })}
    >
      <section className={`w-full grid md:grid-cols-2 gap-[1%] ${className} md:overflow-y-auto container`}>
        {schema?.fields.map((field) => (
          <div
            key={field?.key}
            className="field flex flex-col justify-center items-start w-full"
          >
            <label>{field?.label}</label>
            {renderField(field)}
          </div>
        ))}
      </section>

      <div className="w-full md:w-[30%] mx-auto mt-[7%]">
        <button 
          type="submit"
          className="w-full text-white p-2 rounded-md bg-[#6BBBE9]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;

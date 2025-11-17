"use client"

import * as React from "react"
import { useId } from "react"
import ReactSelect from 'react-select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { Button, Input, FormLabel as Label } from "@chakra-ui/react"
import { SELECT_COMPONENT_STYLES } from "@/constants/styles";
import { useTheme } from "next-themes";
import { AGE_OF_CROP_UNITS, CROP_HEALTH_STATUS, FERTILISER_UNITS, ID_CONSTANTS, WATERING_METHODS } from "./constants";

type Health = "Healthy" | "Average" | "Poor"
type WaterMethod = "Drip" | "Sprinkler" | "Manual" | "Other"
type AgeUnit = "days" | "weeks" | "months"
type QtyUnit = "kg" | "liters"

type Plot = {
  id: string
  // Plot Details
  name: string
  crop: string
  cropAge: number | ""
  cropAgeUnit: AgeUnit
  seedDate: string // yyyy-mm-dd
  health: Health | ""
  // Fertiliser
  fertiliserDate: string // yyyy-mm-dd
  fertiliserType: string
  fertiliserQuantity: number | ""
  fertiliserQuantityUnit: QtyUnit
  // Watering
  lastWateredDate: string // yyyy-mm-dd
  wateringMethod: WaterMethod | ""
  wateringFrequency: number | "" // days
}

function emptyPlot(): Plot {
  return {
    id: crypto.randomUUID(),
    name: "",
    crop: "",
    cropAge: "",
    cropAgeUnit: "days",
    seedDate: "",
    health: "",
    fertiliserDate: "",
    fertiliserType: "",
    fertiliserQuantity: "",
    fertiliserQuantityUnit: "kg",
    lastWateredDate: "",
    wateringMethod: "",
    wateringFrequency: "",
  }
}

type ReactSelectType = {
  value: string,
  label: string

}

export default function PolyhousePlotsForm() {
  const [plots, setPlots] = React.useState<Plot[]>([emptyPlot()]);
  const [selectedUnit, setSelectedUnit] = React.useState<ReactSelectType>({ value: "days", label: "Days" });
  const [cropHealth, setCropHealth] = React.useState<ReactSelectType>({ value: "Healthy", label: "Healthy" });
  const [fertiliserUnit, setFertiliserUnit] = React.useState<ReactSelectType>({ value: "kg", label: "KG" });
  const [selectedWateringMethod, setSelectedWateringMethod] = React.useState<ReactSelectType>({ value: "drip", label: "Drip Irrigation" },);

  const formId = useId();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  function addPlot() {
    setPlots((prev) => [...prev, emptyPlot()])
  }

  function removePlot(id: string) {
    setPlots((prev) => prev.filter((p) => p.id !== id))
  }

  function updatePlot<K extends keyof Plot>(id: string, key: K, value: Plot[K]) {
    setPlots((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("[v0] Submitting plots:", plots)
  }

  // Compact spacing preset for field groups
  const fieldClass = "flex flex-col gap-1.5";
  const labelClass = "text-sm font-medium";
  const hasMultiple = plots.length > 1


  function handleSelectChange(id: string, key: keyof Plot, item: ReactSelectType, textFieldId: string) {
    updatePlot(id, key, item?.value);

    if (textFieldId === ID_CONSTANTS?.AGE_UNITS) {
      setSelectedUnit(item);
    }
    if (textFieldId === ID_CONSTANTS?.CROP_HEALTH) {
      setCropHealth(item);
    }
    if (textFieldId === ID_CONSTANTS?.FERTILISER_UNITS) {
      setFertiliserUnit(item);
    }
    if (textFieldId === ID_CONSTANTS?.WATERING_METHODS) {
      setSelectedWateringMethod(item);
    }
  }
  return (
    <form onSubmit={onSubmit} aria-labelledby={`${formId}-title`} className="space-y-4 w-full md:w-[85%] mx-auto">
      <div className="flex items-center justify-between">
        <h2 id={`${formId}-title`} className="text-lg font-semibold text-pretty">
          Polyhouse Plots
        </h2>
        <Button type="button" variant="secondary" onClick={addPlot} bg={`#6BBBEA`} color={`white`}>
          Add Another Plot
        </Button>
      </div>

      <div className="space-y-4">
        {plots?.map((plot, idx) => {
          const indexLabel = `Plot ${idx + 1}`
          return (
            <Card key={plot.id} aria-label={`${indexLabel} card`} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{indexLabel}</CardTitle>
                  {hasMultiple && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removePlot(plot.id)}>
                      Remove
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Plot Details */}
                <section aria-labelledby={`${plot.id}-plot-details`}>
                  <h3 id={`${plot.id}-plot-details`} className="text-sm font-semibold mb-2">
                    Plot Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-name`} className={labelClass}>
                        Plot Name
                      </Label>
                      <Input
                        id={`${plot.id}-name`}
                        placeholder="e.g. North-1"
                        value={plot.name}
                        onChange={(e) => updatePlot(plot.id, "name", e.target.value)}
                        required
                      />
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-crop`} className={labelClass}>
                        Crop
                      </Label>
                      <Input
                        id={`${plot.id}-crop`}
                        placeholder="e.g. Tomato"
                        value={plot.crop}
                        onChange={(e) => updatePlot(plot.id, "crop", e.target.value)}
                        required
                      />
                      {/* <p className={hintClass}>You can change to a dropdown later.</p> */}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className={fieldClass + " col-span-1"}>
                        <Label htmlFor={`${plot.id}-age`} className={labelClass}>
                          Crop Age
                        </Label>
                        <Input
                          id={`${plot.id}-age`}
                          type="number"
                          min={0}
                          placeholder="e.g. 6"
                          value={plot.cropAge}
                          onChange={(e) =>
                            updatePlot(plot.id, "cropAge", e.target.value === "" ? "" : Number(e.target.value))
                          }
                          required
                        />
                      </div>
                      <div className={fieldClass}>
                        <Label htmlFor={`${plot.id}-age-unit`} className={labelClass}>
                          Unit
                        </Label>
                        <ReactSelect
                          styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                          options={AGE_OF_CROP_UNITS} // Pass the defined options
                          onChange={(selectedOption: any) => handleSelectChange(plot.id, "cropAgeUnit", selectedOption, `${ID_CONSTANTS?.AGE_UNITS}`)} // Update state on selection change 
                          value={selectedUnit} // Control the selected value
                          placeholder={`${"Select unit"}`} // Optional placeholder text
                          className='border rounded-lg'
                        />

                      </div>
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-seed-date`} className={labelClass}>
                        Seed Date
                      </Label>
                      <Input
                        id={`${plot.id}-seed-date`}
                        type="date"
                        value={plot.seedDate}
                        onChange={(e) => updatePlot(plot.id, "seedDate", e.target.value)}
                      />
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-health`} className={labelClass}>
                        Health
                      </Label>
                      <ReactSelect
                        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                        options={CROP_HEALTH_STATUS} // Pass the defined options
                        onChange={(selectedOption: any) => handleSelectChange(plot.id, "health", selectedOption, `${ID_CONSTANTS?.CROP_HEALTH}`)} // Update state on selection change 
                        value={cropHealth} // Control the selected value
                        placeholder={`${"Select health status"}`} // Optional placeholder text
                        className='border rounded-lg'
                      />

                    </div>
                  </div>
                </section>

                <Separator />

                {/* Fertiliser Details */}
                <section aria-labelledby={`${plot.id}-fertiliser-details`}>
                  <h3 id={`${plot.id}-fertiliser-details`} className="text-sm font-semibold mb-2">
                    Fertiliser Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-fert-date`} className={labelClass}>
                        Fertiliser Date
                      </Label>
                      <Input
                        id={`${plot.id}-fert-date`}
                        type="date"
                        value={plot.fertiliserDate}
                        onChange={(e) => updatePlot(plot.id, "fertiliserDate", e.target.value)}
                      />
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-fert-type`} className={labelClass}>
                        Fertiliser Type
                      </Label>
                      <Input
                        id={`${plot.id}-fert-type`}
                        placeholder="e.g. NPK 19-19-19"
                        value={plot.fertiliserType}
                        onChange={(e) => updatePlot(plot.id, "fertiliserType", e.target.value)}
                      />
                      {/* <p className={hintClass}>You can switch to a dropdown later.</p> */}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className={fieldClass + " col-span-1"}>
                        <Label htmlFor={`${plot.id}-fert-qty`} className={labelClass}>
                          Quantity
                        </Label>
                        <Input
                          id={`${plot.id}-fert-qty`}
                          type="number"
                          min={0}
                          placeholder="e.g. 2"
                          value={plot.fertiliserQuantity}
                          onChange={(e) =>
                            updatePlot(
                              plot.id,
                              "fertiliserQuantity",
                              e.target.value === "" ? "" : Number(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className={fieldClass}>
                        <Label htmlFor={`${plot.id}-fert-qty-unit`} className={labelClass}>
                          Unit
                        </Label>
                        <ReactSelect
                          styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                          options={FERTILISER_UNITS} // Pass the defined options
                          onChange={(selectedOption: any) => handleSelectChange(plot.id, "cropAgeUnit", selectedOption, `${ID_CONSTANTS?.FERTILISER_UNITS}`)} // Update state on selection change 
                          value={fertiliserUnit} // Control the selected value
                          placeholder={`${"Select unit"}`} // Optional placeholder text
                          className='border rounded-lg'
                        />

                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Watering Details */}
                <section aria-labelledby={`${plot.id}-watering-details`}>
                  <h3 id={`${plot.id}-watering-details`} className="text-sm font-semibold mb-2">
                    Watering Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-water-date`} className={labelClass}>
                        Last Watered Date
                      </Label>
                      <Input
                        id={`${plot.id}-water-date`}
                        type="date"
                        value={plot.lastWateredDate}
                        onChange={(e) => updatePlot(plot.id, "lastWateredDate", e.target.value)}
                      />
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-water-method`} className={labelClass}>
                        Method
                      </Label>
                      <ReactSelect
                        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                        options={WATERING_METHODS} // Pass the defined options
                        onChange={(selectedOption: any) => handleSelectChange(plot.id, "wateringMethod", selectedOption, `${ID_CONSTANTS?.WATERING_METHODS}`)} // Update state on selection change 
                        value={selectedWateringMethod} // Control the selected value
                        placeholder={`${"Select watering method"}`} // Optional placeholder text
                        className='border rounded-lg'
                      />
                    </div>

                    <div className={fieldClass}>
                      <Label htmlFor={`${plot.id}-water-freq`} className={labelClass}>
                        Frequency (days)
                      </Label>
                      <Input
                        id={`${plot.id}-water-freq`}
                        type="number"
                        min={0}
                        placeholder="e.g. 3"
                        value={plot.wateringFrequency}
                        onChange={(e) =>
                          updatePlot(plot.id, "wateringFrequency", e.target.value === "" ? "" : Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </section>
              </CardContent>

              <CardFooter className="justify-between">
                <p className="text-xs text-muted-foreground">{indexLabel} — ensure details are accurate.</p>
                {/* ... Add per-plot actions here if needed ... */}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        {/* <Button type="button" variant="secondary" onClick={addPlot}>
          Add Another Plot
        </Button> */}
        <Button type="submit" bg={`#6BBBEA`} color={`white`}>Save Plots</Button>
      </div>
    </form>
  )
}
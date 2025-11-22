import SensorCardComponent from "@/components/modules/sensors/_elements/sensor-card-component";
import { usePrepareDataForSensorCharts } from "@/hooks/use-sensor-data-prepare";
import { useEffect, useMemo, useState } from "react";
import Select from 'react-select';
import { SELECT_COMPONENT_STYLES } from "@/constants/styles";
import { useTheme } from "next-themes";
import { SENSOR_SELECT_LIST } from "@/components/modules/sensors/_components/sensor-constants";
import ScatteredChart from "@/components/dynamic-renderer/chart/scattered-chart";
import FiltersForChartSelection from "@/components/modules/sensors/_elements/filters-for-chart-selection";
import { DUMMY_PLOT_LISTS } from "@/constants/dummy-modules";
import { CHARTS_TYPE_LIST } from "@/constants";
import { useBoxScatteredChart } from "@/hooks/use-box-scattered-chart";
import { useExportSoilReadingsDataOnDateRange,  } from "@/data-handling/queries/dynamic-component-queries";
import SingleLineChartForAtmosphericValues from "./single-line-chart-temp-humitidy";


const EnvironmentalMetricsCarousel = () => {

const emptyAr :any= [];
  const {mutateAsync: exportSoilReadingsDataOnDateRange} = useExportSoilReadingsDataOnDateRange();
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const [selectedChartType, setSelectedChartType] = useState<any>({label: "Line Chart", value: "line"});
  const [slectedSensors, setSelectedSensors] = useState<any>([]);
const [selectedDateRange, setSelectedDateRange] = useState<any>({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
});

  const className = `flex flex-col w-[98.5%] justify-center items-center gap-[1%] pr-[2%] bg-white dark:bg-[#121F31]`;
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  useEffect(() => {
    if (SENSOR_SELECT_LIST?.length && slectedSensors.length === 0) {
      setSelectedSensors(SENSOR_SELECT_LIST);
    }
  }, []);

 
  const {
    // refetchData,
    temperatureData, moistureData, temperatureStatistics,
    moistureStatistics, nitrogenData, nitrogenStatistics,
    phosphorousStatistics, phosphorousData,
    phStatistics, phData, potassiumData, potassiumStatistics,
    salinityStatistics, salinityData, electricalConductivityData, electricalConductivityStatistics,

    electricalConductivitySensorChartOptions, moistureSensorChartOptions, nitrogenSensorChartOptions, phSensorChartOptions,
    phosphorousSensorChartOptions, potassiumSensorChartOptions, salinitySensorChartOptions, 
    temperatureSensorChartOptions,  refetchAll, atmosphericHumidityData, atmosphericTemperatureData
  } = usePrepareDataForSensorCharts({start_date : `${selectedDateRange.start_date}`, end_date : `${selectedDateRange.end_date}`, polyhouse_ids :selectedPlot});
const {chartData} =useBoxScatteredChart({start_date : `${selectedDateRange.start_date}`, end_date : `${selectedDateRange.end_date}`});


  // todo : Do not know what to do just do everyting you see that willbe the work
  const containerClasses = `flex my-[0.5%] bg-white dark:bg-[#121F31] rounded-lg shadow-md overflow-hidden flex-col md:flex-row `;

  function handleSensorSelection(option: any) {
    setSelectedSensors(option);
  }

  const handleRemoveSensor = (value: string) => {
    if (slectedSensors.length === 1) return; // prevent removing last one
    setSelectedSensors(slectedSensors.filter((s: any) => s.value !== value));
  };


  const {
    ec, moisture, nitrogen, ph, phosphorous, potassium, salinity, temperature
  } = useMemo(() => {
    const isSelected = (sensorKey: string) =>
      slectedSensors.some((s: any) => s.value === sensorKey);

    return {
      temperature: isSelected("temperature"),
      moisture: isSelected("moisture"),
      nitrogen: isSelected("nitrogen"),
      phosphorous: isSelected("phosphorous"),
      ph: isSelected("ph"),
      potassium: isSelected("potassium"),
      salinity: isSelected("salinity"),
      ec: isSelected("ec"),
    };
  }, [slectedSensors]);

  function handlePlotSelection(option: any) {
    setSelectedPlot(option);
  }

  function handleDateRangeSelection(e:React.ChangeEvent<HTMLInputElement>) {
    const {id, value} = e.target;
    setSelectedDateRange({
      ...selectedDateRange,
      [id]: value
    })

  }
  function handleChartTypeSelection(option: any) {
    setSelectedChartType(option);
  }

  async function exportSoilReadingDataToCSV() {
    try {
      await exportSoilReadingsDataOnDateRange({
        start_date: selectedDateRange.start_date,
        end_date: selectedDateRange.end_date
      })

    } catch (error) {
      console.log(error)
    }
  }

  async function onSearchButtonClick(){
    try {

      await refetchAll();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // ! Add below classes if Slider or Carousel is needed
    // className={`w-[90vw] rounded-lg p-[1.5%] bg-white my-[1%]`}
    <article className={`md:w-full rounded-lg bg-white dark:bg-[#121F31] p-[1.5%] my-[0.75%]`}>
      <div className="slider-container w-full mx-auto">
        <section className={`flex flex-row justify-between items-center gap-[1%] p-[1%]`}>
          <FiltersForChartSelection 
          onSearchButtonClick={onSearchButtonClick}
          listOfPlots={DUMMY_PLOT_LISTS} 
          onPlotSelection={handlePlotSelection} 
          selectedPlot={selectedPlot}
          dateRange={selectedDateRange}
          onDateRangeSelection={handleDateRangeSelection}
          onChartTypeSelection={handleChartTypeSelection}
          selectedChartType={selectedChartType}
          handleDownloadDataOnDateRange={exportSoilReadingDataToCSV}
          listOfChartsTypes={CHARTS_TYPE_LIST}
          />
        </section>
        <div className={`flex w-full justify-evenly items-center my-[0.5%]`}>
          <h4 className={`md:text-[1.5em] font-semibold md:w-[50%]`}>
            Polyhouse Environmental Parameters
          </h4>
          {/* <h4 className={`md:text-[1.5em] font-semibold md:w-[80%] text-center`}>
            Graphical Representation
          </h4> */}

          <section className={`md:w-full flex items-center gap-[1%]`}>
            <div>
              <Select
                className="border rounded-lg"
                isMulti
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                options={SENSOR_SELECT_LIST}
                onChange={(selectedOption: any) => handleSensorSelection(selectedOption)}
                value={slectedSensors}
                placeholder="Select Sensors"
                isSearchable
              />
            </div>

       
          </section>
        </div>
        {
          selectedChartType?.value === "line" && (
            <section className={``}>
              {/* Atmospheric Temperature */}
              <SingleLineChartForAtmosphericValues chartData={atmosphericTemperatureData || emptyAr} title="Atmospheric Temperature" dataKey={`temperature`}/>

                   {/* Atmospheric Humidity */}
                   <SingleLineChartForAtmosphericValues chartData={atmosphericHumidityData || emptyAr} title="Atmospheric Humidity" dataKey={`humidity`} />

            {/* Temperature */}
            {
              temperature && (
              <SensorCardComponent
                key={`temperature-${selectedPlot?.value || 'default'}-${temperatureData?.length}`}
                className={className}
                containerClasses={containerClasses}
                chartDataList={temperatureData || emptyAr}
                statisticsData={temperatureStatistics}
                sensorChartData={temperatureSensorChartOptions!}
                sensorStatistics={{
                  title: "Temperature Statistics",
                  description: "Statistics for the selected temperature sensor",
                  unit: "°C",
                }}
              />)
            }
  
            {/* Moisture */}
            {
              moisture && (
                <SensorCardComponent
                  key={`moisture-${selectedPlot?.value || 'default'}-${moistureData?.length}`}
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={moistureData || emptyAr}
                  statisticsData={moistureStatistics}
                  sensorChartData={moistureSensorChartOptions!}
                  sensorStatistics={{
                    title: "Moisture Statistics",
                    description: "Statistics for the selected moisture sensor",
                    unit: "%",
                  }}
                />
              )
            }
  
            {/* Nitrogen */}
            {
              nitrogen && (
                <SensorCardComponent
                  key={`nitrogen-${selectedPlot?.value || 'default'}-${nitrogenData?.length}`}
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={nitrogenData || emptyAr}
                  statisticsData={nitrogenStatistics}
                  sensorChartData={nitrogenSensorChartOptions!}
                  sensorStatistics={{
                    title: "Nitrogen Statistics",
                    description: "Statistics for the selected nitrogen sensor",
                    unit: "mg/kg",
                  }}
                />
              )
            }
  
            {/* Phosphorous */}
            {
              phosphorous && (
                <SensorCardComponent
                  className={className}
                  key={`phosphorous-${selectedPlot?.value || 'default'}-${phosphorousData?.length}`}
                  containerClasses={containerClasses}
                  chartDataList={phosphorousData || emptyAr}
                  statisticsData={phosphorousStatistics}
                  sensorChartData={phosphorousSensorChartOptions!}
                  sensorStatistics={{
                    title: "Phosphorous Statistics",
                    description: "Statistics for the selected phosphorous sensor",
                    unit: "mg/kg",
                  }}
                />
              )
            }
               {/* Potassium */}
               {
              potassium && (
                <SensorCardComponent
                  key={`potassium-${selectedPlot?.value || 'default'}-${potassiumData?.length}`}
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={potassiumData || emptyAr}
                  statisticsData={potassiumStatistics}
                  sensorChartData={potassiumSensorChartOptions!}
                  sensorStatistics={{
                    title: "Potassium Statistics",
                    description: "Statistics for the selected potassium sensor",
                    unit: "mg/kg",
                  }}
                />
              )
            }
             {/* Electrical Conductivity */}
             {
              ec && (
                <SensorCardComponent
                  key={`ec-${selectedPlot?.value || 'default'}-${electricalConductivityData?.length}`}
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={electricalConductivityData || emptyAr}
                  statisticsData={electricalConductivityStatistics}
                  sensorChartData={electricalConductivitySensorChartOptions!}
                  sensorStatistics={{
                    title: "Electrical Conductivity Statistics",
                    description: "Statistics for the selected Electrical Conductivity sensor",
                    unit: "μS/cm",
                  }}
                />
              )
            }
  
            {/* pH */}
            {
              ph && (
                <SensorCardComponent
                  key={`ph-${selectedPlot?.value || 'default'}-${phData?.length}`}
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={phData || emptyAr}
                  statisticsData={phStatistics}
                  sensorChartData={phSensorChartOptions!}
                  sensorStatistics={{
                    title: "pH Statistics",
                    description: "Statistics for the selected pH sensor",
                    unit: "pH",
                  }}
                />)
            }
  
  
            {/* Salinity */}
            {
              salinity && (
                <SensorCardComponent
                  className={className}
                  containerClasses={containerClasses}
                  chartDataList={salinityData || emptyAr}
                  statisticsData={salinityStatistics}
                  sensorChartData={salinitySensorChartOptions!}
                  sensorStatistics={{
                    title: "Salinity Statistics",
                    description: "Statistics for the selected salinity sensor",
                    unit: "g/kg",
                  }}
                />
              )
            }
           
          </section>
          )
        }
        {
           selectedChartType?.value === "scatter" && (
            <section>
            {
              temperature && (
                <ScatteredChart title={`Temperature`} chartData={chartData?.temperature}/>
              )
            }
              {
              moisture && (
                <ScatteredChart title={`Moisture`}  chartData={chartData?.moisture}/>
              )
            }
             {
              nitrogen && (
                <ScatteredChart title={`Nitrogen`}  chartData={chartData?.nitrogen}/>
              )
            }
             {
              phosphorous && (
                <ScatteredChart title={`Phosphorous`}  chartData={chartData?.phosphorous}/>
              )
            }
             {
              potassium && (
                <ScatteredChart title={`Potassium`}  chartData={chartData?.potassium}/>
              )
            }
            {
              ec && (
                <ScatteredChart title={`Electrical Conductivity`}  chartData={chartData?.ec}/>
              )
            }
             {
              ph && (
                <ScatteredChart title={`pH`}  chartData={chartData?.ph}/>
              )
            }
             {
              salinity && (
                <ScatteredChart title={`Salinity`}  chartData={chartData?.salinity}/>
              )
            }
             
          </section>
           )
        }
             
      </div>
    </article>
  );
};

export default EnvironmentalMetricsCarousel;

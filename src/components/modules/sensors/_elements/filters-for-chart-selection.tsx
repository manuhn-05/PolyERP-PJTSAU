// import PlotsDropdownBasedOnPolyhouse from '@/components/(owner)/market-place/polyhouse-plots/_components/plots-dropdown-based-polyhouse'
import { SELECT_COMPONENT_STYLES } from '@/constants/styles'
import { Button, Input } from '@chakra-ui/react';
import { useTheme } from 'next-themes'
import  { FC } from 'react';
import Select from "react-select";
import { AiOutlineDownload } from "react-icons/ai";
// import PolyhousesDropdown from '@/components/(owner)/market-place/polyhouse/_components/polyhouses-dropdown';
import PolyhousesDropdownMultiSelect from '@/components/(owner)/market-place/polyhouse/_components/multi-polyhouse-dropdown';
import { GoSearch } from 'react-icons/go';

type FiltersForChartSelectionProps = {
    selectedPlot: any
    onPlotSelection(option: any): void;
    listOfPlots: Array<any>;
    listOfChartsTypes: Array<any>;
    selectedChartType: any;
    onChartTypeSelection(option: any): void
    dateRange: any;
    onDateRangeSelection(e: React.ChangeEvent<HTMLInputElement>): void
    handleDownloadDataOnDateRange(): void;
    onSearchButtonClick(): void;
}

const FiltersForChartSelection:FC<FiltersForChartSelectionProps> = 
({ onPlotSelection,selectedPlot, listOfChartsTypes, selectedChartType, onChartTypeSelection, dateRange, 
  onDateRangeSelection, handleDownloadDataOnDateRange,onSearchButtonClick }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
  return (
    <>
    {/* <PlotsDropdownBasedOnPolyhouse
      selectedPlot={selectedPlot}
      listOfPlots={listOfPlots}
      onPlotSelection={onPlotSelection}
    /> */}
    
<div className={`w-full`}>
<PolyhousesDropdownMultiSelect selectedPolyhouse={selectedPlot} handleSelectOption={onPlotSelection} placeHolder={"Select Plot"} />

  </div>    
  <div className={`w-full`}>
      <Select
        className="border rounded-lg"
      
        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
        options={listOfChartsTypes}
        onChange={(selectedOption: any) => onChartTypeSelection(selectedOption)}
        value={selectedChartType}
        placeholder="Select Sensors"
        isSearchable
      />
    </div>
    {/* <div className={`w-full`}>
      <Select
        className="border rounded-lg"
        isMulti
        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
        options={[]}
        onChange={(selectedOption: any) => console.log(selectedOption)}
        value={{}}
        placeholder="Select Sensors"
        isSearchable
      />
    </div> */}
    <div className={`w-full flex justify-between items-center gap-[1%]`}>
      <div>
        <Input 
        id={"start_date"} name={"start_date"} 
        placeholder="From" type="date" 
        value={dateRange.start_date} 
        max={new Date().toISOString().split("T")[0]} 
        onChange={onDateRangeSelection}  />
      </div>
      <div>
        <Input 
        id={`end_date`} name={`end_date`} 
        placeholder="To" type="date" 
        value={dateRange.end_date} 
        min={dateRange.start_date}  
        max={new Date().toISOString().split("T")[0]} 
        onChange={onDateRangeSelection}  />
      </div>
      <div className={`w-full flex justify-end gap-[1%]`}>
      <Button onClick={onSearchButtonClick} bg={`#6BBBE9`} color={'white'} className={`text-white`} rightIcon={<GoSearch className={`text-[1.25rem]`} />} >

      </Button>
      <Button onClick={handleDownloadDataOnDateRange} bg={`#6BBBE9`} color={'white'} className={`text-white`} rightIcon={<AiOutlineDownload className={`text-[1.25rem]`} />} >

      </Button>
    </div>
    </div>
   

  </>
  )
}

export default FiltersForChartSelection
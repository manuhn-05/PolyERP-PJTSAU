import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { FormLabel } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import React from 'react'
import Select from "react-select";


type PlotsDropdownBasedOnPolyhouseProps = {
    selectedPlot: any
    onPlotSelection(option: any): void;
    listOfPlots: Array<any>;
    isLabelNeeded?: boolean
}

const PlotsDropdownBasedOnPolyhouse: React.FC<PlotsDropdownBasedOnPolyhouseProps> = ({ onPlotSelection, listOfPlots, selectedPlot , isLabelNeeded = false}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";

    function handlePlotSelection(option: any) {
        onPlotSelection(option);
    }
    return (
        <div className={`w-full`}>
            {
                isLabelNeeded &&(
                    <FormLabel htmlFor="plot-select">Select Plot</FormLabel>
                )
            }

            <Select
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                options={listOfPlots} // Pass the defined options
                onChange={(selectedOption: any) => handlePlotSelection(selectedOption)} // Update state on selection change 
                value={selectedPlot} // Control the selected value
                placeholder={`${"Select Plot"}`} // Optional placeholder text
                className='border rounded-lg'
            />
        </div>
    )
}

export default PlotsDropdownBasedOnPolyhouse;
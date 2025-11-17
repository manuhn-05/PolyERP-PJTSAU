import React, { useEffect, useState } from 'react';
import { Box, Select, Input, FormLabel, SimpleGrid } from '@chakra-ui/react';
type QuantityInputProps = {
    onQuantityChange : (total : number) => void,
    quantityType : string,
    quantity : {
        generalQuantity : number,
        numberOfItems : number,
        quantityPerItem : number
    },
    setQuantityType : React.Dispatch<React.SetStateAction<string>>,
    setQuantity (data : any) : void,
    selectedQuantityType : string,
    setSelectedQuantityType : React.Dispatch<React.SetStateAction<string>>,
    setSelectedQuantity : React.Dispatch<React.SetStateAction<any>>
}

function QuantityInput({ onQuantityChange, quantityType, quantity, setQuantityType, setQuantity, 
    selectedQuantityType, setSelectedQuantityType , setSelectedQuantity} : QuantityInputProps) {
    const [unit, setUnit] = useState(""); // Selected item type (single, tray, box, dozens)
    const [numUnits, setNumUnits] = useState(1); // Number of trays/boxes/dozens or single

    useEffect(() => {
        let total = 0;

        if (quantityType === "Count") {
            let unitMultiplier = 1;

            // Set multiplier based on unit
            if (unit === "dozens") {
                unitMultiplier = 12;
            }

            total = numUnits * quantity.numberOfItems  * unitMultiplier;
        } else {
            total = quantity.generalQuantity;
        }
        setSelectedQuantity({
            total,
            unit,
            numberOfUnits : numUnits
        })
        // Pass the updated total quantity
        onQuantityChange(total);
    }, [quantityType, unit, numUnits, quantity,]);

    const renderUnitDropdown = () => {
        if (quantityType === "Weight") {
            return (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                    <Box>
                        <label>Enter weight quantity</label>
                        <Input
                            type="number"
                            placeholder="Enter weight quantity"
                            onChange={(e) => setQuantity({ ...quantity, generalQuantity: parseFloat(e.target.value) || 0 })}
                        />
                    </Box>
                    <Box>
                        <label>Select weight unit</label>
                        <Select placeholder="Select weight unit" onChange={(e) => setSelectedQuantityType(e.target.value)}>
                            <option value="gram">Gram</option>
                            <option value="kg">Kilogram</option>
                            <option value="tonne">Tonne</option>
                        </Select>
                    </Box>
                </SimpleGrid>
            );
        } else if (quantityType === "Volume") {
            return (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                    <Box>
                        <label>Enter volume quantity</label>
                        <Input
                            type="number"
                            placeholder="Enter volume quantity"
                            onChange={(e) => setQuantity({ ...quantity, generalQuantity: parseFloat(e.target.value) || 0 })}
                        />
                    </Box>
                    <Box>
                        <label>Select volume unit</label>
                        <Select placeholder="Select volume unit" onChange={(e) => setSelectedQuantityType(e.target.value)}>
                            <option value="ml">Milliliter</option>
                            <option value="liter">Liter</option>
                            <option value="cubic_meter">Cubic Meter</option>
                        </Select>
                    </Box>
                </SimpleGrid>
            );
        } else if (quantityType === "Count") {
            return (
                <>
                    <Box>
                        <label>Select item type</label>
                        <Select
                            placeholder="Select item type"
                            onChange={(e) => {
                                setUnit(e.target.value);
                                if (e.target.value === "single") {
                                    setNumUnits(1); // Reset numUnits for single
                                }
                            }}
                        >
                            <option value="single">Single Item</option>
                            <option value="tray">Tray</option>
                            <option value="box">Box</option>
                            <option value="dozens">Dozens</option>
                        </Select>
                    </Box>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                        <Box>
                            <label>Enter number of items per {unit}</label>
                            <Input
                                type="number"
                                placeholder="Enter number of items per unit"
                                onChange={(e) => setQuantity({ ...quantity, numberOfItems: parseFloat(e.target.value) || 0 })}
                            />
                        </Box>
                        <Box>
                            <label>Enter number of {unit === "single" ? "items" : `${unit}s`}</label>
                            <Input
                                type="number"
                                placeholder={`Enter number of ${unit || "units"} (default: 1)`}
                                value={unit === "single" ? 1 : numUnits}
                                disabled={unit === "single"} // Disable for single item
                                onChange={(e) => setNumUnits(parseFloat(e.target.value) || 1)}
                            />
                        </Box>
                        {/* <Box>
                            <label>Enter quantity per item</label>
                            <Input
                                type="number"
                                placeholder="Enter quantity per item"
                                onChange={(e) => setQuantity({ ...quantity, quantityPerItem: parseFloat(e.target.value) || 0 })}
                            />
                        </Box> */}
                        <Box>
                            <label>Select Unit</label>
                            <Select placeholder="Select unit per item" onChange={(e) => setSelectedQuantityType(e.target.value)}>
                                <option value="gram">Gram</option>
                                <option value="kg">Kilogram</option>
                                <option value="liter">Liter</option>
                                <option value="ml">Milliliter</option>
                                <option value="number">Nos</option>
                            </Select>
                        </Box>
                    </SimpleGrid>
                </>
            );
        }
        return null;
    };

    return (
        <Box>
            <FormLabel>Quantity<span className="text-red-500"> *</span></FormLabel>
            <Select placeholder="Select Quantity Type" value={quantityType} onChange={(e) => setQuantityType(e.target.value)}>
                <option value="Weight">Weight</option>
                <option value="Volume">Volume</option>
                <option value="Count">Count</option>
            </Select>
            {renderUnitDropdown()}
        </Box>
    );
}

export default QuantityInput;

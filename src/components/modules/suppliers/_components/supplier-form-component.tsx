"use client";
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Text, SimpleGrid, Box, Button, useTheme, } from '@chakra-ui/react';
import Slider from "react-slick";
import Select from 'react-select';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import FormComponent from '@/components/modules/suppliers/_components/form-component';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import { SELECT_COMPONENT_STYLES } from '@/constants/styles';

import {
    ADD_VENDOR_SUPPLIER_AGREEMENTS_CONTRACTS_7, ADD_VENDOR_SUPPLIER_CERTIFICATIONS_COMPLIANCE_6, ADD_VENDOR_SUPPLIER_CONTACT_INFORMATION_2, ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10,
    ADD_VENDOR_SUPPLIER_FINANCIAL_INFORMATION_3, ADD_VENDOR_SUPPLIER_IDENTIFICATION_1, ADD_VENDOR_SUPPLIER_LOGISTICS_INFORMATION_11,
    ADD_VENDOR_SUPPLIER_PERFORMANCE_METRICS_5, ADD_VENDOR_SUPPLIER_PRODUCT_INFORMATION_4, ADD_VENDOR_SUPPLIER_RELATIONSHIP_HISTORY_8,
    ADD_VENDOR_SUPPLIER_RISK_MANAGEMENT_EVALUATION_9
} from '@/constants/dummy-modules';
import { useFetchInventoryList, useFetchInventoryStocksListBasedOnInventoryId } from '@/data-handling/queries/market-place-queries';



type SupplierFormComponentProps = {
    initialValues: any;
    onDropDownChangeHandler: (e: any) => void;
    onInputFieldsChangeHandler: (e: any) => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleFormSubmit(data: any): void;
}

const initialStockItemState = {
    inventory_item: { label: "", value: "" },
    stock_item: [{ label: "", value: "" }],
    items_list: [] // 👈 will store all added combinations
};

function reducerFn(state: any, action: any) {
    switch (action.type) {
        case "SET_INVENTORY_ITEM":
            return {
                ...state,
                inventory_item: action.payload,
            };
        case "SET_STOCK_ITEM":
            return {
                ...state,
                stock_item: action.payload,
            };
        case "ADD_ITEM_TO_LIST":
            return {
                ...state,
                items_list: [
                    ...state.items_list,
                    {
                        inventory_item: action.payload.inventory_item?.value,
                        stock_item: action.payload.stock_item,
                    },
                ],
            };
        default:
            return state;
    }
}



const SupplierFormComponent: React.FC<SupplierFormComponentProps> = ({ initialValues, onDropDownChangeHandler, onInputFieldsChangeHandler, handleChange, handleFormSubmit }) => {
    const [state, dispatch] = useReducer(reducerFn, initialStockItemState);
    const { selectedPolyhouse } = useAppSelector((store) => store.polyhouse);

    const { data: inventoryList } = useFetchInventoryList();
    const { data: inventoryStocksItems, refetch: refetchStockList } =
        useFetchInventoryStocksListBasedOnInventoryId(`${state?.inventory_item?.value || "fertilizers"}`, Boolean(state?.inventory_item?.value));

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const sliderRef = useRef<Slider>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [inventoryValue, setInventoryValue] = useState(null);
    const [stockValue, setStockValue] = useState([]);

    const handleAdd = () => {
        if (!inventoryValue || stockValue.length === 0) return; // do nothing if values are empty
        dispatch({
            type: "ADD_ITEM_TO_LIST",
            payload: {
                inventory_item: inventoryValue, // use local UI state
                stock_item: stockValue,
            },
        });

        // Reset UI only
        setInventoryValue(null);
        setStockValue([]);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
        appendDots: (dots: any) => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px"
                }}
            >
                <ul style={{ margin: "auto", width: "25%", display: "flex", justifyContent: "space-evenly" }}> {dots} </ul>
            </div>
        ),
        customPaging: (i: any) => (
            <div
                style={{
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: currentSlide === i ? "white" : "#6BBBE9",
                    backgroundColor: currentSlide === i ? "#6BBBE9" : "transparent",
                    border: currentSlide === i ? "1px white solid" : "",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 20px"
                }}
            >
                {i + 1}
            </div>
        )
    }
    const next = () => {
        sliderRef?.current?.slickNext();
    };
    const previous = () => {
        sliderRef?.current?.slickPrev();
    };
    useEffect(() => {
        refetchStockList();

    }, [state?.inventory_item])


    const listOfInventoryItems = useMemo(() => {
        return inventoryList?.data?.[0]?.inventory_items?.map((item: string) => ({
            value: item,
            label: item?.split("_").join(" ")
        }))
    }, [inventoryList]);
    const listOfInventoryStocks = useMemo(() => {
        return inventoryStocksItems?.data?.map((item: any) => {
            const label = item?.fertilizer_name || item?.generic_name || item?.name || item?.data;
            const value = label;
            return ({
                value, label, ...item
            })
        })
    }, [inventoryStocksItems, state?.inventory_item]);
    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            const cleanedCategories = state?.items_list?.map((item: any) => ({
                inventory_item: item.inventory_item,
                stock_item: item.stock_item
            }));

            handleFormSubmit({
                ...initialValues,
                polyhouse_id: `${selectedPolyhouse?.value}`,
                supplier_product_categories: cleanedCategories
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className='md:w-[95%] mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                <Slider
                    ref={slider => {
                        if (slider) sliderRef.current = slider;
                    }}
                    arrows={true}
                    {...settings}
                >


                    <div>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Identificion</Text>
                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_IDENTIFICATION_1}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}

                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} // Pass handleReset if needed in FormComponent
                            />

                        </Box>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Contact Information</Text>
                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_CONTACT_INFORMATION_2}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} // Pass handleReset if needed in FormComponent
                            />
                        </Box>

                    </div>
                    <div>
                        <Box className=''>
                            <Text as={'h3'}>Supplier's Financial Information</Text>
                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_FINANCIAL_INFORMATION_3}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} /// Pass handleReset if needed in FormComponent
                            />
                        </Box>

                    </div>

                    <div>
                        <Text as={'h3'}>Product/Material Information</Text>

                        <section className={`flex items-center w-full gap-[1%] border border-black`}>
                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={"0.75%"} my={"1.25em"} w={"100%"}>
                                <Box className="mb-[0.5em]">
                                    <label>Supplier&apos;s Products</label>
                                    <Select
                                        className="border rounded-lg capitalize"
                                        options={listOfInventoryItems || []}
                                        isClearable
                                        isSearchable
                                        value={inventoryValue} // controlled value
                                        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                                        onChange={(option: any) => {
                                            setInventoryValue(option);
                                            dispatch({ type: "SET_INVENTORY_ITEM", payload: option });
                                        }}
                                        placeholder={"Products / Materials"}
                                    />
                                </Box>

                                <Box className="mb-[0.5em]">
                                    <label>Supplier&apos; Products</label>
                                    <Select
                                        className="border rounded-lg"
                                        options={listOfInventoryStocks || []}
                                        isClearable
                                        isSearchable
                                        isMulti
                                        value={stockValue} // controlled value
                                        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                                        onChange={(option: any) => {
                                            setStockValue(option);
                                            dispatch({ type: "SET_STOCK_ITEM", payload: option });
                                        }}
                                        placeholder={"Products / Materials"}
                                    />
                                </Box>
                            </SimpleGrid>

                            <Button onClick={handleAdd}>Add</Button>


                        </section>
                        <Box className=''>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_PRODUCT_INFORMATION_4}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} /// Pass handleReset if needed in FormComponent
                            />
                        </Box>
                    </div>

                    <div>
                        <Text className='text-[1.45em] text-red-900'>Optional Fields</Text>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Performance Matrics</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_PERFORMANCE_METRICS_5}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} // Pass handleReset if needed in FormComponent
                            />
                        </Box>

                        <Box className=''>
                            <Text as={'h3'}>Supplier Agreements and Contracts</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_AGREEMENTS_CONTRACTS_7}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }}
                            />
                        </Box>
                    </div>
                    <div>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Performance Matrics</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_CERTIFICATIONS_COMPLIANCE_6}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }} // Pass handleReset if needed in FormComponent
                            />
                        </Box>
                    </div>
                    <div>
                        <Text className='text-[1.45em] text-red-900'>Optional Fields</Text>

                        <Box className=''>
                            <Text as={'h3'}>Supplier Relationship History</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_RELATIONSHIP_HISTORY_8}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }}
                            />
                        </Box>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Risk Management</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_RISK_MANAGEMENT_EVALUATION_9}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }}
                            />
                        </Box>
                    </div>
                    <div>
                        <Text className='text-[1.45em] text-red-900'>Optional Fields</Text>

                        <Box className=''>
                            <Text as={'h3'}>Supplier Feedback and Reviews</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }}
                            />
                        </Box>
                        <Box className=''>
                            <Text as={'h3'}>Supplier Logistics Information</Text>

                            <FormComponent
                                supplierFormData={ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10}
                                onDropDownChangeHandler={onDropDownChangeHandler}
                                onInputsChangeHandler={onInputFieldsChangeHandler}
                                loadDropDownData={(e: any) => { }}
                                selectedValue={''}
                                errors={{}}
                                touched={{}}
                                formData={{ ...initialValues }}
                                values={{}}
                                handleChange={handleChange}
                                handleBlur={() => { }}
                                handleReset={() => { }}
                            />
                        </Box>
                        <Box className='w-full flex justify-center md:justify-end'>
                            <Button colorScheme="#6BBBE9" bg={'#6BBBE9'} type="submit">
                                Submit
                            </Button>
                        </Box>
                    </div>

                </Slider>
            </form>
            <Box className='w-full flex justify-evenly' style={{ textAlign: "center" }}>
                <Button className="button" onClick={previous}>
                    <FaArrowAltCircleLeft />
                    Previous
                </Button>
                <Text></Text>
                <Button className="button" onClick={next}>
                    Next
                    <FaArrowAltCircleRight />

                </Button>
            </Box>
        </section>
    )
}

export default SupplierFormComponent
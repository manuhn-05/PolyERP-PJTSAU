import React, { useEffect, useMemo, useState } from 'react';
import { Box, SimpleGrid, Input, 
  Text, FormLabel,
  Button, } from '@chakra-ui/react';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import Select from 'react-select';
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import { addDaysToDate } from '@/lib/utils';
import QuantityInput from '@/components/modules/stocks/_components/quantity-input';


type StockCreateEditFormProps = {
    handleFormSubmit(data : any) : void
}

const StockCreateEditForm : React.FC<StockCreateEditFormProps> = ({handleFormSubmit}) => {
  const { currentUser } = useAppSelector((store) => store?.user);
  const { selectedPolyhouse } = useAppSelector((store) => store?.polyhouse);
  const polyhouse_id = currentUser?.user_type === USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : currentUser?.polyhouse_id;

  const { data: fetchedSuppliersData,  } = useFetchDataAsPerEndpoint(`${polyhouse_id}`,  `suppliers`,)

  const suppliersList=useMemo(()=>{
return fetchedSuppliersData?.data?.map((supplier: any) => ({ value: supplier?._id, label: supplier?.supplier_name, ...supplier }))
  },[fetchedSuppliersData]);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedInventoryCategory, setSelectedInventoryCategory] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const iventtoryListBasedOnSupplier = useMemo(() => {
    const inventoryList = selectedSupplier?.supplier_product_categories || []
      const list = inventoryList?.map((category : any)=>(
        {
            label : category?.inventory_item?.split("_").join(" "),
            value : category?.inventory_item,
            ...category
        }
      ))
      return list;
  },[selectedSupplier])



  const [selectedModule, setSelectedModule] = useState<any>(null);


  const [stock_ordered_date, setStockOrderedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expected_delivery_date, setExpectedDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [expected_delivery_in_days, setExpectedDeliveryInDays] = useState(0);
  const [received_date, setReceivedDate] = useState(new Date().toISOString().split('T')[0]);

  const [quantityType, setQuantityType] = useState("");
  const [quantity, setQuantity] = useState({ generalQuantity: 0, numberOfItems: 0, quantityPerItem: 0 });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedQuantityType, setSelectedQuantityType] = useState<any>(null);

  const [reorder_level, setReOrderLevel] = useState<any>(0);

  const [selectedQuantity, setSelectedQuantity] = useState({})

    async function handleSubmit(e: any) {
        e.preventDefault();
        const { stock_item, inventory_item
            , ...rest_inventory } = selectedInventoryCategory;
        const data = {
            stock_ordered_date, expected_delivery_date, expected_delivery_in_days, received_date, quantityType,
            ...quantity, selectedQuantityType, reorder_level, ...selectedQuantity,
            selectedStock : selectedStock?.value, inventory_item, polyhouse_id,
            account_number: selectedSupplier?.account_number,
            bank_name: selectedSupplier?.bank_name, branch_name: selectedSupplier?.branch_name,
            iban: selectedSupplier?.iban, swift_code: selectedSupplier?.swift_code, ifsc_code: selectedSupplier?.ifsc_code,
            supplier_contact_person: selectedSupplier?.supplier_contact_person,
            supplier_email_address: selectedSupplier?.supplier_email_address,
            supplier_gst_number: selectedSupplier?.supplier_gst_number,
            supplier_minimum_order_quantity: selectedSupplier?.supplier_minimum_order_quantity,
            supplier_mobile_number: selectedSupplier?.supplier_mobile_number,
            supplier_name: selectedSupplier?.supplier_name,
            supplier_time_zone: selectedSupplier?.supplier_time_zone,
            supplier_tin_number: selectedSupplier?.supplier_tin_number,
            received_product_stock : selectedStock?.value,


        }
        try {
            handleFormSubmit({ ...data })
        } catch (error) {
            console.log(error)
        }
    }

  function handleSupplierSelection(selectedOption : any) {
      setSelectedSupplier(selectedOption);
      setSelectedModule(null); // Reset module on supplier change
    // Reset stocks data
  }

  function handleModuleChangeBasedOnSupplier(selectedOption : any) {
    setSelectedInventoryCategory(selectedOption);
  }

  function handleStocksSelectionBasedOnModule(selectedOption : any) {
      setSelectedStock(selectedOption);
  }

  const handleQuantityChange = (quantity : any) => {
      setTotalQuantity(quantity);

  };

  useEffect(() => {
    if (!selectedSupplier?.expected_delivery_in_days) return; // don't run if undefined
  
    const expectedDate = addDaysToDate(stock_ordered_date, selectedSupplier.expected_delivery_in_days);
    setExpectedDeliveryDate(expectedDate);
    setExpectedDeliveryInDays(selectedSupplier.expected_delivery_in_days);
  }, [stock_ordered_date, selectedSupplier]);
  

  return (
      <>
          <form onSubmit={handleSubmit}>
              <section>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                  <Box>
                      <FormLabel>Authorized By</FormLabel>
                      <Input type='text' value={currentUser?.name} disabled={true} />
                  </Box>
              </SimpleGrid>
              <Box>
                  <label htmlFor="suppliers_list" className='flex w-full justify-between'>
                      <span>Suppliers</span>
                  </label>
                  <Select
                      options={suppliersList}
                      isSearchable
                      onChange={handleSupplierSelection}
                      value={selectedSupplier}
                      placeholder="Select Supplier"
                  />
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                  <Box>
                      <label htmlFor="module-select">Module
                          <span className="text-red-500"> * </span>
                      </label>
                      <Select
                          className={`capitalize`}
                          options={iventtoryListBasedOnSupplier}
                          isClearable
                          isSearchable
                          onChange={handleModuleChangeBasedOnSupplier}
                          value={selectedInventoryCategory}
                          placeholder="Select a module"
                      />
                  </Box>
                  <Box>
                      <label htmlFor="stocks-select">Stocks
                          <span className="text-red-500"> * </span>
                      </label>
                      <Select
                          options={selectedInventoryCategory?.stock_item}
                          isClearable
                          isSearchable
                          onChange={handleStocksSelectionBasedOnModule}
                          value={selectedStock}
                          placeholder="Select a stock"
                      />
                  </Box>
              </SimpleGrid>
              <Box>
                  <Text className='my-[2%] text-[1.15em]'>Order Information</Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                      <Box>
                          <label htmlFor="ordered_date">Ordered Date
                          </label>
                          <Input type="date" value={stock_ordered_date} onChange={(e) => setStockOrderedDate(e.target.value)} />
                      </Box>
                      <Box>
                          <label htmlFor="expected_delivery_date">Expected Delivery Date <span>
                              ({expected_delivery_in_days} Days)
                          </span>
                          </label>
                          <Input type="date" value={expected_delivery_date} onChange={(e) => setExpectedDeliveryDate(e.target.value)} />
                      </Box>
                      <Box>
                          <label htmlFor="received_date">Recieved Date
                          </label>
                          <Input type="date" value={received_date} onChange={(e) => setReceivedDate(e.target.value)} />
                      </Box>
                      <Box>
                          <label htmlFor="reorder_level">Reorder Level</label>
                          <Input type="number" value={reorder_level} onChange={(e) => setReOrderLevel(e.target.value)} />
                          <label>Re-Order Level {reorder_level} : {selectedQuantityType}</label>
                      </Box>
                  </SimpleGrid>
              </Box>
              <Box >
                  <Text className='my-[2%] text-[1.15em]'>Supplier Contact Information</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="1em">
                      <Box>
                          <label htmlFor="">Contact Person Name</label>
                          <Input isDisabled value={selectedSupplier?.supplier_contact_person} />
                      </Box>
                      <Box>
                          <label htmlFor="">Contact Person Email</label>
                          <Input isDisabled value={selectedSupplier?.supplier_email_address} />
                      </Box>
                      <Box>
                          <label htmlFor="">Supplier Mobile Number</label>
                          <Input isDisabled value={selectedSupplier?.supplier_mobile_number} />
                      </Box>
                      <Box>
                          <label htmlFor="">Supplier GST Number</label>
                          <Input isDisabled value={selectedSupplier?.supplier_gst_number} />
                      </Box>
                      <Box>
                          <label htmlFor="">Supplier TIN Number</label>
                          <Input isDisabled value={selectedSupplier?.supplier_tin_number} />
                      </Box>
                      <Box >
                          <label htmlFor="">Delivery Time Zone</label>
                          <Input isDisabled value={selectedSupplier?.supplier_time_zone} />
                      </Box>
                  </SimpleGrid>
              </Box>

              <Box >
                  <QuantityInput
                      setSelectedQuantity={(val) => setSelectedQuantity(val)}
                      onQuantityChange={handleQuantityChange}
                      quantityType={quantityType}
                      quantity={quantity}
                      setQuantityType={setQuantityType}
                      setQuantity={setQuantity}
                      selectedQuantityType={selectedQuantityType}
                      setSelectedQuantityType={setSelectedQuantityType}
                  />
                  <label>Total Quantity: {totalQuantity} : <span className={`capitalize`}>{`${selectedQuantityType}`?.split("_")?.join(" ")}</span></label>


              </Box>
              </section>
              <div>
                <Button type="submit">Submit</Button>
              </div>
          </form>

      </>
  )
}

export default StockCreateEditForm
import AddStockToPurchaseRegistry from '@/components/modules/stocks/_components/add-stock-to-purchase-registry'
import ListOfStocksAvailable from '@/components/modules/stocks/_components/list-of-stocks-available'

const StockPurchaseRegistry = () => {
  return (
    <div className={`w-full h-full`}>
      <AddStockToPurchaseRegistry />
      <ListOfStocksAvailable />
    </div>
  )
}

export default StockPurchaseRegistry;
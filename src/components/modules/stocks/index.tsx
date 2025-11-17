"use client";
import withAuth from '@/hoc/withAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StocksTransactionHistoryTab from '@/components/modules/stocks/transaction/transaction-history-table';
import StockPurchaseRegistry from '@/components/modules/stocks/purchase-registry';


const StocksModuleComponent = () => {
  return (
    <article className='w-full h-full'>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border px-6 py-2">
          <h1 className="text-3xl font-bold text-foreground">Stocks Module</h1>
          <p className="mt-2 text-muted-foreground">Manage and track polyhouse inventory movements</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <Tabs defaultValue="transaction-history" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md bg-gray-300 dark:bg-[#253040]">
              <TabsTrigger value="transaction-history" 
              className={`data-[state=active]:bg-white dark:data-[state=active]:bg-[#d1d6de] text-foreground dark:text-[#888c92]`}
              >Transaction History</TabsTrigger>
              <TabsTrigger value="purchase-registry" 
              className={`data-[state=active]:bg-white dark:data-[state=active]:bg-[#d1d6de] text-foreground dark:text-[#888c92]`}
              >Purchase Registry</TabsTrigger>
            </TabsList>

            <TabsContent value="transaction-history" className="mt-6 space-y-6">
              <StocksTransactionHistoryTab />
            </TabsContent>
            <TabsContent value="purchase-registry" className="mt-6">
              <StockPurchaseRegistry />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </article>
  )
}

export default withAuth(StocksModuleComponent);
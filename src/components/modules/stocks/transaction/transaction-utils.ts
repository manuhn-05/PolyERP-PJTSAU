import { DUMMY_TRANSACTION_HISTORY } from "../_components/stock-constants"

export interface Transaction {
    id: string
    date: string
    type: "IN" | "OUT"
    stockItem: string
    quantity: number
    unit: string
    linkedEntity: string
    initiatedBy: string
    notes?: string
    lastUpdated: string
  }

  export type TRANSACTION_JOB_DETAILS={
    title : string,
    assigned_to : string,
    assigned_to_name : string,
    status : string,
  }
  export type TRANSACTION_SUPPLIER = {
    supplier_id : string,
    supplier_name : string,
    supplier_contact : string,
  }
export type TRANSACTION_AUTHORIZED_BY = {
  user_id : string,
  user_name : string,
  role : string,
}
  export interface TransactionTypes {
    transaction_id : string,
    transaction_type:string,
    date:string,
    item_id:string,
    item_name:string,
    category:string,
    quantity:number,
    unit:string,
    linked_purchase_id:string | null,
    linked_job_id:string | null,
    supplier ?: TRANSACTION_SUPPLIER,
    job_details?:TRANSACTION_JOB_DETAILS,
    authorized_by : TRANSACTION_AUTHORIZED_BY,
    remarks : string,
    current_stock_after : number,
    polyhouse_id:string,
    polyhouse_name:string,
    status : string,
    last_updated : string
  }
  
  export function generateMockTransactions(): TransactionTypes[] {
    
    return DUMMY_TRANSACTION_HISTORY
  }
  
  export interface TransactionSummary {
    totalInTransactions: number
    totalOutTransactions: number
    totalQtyIn: number
    totalQtyOut: number
    netAvailable: number
  }
  
  export function summarizeTransactions(transactions: TransactionTypes[]): TransactionSummary {
    const inTransactions = transactions.filter((tx) => tx.transaction_type === "IN")
    const outTransactions = transactions.filter((tx) => tx.transaction_type === "OUT")
  
    const totalQtyIn = inTransactions.reduce((sum, tx) => sum + tx.quantity, 0)
    const totalQtyOut = outTransactions.reduce((sum, tx) => sum + tx.quantity, 0)
  
    return {
      totalInTransactions: inTransactions.length,
      totalOutTransactions: outTransactions.length,
      totalQtyIn,
      totalQtyOut,
      netAvailable: totalQtyIn - totalQtyOut,
    }
  }
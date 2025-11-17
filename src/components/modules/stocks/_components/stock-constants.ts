import { TransactionTypes } from "../transaction/transaction-utils";

export const  DUMMY_TRANSACTION_HISTORY : Array<TransactionTypes> = [
    {
      "transaction_id": "TRX-0001",
      "transaction_type": "IN",
      "date": "2025-11-03T10:35:00Z",
      "item_id": "STK-0012",
      "item_name": "PVC Pipe 1-inch",
      "category": "Irrigation Tools",
      "quantity": 50,
      "unit": "meter",
      "linked_purchase_id": "PUR-0105",
      "linked_job_id": null,
      "supplier": {
        "supplier_id": "SUP-001",
        "supplier_name": "Agro Supply Co.",
        "supplier_contact": "+91 98765 43210"
      },
      "authorized_by": {
        "user_id": "USR-004",
        "user_name": "Ravi Kumar",
        "role": "Manager"
      },
      "remarks": "Auto-generated on purchase receipt",
      "current_stock_after": 150,
      "polyhouse_id": "PH-001",
      "polyhouse_name": "GreenLeaf Polyhouse",
      "status": "Completed",
      "last_updated" : "2025-11-04 14:30",
    },
    {
      "transaction_id": "TRX-0002",
      "transaction_type": "OUT",
      "date": "2025-11-04T08:20:00Z",
      "item_id": "STK-0012",
      "item_name": "PVC Pipe 1-inch",
      "category": "Irrigation Tools",
      "quantity": 10,
      "unit": "meter",
      "linked_purchase_id": null,
      "linked_job_id": "JOB-0092",
      "job_details": {
        "title": "Drip Line Repair",
        "assigned_to": "LAB-002",
        "assigned_to_name": "Kiran",
        "status": "In Progress"
      },
      "authorized_by": {
        "user_id": "USR-004",
        "user_name": "Ravi Kumar",
        "role": "Manager"
      },
      "remarks": "Used for Drip Line Repair job",
      "current_stock_after": 140,
      "polyhouse_id": "PH-001",
      "polyhouse_name": "GreenLeaf Polyhouse",
      "status": "Completed",
       "last_updated" : "2025-11-04 14:30"
    },
    {
      "transaction_id": "TRX-0003",
      "transaction_type": "IN",
      "date": "2025-11-04T11:05:00Z",
      "item_id": "STK-0056",
      "item_name": "Organic Fertilizer",
      "category": "Fertilizer",
      "quantity": 25,
      "unit": "kg",
      "linked_purchase_id": "PUR-0106",
      "linked_job_id": null,
      "supplier": {
        "supplier_id": "SUP-002",
        "supplier_name": "FarmGrow Industries",
        "supplier_contact": "+91 99887 66554"
      },
      "authorized_by": {
        "user_id": "USR-003",
        "user_name": "Manoj Singh",
        "role": "Owner"
      },
      "remarks": "Stock received and verified",
      "current_stock_after": 75,
      "polyhouse_id": "PH-002",
      "polyhouse_name": "BloomHarvest Polyhouse",
      "status": "Completed",
       "last_updated" : "2025-11-04 14:30"
    },
    {
      "transaction_id": "TRX-0004",
      "transaction_type": "OUT",
      "date": "2025-11-05T09:50:00Z",
      "item_id": "STK-0056",
      "item_name": "Organic Fertilizer",
      "category": "Fertilizer",
      "quantity": 5,
      "unit": "kg",
      "linked_purchase_id": null,
      "linked_job_id": "JOB-0095",
      "job_details": {
        "title": "Nutrient Mix Preparation",
        "assigned_to": "LAB-006",
        "assigned_to_name": "Mahesh",
        "status": "Completed"
      },
      "authorized_by": {
        "user_id": "USR-004",
        "user_name": "Ravi Kumar",
        "role": "Manager"
      },
      "remarks": "Used for nutrient solution preparation",
      "current_stock_after": 70,
      "polyhouse_id": "PH-002",
      "polyhouse_name": "BloomHarvest Polyhouse",
      "status": "Completed",
       "last_updated" : "2025-11-04 14:30"
    },
    {
      "transaction_id": "TRX-0005",
      "transaction_type": "IN",
      "date": "2025-11-05T15:25:00Z",
      "item_id": "STK-0042",
      "item_name": "Drip Connectors",
      "category": "Irrigation Components",
      "quantity": 100,
      "unit": "pieces",
      "linked_purchase_id": "PUR-0107",
      "linked_job_id": null,
      "supplier": {
        "supplier_id": "SUP-001",
        "supplier_name": "Agro Supply Co.",
        "supplier_contact": "+91 98765 43210"
      },
      "authorized_by": {
        "user_id": "USR-005",
        "user_name": "Sanjay Patel",
        "role": "Admin"
      },
      "remarks": "Auto-generated on new stock entry",
      "current_stock_after": 320,
      "polyhouse_id": "PH-001",
      "polyhouse_name": "GreenLeaf Polyhouse",
      "status": "Completed",
       "last_updated" : "2025-11-04 14:30"
    }
  ]
  
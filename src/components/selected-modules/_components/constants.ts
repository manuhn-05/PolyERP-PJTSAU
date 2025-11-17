
// Field type for filter components
type FilterField = {
  label: string;
  name: string;
  type: "select" | "text" | "number" | "date";
  options?: string[];
};

// Props for each component type
type FilterProps = {
  fields: FilterField[];
};

type TableProps = {
  tableHeaders?: Array<{ key: string; label: string }>;
  columns?: string[];
  data: Array<Record<string, any>>;
};



type ChartProps = {
  chartType: "bar" | "line" | "pie";
  data: { label: string; value: number }[];
};

type CardProps = {
  title: string;
  description: string;
};

// Union type for layout components
export type LayoutComponent =
  | { type: "filter"; props: FilterProps }
  | { type: "table"; props: TableProps }
  | { type: "chart"; props: ChartProps }
  | { type: "card"; props: CardProps };

// Full module config type
export interface ModuleConfig {
  _id: string;
  path: string;
  title: string;
  desc: string;
  layout: LayoutComponent[];
}




  const CARD_COMPONENT =   {
    type: "card",
    props: {
    
    }
  }

  const CHART_COMPONENT = {
    type: "chart",
    props: {
     
      
    }
  }
  const TABLE_COMPONENT =   {
    type: "table",
    props: {
    
   
    }
  }
  const FILTER_COMPONENT = {
    type: "filter",
    props: {
      fields: [
       
      ]
    }
  }



  export const MODULE_LAYOUT_COMPONENTS_MAP :any= {
    stocks: [
      TABLE_COMPONENT,
      FILTER_COMPONENT,
      CARD_COMPONENT,
      CHART_COMPONENT
    ],
    jobs : [
      TABLE_COMPONENT,
      FILTER_COMPONENT,
      CARD_COMPONENT,
      CHART_COMPONENT

    ],
    suppliers: [
      TABLE_COMPONENT,
      FILTER_COMPONENT,
      CARD_COMPONENT,
      CHART_COMPONENT

    ],
    crops: [
      TABLE_COMPONENT,
      FILTER_COMPONENT,
      CARD_COMPONENT,
      CHART_COMPONENT
    ],
    "work-management": [
      TABLE_COMPONENT,
      FILTER_COMPONENT,
      CARD_COMPONENT,
      CHART_COMPONENT
    ]
  }


export const JOBS_COMPONENT_TABLE_FIELDS = [
  { label: "Job Type", value: "job", key: "job" },
  { label: "Name", value: "full_name", key: "full_name" },
  { label: "Skill Type", value: "skill_type", key: "skill_type" },

  { label: "Assigned Date", value: "start_date", key: "start_date" },

  { label: "Status", value: "status", key: "status" },

]

  export const STOCKS_COMPONENT_TABLE_FIELDS = [
    { label : "Job Type", value : "job", key : "job" },
    { label : "Name", value : "labour", key : "labour" },
    { label : "Skill Type", value : "skill_type", key : "skill_type" },
    { label : "Assigned Date", value : "start_date", key : "start_date" },
    { label : "Status", value : "status", key : "status" },

  ]


  export const MODULE_LAYOUT_FIELDS_SELECTOR :any = {
    jobs : {
      table : {
        tableHeaders : [...JOBS_COMPONENT_TABLE_FIELDS],
      },
      filter : {
        fields : JOBS_COMPONENT_TABLE_FIELDS,
      },
      card : {
        cardHeaders : [...JOBS_COMPONENT_TABLE_FIELDS],
      }
    },
    stocks : {
      table : {
        tableHeaders : STOCKS_COMPONENT_TABLE_FIELDS,
      },
      filter : {
        fields : STOCKS_COMPONENT_TABLE_FIELDS,
      }
    },
    suppliers : {
      table : {
        tableHeaders : STOCKS_COMPONENT_TABLE_FIELDS,
      },
      filter : {
        fields : STOCKS_COMPONENT_TABLE_FIELDS,
      }
    },
    crops : {
      table : {
        tableHeaders : STOCKS_COMPONENT_TABLE_FIELDS,
      },
      filter : {
        fields : STOCKS_COMPONENT_TABLE_FIELDS,
      }
    },
    "work-management" : {
      table : {
        tableHeaders : STOCKS_COMPONENT_TABLE_FIELDS,
      },
      filter : {
        fields : STOCKS_COMPONENT_TABLE_FIELDS,
      }
    }
  }

  


  // TODO - JOB CREATION FORM DYNAMIC - Make sure it is stored in backend and comes from backend dynamically

  export const JOB_CREATION_FORM_FIELDS : any= {
    "fields": [
      {
        "key": "job",
        "label": "Job",
        "type": "select",
        "options": ["Sorting", "Grading", "Packing"], 
        "required": true,
        "multi": false
      },
 
      {
        "key": "full_name",
        "label": "",
        "type": "text",
        "required": true
      },
      {
        "key": "Labour ID",
        "label": "Labour ID",
        "type": "text",
        "required": true
      },
      {
        "key": "loc_code",
        "label": "Location",
        "type": "select",
        "options": ["Nairobi", "Mombasa", "Kisumu"],
        "required": true
      },
      {
        "key": "module_type",
        "label": "Module Type",
        "type": "select",
        "options": ["Harvesting", "Planting", "Irrigation"],
        "required": true
      },
      {
        "key": "skill_type",
        "label": "Skill Type",
        "type": "select",
        "options": ["skilled", "unskilled"],
        "required": true
      },
      {
        "key": "start_date",
        "label": "Start Date",
        "type": "date",
        "required": true
      },
  
      {
        "key": "start_time_12H",
        "label": "Start Time (12H)",
        "type": "time",
        "required": true
      },
      {
        "key": "end_time_12H",
        "label": "End Time (12H)",
        "type": "time",
        "required": true
      },
      {
        "key": "time_duration",
        "label": "Duration",
        "type": "text",
        "required": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "select",
        "options": ["pending", "in-progress", "done"],
        "required": true
      },
     
    ]
  }
  
  export const STOCK_RECEIVE_FORM_FIELDS: any = {
    fields: [
      {
        key: "account_number",
        label: "Account Number",
        type: "text",
        required: true,
      },
      {
        key: "bank_name",
        label: "Bank Name",
        type: "text",
        required: true,
      },
      {
        key: "branch_name",
        label: "Branch Name",
        type: "text",
        required: true,
      },
      {
        key: "iban",
        label: "IBAN",
        type: "text",
        required: true,
      },
      {
        key: "ifsc_code",
        label: "IFSC Code",
        type: "text",
        required: true,
      },
      {
        key: "generalQuantity",
        label: "General Quantity",
        type: "number",
        required: true,
      },
      {
        key: "numberOfItems",
        label: "Number of Items",
        type: "number",
        required: false,
      },
      {
        key: "quantityPerItem",
        label: "Quantity per Item",
        type: "number",
        required: false,
      },
      {
        key: "received_date",
        label: "Received Date",
        type: "date",
        required: true,
      },
      {
        key: "received_product",
        label: "Received Product",
        type: "text",
        required: true,
      },
      {
        key: "received_product_stock",
        label: "Received Product Stock",
        type: "text",
        required: true,
      },
      {
        key: "reorder_level",
        label: "Reorder Level",
        type: "number",
        required: false,
      },
      {
        key: "numberOfUnits",
        label: "Number of Units",
        type: "number",
        required: true,
      },
      {
        key: "total",
        label: "Total",
        type: "number",
        required: true,
      },
      {
        key: "unit",
        label: "Unit",
        type: "text",
        required: false,
      },
      {
        key: "selectedQuantityType",
        label: "Selected Quantity Type",
        type: "select",
        options: ["kg", "liter", "pieces"], // example options
        required: true,
      },
      {
        key: "selectedStock",
        label: "Selected Stock",
        type: "text",
        required: true,
      },
      {
        key: "stock_ordered_date",
        label: "Stock Ordered Date",
        type: "date",
        required: false,
      },
      {
        key: "supplier_contact_person",
        label: "Supplier Contact Person",
        type: "text",
        required: true,
      },
      {
        key: "supplier_email_address",
        label: "Supplier Email Address",
        type: "email",
        required: true,
      },
      {
        key: "supplier_gst_number",
        label: "Supplier GST Number",
        type: "text",
        required: false,
      },
      {
        key: "supplier_minimum_order_quantity",
        label: "Supplier Minimum Order Quantity",
        type: "number",
        required: false,
      },
      {
        key: "supplier_mobile_number",
        label: "Supplier Mobile Number",
        type: "text",
        required: true,
      },
      {
        key: "supplier_name",
        label: "Supplier Name",
        type: "text",
        required: true,
      },
      {
        key: "supplier_time_zone",
        label: "Supplier Time Zone",
        type: "text",
        required: false,
      },
      {
        key: "supplier_tin_number",
        label: "Supplier TIN Number",
        type: "text",
        required: false,
      },
      {
        key: "swift_code",
        label: "SWIFT Code",
        type: "text",
        required: false,
      },
    ],
  };

  export const WORK_MANAGEMENT_FORM_FIELDS: any = {
    "fields": [
                    {
                        "key": "first_name",
                        "label": "First Name",
                        "required": true,
                        "type": "text"
                    },
                    {
                        "key": "last_name",
                        "label": "Last Name",
                        "required": true,
                        "type": "text"
                    },
                    {
                        "key": "phone_number",
                        "label": "Phone Number",
                        "required": true,
                        "type": "number"
                    },
                    {
                        "key": "age",
                        "label": "Age",
                        "required": true,
                        "type": "number"
                    },
                    {
                        "key": "gender",
                        "label": "Gender",
                        "options": [
                            {
                                "gender": "Male",
                                "value": "male"
                            },
                            {
                                "gender": "Female",
                                "value": "female"
                            },
                            {
                                "gender": "Others",
                                "value": "other"
                            }
                        ],
                        "required": true,
                        "type": "select"
                    },
                    {
                        "key": "home_address",
                        "label": "Home Address",
                        "required": true,
                        "type": "text"
                    },
                    {
                        "key": "date_of_joining",
                        "label": "Date of Joining",
                        "required": true,
                        "type": "date"
                    },
                    {
                        "key": "employment_type",
                        "label": "Employment Type",
                        "options": [
                            {
                                "employment_type": "Hourly",
                                "value": "hourly"
                            },
                            {
                                "employment_type": "Daily",
                                "value": "daily"
                            },
                            {
                                "employment_type": "Permanent",
                                "value": "permanent"
                            },
                            {
                                "employment_type": "Contract",
                                "value": "contract"
                            }
                        ],
                        "required": true,
                        "type": "select"
                    },
                    {
                        "key": "job_role",
                        "label": "Job Role",
                        "required": true,
                        "type": "text"
                    },
                    // {
                    //     "key": "worksite",
                    //     "label": "Project/Worksite",
                    //     "required": true,
                    //     "type": "select",
                    //     "options" : []
                    // },
                    {
                        "key": "skill_type",
                        "label": "Skill Type",
                        "options": [
                            {
                                "skill_type": "Skilled",
                                "value": "skilled"
                            },
                            {
                                "skill_type": "Semi Skilled",
                                "value": "semi_skilled"
                            },
                            {
                                "skill_type": "Un Skilled",
                                "value": "un_skilled"
                            }
                        ],
                        "required": true,
                        "type": "select"
                    },
                    {
                        "key": "skills",
                        "label": "Skills",
                        "required": true,
                        "type": "text"
                    },
                    {
                        "key": "wages_per_hour",
                        "label": "Wages per Hour",
                        "required": true,
                        "type": "number"
                    }
                ]
  }
  
export const DYNAMIC_FORM_OBJ : any={
  jobs : JOB_CREATION_FORM_FIELDS,
  stocks : STOCK_RECEIVE_FORM_FIELDS,
suppliers : STOCK_RECEIVE_FORM_FIELDS,
"work-management" : WORK_MANAGEMENT_FORM_FIELDS,
  
}
export const ADD_VENDOR_FORM_DATA = [
    {
        label: "Vendor Name",
        name: "vendor_name",
        type: "text",
        placeholder: "Enter Vendor Name",
    },
    
    {
        label: "Vendor Shop Name",
        name: "shopName",
        type: "email",
        placeholder: "Enter Vendor Email",
    }
    ,
    {
        label: "Vendor Email",
        name: "vendor_email",
        type: "email",
        placeholder: "Enter Vendor Email",
    },
    {
        label: "Vendor Phone",
        name: "vendor_phone",
        type: "text",
        placeholder: "Enter Vendor Phone",
    },
    {
        label: "Vendor Address",
        name: "vendor_address",
        type: "text",
        placeholder: "Enter Vendor Address",    
    },

];



export const ADD_VENDOR_INITIAL_VALUES = {
    vendor_name: "",
    shopName: "",
    vendor_email: "",
    vendor_phone: "",
    vendor_address: "",
    
}


export const ADD_VENDOR_SUPPLIER_IDENTIFICATION_1 = [
    {

        label : 'Supplier Name',
        type : 'text',
        placeholder : 'Enter Supplier Name',
        required : true,
        id : "supplier_name",
        name : "supplier_name",
    },

    {

        label : 'Supplier Category',
        type : 'dropdown',
        placeholder : 'Select Supplier Category',
        required : true,
        id : "supplier_category",
        name : "supplier_category",
    },

    {

        label : 'Supplier Contact Person',
        type : 'text',
        placeholder : 'Enter Name of Contact Person',
        required : true,
        id : "supplier_contact_person",
        name : "supplier_contact_person",
    },

    {

        label : 'Supplier Shop Logo',
        type : 'file',
        placeholder : 'Select the Logo',
        required : false,
        id : "supplier_logo",
        name : "supplier_logo",
    },

];
  

export const ADD_VENDOR_SUPPLIER_CONTACT_INFORMATION_2 = [
    {
      id: 'supplier_mobile_number',
      label: 'Supplier mobile number',
      type: 'text',
      placeholder: 'Enter Supplier Mobile Number',
      required: true,
      name: 'supplier_mobile_number',
    },
    {
      id: 'supplier_email_address',
      label: 'Supplier email address',
      type: 'email',
      placeholder: 'Enter Supplier Email Address',
      required: true,
      name: 'supplier_email_address',
    },
    {
      id: 'supplier_country',
      label: 'Supplier Country',
      type: 'dropdown',
      placeholder: 'Enter Country',
      required: true,
      name: 'supplier_country',
    },
    {

      label: 'Supplier time zone',
      type: 'dropdown',
      placeholder: 'Enter Supplier Time Zone',
      required: true,
      name: 'supplier_time_zone',
      id: 'supplier_time_zone',
    },
    {
      id: 'supplier_website_url',
      label: 'Supplier website URL',
      type: 'text',
      placeholder: 'Enter Supplier Website URL',
      required: false,
      name: 'supplier_website_url',
    },
   
    {
      id: 'supplier_shop_street_area_locality',
      label: 'Supplier Shop Street, Area, Locality',
      type: 'text',
      placeholder: 'Enter Supplier Shop Street, Area, Locality',
      required: true,
      name: 'supplier_shop_street_area_locality',
    },
    {
      id: 'supplier_district',
      label: 'Supplier City/District',
      type: 'text',
      placeholder: 'Enter City/District',
      required: true,
      name: 'supplier_district',
    },
    {
      id: 'supplier_state',
      label: 'Supplier State',
      type: 'text',
      placeholder: 'Enter Supplier State',
      required: true,
      name: 'supplier_state',
    },
   

    {
      id: 'supplier_zip_postal_code',
      label: 'Supplier zip/postal code',
      type: 'text',
      placeholder: 'Enter Supplier Zip/Postal Code',
      required: true,
      name: 'supplier_zip_postal_code',
    },
 
    // {
    //     id: 'supply-contact-4',
    //     label: 'Supplier physical address',
    //     type: 'textarea',
    //     placeholder: 'Enter Supplier Physical Address',
    //     required: true,
    //     name: 'supplier_physical_address',
    //   },
    {
      id: 'supplier_social_media_handles',
      label: 'Supplier social media handles',
      type: 'text',
      placeholder: 'Enter Supplier Social Media Handles (e.g., LinkedIn, Twitter)',
      required: false,
      name: 'supplier_social_media_handles',
    },
  ];
  
  export const ADD_VENDOR_SUPPLIER_FINANCIAL_INFORMATION_3 = [
    {
      id:  'supplier_gst_number',
      label: 'Supplier GST number',
      type: 'text',
      placeholder: 'Enter Supplier GST Number',
      required: true,
      name: 'supplier_gst_number',
    },
    {
      id: 'supplier_tin_number',
      label: 'Supplier TIN number',
      type: 'text',
      placeholder: 'Enter Supplier TIN (Tax Identification Number)',
      required: true,
      name: 'supplier_tin_number',
    },
    {
      id:'supplier_payment_terms',
      label: 'Supplier payment terms',
      type: 'dropdown',
      placeholder: 'Select Payment Terms (e.g., Net 30, Advance Payment)',
      required: true,
      name: 'supplier_payment_terms',
    },
    {
      id: 'supplier_credit_limit',
      label: 'Supplier credit limit',
      type: 'number',
      placeholder: 'Enter Supplier Credit Limit (if applicable)',
      required: false,
      name: 'supplier_credit_limit',
    },
    {
      id: 'supplier_currency',
      label: 'Supplier currency',
      type: 'dropdown',
      placeholder: 'Select Transaction Currency (e.g., USD, INR, CNY)',
      required: true,
      name: 'supplier_currency',
    },
    // Flattened fields under Supplier Banking Information
    {
      id: 'bank_name',
      label: 'Bank name',
      type: 'text',
      placeholder: 'Enter Bank Name',
      required: true,
      name: 'bank_name',
    },
    {
      id: 'account_number',
      label: 'Account number',
      type: 'text',
      placeholder: 'Enter Account Number',
      required: true,
      name: 'account_number',
    },
    {
      id: 'ifsc_code',
      label: 'IFSC code / SWIFT code',
      type: 'text',
      placeholder: 'Enter IFSC or SWIFT Code',
      required: true,
      name: 'ifsc_code',
    },
    {
      id: 'branch_name',
      label: 'Branch name',
      type: 'text',
      placeholder: 'Enter Branch Name',
      required: false,
      name: 'branch_name',
    },
    {
      id: 'iban',
      label: 'IBAN',
      type: 'text',
      placeholder: 'Enter IBAN (for international payments)',
      required: false,
      name: 'iban',
    },
    {
      id: 'swift_code',
      label: 'SWIFT code',
      type: 'text',
      placeholder: 'Enter SWIFT Code',
      required: false,
      name: 'swift_code',
    },
  ];
  

  
  export const ADD_VENDOR_SUPPLIER_PRODUCT_INFORMATION_4 = [
    // {
    //   id: 'supply_product_1',
    //   label: 'Supplier supplied products',
    //   type: 'dropdown',
    //   placeholder: 'Select Supplied Products/Materials (e.g., poly film, irrigation systems, fertilizers)',
    //   required: true,
    //   name: 'supplier_supplied_products',
    //   options: [], // This will be populated dynamically from the server
    // },
    // {
    //   id: 'supply_product_2',
    //   label: 'Supplier product categories',
    //   type: 'dropdown',
    //   placeholder: 'Select Product Categories (e.g., organic fertilizers, hardware, irrigation equipment)',
    //   required: true,
    //   name: 'supplier_product_categories',
    //   options: [], // This will be populated dynamically from the server
    // },
    {
      id:'supplier_product_specifications',
      label: 'Supplier product specifications',
      type: 'textarea',
      placeholder: 'Enter Product Specifications (e.g., size, weight, chemical composition, durability)',
      required: true,
      name: 'supplier_product_specifications',
    },
    {
      id:'supplier_unit_price',
      label: 'Supplier unit price',
      type: 'number',
      placeholder: 'Enter Unit Price for the Product/Material',
      required: true,
      name: 'supplier_unit_price',
    },
    {
      id: 'supplier_minimum_order_quantity',
      label: 'Supplier minimum order quantity',
      type: 'number',
      placeholder: 'Enter Minimum Order Quantity (MOQ)',
      required: true,
      name: 'supplier_minimum_order_quantity',
    },
    {
      id:  'supplier_lead_time',
      label: 'Supplier lead time',
      type: 'text',
      placeholder: 'Enter Lead Time (Time taken to fulfill order)',
      required: true,
      name: 'supplier_lead_time',
    },
    {
      id: 'supplier_delivery_mode',
      label: 'Supplier delivery mode',
      type: 'dropdown',
      placeholder: 'Select Delivery Mode (e.g., air freight, sea freight, local courier)',
      required: true,
      name: 'supplier_delivery_mode',
      options: [
        { value: 'air_freight', label: 'Air Freight' },
        { value: 'sea_freight', label: 'Sea Freight' },
        { value: 'local_courier', label: 'Local Courier' },
      ], // Static options for now, can be dynamically populated if needed
    },
    {
      id:'supplier_delivery_locations',
      label: 'Supplier delivery locations',
      type: 'text',
      placeholder: 'Enter Delivery Locations (Geographic regions where the supplier delivers)',
      required: true,
      name: 'supplier_delivery_locations',
    },
    {
      id: 'expected_delivery_in_days',
      label: 'Expected Delivery in Days',
      type: 'dropdown',
      placeholder: 'Select Delivery Mode (e.g., air freight, sea freight, local courier)',
      required: true,
      name: 'expected_delivery_in_days',
       // Static options for now, can be dynamically populated if needed
    },
  ];
    
  export const ADD_VENDOR_SUPPLIER_PERFORMANCE_METRICS_5 = [
    {
      id: 'supplier_on_time_delivery_rate',
      label: 'Supplier on-time delivery rate',
      type: 'number',
      placeholder: 'Enter On-Time Delivery Rate (%)',
      required: true,
      name: 'supplier_on_time_delivery_rate',
      min: 0,
      max: 100,
    },
    {
      id:'supplier_order_fulfillment_accuracy',
      label: 'Supplier order fulfillment accuracy',
      type: 'number',
      placeholder: 'Enter Order Fulfillment Accuracy (%)',
      required: true,
      name: 'supplier_order_fulfillment_accuracy',
      min: 0,
      max: 100,
    },
    {
      id: 'supplier_return_rate',
      label: 'Supplier return rate',
      type: 'number',
      placeholder: 'Enter Return Rate (%)',
      required: true,
      name: 'supplier_return_rate',
      min: 0,
      max: 100,
    },
    {
      id: 'supplier_quality_rating',
      label: 'Supplier quality rating',
      type: 'number',
      placeholder: 'Enter Quality Rating (1-5)',
      required: true,
      name: 'supplier_quality_rating',
      min: 1,
      max: 5,
    },
    {
      id: 'supplier_customer_support_rating',
      label: 'Supplier customer support rating',
      type: 'number',
      placeholder: 'Enter Customer Support Rating (1-5)',
      required: true,
      name: 'supplier_customer_support_rating',
      min: 1,
      max: 5,
    },
    {
      id: 'supplier_contract_expiry_date',
      label: 'Supplier contract expiry date',
      type: 'date',
      placeholder: 'Enter Supplier Contract Expiry Date',
      required: false,
      name: 'supplier_contract_expiry_date',
    },
  ];
  
  

  export const ADD_VENDOR_SUPPLIER_CERTIFICATIONS_COMPLIANCE_6 = [
    {
      id:'supplier_compliance_certifications',
      label: 'Supplier compliance certifications',
      type: 'textarea',
      placeholder: 'Enter Supplier Compliance Certifications (e.g., ISO, HACCP)',
      required: true,
      name: 'supplier_compliance_certifications',
    },
    {
      id: 'supplier_environmental_standards',
      label: 'Supplier environmental standards',
      type: 'textarea',
      placeholder: 'Enter Supplier Environmental Standards (e.g., Sustainability, Recycling)',
      required: true,
      name: 'supplier_environmental_standards',
    },
    {
      id: 'supplier_safety_certifications',
      label: 'Supplier safety certifications',
      type: 'textarea',
      placeholder: 'Enter Supplier Safety Certifications (e.g., Safety Protocols for Handling Chemicals)',
      required: true,
      name: 'supplier_safety_certifications',
    },
    {
      id: 'supplier_licenses_and_permits',
      label: 'Supplier licenses and permits',
      type: 'textarea',
      placeholder: 'Enter Supplier Licenses and Permits (e.g., Chemical Handling License)',
      required: true,
      name: 'supplier_licenses_and_permits',
    },
    {
      id:'supplier_audit_history',
      label: 'Supplier audit history',
      type: 'textarea',
      placeholder: 'Enter Supplier Audit History (if applicable)',
      required: false,
      name: 'supplier_audit_history',
    },
  ];
  
  
  export const ADD_VENDOR_SUPPLIER_AGREEMENTS_CONTRACTS_7 = [
    {
      id: 'supplier_agreement_type',
      label: 'Supplier agreement type',
      type: 'dropdown',
      placeholder: 'Select Supplier Agreement Type (e.g., Exclusive, Non-Exclusive, Short-Term, Long-Term)',
      required: true,
      name: 'supplier_agreement_type',
      options: [
        { value: 'exclusive', label: 'Exclusive' },
        { value: 'non-exclusive', label: 'Non-Exclusive' },
        { value: 'short-term', label: 'Short-Term' },
        { value: 'long-term', label: 'Long-Term' },
      ],
    },
    {
      id:  'supplier_contract_start_date',
      label: 'Supplier contract start date',
      type: 'date',
      placeholder: 'Enter Contract Start Date',
      required: true,
      name: 'supplier_contract_start_date',
    },
    {
      id:'supplier_contract_expiry_date',
      label: 'Supplier contract expiry date',
      type: 'date',
      placeholder: 'Enter Contract Expiry Date',
      required: true,
      name: 'supplier_contract_expiry_date',
    },
    {
      id: 'supplier_renewal_terms',
      label: 'Supplier renewal terms',
      type: 'textarea',
      placeholder: 'Enter Renewal Terms (if applicable)',
      required: false,
      name: 'supplier_renewal_terms',
    },
    {
      id: 'supplier_penalties_clauses',
      label: 'Supplier penalties clauses',
      type: 'textarea',
      placeholder: 'Enter Penalties or Clauses (e.g., Late Delivery, Non-Compliance)',
      required: false,
      name: 'supplier_penalties_clauses',
    },
  ];
  
  
  export const ADD_VENDOR_SUPPLIER_RELATIONSHIP_HISTORY_8 = [
    {
      id: 'supplier_first_transaction_date',
      label: 'Supplier first transaction date',
      type: 'date',
      placeholder: 'Enter Supplier First Transaction Date',
      required: true,
      name: 'supplier_first_transaction_date',
    },
    {
      id:'supplier_total_transaction_volume',
      label: 'Supplier total transaction volume',
      type: 'number',
      placeholder: 'Enter Total Transaction Volume/Value',
      required: true,
      name: 'supplier_total_transaction_volume',
    },
    {
      id: 'supplier_communication_history',
      label: 'Supplier communication history',
      type: 'textarea',
      placeholder: 'Enter Supplier Communication History (e.g., Issues, Negotiations)',
      required: false,
      name: 'supplier_communication_history',
    },
    {
      id:  'supplier_discounts_offers',
      label: 'Supplier discounts and offers',
      type: 'textarea',
      placeholder: 'Enter Supplier Discounts and Offers (e.g., Seasonal Offers, Rebates)',
      required: false,
      name: 'supplier_discounts_offers',
    },
    {
      id:'supplier_notes',
      label: 'Supplier notes',
      type: 'textarea',
      placeholder: 'Enter Additional Notes on Supplier (e.g., Reliability, Behavior)',
      required: false,
      name: 'supplier_notes',
    },
  ];
  
  
  export const ADD_VENDOR_SUPPLIER_RISK_MANAGEMENT_EVALUATION_9 = [
    {
      id:  'supplier_risk_level',
      label: 'Supplier risk level',
      type: 'dropdown',
      placeholder: 'Select Supplier Risk Level (e.g., Low, Medium, High)',
      required: true,
      name: 'supplier_risk_level',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
    },
    {
      id: 'supplier_backup_supplier_availability',
      label: 'Supplier backup supplier availability',
      type: 'checkbox',
      placeholder: 'Is Backup Supplier Available for Critical Materials?',
      required: false,
      options : [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
      name: 'supplier_backup_supplier_availability',
    },
    {
      id: 'supplier_risk_mitigation_plan',
      label: 'Supplier risk mitigation plan',
      type: 'textarea',
      placeholder: 'Enter Risk Mitigation Plan (e.g., Steps to Mitigate Supply Chain Risks)',
      required: false,
      name: 'supplier_risk_mitigation_plan',
    },
  ];
  
  
  export const ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10 = [
    {
      id:'supplier_internal_feedback',
      label: 'Supplier internal feedback',
      type: 'textarea',
      placeholder: 'Enter Internal Feedback (e.g., Procurement, Operations, Quality Control)',
      required: false,
      name: 'supplier_internal_feedback',
    },
    {
      id:'supplier_external_reviews',
      label: 'Supplier external reviews',
      type: 'textarea',
      placeholder: 'Enter External Reviews (Industry Reputation or Client Reviews)',
      required: false,
      name: 'supplier_external_reviews',
    },
    {
      id:  'supplier_evaluation_date',
      label: 'Supplier evaluation date',
      type: 'date',
      placeholder: 'Enter Date of Last Supplier Evaluation or Audit',
      required: true,
      name: 'supplier_evaluation_date',
    },
    {
      id: 'supplier_evaluation_score',
      label: 'Supplier evaluation score',
      type: 'number',
      placeholder: 'Enter Supplier Evaluation Score (Rating)',
      required: true,
      name: 'supplier_evaluation_score',
    },
  ];
  
  export const ADD_VENDOR_SUPPLIER_LOGISTICS_INFORMATION_11 = [
    {
      id:  'supplier_warehouse_locations',
      label: 'Supplier warehouse locations',
      type: 'textarea',
      placeholder: 'Enter Supplier Warehouse Locations (e.g., New York, Chicago, LA)',
      required: true,
      name: 'supplier_warehouse_locations',
    },
    {
      id: 'supplier_delivery_time_zones',
      label: 'Supplier delivery time zones',
      type: 'textarea',
      placeholder: 'Enter Delivery Time Zones (e.g., EST, GMT, IST)',
      required: true,
      name: 'supplier_delivery_time_zones',
    },
    {
      id:  'supplier_shipping_partner_information',
      label: 'Supplier shipping partner information',
      type: 'textarea',
      placeholder: 'Enter Shipping Partner Information (e.g., DHL, FedEx, Maersk)',
      required: true,
      name: 'supplier_shipping_partner_information',
    },
  ];
  

  export const  SELECTED_FIELDS= [
    {
      id: 1,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_PERFORMANCE_METRICS_5 : 'ADD_VENDOR_SUPPLIER_PERFORMANCE_METRICS_5',
      label : 'Supplier Performance Metrics',
      value : 'SUPPLIER PERFORMANCE METRICS',
    },
    {
      id: 2,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_AGREEMENTS_CONTRACTS_7 : 'ADD_VENDOR_SUPPLIER_AGREEMENTS_CONTRACTS_7',
      label : 'Supplier Agreements and Contracts',
      value : 'SUPPLIER AGREEMENTS AND CONTRACTS',
    },
    {
      id: 3,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_RELATIONSHIP_HISTORY_8 : 'ADD_VENDOR_SUPPLIER_RELATIONSHIP_HISTORY_8',
      label : 'Supplier Relationship History',
      value : 'SUPPLIER RELATIONSHIP HISTORY',
    },
    {
      id: 4,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_RISK_MANAGEMENT_EVALUATION_9 : 'ADD_VENDOR_SUPPLIER_RISK_MANAGEMENT_EVALUATION_9',
      label : 'Supplier Risk Management',
      value : 'SUPPLIER RISK MANAGEMENT',
    },
    {
      id: 5,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10 : 'ADD_VENDOR_SUPPLIER_FEEDBACK_REVIEWS_10',
      label : 'Supplier Feedback and Reviews',
      value : 'SUPPLIER FEEDBACK AND REVIEWS',
    },
    {
      id: 6,
      isSelected : false,
      ADD_VENDOR_SUPPLIER_LOGISTICS_INFORMATION_11 : 'ADD_VENDOR_SUPPLIER_LOGISTICS_INFORMATION_11',
      label : 'Supplier Logistics Information',
      value : 'SUPPLIER LOGISTICS INFORMATION',
    },
    
  ]

  export const ADD_SUPPLIER_DROPDOWN_OPTIONS : any= {
    supplier_category:  [
      {
        id: 'supplier_category-1',
        label: 'Metal Supplier',
        value: 'metal_supplier',
      },
      {
        id: 'supplier_category-2',
        label: 'Wood Supplier',
        value: 'wood_supplier',
      },
      {
        id: 'supplier_category-3',
        label: 'Fertilizer Supplier',
        value: 'fertilizer_supplier',
      },
    ],
    
    supplier_time_zone: [
      {
        id: 'supplier_time_zone-IST',
        label: 'Indian Standard Time',
        value: 'IST (UTC+05:30)',
      },
      {
        id: 'supplier_time_zone-EST',
        label: 'Eastern Standard Time',
        value: 'EST (UTC-05:00)',
      },
      {
        id: 'supplier_time_zone-EDT',
        label: 'Eastern Daylight Time',
        value: 'EDT (UTC-04:00)',
      },
      {
        id: 'supplier_time_zone-PST',
        label: 'Pacific Standard Time',
        value: 'PST (UTC-08:00)',
      },
      {
        id: 'supplier_time_zone-PDT',
        label: 'Pacific Daylight Time',
        value: 'PDT (UTC-07:00)',
      },
      {
        id: 'supplier_time_zone-CST',
        label: 'Central Standard Time',
        value: 'CST (UTC-06:00)',
      },
      {
        id: 'supplier_time_zone-CDT',
        label: 'Central Daylight Time',
        value: 'CDT (UTC-05:00)',
      },
      {
        id: 'supplier_time_zone-GMT',
        label: 'Greenwich Mean Time',
        value: 'GMT (UTC+00:00)',
      },
      {
        id: 'supplier_time_zone-UTC',
        label: 'Coordinated Universal Time',
        value: 'UTC (UTC+00:00)',
      },
    ],
    supplier_currency: [
      {
        id: 'supplier_currency-USD',
        label: 'United States Dollar',
        value: 'USD (United States Dollar)',
      },
      {
        id: 'supplier_currency-EUR',
        label: 'Euro',
        value: 'EUR (Euro)',
      },
      {
        id: 'supplier_currency-GBP',
        label: 'British Pound Sterling',
        value: 'GBP (British Pound Sterling)',
      },
      {
        id: 'supplier_currency-JPY',
        label: 'Japanese Yen',
        value: 'JPY (Japanese Yen)',
      },
      {
        id: 'supplier_currency-INR',
        label: 'Indian Rupee',
        value: 'INR (Indian Rupee)',
      },
    ],
    supplier_country : [
      { id: 'supplier_country-af', label: 'Afghanistan', value: 'afghanistan' },
      { id: 'supplier_country-al', label: 'Albania', value: 'albania' },
      { id: 'supplier_country-dz', label: 'Algeria', value: 'algeria' },
      { id: 'supplier_country-ar', label: 'Argentina', value: 'argentina' },
      { id: 'supplier_country-au', label: 'Australia', value: 'australia' },
      { id: 'supplier_country-at', label: 'Austria', value: 'austria' },
      { id: 'supplier_country-io', label: 'British Indian Ocean Territory', value: 'britishindianoceanterritory' },
      { id: 'supplier_country-vg', label: 'British Virgin Islands', value: 'britishvirginislands' },
      { id: 'supplier_country-bn', label: 'Brunei', value: 'brunei' },
      { id: 'supplier_country-bg', label: 'Bulgaria', value: 'bulgaria' },
      { id: 'supplier_country-bf', label: 'Burkina Faso', value: 'burkinafaso' },
      { id: 'supplier_country-hk', label: 'Hong Kong', value: 'hongkong' },
      { id: 'supplier_country-hu', label: 'Hungary', value: 'hungary' },
      { id: 'supplier_country-is', label: 'Iceland', value: 'iceland' },
      { id: 'supplier_country-in', label: 'India', value: 'india' },
      { id: 'supplier_country-id', label: 'Indonesia', value: 'indonesia' },
      { id: 'supplier_country-ir', label: 'Iran', value: 'iran' },
      { id: 'supplier_country-iq', label: 'Iraq', value: 'iraq' },
      { id: 'supplier_country-ie', label: 'Ireland', value: 'ireland' },
      { id: 'supplier_country-np', label: 'Nepal', value: 'nepal' },
      { id: 'supplier_country-nl', label: 'Netherlands', value: 'netherlands' },
      { id: 'supplier_country-ug', label: 'Uganda', value: 'uganda' },
      { id: 'supplier_country-ua', label: 'Ukraine', value: 'ukraine' },
      { id: 'supplier_country-ae', label: 'United Arab Emirates', value: 'uae' },
      { id: 'supplier_country-gb', label: 'United Kingdom', value: 'uk' },
      { id: 'supplier_country-us', label: 'United States', value: 'usa' },
      { id: 'supplier_country-uy', label: 'Uruguay', value: 'uruguay' },
      { id: 'supplier_country-uz', label: 'Uzbekistan', value: 'uzbekistan' }
    ],
    supplier_payment_terms : [
      { id: 'supplier_payment_terms-Net 30', label: 'Net 30 (30 days after invoice)', value: 'Net 30' },
      { id: 'supplier_payment_terms-Advance Payment-5', label: '5 Days Advance Payment', value: '5 Days Advance Payment' },
      { id: 'supplier_payment_terms-Advance Payment-10', label: '10 Days Advance Payment', value: '10 Days Advance Payment' },
      { id: 'supplier_payment_terms-Advance Payment-15', label: '15 Days Advance Payment', value: '15 Days Advance Payment' },
      { id: 'supplier_payment_terms-Advance Payment-1Month', label: '1 Month Advance Payment', value: '1 Month Advance Payment' },
      { id: 'supplier_payment_terms-After Delivery-5', label: '5 Days After Delivery', value: '5 Days After Delivery' },
      { id: 'supplier_payment_terms-After Delivery-10', label: '10 Days After Delivery', value: '10 Days After Delivery' },
      { id: 'supplier_payment_terms-After Delivery-15', label: '15 Days After Delivery', value: '15 Days After Delivery' },
      { id: 'supplier_payment_terms-After Delivery-1Month', label: '1 Month After Delivery', value: '1 Month After Delivery' },
      { id: 'supplier_payment_terms-On Spot-Cash', label: 'On Spot Payment - Cash', value: 'On Spot Payment - Cash' },
      { id: 'supplier_payment_terms-On Spot-Cheque', label: 'On Spot Payment - Cheque', value: 'On Spot Payment - Cheque' },
      { id: 'supplier_payment_terms-On Spot-Internet', label: 'On Spot Payment - Internet', value: 'On Spot Payment - Internet' }
    ],
    supplier_delivery_mode: [
      {
        "id": "supplier_delivery_mode-air_freight",
        "label": "Air Freight",
        "value": "Air Freight"
      },
      {
        "id": "supplier_delivery_mode-sea_freight",
        "label": "Sea Freight",
        "value": "Sea Freight"
      },
      {
        "id": "supplier_delivery_mode-local_courier",
        "label": "Local Courier",
        "value": "Local Courier"
      },
      {
        "id": "supplier_delivery_mode-express_shipping",
        "label": "Express Shipping",
        "value": "Express Shipping"
      },
      {
        "id": "supplier_delivery_mode-road_transport",
        "label": "Road Transport",
        "value": "Road Transport"
      },
      {
        "id": "supplier_delivery_mode-rail_freight",
        "label": "Rail Freight",
        "value": "Rail Freight"
      },
      {
        "id": "supplier_delivery_mode-door_to_door",
        "label": "Door-to-Door Delivery",
        "value": "Door-to-Door Delivery"
      },
      {
        "id": "supplier_delivery_mode-pickup",
        "label": "Pickup",
        "value": "Pickup"
      },
      {
        "id": "supplier_delivery_mode-same_day_delivery",
        "label": "Same-Day Delivery",
        "value": "Same-Day Delivery"
      },
      {
        "id": "supplier_delivery_mode-freight_on_board",
        "label": "Freight on Board (FOB)",
        "value": "Freight on Board (FOB)"
      }
    ],
    
    supplier_agreement_type : [
      {
        "id": "supplier_agreement_type-exclusive",
        "label": "Exclusive",
        "value": "Exclusive"
      },
      {
        "id": "supplier_agreement_type-non_exclusive",
        "label": "Non-Exclusive",
        "value": "Non-Exclusive"
      },
      {
        "id": "supplier_agreement_type-short_term",
        "label": "Short-Term",
        "value": "Short-Term"
      },
      {
        "id": "supplier_agreement_type-long_term",
        "label": "Long-Term",
        "value": "Long-Term"
      },
      {
        "id": "supplier_agreement_type-project_based",
        "label": "Project-Based",
        "value": "Project-Based"
      },
      {
        "id": "supplier_agreement_type-annual",
        "label": "Annual",
        "value": "Annual"
      },
      {
        "id": "supplier_agreement_type-open_ended",
        "label": "Open-Ended",
        "value": "Open-Ended"
      }
    ],
    supplier_risk_level :[
      {
        "id": "supplier_risk_level-low",
        "label": "Low Risk",
        "value": "Low Risk"
      },
      {
        "id": "supplier_risk_level-moderate",
        "label": "Moderate Risk",
        "value": "Moderate Risk"
      },
      {
        "id": "supplier_risk_level-high",
        "label": "High Risk",
        "value": "High Risk"
      },
      {
        "id": "supplier_risk_level-critical",
        "label": "Critical Risk",
        "value": "Critical Risk"
      },
      {
        "id": "supplier_risk_level-unknown",
        "label": "Unknown Risk",
        "value": "Unknown Risk"
      }
    ],
    expected_delivery_in_days : [
      {
        id: "expected_delivery_in_days-5days",
        label: "Within 5 days",
        value: 5,
      },
      {
        id: "expected_delivery_in_days-10days",
        label: "Within 10 days",
        value: 10,
      },
      {
        id: "expected_delivery_in_days-15days",
        label: "Within 15 days",
        value: 15,
      },
      {
        id: "expected_delivery_in_days-20days",
        label: "Within 20 days",
        value: 20,
      },
      {
        id: "expected_delivery_in_days-30days",
        label: "Within 30 days",
        value: 30,
      },
      {
        id: "expected_delivery_in_days-45days",
        label: "Within 45 days",
        value: 45,
      },
    ]
    
  }
  


  export const DUMMY_SENSORS_VALUES = [
    {
      sensor_name: "Temp Sensor 01",
      sensor_type: "temperature",
      installation_date: "2025-01-15",
      status: "active",
      threshold_maximum: 35,
      threshold_minimum: 18,
      actual_value: 25,
      absolute_minimum: 0,
      absolute_maximum: 50,
      unit: "°C"
    },
    {
      sensor_name: "Humidity Sensor 02",
      sensor_type: "humidity",
      installation_date: "2025-02-10",
      status: "active",
      threshold_maximum: 80,
      threshold_minimum: 40,
      actual_value: 65,
      absolute_minimum: 30,
      absolute_maximum: 95,
      unit: "%"
    },
    {
      sensor_name: "Moisture Sensor 03",
      sensor_type: "moisture",
      installation_date: "2025-03-05",
      status: "maintenance",
      threshold_maximum: 70,
      threshold_minimum: 30,
      actual_value: 50,
      absolute_minimum: 10,
      absolute_maximum: 90,
      unit: "%"
    },
    {
      sensor_name: "CO2 Sensor 04",
      sensor_type: "co2",
      installation_date: "2025-04-01",
      status: "inactive",
      threshold_maximum: 1200,
      threshold_minimum: 500,
      actual_value: 800,
      absolute_minimum: 300,
      absolute_maximum: 2000,
      unit: "ppm"
    },
    {
      sensor_name: "Temp Sensor 05",
      sensor_type: "temperature",
      installation_date: "2025-05-12",
      status: "active",
      threshold_maximum: 32,
      threshold_minimum: 16,
      actual_value: 28,
      absolute_minimum: 0,
      absolute_maximum: 50,
      unit: "°C"
    }
  ]
  
  export const DUMMY_PLOT_LISTS = [
    { label: "Plot 1", value: "plot-1" },
    { label: "Plot 2", value: "plot-2" },
    { label: "Plot 3", value: "plot-3" },
    { label: "Plot 4", value: "plot-4" },
]
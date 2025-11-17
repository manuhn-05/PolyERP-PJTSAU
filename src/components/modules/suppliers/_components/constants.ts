import { z } from "zod";

export const supplierSchema = z.object({
  supplier_supplied_products: z.string().min(1, "Required"),
  supplier_product_categories: z.array(z.string()).min(1, "Required"),
  supplier_supplied_brands: z.string().min(1, "Required"),
  supplier_employee_strength: z.string().min(1, "Required"),
  supplier_gst_number: z.string().min(1, "Required"),
  supplier_pan_number: z.string().min(1, "Required"),
  supplier_email: z.string().email("Invalid email"),
  supplier_phone_number: z.string().min(1, "Required"),
  supplier_street_address: z.string().min(1, "Required"),
  supplier_city: z.string().min(1, "Required"),
  supplier_state: z.string().min(1, "Required"),
  supplier_country: z.string().min(1, "Required"),
  supplier_contact_person_name: z.string().min(1, "Required"),
  supplier_contact_person_designation: z.string().min(1, "Required"),
  supplier_contact_person_mobile_number: z.string().min(1, "Required"),
  supplier_contact_person_email: z.string().email("Invalid email"),
  supplier_preferred_contact_method: z.string().min(1, "Required"),
  supplier_preferred_payment_method: z.string().min(1, "Required"),
  supplier_bank_name: z.string().min(1, "Required"),
  supplier_branch_name: z.string().min(1, "Required"),
  supplier_account_holder_name: z.string().min(1, "Required"),
  supplier_account_number: z.string().min(1, "Required"),
  supplier_ifsc_code: z.string().min(1, "Required"),
  supplier_preferred_mode_of_transportation: z.string().min(1, "Required"),
  supplier_preferred_delivery_time: z.string().min(1, "Required"),
  supplier_return_policy: z.string().min(1, "Required"),
  supplier_warranty_policy: z.string().min(1, "Required"),
  supplier_compliance_certifications: z.string().min(1, "Required"),
  supplier_insurance_details: z.string().min(1, "Required"),
  supplier_payment_terms: z.string().min(1, "Required"),
  supplier_contract_terms: z.string().min(1, "Required"),
});


export const defaultSupplierValues = {
    supplier_supplied_products: "",
    supplier_product_categories: [] as string[],  // ✅ empty array
    supplier_supplied_brands: "",
    supplier_employee_strength: "",
    supplier_gst_number: "",
    supplier_pan_number: "",
    supplier_email: "",
    supplier_phone_number: "",
    supplier_street_address: "",
    supplier_city: "",
    supplier_state: "",
    supplier_country: "",
    supplier_contact_person_name: "",
    supplier_contact_person_designation: "",
    supplier_contact_person_mobile_number: "",
    supplier_contact_person_email: "",
    supplier_preferred_contact_method: "",
    supplier_preferred_payment_method: "",
    supplier_bank_name: "",
    supplier_branch_name: "",
    supplier_account_holder_name: "",
    supplier_account_number: "",
    supplier_ifsc_code: "",
    supplier_preferred_mode_of_transportation: "",
    supplier_preferred_delivery_time: "",
    supplier_return_policy: "",
    supplier_warranty_policy: "",
    supplier_compliance_certifications: "",
    supplier_insurance_details: "",
    supplier_payment_terms: "",
    supplier_contract_terms: "",
  };
  
  export const initialStateForAddVendor = {
    // Supplier General Information
    supplier_name: '',
     // For dropdown, could be an id or name of the selected category
    supplier_contact_person: '',
    supplier_logo: '', // For file input, store file or null
    supplier_mobile_number: '',
    supplier_email_address: '',
    supplier_website_url: '',
    supplier_shop_street_area_locality: '',
    supplier_district: '',
    supplier_state: '',
   
    supplier_zip_postal_code: '',
   
    supplier_social_media_handles: '',
  
    // Supplier Identification Numbers
      // Supplier Banking Information
    supplier_gst_number: '',
    supplier_tin_number: '',
    
    supplier_credit_limit: '',
   
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    branch_name: '',
    iban: '',
    swift_code: '',
  
  
    // Supplier Products and Orders
    supplier_supplied_products: '',
    supplier_product_categories: '',
    supplier_product_specifications: '',
    supplier_unit_price: '',
    supplier_minimum_order_quantity: '',
    supplier_lead_time: '',
  
    supplier_delivery_locations: '',
  
    // Dynamic lists for supplied products and categories (can be updated later)
    availableSuppliedProducts: [],  // Dynamic list for supplied products
    availableProductCategories: [],
  
    // Supplier Performance Metrics
    supplier_on_time_delivery_rate: '',
    supplier_order_fulfillment_accuracy: '',
    supplier_return_rate: '',
    supplier_quality_rating: '',
    supplier_customer_support_rating: '',
  
    // Supplier Contract Details

  
    // Supplier Compliance
    supplier_compliance_certifications: '',
    supplier_environmental_standards: '',
    supplier_safety_certifications: '',
    supplier_licenses_and_permits: '',
    supplier_audit_history: '',
  
    // Supplier Agreement and Contract
    
    supplier_contract_start_date: '',
    supplier_contract_expiry_date: '',
    supplier_renewal_terms: '',
    supplier_penalties_clauses: '',
  
    // Supplier Relationship and History
    supplier_first_transaction_date: '',
    supplier_total_transaction_volume: '',
    supplier_communication_history: '',
    supplier_discounts_offers: '',
    supplier_notes: '',
  
    // Supplier Risk Management
   
    supplier_backup_supplier_availability: false,
    supplier_risk_mitigation_plan: '',
  
    // Supplier Feedback and Reviews
    supplier_internal_feedback: '',
    supplier_external_reviews: '',
    supplier_evaluation_date: '',
    supplier_evaluation_score: '',
  
    // Supplier Logistics Information
    supplier_warehouse_locations: '',
    supplier_delivery_time_zones: '',
    supplier_shipping_partner_information: '',
  
    // Helper Fields (e.g., for validation or future dynamic features)
    isLoading: false, // To track loading state, if fetching data
    error: null, // To store any error messages related to API calls
  };
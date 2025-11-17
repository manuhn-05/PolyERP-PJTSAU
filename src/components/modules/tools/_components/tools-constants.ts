export const TOOL_AVAILABILITY_STATUS = [
    { label: "Available", value: "available" },
    { label: "Unavailable", value: "unavailable" },
    { label: "In Use", value: "in_use" }, // tool is currently checked out/being used
    { label: "To Be Repaired", value: "to_be_repaired" }, // waiting for repair
    { label: "Under Repair", value: "under_repair" }, // actively being repaired
    { label: "Under Maintenance", value: "under_maintenance" }, // routine maintenance ongoing
    { label: "Out of Service", value: "out_of_service" }, // permanently or temporarily unavailable
    { label: "Retired / Decommissioned", value: "retired" }, // no longer in use
  ];
  
export const TOOL_MAINTENANCE_INTERVAL = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly (Every 2 Weeks)", value: "bi_weekly" }, // optional, some use it
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly (Every 3 Months)", value: "quarterly" },
    { label: "Semi-Annual (Every 6 Months)", value: "semi_annual" },
    { label: "Yearly", value: "yearly" },
    { label: "Biennial (Every 2 Years)", value: "biennial" }, // for long-life equipment
    { label: "Custom", value: "custom" },
  ];
  
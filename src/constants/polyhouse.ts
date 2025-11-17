import * as z from "zod";

export const REGISTER_NEW_POLYHOUSE_LIST = [
    {
        name : "polyhouse_name",
        label: "Polyhouse Name",
        type: "text",
        placeholder: "Enter your polyhouse name",
        required: true,
    },
    {
        name : "contact_person",
        label: "Contact Person",
        type: "text",
        placeholder: "Enter contact person name",
        required: true,
    },
    {
        name : "city",
        label: "City",
        type: "text",
        placeholder: "Enter city name",
        required: true,
    },
    {
        name : "district",
        label: "District",
        type: "text",
        placeholder: "Enter district name",
        required: true,
    },
    {
        name : "state",
        label: "State",
        type: "text",
        placeholder: "Enter state name",
        required: true,
    },
    {
        name : "country",
        label: "Country",
        type: "text",
        placeholder: "Enter country name",
        required: true,
    },
    {
        name : "pincode",
        label: "Pincode",
        type: "text",
        placeholder: "Enter pincode",
        required: true,
    },
    {
        name : "num_of_plots",
        label: "Number of plots",
        type: "text",
        placeholder: "Enter number of plots",
        required: true,
    },
    {
        name : "polyhouse_picture",
        label: "Polyhouse Picture",
        type: "file",
        placeholder: "Enter polyhouse picture",
        required: true,
    }
]

export const POLYHOUSE_SCHEMA = z.object({
    polyhouse_name: z.string().min(1, { message: "Polyhouse name is required" }) ,
      contact_person: z.string().min(5, { message: "Contact person is required" }),
      city: z.string().min(1, { message: "City is required" }),
      district: z.string().min(1, { message: "District is required" }),
      state: z.string().min(1, { message: "State is required" }),
      country: z.string().min(1, { message: "Country is required" }),
      pincode: z.string().min(1, { message: "Pincode is required" }),
      num_of_plots: z.string().min(1, { message: "Number of plots is required" }),
      polyhouse_picture: z
  .any()
  .refine(
    (files) => files instanceof FileList && files.length > 0,
    { message: "Polyhouse picture is required" }
  )
  .transform((files) => files instanceof FileList ? files[0] : null)
  .refine(
    (file) => !file || file.size <= 5 * 1024 * 1024,
    { message: "Image size must be less than 5MB" }
  )

  });

  export type POLYHOUSE_SCHEMA_FORM_TYPE = z.infer<typeof POLYHOUSE_SCHEMA>;

export const POLYHOUSE_INITIAL_VALUES : POLYHOUSE_SCHEMA_FORM_TYPE = {
    polyhouse_name: '',
    contact_person: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    num_of_plots: '',
    polyhouse_picture : null,
};


export const DELETE_ALERT_DESCRIPTION = `Are you sure you want to delete this polyhouse? This action cannot be undone.`;

export const FAQ_LIST_FOR_POLYHOUSE = [
    {
      q: "Is PolyERP suitable for small farms?",
      a: "Yes, PolyERP is built for all scales — from small farmers to large greenhouse operations.",
    },
    {
      q: "Do I need internet for real-time data?",
      a: "Yes, PolyERP requires an active internet connection to sync and monitor live sensor data.",
    },
    {
      q: "Can multiple users manage the same polyhouse?",
      a: "The owner can grant different access levels for managers, staff, or technicians.",
    },
    {
      q: "Can I integrate my existing sensors with PolyERP?",
      a: "Yes, PolyERP supports integration with most standard climate and soil sensors.",
    },
    {
      q: "Do you provide training or onboarding support?",
      a: "Yes, our team helps you set up your account, connect sensors, and train your staff.",
    },
    {
      q: "Is my farm data secure?",
      a: "Definitely. All your data is stored securely with encrypted connections and restricted access.",
    },
  ]

  type SoilRecord = {
    _id : string;
    device_id :number;
    ec : number;
    moisture: number;
    nitrogen : number;
    ph: number;
    phosphorous : number;
    potassium: number;
    salinity : number;
    temperature: number;
    timestamp: string;

  };
  
  export function getAveragesFromLatestReadings(data: SoilRecord[]) {
    if (!data || data.length === 0) return null;
  
    // ✅ Step 1: Sort by time (HH:MM:SS)
    const sorted = [...data].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
    });
  
    // ✅ Step 2: Extract the latest time in the dataset
    const latestTimestamp = sorted[sorted.length - 1].timestamp;
    const latestTimeOnly = new Date(latestTimestamp).toLocaleTimeString("en-US", { hour12: false });
  
    // ✅ Step 3: Filter all readings with that same time (same HH:MM:SS)
    const latestRecords = sorted.filter((item) => {
      const itemTime = new Date(item.timestamp).toLocaleTimeString("en-US", { hour12: false });
      return itemTime === latestTimeOnly;
    });
  
    // ✅ Step 4: Calculate averages
    const avg = {
      moisture:
        latestRecords.reduce((acc, item) => acc + item.moisture, 0) /
        latestRecords.length,
      temperature:
        latestRecords.reduce((acc, item) => acc + item.temperature, 0) /
        latestRecords.length,
      ph:
        latestRecords.reduce((acc, item) => acc + item.ph, 0) /
        latestRecords.length,
    };
  
    // ✅ Step 5: Return clean result
    return {
      timestamp: latestTimeOnly,
      count: latestRecords.length,
      averages: {
        moisture: Number(avg.moisture.toFixed(2)),
        temperature: Number(avg.temperature.toFixed(2)),
        ph: Number(avg.ph.toFixed(2)),
      },
    };
  }
  
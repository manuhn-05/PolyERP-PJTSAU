import * as z from "zod";


export const ADD_USER_FORM_INITIAL_VALUES = {
    name: '',
    email: '',
    phone: '',
    district: '',
    state: '',
    city: '',
    pincode: '',
    country: '',

    //   password: "",
    user_type: '',
    polyhouse_id : '',

};

export const ASSIGN_USER_SCHEMA = z.object({
    name : z.string().min(5, { message: "Name is required" }),
    email : z.email({ message: "Invalid email address" }).min(10, { message: "Email is required" }),
    phone : z.string({ message: "Phone number is required" }).min(10, { message: "Phone number must contain 10 digits" }).max(10, { message: "Phone number must contain 10 digits" }),
    district : z.string().min(5, { message: "District is required" }),
    state : z.string().min(5, { message: "State is required" }),
    city : z.string().min(5, { message: "City is required" }),
    pincode : z.string().min(6, { message: "Pincode is required" }),
    country : z.string().min(5, { message: "Country is required" }),
    user_type : z.string().min(1, { message: "User type is required" }),
    polyhouse_id : z.string().min(1, { message: "Polyhouse is required" }).optional(),
});

export type ASSIGN_USER_FORM_TYPE = z.infer<typeof ASSIGN_USER_SCHEMA>;

export const ASSIGN_USER_TO_POLYHOUSE   = [
    {
        name : "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your name",
        required: true,
    },
    {
        name : "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        name : "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter your phone",
        required: true,
    },
    {
        name : "district",
        label: "District",
        type: "text",
        placeholder: "Enter your district",
        required: true,
    },
    {
        name : "state",
        label: "State",
        type: "text",
        placeholder: "Enter your state",
        required: true,
    },
    {
        name : "city",
        label: "City",
        type: "text",
        placeholder: "Enter your city",
        required: true,
    },
    {
        name : "pincode",
        label: "Pincode",
        type: "text",
        placeholder: "Enter your pincode",
        required: true,
    },
    {
        name : "country",
        label: "Country",
        type: "text",
        placeholder: "Enter your country",
        required: true,
    },
]

export const POLYHOUSE_USER_TYPES = [
    {
        label : "Branch Admin",
        value : "branch_admin",
    },
    {
        label : "Branch Manager",
        value : "branch_manager",
    },

]
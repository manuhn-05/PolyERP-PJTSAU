import * as z from "zod";

export const USER_LOGIN_SCHEMA = z.object({
    email: z.string()
      .min(1, { message: "Email is required" }) // replaces .nonempty()
      .email({ message: "Invalid email address" }),
      
    password: z.string()
    .min(4, "Password must be at least 8 characters long.")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    // .regex(/\d/, "Password must contain at least one digit.")
    // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
  });

  export type USER_SIGNIN_FORM_TYPE = z.infer<typeof USER_LOGIN_SCHEMA>;

export const SIGN_IN_INITIAL_VALUES : {email : string, password : string} = {
    email: '',
    password: '',
};


export const USER_LOGIN_CONSTS_ARRAY=[
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@gmail.com",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

//   export const USER_REGISTER_CONSTS_ARRAY=[
  
//     {
//       name: "name",
//       label: "Full Name",
//       type: "text",
//       placeholder: "Enter your name",
//       required: true,
//     },
//     {
//       name: "phone",
//       label: "Phone Number",
//       type: "text",
//       placeholder: "Enter your phone number",
//       required: true,
//     },
//     {
//       name: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "example@gmail.com",
//       required: true,
//     },
//     {
//       name : "country",
//       label: "Country",
//       type: "select",
//       placeholder: "Select your country",
//       required: true,
//     },
//     {
//       name : "state",
//       label: "State",
//       type: "select",
//       placeholder: "Select your state",
//       required: true,
//     },
//     {
//       name : "district",
//       label: "District",
//       type: "select",
//       placeholder: "Select your district",
//       required: true,
//     },
//     {
//       name : "pincode",
//       label: "Pincode",
//       type: "text",
//       placeholder: "Enter your pincode",
//       required: true,
//     },
//   ]
// export const SIGNUP_FORM_INITIAL_VALUES= {
//   name : "",
//   phone : "",
//   email : "",
//   country : {},
//   state : {},
//   district : {},
//   pincode : "",
// }
//   export const USER_SIGNUP_SCHEMA = z.object({
//     name: z.string().min(4, { message: "Name is required" }),
//     phone: z.string().min(10, { message: "Phone is required" }).max(10, { message: "Phone number must be 10 digits" }),
//     email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
//     country : z.object({label : z.string, value : z.string},{message : "Country is required"}),
//     state : z.object({label : z.string, value : z.string}, {message : "State is required"}),
//     district : z.object({label : z.string, value : z.string}, {message : "District is required"}),
//     pincode : z.string().min(6, { message: "Pincode is required" }),
   
//   });


export const USER_REGISTER_CONSTS_ARRAY=[
  
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@gmail.com",
    required: true,
  },
  {
    name : "country",
    label: "Country",
    type: "text",
    placeholder: "Select your country",
    required: true,
  },
  {
    name : "state",
    label: "State",
    type: "text",
    placeholder: "Select your state",
    required: true,
  },
  {
    name : "district",
    label: "District",
    type: "text",
    placeholder: "Select your district",
    required: true,
  },
  {
    name : "pincode",
    label: "Pincode",
    type: "text",
    placeholder: "Enter your pincode",
    required: true,
  },
]
export const SIGNUP_FORM_INITIAL_VALUES= {
name : "",
phone : "",
email : "",
country : "",
state : "",
district : "",
pincode : "",
}
export const USER_SIGNUP_SCHEMA = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Phone is required" }).max(10, { message: "Phone number must be 10 digits" }),
  email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  country : z.string().min(1, { message: "Country is required"}),
  state : z.string().min(1, { message: "State is required"}),
  district : z.string().min(1, { message: "District is required"}),
  pincode : z.string().min(6, { message: "Pincode is required" }),
 
});
  export type USER_SIGNUP_FORM_TYPE = z.infer<typeof USER_SIGNUP_SCHEMA>;


  export const USER_TYPE_TEXTS = {
    OWNER : "owner",
    ADMIN : "admin",
    MANAGER : "branch_manager",
    BRANCH_ADMIN : "branch_admin",
  }
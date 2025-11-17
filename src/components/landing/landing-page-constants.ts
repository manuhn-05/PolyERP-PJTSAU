import { FiHome } from "react-icons/fi";
import { AiOutlineLineChart } from "react-icons/ai";
import {  LuThermometerSun, LuBoxes, LuUsers,  LuBell ,LuSprout, LuActivity, LuDroplets,  LuWind, LuCog ,LuBot, LuGauge, LuSparkles, LuLeaf } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";



export type Step = {
    title: string
    description: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    test_id: string;
  }
  
  export const steps: Step[] = [
    {
      title: "Register Your Polyhouse",
      description: "Create your account and add your polyhouse details.",
      Icon: FiHome,
      test_id: "register-polyhouse",
    },
    {
      title: "Add Crops & Sensors",
      description: "Configure your crops and link climate sensors.",
      Icon: LuSprout,
      test_id: "add-crops",
    },
    {
      title: "Monitor & Automate",
      description: "Track environment data and automate routine tasks.",
      Icon: LuActivity,
      test_id: "monitor-automate",
    },
    {
      title: "Track Growth & Profit",
      description: "Analyze yield and performance over time.",
      Icon: AiOutlineLineChart,
      test_id: "track-growth",
    },
  ];

  export type Feature = {
    title: string
    description: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    test_id: string;
  }
  
  export const features: Feature[] = [
    {
      title: "Crop Management",
      description: "Plan, track, and monitor your crop cycles with precision.",
      Icon: LuSprout,
      test_id : "crop-management",
    },
    {
      title: "Sensor & Climate Monitoring",
      description: "Monitor temperature, humidity, and CO₂ in real time.",
      Icon: LuThermometerSun,
      test_id : "sensor-monitoring",
    },
    {
      title: "Inventory & Purchase Tracking",
      description: "Control fertilizers, seeds, and equipment with smart stock alerts.",
      Icon: LuBoxes,
      test_id : "inventory-management",
    },
    {
      title: "Staff & Task Management",
      description: "Assign and track staff activities for smoother operations.",
      Icon: LuUsers,
      test_id : "staff-management",
    },
    {
      title: "Data Analytics & Reports",
      description: "Visualize performance with detailed graphs and insights.",
      Icon: IoBarChartOutline,
      test_id : "data-analytics",
    },
    {
      title: "Real-Time Alerts",
      description: "Get instant notifications on threshold breaches and updates.",
      Icon: LuBell,
      test_id : "real-time-alerts",
    },
  ]

export const HOW_IT_WORKS =`How it works`;
export const HOW_IT_WORKS_DESC =`Get started with PolyERP in just a few simple steps`;

export const POLYERP = `PolyERP`;
export const A_SMART_ERP_SOLUTION =`A smart ERP solution for managing polyhouses and greenhouse farms.`;

export const KEY_FEATURES = `Key Features`;
export const KEY_FEATURES_DESC=`Everything you need to manage your polyhouse efficiently`;



export const ABOUT_US_HERO_IMAGE_TEXT =`Smart greenhouse with sensors and irrigation systems`;
export const SUSTAINABLE_DATA_DRIVEN_AUTOMATED = `Sustainable • Data-Driven • Automated`;

export const REVOLUTIONIZING_SMART_FARMING =`Revolutionizing Smart Farming`;
export const REVOLUTIONIZING_SMAR_FARM_DESC=`Polyhouse automation that blends nature and technology. Monitor, optimize, and automate your climate, irrigation, and CO₂—empowering growers with precision and sustainability.`

export const WHAT_WE_DO =`What We Do`;
export const OUR_TEAM=`Our Team`;


export const OUR_MISSION_VISION_STORY = [
    {
        test_id : "our-mission",
        title : `Our Mission`,
        description : `Empower growers with intelligent, automated environments that increase yield, reduce resource waste, and promote resilient agriculture for a changing climate.`
    },
    {
        test_id : `our-vision`,
        title : `Our Vision`,
        description : `A future where every polyhouse adapts in real time—optimizing temperature, humidity, irrigation, and carbon balance—so food systems are smarter and more sustainable.`
    },
    {
        test_id : `our-story`,
        title : `Our Story`,
        description : `Founded by engineers and agronomists, we bridge field expertise with cutting-edge IoT and AI. What started as a simple sensor kit now powers fully automated greenhouse operations.`
    }
];


export const ABOUT_FEATURES= [
    {
      title: "Temperature Monitoring",
      description: "Real-time climate sensing with alerts and historical insights.",
      Icon: LuThermometerSun,
      test_id : "temperature-monitoring",
    },
    {
      title: "Irrigation Control",
      description: "Automated schedules and soil-moisture based precision watering.",
      Icon: LuDroplets,
      test_id : "irrigation-control",
    },
    {
      title: "CO₂ Sensors",
      description: "Track CO₂ for optimal plant health and growth efficiency.",
      Icon: LuWind,
      test_id : "co2-sensors",
    },
    {
      title: "Full Automation",
      description: "Rules and AI-assisted workflows for lights, vents, fans, and pumps.",
      Icon: LuCog,
      test_id : "full-automation",
    },
  ]
  

  export const OUR_TEAM_LIST = [
    { name: "Member A", role: "Co-Founder & CEO" },
    { name: "Member B", role: "Co-Founder & CTO" },
    { name: "Member C", role: "Head of Agronomy" },
    { name: "Member D", role: "IoT Systems Lead" },
  ]

  export const JOIN_US_HEADER_TEXT =`Join us in building a smarter farming future.`;
  export const GET_IN_TOUCH_BTN_TEXT =`Get In Touch`;

  export const WE_LOVE_TO_HEAR_FROM_YOU=`We'd love to hear from you — let's grow smarter together.`
  export const CONTACT_FORM_TITLE_TEXT=`Contact form and details`;
  export const LOCTION_PREVIEW_TITLE=`Location preview`;

  export const SEND_US_MESSAGE =`Send us a message`;

  export const CONACT_US_FORM_ELEMENTS_LIST =[
    {
        test_id : "name",
        label : "Name",
        placeholder : "Enter your name",
        type : "text"
    },
    {
        test_id : "email",
        label : "Email",
        placeholder : "Enter your email",
        type : "email"
    },
    {
        test_id : "subject",
        label : "Subject",
        placeholder : "Enter your subject",
        type : "text"
    },
    {
        test_id : "message",
        label : "Message",
        placeholder : "Enter your message",
        type : "textarea"
  
    }
  ];

  export const CONTACT_DETAILS_TITLE=`Contact details`;
  export const CONTACT_US_ADDRESS = `Smart Polyhouse HQ, 123 Greenhouse Lane, Sector 21, AgriTech Park`;
  export const CONTACT_US_OFFICE=`Office`
  export const CONTACT_US_EMAIL = `hello@smartpolyhouse.com`;
  export const CONTACT_US_EMAIL_TITLE=`Email`;
  export const CONTACT_US_PHONE = `+91 9876543210`;
  export const CONTACT_US_PHONE_TITLE=`Phone`;
export const CONTACT_US_WORKING_HOURS_TITLE = `Working hours`;
export const CONTACT_US_WORKING_HOURS = `Mon - Fri: 10:00 AM - 07:00 PM`;


export const SMART_POLYHOUSE_PLATFORM =`Smart Polyhouse Platform`;
export const CHOOSE_RIGHT_PLAN =`Choose the right plan to grow smarter`;
export const CHOOSE_RIGHT_PLAN_DESC =`From small farms to large agri-enterprises, we've got you covered. Monitor climate, automate irrigation, and harness AI-driven insights for healthier yields.`;

export const WHY_CHOOSE_US =`Why Choose Us?`, WHY_CHOOSE_US_DESC =`A nature-tech platform focused on yield, efficiency, and sustainability.`;

export const PRICING_PAGE_ITEMS_LIST = [
  {
    title: "Real-time Data",
    description: "Live climate, soil moisture, and irrigation metrics at a glance.",
    Icon: LuGauge,
    test_id : "real-time-data",
  },
  {
    title: "Automation",
    description: "Rules-based control for irrigation and climate to save resources.",
    Icon: LuBot,
    test_id : "automation",
  },
  {
    title: "Affordable",
    description: "Flexible plans that grow with your operation, no hidden fees.",
    Icon: LuSparkles,
    test_id : "affordable",
  },
  {
    title: "Sustainable",
    description: "Reduce water and energy usage with data-driven decisions.",
    Icon: LuLeaf,
    test_id : "sustainable",
  },
]

export const SAVE_MONEY_UP_TO =`Save up to 20% annually`;

export const READY_TO_MODERNIZE = `Ready to modernize your farm?`,START_FREE_TRIAL=`Start your free plan today.`, GET_STARTED_FREE=`Get Started Free`;


export const FOOTER_SMART_ERP =`Smart ERP for modern polyhouse management.`;
export const COPY_RIGHT =`© 2025 PolyERP. All rights reserved.`;
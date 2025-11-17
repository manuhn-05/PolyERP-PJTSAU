import { USER_LANGUAGE } from "@/types/redux-types";

export const LANGUAGE_SELECTOR:  Array<USER_LANGUAGE>= [
    {
        id : "en",
        label:"English",
        value:"en"
    },
    {
        id : "hi",
        label:"Hindi",
        value:"hi"
    },
    {
        id : "ka",
        label:"Kannada",
        value:"ka"
    },
    {
        id  : "es",
        label:"Spanish",
        value:"es"
    }
]

export const LANGUAGE_JSON_KEYS  = {
    HOME: "home",
    USERS : "users",
    MARKET_PLACE :"market_place",
    MY_POLYHOUSES : "my_polyhouses",
    LINK_POLYHOUSE : "link_polyhouse",
    ADD_MEMBER : "add_member",
    TEAM_AND_ROLES : "team_and_roles"
}
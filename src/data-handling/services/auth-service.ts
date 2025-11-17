import { PolyErpClient } from "@/data-handling/instance/axios-instance";
import { AUTH_ENDPOINTS } from "@/data-handling/endpoints/server-endpoints";

export async function userSigninWithEmail(data: any): Promise<any> {
    try {
        const response = await PolyErpClient.post(AUTH_ENDPOINTS.USER_LOGIN, { ...data })
        return response?.data;
    } catch (error) {

        throw error;
    }
}
export async function userSignUpWithDetails(data: any): Promise<any> {
    try {
        const response = await PolyErpClient.post(AUTH_ENDPOINTS.USER_REGISTER, { ...data })
        return response?.data;
    } catch (error) {

        throw error;
    }
}


export async function fetchCountriesList(): Promise<any> {
    try {
        const response = await PolyErpClient.get(AUTH_ENDPOINTS.COUNTRIES_LIST);
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchStatesList(country : string): Promise<any> {
    try {
        const response = await PolyErpClient.get(AUTH_ENDPOINTS.STATES_LIST, {params : {country}});
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchDistrictsList(state : string): Promise<any> {
    try {
        const response = await PolyErpClient.get(AUTH_ENDPOINTS.DISTRICTS_LIST, {params : {state}});
        return response?.data;
    } catch (error) {
        throw error;
    }
}
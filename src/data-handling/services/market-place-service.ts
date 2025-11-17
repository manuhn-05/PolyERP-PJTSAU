import { PolyErpClient } from "@/data-handling/instance/axios-instance";
import { MODULES_ENDPOINTS, POLYHOUSE_ENDPOINTS, USER_ENDPOINTS } from "@/data-handling/endpoints/server-endpoints";


// POLYHOUSE SERVICES
export async function registerNewPolyhouse(data: any): Promise<any> {
    try {
        const response = await PolyErpClient.post(POLYHOUSE_ENDPOINTS.REGISTER_POLYHOUSE, { ...data })
        return response?.data;
    } catch (error) {

        throw error;
    }
}

export async function updatePolyhouse(data: any): Promise<any> {
    const {polyhouse_id, ...rest} = data;
    try {
        const response = await PolyErpClient.put(`${POLYHOUSE_ENDPOINTS.UPDATE_POLYHOUSE}${polyhouse_id}`, { ...rest })
        return response?.data;
    } catch (error) {

        throw error;
    }
}

export async function fetchPolyhousesList(user_id : string): Promise<any> {
    try {
        const response = await PolyErpClient.get(POLYHOUSE_ENDPOINTS.GET_POLYHOUSES, {params : {user_id}});
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchPolyhouseById(polyhouse_id: string): Promise<any> {
    try {
        const response = await PolyErpClient.get(POLYHOUSE_ENDPOINTS.GET_POLYHOUSE_BY_ID, {params : {polyhouse_id : polyhouse_id}});
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function deletePolyhouse(polyhouse_id: string): Promise<any> {
    try {
        const response = await PolyErpClient.delete(`${POLYHOUSE_ENDPOINTS.DELETE_POLYHOUSE}${polyhouse_id}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
}

// POLYHOUSE SERVICES


// MODULE SERVICES
export async function fetchAvailableModules(): Promise<any> {
    try {
        const response = await PolyErpClient.get(MODULES_ENDPOINTS.GET_AVAILABLE_MODULES);
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function addToSelectedModuleFromAvailableModules(data: any): Promise<any> {
    
    try {
        const response = await PolyErpClient.post(`${MODULES_ENDPOINTS.ADD_SELECTED_MODULES}`, { ...data });
        return response?.data;
    } catch (error) {
        throw error;
    }
}
export async function fetchSelectedModules(polyhouse_id : string): Promise<any> {
    try {
        const response = await PolyErpClient.get(MODULES_ENDPOINTS.GET_SELECTED_MODULES, {params : {polyhouse_id}});

        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function updateSelectedModules(data: any): Promise<any> {
    const {_id, ...rest} = data;
    try {
        const response = await PolyErpClient.put(`${MODULES_ENDPOINTS.EDIT_SELECTED_MODULES}${_id}`, { ...rest })
        return response?.data;
    } catch (error) {
        throw error;
    }
}


export async function deleteSelectedModule(module_id: string): Promise<any> {
    try {
        const response = await PolyErpClient.delete(`${MODULES_ENDPOINTS.DELETE_SELECTED_MODULES}${module_id}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
}

// MODULE SERVICES


// USER SERVICES
export async function fetchOnboardedUsersList(user_id : string): Promise<any> {
    try {
        const response = await PolyErpClient.get(USER_ENDPOINTS.GET_REGISTERED_USERS, {params : {user_id}});
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function onboardNewUserToPolyhouse(data: any): Promise<any> {
    try {
        const response = await PolyErpClient.post(`${USER_ENDPOINTS.ONBOARD_USER}`, { ...data });
        return response?.data;
    } catch (error) {
        throw error;
    }
}


export async function updateUserDetails(data: any): Promise<any> {
// TODO - Update User Details Endpoint when actual API is Done
    try {
        const response = await PolyErpClient.put(`${USER_ENDPOINTS.UPDATE_USER_DETAILS}${data?.user_id}`, { user_id : data?.user_id,  })
        return response?.data;
    } catch (error) {
        throw error;
    }
}


export async function deleteUserDetails(user_id: string): Promise<any> {
    try {
        const response = await PolyErpClient.delete(`${USER_ENDPOINTS.DELETE_USER}${user_id}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
}


// USER SERVICES


// MISCELLANEOUS SERVICES

export async function fetchInventoryStocksListForSupplierRegistration(): Promise<any> {
    try {
        const response = await PolyErpClient.get(`inventory`);
        return response?.data;
    } catch (error) {
        throw error;
    }
}
export async function fetchInventoryStocksItems(inventory_id: string): Promise<any> {
    try {
        const response = await PolyErpClient.get(`${inventory_id}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
}


// MISCELLANEOUS SERVICES

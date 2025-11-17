import {useMutation, useQuery} from "@tanstack/react-query";
import { registerNewPolyhouse, fetchPolyhousesList, updatePolyhouse, deletePolyhouse,
     fetchPolyhouseById, fetchAvailableModules,
     fetchSelectedModules,
     addToSelectedModuleFromAvailableModules,
     fetchOnboardedUsersList,
     deleteUserDetails,
     deleteSelectedModule,
     onboardNewUserToPolyhouse,
     updateUserDetails,
     updateSelectedModules,
     fetchInventoryStocksListForSupplierRegistration,
     fetchInventoryStocksItems} from "@/data-handling/services/market-place-service";
import { invokeErrorToast, invokeSuccessToast } from "@/data-handling/instance/toast-instance";
// Polyhouse Queries
export function useRegisterNewPolyhouse() {
    return useMutation({
        mutationFn: (data:any)=>registerNewPolyhouse(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

export function useFetchPolyhousesList(user_id : string,isLoggedIn? : boolean, ) {
    return useQuery({
        queryKey : ["polyhouses_list"],
        queryFn : () => fetchPolyhousesList(user_id),
        enabled : isLoggedIn, // Disabled by default, can be enabled manually via refetch
    })
}
export function useFetchPolyhouseById(polyhouse_id: string){
    return useQuery({
        queryKey : ["polyhouses", polyhouse_id],
        queryFn : () => fetchPolyhouseById(polyhouse_id),
    })
}


export function useUpdatePolyhouse() {
    return useMutation({
        mutationFn: (data:any)=>updatePolyhouse(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

export function useDeletePolyhouse() {
    return useMutation({
        mutationFn: (data:any)=>deletePolyhouse(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

// Polyhouse Queries

// Modules Queries
export function useFetchAvailableModules(){
    return useQuery({
        queryKey : ["available_modules_list"],
        queryFn : () => fetchAvailableModules(),
    })

};

export function useFetchSelectedModules(polyhouse_id : string){
    return useQuery({
        queryKey : ["selected_modules_list"],
        // TODO : Fetch Selected Modules Based on User_ID / Polyouse ID
        queryFn : () => fetchSelectedModules(polyhouse_id),
    })
}

export function useAddToSelectedModulesFromAvailableList(){
    return useMutation({
        mutationFn : (data : any) => addToSelectedModuleFromAvailableModules(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}
export function useConfigureSelectedModules(){
    return useMutation({
        mutationFn: (data:any)=>updateSelectedModules(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}
export function useDeleteSelectedModule () {
    
    return useMutation({
        mutationFn: (polyhouse_id:string)=>deleteSelectedModule(polyhouse_id),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeErrorToast(data?.message);
        }
    })
}
// Modules Queries


// Users Queries
export function useFetchAllOnboardedUsers(user_id : string){
    return useQuery({
        queryKey : ["onboarded_users_list"],
        queryFn : () => fetchOnboardedUsersList(user_id),
    })

};

export function useOnboardUserToPolyhouse(){
    return useMutation({
        mutationFn: (data:any)=>onboardNewUserToPolyhouse(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}
export function useDeleteUser() {
    return useMutation({
        mutationFn: (user_id:string)=>deleteUserDetails(user_id),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

export function useUpdateUserDetails() {
    return useMutation({
        mutationFn: (data:any)=>updateUserDetails(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}
// Users Queries


// MISCELLANEOUS SERVICES

export function useFetchInventoryList() {
    return useQuery({
        queryKey : ["inventory_list"],
        queryFn : () => fetchInventoryStocksListForSupplierRegistration(),
        enabled : true,
    })
}

export function useFetchInventoryStocksListBasedOnInventoryId(inventory_id : string, enabled : boolean) {
    return useQuery({
        queryKey : ["inventory_stocks_list"],
        queryFn : () => fetchInventoryStocksItems(`${inventory_id}`),
        enabled : Boolean(inventory_id) && enabled,
    })
}
// MISCELLANEOUS SERVICES

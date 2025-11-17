import {useMutation, useQuery} from "@tanstack/react-query";
import { fetchCountriesList, fetchDistrictsList, fetchStatesList, userSigninWithEmail, userSignUpWithDetails } from "@/data-handling/services/auth-service";
import { invokeErrorToast, invokeSuccessToast } from "@/data-handling/instance/toast-instance";


export function useSignInUser() {
    return useMutation({
        mutationFn: (data:any)=>userSigninWithEmail(data),
        onError: (error : any) => {

            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {

            invokeSuccessToast(data?.message);
            
        }
    })
}

export function useUserSignUpWithDetails(){
    return useMutation({
        mutationFn: (data:any)=>userSignUpWithDetails(data),
        onError: (error : any) => {

            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {

            invokeSuccessToast(data?.message);
            
        }
    })
}

export function useFetchCountriesList(){
    return useQuery({
        queryKey : ["countries"],
        queryFn : () => fetchCountriesList(),
    })
}

export function useFetchStatesList(country : string){
    return useQuery({
        queryKey : ["states"],
        queryFn : () => fetchStatesList(country),
    })
}

export function useFetchDistrictsList(state : string){
    return useQuery({
        queryKey : ["districts"],
        queryFn : () => fetchDistrictsList(state),
    })
}
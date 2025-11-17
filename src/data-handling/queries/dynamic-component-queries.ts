import { invokeErrorToast, invokeSuccessToast } from "@/data-handling/instance/toast-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDataAsPerEndpoint, deleteDataAsPerEndpoint, downloadSensorReadingsDataOnDateRange, fetchAllDataListBasedOnEndpoint, fetchAllDevicesbasedOnPolyhouseId, fetchSensnorDataBasedOnDevicesList, registerANewSensorDevice, updateDataAsPerEndpoint } from "@/data-handling/services/dynamic-component-services";
import { DEVICE_DATA_PROPS_TYPE } from "@/hooks/sub/use-fetch-sensor-data";

// Dynamic Data Queries
export function useFetchDataAsPerEndpoint(
    polyhouse_id: string,
    path: string,
    isStrictCheckNeeded: boolean = false
  ) {
    return useQuery({
      queryKey: [path, polyhouse_id],
      queryFn: () =>
        fetchAllDataListBasedOnEndpoint({ path, polyhouse_id }),
      enabled: !isStrictCheckNeeded || Boolean(polyhouse_id),
      throwOnError: true
    });
  }
  


export function useDeleteDataAsPerEndpoint(path : string, ){
    return useMutation({
        mutationFn: (item_id:string)=>deleteDataAsPerEndpoint(path, item_id),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

export function useCreateDataAsPerEndpoint(path : string){
    return useMutation({
        mutationFn: (data : any)=>createDataAsPerEndpoint(path, data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}

export function useUpdateDataAsPerEndpoint(path : string){
    return useMutation({
        mutationFn: (data : any)=>updateDataAsPerEndpoint(path, data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data) => {
            invokeSuccessToast(data?.message);
        }
    })
}
// Dynamic Data Queries


// Download Soil Readings

export function useExportSoilReadingsDataOnDateRange(){
    return useMutation({
        mutationFn: (params : any)=>downloadSensorReadingsDataOnDateRange(params),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data : any) => {
            invokeSuccessToast(data?.message);
        }
    })
}
// Download Soil Readings


// Register New Sensor Device

export function useRegisterNewSensorDevice(){
    return useMutation({
        mutationFn: (data : any)=>registerANewSensorDevice(data),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data : any) => {
            invokeSuccessToast(data?.message);
        }
    })
}

// Register New Sensor Device

// Fetch based on Devices List and DevicesList
export function useFetchDevicesListBasedOnPolyhouse(path : string, polyhouse_ids: Array<string>, isStrictCheckNeeded: boolean = false){

    return useQuery({
        queryKey: [path, ],
        queryFn: () =>
            fetchAllDevicesbasedOnPolyhouseId({ path, polyhouse_ids }),
        enabled: !isStrictCheckNeeded ,
        throwOnError: true
      });

};

export function useFetchSensnorDataBasedOnDevicesList(){
  
  
    return useMutation({
        mutationFn: (params : DEVICE_DATA_PROPS_TYPE)=>fetchSensnorDataBasedOnDevicesList(params),
        onError: (error : any) => {
            invokeErrorToast(error?.response?.data?.errors);
        },
        onSuccess: (data : any) => {
            invokeSuccessToast(data?.message);
        }
    })
   
};

// Fetch basedon Devices List

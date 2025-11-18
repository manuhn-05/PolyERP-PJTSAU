

import { PolyErpClient } from "@/data-handling/instance/axios-instance";
import { USER_ENDPOINTS } from "../endpoints/server-endpoints";
import { DEVICE_DATA_PROPS_TYPE } from "@/hooks/sub/use-fetch-sensor-data";


export async function fetchAllDataListBasedOnEndpoint(params : {path : string, polyhouse_id : string}): Promise<any> {

    try {
        // TODO : commented the filter logic, Uncomment when it works exactly as expected
        const response = await PolyErpClient.get(params.path, {params : {polyhouse_id : params.polyhouse_id}});
        // const response = await PolyErpClient.get(params.path, );

        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteDataAsPerEndpoint(path : string, item_id : string){

    try {
        const response = await PolyErpClient.delete(`delete/${path}/${item_id}`);
        return response?.data;

    } catch (error) {
        throw error;
    }
}


export async function createDataAsPerEndpoint(path : string, data : any){

    try {
        const response = await PolyErpClient.post(`add/${path}`, data);
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function updateDataAsPerEndpoint(path : string, data : any){
const {_id, ...rest} = data;

    try {
        const response = await PolyErpClient.put(`edit/${path}/${_id}`, rest);
        return response?.data;
    } catch (error) {
        throw error;
    }
}




export async function downloadSensorReadingsDataOnDateRange(params: { start_date: string; end_date: string }) {
    const createParams = new URLSearchParams(params);
  
    try {
      const response = await PolyErpClient.get(
        `${USER_ENDPOINTS?.SOIL_DATA_DOWNLOAD}?${createParams.toString()}`,
        {
          responseType: "blob", // 👈 Important: tells Axios to treat the response as binary data
        }
      );
  
      // Create a blob from the Excel file data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary <a> element for triggering download
      const link = document.createElement("a");
      link.href = url;
      link.download = `sensor_readings_${params.start_date}_to_${params.end_date}.xlsx`;
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading sensor readings data:", error);
      throw error;
    }
  }
  

//   Onboard Sensor Device

export async function registerANewSensorDevice( data : any){
    
        try {
            const response = await PolyErpClient.post(`${USER_ENDPOINTS?.REGISTER_NEW_DEVICE}`, data);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }

    export async function fetchSensnorDataBasedOnDevicesList(params: DEVICE_DATA_PROPS_TYPE): Promise<any> {
        const { start_date, end_date, device_id, endpoint } = params;


            // device_id is assumed to be an array like [1,2,3]
        const url = `${endpoint}?start_date=${start_date}&end_date=${end_date}&device_id=[${device_id.join(",")}]`;
      
        try {
          const response = await PolyErpClient.get(url);
          return response?.data;
        } catch (error) {
          throw error;
        }
      }
      
      export async function fetchAllDevicesbasedOnPolyhouseId(params : {path : string, polyhouse_ids : Array<any> }): Promise<any> {
const polyhouses = params?.polyhouse_ids?.length > 0 ? `[${params.polyhouse_ids.join(",")}]` : "[]";
        const url = `${params.path}?polyhouse_id=${polyhouses}`;
        try {

            // TODO : commented the filter logic, Uncomment when it works exactly as expected
            const response = await PolyErpClient.get(url);
            // const response = await PolyErpClient.get(params.path, );
    
            return response?.data;
        } catch (error) {
            throw error;
        }
    }
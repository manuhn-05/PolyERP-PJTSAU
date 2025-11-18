export const AUTH_ENDPOINTS = {
    USER_LOGIN : `user_login`,
    USER_REGISTER : `register_users`,
    COUNTRIES_LIST : ``,
    STATES_LIST : ``,
    DISTRICTS_LIST : ``,
}
export const HTTP_RESPONSE_CODES = {
    // ✅ 1xx — Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
  
    // ✅ 2xx — Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  
    // ✅ 3xx — Redirection
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
  
    // ✅ 4xx — Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
  
    // ✅ 5xx — Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
  };
  
  export const POLYHOUSE_ENDPOINTS = {
    GET_POLYHOUSES :`polyhouses`,
    REGISTER_POLYHOUSE : `add/polyhouses`,
    UPDATE_POLYHOUSE :`edit/polyhouses/`, // polyhouse id is required
    DELETE_POLYHOUSE : `delete/polyhouses/`, // polyhouse id is required
    GET_POLYHOUSE_BY_ID : `single_polyhouse`, // polyhouse id is required
  }

  export const MODULES_ENDPOINTS ={
    GET_AVAILABLE_MODULES : `available_modules`,
    ADD_NEW_AVAILABLE_MODULE : `add/available_modules`,
    DELETE_AVAILABLE_MODULE : `delete/available_modules/`, // module id is required
    EDIT_AVAILABLE_MODULE : `edit/available_modules/`, // module id is required

    GET_SELECTED_MODULES : `selected_modules`, // polyhouse_id as params required
    ADD_SELECTED_MODULES : `add/selected_modules`, // polyhouse_id as params required
    EDIT_SELECTED_MODULES : `edit/selected_modules/`, // module id is required
    DELETE_SELECTED_MODULES : `delete/selected_modules/`, // module id is required
  }

  export const USER_ENDPOINTS = {
    ONBOARD_USER : `register_users`,
    GET_REGISTERED_USERS : `get_users`, // user id is required
    DELETE_USER : `delete/users/`, // user id is required
    UPDATE_USER_DETAILS: `update/users/`,
    ADD_SUPPLIER_INVENTORY: `inventory`,
    SOIL_DATA_DOWNLOAD: `soil_data-download`,
    REGISTER_NEW_DEVICE: `add/device`,
    SOIL_PROBE_SENSOR_DATA: `soil_data`,

    JOBS_ALLOTMENT: `jobs_allotment`,

    ADD_STOCKS_TO_PURCHASE_REGISTRY: `add/stocks`,
    ATMOSPHERE_SENSOR_DATA: `atm_data`,

  }
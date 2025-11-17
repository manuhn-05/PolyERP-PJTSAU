
export interface USER_STATE  {
    name : string,
    email : string,
    phone : string,
    access : Array<any>,
    city : string,
    district : string,
    state : string,
    country : string,
    pincode : string,
    user_type : string,
    polyhouse_id : string,
    _id : string,
}

export interface USER_LANGUAGE  {
    label : string,
    value : string,
    id : string,
}
export interface USER_INITIAL_STATE  {
    currentUser : USER_STATE | null,
    isAuthenticated : boolean,
    isLoading : boolean,
    error : string | null,
    language : USER_LANGUAGE,
}
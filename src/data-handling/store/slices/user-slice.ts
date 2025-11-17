import { createSlice } from '@reduxjs/toolkit';
import { USER_INITIAL_STATE } from '@/types/redux-types';

const INITIAL_STATE: USER_INITIAL_STATE= {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    language: {
        id : "en",
        label:"English",
        value:"en"
    },

}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        loginInitiated : (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess : (state, action) => {

            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        loginFailed : (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
   
        userLogoutSuccess : (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
  
        setLanguage : (state, action) => {
            state.language = action.payload;
        }
    },
});


export const { loginInitiated, loginSuccess, loginFailed,  userLogoutSuccess,  setLanguage} = userSlice.actions;
export default userSlice.reducer;
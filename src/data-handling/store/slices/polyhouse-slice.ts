import { createSlice } from "@reduxjs/toolkit";

type POLYHOUSE_STATE_TYPE = {
    selectedPolyhouse : any;
}

const POLYHOUSE_INITIAL_STATE : POLYHOUSE_STATE_TYPE = {
    selectedPolyhouse : {label : "PJTSAU-Plot2", value : "68b0084c8ab970a9207b70a7"},
}

const polyhouseSlice = createSlice({
    name : "polyhouse",
    initialState : POLYHOUSE_INITIAL_STATE,
    reducers : {
        setSelectedPolyhouse : (state, action) => {
            state.selectedPolyhouse = action.payload;
        },
        userLoggedOut : (state) => {
            state.selectedPolyhouse = null;
        }
    }
})


export const { setSelectedPolyhouse } = polyhouseSlice.actions;
export default polyhouseSlice.reducer;
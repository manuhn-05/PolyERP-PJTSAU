import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MODULE_STATE_TYPE = {
    selectedModules : any[] ,
}

const MODULE_INITIAL_STATE : MODULE_STATE_TYPE = {
    selectedModules : [],
}


const moduleSlice = createSlice({
    name : 'modules',
    initialState : MODULE_INITIAL_STATE,
    reducers : {
        addToSelectedModulesFromAvailableList(state, action : PayloadAction<any>){
            state.selectedModules.push(action.payload);
        },
        removeSelectedModulesFromAvailableList(state, action){

            state.selectedModules = state.selectedModules.filter((module) => module._id !== action.payload);
        }
    }
});


export const {addToSelectedModulesFromAvailableList, removeSelectedModulesFromAvailableList} = moduleSlice.actions;
export default moduleSlice.reducer;

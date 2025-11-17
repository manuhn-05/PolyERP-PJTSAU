import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserSlice from "@/data-handling/store/slices/user-slice";
import ModuleSlice from "@/data-handling/store/slices/module-slice";
import PolyhouseSlice from "@/data-handling/store/slices/polyhouse-slice"

// Perfist Config -  All the whitelisted states will be persisted
const persistconfig = {
    key: 'root',
    storage,
    version : 1,
    whitelist: ['user','modules', 'polyhouse'],
}

// Root Reducers - All the Reducers will be combined here and will be used in the store
const rootReducers = combineReducers({
    user: UserSlice,
    modules : ModuleSlice,
    polyhouse : PolyhouseSlice,
});

// Adds persistence layer to rootReducers
export const persistedReducer = persistReducer(persistconfig, rootReducers);

// Application State Store - All the states will be stored in this store
const appStore = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(appStore);
export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
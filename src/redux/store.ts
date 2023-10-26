import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./fetaures/cartSlice";
import favReducer from "./fetaures/favSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig={
    key:"root",
    version:1,
    storage
}
const reducer= combineReducers({
    cartReducer,
    favReducer,
});
const persistedReducer=persistReducer(persistConfig,reducer);
export const store=configureStore({
    reducer:persistedReducer,
    devTools:process.env.NODE_ENV!=="production",
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
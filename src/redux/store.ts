import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./fetaures/cartSlice";
import favReducer from "./fetaures/favSlice"
export const store=configureStore({
    reducer:{cartReducer,favReducer},
    devTools:process.env.NODE_ENV!=="production",
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
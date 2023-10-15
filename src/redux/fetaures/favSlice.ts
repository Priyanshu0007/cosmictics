import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface IProduct{
    id:number;
    name:string;
    img:string;
    price:number;
}
const initialState: Array<IProduct> = [];
export const favSlice = createSlice({
    name:"favSlice",
    initialState,
    reducers:{
        addToFav:(state,action:PayloadAction<IProduct>)=>{
            const id=action.payload.id;
            if(state.findIndex((pro)=>pro.id===action.payload.id)===-1){
                state.push(action.payload);
            }else{
                return state.filter((item)=>item.id!==id)
            }
        },
        removeFromFav:(state,action:PayloadAction<number>)=>{
            const id=action.payload;
            return state.filter((item)=>item.id!==id)
        },
    },
})
export const {addToFav,removeFromFav}=favSlice.actions;
export default favSlice.reducer;
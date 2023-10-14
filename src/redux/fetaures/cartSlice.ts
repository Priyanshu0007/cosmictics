import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface IProduct{
    id:number;
    name:string;
    img:string;
    price:number;
    quantity:number;
}
const initialState: Array<IProduct> = [];
export const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<IProduct>)=>{
            if(state.findIndex((pro)=>pro.id===action.payload.id)===-1){
                state.push(action.payload);
            }else{
                return state.map(item=>item.id===action.payload.id?{...item,quantity:item.quantity+1}:item)
            }
        },
        reduceQ:(state,action:PayloadAction<number>)=>{
            const id=action.payload;
            let count=-1;
            state.map((item)=>{
                count++;
                if(item.id===id){
                    if(item.quantity===1){
                        state.splice(count, 1);
                        return;
                    }
                    item.quantity--;
                }
            })
        },
        increaseQ:(state,action:PayloadAction<number>)=>{
            const id=action.payload;
            state.map((item)=>{
                if(item.id===id){
                    item.quantity++;
                }
            })
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
            const id=action.payload;
            return state.filter((item)=>item.id!==id)
        },
    },
})
export const {addToCart,removeFromCart,reduceQ,increaseQ}=cartSlice.actions;
export default cartSlice.reducer;
import { removeFromCart, reduceQ, increaseQ } from '@/redux/fetaures/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from "react-icons/ai"
interface propsType{
    id:number;
    img:string;
    name:string;
    price:string;
    quantity:number;
}
const CartProduct:React.FC<propsType>=({id,img,name,price,quantity,})=>{
    const dispatch=useAppDispatch();
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <img className='h-[80px] flex-wrap w-cover' src={img} alt={name}/>
            <div className='space-y-2 w-full'>
                <h3 className='font-medium'>{name}</h3>
                <div className='flex justify-between'>
                    <p className='text-gray-600 text-[14px]'>{quantity} x ₹{price}</p>
                    <p className='flex justify-around text-[18px] top-0 mr-2 gap-2'>
                        <AiOutlineMinusCircle className="text-[24px]" onClick={()=>dispatch(reduceQ(id))}/>
                        {quantity}
                        <AiOutlinePlusCircle className="text-[24px]" onClick={()=>dispatch(increaseQ(id))}/>
                    </p>
                </div>
            </div>
        </div>
        <RxCross1 className="cursor-pointer text-[14px]" onClick={()=>dispatch(removeFromCart(id))}/>
    </div>
  )
}

export default CartProduct
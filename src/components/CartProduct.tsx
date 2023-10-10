import { removeFromCart } from '@/redux/fetaures/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';

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
            <img className='h-[80px]' src={img} alt={name}/>
            <div className='space-y-2'>
                <h3 className='font-medium'>{name}</h3>
                <p className='text-gray-600 text-[14px]'>{quantity} x ₹{price}</p>
            </div>
        </div>
        <RxCross1 classNAme="cursor-pointer" onClick={()=>dispatch(removeFromCart(id))}/>
    </div>
  )
}

export default CartProduct
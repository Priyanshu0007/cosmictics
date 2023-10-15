import { addToCart } from '@/redux/fetaures/cartSlice';
import {removeFromFav} from "@/redux/fetaures/favSlice"
import { useAppDispatch } from '@/redux/hook';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineShoppingCart} from "react-icons/ai"
interface propsType{
    id:number;
    img:string;
    name:string;
    price:number;
}
const FavProduct:React.FC<propsType>=({id,img,name,price})=>{
    const dispatch=useAppDispatch();
    const addProductTocart=(e:React.FormEvent)=>{
        e.stopPropagation();
        const payload={id,name,img,price,quantity:1}
        dispatch(addToCart(payload));
        dispatch(removeFromFav(id));
    }
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <img className='h-[80px] flex-wrap w-cover' src={img} alt={name}/>
            <div className='space-y-2 w-full'>
                <h3 className='font-medium'>{name}</h3>
                <div className='flex justify-between'>
                    <p className='text-gray-600 text-[14px]'>₹{price}</p>
                    <p className='flex flex-2 justify-between text-[18px] top-0 mr-2 gap-2'>
                    <div className=' bg-gray-100 text-black w-[30px] h-[30px] text-[26px] grid place-items-center hover:text-accent' onClick={addProductTocart}><AiOutlineShoppingCart/></div>
                    <RxCross1 className="cursor-pointer text-[30px]" onClick={()=>dispatch(removeFromFav(id))}/>
                    </p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default FavProduct
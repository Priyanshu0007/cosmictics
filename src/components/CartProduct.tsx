import { removeFromCart, reduceQ, increaseQ } from '@/redux/fetaures/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

interface propsType {
    id: number;
    img: string;
    name: string;
    price: string;
    quantity: number;
}

const CartProduct: React.FC<propsType> = ({ id, img, name, price, quantity }) => {
    const dispatch = useAppDispatch();
    
    return (
        <div className='flex gap-4 items-center justify-between py-2'>
            <div className='flex items-center gap-4 flex-1 min-w-0'>
                <div className='w-16 h-16 rounded-xl overflow-hidden bg-obsidian border border-white/5 flex-shrink-0'>
                    <img className='w-full h-full object-cover' src={img} alt={name} />
                </div>
                <div className='space-y-1.5 flex-1 min-w-0'>
                    <h4 className='font-medium text-sm text-white truncate hover:text-accent cursor-pointer transition-colors duration-200'>
                        {name}
                    </h4>
                    <p className='text-accent-teal text-xs font-semibold'>
                        {quantity} <span className="text-gray-500 font-light">x</span> ₹{price}
                    </p>
                </div>
            </div>
            
            {/* Quantity Adjusters */}
            <div className='flex items-center gap-3 ml-2'>
                <div className='flex items-center bg-obsidian border border-white/10 rounded-md p-1'>
                    <button 
                        onClick={() => dispatch(reduceQ(id))} 
                        className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
                    >
                        <AiOutlineMinus className="text-xs" />
                    </button>
                    <span className="text-white text-xs px-2 min-w-[20px] text-center font-bold">
                        {quantity}
                    </span>
                    <button 
                        onClick={() => dispatch(increaseQ(id))} 
                        className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
                    >
                        <AiOutlinePlus className="text-xs" />
                    </button>
                </div>
                
                <button 
                    onClick={() => dispatch(removeFromCart(id))} 
                    className="text-gray-500 hover:text-red-400 p-1.5 transition-colors duration-200 cursor-pointer"
                >
                    <RxCross1 className="text-sm" />
                </button>
            </div>
        </div>
    )
}

export default CartProduct
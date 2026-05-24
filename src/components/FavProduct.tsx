import { addToCart } from '@/redux/fetaures/cartSlice';
import { removeFromFav } from "@/redux/fetaures/favSlice"
import { useAppDispatch } from '@/redux/hook';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineShoppingCart } from "react-icons/ai"

interface propsType {
    id: number;
    img: string;
    name: string;
    price: number;
}

const FavProduct: React.FC<propsType> = ({ id, img, name, price }) => {
    const dispatch = useAppDispatch();
    
    const addProductTocart = (e: React.FormEvent) => {
        e.stopPropagation();
        const payload = { id, name, img, price, quantity: 1 }
        dispatch(addToCart(payload));
        dispatch(removeFromFav(id));
    }

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
                        ₹{price}
                    </p>
                </div>
            </div>
            
            {/* Quick Actions */}
            <div className='flex items-center gap-3 ml-2'>
                <button 
                    onClick={addProductTocart} 
                    className='w-8 h-8 rounded-lg bg-obsidian hover:bg-accent-teal text-gray-300 hover:text-obsidian border border-white/10 hover:border-accent-teal flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md'
                    title="Add to Shopping Bag"
                >
                    <AiOutlineShoppingCart className="text-sm" />
                </button>
                
                <button 
                    onClick={() => dispatch(removeFromFav(id))} 
                    className="text-gray-500 hover:text-red-400 p-1.5 transition-colors duration-200 cursor-pointer"
                    title="Remove from favorites"
                >
                    <RxCross1 className="text-sm" />
                </button>
            </div>
        </div>
    )
}

export default FavProduct
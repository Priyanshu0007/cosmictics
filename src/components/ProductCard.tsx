"use client"
import { addToCart } from '@/redux/fetaures/cartSlice';
import { addToFav } from '@/redux/fetaures/favSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillHeart, AiFillStar, AiOutlineStar } from "react-icons/ai"

interface IProduct {
    id: number;
    img: string;
    name: string;
    price: number;
    star: number;
    sale: boolean | undefined;
}

const ProductCard = ({ id, img, name, price, star, sale }: IProduct) => {
    const [isFav, setIsFav] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const favItems = useAppSelector((state) => state.favReducer);
    const isInFavs = favItems.some((item: any) => item.id === id);

    const addProductToFav = (e: React.FormEvent) => {
        e.stopPropagation();
        const payload = { id, name, img, price };
        dispatch(addToFav(payload));
        setIsFav(!isFav);
    }

    const addProductTocart = (e: React.FormEvent) => {
        e.stopPropagation();
        const payload = { id, name, img, price, quantity: 1 }
        dispatch(addToCart(payload));
    }

    const getRating = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < star) {
                stars.push(<AiFillStar key={i} className="text-accent text-[14px]" />);
            } else {
                stars.push(<AiOutlineStar key={i} className="text-gray-600 text-[14px]" />);
            }
        }
        return <div className='flex gap-0.5 justify-center py-2'>{stars}</div>;
    }

    return (
        <div 
            className='glass-card group cursor-pointer select-none rounded-2xl p-3 border border-white/5 hover:border-accent/40 shadow-lg shadow-black/30 hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between'
            onClick={() => router.push(`/details/${id}`)}
        >
            <div className='relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-obsidian-light/50'>
                {/* Product Image */}
                <Image 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    width={500} 
                    height={600} 
                    src={img} 
                    alt={name}
                />
                
                {/* Sale Active badge */}
                {sale && (
                    <div className='absolute top-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md border border-white/10 z-10'>
                        New Arrival
                    </div>
                )}

                {/* Ambient backdrop layer */}
                <div className='absolute inset-0 bg-gradient-to-t from-obsidian via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4'>
                    <div className='flex gap-3 scale-90 group-hover:scale-100 transition-transform duration-300'>
                        {/* Favorite Button */}
                        <button 
                            className='w-11 h-11 bg-obsidian-light text-gray-200 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent shadow-md transition-colors duration-200 cursor-pointer'
                            onClick={addProductToFav}
                        >
                            {isInFavs ? <AiFillHeart className="text-lg text-accent" /> : <AiOutlineHeart className="text-lg" />}
                        </button>
                        {/* Cart Button */}
                        <button 
                            className='w-11 h-11 bg-obsidian-light text-gray-200 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent-teal hover:text-obsidian hover:border-accent-teal shadow-md transition-colors duration-200 cursor-pointer'
                            onClick={addProductTocart}
                        >
                            <AiOutlineShoppingCart className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Info details */}
            <div className='pt-3 text-center flex flex-col flex-grow justify-between'>
                <div>
                    {getRating()}
                    <h2 className='text-sm font-medium text-white hover:text-accent tracking-wide line-clamp-2 transition-colors duration-200 min-h-[40px] px-1'>
                        {name}
                    </h2>
                </div>
                <p className='text-accent-teal font-semibold text-sm pt-2'>₹{price}</p>
            </div>
        </div>
    )
}

export default ProductCard
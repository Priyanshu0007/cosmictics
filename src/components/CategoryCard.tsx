'use client'
import { scrollToSection } from '@/utils/helper';
import Image from 'next/image';
import React from 'react'

interface propsType {
    id: number;
    setSelectedTab: any;
    img: string;
    type: string;
    quantity: string;
}

const CategoryCard = ({ img, type, quantity, id, setSelectedTab }: propsType) => {
  const menuItemClickHandler = (id: number) => {
    scrollToSection("shop");
    setSelectedTab(id);
  };
  
  return (
    <div 
        className='space-y-4 cursor-pointer group flex flex-col items-center' 
        onClick={() => menuItemClickHandler(id)}
    >
        <div className='relative w-[130px] h-[130px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent shadow-lg shadow-black/45 group-hover:scale-105 transition-all duration-300'>
            <Image 
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                src={img} 
                width={200} 
                height={200} 
                alt={type} 
            />
            {/* Glowing ring overlay on hover */}
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="text-center space-y-1">
            <h3 className='text-sm md:text-base font-semibold text-white group-hover:text-accent tracking-wide transition-colors duration-200'>
                {type}
            </h3>
            <p className='text-xs text-gray-400 tracking-wider uppercase'>
                {quantity}
            </p>
        </div>
    </div>
  )
}

export default CategoryCard
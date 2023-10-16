'use client'
import { scrollToSection } from '@/utils/helper';
import Image from 'next/image';
import React from 'react'

interface propsType{
    id:number;
    setSelectedTab:any;
    img:string;
    type:string;
    quantity:string;
}
const CategoryCard = ({img,type,quantity,id,setSelectedTab}:propsType) => {
  const menuItemClickHandler = (id:number) => {
    scrollToSection("shop");
    setSelectedTab(id);
};
  return (
    <div className='space-y-4 cursor-pointer hover:scale-105 transition-transform' onClick={() => menuItemClickHandler(id)}>
        <Image className='rounded-full border-4 md:border-8 border-white' src={img} width={250} height={250} alt={type} />
        <div>
            <h2 className='text-[14px] md:text-xl font-medium'>{type}</h2>
            <p className='text-gray-600 text-[12px] md:text-[14px]'>{quantity}</p>
        </div>
    </div>
  )
}

export default CategoryCard
import React from 'react';
import { Whisper } from 'next/font/google';
import Image from 'next/image';
import CategoryCard from './CategoryCard';
const whisper=Whisper({subsets:["latin"],weight:["400"]});
const data=[
    {
        img:"/category/1.png",
        type:"Lipsticks",
        quantity:"(8 Items)",
    },
    {
        img:"/category/2.png",
        type:"Nail & Wax",
        quantity:"(6 Items)",
    },
    {
        img:"/category/3.png",
        type:"Skincare",
        quantity:"(4 Items)",
    }
]
const Category = () => {
  return (
    <div className='bg-gradient-to-r from-orange-300 to-rose-300  py-10 bg-contain mt-32'>
        <Image className="w-full" width={1000} height={1142} src="/banner.png" alt="Banner"/>
        <div className={`container text-center text-white`}>
            <h2 className='text-[40px] font-medium '>Top Category</h2>
            <div className='flex justify-center gap-4 md:gap-16 pt-8'>
                {data.map((item)=>(
                    <CategoryCard key={item.type} img={item.img} type={item.type} quantity={item.quantity}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Category
import React from 'react';
import { Whisper } from 'next/font/google';
import Image from 'next/image';
import CategoryCard from './CategoryCard';
const whisper=Whisper({subsets:["latin"],weight:["400"]});
const data=[
    {
        id:2,
        img:"/category/1.jpg",
        type:"Lipsticks",
        quantity:"(8 Items)",
    },
    {
        id:4,
        img:"/category/2.jpg",
        type:"Eyes",
        quantity:"(6 Items)",
    },
    {
        id:1,
        img:"/category/3.jpg",
        type:"Skincare",
        quantity:"(4 Items)",
    }
]
const Category = ({setSelectedTab}:any) => {
  return (
    <div className='bg-gradient-to-r from-orange-300 to-rose-300  py-10 bg-contain mt-32'>
        <Image className="w-full" width={1000} height={1142} src="/banner.png" alt="Banner"/>
        <div className={`container text-center text-white`}>
            <h2 className='text-[40px] font-medium '>Top Category</h2>
            <div className='flex justify-center gap-4 md:gap-16 pt-8'>
                {data.map((item)=>(
                    <CategoryCard key={item.type} id={item.id} setSelectedTab={setSelectedTab} img={item.img} type={item.type} quantity={item.quantity}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Category
import Image from 'next/image';
import React from 'react'

interface propsType{
    img:string;
    title:string;
    desc:string;
}
const FeaturesCard = ({img,title,desc}:propsType) => {
  return (
    <div className='flex gap-8 md:last-of-type:hidden xl:last-of-type:flex'>
        <Image src={img} className='h-[60px] w-auto' width={60} height={50} alt={title}/>
        <div className='space-y-1'>
            <h2 className='font-medium text-xl uppercase'>{title}</h2>
            <p className='text-gray-600 text-[14px]'>{desc}</p>
        </div>
    </div>
  )
}

export default FeaturesCard
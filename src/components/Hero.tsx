"use client"
import React, { useState } from 'react'
import Slideshow from './SlideShow';
import { RxCross1 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';


const Hero = () => {
  const [close,setClose]=useState(true);
  const router=useRouter();
  return (
    <div id="home"  className='container relative pt-6'>
        <Slideshow/>
        {close && <div className='z-10  hidden sm:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white opacity-90 w-[-250px] h-[200px] space-y-3 lg:w-[300px] lg:h-[270px] lg:space-y-6 xl:w-[400px] xl:h-[300px] p-6 xl:space-y-8'>
            <h2 className='text-[22px] lg:text-[30px] xl:text-[40px] leading-tight'>Lipsticks form Charlotte Tilbury</h2>
            <p className='text-gray-800 text-[14px] xl:text-[16px]'>Get exciting offer on Charlotte Tilbury's lipsticks.</p>
            <button onClick={()=>router.push(`/details/1`)} className='bg-[#333] uppercase text-white text-[12px] lg:text-[16px] py-2 xl:py-3 px-8 rounded-md hover:bg-accent'>Shop Now</button>
            <div onClick={()=>setClose(false)} className='absolute top-[-27px] right-[5px] bg-red-600 hover:bg-red-800 w-[30px] h-[30px] text-white text-[14px] grid place-items-center'><RxCross1/></div>
        </div>}
    </div>
  )
}

export default Hero
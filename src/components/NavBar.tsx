"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import {IoMdClose} from "react-icons/io";
import {CgMenuRight} from "react-icons/cg"
import {RiShoppingBagLine} from "react-icons/ri";
import { useAppSelector } from '@/redux/hook';
import { scrollToSection } from '@/utils/helper';
import Image from 'next/image';
const NavBar = ({setShowCart}:any) => {
    const [isOpen,setIsOpen]=useState(false);
    const cartCount=useAppSelector((state)=>{
        let quant=0;
        state.cartReducer.map((item)=>{
            quant+=item.quantity;    
        })
        return quant;
    });
    
    const handleNav=()=>{
        setIsOpen(true);
    }
    const menuItemClickHandler = (section:any) => {
        scrollToSection(section);
        setIsOpen(false);
    };

  return (
    <>
    <div className='bg-white z-40 py-4 sticky top-0'>
        <div className='container flex justify-between items-center'>
            {isOpen? <IoMdClose onClick={()=>setIsOpen(false)} className="sm:hidden text-[26px]"/> : <CgMenuRight onClick={handleNav} className="sm:hidden text-[26px]"/>}
            <Link href="/" className='text-4xl font-semibold hover:text-accent'><Image width={100} height={100} src="/logo.png" alt='logo'/></Link>
            <ul className='gap-6 hidden sm:flex'>
                <li onClick={() => menuItemClickHandler("home")} className='navLink'>Home</li>
                <li onClick={() => menuItemClickHandler("shop")} className='navLink'>Shop</li>
                <li onClick={() => menuItemClickHandler("blog")} className='navLink'>Blog</li>
                <li onClick={() => menuItemClickHandler("contact")} className='navLink'>Contact</li>
            </ul>
            
            <div className='flex gap-6 text-[26px]'>
                <div onClick={()=>setShowCart(true)} className='relative cursor-pointer'>
                    <RiShoppingBagLine/>
                    <div className='absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center'>{cartCount}</div>
                </div>
                {/* <BiSearchAlt2/> */}
            </div>
        </div>
        {isOpen?  <ul className='gap-6 flex flex-col justify-around'>
            <li onClick={() => menuItemClickHandler("home")} className='navLink flex justify-center'>Home</li>
            <li onClick={() => menuItemClickHandler("shop")} className='navLink flex justify-center'>Shop</li>
            <li onClick={() => menuItemClickHandler("blog")} className='navLink flex justify-center'>Blog</li>
            <li onClick={() => menuItemClickHandler("contact")} className='navLink flex justify-center'>Contact</li>
        </ul>:""}
        {isOpen && <div className='z-30  w-full  backdrop-blur' />}
    </div>
     
    </>
  )
}

export default NavBar
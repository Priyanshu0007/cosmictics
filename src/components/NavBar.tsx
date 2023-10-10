"use client"
import Link from 'next/link';
import React from 'react'
import {RxHamburgerMenu} from "react-icons/rx";
import {RiShoppingBagLine} from "react-icons/ri";
import {BiSearchAlt2} from "react-icons/bi"
import { useAppSelector } from '@/redux/hook';
const NavBar = ({setShowCart}:any) => {
    const cartCount=useAppSelector((state)=>state.cartReducer.length);
  return (
    <div className='bg-white py-4 sticky top-0 z-10'>
        <div className='container flex justify-between items-center'>
            <RxHamburgerMenu className="sm:hidden text-[26px]"/>
            <Link href="/" className='text-4xl font-semibold hover:text-accent'>LOGO</Link>
            <ul className='gap-6 hidden sm:flex'>
                <Link href="/" className='navLink'>Home</Link>
                <li className='navLink'>Shop</li>
                <li className='navLink'>Blog</li>
                <li className='navLink'>Pages</li>
                <li className='navLink'>Contact</li>
            </ul>
            <div className='flex gap-6 text-[26px]'>
                <div onClick={()=>setShowCart(true)} className='relative cursor-pointer'>
                    <RiShoppingBagLine/>
                    <div className='absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center'>{cartCount}</div>
                </div>
                <BiSearchAlt2/>
            </div>
        </div>
    </div>
  )
}

export default NavBar
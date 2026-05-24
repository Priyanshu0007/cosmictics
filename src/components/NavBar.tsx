"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg"
import { RiShoppingBagLine } from "react-icons/ri";
import { useAppSelector } from '@/redux/hook';
import { scrollToSection } from '@/utils/helper';
import Image from 'next/image';
import { AiFillHeart } from "react-icons/ai"
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const NavBar = ({ setShowCart, setShowFav }: any) => {
    const path = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    
    const favCount = useAppSelector((state) => {
        return state.favReducer.length;
    })
    
    const cartCount = useAppSelector((state) => {
        let quant = 0;
        state.cartReducer.map((item) => {
            quant += item.quantity;
        })
        return quant;
    });

    const handleNav = () => {
        setIsOpen(true);
    }
    
    const menuItemClickHandler = (section: any) => {
        if (path && path.length > 3) {
            router.push(`/#${section}`);
        } else {
            scrollToSection(section);
        }
        setIsOpen(false);
    };

    return (
        <header className='sticky top-0 z-40 w-full bg-[#07070A]/85 backdrop-blur-md border-b border-white/5 py-4 transition-all duration-300'>
            <div className='container flex justify-between items-center'>
                {/* Mobile Menu Toggle */}
                <div className="sm:hidden text-[26px] text-gray-300 hover:text-accent cursor-pointer transition-colors duration-200">
                    {isOpen ? (
                        <IoMdClose onClick={() => setIsOpen(false)} />
                    ) : (
                        <CgMenuRight onClick={handleNav} />
                    )}
                </div>

                {/* Logo */}
                <Link href="/" className='text-3xl font-semibold flex items-center hover:scale-[1.02] transition-transform duration-200'>
                    <span className="font-serif text-white tracking-widest bg-gradient-to-r from-accent to-accent-teal bg-clip-text text-transparent mr-2 font-bold">COSMIC</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-light border-l border-white/10 pl-2">TICS</span>
                </Link>

                {/* Navigation Links */}
                <nav className='hidden sm:block'>
                    <ul className='flex gap-8'>
                        <li onClick={() => menuItemClickHandler("home")} className='navLink'>Home</li>
                        <li onClick={() => menuItemClickHandler("shop")} className='navLink'>Shop</li>
                        <li onClick={() => menuItemClickHandler("blog")} className='navLink'>Blog</li>
                        <li onClick={() => menuItemClickHandler("contact")} className='navLink'>Contact</li>
                    </ul>
                </nav>

                {/* Badges / Actions */}
                <div className='flex gap-6 text-[24px] text-gray-300'>
                    {/* Favorites Badge */}
                    <div onClick={() => setShowFav(true)} className='relative cursor-pointer hover:text-accent transition-colors duration-300'>
                        <AiFillHeart />
                        {favCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border border-[#07070A] shadow-md shadow-accent/20 animate-scale-in'>
                                {favCount}
                            </span>
                        )}
                    </div>
                    {/* Cart Badge */}
                    <div onClick={() => setShowCart(true)} className='relative cursor-pointer hover:text-accent-teal transition-colors duration-300'>
                        <RiShoppingBagLine />
                        {cartCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-accent-teal text-[#07070A] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border border-[#07070A] shadow-md shadow-accent-teal/20 animate-scale-in'>
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#07070A]/95 border-b border-white/5 py-6 px-8 sm:hidden transition-all duration-300 animate-slide-down">
                    <ul className='flex flex-col gap-5 text-center'>
                        <li onClick={() => menuItemClickHandler("home")} className='text-lg text-gray-300 hover:text-accent font-light py-2 cursor-pointer transition-colors duration-200'>Home</li>
                        <li onClick={() => menuItemClickHandler("shop")} className='text-lg text-gray-300 hover:text-accent font-light py-2 cursor-pointer transition-colors duration-200'>Shop</li>
                        <li onClick={() => menuItemClickHandler("blog")} className='text-lg text-gray-300 hover:text-accent font-light py-2 cursor-pointer transition-colors duration-200'>Blog</li>
                        <li onClick={() => menuItemClickHandler("contact")} className='text-lg text-gray-300 hover:text-accent font-light py-2 cursor-pointer transition-colors duration-200'>Contact</li>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default NavBar
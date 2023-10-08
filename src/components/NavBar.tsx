import Link from 'next/link';
import React from 'react'
import {RxHamburgerMenu} from "react-icons/rx";
const NavBar = () => {
  return (
    <div className='bg-white py-4 sticky top-0 z-10'>
        <div className='container flex justify-between items-center'>
            <RxHamburgerMenu className="sm:hidden text-[26px]"/>
            <Link href="/" className='text-4xl font-medium hover:text-accent'>LOGO</Link>
        </div>
    </div>
  )
}

export default NavBar
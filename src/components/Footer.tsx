import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaMedium, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id="contact" className='bg-obsidian border-t border-white/5 py-12 mt-20 relative'>
        {/* Ambient background glow */}
        <div className="absolute right-0 bottom-0 w-[200px] h-[200px] ambient-glow-teal rounded-full pointer-events-none opacity-10" />

        <div className='container text-center space-y-6 relative z-10'>
            <div className="flex justify-center items-center gap-2">
                <span className="font-serif text-white tracking-widest text-xl font-bold">COSMIC</span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-light border-l border-white/10 pl-2">TICS</span>
            </div>
            
            <p className='text-xs text-gray-400 uppercase tracking-widest'>
                Premium WebGPU Cosmetics Experience
            </p>
            
            <div className="text-2xl text-gray-400 flex justify-center space-x-6">
              <Link href="https://github.com/Priyanshu0007" target="_blank" className='hover:text-accent hover:scale-110 transition-all duration-300'>
                <FaGithub />
              </Link>
              <Link href="https://www.linkedin.com/in/priyanshu-gupta-430627202/" target="_blank" className='hover:text-accent-teal hover:scale-110 transition-all duration-300'>
                <FaLinkedin />
              </Link>
              <Link href="https://priyanshu0007.medium.com/" target="_blank" className='hover:text-accent hover:scale-110 transition-all duration-300'>
                <FaMedium />
              </Link>
              <Link href="https://twitter.com/Priyanshu_0099" target="_blank" className='hover:text-accent-teal hover:scale-110 transition-all duration-300'>
                <FaTwitter />
              </Link>
            </div>

            <div className="w-1/6 h-[1px] bg-white/5 mx-auto mt-6" />

            <p className='text-gray-500 text-[11px] uppercase tracking-wider'>
                &copy; {new Date().getFullYear()} Priyanshu Gupta | All Rights Reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer
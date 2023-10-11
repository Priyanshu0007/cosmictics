import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaMedium, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <div id="contact"  className='bg-[#212121] py-8 mt-32'>
        <div className='container text-center text-white'>
            <p>&copy; Copyright Priyanshu Gupta | All Right Reserved.</p>
        </div>
        <div className="mt-2 text-[48px] text-white flex justify-center space-x-4 ">
          <Link href="https://github.com/Priyanshu0007"><FaGithub/></Link>
          <Link href="https://www.linkedin.com/in/priyanshu-gupta-430627202/"><FaLinkedin/></Link>
          <Link href="https://priyanshu0007.medium.com/"><FaMedium/></Link>
          <Link href="https://twitter.com/Priyanshu_0099"><FaTwitter/></Link>
        </div>
    </div>
  )
}

export default Footer
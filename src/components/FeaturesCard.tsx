import Image from 'next/image';
import React from 'react'

interface propsType {
    img: string;
    title: string;
    desc: string;
}

const FeaturesCard = ({ img, title, desc }: propsType) => {
  return (
    <div className='flex gap-5 items-center p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5 group'>
        <div className="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-obsidian-light border border-white/5 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-300">
            <Image src={img} className='h-[40px] w-auto object-contain brightness-95 contrast-105' width={40} height={40} alt={title} />
        </div>
        <div className='space-y-0.5 text-left'>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-white group-hover:text-accent transition-colors duration-200'>
                {title}
            </h3>
            <p className='text-gray-400 text-xs font-light leading-snug'>
                {desc}
            </p>
        </div>
    </div>
  )
}

export default FeaturesCard
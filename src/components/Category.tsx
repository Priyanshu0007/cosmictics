import React from 'react';
import Image from 'next/image';
import CategoryCard from './CategoryCard';

const data = [
    {
        id: 2, // Lipsticks matches tab index 2
        img: "/category/1.jpg",
        type: "Lipsticks",
        quantity: "(8 Items)",
    },
    {
        id: 4, // Eyes matches tab index 4
        img: "/category/2.jpg",
        type: "Eyes",
        quantity: "(6 Items)",
    },
    {
        id: 1, // Skin matches tab index 1
        img: "/category/3.jpg",
        type: "Skincare",
        quantity: "(4 Items)",
    }
]

const Category = ({ setSelectedTab }: any) => {
  return (
    <section className='bg-[#0A0A0F] py-20 mt-20 relative border-y border-white/5'>
        {/* Ambient background glow */}
        <div className="absolute left-0 top-1/2 w-[350px] h-[350px] ambient-glow-magenta rounded-full pointer-events-none opacity-20" />
        
        <div className="container relative z-10 space-y-12">
            {/* Styled Brand Banner */}
            <div className="w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl shadow-black/85 relative group">
                <Image 
                    className="w-full h-auto object-cover max-h-[350px] transition-transform duration-700 group-hover:scale-[1.01]" 
                    width={1500} 
                    height={350} 
                    src="/banner.png" 
                    alt="Cosmetics Promo Banner"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Top Categories */}
            <div className='text-center space-y-3'>
                <h2 className='text-4xl font-serif font-semibold text-white tracking-wide uppercase'>Top Categories</h2>
                <p className='text-xs text-gray-400 uppercase tracking-widest'>Explore our select premium cosmetic lines</p>
                
                <div className='flex flex-wrap justify-center gap-8 md:gap-16 pt-10'>
                    {data.map((item) => (
                        <CategoryCard 
                            key={item.type} 
                            id={item.id} 
                            setSelectedTab={setSelectedTab} 
                            img={item.img} 
                            type={item.type} 
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Category
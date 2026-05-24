'use client'
import React, { useEffect, useState } from 'react'
import Data from "@/utils/productData"
import ProductCard from './ProductCard';

interface IProduct {
    id: number;
    img: string[];
    name: string;
    price: number;
    star: number;
    sale: boolean | undefined;
}

const tabsData = ["All", "Skin", "Lipsticks", "Brows", "Eyes"];

const NewArrival = ({ setSelectedTab, selectedTab }: any) => {
    const [data, setData] = useState([]);
    
    const shuffleArray = (array: any) => {
        return array
            .map((value: any) => ({ value, sort: Math.random() }))
            .sort((a: any, b: any) => a.sort - b.sort)
            .map(({ value }: any) => value);
    }
    
    useEffect(() => {
        setData(shuffleArray(Data).slice(0, 15));
    }, [])
    
    const handleTab = (index: number) => {
        const category = tabsData[index].toLowerCase();
        setSelectedTab(index);
        
        if (category === "all") {
            setData(shuffleArray(Data).slice(0, 15));
            return;
        }
        
        const filterData = Data.filter((item) => item.category.includes(category));
        setData(shuffleArray(filterData));
    }
    
    useEffect(() => {
        handleTab(selectedTab)
    }, [selectedTab])

    return (
        <section id="shop" className='container pt-24 pb-20 relative'>
            {/* Ambient visual background glow */}
            <div className="absolute right-0 top-1/4 w-[250px] h-[250px] ambient-glow-teal rounded-full pointer-events-none opacity-20" />
            
            <div className='text-center space-y-3 relative z-10'>
                <p className='font-serif italic text-2xl text-accent tracking-widest'>For your beauty</p>
                <h2 className='font-serif font-semibold text-4xl lg:text-5xl text-white tracking-wide uppercase'>New Arrival</h2>
                
                {/* Tabs Filter */}
                <ul className='flex flex-wrap gap-4 sm:gap-8 justify-center pt-8 uppercase tracking-widest text-xs font-semibold'>
                    {tabsData.map((text, index) => {
                        const isActive = selectedTab === index;
                        return (
                            <li 
                                key={text} 
                                className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${
                                    isActive 
                                        ? "border-accent bg-accent/10 text-accent glow-text-magenta" 
                                        : "border-white/5 bg-[#0F0F16]/50 text-gray-400 hover:text-white hover:border-white/10"
                                }`} 
                                onClick={() => handleTab(index)}
                            >
                                {text}
                            </li>
                        );
                    })}
                </ul>

                {/* Product Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10'>
                    {data.map((item: IProduct) => (
                        <ProductCard 
                            key={item.id} 
                            id={item.id} 
                            img={item.img[0]} 
                            name={item.name} 
                            price={item.price} 
                            star={item.star} 
                            sale={item.sale} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default NewArrival
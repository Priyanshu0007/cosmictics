'use client'
import BlogSection from '@/components/BlogSection'
import Category from '@/components/Category'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import NewArrival from '@/components/NewArrival'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const CosmicSwatchLab = dynamic(() => import('@/components/CosmicSwatchLab'), {
  ssr: false,
  loading: () => (
    <div className="py-20 text-center text-gray-500 font-serif tracking-widest bg-[#07070A] uppercase text-xs">
      Initializing Quantum Color Swatcher...
    </div>
  )
});

export default function Home() {
  const [selectedTab,setSelectedTab]=useState(0);
  return (
    <main>
      <Hero/>
      <Features/>
      <NewArrival selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <Category setSelectedTab={setSelectedTab}/>
      <CosmicSwatchLab />
      <BlogSection/>
    </main>
  )
}

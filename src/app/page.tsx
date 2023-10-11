'use client'
import BlogSection from '@/components/BlogSection'
import Category from '@/components/Category'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import NewArrival from '@/components/NewArrival'
import { useState } from 'react'

export default function Home() {
  const [selectedTab,setSelectedTab]=useState(0);
  return (
    <main>
      <Hero/>
      <Features/>
      <NewArrival selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <Category setSelectedTab={setSelectedTab}/>
      <BlogSection/>
    </main>
  )
}

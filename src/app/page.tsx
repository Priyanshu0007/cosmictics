import BlogSection from '@/components/BlogSection'
import Category from '@/components/Category'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import NewArrival from '@/components/NewArrival'

export default function Home() {
  return (
    <main>
      <Hero/>
      <Features/>
      <NewArrival/>
      <Category/>
      <BlogSection/>
    </main>
  )
}

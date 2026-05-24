import React from 'react'
import BlogCard from './BlogCard'
import data from "@/utils/blogData"

const BlogSection = () => {
  return (
    <section id="blog" className='container pt-24 pb-20 relative'>
        {/* Ambient background glow */}
        <div className="absolute left-0 bottom-1/4 w-[250px] h-[250px] ambient-glow-magenta rounded-full pointer-events-none opacity-10" />
        
        <div className='space-y-3 border-l-4 border-accent pl-4 mb-10'>
            <h2 className='font-serif font-semibold text-3xl lg:text-4xl text-white tracking-wide uppercase'>Latest Editorial</h2>
            <p className='text-xs text-gray-400 uppercase tracking-widest'>
                Read updates and tutorials from our beauty experts
            </p>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4'>
            {data.map(item => (
                <BlogCard 
                    key={item.id} 
                    id={item.id} 
                    img={item.img} 
                    title={item.title} 
                    date={item.date} 
                    comments={item.comments}
                />
            ))}
        </div>
    </section>
  )
}

export default BlogSection
import React from 'react'
import BlogCard from './BlogCard'
import data from "@/utils/blogData"
const BlogSection = () => {
  return (
    <div id="blog"  className='container pt-32 '>
        <h2 className='font-bold text-2xl'>Latest Blogs</h2>
        <p className='text-gray-500'>
            Present posts in a best wat to highlight interesting moments of your blog.
        </p>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8'>
            {data.map(item=><BlogCard key={item.id} id={item.id} img={item.img} title={item.title} date={item.date} comments={item.comments}/>)}
        </div>
    </div>
  )
}

export default BlogSection
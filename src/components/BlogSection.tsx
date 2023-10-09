import React from 'react'
import BlogCard from './BlogCard'

const data=[
    {
        img:"/blog/1.png",
        title:"Lorem ispsum dolor sit amet",
        date:"Sep 27, 2023",
        comment:8,
    },
    {
        img:"/blog/2.png",
        title:"Lorem ispsum dolor sit amet",
        date:"Sep 25, 2023",
        comment:1,
    },
    {
        img:"/blog/3.png",
        title:"Lorem ispsum dolor sit amet",
        date:"Sep 30, 2023",
        comment:6,
    }
]
const BlogSection = () => {
  return (
    <div className='container pt-32 '>
        <h2 className='font-bold text-2xl'>Latest News</h2>
        <p className='text-gray-500'>
            Present posts in a best wat to highlight interesting moments of your blog.
        </p>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8'>
            {data.map(item=><BlogCard key={item.date} img={item.img} title={item.title} date={item.date} comment={item.comment}/>)}
        </div>
    </div>
  )
}

export default BlogSection
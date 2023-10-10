import Image from 'next/image';
import React from 'react'

interface commentw{
  name:string;
  comment:string;
}
interface propsType{
    img:string;
    title:string;
    date:string;
    comments:commentw[];
}
const BlogCard = ({img,title,date,comments}:propsType) => {  
  return (
    <div className='space-y-4'>
        <Image height={300} width={400} className='rounded-lg hover:scale-105 transition-transform' src={img} alt='post'/>
        <div className='text-accent font-medium'>
            <span>{date} / </span>
            <span>{comments.length} Comments</span>
        </div>
        <h3 className='font-bold text-xl'>{title}</h3>
    </div>
  )
}

export default BlogCard
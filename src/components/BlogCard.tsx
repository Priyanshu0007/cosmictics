import Image from 'next/image';
import React from 'react'

interface propsType{
    img:string;
    title:string;
    comment:number;
    date:string;
}
const BlogCard = ({img,title,date,comment}:propsType) => {
  return (
    <div className='space-y-4'>
        <Image height={1000} width={1000} className='rounded-lg hover:scale-105 transition-transform' src={img} alt='post'/>
        <div className='text-accent font-medium'>
            <span>{date} / </span>
            <span>{comment} Comments</span>
        </div>
        <h3 className='font-bold text-xl'>{title}</h3>
    </div>
  )
}

export default BlogCard
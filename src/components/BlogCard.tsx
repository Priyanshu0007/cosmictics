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
        <img className='rounded-lg hover:scale-105' />
    </div>
  )
}

export default BlogCard
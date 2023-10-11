import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface commentw{
  name:string;
  comment:string;
}
interface propsType{
    id:number;
    img:string;
    title:string;
    date:string;
    comments:commentw[];
}
const BlogCard = ({id,img,title,date,comments}:propsType) => {  
  const router=useRouter();
  return (
    <div className='space-y-4 cursor-pointer' onClick={()=>router.push(`/blog/${id}`)}>
        <Image height={300} width={400} className='rounded-lg hover:scale-105 transition-transform' src={img} alt='post'/>
        <div className='text-accent font-medium'>
            <span>{date} / </span>
            <span>{comments.length} {`Comment${comments.length>1?'s':''}`}</span>
        </div>
        <h3 className='font-bold text-xl'>{title}</h3>
    </div>
  )
}

export default BlogCard
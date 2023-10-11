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
      author:string;
      comments:commentw[];
  }
const SimilarBlogCard = ({id,img,title,date, author,comments}:propsType) => {
    const router=useRouter();
  return (
    <div className='grid grid-cols-2 mt-4 cursor-pointer' onClick={()=>router.push(`/blog/${id}`)}>
        <img src={img} className='w-2/3'/>
        <div className='flex flex-col justify-center'>
            <p className='text-[20px] mb-2'>{title}</p>
            <div className='text-gray-500 text-[16px]'>{date}</div>
            <div className='text-gray-500 text-[16px]'>{author}</div>
            <div className='text-gray-500 text-[16px]'>{comments.length} {`comment${comments.length>1?'s':''}`}</div>
        </div>
    </div>
  )
}

export default SimilarBlogCard
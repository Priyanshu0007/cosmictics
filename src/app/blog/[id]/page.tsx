"use client"
import React, { useEffect, useState } from 'react'
import Data from "@/utils/blogData"
import { useParams } from 'next/navigation';
import {FaFacebookSquare, FaInstagram, FaTwitter,FaCopy} from "react-icons/fa"
import Link from 'next/link';
import SimilarBlogCard from '@/components/SimilarBlogCard';
import { comment } from 'postcss';
import Comment from '@/components/Comment';
import { scrollToSection } from '@/utils/helper';
interface comments{
    id:number
    name:string;
    date:string;
    comment:string;
}
interface IBlog{
    id:number;
    img:string;
    title:string;
    author:string;
    blog_content_html:string;
    date:string;
    comments:comments[];
}
const page = () => {
    const params=useParams();
    const [blogData,setBlogData]=useState<IBlog>({
        id:0,
        img:"",
        title:"",
        author:"",
        blog_content_html:"",
        date:"",
        comments:[],
    })
    useEffect(()=>{
        const id=params.id;
        const getBlogData=Data.filter((item)=>item.id.toString()===id)[0];
        setBlogData(getBlogData);
    })
    
    function convertStringToHTML(blog: string):HTMLBodyElement{
        const body = document.createElement('body');
        body.innerHTML = blog;
        return body;
    }
    const htmlBody=convertStringToHTML(blogData.blog_content_html);
    const similarBlog = Data.filter((item) => item.id !== blogData.id);
    similarBlog.splice(3);
  return (
    <div className='pt-8'>
         <div className='bg-gray-100 py-4'>
            <div className='container flex gap-4 items-center text-gray-500'>
                <Link href="/" className='cursor-pointer hover:text-accent'>Home</Link>
                <div className='w-[30px] g-[2px] bg-gray-400'></div>
                <p className='capitalize'>Blog</p>
                <div className='w-[30px] g-[2px] bg-gray-400'></div>
                <p>{blogData?.title}</p>
            </div>
        </div>
        <div className='container pt-8'>
            <div className='grid md:grid-cols-2 gap-16'>
                <div className='space-y-4'>
                    <div className='flex space-between justify-between'>
                        <div className='flex items-center text-accent'>
                            <p onClick={()=>scrollToSection("comment")} className='text-gray-400 text-[13px] ml-2 hover:text-accent cursor-pointer'>({blogData.comments.length} {`comment${blogData.comments.length>1?'s':''}`})</p>
                        </div>
                        <div className="flex gap-1 items-center ">
                            Share: {" "}
                            <div className="flex gap-4 items-center text-[28px] sm:text-[18px]">
                                <FaCopy/> <FaFacebookSquare/> < FaTwitter/> < FaInstagram/>
                            </div>
                        </div>
                    </div>
                    <div className='text-[#161616] space-y-6'>
                        <h2 className='text-3xl font-semibold'>{blogData?.title}</h2>
                    </div>
                    <div className='text-gray-500 text-[18px]'>
                        <div dangerouslySetInnerHTML={{ __html: htmlBody.innerHTML }} />
                    </div>
                    <h2 id="comment">Comments :</h2>
                    <div className="w-3/4 h-[2px] bg-gray-400" />
                    <div>
                        {blogData.comments.map((com)=><Comment key={com.id} name={com.name} date={com.date} comment={com.comment} rating={6}/>)}
                    </div>
                </div>
                <div className='flex flex-col space-y-4'>
                    <img className='w-full ' src={blogData?.img}  alt={blogData?.title}/>
                    <div className="w-3/4 h-[2px] bg-gray-400" />
                    <div className='flex justify-between'>
                        <p>Name: {blogData?.author}</p>
                        <p>Date: {blogData?.date}</p>
                    </div>
                    <div className="w-1/2 h-[2px] bg-gray-400" />
                    <div>
                        <h2>Similar Blogs :</h2>
                        <div className=' flex flex-col '>
                            {similarBlog.map((item)=><SimilarBlogCard key={item.id} id={item.id} author={item.author} img={item.img} title={item.title} date={item.date} comments={item.comments} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
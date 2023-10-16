"use client"
import React, { useEffect, useState } from 'react'
import Data from "@/utils/blogData"
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SimilarBlogCard from '@/components/SimilarBlogCard';
import Comment from '@/components/Comment';
import { scrollToSection } from '@/utils/helper';
import Share from '@/components/Share';
import ProductCard from '@/components/ProductCard';
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
const recommendedProducts=[
    {
        id:1,
        img:["/product/2/1.jpg","/product/2/2.jpg","/product/2/3.jpg","/product/2/4.jpg"],
        name:"Charlotte Tilbury Matte Revolution - Pillow Talk Medium",
        price:3150,
        category:["lipsticks"],
        sale:false,
        star:4,
        des:"Experience the magic of achieving luminous, cashmere-soft lips with a single swipe of our lipstick. This formula boasts a harmonious blend of nourishing oils, triglycerides, and waxes that not only grant you a matte finish but also offer the flexibility to build and maintain rich, long-lasting color that stays put for up to 10 hours. Infused with the goodness of lipstick tree and orchid extract, your lips will receive the royal treatment, with hydration, protection, and a touch of softness for a youthful, healthy appearance. Our lipstick's revolutionary, square, angled tip mirrors the precision of a lip brush, ensuring impeccable application. Furthermore, the inclusion of 3D glowing pigments works their magic, creating the illusion of plump, luscious lips that radiate from within. If you're seeking the perfect combination of hydration and enduring matte elegance with a soft, cashmere finish, this lipstick is your ideal companion.",
        stock:10,
        comment:[
            {
            id:0,
            customer: "Sarah",
            rating: 5,
            date: "Oct 30, 2023",
            review: "I'm absolutely in love with this lipstick! The color payoff is amazing, and it lasts all day. Highly recommend!"
            },{
                id: 1,
                customer: "Emma",
                rating: 4,
                date: "Oct 26, 2023",
                review: "I really enjoy using this lipstick. It's quite long-lasting, and the matte finish feels comfortable on my lips."
              }
              ,
              {
                id: 2,
                customer: "Grace",
                rating: 5,
                date: "Oct 23, 2023",
                review: "This lipstick exceeded my expectations! Not only is it long-lasting, but it also makes my lips look fuller and more radiant."
              }
              ,
              {
                id: 3,
                customer: "Sophie",
                rating: 4,
                date: "Oct 20, 2023",
                review: "I love the square, angled tip of this lipstick; it makes application so easy. The matte finish is great, but I wish it lasted a bit longer."
              }
              
        ]
},{
    id: 2,
    img:["/product/3/1.jpg","/product/3/2.jpg","/product/3/3.jpg","/product/3/4.jpg","/product/3/5.jpg"],
    name: "L.A Girl HD Pro Conceal - Buff",
    price: 2850,
    category: ["skin"],
    sale: true,
    star: 4,
    des: "Achieve flawless, radiant skin with NARS Radiant Creamy Concealer. This highly acclaimed concealer provides buildable coverage, effectively hiding imperfections, dark circles, and blemishes while leaving your skin looking natural and luminous. Its long-lasting formula ensures that your complexion stays flawless all day long. Perfect for all skin types, this concealer is a makeup must-have.",
    stock: 20,
    comment: [
      {
        id: 0,
        customer: "Ella",
        rating: 5,
        date: "Oct 26, 2023",
        review: "This concealer is a game-changer! It covers everything effortlessly and stays put all day. I love it!"
      },
      {
        id: 1,
        customer: "Liam",
        rating: 4,
        date: "Oct 20, 2023",
        review: "Great concealer, but the shade range could be improved. It blends well and provides good coverage."
      }
    ]
}
]
const page = () => {
    const params=useParams();
    const shuffleArray=(array:any)=>{
        return array
        .map((value:any)=>({value,sort:Math.random()}))
        .sort((a:any,b:any)=>a.sort-b.sort)
        .map(({value}:any)=>value);    
    }
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
    let similarBlog = Data.filter((item) => item.id !== blogData.id);
    similarBlog=shuffleArray(similarBlog)
    similarBlog.splice(2);
    
  return (
    <div className='pt-8 select-none'>
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
                        <Share url={window.location.href} title={blogData.title}/>
                    </div>
                    <div className='text-[#161616] space-y-6'>
                        <h2 className='text-3xl font-semibold'>{blogData?.title}</h2>
                    </div>
                    <div className='text-gray-500 text-[18px]'>
                        <div dangerouslySetInnerHTML={{ __html: htmlBody.innerHTML }} />
                    </div>
                    <div className='hidden md:block'>
                        <h2 id="comment">Comments :</h2>
                        <div className="w-3/4 h-[2px] bg-gray-400" />
                        <div>
                            {blogData.comments.map((com)=><Comment key={com.id} name={com.name} date={com.date} comment={com.comment} rating={6}/>)}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-4'>
                    <img className='w-full ' src={blogData?.img}  alt={blogData?.title}/>
                    <div className="w-3/4 h-[2px] bg-gray-400" />
                    <div className='flex justify-between'>
                        <p className='flex'>Author: <div className='text-accent'>{blogData?.author}</div></p>
                        <p className='flex'>Published On: <div className='text-accent'>{blogData?.date}</div></p>
                    </div>
                    <div className="w-1/2 h-[2px] bg-gray-400" />
                    <div>
                        <h2>Recommended Products</h2>
                        <div className='grid gap-6 md:grid-cols-2'>
                            {recommendedProducts.map((item:any)=><ProductCard key={item.id} id={item.id} img={item.img[0]} name={item.name} price={item.price} star={item.star} sale={item.sale}/>)}
                        </div>
                    </div>
                    <div className="w-1/2 h-[2px] bg-gray-400" />
                    <div>
                        <h2>Similar Blogs :</h2>
                        <div className=' flex flex-col '>
                            {similarBlog.map((item)=><SimilarBlogCard key={item.id} id={item.id} author={item.author} img={item.img} title={item.title} date={item.date} comments={item.comments} />)}
                        </div>
                    </div>
                    <div className='md:hidden'>
                        <h2 id="comment">Comments :</h2>
                        <div className="w-3/4 h-[2px] bg-gray-400" />
                        <div>
                            {blogData.comments.map((com)=><Comment key={com.id} name={com.name} date={com.date} comment={com.comment} rating={6}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
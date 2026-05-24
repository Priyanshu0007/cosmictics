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

interface comments {
    id: number
    name: string;
    date: string;
    comment: string;
}

interface IBlog {
    id: number;
    img: string;
    title: string;
    author: string;
    blog_content_html: string;
    date: string;
    comments: comments[];
}

const recommendedProducts = [
    {
        id: 1,
        img: ["/product/2/1.jpg", "/product/2/2.jpg", "/product/2/3.jpg", "/product/2/4.jpg"],
        name: "Charlotte Tilbury Matte Revolution - Pillow Talk Medium",
        price: 3150,
        category: ["lipsticks"],
        sale: false,
        star: 4,
        des: "Experience the magic of achieving luminous, cashmere-soft lips with a single swipe of our lipstick...",
        stock: 10,
        comment: []
    },
    {
        id: 2,
        img: ["/product/3/1.jpg", "/product/3/2.jpg", "/product/3/3.jpg", "/product/3/4.jpg", "/product/3/5.jpg"],
        name: "L.A Girl HD Pro Conceal - Buff",
        price: 2850,
        category: ["skin"],
        sale: true,
        star: 4,
        des: "Achieve flawless, radiant skin with NARS Radiant Creamy Concealer...",
        stock: 20,
        comment: []
    }
]

const BlogPage = () => {
    const params = useParams();
    const shuffleArray = (array: any) => {
        return array
            .map((value: any) => ({ value, sort: Math.random() }))
            .sort((a: any, b: any) => a.sort - b.sort)
            .map(({ value }: any) => value);
    }

    const [blogData, setBlogData] = useState<IBlog>({
        id: 0,
        img: "",
        title: "",
        author: "",
        blog_content_html: "",
        date: "",
        comments: [],
    })
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        const id = params.id;
        const getBlogData = Data.filter((item) => item.id.toString() === id)[0];
        if (getBlogData) {
            setBlogData(getBlogData);
        }
        setShareUrl(window.location.href);
    }, [params.id])

    const similarBlog = React.useMemo(() => {
        let list = Data.filter((item) => item.id !== blogData.id);
        list = shuffleArray(list);
        return list.slice(0, 2);
    }, [blogData.id]);

    return (
        <div className='pt-4 select-none min-h-screen bg-obsidian text-gray-200 pb-20'>
            {/* Breadcrumb section */}
            <div className='bg-obsidian-light/40 border-y border-white/5 py-4 mb-8'>
                <div className='container flex gap-3 items-center text-sm text-gray-400'>
                    <Link href="/" className='cursor-pointer hover:text-accent transition-colors duration-200'>Home</Link>
                    <span className='text-gray-600'>/</span>
                    <p className='capitalize hover:text-accent-teal transition-colors duration-200 cursor-pointer'>Blog</p>
                    <span className='text-gray-600'>/</span>
                    <p className='text-white truncate max-w-[200px] sm:max-w-none'>{blogData?.title}</p>
                </div>
            </div>

            <div className='container'>
                <div className='grid lg:grid-cols-3 gap-12 lg:gap-16'>
                    {/* Left Column: Blog Content */}
                    <div className='lg:col-span-2 space-y-6'>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='flex items-center text-accent'>
                                <p onClick={() => scrollToSection("comment")} className='text-gray-400 text-xs hover:text-accent cursor-pointer transition-colors duration-200'>
                                    ({blogData.comments.length} {`Comment${blogData.comments.length > 1 ? 's' : ''}`})
                                </p>
                            </div>
                            <div className='glass-card p-2 rounded-full border border-white/5 hover:border-accent/40 transition-colors duration-300'>
                                <Share url={shareUrl} title={blogData.title} />
                            </div>
                        </div>

                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold font-serif text-white tracking-wide leading-tight'>
                            {blogData?.title}
                        </h1>

                        {/* Author and Date Meta */}
                        <div className='flex flex-wrap gap-4 text-xs uppercase tracking-wider text-gray-500 border-y border-white/5 py-4'>
                            <div>Author: <span className='text-accent font-medium'>{blogData?.author}</span></div>
                            <div className='hidden sm:block text-gray-700'>|</div>
                            <div>Published On: <span className='text-accent-teal font-medium'>{blogData?.date}</span></div>
                        </div>

                        {/* Featured Image */}
                        {blogData?.img && (
                            <div className="w-full rounded-2xl overflow-hidden glass-card border border-white/5">
                                <img className='w-full h-auto object-cover max-h-[50vh] hover:scale-[1.01] transition-transform duration-500' src={blogData.img} alt={blogData?.title} />
                            </div>
                        )}

                        {/* Article body */}
                        <div className='prose prose-invert max-w-none text-gray-300 font-light leading-relaxed text-[16px] space-y-4 pt-4'>
                            <div dangerouslySetInnerHTML={{ __html: blogData.blog_content_html }} />
                        </div>

                        {/* Comments Section */}
                        <div className='mt-16 space-y-6' id="comment">
                            <div className='border-l-4 border-accent pl-4'>
                                <h2 className='text-2xl font-semibold font-serif text-white tracking-wide'>Discussion</h2>
                                <p className='text-xs text-gray-400 mt-1 uppercase tracking-wider'>Thoughts from the community</p>
                            </div>
                            <div className='grid gap-6 pt-4'>
                                {blogData.comments.length > 0 ? (
                                    blogData.comments.map((com) => (
                                        <div key={com.id} className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                                            <Comment name={com.name} date={com.date} comment={com.comment} rating={5} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No comments yet. Join the conversation!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className='flex flex-col space-y-10'>
                        {/* Recommended Products */}
                        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                            <div className='border-l-4 border-accent-teal pl-4'>
                                <h3 className='text-lg font-semibold font-serif text-white tracking-wide'>Recommended Items</h3>
                                <p className='text-[10px] text-gray-400 uppercase tracking-wider'>Curated cosmetics picks</p>
                            </div>
                            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-1'>
                                {recommendedProducts.map((item: any) => (
                                    <ProductCard key={item.id} id={item.id} img={item.img[0]} name={item.name} price={item.price} star={item.star} sale={item.sale} />
                                ))}
                            </div>
                        </div>

                        {/* Similar Blogs */}
                        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                            <div className='border-l-4 border-accent pl-4'>
                                <h3 className='text-lg font-semibold font-serif text-white tracking-wide'>Related Reading</h3>
                                <p className='text-[10px] text-gray-400 uppercase tracking-wider'>More beauty secrets</p>
                            </div>
                            <div className='flex flex-col gap-6'>
                                {similarBlog.map((item) => (
                                    <div key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <SimilarBlogCard id={item.id} author={item.author} img={item.img} title={item.title} date={item.date} comments={item.comments} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPage;
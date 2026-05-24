import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface commentw {
  name: string;
  comment: string;
}

interface propsType {
    id: number;
    img: string;
    title: string;
    date: string;
    comments: commentw[];
}

const BlogCard = ({ id, img, title, date, comments }: propsType) => {  
  const router = useRouter();
  
  return (
    <div 
        className='glass-card group cursor-pointer rounded-2xl p-4 border border-white/5 hover:border-accent/40 shadow-lg shadow-black/30 hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between' 
        onClick={() => router.push(`/blog/${id}`)}
    >
        <div className='relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-light/50 mb-4'>
            <Image 
                height={400} 
                width={500} 
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                src={img} 
                alt={title}
            />
            {/* Dark tint overlay on hover */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="space-y-2">
            <div className='text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5'>
                <span>{date}</span>
                <span className='text-white/20'>•</span>
                <span className='text-accent-teal'>{comments.length} {`Comment${comments.length !== 1 ? 's' : ''}`}</span>
            </div>
            <h3 className='font-serif font-semibold text-lg text-white group-hover:text-accent tracking-wide leading-snug line-clamp-2 transition-colors duration-200'>
                {title}
            </h3>
        </div>
    </div>
  )
}

export default BlogCard
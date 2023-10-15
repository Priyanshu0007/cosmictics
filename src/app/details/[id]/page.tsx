"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Data from "@/utils/productData"
import Link from 'next/link';
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';

import {MdCompareArrows} from 'react-icons/md'
import Comment from '@/components/Comment';
import { scrollToSection } from '@/utils/helper';
import Share from '@/components/Share';
import ImageSlideShow from '@/components/ImageSlideShow';
import ProductCard from '@/components/ProductCard';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/fetaures/cartSlice';
import { addToFav } from '@/redux/fetaures/favSlice';
interface comment{
    id:number;
    customer:string;
    rating:number;
    date:string;
    review:string;
}
interface IProduct{
    id:number;
    img:string[];
    name:string;
    price:number;
    category:string[];
    star:number;
    des:string;
    sale:boolean|undefined;
    stock:number;
    comment:comment[];
}
const DetailPage = () => {
    const params=useParams();
    const [productData,setProductData]=useState<IProduct>({
        id:0,
        img:[],
        name:"",
        price:0,
        category:[],
        star:0,
        sale:false,
        des:"",
        stock:0,
        comment:[],
    })
    useEffect(()=>{
        const id=params.id;
        const getProductData=Data.filter((item)=>item.id.toString()===id)[0];
        setProductData(getProductData);
    })
    const getRating=()=>{
        switch (productData.star) {
            case 0:
                return(<div className='flex justify-center text-accent '><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 1:
                return(<div className='flex justify-center text-accent '><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 2:
                return(<div className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 3:
                return(<div className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 4:
                return(<div className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></div>)
            case 5:
                return(<div className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>)
            default:
                return <div></div>
        }
    }
    const dispatch=useAppDispatch();
    const addProductToFav=(e:React.FormEvent)=>{
        e.stopPropagation();
        const payload={id:productData.id,name:productData.name,img:productData.img[0],price:productData.price};
        dispatch(addToFav(payload));
    }
    const addProductTocart=(e:React.FormEvent)=>{
        e.stopPropagation();
        const payload={id:productData.id,name:productData.name,img:productData.img[0],price:productData.price,quantity:1}
        dispatch(addToCart(payload));
    }
    const similarProducts = Data.filter((item) => item.id !== productData.id).filter((item)=>item.category[0]===productData.category[0]);
    similarProducts.splice(2);
    
  return (
    <div className='pt-8 '>
        <div className='bg-gray-100 py-4'>
            <div className='container flex gap-4 items-center text-gray-500'>
                <Link href="/" className='cursor-pointer hover:text-accent'>Home</Link>
                <div className='w-[30px] g-[2px] bg-gray-400'></div>
                <p className='capitalize'>{productData?.category[0]}</p>
                <div className='w-[30px] g-[2px] bg-gray-400'></div>
                <p>{productData?.name}</p>
            </div>
        </div>
        <div className='container pt-8'>
            <div className='grid md:grid-cols-2 gap-16'>
                <div className='w-screen-2 overflow-y-hidden h-fit sm:w-full overflow-x-hidden'>
                    <ImageSlideShow img={productData?.img}/>
                </div>
                <div className='space-y-4'>
                <div className='flex space-between justify-between'>
                        <div className='flex flex-col lg:flex-row justify-around items-center text-accent'>
                            {getRating()}
                            <p onClick={()=>scrollToSection("comment")} className='text-gray-400 text-[13px] ml-2 hover:text-accent cursor-pointer'>({productData.comment.length} customer review)</p>
                        </div>
                        <Share url={window.location.href} title={productData.name}/>
                </div>
                    <div className='text-[#161616] space-y-6'>
                        <h2 className='text-3xl font-semibold'>{productData?.name}</h2>
                        <p className='text-xl'>₹{productData?.price}</p>
                    </div>
                    <p className='text-gray-500 text-[14px]'>
                        {productData.des}
                    </p>
                    <p className='text-gray-500 text-[14px]'>{productData.stock} in stock</p>
                    <button onClick={addProductTocart} className='uppercase bg-accent py-4 px-4 rounded-lg text-white flex gap-2 items-center hover:bg-black'>
                        <AiOutlineShoppingCart className="text-[24px]"/>Add to cart
                    </button>   
                    <div className='flex gap-4 items-center uppercase py-4 text-[14px]'>
                        <div className='flex gap-1 items-center cursor-pointer' onClick={addProductToFav}>
                            <AiOutlineHeart/>Add to favourite
                        </div>
                        <div className='flex gap-1 items-center cursor-pointer'>
                            <MdCompareArrows/>Compare
                        </div>
                    </div>
                    
                    <div className="w-[30px] h-[2px] bg-gray-400" />
                    <div>Name: {productData?.name}</div>
                    <div className="capitalize" >Category: {productData?.category[0]}</div>
                    <div className="flex gap-1 items-center capitalize">
                    Tags: {" "}
                    {productData?.category.map((item:any) => (
                        <div key={item}>{item}</div>))}
                    </div>
                    <div className="w-[30px] h-[2px] bg-gray-400" />
                    <h2 id='comment'>Similar Products :</h2>
                    <div className="w-3/4 h-[2px] bg-gray-400" />
                    <div className='grid gap-6 md:grid-cols-2'>
                        {similarProducts.map((item:IProduct)=><ProductCard key={item.id} id={item.id} img={item.img[0]} name={item.name} price={item.price} star={item.star} sale={item.sale}/>)}
                    </div>
                    <div className="w-[30px] h-[2px] bg-gray-400" />
                    <h2 id='comment'>Comments :</h2>
                    <div className="w-3/4 h-[2px] bg-gray-400" />
                    {productData.comment.map((com)=><Comment key={com.id} name={com.customer} date={com.date} comment={com.review} rating={com.rating}/>)}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default DetailPage;
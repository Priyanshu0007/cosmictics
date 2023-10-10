"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Data from "@/utils/productData"
import Link from 'next/link';
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import {FaFacebookSquare, FaInstagram, FaTwitter,FaCopy} from "react-icons/fa"
import {MdCompareArrows} from 'react-icons/md'
interface comment{
    id:number;
    customer:string;
    rating:number;
    review:string;
}
interface IProduct{
    id:number;
    img:string;
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
        img:"",
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
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 1:
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 2:
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 3:
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/></div>)
            case 4:
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></div>)
            case 5:
                return(<div className='flex justify-center text-accent pt-4 pb-2'><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>)
            default:
                return <div></div>
        }
    }
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
                <div>
                    <img className='w-full h-full' src={productData?.img}  alt={productData?.name}/>
                </div>
                <div className='space-y-4'>
                    <div className='flex items-center text-accent'>
                        {getRating()}
                        <p className='text-gray-400 text-[14px] ml-2 hover:text-accent cursor-pointer'>({productData.comment.length} customer review)</p>
                    </div>
                    <div className='text-[#161616] space-y-6'>
                        <h2 className='text-3xl font-semibold'>{productData?.name}</h2>
                        <p className='text-xl'>₹{productData?.price}</p>
                    </div>
                    <p className='text-gray-500 text-[14px]'>
                        {productData.des}
                    </p>
                    <p className='text-gray-500 text-[14px]'>{productData.stock} in stock</p>
                    <button className='uppercase bg-accent py-4 px-4 rounded-lg text-white flex gap-2 items-center hover:bg-black'>
                        <AiOutlineShoppingCart className="text-[24px]"/>Add to cart
                    </button>   
                    <div className='flex gap-4 items-center uppercase py-4 text-[14px]'>
                        <div className='flex gap-1 items-center'>
                            <AiOutlineHeart/>Add to wishlist
                        </div>
                        <div className='flex gap-1 items-center'>
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
                    <div className="flex gap-1 items-center pt-4">
                        SHARE: {" "}
                        <div className="flex gap-4 items-center text-[28px]">
                            <FaCopy/> <FaFacebookSquare/> < FaTwitter/> < FaInstagram/>
                        </div>
                    <div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default DetailPage;
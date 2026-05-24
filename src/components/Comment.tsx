import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface ICom{
    name:string;
    date:string;
    comment:string;
    rating:number;
}
const getRating=(innn:number)=>{
    switch (innn) {
        case 0:
            return(<span className='flex justify-center text-accent '><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></span>)
        case 1:
            return(<span className='flex justify-center text-accent '><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></span>)
        case 2:
            return(<span className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></span>)
        case 3:
            return(<span className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/></span>)
        case 4:
            return(<span className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></span>)
        case 5:
            return(<span className='flex justify-center text-accent '><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></span>)
        default:
            return <span></span>
    }
}
const Comment = ({name,date,comment,rating}:ICom) => {
  return (
    <div className='mt-2'>
        <div className='flex justify-between mt-1'>
            <span className='text-gray-500'>{name}</span>
            <span>{getRating(rating)}</span>
            <span className='text-gray-500'>{date}</span>
        </div>
        <p>
            {comment}
        </p>
        <div className="w-3/4 h-[2px] bg-gray-400 mt-2" />
    </div>
  )
}

export default Comment
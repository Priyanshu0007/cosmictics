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
const Comment = ({name,date,comment,rating}:ICom) => {
  return (
    <div className='mt-2'>
        <div className='flex justify-between mt-1'>
            <p className='text-gray-500'>{name}</p>
            <p>{getRating(rating)}</p>
            <p className='text-gray-500'>{date}</p>
        </div>
        <div>
            <p>{comment}</p>
        </div>
        <div className="w-3/4 h-[2px] bg-gray-400 mt-2" />
    </div>
  )
}

export default Comment
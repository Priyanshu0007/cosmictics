import { useRouter } from 'next/navigation';
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface IProduct{
    name:string;
    rating:number;
    price:number;
    img:string;
    main:boolean;
    id:number;
}
const Compare = ({name,rating,price,img,main,id}:IProduct) => {
    const router=useRouter();
    const getRating=()=>{
        switch (rating) {
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
    const handle=()=>{
        if(main){return}
        router.push(`/details/${id}`);
    }
  return (
    <div className={`flex flex-col justify-around flex-1 ${main?"bg-yellow-100":"cursor-pointer hover:bg-slate-100"} `} onClick={handle}>
        <img src={img} className='w-full h-3/4'/>
        <p className='text-[16px] flex justify-around'>{name}</p>
        <p className='text-[16px] flex justify-around'>₹{price}</p>
        <p className='text-[16px] flex justify-around'>{getRating()}</p>
    </div>
  )
}

export default Compare
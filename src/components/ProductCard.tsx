import { addToCart } from '@/redux/fetaures/cartSlice';
import { addToFav } from '@/redux/fetaures/favSlice';
import { useAppDispatch } from '@/redux/hook';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import {AiOutlineHeart,AiOutlineShoppingCart,AiFillStar,AiOutlineStar} from "react-icons/ai"
interface IProduct{
    id:number;
    img:string;
    name:string;
    price:number;
    star:number;
    sale:boolean|undefined;
}
const ProductCard = ({id,img,name,price,star,sale}:IProduct) => {
    const router=useRouter();
    const dispatch=useAppDispatch();
    const addProductToFav=(e:React.FormEvent)=>{
        e.stopPropagation();
        const payload={id,name,img,price};
        dispatch(addToFav(payload));
    }
    const addProductTocart=(e:React.FormEvent)=>{
        e.stopPropagation();
        const payload={id,name,img,price,quantity:1}
        dispatch(addToCart(payload));
    }
    const getRating=()=>{
        //const randomNumber=(min:number,max:number)=>{return Math.ceil(Math.random()*(max-min)+min)};
        switch (star) {
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
    <div className='group cursor-pointer' onClick={()=>router.push(`/details/${id}`)}>
        <div className='relative'>
            <Image className="w-full h-[35vh]" width={1000} height={1142} src={img} alt={name}/>
            {sale && <div className='bg-green-600 inline-block absolute top-0 left-0 text-[14px] text-white rounded-md px-2 py-[2px] m-4'>New Arrival!</div>}
            <div className='absolute top-0 left-0 w-full h-full sm:bg-[#00000050] sm:opacity-0 sm:transition-opacity sm:duration-500 sm:group-hover:opacity-100 cursor-pointer'>
                <div className='absolute bottom-0 sm:mb-4 left-[50%] translate-x-[-50%] flex gap-64 sm:gap-2'>
                    <div className=' bg-gray-100 text-black w-[50px] h-[50px] text-[26px] grid place-items-center hover:text-accent' onClick={addProductToFav}><AiOutlineHeart/></div>
                    <div className=' bg-gray-100 text-black w-[50px] h-[50px] text-[26px] grid place-items-center hover:text-accent' onClick={addProductTocart}><AiOutlineShoppingCart/></div>
                </div>
            </div>
        </div>
        {getRating()}
        <h2 className='font-medium pb-3 hover:text-accent'>{name}</h2>
        <p className='text-gray-600 font-light'>₹{price}</p>
    </div>
  )
}

export default ProductCard
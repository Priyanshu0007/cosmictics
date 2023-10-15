import { useAppSelector } from '@/redux/hook'
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import FavProduct from './FavProduct';

const Fav = ({setFavFav}:any) => {
    const products=useAppSelector((state)=>state.favReducer);
    
  return (
    <div className='bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-40 overflow-y-scroll'>
        <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6'>
            <RxCross1 className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer" onClick={()=>setFavFav(false)}/>
            <h3 className='pt-6 text-lg font-mmedium text-gray-600 uppercase'>Your Favourite</h3>
            <div className='mt-6 space-y-2'>
                {products.length===0 && <p className='flex justify-center text-accent'>Opps! No Product In Favourite<br/>Add Some Products</p>}
                {products?.map((item:any)=>(
                    <FavProduct key={item.id} id={item.id} img={item.img} name={item.name} price={item.price}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Fav;
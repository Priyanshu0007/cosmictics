import { useAppSelector } from '@/redux/hook'
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import CartProduct from './CartProduct';

const Cart = ({setShowCart}:any) => {
    const products=useAppSelector((state)=>state.cartReducer);
    const getTotal=()=>{
        let total=0;
        products.forEach((item)=>(total=total+item.price*item.quantity));
        return total.toLocaleString("en-US");
    }
  return (
    <div className='bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-40 overflow-y-scroll'>
        <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6'>
            <RxCross1 className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer" onClick={()=>setShowCart(false)}/>
            <h3 className='pt-6 text-lg font-mmedium text-gray-600 uppercase'>Your Cart</h3>
            <div className='mt-6 space-y-2'>
                {getTotal()==="0" && <p className='flex justify-center text-accent'>Opps! No Product In Cart<br/>Add Some Products</p>}
                {products?.map((item:any)=>(
                    <CartProduct key={item.id} id={item.id} img={item.img} name={item.name} price={item.price} quantity={item.quantity}/>
                ))}
            </div>
            <div className='flex justify-between items-center font-medium text-xl py-4'>
                <p>Total:</p>
                <p>₹{getTotal()}</p>
            </div>
            {/* <button className=' bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4'>View Cart</button> */}
            <button onClick={()=>alert("Hello")} className={`bg-black text-white text-center w-full rounded-3xl py-2 mb-4 mt-4 ${getTotal()==="0"?"cursor-not-allowed bg-gray-400 pointer-events-none":"hover:bg-accent"}`}>CheckOut</button>
        </div>
    </div>
  )
}

export default Cart
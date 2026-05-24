import { useAppSelector } from '@/redux/hook'
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import CartProduct from './CartProduct';

const Cart = ({ setShowCart }: any) => {
    const products = useAppSelector((state) => state.cartReducer);
    
    const getTotal = () => {
        let total = 0;
        products.forEach((item) => (total = total + item.price * item.quantity));
        return total.toLocaleString("en-US");
    }

    const totalVal = getTotal();

    return (
        <div className='bg-black/70 backdrop-blur-sm w-full min-h-screen fixed inset-0 z-50 transition-opacity duration-300 flex justify-end'>
            {/* Drawer Container */}
            <div className='max-w-[420px] w-full min-h-full bg-obsidian-light border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-slide-left relative'>
                <div>
                    <button 
                        className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                        onClick={() => setShowCart(false)}
                    >
                        <RxCross1 className="text-xl" />
                    </button>
                    
                    <h3 className='pt-6 text-lg font-serif font-bold text-white uppercase tracking-wider border-b border-white/5 pb-4'>
                        Your Shopping Bag
                    </h3>
                    
                    <div className='mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2'>
                        {totalVal === "0" ? (
                            <div className='text-center py-10 space-y-2'>
                                <p className='text-accent font-serif italic text-base'>Oops! Your bag is empty.</p>
                                <p className='text-xs text-gray-500'>Add some premium cosmetics items to get started!</p>
                            </div>
                        ) : (
                            products?.map((item: any) => (
                                <div key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <CartProduct id={item.id} img={item.img} name={item.name} price={item.price} quantity={item.quantity} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className='space-y-4 border-t border-white/5 pt-6 bg-obsidian-light z-10'>
                    <div className='flex justify-between items-center font-medium text-lg text-white'>
                        <span>Subtotal:</span>
                        <span className='text-accent-teal font-bold text-xl'>₹{totalVal}</span>
                    </div>
                    
                    <button 
                        onClick={() => alert("Thank you for shopping! Proceeding to premium checkout.")} 
                        className={`w-full text-center uppercase tracking-widest font-semibold text-xs py-4 rounded-lg transition-all duration-300 ${
                            totalVal === "0" 
                                ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed pointer-events-none" 
                                : "bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 cursor-pointer hover:scale-[1.01]"
                        }`}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
import { useAppSelector } from '@/redux/hook'
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import FavProduct from './FavProduct';

const Fav = ({ setFavFav }: any) => {
    const products = useAppSelector((state) => state.favReducer);
    
    return (
        <div className='bg-black/70 backdrop-blur-sm w-full min-h-screen fixed inset-0 z-50 transition-opacity duration-300 flex justify-end'>
            {/* Drawer Container */}
            <div className='max-w-[420px] w-full min-h-full bg-obsidian-light border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-slide-left relative'>
                <div>
                    <button 
                        className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                        onClick={() => setFavFav(false)}
                    >
                        <RxCross1 className="text-xl" />
                    </button>
                    
                    <h3 className='pt-6 text-lg font-serif font-bold text-white uppercase tracking-wider border-b border-white/5 pb-4'>
                        Your Favorites
                    </h3>
                    
                    <div className='mt-6 space-y-4 max-h-[75vh] overflow-y-auto pr-2'>
                        {products.length === 0 ? (
                            <div className='text-center py-10 space-y-2'>
                                <p className='text-accent font-serif italic text-base'>Your favorites list is empty.</p>
                                <p className='text-xs text-gray-500'>Click the heart icon on any item to save it here!</p>
                            </div>
                        ) : (
                            products?.map((item: any) => (
                                <div key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <FavProduct id={item.id} img={item.img} name={item.name} price={item.price} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                <div className='text-center text-xs text-gray-500 pt-4 border-t border-white/5'>
                    Manage your items or add them directly to your bag.
                </div>
            </div>
        </div>
    )
}

export default Fav;
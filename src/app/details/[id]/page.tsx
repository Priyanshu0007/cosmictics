"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Data from "@/utils/productData"
import Link from 'next/link';
import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';

import {MdCompareArrows} from 'react-icons/md'
import Comment from '@/components/Comment';
import { scrollToSection } from '@/utils/helper';
import Share from '@/components/Share';
import ImageSlideShow from '@/components/ImageSlideShow';
import ProductCard from '@/components/ProductCard';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/fetaures/cartSlice';
import { addToFav } from '@/redux/fetaures/favSlice';
import { RxCross1 } from 'react-icons/rx';
import Compare from '@/components/Compare';

interface comment {
    id: number;
    customer: string;
    rating: number;
    date: string;
    review: string;
}

interface IProduct {
    id: number;
    img: string[];
    name: string;
    price: number;
    category: string[];
    star: number;
    des: string;
    sale: boolean | undefined;
    stock: number;
    comment: comment[];
}

const DetailPage = () => {
    const [fav, setFav] = useState(false);
    const [close, setClose] = useState(false);
    const params = useParams();
    const [productData, setProductData] = useState<IProduct>({
        id: 0,
        img: [],
        name: "",
        price: 0,
        category: [],
        star: 0,
        sale: false,
        des: "",
        stock: 0,
        comment: [],
    })
    const [shareUrl, setShareUrl] = useState("");
    
    useEffect(() => {
        const id = params.id;
        const getProductData = Data.filter((item) => item.id.toString() === id)[0];
        if (getProductData) {
            setProductData(getProductData);
        }
        setShareUrl(window.location.href);
    }, [params.id])

    const getRating = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < productData.star) {
                stars.push(<AiFillStar key={i} className="text-accent" />);
            } else {
                stars.push(<AiOutlineStar key={i} className="text-gray-600" />);
            }
        }
        return <div className='flex gap-1'>{stars}</div>;
    }

    const dispatch = useAppDispatch();
    
    const addProductToFav = (e: React.FormEvent) => {
        e.stopPropagation();
        const payload = { id: productData.id, name: productData.name, img: productData.img[0], price: productData.price };
        dispatch(addToFav(payload));
        setFav(!fav);
    }

    const addProductTocart = (e: React.FormEvent) => {
        e.stopPropagation();
        const payload = { id: productData.id, name: productData.name, img: productData.img[0], price: productData.price, quantity: 1 }
        dispatch(addToCart(payload));
    }

    const similarProducts = Data.filter((item) => item.id !== productData.id).filter((item) => item.category[0] === productData.category[0]);
    const slicedSimilar = similarProducts.slice(0, 2);

    return (
        <div className='pt-4 select-none min-h-screen bg-obsidian text-gray-200 pb-20'>
            {/* Breadcrumb Section */}
            <div className='bg-obsidian-light/40 border-y border-white/5 py-4 mb-8'>
                <div className='container flex gap-3 items-center text-sm text-gray-400'>
                    <Link href="/" className='cursor-pointer hover:text-accent transition-colors duration-200'>Home</Link>
                    <span className='text-gray-600'>/</span>
                    <p className='capitalize hover:text-accent-teal transition-colors duration-200 cursor-pointer'>{productData?.category[0]}</p>
                    <span className='text-gray-600'>/</span>
                    <p className='text-white truncate max-w-[200px] sm:max-w-none'>{productData?.name}</p>
                </div>
            </div>

            <div className='container'>
                <div className='grid md:grid-cols-2 gap-12 lg:gap-20'>
                    {/* Images Slideshow */}
                    <div className='w-full overflow-hidden rounded-2xl glass-card p-4 border border-white/5'>
                        <ImageSlideShow img={productData?.img} />
                    </div>

                    {/* Product Details Info */}
                    <div className='space-y-6'>
                        <div className='flex justify-between items-start gap-4'>
                            <div className='space-y-2'>
                                <h1 className='text-3xl lg:text-4xl font-semibold font-serif text-white tracking-wide'>{productData?.name}</h1>
                                <div className='flex items-center gap-3 pt-1'>
                                    {getRating()}
                                    <p onClick={() => scrollToSection("comment")} className='text-gray-400 text-xs hover:text-accent cursor-pointer transition-colors duration-200'>
                                        ({productData.comment.length} Reviews)
                                    </p>
                                </div>
                            </div>
                            <div className='glass-card p-2 rounded-full border border-white/5 hover:border-accent/40 transition-colors duration-300'>
                                <Share url={shareUrl} title={productData.name} />
                            </div>
                        </div>

                        <div className='flex items-baseline gap-4 pt-2'>
                            <p className='text-3xl font-bold text-accent-teal'>₹{productData?.price}</p>
                            {productData.sale && (
                                <span className='text-xs font-semibold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded'>
                                    Sale Active
                                </span>
                            )}
                        </div>

                        <p className='text-gray-400 text-[15px] leading-relaxed font-light'>
                            {productData.des}
                        </p>

                        <div className='flex items-center gap-2 text-sm text-gray-400'>
                            <span className={`w-2 h-2 rounded-full ${productData.stock > 5 ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                            <p>{productData.stock} items left in stock</p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-4 pt-4'>
                            <button onClick={addProductTocart} className='flex-1 sm:flex-initial uppercase font-semibold text-sm tracking-widest bg-accent hover:bg-accent/80 text-white py-4 px-8 rounded-lg flex justify-center gap-3 items-center transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-[1.02]'>
                                <AiOutlineShoppingCart className="text-xl" /> Add to cart
                            </button>

                            <button onClick={addProductToFav} className='glass-card hover:bg-white/5 text-gray-300 hover:text-accent p-4 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/5'>
                                {fav ? <AiFillHeart className="text-xl text-accent" /> : <AiOutlineHeart className="text-xl" />}
                            </button>

                            <button onClick={() => setClose(true)} className='glass-card hover:bg-white/5 text-gray-300 hover:text-accent-teal px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-white/5 text-sm uppercase tracking-wider font-medium'>
                                <MdCompareArrows className="text-lg" /> Compare
                            </button>
                        </div>

                        <div className="w-full h-[1px] bg-white/5 my-6" />

                        {/* Product Meta */}
                        <div className='space-y-2 text-xs uppercase tracking-wider text-gray-500'>
                            <p><span className='text-gray-400 font-medium'>Name:</span> <span className='text-gray-300'>{productData?.name}</span></p>
                            <p className='capitalize'><span className='text-gray-400 font-medium'>Category:</span> <span className='text-gray-300'>{productData?.category[0]}</span></p>
                            <div className="flex gap-2 items-center capitalize">
                                <span className='text-gray-400 font-medium'>Tags:</span>
                                <div className="flex gap-1.5">
                                    {productData?.category.map((item: any) => (
                                        <span key={item} className="bg-obsidian-light border border-white/5 px-2 py-0.5 rounded text-gray-400 hover:text-accent hover:border-accent/40 cursor-pointer transition-colors duration-200">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className='mt-20 space-y-6'>
                    <div className='border-l-4 border-accent pl-4'>
                        <h2 className='text-2xl font-semibold font-serif text-white tracking-wide'>Similar Products</h2>
                        <p className='text-xs text-gray-400 mt-1 uppercase tracking-wider'>Selected premium matches for you</p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4'>
                        {slicedSimilar.map((item: IProduct) => (
                            <ProductCard key={item.id} id={item.id} img={item.img[0]} name={item.name} price={item.price} star={item.star} sale={item.sale} />
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className='mt-20 space-y-6' id='comment'>
                    <div className='border-l-4 border-accent-teal pl-4'>
                        <h2 className='text-2xl font-semibold font-serif text-white tracking-wide'>Customer Reviews</h2>
                        <p className='text-xs text-gray-400 mt-1 uppercase tracking-wider'>What our community says about this item</p>
                    </div>
                    <div className='grid gap-6 pt-4'>
                        {productData.comment.length > 0 ? (
                            productData.comment.map((com) => (
                                <div key={com.id} className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                                    <Comment name={com.customer} date={com.date} comment={com.review} rating={com.rating} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No reviews yet for this product. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Modal Overlay */}
            {close && (
                <div className='z-50 fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300'>
                    <div className='relative w-full max-w-5xl glass-card rounded-2xl border border-white/10 p-8 space-y-6 overflow-y-auto max-h-[90vh] shadow-2xl shadow-black/50'>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h2 className="text-xl font-serif text-white tracking-wider">Compare Products</h2>
                            <button onClick={() => setClose(false)} className='bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer'>
                                <RxCross1 className="text-sm" />
                            </button>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2'>
                            <Compare name={productData.name} img={productData.img[0]} rating={productData.star} price={productData.price} id={productData.id} main={true} />
                            {slicedSimilar[0] && (
                                <Compare name={slicedSimilar[0].name} img={slicedSimilar[0].img[0]} rating={slicedSimilar[0].star} price={slicedSimilar[0].price} id={slicedSimilar[0].id} main={false} />
                            )}
                            {slicedSimilar[1] && (
                                <Compare name={slicedSimilar[1].name} img={slicedSimilar[1].img[0]} rating={slicedSimilar[1].star} price={slicedSimilar[1].price} id={slicedSimilar[1].id} main={false} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailPage;
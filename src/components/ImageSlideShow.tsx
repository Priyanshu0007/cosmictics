import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { AiOutlineArrowLeft,AiOutlineArrowRight } from 'react-icons/ai'
import Image from 'next/image';
interface Img{
    img:string[];
}
const ImageSlideShow = ({img}:Img) => {
    const fadeInProperties = {
		scale: 1,
		duration: 1850,
		transitionDuration: 500,
		infinite: true,
		prevArrow: (
			<div className="top-1/2 md:top-72">
				<AiOutlineArrowLeft className="h-12 w-12 rounded-full text-white opacity-60 bg-black cursor-pointer" />
			</div>
		),
		nextArrow: (
			<div className="top-1/2 md:top-72">
				<AiOutlineArrowRight className="h-12 w-12 rounded-full text-white opacity-60 bg-black cursor-pointer" />
			</div>
		),
	};
    return (
      <div>
        <Fade {...fadeInProperties}>
          {img.map((fadeImage, index) => (
            <div key={index} className="flex justify-center md:items-center items-start relative">
				<Image className='w-[100%] h-auto object-contain'  src={fadeImage} alt='Hero' width={1500} height={900}/>
			</div>
          ))}
        </Fade>
      </div>
    )
  }
export default ImageSlideShow
  
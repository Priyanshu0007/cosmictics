import React from "react";

import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { AiOutlineArrowLeft,AiOutlineArrowRight } from 'react-icons/ai'
import Image from "next/image";

const Slideshow = () => {
	const images = ["/hero/1.jpg","/hero/2.jpg","/hero/3.jpg","/hero/4.jpg","/hero/5.jpg","/hero/6.jpg",];
	const zoomInProperties = {
		scale: 1,
		duration: 1700,
		transitionDuration: 400,
		infinite: true,
		prevArrow: (
			<div className="top-full md:top-72">
				<AiOutlineArrowLeft className="h-8 w-8 rounded-full sm:h-12 sm:w-12 text-white opacity-60 bg-black cursor-pointer" />
			</div>
		),
		nextArrow: (
				<div className="top-full md:top-72">
				   <AiOutlineArrowRight className="h-8 w-8 rounded-full sm:h-12 sm:w-12 text-white opacity-60 bg-black cursor-pointer" />
			    </div>
		),
	};
	return (
		<div>
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex justify-center md:items-center items-start relative">
                        <Image className='w-screen h-auto object-contain'  src={each} alt='Hero' width={1500} height={900}/>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;
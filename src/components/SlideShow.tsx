import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { AiOutlineArrowLeft,AiOutlineArrowRight } from 'react-icons/ai'
import Image from "next/image";

const Slideshow = () => {
	//Array of Images
	const images = [
		"/hero/1.jpg",
		"/hero/2.jpg",
		"/hero/3.jpg",
		"/hero/4.jpg",
		"/hero/5.jpg",
        "/hero/6.jpg",
	];

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		scale: 1,
		duration: 2000,
		transitionDuration: 300,
		infinite: true,
		prevArrow: (
			<div className="ml-10 top-40 md:top-72">
				<AiOutlineArrowLeft className="h-8 w-8 text-white cursor-pointer" />
			</div>
		),
		nextArrow: (
				<div className="mr-10 top-40 md:top-72">
				   <AiOutlineArrowRight className="h-8 w-8 text-white cursor-pointer" />
			    </div>
		),
	};
	return (
		<div>
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex justify-center md:items-center items-start relative">
                        <Image className='w-[100%] h-auto object-contain'  src={each} alt='Hero' width={1500} height={900}/>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;
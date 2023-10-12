import React from 'react'
import {FaFacebookSquare, FaInstagram, FaWhatsappSquare} from "react-icons/fa"
import {FacebookShareButton,InstapaperShareButton,WhatsappShareButton} from "react-share"
interface typeU{
    url:string;
    title:string
}
const Share = ({url,title}:typeU) => {
    // const copy=()=> {
    //     const el = document.createElement('input');
    //     el.value = url;
    //     document.body.appendChild(el);
    //     el.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(el);
    //   }
      
    
  return (
    <div className="flex gap-1 items-center ">
        Share: {" "}
        <div className="flex gap-4 items-center text-[28px] sm:text-[20px]">
            {/* <FaCopy onClick={copy}/>  */}
            <FacebookShareButton url={url} quote={`Checkout ${title}`} hashtag="#muo">
                <FaFacebookSquare/>
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={`Checkout ${title}`} separator={"#muo"}>
                < FaWhatsappSquare/> 
            </WhatsappShareButton>
            <InstapaperShareButton url={url} title={`Checkout ${title}`} description={"#muo"}>
                < FaInstagram/>
            </InstapaperShareButton>
        </div>
    </div>
  )
}

export default Share
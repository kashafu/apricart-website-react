import React from "react";
import Image from "next/image"
import Link from "next/link"  
import Cookies from "universal-cookie"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/cart.slice"
import { addToWish } from "../redux/wish.slice"
import heartimg from "../public/assets/images/heart.png"
import missingImageIcon from "../public/assets/images/missingImage.png"
import minusIcon from "../public/assets/svgs/minusIcon.svg"
import plusIcon from "../public/assets/svgs/plusIcon.svg"
import wishlistIcon from "../public/assets/svgs/wishlistIcon.svg"
import addToCartIcon from "../public/assets/svgs/addToCartIcon.svg"

import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { useState } from "react"
import { toast } from "react-toastify"
import toKebabCase from "../helpers/toKebabCase"

export default function Bannershimmer(){
    const [showAddToCart, setShowAddToCart] = useState(false)

	let divStyle = showAddToCart
		? "drop-shadow-xl z-10"
		: "border-r-2 border-b-2"
    return(
        <>
        {/**/}
       <div className="animate-pulse flex flex-row mx-2 h-[600px] p-4 bg-slate-100 ">
                   <div className="animate-pulse  w-3/5 h-3/4 my-[100px]  bg-cyan-200"></div>
                  
                   <div className="flex flex-col h-full w-2/5 justify-center items-center">
                    <div className="animate-pulse w-4/5 h-1/3 my-2 bg-cyan-50"></div>
                    <div  className="animate-pulse w-4/5 h-1/3 my-2 bg-cyan-50"></div>
                   </div>
                    
                   </div> 
                    
       </> 
    )
}
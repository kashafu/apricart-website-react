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

export default function Categoriesshimmer(){
    const [showAddToCart, setShowAddToCart] = useState(false)

	let divStyle = showAddToCart
		? "drop-shadow-xl z-10"
		: "border-r-2 border-b-2"
    return(
        <>
        
       
                    <div className={"animate-pulse h-[600px] rounded-lg w-1/5 " +
					[divStyle] }>
                      <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    <div className="animate-pulse h-[50px] p-2 my-2 bg-blue-50"></div>
                    
                    
                    

                    
                    </div>
        </>
    )
}
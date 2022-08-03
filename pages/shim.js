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

export default function SingleProductshimmer(){
    const [showAddToCart, setShowAddToCart] = useState(false)

	let divStyle = showAddToCart
		? "drop-shadow-xl z-10"
		: "border-r-2 border-b-2"
    return(
        <>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 sm:grid-rows-2 w-full">
       
 <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>
                    <div className={"animate-pulse h-[400px] m-2 rounded-lg w-full " +
					[divStyle] }>
                        <div className="animate-pulse w-full h-2/3 bg-slate-50 rounded-lg">

                        </div>
                        <div className="animate-pulse w-full my-2 h-[30px] rounded-lg bg-slate-50">

</div>
<div className="animate-pulse w-3/5 my-2 h-[30px] rounded-lg bg-slate-50">

</div>
                        <div className="animate-pulse w-3/5 my-1 h-[40px] rounded-lg bg-slate-50">

                        </div>

                        


                  


                  
                    </div>

<br/>



                 


      
                    





                    </div>
        </>
    )
}
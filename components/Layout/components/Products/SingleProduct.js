import Image from "next/image"
import Link from "next/link"
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";

import { base_url_api } from '../../../../information.json'

export default function SingleProduct({product}){
    const cookies = new Cookies();
    const dispatch = useDispatch();

    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku, inStock } = product
    let imageUrl = productImageUrlThumbnail == '' ? productImageUrl : productImageUrlThumbnail
    let isLoggedIn = cookies.get('cookies-token') != null 

    const addToCartHandler = async () => {
        dispatch(addToCart(product))

        let city = cookies.get('cities')
        if(isLoggedIn){
            let data = {
                cart: [{
                        'sku': sku,
                        'qty': "1",
                }]
            }

            let url = base_url_api + "/order/cart/save?city=" + city + "&lang=en&client_type=apricart"
            console.log(url)
            let response = await axios.post(
                url,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.get('cookies-token'),
                    },
                }
            )
        }
        else{
            let data = {
                userId: cookies.get('guestUserId'),
                cart: [{
                        'sku': sku,
                        'qty': "1",
                }]
            }

            let url = base_url_api + "/guest/cart/save?city=" + city + "&lang=en&client_type=apricart"
            console.log(url)
            let response = await axios.post(
                url,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        }
    }

    return(
        <div className="flex flex-col p-2 border-2 bg-white w-full h-full rounded-2xl">
            <div className="flex flex-col items-center justify-between w-full h-full space-y-2">
                <div className="flex flex-col items-center">
                    <Link href="/details/[id]"
                        as={
                            "/details/" + sku
                        } 
                        passHref
                    >
                        <button className="relative w-[120px] h-[120px]">
                            <Image
                                src={imageUrl}
                                layout={'fill'}
                                />
                        </button>
                    </Link>
                    <p className="font-lato font-bold text-left text-xs text-main-blue">
                        {title}
                    </p>
                </div>
                <div className="flex flex-col items-center w-full space-y-4">
                    <p className="font-lato text-sm text-left">
                        Rs. <span className="text-main-blue font-bold"> {currentPrice} </span>
                    </p>
                    {inStock ? 
                        <button className="bg-main-blue font-lato text-sm py-2 w-5/6 rounded text-white hover:bg-white hover:text-main-blue"
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                        :
                        <button className="bg-zinc-400 font-lato text-sm py-2 w-5/6 rounded text-white"
                            disabled={true}
                        >
                            Out of Stock
                        </button>
                    }
                    
                </div>
            </div>
        </div>
    )
}
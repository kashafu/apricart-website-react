import Image from "next/image"
import Link from "next/link"
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";
import heartimg from "../../../../public/assets/images/heart.png";

import { base_url_api } from '../../../../information.json'
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";

/*
    isInStock is being passed where static site generation is being used
    to keep stock of item uptodate always
*/
export default function SingleProduct({ product, isInStock }) {
    const cookies = new Cookies();
    var token = cookies.get("cookies-token;")
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const wish = useSelector((state) => state.wish);
    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku, inStock } = product
    if (isInStock) {
        inStock = isInStock
    }
    let imageUrl = productImageUrlThumbnail == '' ? productImageUrl : productImageUrlThumbnail
    let isLoggedIn = cookies.get('cookies-token') != null

    const addToCartApi = async () => {
        dispatch(addToCart(product))

        let { city, userId, headers } = getGeneralApiParams()

        if (isLoggedIn) {
            let data = {
                cart: [{
                    'sku': sku,
                    'qty': "1",
                }]
            }

            let url = base_url_api + "/order/cart/save?city=" + city + "&lang=en&client_type=apricart"
            let response = await axios.post(
                url,
                data,
                {
                    headers: headers,
                }
            )
        }
        else {
            let data = {
                userId: userId,
                cart: [{
                    'sku': sku,
                    'qty': "1",
                }]
            }

            let url = base_url_api + "/guest/cart/save?city=" + city + "&lang=en&client_type=apricart"
            let response = await axios.post(
                url,
                data,
                {
                    headers: headers
                }
            )
        }
    }

    const addToWishlistApi = async () => {
        let { token, headers } = getGeneralApiParams()
        let body = { sku: [product.sku] }
        if (token) {
            let url = base_url_api + '/watchlist/save?city=karachi&lang=en'

            try {
                let response = await axios.post(url, body,
                    {
                        headers: headers
                    }
                   
                )
           
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-between p-2 border-2 bg-white w-full h-[250px] rounded-2xl space-y-2">
            <div className="absolute top-1 right-1">
                <button onClick={() => {
                    addToWishlistApi();
                    dispatch(addToWish(product));
                
                }}>
                    <Image
                        src={heartimg}
                        width="20"
                        height="20"
                    />
                </button>
            </div>
            <div className=" flex flex-col items-center">

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
                <p className="font-lato font-bold text-left text-xs text-main-blue flex-1">
                    {title}
                </p>
            </div>
            <div className="flex flex-col items-center w-full space-y-4">
                <p className="font-lato text-sm text-left">
                    Rs. <span className="text-main-blue font-bold"> {currentPrice} </span>
                </p>
                {inStock ?
                    <button className="bg-main-blue font-lato text-sm py-2 w-5/6 rounded text-white hover:bg-white hover:text-main-blue"
                        onClick={addToCartApi}
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
    )
}
import Image from "next/image"
import Link from "next/link"
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";
import heartimg from "../../../../public/assets/images/heart.png";
import missingImageIcon from '../../../../public/assets/images/missingImage.png'
import minusIcon from '../../../../public/assets/svgs/minusIcon.svg'
import plusIcon from '../../../../public/assets/svgs/plusIcon.svg'
import wishlistIcon from '../../../../public/assets/svgs/wishlistIcon.svg'
import addToCartIcon from '../../../../public/assets/svgs/addToCartIcon.svg'

import { base_url_api } from '../../../../information.json'
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { useState } from "react";
import { toast } from "react-toastify";

/*
    isInStock is being passed where static site generation is being used
    to keep stock of item uptodate always
*/
export default function SingleProduct({ product, isInStock }) {
    const cookies = new Cookies();
    const dispatch = useDispatch();


    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku, inStock, minQty, maxQty } = product
    if (isInStock) {
        inStock = isInStock
    }
    let imageUrl = productImageUrlThumbnail != '' ? productImageUrlThumbnail : (productImageUrl != '' ? productImageUrl : missingImageIcon)
    let isLoggedIn = cookies.get('cookies-token') != null

    const [innerText, setInnerText] = useState('Add to Cart')
    const [qty, setQty] = useState(minQty)

    const setQtyHandler = (type) => {
        if (type == 'increment') {
            if (qty == maxQty) {
                return
            }
            setQty(qty + 1)
        }
        else if (type == 'decrement') {
            if (qty == minQty) {
                return
            }
            setQty(qty - 1)
        }
    }

    const addToCartApi = async () => {
        let { city, userId, headers } = getGeneralApiParams()

        if (isLoggedIn) {
            let data = {
                cart: [{
                    'sku': sku,
                    'qty': qty,
                }]
            }
            let url = base_url_api + "/order/cart/save?city=" + city + "&lang=en&client_type=apricart"

            try {
                let response = await axios.post(
                    url,
                    data,
                    {
                        headers: headers,
                    }
                )
                toast.success("Added to Cart")
                let cartData = {
                    ...product
                }
                cartData.qty = qty

                dispatch(addToCart(cartData))
            } catch (error) {
                console.log(error?.response)
                toast.error(error?.response?.data?.message)
            }
        }
        else {
            let data = {
                userId: userId,
                cart: [{
                    'sku': sku,
                    'qty': qty,
                }]
            }
            let url = base_url_api + "/guest/cart/save?city=" + city + "&lang=en&client_type=apricart"

            try {
                let response = await axios.post(
                    url,
                    data,
                    {
                        headers: headers
                    }
                )
                toast.success("Added to Cart")
                let cartData = {
                    ...product
                }
                cartData.qty = qty

                dispatch(addToCart(cartData))
            } catch (error) {
                console.log(error?.response)
                toast.error(error?.response?.data?.message)
            }
        }
    }

    const addToWishlistApi = async () => {
        let { token, headers } = getGeneralApiParams();
        //  dispatch(addToWish(product));
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
        <div className="grid grid-rows-10 bg-white rounded-t-full rounded-b-3xl h-[250px] lg:h-[350px] rounded-b-lg overflow-hidden border-main-yellow border-1 shadow">
            {/* IMAGE */}
            <div className="flex items-center justify-center row-span-6 w-full h-full">
                <Link href="/details/[id]"
                    as={
                        "/details/" + sku
                    }
                    passHref
                >
                    <a className="relative h-[100px] w-[100px] lg:h-[180px] lg:w-[180px]">
                        <Image
                            src={imageUrl}
                            layout={'fill'}
                        // width={100}
                        // height={100}
                        />
                    </a>
                </Link>
            </div>
            <div className="row-span-4 grid grid-rows-3 bg-main-blue p-2 lg:py-2 lg:px-4">
                {/* TITLE */}
                <p className="row-span-1 font-lato font-bold text-left text-xs lg:text-md text-white flex-1">
                    {title}
                </p>
                <div className="row-span-2 space-y-4">
                    {/* PRICE */}
                    <p className="text-lg lg:text-3xl text-left font-bold text-main-yellow">
                        Rs. {currentPrice}
                    </p>
                    <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                        {/* QUANTITY hidden on phone */}
                        {inStock && (
                            <div className="hidden lg:grid grid-cols-3 justify-items-center rounded overflow-hidden w-[50px] lg:w-full h-[40px]">
                                <button className="relative bg-white w-full"
                                    onClick={() => {
                                        setQtyHandler('decrement')
                                    }}
                                >
                                    <Image
                                        src={minusIcon}
                                        layout={'fill'}
                                    />
                                </button>
                                <div className="flex flex-col bg-main-yellow font-bold w-full text-main-blue text-2xl text-center">
                                    <p className="mt-auto mb-auto">
                                        {qty}
                                    </p>
                                </div>
                                <button className="relative bg-white w-full"
                                    onClick={() => {
                                        setQtyHandler('increment')
                                    }}
                                >
                                    <Image
                                        src={plusIcon}
                                        layout={'fill'}
                                    />
                                </button>
                            </div>
                        )}
                        <div className="relative flex flex-row items-center justify-around lg:justify-end space-x-2 h-full w-full">
                            {/* WISHLIST */}
                            <button className="flex items-center h-[40px]"
                                onClick={() => {
                                    addToWishlistApi()
                                }}
                            >
                                <Image
                                    src={wishlistIcon}
                                    height={40}
                                    width={40}
                                // layout={'fill'}
                                />
                            </button>
                            {inStock ? (
                                // {/* ADD TO CART */}
                                <button className="flex items-center h-[40px]"
                                    onClick={() => {
                                        addToCartApi()
                                    }}
                                >
                                    <Image
                                        src={addToCartIcon}
                                        height={40}
                                        width={40}
                                    />
                                </button>
                            ) : (
                                <button className="h-[40px] px-2 bg-zinc-400 font-bold text-md rounded text-white"
                                    disabled={true}
                                >
                                    Out of Stock
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
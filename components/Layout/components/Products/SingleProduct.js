import Image from "next/image"
import Link from "next/link"
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
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
    const [showAddToCart, setShowAddToCart] = useState(false)

    let divStyle = showAddToCart ? 'drop-shadow-xl' : 'border-r-2 border-b-2'

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
        let body = { sku: [product.sku] }
        if (token) {
            let url = base_url_api + '/watchlist/save?city=karachi&lang=en'

            try {
                let response = await axios.post(url, body,
                    {
                        headers: headers
                    }

                )
                toast.success("Added to Shopping List")
                dispatch(addToWish(product));
            } catch (error) {
                console.log(error)
            }
        }
        else {
            toast.error('Login first')
        }
    }

    return (
        <>
            <div className={"hidden relative lg:grid grid-rows-6 bg-white px-2 lg:px-4 h-[250px] lg:h-[350px] rounded-br-lg " + [divStyle]}
                onMouseEnter={() => {
                    setShowAddToCart(true)
                }}
                onMouseLeave={() => {
                    setShowAddToCart(false)
                }}
            >
                {/* IMAGE */}
                <div className="row-span-4 flex items-center justify-center w-full h-full">
                    <Link
                        href={{
                            pathname: "/details/[title]",
                            query: {
                                id: sku,
                                title: title
                            }
                        }}
                        as={
                            "/details/" + sku
                        }
                        passHref
                    // as={`details/${title}-${sku}`}
                    >
                        <a className="relative h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]">
                            <Image
                                src={imageUrl}
                                layout={'fill'}
                                alt={'product image'}
                            />
                        </a>
                    </Link>
                </div>
                {/* TITLE */}
                <p className="row-span-1 font-lato font-bold text-left text-xs lg:text-lg text-main-blue">
                    {title}
                </p>
                {/* PRICE */}
                <p className="row-span-1 text-md lg:text-3xl text-left font-bold text-main-blue">
                    Rs. {currentPrice}
                </p>
                {showAddToCart && (
                    <div className="absolute z-90 bg-white drop-shadow-[0_35px_35px_35px_rgba(0,0,0,0.25)] bottom-[-35px] py-2 row-span-1 flex flex-col lg:flex-row items-center justify-between w-full"
                        onMouseEnter={() => {
                            setShowAddToCart(true)
                        }}
                        onMouseLeave={() => {
                            setShowAddToCart(false)
                        }}
                    >
                        {/* QUANTITY hidden on phone */}
                        {inStock && (
                            <div className="hidden lg:grid grid-cols-3 ml-2 justify-items-center rounded border-2 border-main-yellow overflow-hidden w-[50px] lg:w-full h-[40px]">
                                <button className="relative bg-white w-full"
                                    onClick={() => {
                                        setQtyHandler('decrement')
                                    }}
                                >
                                    <Image
                                        src={minusIcon}
                                        layout={'fill'}
                                        alt={'icon'}
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
                                        alt={'icon'}
                                    />
                                </button>
                            </div>
                        )}
                        <div className="relative flex flex-row items-center justify-around lg:justify-end space-x-2 h-full w-full mr-2">
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
                                        alt={'icon'}
                                    />
                                </button>
                            ) : (
                                <button className="h-[40px] px-2 bg-zinc-400 font-bold text-xs lg:text-md rounded text-white"
                                    disabled={true}
                                >
                                    Out of Stock
                                </button>
                            )}
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
                                    alt={'icon'}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className={"lg:hidden grid grid-flow-row bg-white px-2 lg:px-4 h-[250px] lg:h-[350px] rounded-br-lg " + [divStyle]}>
                {/* IMAGE */}
                <div className="row-span-4 flex items-center justify-center w-full h-full">
                    <Link
                        href={{
                            pathname: "/details/[title]",
                            query: {
                                id: sku,
                                title: title
                            }
                        }}
                        as={
                            "/details/" + sku
                        }
                        passHref
                    // as={`details/${title}-${sku}`}
                    >
                        <a className="relative h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]">
                            <Image
                                src={imageUrl}
                                layout={'fill'}
                                alt={'icon'}
                            />
                        </a>
                    </Link>
                </div>
                {/* TITLE */}
                <p className="row-span-1 font-lato font-bold text-left text-xs lg:text-lg text-main-blue">
                    {title}
                </p>
                {/* PRICE */}
                <p className="row-span-1 text-md lg:text-3xl text-left font-bold text-main-blue">
                    Rs. {currentPrice}
                </p>
                <div className="z-90 bg-white drop-shadow-[0_35px_35px_35px_rgba(0,0,0,0.25)] bottom-[-35px] py-2 row-span-1 flex flex-col lg:flex-row items-center justify-between w-full"
                    onMouseEnter={() => {
                        setShowAddToCart(true)
                    }}
                    onMouseLeave={() => {
                        setShowAddToCart(false)
                    }}
                >
                    {/* QUANTITY hidden on phone */}
                    {inStock && (
                        <div className="hidden lg:grid grid-cols-3 ml-2 justify-items-center rounded border-2 border-main-yellow overflow-hidden w-[50px] lg:w-full h-[40px]">
                            <button className="relative bg-white w-full"
                                onClick={() => {
                                    setQtyHandler('decrement')
                                }}
                            >
                                <Image
                                    src={minusIcon}
                                    layout={'fill'}
                                    alt={'icon'}
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
                                    alt={'icon'}
                                />
                            </button>
                        </div>
                    )}
                    <div className="relative flex flex-row items-center justify-around lg:justify-end space-x-2 h-full w-full mr-2">
                        {inStock ? (
                            // {/* ADD TO CART */}
                            <button className="h-[40px] px-2 bg-main-yellow font-bold text-xs lg:text-md rounded text-main-blue"
                                onClick={() => {
                                    addToCartApi()
                                }}
                            >
                                Add To Cart
                            </button>
                        ) : (
                            <button className="h-[40px] px-2 bg-zinc-400 font-bold text-xs lg:text-md rounded text-white"
                                disabled={true}
                            >
                                Out of Stock
                            </button>
                        )}
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
                                alt={'icon'}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
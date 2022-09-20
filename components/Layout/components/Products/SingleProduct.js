import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addToWish } from "../../../../redux/wish.slice"
import missingImageIcon from "../../../../public/assets/images/missingImage.png"
import minusIcon from "../../../../public/assets/svgs/minusIcon.svg"
import plusIcon from "../../../../public/assets/svgs/plusIcon.svg"
import wishlistIcon from "../../../../public/assets/svgs/wishlistIcon.svg"
import { useAddToCartApi } from "../../../../helpers/Api"
import { base_url_api } from "../../../../information.json"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import toKebabCase from "../../../../helpers/toKebabCase"

/*
	isInStock is being passed where static site generation is being used
	to keep stock of item uptodate always
*/
export default function SingleProduct({ product, isInStock }) {
	let {
		productImageUrl,
		productImageUrlThumbnail,
		title,
		currentPrice,
		specialPrice,
		sku,
		inStock,
		minQty,
		maxQty,
		categoryleafName,
		categoryIds,
	} = product

	const dispatch = useDispatch()
	const reduxCart = useSelector((state) => state.cart)
	const [showFloatAnimation, setShowFloatAnimation] = useState(false)
	const [qty, setQty] = useState(minQty)
	const [showQty, setShowQty] = useState(false)
	const { setIsPlaceOrder, errorResponse } = useAddToCartApi(sku, qty, product)

	useEffect(() => {
		const item = reduxCart.find((item) => item.sku === sku)
		if (item) {
			setShowQty(true)
			setQty(item.qty)
		}
		else {
			setShowQty(false)
			setQty(minQty)
		}
	}, [reduxCart])

	useEffect(() => {
		if (errorResponse) {
			setShowQty(false)
		}
	}, [errorResponse])

	if (isInStock) {
		inStock = isInStock
	}

	let imageUrl =
		productImageUrlThumbnail != ""
			? productImageUrlThumbnail
			: productImageUrl != ""
				? productImageUrl
				: missingImageIcon
	let immediateCategoryName = categoryleafName.split("|")[0].trim()
	let immediateCategoryId = categoryIds.replace(/\s+/g, "").split("|")[0]

	const addToWishlistApi = async () => {
		let { token, headers, userId } = getGeneralApiParams()
		let body = { sku: [product.sku] }
		if (token) {
			let url =
				base_url_api +
				"/watchlist/save?city=karachi&lang=en&client_type=apricart&userid=" +
				userId

			try {
				await axios.post(url, body, {
					headers: headers,
				})
				toast.success("Added to Shopping List")
				dispatch(addToWish(product))
			} catch (error) {
				console.log(error)
			}
		} else {
			toast.error("Login first")
		}
	}

	const setQtyHandler = (type) => {
		if (type == "increment") {
			if (qty == maxQty) {
				return
			}
			setQty((prevqty) => prevqty + 1)
			setIsPlaceOrder(true)
		} else if (type == "decrement") {
			if (qty == minQty) {
				toast.error("Cannot order less than minimum quantity")
				return
			}
			setQty((prevqty) => prevqty - 1)
			setIsPlaceOrder(true)
		}
	}

	return (
		<div>
			<div className="relative grid grid-rows-[7] bg-white px-2 h-[250px] lg:h-[300px] rounded-br-lg border-b-2 border-r-2 duration-75 hover:scale-[1.02] ease-out hover:z-20 hover:border-main-blue hover:drop-shadow-2xl hover:border-2 hover:rounded-lg">
				{/* ABSOLUTE image float*/}
				{showFloatAnimation && (
					<div
						className={"absolute z-30 top-0 left-0 right-0 mx-auto flex items-center justify-center animate-float-up h-[50px] w-[50px] rounded-full overflow-hidden m-2"}
					>
						<Image
							src={imageUrl}
							width={50}
							height={50}
							alt={"product image"}
						/>
					</div>
				)}
				{/* ABSOLUTE Wishlist*/}
				<button
					className="absolute z-10 right-1 top-1 flex items-center rounded-lg"
					onClick={() => {
						addToWishlistApi()
					}}
				>
					<Image
						src={wishlistIcon}
						width={40}
						height={40}
						alt={"icon"}
					/>
				</button>
				{/* IMAGE */}
				<div className="row-span-4 flex items-center justify-center w-full h-full">
					<Link
						href={
							"/category/" +
							toKebabCase(immediateCategoryName) +
							"/" +
							immediateCategoryId +
							"/" +
							toKebabCase(title) +
							"/" +
							sku
						}
						passHref
					>
						<a className="relative h-[90px] w-[90px] lg:h-[120px] lg:w-[120px]">
							<Image
								src={imageUrl}
								layout={"fill"}
								alt={"product image"}
							/>
						</a>
					</Link>
				</div>
				{/* TITLE */}
				<p className="row-span-1 font-lato font-bold text-left text-sm xl:text-base text-main-blue line-clamp-2 overflow-y-hidden">
					{title}
				</p>
				{/* PRICE */}
				{specialPrice > 0 ? (
					<div className="row-span-2 flex flex-col justify-center">
						<p className="text-sm lg:text-lg text-left font-bold text-main-blue line-through decoration-red-600">
							Rs. {currentPrice}
						</p>
						<p className="text-xl lg:text-2xl text-left font-bold text-main-blue">
							Rs. {specialPrice}
						</p>
					</div>
				) : (
					<p className="row-span-2 flex items-center text-xl lg:text-2xl text-left font-bold text-main-blue">
						Rs. {currentPrice}
					</p>
				)}
				{/* ADD TO CART */}
				<div className="row-span-1 h-[32px] flex justify-center self-end mb-2">
					<div className="h-full w-2/3">
						{inStock ? (
							<div className="relative flex flex-row items-center h-full w-full">
								{showQty ? (
									<div className="animate-fade-in transition-transform grid grid-cols-3 justify-items-center bg-slate-200 rounded-full h-full grow overflow-hidden">
										<button
											className="flex items-center relative transition-transform hover:scale-125 duration-100 my-1"
											onClick={() => {
												setQtyHandler("decrement")
											}}
										>
											<Image
												height={10}
												width={10}
												src={minusIcon}
												alt={"icon"}
											/>
										</button>
										<div className="flex flex-col font-bold w-full text-main-blue text-2xl text-center">
											<p className="mt-auto mb-auto">
												{qty}
											</p>
										</div>
										<button
											className="flex items-center relative transition-transform hover:scale-125 duration-100 my-1"
											onClick={() => {
												setQtyHandler("increment")
											}}
										>
											<Image
												height={10}
												width={10}
												src={plusIcon}
												alt={"icon"}
											/>
										</button>
									</div>
								) : (
									<button
										className="flex justify-center items-center w-full h-full bg-main-blue rounded-full overflow-hidden hover:scale-105 duration-100 hover:text-black text-white"
										onClick={() => {
											setIsPlaceOrder(true)
											setShowQty(true)
											setShowFloatAnimation(true)

											// timeout same as animate-float-up
											setTimeout(function () {
												// setFloatStyle('hidden')
												setShowFloatAnimation(false)
											}, 2000)
										}}
									>
										<p className="font-bold">Add To Cart</p>
									</button>
								)}
							</div>
						) : (
							<div className="relative flex flex-row items-center h-full w-full">
								<button
									className="bg-zinc-400 font-bold text-xs lg:text-md rounded text-white h-full w-full"
									disabled={true}
								>
									Out of Stock
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

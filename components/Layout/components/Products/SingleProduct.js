import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import missingImageIcon from "../../../../public/assets/images/missingImage.png"
import minusIcon from "../../../../public/assets/svgs/minusIconWhite.svg"
import plusIcon from "../../../../public/assets/svgs/plusIconWhite.svg"
import wishlistIcon from "../../../../public/assets/svgs/wishlistIcon.svg"
import addToCartIcon from "../../../../public/assets/svgs/addToCartIcon.svg"
import productBackground from "../../../../public/assets/svgs/productBackground.svg"

import { useAddToCartApi, useAddToWishlist } from "../../../../helpers/Api"
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

	// For error handling when category leaf name or id are undefined or null from api
	categoryleafName = categoryleafName ?? "category-leaf"
	categoryIds = categoryIds ?? "0"

	const reduxCart = useSelector((state) => state.cart)
	const [showFloatAnimation, setShowFloatAnimation] = useState(false)
	const [qty, setQty] = useState(minQty)
	const [showQty, setShowQty] = useState(false)
	const { setIsPlaceOrder, errorResponse } = useAddToCartApi(sku, qty, product)
	const { setIsAdd, setData } = useAddToWishlist()

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
		<div className="flex flex-col relative duration-75 hover:scale-[1.02] ease-out hover:z-20 min-h-full h-[180px] sm:h-[200px] xl:h-[220px] 2xl:h-[250px] 3xl:h-[280px] w-full">
			{/* Background image */}
			<div className="absolute flex h-full w-full">
				<Image
					src={productBackground}
					alt=''
					layout="fill"
				/>
			</div>
			<div className="flex flex-col items-center w-full h-full">
				<div className="relative grid grid-rows-[7] gap-2 place-items-center w-[80%] h-[85%]">
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
					{/* IMAGE */}
					<div className="row-span-4 w-1/2 h-full flex grow">
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
							<a className="w-full">
								<Image
									src={imageUrl}
									layout={"responsive"}
									alt={"product image"}
									height={100}
									width={100}
								/>
							</a>
						</Link>
					</div>
					{/* TITLE */}
					<p className="row-span-1 place-self-start font-lato text-black font-normal text-left text-xs xl:text-base line-clamp-2 overflow-y-hidden">
						{title}
					</p>
					{/* PRICE and  ADD TO CART*/}
					<div className="row-span-2 flex items-center w-full justify-between">
						{/* PRICE */}
						<div className="flex w-fit flex-col justify-center">
							{specialPrice > 0 ? (
								<>
									<p className="text-xs lg:text-sm 2xl:text-base text-left font-bold text-black line-through decoration-red-600">
										Rs. {currentPrice}
									</p>
									<p className="text-sm lg:text-base 2xl:text-lg text-left font-bold text-black">
										Rs. {specialPrice}
									</p>
								</>
							) : (
								<p className="text-sm lg:text-base 2xl:text-lg text-left font-bold text-black">
									Rs. {currentPrice}
								</p>
							)}
						</div>
						{/* ADD TO CART */}
						<div className="flex justify-center w-1/2 h-full">
							{inStock ? (
								<>
									{showQty ? (
										<div className="w-full h-full animate-fade-in transition-transform grid grid-cols-3 justify-items-center bg-main-blue rounded-md">
											<button
												className="flex items-center relative transition-transform hover:scale-125 duration-100"
												onClick={() => {
													setQtyHandler("decrement")
												}}
											>
												<div className="relative h-[10px] w-[10px]">
													<Image
														src={minusIcon}
														layout='fill'
														alt=''
													/>
												</div>
											</button>
											<p className="font-nunito text-sm lg:text-lg font-bold text-white text-center">
												{qty}
											</p>
											<button
												className="flex items-center relative transition-transform hover:scale-125 duration-100"
												onClick={() => {
													setQtyHandler("increment")
												}}
											>
												<div className="relative h-[10px] w-[10px]">
													<Image
														src={plusIcon}
														layout='fill'
														alt=''
													/>
												</div>
											</button>
										</div>
									) : (
										<div className="flex flex-row w-full justify-around space-x-1">
											<div
												className="drop-shadow-lg p-1 flex items-center justify-center bg-white rounded-md hover:scale-105 duration-100"
												onClick={() => {
													setIsPlaceOrder(true)
													setShowQty(true)
													setShowFloatAnimation(true)

													// timeout same as animate-float-up
													setTimeout(function () {
														setShowFloatAnimation(false)
													}, 2000)
												}}
											>
												<div className="relative h-[18px] w-[18px]">
													<Image
														src={addToCartIcon}
														layout='fill'
														alt=''
													/>
												</div>
											</div>
											<div
												className="drop-shadow-lg p-1 flex items-center justify-center bg-white rounded-md hover:scale-105 duration-100"
												onClick={() => {
													setData({
														sku: [sku]
													})
													setIsAdd(true)
												}}
											>
												<div className="relative h-[18px] w-[18px]">
													<Image
														src={wishlistIcon}
														layout='fill'
														alt=''
													/>
												</div>
											</div>
										</div>
									)}
								</>
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
		</div>
	)
}

import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addToWish } from "../../../../redux/wish.slice"
import missingImageIcon from "../../../../public/assets/images/missingImage.png"
import minusIcon from "../../../../public/assets/svgs/minusIcon.svg"
import plusIcon from "../../../../public/assets/svgs/plusIcon.svg"
import wishlistIcon from "../../../../public/assets/svgs/wishlistIcon.svg"
import addToCartIcon from "../../../../public/assets/svgs/addToCartIcon.svg"
import { useAddToCartApi } from "../../../../helpers/Api"
import { base_url_api } from "../../../../information.json"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useState } from "react"
import { toast } from "react-toastify"
import toKebabCase from "../../../../helpers/toKebabCase"

/*
	isInStock is being passed where static site generation is being used
	to keep stock of item uptodate always
*/
export default function SingleProduct({ product, isInStock }) {
	const dispatch = useDispatch()

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

	const AddToCart = () => {
		const [qty, setQty] = useState(minQty)
		const [showQty, setShowQty] = useState(false)
		const { setIsPlaceOrder } = useAddToCartApi(sku, qty, product)

		const setQtyHandler = (type) => {
			if (type == "increment") {
				if (qty == maxQty) {
					return
				}
				setQty(prevqty => prevqty + 1)
				setIsPlaceOrder(true)
			} else if (type == "decrement") {
				if (qty == minQty) {
					toast.error("Cannot order less than minimum quantity")
					return
				}
				setQty(prevqty => prevqty - 1)
				setIsPlaceOrder(true)
			}
		}

		return (
			<div className="row-span-1 h-[40px]">
				{inStock ? (
					<div className="relative flex flex-row items-center h-full w-full">
						{showQty ? (
							<div className="animate-fade-in grid grid-cols-3 justify-items-center rounded border-2 border-main-blue h-full grow">
								<button
									className="relative bg-white w-full"
									onClick={() => {
										setQtyHandler("decrement")
									}}
								>
									<Image
										src={minusIcon}
										layout={"fill"}
										alt={"icon"}
									/>
								</button>
								<div className="flex flex-col bg-main-yellow font-bold w-full text-main-blue text-2xl text-center border-x-2 border-main-blue">
									<p className="mt-auto mb-auto">{qty}</p>
								</div>
								<button
									className="relative bg-white w-full"
									onClick={() => {
										setQtyHandler("increment")
									}}
								>
									<Image
										src={plusIcon}
										layout={"fill"}
										alt={"icon"}
									/>
								</button>
							</div>
						) : (
							<button
								className="flex justify-center items-center w-full h-full bg-main-blue rounded-full overflow-hidden"
								onClick={() => {
									setIsPlaceOrder(true)
									setShowQty(true)
								}}
							>
								<p className="text-white font-bold">
									Add To Cart
								</p>
							</button>
						)}
					</div>
				) : (
					<div className="flex justify-between flex-row space-x-4">
						<button
							className="px-2 bg-zinc-400 font-bold text-xs lg:text-md rounded text-white grow"
							disabled={true}
						>
							Out of Stock
						</button>
					</div>
				)}
			</div>
		)
	}

	{/* WISHLIST */ }
	{/* <button
									className="flex items-center border-2 border-main-blue rounded-lg"
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
								</button> */}


	return (
		<div>
			{/* DESKTOP VIEW */}
			<div className="hidden relative lg:grid grid-rows-[7] bg-white px-2 h-[350px] rounded-br-lg border-b-2 border-r-2 duration-75 hover:scale-105 ease-out hover:z-20 hover:border-main-blue hover:shadow-2xl hover:shadow-main-yellow hover:border-2 hover:rounded-lg">
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
						<a className="relative h-[150px] w-[150px]">
							<Image
								src={imageUrl}
								layout={"fill"}
								alt={"product image"}
							/>
						</a>
					</Link>
				</div>
				{/* TITLE */}
				<p className="row-span-1 font-lato font-bold text-left text-sm xl:text-lg text-main-blue line-clamp-2 overflow-y-hidden">
					{title}
				</p>
				{/* PRICE */}
				{specialPrice > 0 ? (
					<div className="row-span-2 flex flex-col justify-center">
						<p className="text-lg xl:text-xl text-left font-bold text-main-blue line-through decoration-red-600">
							Rs. {currentPrice}
						</p>
						<p className="text-3xl text-left font-bold text-main-blue">
							Rs. {specialPrice}
						</p>
					</div>
				) : (
					<p className="row-span-2 flex items-center text-3xl text-left font-bold text-main-blue">
						Rs. {currentPrice}
					</p>
				)}
				<AddToCart />
			</div>
			{/* MOBILE VIEW */}
			<div className="lg:hidden grid grid-flow-row bg-white px-2 h-[250px] rounded-br-lg border-b-2 border-r-2 duration-75 hover:scale-110 ease-out">
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
						<a className="relative h-[100px] w-[100px]">
							<Image
								src={imageUrl}
								layout={"fill"}
								alt={"icon"}
							/>
						</a>
					</Link>
				</div>
				{/* TITLE */}
				<p className="row-span-1 font-lato font-bold text-left text-xs text-main-blue line-clamp-2 overflow-y-hidden">
					{title}
				</p>
				{/* PRICE */}
				{specialPrice > 0 ? (
					<div className="row-span-1 flex flex-col">
						<p className="text-xs text-left font-bold text-main-blue line-through decoration-red-600">
							Rs. {currentPrice}
						</p>
						<p className="text-base text-left font-bold text-main-blue">
							Rs. {specialPrice}
						</p>
					</div>
				) : (
					<p className="row-span-1 text-base text-left font-bold text-main-blue">
						Rs. {currentPrice}
					</p>
				)}
				<AddToCart />
			</div>
		</div>
	)
}

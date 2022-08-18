import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addToWish } from "../../../../redux/wish.slice"
import missingImageIcon from "../../../../public/assets/images/missingImage.png"
import minusIcon from "../../../../public/assets/svgs/minusIcon.svg"
import plusIcon from "../../../../public/assets/svgs/plusIcon.svg"
import wishlistIcon from "../../../../public/assets/svgs/wishlistIcon.svg"
import addToCartIcon from "../../../../public/assets/svgs/addToCartIcon.svg"
import { useAddToCartApi } from "../../../../helpers/Api"
import { base_url_api } from "../../../../information.json"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useState, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import toKebabCase from "../../../../helpers/toKebabCase"
import styles from './singleProduct.module.css'

/*
	isInStock is being passed where static site generation is being used
	to keep stock of item uptodate always
*/
export default function SingleProduct({ product, isInStock }) {
	const dispatch = useDispatch()
	const cartIconRefSelector = useSelector(state => state.page.cartIconRef)
	const imageRef = useRef()
	const floatImageRef = useRef()
	const [imagePostion, setImagePostion] = useState()
	const [floatImagePostion, setFloatImagePostion] = useState()
	const [showFloatAnimation, setShowFloatAnimation] = useState(false)
	const [floatStyle, setFloatStyle] = useState("fixed top-0 left-0 z-50 w-[50px] h-[50px]")

	useEffect(() => {
		// let style = `hidden z-[90] top-0 left-0 w-[50px] h-[50px] flex items-center overflow-hidden rounded-full duration-[1s]`
		// setFloatStyle(style)

		setFloatImagePostion(floatImageRef.current.getBoundingClientRect())
		setImagePostion(imageRef.current.getBoundingClientRect())

		if (showFloatAnimation) {
			let viewCart = cartIconRefSelector.current
			let imgToDrag = floatImageRef.current
			let imgToDragImage = floatImageRef.current

			let disLeft = imgToDrag.getBoundingClientRect().left;
			let disTop = imgToDrag.getBoundingClientRect().top;
			let cartLeft = viewCart.getBoundingClientRect().left;
			let cartTop = viewCart.getBoundingClientRect().top;
			let image = imgToDragImage.cloneNode(true);
			image.style =
				'z-index: 11111; width: 100px;opacity:1; position:fixed; top:' +
				disTop +
				'px;left:' +
				disLeft +
				'px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1);border-radius: 50px; overflow: hidden; box-shadow: 0 21px 36px rgba(0,0,0,0.1)';
			let reChange = document.body.appendChild(image);
			setTimeout(function () {
				image.style.left = cartLeft + 'px';
				image.style.top = cartTop + 'px';
				image.style.width = '40px';
				image.style.opacity = '0';
			}, 200);
			setTimeout(function () {
				reChange.parentNode.removeChild(reChange);
			}, 1000);


			// let top = imagePostion.bottom + imagePostion.height / 2
			// let top = window.scrollY
			// // console.log(top)
			// let left = 0
			// // let left = imagePostion.left + imagePostion.width / 2
			// // let style = `fixed z-[90] top-[${top}px] left-[${left}px] w-[50px] h-[50px] flex items-center overflow-hidden rounded-full`
			// let style = `hidden z-[90] top-0 left-0 w-[50px] h-[50px] flex items-center overflow-hidden rounded-full duration-[1s]`

			// setFloatStyle(style)

			// // final position would be 
			// let cartX = cartIconRefSelector.current.getBoundingClientRect().x
			// let cartY = cartIconRefSelector.current.getBoundingClientRect().y

			// let floatX = floatImagePostion.x
			// let floatY = floatImagePostion.y

			// let diffX = cartX - floatX
			// let diffY = cartY - floatY


			// cartIconRefSelector.current.appendTo(floatImageRef)


			// console.log(diffX, diffY);
			// console.log(window.scrollY);

			// floatImageRef.current.animate([
			// 	{
			// 		transform: 'translateY(0px) translateX(0px)',
			// 	},
			// 	{
			// 		// transform: `translateY(${cartY}px) translateX(${cartX}px)`
			// 		transform: 'translateY(9px) translateX(900px)'
			// 	}
			// ], {
			// 	duration: 1000,
			// 	iterations: Infinity
			// })

			// floatImageRef.current.animate([
			// 	{ transform: 'translateY(0px)' },
			// 	{ transform: `translateY(${diffY}px) translateX(${diffX}px)` }
			// ], {
			// 	// timing options
			// 	duration: 4000,
			// 	iterations: Infinity
			// });
			// console.log(cartIconRefSelector.current.getBoundingClientRect())
		}
	}, [showFloatAnimation])

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
			<div className="h-full w-full">
				{inStock ? (
					<div className="relative flex flex-row items-center h-full w-full">
						{showQty ? (
							<div className="animate-fade-in grid grid-cols-3 justify-items-center bg-slate-200 rounded-full h-full grow overflow-hidden">
								<button
									className="flex items-center relative transition-none hover:scale-125 duration-100 my-1"
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
									<p className="mt-auto mb-auto">{qty}</p>
								</div>
								<button
									className="flex items-center relative transition-none hover:scale-125 duration-100 my-1"
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
									// setIsPlaceOrder(true)
									setShowFloatAnimation(true)
									// setShowQty(true)
								}}
							>
								<p className="font-bold">
									Add To Cart
								</p>
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
		)
	}

	return (
		<div className="">
			{/* FIXED image float*/}
			<div className={floatStyle}
				ref={floatImageRef}
			>
				<Image
					src={imageUrl}
					layout='fill'
					alt={"product image"}
				/>
			</div>
			<div className="relative grid grid-rows-[7] bg-white px-2 h-[350px] rounded-br-lg border-b-2 border-r-2 duration-75 hover:scale-[1.02] ease-out hover:z-20 hover:border-main-blue hover:drop-shadow-2xl hover:border-2 hover:rounded-lg">
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
						<a className="relative h-[130px] w-[130px] lg:h-[150px] lg:w-[150px]"
							ref={imageRef}
						>
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
						<p className="text-sm lg:text-xl text-left font-bold text-main-blue line-through decoration-red-600">
							Rs. {currentPrice}
						</p>
						<p className="text-2xl lg:text-3xl text-left font-bold text-main-blue">
							Rs. {specialPrice}
						</p>
					</div>
				) : (
					<p className="row-span-2 flex items-center text-2xl lg:text-3xl text-left font-bold text-main-blue">
						Rs. {currentPrice}
					</p>
				)}
				<div className="row-span-1 h-[32px] self-end mb-2">
					<AddToCart />
				</div>
			</div>
		</div>
	)
}
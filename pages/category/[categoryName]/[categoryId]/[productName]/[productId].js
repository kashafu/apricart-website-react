import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Categories from "../../../../../components/Layout/components/Categories/Categories"
import RelatedProduct from "../../../../../components/Layout/components/RelatedProduct/RelatedProduct"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../../redux/cart.slice"
import Cookies from "universal-cookie"
import { base_url_api } from "../../../../../information.json"
import { getGeneralApiParams } from "../../../../../helpers/ApiHelpers"
import { toast } from "react-toastify"
import axios from "axios"
import HeadTag from "../../../../../components/Layout/components/Head/HeadTag"
import minusIcon from "../../../../../public/assets/svgs/minusIcon.svg"
import plusIcon from "../../../../../public/assets/svgs/plusIcon.svg"
import { useAddToCartApi, useProductDetailsApi } from "../../../../../helpers/Api"

export default function ProductDetail() {
	const dispatch = useDispatch()
	const cookies = new Cookies()
	let isLoggedIn = cookies.get("cookies-token") != null
	const router = useRouter()
	const { productId, productName } = router.query

	const { isLoading, productData, errorMessage } = useProductDetailsApi()
	const [qty, setQty] = useState(1)

	const setQtyHandler = (type) => {
		if (type == "increment") {
			if (qty == productData[0].maxQty) {
				return
			}
			setQty(qty + 1)
		} else if (type == "decrement") {
			if (qty == productData[0].minQty) {
				return
			}
			setQty(qty - 1)
		}
	}

	if (isLoading) {
		return (
			<div>
				<p>Loading</p>
			</div>
		)
	}

	if (!productData) {
		return (
			<div>
				<p>{errorMessage}</p>
			</div>
		)
	}

	if (productData.length == 0) {
		return (
			<div>
				<p>Item does not exist</p>
			</div>
		)
	}

	const {
		title,
		description,
		categoryleafName,
		productImageUrl,
		specialPrice,
		currentPrice,
		sku,
		inStock
	} = productData[0]

	const AddToCart = () => {
		const { setIsPlaceOrder } = useAddToCartApi(sku, qty, productData[0])

		return (
			<div className="flex flex-row w-full justify-between lg:justify-start lg:space-x-4">
				{inStock ? (
					<div className="flex flex-row space-x-4">
						<div className="grid grid-cols-3 justify-items-center rounded overflow-hidden w-[100px] h-[40px] border-2">
							<button
								className="relative bg-white w-full"
								onClick={() => {
									setQtyHandler(
										"decrement"
									)
								}}
							>
								<Image
									src={
										minusIcon
									}
									layout={
										"fill"
									}
									alt='icon'
								/>
							</button>
							<div className="flex flex-col bg-main-yellow font-bold w-full text-main-blue text-2xl text-center">
								<p className="mt-auto mb-auto">
									{
										qty
									}
								</p>
							</div>
							<button
								className="relative bg-white w-full"
								onClick={() => {
									setQtyHandler(
										"increment"
									)
								}}
							>
								<Image
									src={
										plusIcon
									}
									layout={
										"fill"
									}
									alt='icon'
								/>
							</button>
						</div>
						<div>
							{/* ADD TO CART */}
							<button
								className="flex items-center h-[40px]"
								onClick={() => {
									setIsPlaceOrder(true)
								}}
							>
								<p className="text-white font-bold bg-main-blue py-2 px-4 rounded-xl">
									ADD TO
									CART
								</p>
							</button>
						</div>
					</div>
				) : (
					<button
						className="w-1/2 h-[40px] px-2 bg-zinc-400 font-bold text-xs lg:text-md rounded text-white"
						disabled={
							true
						}
					>
						Out of Stock
					</button>
				)}
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={title} description={description} />
			<section className="popular_sec">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
							<div className="hidden lg:flex">
								<Categories />
							</div>
						</div>
						<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
							<>
								<section className="ContentSec -m-[20px]">
									<div className="container-fluid">
										<div className="prothreeHead">
											<ol className="breadcrumb">
												<li>
													{" "}
													<a passHref="/">
														Home
													</a>{" "}
												</li>
												<li>
													<a passHref="/category/">
														{categoryleafName}
													</a>
												</li>
											</ol>
										</div>
									</div>
								</section>
								<section className="productdet_sec">
									<div className="container">
										<div className="row">
											<div className="col-12 col-sm-4  col-md-4  col-lg-4  col-xl-4  col-xxl-4">
												<div className="proDimg">
													<img
														src={productImageUrl}
														classNameName="img-fluid"
														alt=""
													/>
												</div>
											</div>
											<div className="col-12 col-sm-6  col-md-6  col-lg-6  col-xl-6  col-xxl-6">
												<div className="productD_head">
													<p className="text-main-blue font-bold text-3xl">
														{title}
													</p>
													<hr />
													{specialPrice > 0 ? (
														<div className="flex flex-row space-x-4">
															<h4 className="line-through decoration-red-600">
																Rs.{" "}
																{currentPrice}
															</h4>
															<h4>
																Rs.{" "}
																{specialPrice}
															</h4>
														</div>
													) : (
														<h4>
															Rs. {currentPrice}
														</h4>
													)}
													<hr />
													<div className="productD_para">
														<p>{description}</p>
														<span>{sku}</span>
													</div>
													<div className="py-4">
														<AddToCart />
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
							</>
							<RelatedProduct />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

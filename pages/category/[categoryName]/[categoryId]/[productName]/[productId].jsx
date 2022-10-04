import { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import Link from "next/link"

import { fromPipeCase } from "../../../../../helpers/PipeCase"
import RelatedProduct from "../../../../../components/Layout/components/RelatedProduct/RelatedProduct"
import HeadTag from "../../../../../components/Layout/components/Head/HeadTag"
import minusIcon from "../../../../../public/assets/svgs/minusIcon.svg"
import plusIcon from "../../../../../public/assets/svgs/plusIcon.svg"
import { useAddToCartApi, useProductDetailsApi } from "../../../../../helpers/Api"
import CategoryAndItemsLayout from "../../../../../components/Layout/components/Layouts/CategoryAndItemsLayout"
import toKebabCase from "../../../../../helpers/toKebabCase"

/*
	Gets the product details from the useProductDetailsApi that picks up the url query params
*/

export default function ProductDetail() {
	const { isLoading, productData, errorMessage } = useProductDetailsApi()

	if (isLoading) {
		return (
			<div>
				<HeadTag title={"Loading Product"} />
				<p>Loading</p>
			</div>
		)
	}

	if (!productData) {
		return (
			<div>
				<HeadTag title={"Product Detail"} />
				<p>{errorMessage}</p>
			</div>
		)
	}

	if (productData.length == 0) {
		return (
			<div>
				<HeadTag title={"No Item"} />
				<p>Item does not exist</p>
			</div>
		)
	}

	const {
		title,
		description,
		categoryleafName,
		categoryIds,
		productImageUrl,
		specialPrice,
		currentPrice,
		sku,
		inStock,
	} = productData[0]

	const Product = () => {
		const AddToCart = () => {
			const reduxCart = useSelector((state) => state.cart)

			const [qty, setQty] = useState(1)
			const [cartButtonText, setCartButtonText] = useState("ADD TO CART")
			const { setIsPlaceOrder, response } = useAddToCartApi(sku, qty, productData[0])

			const setQtyHandler = (type) => {
				if (type == "increment") {
					if (qty == productData[0].maxQty) {
						return
					}
					setQty(qty + 1)
				} else if (type == "decrement") {
					if (qty == productData[0].minQty) {
						toast.error("Cannot order less than minimum quantity")
						return
					}
					setQty(qty - 1)
				}
			}

			useEffect(() => {
				if (productData) {
					setQty(productData[0].minQty)
				}
			}, [productData])

			useEffect(() => {
				if (productData) {
					const item = reduxCart.find((item) => item.sku === productData[0].sku)
					if (item) {
						setQty(item.qty)
					}
				}
			}, [reduxCart, productData])

			useEffect(() => {
				if (response) {
					setCartButtonText("ADDED")
				}
			}, [response])

			return (
				<div className="flex flex-row w-full">
					{inStock ? (
						<div className="flex flex-row w-full justify-evenly lg:justify-start lg:space-x-4">
							<div className="grid grid-cols-3 justify-items-center rounded overflow-hidden w-[100px] h-[40px] border-2">
								<button
									className="relative bg-white w-1/2"
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
									className="relative bg-white w-1/2"
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
										{cartButtonText}
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

		const BreadCrumbs = () => {
			let categoryNamesArray = fromPipeCase(categoryleafName)
			let categoryIdsArray = fromPipeCase(categoryIds.replace(/\s/g, ''))

			const BreadCrumb = ({ categoryName, categoryId }) => {
				return (
					<Link
						passHref
						href={
							"/category/" +
							toKebabCase(categoryName) +
							"/" +
							categoryId
						}
					>
						<a className="font-lato text-main-blue hover:brightness-200">
							&gt; {categoryName}
						</a>
					</Link>
				)
			}

			return (
				<div className="space-x-2">
					{categoryIdsArray.slice(0, categoryIdsArray.length - 1).map((id, index) => {
						return (
							<BreadCrumb
								key={index}
								categoryName={categoryNamesArray[index]}
								categoryId={id}
							/>
						)
					})}
				</div>
			)
		}

		return (
			<main>
				<BreadCrumbs />
				<section className="w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 items-center">
					{/* IMAGE */}
					<div className="w-10/12 lg:w-full lg:col-span-1">
						<Image
							src={productImageUrl}
							alt={title + " image"}
							layout='responsive'
							width={100}
							height={100}
						/>
					</div>
					{/* PRICE and TITLE and DESCRIPTION and ADD TO CART */}
					<div className="lg:col-span-2 space-y-4 lg:space-y-4">
						{/* PRICE and TITLE */}
						<div className="w-full flex flex-col items-start space-y-2 lg:space-y-10">
							<p className="text-main-blue font-nunito font-bold text-3xl">
								{title}
							</p>
							{specialPrice > 0 ? (
								<div className="flex flex-row space-x-4">
									<p className="text-main-blue font-nunito text-center text-xl line-through decoration-red-600">
										Rs. {currentPrice}
									</p>
									<p className="text-main-blue font-nunito text-center text-2xl">
										Rs. {specialPrice}
									</p>
								</div>
							) : (
								<p className="text-main-blue font-nunito text-center text-2xl">
									Rs. {currentPrice}
								</p>
							)}
						</div>
						{/* DESCRIPTION */}
						<div>
							<p className="font-nunito font-bold text-xl text-main-grey-500">
								{description}
							</p>
							<p className="font-nunito font-bold text-sm text-main-grey-500">
								{sku}
							</p>
						</div>
						<AddToCart />
					</div>
				</section>
			</main>
		)
	}

	const PageItems = () => {
		return (
			<div className="space-y-8">
				<Product />
				<RelatedProduct />
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={title} description={description} />
			<CategoryAndItemsLayout>
				<PageItems />
			</CategoryAndItemsLayout>
		</div>
	)
}

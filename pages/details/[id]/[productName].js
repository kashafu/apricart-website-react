import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Categories from "../../../components/Layout/components/Categories/Categories";
import RelatedProduct from "../../../components/Layout/components/RelatedProduct/RelatedProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";
import Cookies from 'universal-cookie';
import { base_url_api } from '../../../information.json'
import { getGeneralApiParams } from '../../../helpers/ApiHelpers'
import { toast } from 'react-toastify'
import axios from "axios";
import HeadTag from "../../../components/Layout/components/Head/HeadTag";
import minusIcon from '../../../public/assets/svgs/minusIcon.svg'
import plusIcon from '../../../public/assets/svgs/plusIcon.svg'

export default function ProductDetail() {
	const dispatch = useDispatch();
	const cookies = new Cookies();
	let isLoggedIn = cookies.get('cookies-token') != null
	const router = useRouter()
	const { id, productName } = router.query

	const [message, setMessage] = useState('Loading')
	const [product, setProduct] = useState(null)
	const [categories, setCategories] = useState(null)
	const [inStock, setInStock] = useState(true)
	const [qty, setQty] = useState(1)
	
	useEffect(() => {
		if(router.isReady){
			getProductDetailsApi()
		}
		getCategoriesApi()
	}, [router.query])

	const setQtyHandler = (type) => {
		if (type == 'increment') {
			if (qty == product.data[0].maxQty) {
				return
			}
			setQty(qty + 1)
		}
		else if (type == 'decrement') {
			if (qty == product.data[0].minQty) {
				return
			}
			setQty(qty - 1)
		}
	}

	const getCategoriesApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city + "&userid=" + userId 

		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getProductDetailsApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url = base_url_api + '/catalog/products/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart&userid=' + userId
		// console.log(url)
		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			// console.log(response.data)
			if (response.data.data.length > 0) {
				setProduct(response.data)
			}
			else{
				setMessage('Item does not exist')
			}
		} catch (error) {
			toast.error(error?.response?.data?.message)
			console.log(error)
			setMessage('Item does not exist')
		}
	}

	const addToCartApi = async () => {
		let { city, userId, headers } = getGeneralApiParams()

		if (isLoggedIn) {
			let data = {
				cart: [{
					'sku': product.data[0].sku,
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
					...product.data[0]
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
					'sku': product.data[0].sku,
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
					...product.data[0]
				}
				cartData.qty = qty

				dispatch(addToCart(cartData))
			} catch (error) {
				console.log(error?.response)
				toast.error(error?.response?.data?.message)
			}
		}
	}

	if (!product) {
		return (
			<div>
				<p>
					{message}
				</p>
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={'Product'} />
			{product.data.length > 0 ?
				(
					<div>
						<section className="popular_sec">
							<div className="container-fluid">
								<div className="row">
									<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
										{categories && (
											<div className="hidden lg:flex">
												<Categories
													categories={categories}
												/>
											</div>
										)}
									</div>
									<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
										<>
											<section className="ContentSec -m-[20px]">
												<div className="container-fluid">
													<div className="prothreeHead">
														<ol className="breadcrumb">
															<li>
																{" "}
																<a passHref="/">Home</a>{" "}
															</li>
															<li>
																<a passHref="/category/">{product.data[0].categoryleafName}</a>
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
																	src={product.data[0].productImageUrl}
																	classNameName="img-fluid"
																	alt=""
																/>
															</div>
														</div>
														<div className="col-12 col-sm-6  col-md-6  col-lg-6  col-xl-6  col-xxl-6">
															<div className="productD_head">
																<h3>{product.data[0].title}</h3>
																<hr />
																<h4>Rs. {product.data[0].currentPrice}</h4>
																<hr />
																<div className="productD_para">
																	<p>{product.data[0].description}</p>
																	<span>{product.data[0].sku}</span>
																</div>
																<div className="py-4">
																	<div className="flex flex-row w-full justify-between lg:justify-start lg:space-x-4">
																		{inStock && (
																			<div className="grid grid-cols-3 justify-items-center rounded overflow-hidden w-[100px] h-[40px] border-2">
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
																		{inStock ? (
																			// {/* ADD TO CART */}
																			<button className="flex items-center h-[40px]"
																				onClick={() => {
																					addToCartApi()
																				}}
																			>
																				<p className="text-white font-bold bg-main-blue py-2 px-4 rounded-xl">
																					ADD TO CART
																				</p>
																			</button>
																		) : (
																			<button className="w-1/2 h-[40px] px-2 bg-zinc-400 font-bold text-xs lg:text-md rounded text-white"
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
				:
				(
					<div>
						<p>
							Item does not exist
						</p>
					</div>
				)
			}
		</div>
	);
}
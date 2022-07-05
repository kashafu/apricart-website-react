import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Categories from "../../components/Layout/components/Categories/Categories";
import RelatedProduct from "../../components/Layout/components/RelatedProduct/RelatedProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Cookies from 'universal-cookie';
import { base_url_api } from '../../information.json'
import { getGeneralApiParams } from '../../helpers/ApiHelpers'
import axios from "axios";

export default function Post({ product }) {
	let [num, setNum] = useState(1);
	const dispatch = useDispatch();
	const cookies = new Cookies();
	let isLoggedIn = cookies.get('cookies-token') != null 
	const router = useRouter()
	const { id } = router.query
	console.log(router.query)

	const [categories, setCategories] = useState(null)
	const [inStock, setInStock] = useState(true)

	useEffect(()=>{
		getCategoriesApi()
		getInStockApi()
	}, [])

	const getCategoriesApi = async () => {
		let {city, headers} = getGeneralApiParams()
		let url = base_url_api + '/catalog/categories?level=all&client_type=apricart&city=' + city
		
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

	const getInStockApi = async () => {
		let {city, headers, userId} = getGeneralApiParams()
		let url = base_url_api + '/catalog/products/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart&userid=' + userId
		// console.log(url)
		try {
			let response = await axios.get(url, 
				{
					headers: headers
				}
			)
			// console.log(response.data)
			if(response.data.data.length > 0){
				setInStock(response.data.data[0].inStock)
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (router.isFallback) {
		return (
			<div>
				<h2>Loading Page Data...</h2>
			</div>
		);
	}

	let incNum = () => {
		if (num < 5) {
			setNum(Number(num) + 1);
		}
	};
	let decNum = () => {
		if (num > 0) {
			setNum(num - 1);
		}
	};

	// const Cartapi = (list) => {
	// 	const data =
	// 	{
	// 		cart:
	// 			[
	// 				{
	// 					sku: list.sku,
	// 					qty: "1"
	// 				}
	// 			]
	// 	}
	// 	console.log(data.cart)

	// 	if (token) {
	// 		console.log("AVG ")
	// 		console.log(list.sku);
	// 		const response = axios.post('https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en', data, {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: "Bearer " + cookies.get("cookies-token"),
	// 			},
	// 		}

	// 		);
	// 	}

	// }

	const addToCartHandler = async (item) => {
        let { city, userId, headers } = getGeneralApiParams()

        if(isLoggedIn){
            let data = {
                cart: [{
					'sku': item.sku,
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
        else{
            let data = {
                userId: userId,
                cart: [{
                        'sku': item.sku,
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

	if(!product){
		return(
			<div>
				<p>
					Item does not exist
				</p>
			</div>
		)
	}

	return (
		<div>
			{product.data.length > 0 ?
				(
					<div>
						<section className="popular_sec">
							<div className="container-fluid">
								<div className="row">
									<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
										{categories && (
											<div>
												<Categories
													categories={categories}
												/>
											</div>
										)}
									</div>
									<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
										<>
											<section className="ContentSec">
												<div className="container-fluid">
													<div className="prothreeHead">
														<ol className="breadcrumb">
															<li>
																{" "}
																<a passHref="">Home</a>{" "}
															</li>
															<li>
																<a passHref="">{product.data[0].categoryleafName}</a>
															</li>
															<li>
																<a passHref="">{product.data[0].title}</a>
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
																<ul className="detail-pro">
																	<li>
																		{inStock == true ? (
																			<div
																				className="pro_btn2"
																				onClick={() => {
																					addToCartHandler(product.data[0]);
																					dispatch(addToCart(product.data[0]))
																				}
																				}
																			>
																				<a
																					href="#"
																					className="btn btn-primary chane chane1"
																				>
																					Add to Cart
																				</a>
																			</div>
																		) : (
																			<>
																				<div className="pro_btn2">
																					<a
																						passHref="#"
																						className="btn btn chane chane1 secondary"
																						disabled
																					>
																						Out of stock
																					</a>
																				</div>
																			</>
																		)}
																	</li>
																</ul>
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

export async function getStaticPaths() {
	// TODO implement get static paths properly
	const paths = ["/details/[id]", "/details/[slug]"];
	return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ query, params }) {
	const { id } = query || params;
	let { headers } = getGeneralApiParams()
	let city = 'karachi'
	// let userId = 'desktopuser_1656325126007'
	// let url = base_url_api + '/catalog/products/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart&userid=' + userId
	let url = base_url_api + '/catalog/products/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart'
	let product = null
	try {
		let response = await axios.get(url,
			{
				headers: headers
			})
		product = response.data;
	} catch (error) {
		console.log(error)
	}

	return {
		props: {
			product,
		},
		revalidate: 200
	};
}

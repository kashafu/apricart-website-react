import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useContext, useCallback } from "react";
import Link from "next/link";
import { AppContext } from "../../Layout";
import { useRouter } from "next/router";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	updatedcart,
	initialize
} from "../../../../redux/cart.slice";
import axios from "axios";
import Cookies from 'universal-cookie';
import { base_url_api } from '../../../../information.json'
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { toast } from "react-toastify";


export default function SlideDrawer(props) {
	const cookies = new Cookies();
	const router = useRouter();
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	let { appState, handleAppState } = useContext(AppContext)

	const [discount, setDiscount] = useState("none");
	const [cartData, setCartData] = useState([]);
	const [total, setTotal] = useState([]);
	const [option, setOption] = useState([]);


	let { token } = getGeneralApiParams()
	let drawerClasses = "side-drawer";
	if (props.show) {
		drawerClasses = "side-drawer open";
	}

	useEffect(() => {
		getCartDataApi()
	}, [])

	const hideSideDrawer = () => {
		handleAppState({
			"drawerOpen": false
		})
	}

	const getCartDataApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		// let lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : '0'
		// let long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : '0'
		let lat = 0
		let long = 0
		let body = {
			"coupon": '',
			"notes": '',
			"paymentMethod": 'cash',
			// 'address': checkoutAddress ? JSON.parse(checkoutAddress).id : '',
			'address': 0,
			'showProducts': true,
			'verify': true,
			"prodType": "cus",
			"day": "",
			"startTime": "",
			"endTime": "",
			"clientType": "apricart",
			"orderType": "delivery",
		}
		let url = base_url_api + '/order/cart/checkout?city=' + city + '&userid=' + userId + '&client_lat=' + lat + '&client_long=' + long + '&lang=en&client_type=apricart'

		try {
			let response = await axios.post(url, body, {
				headers: headers
			})

			dispatch(initialize(response.data.data.products))
			setCartData(response.data.data)
		} catch (error) {
			setCartData(null)
			console.log(error)
		}
	}

	const getTotalPrice = () => {
		return cart.reduce(
			(accumulator, item) => accumulator + item.qty * item.currentPrice, 0
		)
	}

	const updateItemQty = async (sku, qty) => {
		let { token, headers, city, userId } = getGeneralApiParams()

		if (token) {
			let url = base_url_api + '/order/cart/updateqty?city=' + city + '&lang=en&client_type=apricart'
			let body = {
				"cart": [
					{
						"sku": sku,
						"qty": qty
					}
				]
			}

			try {
				let response = await axios.post(url, body, {
					headers: headers
				})

				getCartDataApi()
			} catch (error) {
				console.log(error?.response)
				toast.error(error?.response?.data?.message)
			}
		}
		else {
			let url = base_url_api + '/guest/cart/updateqty?city=' + city + '&lang=en&client_type=apricart'
			let body = {
				'userId': userId,
				"cart": [
					{
						"sku": sku,
						"qty": qty
					}
				]
			}

			console.log("URL", url)
			console.log("BODY", body)

			try {
				let response = await axios.post(url, body, {
					headers: headers
				})

				getCartDataApi()
			} catch (error) {
				console.log(error?.response)
				toast.error(error?.response?.data?.message)
			}
		}
	}

	const deleteItem = (item) => {
		if (token) {
			let { city, userId, headers } = getGeneralApiParams()
			let url = base_url_api + '/order/cart/delete?city=' + city + '&lang=en&client_type=apricart'
			let body = {
				"cart": [
					{
						"sku": item.sku
					}
				]
			}

			try {
				let response = axios.delete(url,
					{
						headers: headers,
						data: body
					}
				)
			} catch (error) {
				console.log(error)
			}
		}
		else {
			let { city, userId, headers } = getGeneralApiParams()
			let url = base_url_api + '/guest/cart/delete?city=' + city + '&lang=en&client_type=apricart'
			let body = {
				"userId": userId,
				"cart": [
					{
						"sku": item.sku
					}
				]
			}

			try {
				let response = axios.delete(url,
					{
						headers: headers,
						data: body
					}
				)
			} catch (error) {
				console.log(error)
			}
		}

	}

	return (
		<>
			<div className="sidebarD">
				<div className={drawerClasses}>
					{/* <div className={drawerStyle}> */}
					<div className="cart-header1">
						<img src="/assets/images/bag.png" className="img-fluid cartinner" alt="" />
						<span>My Cart({cart.length})</span>
					</div>
					{cart.length === 0 ? (
						<>
							<h4 className="emptyCart">No items in your cart</h4>
							<div className="cartShoping">
								{/* <span className="startshoping">Start Shopping</span> */}
								{/* <h5 className="emptyCart">Fast & Free Delivery</h5> */}
							</div>
						</>
					) : (
						<>
							<div className="cart_body">
								{cart.map((item) => {
									console.log(item);
									const { id, productImageUrl, title, currentPrice, sku, qty } = item
									return (
										<div className="item cartitem space-x-12" key={id}>
											<div className="image1">
												{" "}
												<img
													src={productImageUrl}
													alt=""
													className="img-fluid"
												/>{" "}
											</div>
											<div className="grid grid-rows-2">
												<p>{title}</p>
												<div className="flex flex-row justify-between">
													<div className="cart-quan">
														<button
															className="minus-btn"
															type="button"
															name="button"
															onClick={() => {
																dispatch(decrementQuantity(id));
																updateItemQty(sku, qty - 1)
																// UpdateQty(item, 0, qty);
															}}

														>
															<i className="fa fa-minus px-1" aria-hidden="true"></i>
														</button>
														<p>{item.qty}</p>
														<button
															className="plus-btn"
															type="button"
															name="button"
															href="#"
															onClick={() => {
																dispatch(incrementQuantity(id));
																updateItemQty(sku, qty + 1)
																// UpdateQty(item, 1, qty);
															}}
														>
															<i className="fa fa-plus px-1" aria-hidden="true"></i>
														</button>
													</div>
													<p className="">
														RS :{item.currentPrice}
													</p>
													<span
														className="delete-btn"
														onClick={() => {
															deleteItem(item);
															dispatch(removeFromCart(id))
														}
														}
													>
														<i className="fa fa-trash" aria-hidden="true"></i>
													</span>
												</div>
											</div>
											<div className="buttons float-end">
												{" "}

												{/* <h3>
						RS. <strong> {getProductPrice}</strong>
					</h3>{" "} */}
											</div>
										</div>
									);
								})}
							</div>
							<div className="cart_footer">
								{/* <div className="freehome_d">
									<div className="freehome_title">
										<input
											type="radio"
											name="discount"
											value="none"
											checked={discount === "none"}
											onChange={handleDiscount}
										/>
										Home Delivery{" "}
									</div>
									<div className="freehome_title">
										<input
											type="radio"
											name="discount"
											value="availble"
											checked={discount === "availble"}
											onChange={handleDiscount}
										/>
										Pick from Apricart Click & Collect Store (With 3% Discount){" "}
									</div>
								</div> */}
								<div className="sub_tot">
									{discount == "none" ? (
										<h5 className="h5tot">Sub Total :{getTotalPrice()}</h5>
									) : (
										<h5 className="h5tot">Sub Total :{Math.floor(Avail)}</h5>
									)}
								</div>

								<div className="check_o_btn">
									<button onClick={() => {
										hideSideDrawer()
										drawerClasses = 'side-drawer'
										if (token) {
											router.push('/checkout')
											// router.reload()
										}
										else {
											router.push('/login')
										}
									}}>
										Check Out
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};


// later updates
//CART DONE
//login with cbe
//cart increment ;
//remaining


//guest user order increment
//order by guest

//













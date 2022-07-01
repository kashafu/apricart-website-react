import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from "../redux/cart.slice";
import Cookies from 'universal-cookie';
import AddressCard from '../components/Layout/components/Address/AddressCard'
import { base_url_api } from '../information.json'
import { getGeneralApiParams } from "../helpers/ApiHelpers";
import SelectAddress from "../components/Layout/components/Address/SelectAddress";
import ErrorText from "../components/Layout/components/Typography/ErrorText";

const Checkout = () => {
	const cookies = new Cookies();
	let token = cookies.get('cookies-token')

	if (!token) {
		return (
			<h5 className='login-token'> Please Login First</h5>
		)
	}

	const cart = useSelector((state) => state.cart);
	const getTotalPrice = () => {
		return cart.reduce(
			(accumulator, item) => accumulator + item.quantity * item.currentPrice,
			0
		);
	};
	var data = {
		"coupon": "",
		"address": 4582,
		"clientType": "apricart",
		"orderType": "delivery",
		"prodType": "cus",
		"day": "",
		"startTime": "",
		"endTime": "",
		"notes": "test order",
		"showProducts": true,
		"verify": false,
		"paymentMethod": "cash"
	};

	// const [checkoutData, setCheckOutData] = useState({
	// 	"coupon": "",
	// 	"address": 5828,
	// 	"orderType": "delivery",
	// 	"notes": "delivery bhejo",
	// 	"showProducts": true,
	// 	"verify": false,
	// 	"paymentMethod": "cash"
	// })
	const [checkoutData, setCheckOutData] = useState({
		"coupon": '',
		"notes": "",
		"paymentMethod": ""
	})
	const [checkoutAddress, setCheckoutAddress] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	// view state can be either 'checkout' or 'success'
	const [viewState, setViewState] = useState('checkout')
	const [successResponse, setSuccessResponse] = useState(null)

	/*
		in checkout api we have to set verify 'false' and pass the selected address lat long in url params
	*/
	const checkoutApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : ''
		let long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : ''
		let body = {
			...checkoutData,
			'address': checkoutAddress ? JSON.parse(checkoutAddress).id : '',
			'showProducts': true,
			'verify': false,
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

			setErrorMessage('')
			setViewState('success')
			setSuccessResponse(response.data)
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}

		// try {
		// 	console.log(cookies.get("userId"));
		// 	const response = await axios.post(
		// 		`https://staging.apricart.pk/v1//order/cart/checkout?city=karachi&lang=en&userid=${cookies.get('cookies-userId')}&client_lat=24.909230104621333&client_long=67.12185373161728`, checkoutData, {
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json',//'https://staging.apricart.pk/v1/order/cart/checkout?userid=10638&city=karachi&lang=en&client_lat=24.909230104621333&client_long=67.12185373161728'
		// 			'Authorization': 'Bearer ' + cookies.get('cookies-token'),
		// 		}
		// 	}
		// 	);
		// 	console.log("Checkout Data", response.data.data)
		// 	alert(response.data.message)
		// } catch (err) {
		// 	const Error = err.response.data.message;
		// }
	}

	const handleCheckoutDataChange = (e) => {
		let { name, value } = e.target
		setCheckOutData({...checkoutData, [name]: value})
	}

	return (
		<>
			<section className="popular_sec">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
							<section className="ContentSec">
								<div className="container-fluid">
									<div className="row">
										<div className="prothreeHead">
											<ol className="breadcrumb">
												<Link href="/" passHref>
													<li>
														{" "}
														<a passHref="#">Home</a>{" "}
													</li>
												</Link>
												<li>
													<a passHref="/cart">Cart</a>
												</li>
												<li className="is-current">Check Out</li>
											</ol>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</section>
			{viewState == 'checkout' && (
				<section className="delivery_sec">
					<div className="container-fluid">
						<div className="row">
							<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
								<div class="delivery_body_sec">
									<SelectAddress 
										type={'checkout'}
										setAddress={setCheckoutAddress}
									/>
									<div class="payment_m">
										<h4>Payment Method</h4>
										<div className="freehome_d">
											<div className="freehome_title">
												<input
													type="radio"
													name="paymentMethod"
													value="cash"
													onChange={handleCheckoutDataChange}
												/>
												Cash On Delivery{" "}
											</div>
											<div className="freehome_title">
												<input
													type="radio"
													name="paymentMethod"
													value="card"
													onChange={handleCheckoutDataChange}
												/>
												Credit/Debit Card{" "}

											</div>
											<div className="freehome_title">
												<input
													type="radio"
													name="paymentMethod"
													value="pickup"
													onChange={handleCheckoutDataChange}
												/>
												Pick from Apricart Click & Collect Store (With Extra Discount){" "}

											</div>
										</div>
										<textarea placeholder="Special Instructions"
											onChange={handleCheckoutDataChange}
											name={'notes'}
											value={checkoutData.notes}
										></textarea>

									</div>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
								<div className="cont_shop">
									<h3>
										<a passHref="#">Continue Shopping</a>
									</h3>
								</div>
								<div className="cont_shop_sec">
									<div className="billng_det">
										<h3>Billing Details</h3>
									</div>
									<div className="check_coupan">
										<div className="input-group mb-3">
											<input
												type="text"
												className="form-control"
												placeholder="Enter Coupon Code"
												aria-label="Recipient's username"
												aria-describedby="button-addon2"
												value={checkoutData.coupon}
												name={'coupon'}
												onChange={handleCheckoutDataChange}
											/>
											<button
												className="btn btn-outline-secondary"
												type="button"
												id="button-addon2"
											>
												Apply
											</button>
										</div>
									</div>
									<div className="billingsub_tot">
										<table style={{ width: "100%" }}>
											<tr>
												<td>
													Sub Total <sub>()</sub>
												</td>
												<td style={{ textAlign: "center" }}>
													Rs. {getTotalPrice()}
												</td>
											</tr>
											<tr>
												<td>Shipping</td>
												<td style={{ textAlign: "right" }}>Free</td>
											</tr>
											<tr>
												<td>Coupon</td>
												<td style={{ textAlign: "right" }}>---</td>
											</tr>
											<tr>
												<td>Total</td>
												<td style={{ textAlign: "right", color: "#08185A" }}>
													Rs. {getTotalPrice()}
												</td>
											</tr>
										</table>
										<button onClick={checkoutApi}>Check out</button>
										<ErrorText
											text={errorMessage}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
			{viewState == 'success' && (
				<section>
					{JSON.stringify(successResponse)}
				</section>
			)}
		</>
	);
};

export default Checkout;

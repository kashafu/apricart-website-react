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

	const [userAddresses, setUserAddresses] = useState([]);
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
		"address": '',
		"orderType": "",
		"notes": "",
		"paymentMethod": ""
	})
	const [showAddAddress, setShowAddAddress] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		getUserAddresses();
	}, [])

	const getUserAddresses = async () => {
		try {
			let { headers } = getGeneralApiParams()
			let url = base_url_api + '/home/address/delivery?lang=en&client_type=apricart'
			
			const response = await axios.get(
				url,
				{
					headers: headers
				}
			);
			setUserAddresses(response.data.data);
			console.log(response.data.data)
		} catch (error) {
			console.log(error.response.data.message)
		}
	}

	const handleCheckOut = async (e) => {
		let { headers, city, userId, selectedAddress } = getGeneralApiParams()
		let lat = selectedAddress.mapLat
		let long = selectedAddress.mapLong
		let body = {
			...checkoutData,
			'showProducts': true,
			// 'verify': false
		}
		let url = base_url_api + '/order/cart/checkout?city=' + city + '&userid=' + userId + '&client_lat=' + lat + '&client_long=' + long + '&lang=en&client_type=apricart'
		
		try {
			let response = await axios.post(url, body, {
				headers: headers
			})
			console.log(body)
			console.log(response)
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}

		e.preventDefault();
		try {
			console.log(cookies.get("userId"));
			const response = await axios.post(
				`https://staging.apricart.pk/v1//order/cart/checkout?city=karachi&lang=en&userid=${cookies.get('cookies-userId')}&client_lat=24.909230104621333&client_long=67.12185373161728`, checkoutData, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',//'https://staging.apricart.pk/v1/order/cart/checkout?userid=10638&city=karachi&lang=en&client_lat=24.909230104621333&client_long=67.12185373161728'
					'Authorization': 'Bearer ' + cookies.get('cookies-token'),
				}
			}
			);
			console.log("Checkout Data", response.data.data)
			alert(response.data.message)
		} catch (err) {
			const Error = err.response.data.message;
		}
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
			<section className="delivery_sec">
				<div className="container-fluid">
					<div className="row">
						<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
							<div class="delivery_body_sec">
								<SelectAddress />
								{/* <div class="d_address">
									<ul>
										<li><h4>Delivery Address</h4></li>
										<li><button onClick={() => setShowAddAddress(!showAddAddress)}>Add Address</button></li>
									</ul>
								</div>
								<div class="save_dropadd">

									<select>
										{userAddresses.map((addr) => {
											return (
												<option value={addr.googleAddress}>{addr.googleAddress}</option>//googleAddress
											)
										})}
									</select>
								</div>
								{showAddAddress == true && (
									<AddressCard
										type={'add'}
									/>
								)} */}
								<div class="payment_m">
									<h4>Payment Method</h4>
									<div className="freehome_d">
										<div className="freehome_title">
											<input
												type="radio"
												name="discount"
												value="none"

											/>
											Cash On Delivery{" "}
										</div>
										<div className="freehome_title">
											<input
												type="radio"
												name="discount"
												value="availble"

											/>
											Credit/Debit Card{" "}

										</div>
										<div className="freehome_title">
											<input
												type="radio"
												name="discount"
												value="availble"

											/>
											Pick from Apricart Click & Collect Store (With Extra Discount){" "}

										</div>
									</div>
									<textarea placeholder="Special Instructions"></textarea>

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
									<button onClick={handleCheckOut}>Check out</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Checkout;

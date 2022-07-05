import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { base_url_api } from '../information.json'
import { getGeneralApiParams } from "../helpers/ApiHelpers";
import SelectAddress from "../components/Layout/components/Address/SelectAddress";
import ErrorText from "../components/Layout/components/Typography/ErrorText";
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton";
import TextField from "../components/Layout/components/Input/TextField";
import parse from 'html-react-parser';
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, updatedcart } from "../redux/cart.slice";

export default function Checkout() {
	let { token } = getGeneralApiParams()
	const cart = useSelector((state) => state.cart)
	console.log(cart);
	const [paymentMethods, setPaymentMethods] = useState([])
	const [cartData, setCartData] = useState(null)
	const [checkoutData, setCheckOutData] = useState({
		"coupon": '',
		"notes": '',
		"paymentMethod": 'cash'
	})
	const [checkoutAddress, setCheckoutAddress] = useState(null)
	const [checkoutErrorMessage, setCheckoutErrorMessage] = useState('')
	const [addressErrorMessage, setAddressErrorMessage] = useState('')
	// view state can be either 'shipping', 'payment', 'review', 'success'
	const [viewState, setViewState] = useState('shipping')
	const [successResponse, setSuccessResponse] = useState(null)

	useEffect(() => {
		getPaymentMethodsApi()
	}, [])

	useEffect(() => {
		if (checkoutAddress) {
			getCartDataApi()
		}
	}, [checkoutAddress])

	const getPaymentMethodsApi = async () => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + '/order/payment/info?client_type=apricart'

		try {
			let response = await axios.get(url, {
				headers: headers
			})

			setPaymentMethods(response.data.data)
		} catch (error) {
			console.log(error.response)
		}
	}

	const getCartDataApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : '0'
		let long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : '0'
		let body = {
			"coupon": '',
			"notes": '',
			"paymentMethod": 'cash',
			'address': checkoutAddress ? JSON.parse(checkoutAddress).id : '',
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

		console.log(headers, body, url);

		try {
			let response = await axios.post(url, body, {
				headers: headers
			})

			setAddressErrorMessage('')
			setCartData(response.data.data)
		} catch (error) {
			setAddressErrorMessage(error.response.data.message)
			setCartData(null)
		}
	}

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

			setCheckoutErrorMessage('')
			setSuccessResponse(response.data)
			setViewState('success')
		} catch (error) {
			setCheckoutErrorMessage(error.response.data.message);
		}
	}

	const handleCheckoutDataChange = (e) => {
		let { name, value } = e.target
		setCheckOutData({ ...checkoutData, [name]: value })
	}

	if (!token) {
		return (
			<h5 className='login-token'> Please Login First</h5>
		)
	}

	return (
		<div>
			<div className="flex flex-col md:grid md:grid-cols-3">
				<div className="col-span-2">
					<div className="flex flex-row justify-around pb-6 md:pb-12">
						<div className="flex flex-col items-center">
							<p className="font-extrabold">
								O
							</p>
							<p>
								SHIPPING
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-extrabold">
								O
							</p>
							<p>
								PAYMENT
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-extrabold">
								O
							</p>
							<p>
								REVIEW
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-extrabold">
								O
							</p>
							<p>
								DETAILS
							</p>
						</div>
					</div>
					{viewState == 'shipping' && (
						<section className="">
							<div>
								<SelectAddress
									type={'checkout'}
									setAddress={setCheckoutAddress}
								/>
								<ErrorText
									text={addressErrorMessage}
								/>
								<div>
									{paymentMethods.map((method) => {
										let { id, name, key, description } = method
										return (
											<div key={id}>
												<input
													value={key}
													name={'paymentMethod'}
													type={'radio'}
													onChange={(e) => {
														handleCheckoutDataChange(e)
													}}
													checked={checkoutData.paymentMethod == key}
												/>
												{name}
											</div>
										)
									})}
								</div>
								<TextField
									label={"Special Instructions"}
									placeHolder={"instructions"}
									customOnChange={true}
									onChange={handleCheckoutDataChange}
									name={'notes'}
									value={checkoutData.notes}
								/>
							</div>
						</section>
					)}
					{viewState == 'success' && (
						<section className="flex items-center justify-center align-center m-auto">
							<div>
								{parse(successResponse.message)}
							</div>
							<div className="">
								<Image
									src={successResponse.data.thankyou_image}
									layout={'responsive'}
									width={100}
									height={100}
								/>
							</div>

							{JSON.stringify(successResponse.data.thankyou_image)}
						</section>
					)}
				</div>
				{/* CART DIV */}
				<div className="col-span-1">
					{/* CART ITEMS */}
					<div className="overflow-y-auto">
						
					</div>
					{cartData && (
								<div>
									<p>
										YOUR ORDER
									</p>
									<div className="grid grid-cols-2">
										<div className="col-span-2 grid grid-cols-2">
											<div>
												{cartData.products.map((item) => {
													let { title, qty, currentPrice } = item
													return (
														<div>
															<p>
																{title}
															</p>
															<p>
																{qty}
															</p>
															<p>
																{currentPrice}
															</p>
														</div>
													)
												})}
											</div>
										</div>
										<p>
											Coupon
										</p>
										<p>
											{cartData.couponMessage}
										</p>
										<p>
											SubTotal
										</p>
										<p>
											{cartData.subtotal}
										</p>
										<p>
											Shipping
										</p>
										<p>
											{parse(cartData.shipment_message)}
											{/* {cartData.shipment_message} */}
										</p>
										<p>
											Shipping Fee
										</p>
										<p>
											{cartData.shipping_amount}
										</p>
										<p>
											Tax
										</p>
										<p>
											{cartData.tax}
										</p>
										<p>
											Total
										</p>
										<p>
											{cartData.grand_total}
										</p>
									</div>
									<SubmitButton
										text={"CHECKOUT"}
										onClick={checkoutApi}
									/>
									<ErrorText
										text={checkoutErrorMessage}
									/>
								</div>
							)}
				</div>
				{/* <section className="popular_sec">
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
				</section> */}
				
			</div>
		</div>
	)
}
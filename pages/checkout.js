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

// ICONS
import blueCircleIcon from '../public/assets/svgs/circle/filledBlueCircle.svg'
import blackCircleIcon from '../public/assets/svgs/circle/unfilledCircle.svg'
import plusIcon from '../public/assets/svgs/plusIcon.svg'
import minusIcon from '../public/assets/svgs/minusIcon.svg'
import trashIcon from '../public/assets/svgs/trashIcon.svg'

import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, updatedcart } from "../redux/cart.slice";
import SectionHeading from "../components/Layout/components/Typography/SectionHeading";
import InputLabelText from "../components/Layout/components/Typography/InputLabelText";

export default function Checkout() {
	let { token } = getGeneralApiParams()
	const cart = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	const [shipmentChargedAt, setShipmentChargedAt] = useState(0)
	const [shipmentFixAmount, setShipmentFixAmount] = useState(0)
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
		getOptionsDataApi()
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

	const incrementItemQty = async (sku, qty) => {
		let { headers, city } = getGeneralApiParams()
		let url = base_url_api + '/order/cart/updateqty?city=' + city + '&lang=en&client_type=apricart'
		let body = {
			"cart": [
				{
					"sku": sku,
					"qty": qty++
				}
			]
		}

		try {
			let response = await axios.post(url, body, {
				headers: headers
			})

			if(viewState != 'shipping'){
				getCartDataApi()
			}
		} catch (error) {
			console.log(error.response)
		}
	}

	const decrementItemQty = async (sku, qty) => {
		let { headers, city } = getGeneralApiParams()
		let url = base_url_api + '/order/cart/updateqty?city=' + city + '&lang=en&client_type=apricart'
		let body = {
			"cart": [
				{
					"sku": sku,
					"qty": qty--
				}
			]
		}

		try {
			let response = await axios.post(url, body, {
				headers: headers
			})

			if(viewState != 'shipping'){
				getCartDataApi()
			}
		} catch (error) {
			console.log(error.response)
		}
	}

	const deleteItem = (sku) => {
		if (token) {
			let { city, headers } = getGeneralApiParams()
			let url = base_url_api + '/order/cart/delete?city=' + city + '&lang=en&client_type=apricart'
			let body = {
				"cart": [
					{
						"sku": sku
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
						"sku": sku
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

			if (checkoutData.paymentMethod === 'meezan') {
				let { paymentUrl } = response.data.data
				window.open(paymentUrl, '_blank').focus()
			}
			setCheckoutErrorMessage('')
			setSuccessResponse(response.data)
			setViewState('review')
		} catch (error) {
			setCheckoutErrorMessage(error.response.data.message);
		}
	}

	const getOptionsDataApi = async () => {
		let url = base_url_api + '/options/all?client_type=apricart'

		try {
			let response = await axios.get(url)

			response.data.data.forEach((item)=>{
				if (item.key === 'shippment_charged_at'){
					setShipmentChargedAt(item.value)
				}
				if (item.key === 'shippment_fix_amount'){
					setShipmentFixAmount(item.value)
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleCheckoutDataChange = (e) => {
		let { name, value } = e.target
		setCheckOutData({ ...checkoutData, [name]: value })
	}

	const ProgressBar = ({ currentState, onClick }) => {
		let pStyle = 'font-lato text-md text-main-blue font-semibold'
		let divStyle = 'justify-self-center place-self-end'

		return (
			<div className="grid grid-cols-3 justify-items-center border-b-2 p-4">
				<button className={divStyle}
					onClick={() => {
						onClick('shipping')
					}}
					disabled={() => {
						if (currentState == 'review') {
							return true
						}
					}}
				>
					<Image
						src={currentState === 'shipping' ? blueCircleIcon : blackCircleIcon}
						alt={"icons"}
						height={20}
						width={20}
					/>
					<p className={pStyle}>
						SHIPPING
					</p>
				</button>
				<button className={divStyle}
					onClick={() => {
						onClick('payment')
					}}
					disabled={() => {
						if (currentState == 'review' || currentState == 'shipping') {
							return true
						}
					}}
				>
					<Image
						src={currentState === 'payment' ? blueCircleIcon : blackCircleIcon}
						alt={"icons"}
						height={20}
						width={20}
					/>
					<p className={pStyle}>
						PAYMENT
					</p>
				</button>
				<button className={divStyle}
					onClick={() => {
						onClick('review')
					}}
					disabled={() => {
						if (currentState == 'shipping' || currentState == 'payment') {
							return true
						}
					}}
				>
					<Image
						src={currentState === 'review' ? blueCircleIcon : blackCircleIcon}
						alt={"icons"}
						height={20}
						width={20}
					/>
					<p className={pStyle}>
						REVIEW
					</p>
				</button>
				{/* <button className={divStyle}
					onClick={() => {
						onClick('details')
					}}
				>
					<Image
						src={currentState === 'details' ? blueCircleIcon : blackCircleIcon}
						alt={"icons"}
						height={20}
						width={20}
					/>
					<p className={pStyle}>
						DETAILS
					</p>
				</button> */}
			</div>
		)
	}

	const Cart = ({ currentState }) => {
		let pLeft = 'font-lato text-md text-main-blue'
		let pRight = 'font-lato text-lg font-bold text-right'

		const getTotalPrice = () => {
			return cart.reduce(
				(accumulator, item) => accumulator + item.quantity * item.currentPrice, 0
			)
		}

		if (currentState === 'shipping') {
			return (
				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
					<div className="overflow-y-auto p-4 h-96 space-y-4">
						{cart.map((item) => {
							let { title, quantity, currentPrice, id, productImageUrlThumbnail, productImageUrl, sku } = item
							return (
								<div key={id} className='flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2'>
									<div className="relative h-[100px] w-[100px]">
										<Image
											src={productImageUrlThumbnail ? productImageUrlThumbnail : productImageUrl}
											layout={'fill'}
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p>
											{title}
										</p>
										<div className="flex flex-row space-x-4">
											<button
												onClick={() => {
													dispatch(decrementQuantity(id))
													decrementItemQty(sku, quantity)
												}}
											>
												<Image
													src={minusIcon}
													height={20}
													width={20}
												/>
											</button>
											<p>
												{quantity}
											</p>
											<button
												onClick={() => {
													dispatch(incrementQuantity(id))
													incrementItemQty(sku, quantity)
												}}
											>
												<Image
													src={plusIcon}
													height={20}
													width={20}
												/>
											</button>
											<button
												onClick={() => {
													dispatch(removeFromCart(id))
													deleteItem(sku)
												}}
											>
												<Image
													src={trashIcon}
													height={20}
													width={20}
												/>
											</button>
											<p>
												x RS. {currentPrice}
											</p>
										</div>
										<p>
											RS. {currentPrice * quantity}
										</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
						<p className={pLeft}>
							SubTotal
						</p>
						<p className={pRight}>
							PKR {getTotalPrice()}
						</p>
						<p className={pLeft}>
							Shipping
						</p>
						{getTotalPrice() < shipmentChargedAt ? (
							<p className={pRight}>
								Add items worth PKR {shipmentChargedAt - getTotalPrice()} more to avail free shipping
							</p>
						):(
							<p className={pRight}>
								Free Shipping
							</p>
						)}
						<p className={pLeft}>
							Shipping Amount
						</p>
						{getTotalPrice() < shipmentChargedAt ? (
							<p className={pRight}>
								PKR {shipmentFixAmount}
							</p>
						):(
							<p className={pRight}>
								Free Shipping
							</p>
						)}
						<p className={pLeft}>
							Total
						</p>
						<p className={pRight}>
							PKR --
						</p>
					</div>
				</div>
			)
		}

		if (currentState === 'payment' || currentState === 'review') {
			let { subtotal, tax, shipping_amount, grand_total, shipment_message, base_currency_code } = cartData
			return (
				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
					<div className="overflow-y-auto p-4 h-96 space-y-4">
						{cartData.products.map((item) => {
							let { title, qty, currentPrice, id, productImageUrlThumbnail, productImageUrl, sku } = item
							return (
								<div key={id} className='flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2'>
									<div className="relative h-[100px] w-[100px]">
										<Image
											src={productImageUrlThumbnail ? productImageUrlThumbnail : productImageUrl}
											layout={'fill'}
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p>
											{title}
										</p>
										<div className="flex flex-row space-x-4">
											<button
												onClick={() => {
													dispatch(decrementQuantity(id))
													decrementItemQty(sku, qty)
												}}
											>
												-
											</button>
											<p>
												{qty}
											</p>
											<button
												onClick={() => {
													dispatch(incrementQuantity(id))
													incrementItemQty(sku, qty)
												}}
											>
												+
											</button>
											<p>
												x RS. {currentPrice}
											</p>
										</div>
										<p>
											RS. {currentPrice}
										</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
						<p className={pLeft}>
							SubTotal
						</p>
						<p className={pRight}>
							{subtotal}
						</p>
						<p className={pLeft}>
							Tax
						</p>
						<p className={pRight}>
							{base_currency_code} {tax}
						</p>
						<p className={pLeft}>
							Shipping
						</p>
						<p className={pRight}>
							{parse(shipment_message)}
						</p>
						<p className={pLeft}>
							Shipping Amount
						</p>
						<p className={pRight}>
							{base_currency_code} {shipping_amount}
						</p>
						<p className={pLeft}>
							Total
						</p>
						<p className={pRight}>
							{base_currency_code} {grand_total}
						</p>
					</div>
				</div>
			)
		}
	}

	if (!token) {
		return (
			<h5 className='login-token'> Please Login First</h5>
		)
	}

	if (cart.length == 0) {
		return (
			<h5 className='login-token'>YOUR CART IS EMPTY</h5>
		)
	}

	return (
		<div>
			<button
				onClick={async()=>{
					console.log("REDUX CART", cart)
					let { headers, city, userId } = getGeneralApiParams()
					let lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : '0'
					let long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : '0'
					let body = {
						"coupon": '',
						"notes": '',
						"paymentMethod": 'cash',
						'address': '0',
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
						console.log("API CART", response.data.data)
						// setAddressErrorMessage('')
						// setCartData(response.data.data)
					} catch (error) {
						console.log("API ERROR",error)
						// setAddressErrorMessage(error.response.data.message)
						// setCartData(null)
					}
				}}
			>
				SHOW SHIT
			</button>
			<div className="flex flex-col lg:grid lg:grid-cols-3 gap-28">
				<div className="col-span-2 space-y-12">
					<ProgressBar
						currentState={viewState}
						onClick={setViewState}
					/>
					{viewState == 'shipping' && (
						<section className="flex flex-col space-y-4">
							<SectionHeading
								text={"DELIVERY ADDRESS"}
							/>
							<SelectAddress
								type={'checkout'}
								setAddress={setCheckoutAddress}
								dropDownSelectedAddress={checkoutAddress}
							/>
							<ErrorText
								text={addressErrorMessage}
							/>
							<TextField
								label={"Special Instructions"}
								placeHolder={"instructions"}
								customOnChange={true}
								onChange={handleCheckoutDataChange}
								name={'notes'}
								value={checkoutData.notes}
							/>
							<SubmitButton
								text={"CONTINUE TO PAYMENT"}
								onClick={() => {
									setViewState('payment')
								}}
								disabled={cartData == null}
							/>
						</section>
					)}
					{viewState === 'payment' && (
						<section className="space-y-6">
							<SectionHeading
								text={"PAYMENT SELECTION"}
							/>
							<div className="space-y-2">
								<InputLabelText
									text={"Payment Method"}
								/>
								<div className="flex flex-row space-x-4">
									{paymentMethods.map((method) => {
										let { id, name, key } = method
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
							</div>
							<SubmitButton
								text={"CHECKOUT"}
								onClick={checkoutApi}
							/>
							<ErrorText
								text={checkoutErrorMessage}
							/>
						</section>
					)}
					{viewState == 'review' && (
						<section className="flex items-center justify-center align-center m-auto">
							<div>
								{parse(successResponse.message)}
							</div>
							<div className="">
								<Image
									src={successResponse.data.thankyou_image}
									layout={'responsive'}
									alt={"Thank You Image"}
									width={100}
									height={100}
								/>
							</div>

							{JSON.stringify(successResponse.data.thankyou_image)}
						</section>
					)}
				</div>
				{/* CART DIV */}
				<div className="col-span-1 h-full">
					<Cart
						currentState={viewState}
					/>
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
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import TextField from "../components/Layout/components/Input/TextField"
import parse from "html-react-parser"
import Image from "next/image"
import { toast } from "react-toastify"

// ICONS
import blueCircleIcon from "../public/assets/svgs/circle/filledBlueCircle.svg"
import blackCircleIcon from "../public/assets/svgs/circle/unfilledCircle.svg"
import plusIcon from "../public/assets/svgs/plusIcon.svg"
import minusIcon from "../public/assets/svgs/minusIcon.svg"
import trashIcon from "../public/assets/svgs/trashIcon.svg"
import missingImageIcon from "../public/assets/svgs/missingImageIcon.svg"

import { useSelector, useDispatch } from "react-redux"
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	updatedcart,
} from "../redux/cart.slice"
import SectionHeading from "../components/Layout/components/Typography/SectionHeading"
import InputLabelText from "../components/Layout/components/Typography/InputLabelText"
import HeadTag from "../components/Layout/components/Head/HeadTag"

export default function Checkout() {
	let { token, selectedAddress } = getGeneralApiParams()
	const reduxCart = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	const [shipmentChargedAt, setShipmentChargedAt] = useState(0)
	const [shipmentFixAmount, setShipmentFixAmount] = useState(0)
	const [paymentMethods, setPaymentMethods] = useState([])
	const [checkoutCartData, setCheckoutCartData] = useState(null)
	const [shippingCartData, setShippingCartData] = useState(null)
	const [checkoutData, setCheckOutData] = useState({
		coupon: "",
		notes: "",
		paymentMethod: "cash",
	})
	const [checkoutAddress, setCheckoutAddress] = useState(
		selectedAddress ? selectedAddress : null
	)
	const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("")
	const [addressErrorMessage, setAddressErrorMessage] = useState("")
	const [cartErrorMessage, setCartErrorMessage] = useState("")
	// view state can be either 'shipping', 'payment', 'review'
	const [viewState, setViewState] = useState("shipping")
	const [successResponse, setSuccessResponse] = useState(null)

	useEffect(() => {
		getPaymentMethodsApi()
		getOptionsDataApi()
		getShippingCartDataApi()
	}, [])

	useEffect(() => {
		if (checkoutAddress) {
			getCheckoutCartDataApi()
		}
	}, [checkoutAddress])

	const getPaymentMethodsApi = async () => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + "/order/payment/info?client_type=apricart"

		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setPaymentMethods(response.data.data)
		} catch (error) {
			console.log(error.response)
		}
	}

	const getShippingCartDataApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let lat = 0
		let long = 0
		let addressId = 0
		let body = {
			coupon: "",
			notes: "",
			paymentMethod: "cash",
			address: addressId,
			showProducts: true,
			verify: true,
			prodType: "cus",
			day: "",
			startTime: "",
			endTime: "",
			clientType: "apricart",
			orderType: "delivery",
		}
		let url =
			base_url_api +
			"/order/cart/checkout?city=" +
			city +
			"&userid=" +
			userId +
			"&client_lat=" +
			lat +
			"&client_long=" +
			long +
			"&lang=en&client_type=apricart"

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			})

			setAddressErrorMessage("")
			setShippingCartData(response.data.data)
		} catch (error) {
			setAddressErrorMessage(error?.response?.data?.message)
			setShippingCartData(null)
		}
	}

	const getCheckoutCartDataApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let lat = 0
		let long = 0
		let addressId = 0
		if (typeof checkoutAddress === "object") {
			lat = checkoutAddress ? checkoutAddress.mapLat : "0"
			long = checkoutAddress ? checkoutAddress.mapLong : "0"
			addressId = checkoutAddress ? checkoutAddress.id : ""
		} else {
			lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
			long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
			addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
		}
		let body = {
			coupon: "",
			notes: "",
			paymentMethod: "cash",
			address: addressId,
			showProducts: true,
			verify: true,
			prodType: "cus",
			day: "",
			startTime: "",
			endTime: "",
			clientType: "apricart",
			orderType: "delivery",
		}
		let url =
			base_url_api +
			"/order/cart/checkout?city=" +
			city +
			"&userid=" +
			userId +
			"&client_lat=" +
			lat +
			"&client_long=" +
			long +
			"&lang=en&client_type=apricart"

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			})

			setAddressErrorMessage("")
			setCheckoutCartData(response.data.data)
		} catch (error) {
			setAddressErrorMessage(error?.response?.data?.message)
			setCheckoutCartData(null)
		}
	}

	const incrementItemQty = async (sku, qty, id) => {
		let { headers, city } = getGeneralApiParams()
		let url =
			base_url_api +
			"/order/cart/updateqty?city=" +
			city +
			"&lang=en&client_type=apricart"
		let body = {
			cart: [
				{
					sku: sku,
					qty: qty + 1,
				},
			],
		}

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			})

			dispatch(incrementQuantity(id))
		} catch (error) {
			setCartErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		}

		if (viewState != "shipping") {
			getCheckoutCartDataApi()
		}
	}

	const decrementItemQty = async (sku, qty, id) => {
		let { headers, city } = getGeneralApiParams()
		let url =
			base_url_api +
			"/order/cart/updateqty?city=" +
			city +
			"&lang=en&client_type=apricart"
		let body = {
			cart: [
				{
					sku: sku,
					qty: qty - 1,
				},
			],
		}

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			})

			dispatch(decrementQuantity(id))
		} catch (error) {
			toast.error(error?.response?.data?.message)
			setCartErrorMessage(error?.response?.data?.message)
		}

		if (viewState != "shipping") {
			getCheckoutCartDataApi()
		}
	}

	const deleteItem = (sku, id) => {
		if (token) {
			let { city, headers } = getGeneralApiParams()
			let url =
				base_url_api +
				"/order/cart/delete?city=" +
				city +
				"&lang=en&client_type=apricart"
			let body = {
				cart: [
					{
						sku: sku,
					},
				],
			}

			try {
				let response = axios.delete(url, {
					headers: headers,
					data: body,
				})
				dispatch(removeFromCart(id))
			} catch (error) {
				console.log(error)
				toast.error(error?.response?.data?.message)
			}
		} else {
			let { city, userId, headers } = getGeneralApiParams()
			let url =
				base_url_api +
				"/guest/cart/delete?city=" +
				city +
				"&lang=en&client_type=apricart"
			let body = {
				userId: userId,
				cart: [
					{
						sku: sku,
					},
				],
			}

			try {
				let response = axios.delete(url, {
					headers: headers,
					data: body,
				})
				dispatch(removeFromCart(id))
			} catch (error) {
				console.log(error)
				toast.error(error?.response?.data?.message)
			}
		}

		if (viewState != "shipping") {
			getCheckoutCartDataApi()
		}
	}

	/*
		in checkout api we have to set verify 'false' and pass the selected address lat long in url params
	*/
	const checkoutApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let lat = 0
		let long = 0
		let addressId = 0
		if (typeof checkoutAddress === "object") {
			lat = checkoutAddress ? checkoutAddress.mapLat : "0"
			long = checkoutAddress ? checkoutAddress.mapLong : "0"
			addressId = checkoutAddress ? checkoutAddress.id : ""
		} else {
			lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
			long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
			addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
		}
		let body = {
			...checkoutData,
			address: addressId,
			showProducts: true,
			verify: false,
			prodType: "cus",
			day: "",
			startTime: "",
			endTime: "",
			clientType: "apricart",
			orderType: "delivery",
		}
		let url =
			base_url_api +
			"/order/cart/checkout?city=" +
			city +
			"&userid=" +
			userId +
			"&client_lat=" +
			lat +
			"&client_long=" +
			long +
			"&lang=en&client_type=apricart"

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			})

			if (checkoutData.paymentMethod === "meezan") {
				let { paymentUrl } = response.data.data
				window.open(paymentUrl, "_blank").focus()
			}
			setCheckoutErrorMessage("")
			setSuccessResponse(response.data)
			setViewState("review")
		} catch (error) {
			console.log(error)
			setCheckoutErrorMessage(error?.response?.data?.message)
		}
	}

	const getOptionsDataApi = async () => {
		let url = base_url_api + "/options/all?client_type=apricart"

		try {
			let response = await axios.get(url)

			response.data.data.forEach((item) => {
				if (item.key === "shippment_charged_at") {
					setShipmentChargedAt(item.value)
				}
				if (item.key === "shippment_fix_amount") {
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
		let pStyle = "font-lato text-md font-semibold"
		let divStyle = "justify-self-center place-self-end"

		return (
			<div className="grid grid-cols-3 justify-items-center border-b-2 pb-2">
				<button
					className={
						currentState == "shipping"
							? { divStyle } +
							  " bg-main-yellow text-main-blue px-2 rounded-xl"
							: { divStyle }
					}
					onClick={() => {
						onClick("shipping")
					}}
				>
					<p className={pStyle}>SHIPPING</p>
				</button>
				<button
					className={
						currentState == "payment"
							? { divStyle } +
							  " bg-main-yellow text-main-blue px-2 rounded-xl"
							: { divStyle }
					}
					onClick={() => {
						onClick("payment")
					}}
					disabled={() => {
						if (
							currentState == "review" ||
							currentState == "shipping"
						) {
							return true
						}
					}}
				>
					<p className={pStyle}>PAYMENT</p>
				</button>
				<button
					className={
						currentState == "review"
							? { divStyle } +
							  " bg-main-yellow text-main-blue px-2 rounded-xl"
							: { divStyle }
					}
					onClick={() => {
						onClick("review")
					}}
					disabled={() => {
						if (
							currentState == "shipping" ||
							currentState == "payment"
						) {
							return true
						}
					}}
				>
					<p className={pStyle}>COMPLETE</p>
				</button>
			</div>
		)
	}

	const Cart = ({ currentState }) => {
		let pLeft = "font-lato text-md text-main-blue"
		let pRight = "font-lato text-lg font-bold text-right"

		const getTotalPrice = () => {
			return reduxCart.reduce(
				(accumulator, item) =>
					accumulator + item.qty * item.currentPrice,
				0
			)
		}

		if (currentState === "shipping") {
			return (
				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
					<div className="overflow-y-auto p-4 h-96 space-y-4">
						{reduxCart.map((item) => {
							let {
								title,
								qty,
								currentPrice,
								id,
								productImageUrlThumbnail,
								productImageUrl,
								sku,
							} = item
							return (
								<div
									key={id}
									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
								>
									<div className="relative h-[100px] w-[100px]">
										<Image
											src={
												productImageUrlThumbnail
													? productImageUrlThumbnail
													: productImageUrl
													? productImageUrl
													: missingImageIcon
											}
											layout={"fill"}
											alt="thumbnail"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p>{title}</p>
										<div className="flex flex-row space-x-2 lg:space-x-4 items-center">
											<button
												onClick={() => {
													decrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={minusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>{qty}</p>
											<button
												onClick={() => {
													incrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={plusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<button
												onClick={() => {
													deleteItem(sku)
												}}
											>
												<Image
													src={trashIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>x RS. {currentPrice}</p>
										</div>
										<p>RS. {currentPrice * qty}</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
						<p className={pLeft}>SubTotal</p>
						<p className={pRight}>PKR {getTotalPrice()}</p>
						<p className={pLeft}>Shipping</p>
						{getTotalPrice() < shipmentChargedAt ? (
							<p className={[pRight] + " text-red-700"}>
								Add items worth PKR{" "}
								{shipmentChargedAt - getTotalPrice()} more to
								avail free shipping
							</p>
						) : (
							<p className={[pRight] + " text-green-700"}>
								Free Shipping
							</p>
						)}
						<p className={pLeft}>Shipping Amount</p>
						{getTotalPrice() < shipmentChargedAt ? (
							<p className={pRight}>PKR {shipmentFixAmount}</p>
						) : (
							<p className={pRight}>Free Shipping</p>
						)}
						<p className={pLeft}>Total</p>
						<p className={pRight}>PKR {getTotalPrice()}</p>
					</div>
				</div>
			)
		}

		if (currentState === "payment") {
			let {
				subtotal,
				tax,
				shipping_amount,
				grand_total,
				shipment_message,
				base_currency_code,
			} = checkoutCartData
			return (
				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
					<div className="overflow-y-auto p-4 h-96 space-y-4">
						{checkoutCartData.products.map((item) => {
							let {
								title,
								qty,
								currentPrice,
								id,
								productImageUrlThumbnail,
								productImageUrl,
								sku,
							} = item
							return (
								<div
									key={id}
									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
								>
									<div className="relative h-[100px] w-[100px]">
										<Image
											src={
												productImageUrlThumbnail
													? productImageUrlThumbnail
													: productImageUrl
													? productImageUrl
													: missingImageIcon
											}
											layout={"fill"}
											alt="thumbnail"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p>{title}</p>
										<div className="flex flex-row space-x-4">
											<button
												onClick={() => {
													decrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={minusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>{qty}</p>
											<button
												onClick={() => {
													incrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={plusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>x RS. {currentPrice}</p>
											<button
												onClick={() => {
													deleteItem(sku)
												}}
											>
												<Image
													src={trashIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
										</div>
										<p>RS. {currentPrice * qty}</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
						<p className={pLeft}>SubTotal</p>
						<p className={pRight}>{subtotal}</p>
						<p className={pLeft}>Tax</p>
						<p className={pRight}>
							{base_currency_code} {tax}
						</p>
						<p className={pLeft}>Shipping</p>
						<p className={pRight}>{parse(shipment_message)}</p>
						<p className={pLeft}>Shipping Amount</p>
						<p className={pRight}>
							{base_currency_code} {shipping_amount}
						</p>
						<p className={pLeft}>Total</p>
						<p className={pRight}>
							{base_currency_code} {grand_total}
						</p>
					</div>
				</div>
			)
		}

		if (currentState === "review") {
			let {
				subtotal,
				tax,
				shipping_amount,
				grand_total,
				shipment_message,
				base_currency_code,
			} = checkoutCartData
			return (
				<div className="hidden lg:flex flex-col w-full h-full justify-between bg-white rounded-3xl">
					<div className="overflow-y-auto p-4 h-96 space-y-4">
						{checkoutCartData.products.map((item) => {
							let {
								title,
								qty,
								currentPrice,
								id,
								productImageUrlThumbnail,
								productImageUrl,
								sku,
							} = item
							return (
								<div
									key={id}
									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
								>
									<div className="relative h-[100px] w-[100px]">
										<Image
											src={
												productImageUrlThumbnail
													? productImageUrlThumbnail
													: productImageUrl
													? productImageUrl
													: missingImageIcon
											}
											layout={"fill"}
											alt="thumbnail"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p>{title}</p>
										<div className="flex flex-row space-x-4">
											<button
												disabled={true}
												onClick={() => {
													decrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={minusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>{qty}</p>
											<button
												disabled={true}
												onClick={() => {
													incrementItemQty(
														sku,
														qty,
														id
													)
												}}
											>
												<Image
													src={plusIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<button
												disabled={true}
												onClick={() => {
													deleteItem(sku)
												}}
											>
												<Image
													src={trashIcon}
													height={20}
													width={20}
													alt="icon"
												/>
											</button>
											<p>x RS. {currentPrice}</p>
										</div>
										<p>RS. {currentPrice}</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
						<p className={pLeft}>SubTotal</p>
						<p className={pRight}>{subtotal}</p>
						<p className={pLeft}>Tax</p>
						<p className={pRight}>
							{base_currency_code} {tax}
						</p>
						<p className={pLeft}>Shipping</p>
						<p className={pRight}>{parse(shipment_message)}</p>
						<p className={pLeft}>Shipping Amount</p>
						<p className={pRight}>
							{base_currency_code} {shipping_amount}
						</p>
						<p className={pLeft}>Total</p>
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
			<>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token"> Please Login First</h5>
			</>
		)
	}

	if (reduxCart.length == 0) {
		return (
			<>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token">YOUR CART IS EMPTY</h5>
			</>
		)
	}

	if (!shippingCartData) {
		return (
			<div>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token">YOUR CART IS EMPTY</h5>
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={"Checkout"} />
			<div className="flex flex-col w-full lg:grid lg:grid-cols-5 2xl:grid 2xl:grid-cols-6 gap-2 divide-y lg:gap-28">
				<div className="lg:col-span-3 2xl:col-span-4 space-y-12">
					<ProgressBar
						currentState={viewState}
						onClick={setViewState}
					/>
					{viewState == "shipping" && (
						<section className="flex flex-col space-y-4 w-full">
							<div className="text-center">
								<SectionHeading text={"Delivery Details"} />
							</div>
							<SelectAddress
								type={"checkout"}
								setAddress={setCheckoutAddress}
								dropDownSelectedAddress={checkoutAddress}
							/>
							<ErrorText text={addressErrorMessage} />
							<div className="border-y py-1">
								<TextField
									label={"Special Instructions"}
									placeHolder={"instructions"}
									customOnChange={true}
									onChange={handleCheckoutDataChange}
									name={"notes"}
									value={checkoutData.notes}
								/>
							</div>
						</section>
					)}
					{viewState === "payment" && (
						<section className="space-y-6">
							<div className="text-center">
								<SectionHeading text={"PAYMENT SELECTION"} />
							</div>
							<div className="space-y-2">
								<InputLabelText text={"Payment Method"} />
								<div className="flex flex-col space-y-2">
									{paymentMethods.map((method) => {
										let { id, name, key } = method
										if (key === "jswallet") {
											return <div key={id}></div>
										}
										return (
											<div key={id}>
												<input
													value={key}
													name={"paymentMethod"}
													type={"radio"}
													onChange={(e) => {
														handleCheckoutDataChange(
															e
														)
													}}
													checked={
														checkoutData.paymentMethod ==
														key
													}
												/>
												{name}
											</div>
										)
									})}
								</div>
							</div>
							<ErrorText text={checkoutErrorMessage} />
						</section>
					)}
					{viewState == "review" && (
						<section className="flex flex-col items-center justify-center align-center m-auto space-y-2 p-12">
							<div className="text-center">
								{parse(successResponse.message)}
							</div>
							<div className="h-[120px] w-[450px]">
								<Image
									src={successResponse.data.thankyou_image}
									layout={"responsive"}
									alt={"Thank You Image"}
									width={450}
									height={120}
								/>
							</div>
						</section>
					)}
				</div>
				{/* CART DIV */}
				<div className="lg:col-span-2 2xl:col-span-2 h-full">
					<Cart currentState={viewState} />
				</div>
				{/* CHECKOUT BUTTON DIV */}
				<div className="col-span-5">
					{viewState === "shipping" && (
						<div>
							<SubmitButton
								text={
									checkoutCartData
										? "CONTINUE TO PAYMENT"
										: "SELECT ADDRESS"
								}
								onClick={() => {
									setViewState("payment")
									window.scroll({
										top: 0,
										left: 0,
										behavior: "smooth",
									})
								}}
								disabled={checkoutCartData == null}
							/>
						</div>
					)}
					{viewState === "payment" && (
						<div>
							<SubmitButton
								text={"CHECKOUT"}
								onClick={()=>{
									checkoutApi()
									window.scroll({
										top: 0,
										left: 0,
										behavior: "smooth",
									})
								}}
							/>
							<ErrorText text={checkoutErrorMessage} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

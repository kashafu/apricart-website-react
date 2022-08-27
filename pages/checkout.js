import { useState, useEffect } from "react"
import parse from "html-react-parser"
import Image from "next/image"
import { useSelector } from "react-redux"

import { getGeneralApiParams } from "../helpers/ApiHelpers"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import TextField from "../components/Layout/components/Input/TextField"
import SectionHeading from "../components/Layout/components/Typography/SectionHeading"
import InputLabelText from "../components/Layout/components/Typography/InputLabelText"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useInitialCartDataApi, usePickupLocationsApi } from "../helpers/Api"
import CheckoutCart from "../components/Layout/components/Cart/CheckoutCart"
import PickupLocationSelector from "../components/Layout/components/Selectors/PickupLocationSelector"

export default function Checkout() {
	let { token } = getGeneralApiParams()
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)
	const selectedPickupLocationSelector = useSelector((state) => state.general.pickupLocation)
	const reduxCart = useSelector((state) => state.cart)

	// view state can be either 'shipping', 'payment', 'review'
	const [viewState, setViewState] = useState("shipping")
	const [isCheckoutButtonPressed, setIsCheckoutButtonPressed] = useState(false)
	// special address is when regardless of selected address, this is the delivery address after checkout (used in saylani donations)
	const [specialAddress, setSpecialAddress] = useState('')

	// For the PickupLocation Component
	const [dayIdentifier, setDayIdentifier] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')

	const [couponCode, setCouponCode] = useState('')
	const { initialCartProducts, initialCartData, isLoading, errorMessage, response, setNotes, setCoupon, notes, setPaymentMethod, paymentMethod, setIsCheckout, couponMessage, paymentMethods, checkoutResponse, setDay, setStartTime, setEndTime, setIsFetchCart } = useInitialCartDataApi()
	const { pickupLocations, availableDates, response: pickupLocationsApiResponse, isLoading: pickupLocationsApiIsLoading } = usePickupLocationsApi()

	/*
		To check if checkout api response is succesful
	*/
	useEffect(() => {
		if (viewState === 'payment' && isCheckoutButtonPressed) {
			if (checkoutResponse) {
				setViewState('review')
			}
		}
	}, [checkoutResponse, viewState, isCheckoutButtonPressed])

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

	const PickupLocation = () => {
		let pStyle = "text-main-blue font-bold text-xs lg:text-xl"
		let divStyle = "grid grid-cols-1 items-center w-full h-full"
		let selectStyle = "h-full w-full py-2 lg:px-4 text-xs lg:text-lg rounded-lg bg-slate-200 h-[40px]"

		if (pickupLocationsApiIsLoading) {
			return (
				<>

				</>
			)
		}

		return (
			<div className="w-full grid-rows-4 text-center space-y-4">
				<p className="font-lato text-main-blue font-semibold">
					Select Pickup Details
				</p>
				{/* PICKUP LOCATION */}
				<div className={divStyle}>
					{/* <p className={pStyle}>
						Select Pickup Location
					</p> */}
					<div>
						<select
							className={selectStyle}
							disabled={false}
							onChange={(e) => {
								dispatch(updatePickupLocation(JSON.parse(e.target.value)))
								console.log(JSON.parse(e.target.value))
							}}
							value={selectedPickupLocationSelector}
						>
							<option
								value={''}
								disabled={true}
								selected={true}
							>
								Select Pickup Location
							</option>
							{pickupLocationsApiResponse && pickupLocations.map((location) => {
								return (
									<option
										selected={selectedPickupLocationSelector ? selectedPickupLocationSelector.id == location.id : false}
										key={location.id}
										value={JSON.stringify(location)}
									>
										{location.name}
									</option>
								)
							})}
						</select>
					</div>
				</div>
				{/* DATE SELECT */}
				<div className={divStyle}>
					{/* <p className={pStyle}>
						Select Delivery Date
					</p> */}
					<div>
						<select
							className={selectStyle}
							disabled={selectedPickupLocationSelector === '' ? true : false}
							onChange={(e) => {
								if (e.target.value !== '') {
									let parsed = JSON.parse(e.target.value)
									setSelectedDate(parsed)
									setDay(parsed.dateForServer)
									setDayIdentifier(parsed.identifier)
								}
							}}
							value={JSON.stringify(selectedDate)}
						>
							<option
								value={''}
								hidden={selectedDate !== ''}
							>
								Select Date
							</option>
							{availableDates.map((date) => {
								return (
									<option
										key={date.dateForServer}
										value={JSON.stringify(date)}
									>
										{date.displayDate}
									</option>
								)
							})}
						</select>
					</div>
				</div>
				{/* TIME SELECT */}
				<div className={divStyle}>
					{/* <p className={pStyle}>
						Select Time
					</p> */}
					<div>
						<select
							className={selectStyle}
							disabled={selectedDate === ''}
							onChange={(e) => {
								if (e.target.value !== '') {
									let parsed = JSON.parse(e.target.value)
									setSelectedTime(parsed)
									setStartTime(parsed.startTime)
									setEndTime(parsed.endTime)
								}
							}}
							value={JSON.stringify(selectedTime)}
						>
							<option
								value={''}
								hidden={selectedTime !== ''}
							>
								Select Time
							</option>
							{dayIdentifier !== '' && selectedPickupLocationSelector[dayIdentifier].map((time) => {
								return (
									<option
										key={time.displayTime}
										value={JSON.stringify(time)}
									>
										{time.displayTime}
									</option>
								)
							})}
						</select>
					</div>
				</div>
				<p className="font-semibold">
					Pickup location address is {selectedPickupLocationSelector.address}
				</p>
			</div>
		)
	}

	if (!token) {
		return (
			<>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token"> Please Login First</h5>
			</>
		)
	}

	if (selectedTypeSelector === 'cnc' && selectedPickupLocationSelector === '') {
		return (
			<div className="flex flex-col w-full items-center">
				<HeadTag title={"Checkout"} />
				<div className="space-y-2">
					<ErrorText
						text={"Select a pickup location before continuing"}
					/>
					<PickupLocationSelector />
				</div>
			</div>
		)
	}

	if (reduxCart.length == 0 && viewState !== "review") {
		return (
			<>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token">YOUR CART IS EMPTY</h5>
			</>
		)
	}

	if (!initialCartProducts) {
		return (
			<div>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token">YOUR CART IS EMPTY</h5>
			</div>
		)
	}

	return (
		<div className="h-full w-full">
			<HeadTag title={"Checkout"} />
			<div className="flex flex-col w-full h-full lg:grid lg:grid-cols-5 2xl:grid 2xl:grid-cols-6 gap-2 divide-y lg:gap-28">
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
							{selectedTypeSelector === 'cnc' ? (
								<PickupLocation />
							) : (
								<SelectAddress
									type={"checkout"}
									dropDownSelectedAddress={selectedAddressSelector}
								/>
							{specialAddress !== '' && (
								<ErrorText
									text={"A special item has been added, this will be delivered to: " + specialAddress}
								/>
							)}
							)}
							<ErrorText text={errorMessage} />
							<div className="border-y py-1">
								<TextField
									label={"Special Instructions"}
									placeHolder={"instructions"}
									onChange={setNotes}
									value={notes}
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
											<div key={id} className='flex items-center space-x-2'>
												<input
													value={key}
													type={"radio"}
													onChange={(e) => {
														setPaymentMethod(e.target.value)
													}}
													checked={paymentMethod === key}
												/>
												<p>
													{name}
												</p>
											</div>
										)
									})}
								</div>
							</div>
						</section>
					)}
					{viewState == "review" && (
						<>
							{isLoading ? (
								<div>
									Loading
								</div>
							) : (
								<section className="flex flex-col items-center justify-center align-center m-auto space-y-2 p-12">
									<div className="text-center">
										{parse(checkoutResponse.data.message)}
									</div>
									<div className="h-[120px] w-full">
										<Image
											src={checkoutResponse.data.data.thankyou_image}
											layout={"responsive"}
											alt={"Thank You Image"}
											width={450}
											height={120}
										/>
									</div>
								</section>
							)}
						</>
					)}
				</div>
				{/* CART DIV */}
				<div className="lg:col-span-2 2xl:col-span-2 h-full">
					<CheckoutCart
						initialCartProducts={initialCartProducts}
						initialCartData={initialCartData}
						isLoading={isLoading}
						fetchCart={setIsFetchCart}
					/>
				</div>
				{/* CHECKOUT BUTTON DIV */}
				<div className="col-span-4">
					{viewState === "shipping" && (
						<div>
							{selectedTypeSelector === 'cnc' ? (
								<SubmitButton
									text={
										selectedDate === '' || selectedTime === ''
											? "SELECT PICKUP LOCATION"
											: "CONTINUE TO PAYMENT"
									}
									onClick={() => {
										setViewState("payment")
										window.scroll({
											top: 0,
											left: 0,
											behavior: "smooth",
										})
									}}
									disabled={selectedDate === '' || selectedTime === ''}
								/>
							) : (
								<SubmitButton
									text={
										response
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
									disabled={response == null}
								/>
							)}
						</div>
					)}
					{viewState === "payment" && (
						<div className="space-y-4">
							{/* PROMO CODE */}
							<div className="flex flex-row w-full items-center space-x-4">
								<div className="w-4/6">
									<TextField
										label={'Promo Code'}
										placeHolder={'Enter Code'}
										onChange={setCouponCode}
										value={couponCode}
									/>
								</div>
								<div className="w-2/6">
									<SubmitButton
										text={'Apply'}
										onClick={() => {
											setCoupon(couponCode)
										}}
									/>
								</div>
							</div>
							{couponMessage !== 'Discount code not received' && (
								<p>
									{couponMessage}
								</p>
							)}
							<ErrorText text={errorMessage} />
							<SubmitButton
								text={"CHECKOUT"}
								onClick={() => {
									setIsCheckout(true)
									setIsCheckoutButtonPressed(true)
									window.scroll({
										top: 0,
										left: 0,
										behavior: "smooth",
									})
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}



















// import { useState, useEffect } from "react"
// import axios from "axios"
// import { base_url_api } from "../information.json"
// import { getGeneralApiParams } from "../helpers/ApiHelpers"
// import SelectAddress from "../components/Layout/components/Address/SelectAddress"
// import ErrorText from "../components/Layout/components/Typography/ErrorText"
// import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
// import TextField from "../components/Layout/components/Input/TextField"
// import parse from "html-react-parser"
// import Image from "next/image"
// import { toast } from "react-toastify"

// // ICONS
// import plusIcon from "../public/assets/svgs/plusIcon.svg"
// import minusIcon from "../public/assets/svgs/minusIcon.svg"
// import trashIcon from "../public/assets/svgs/trashIcon.svg"
// import missingImageIcon from "../public/assets/svgs/missingImageIcon.svg"

// import { useSelector, useDispatch } from "react-redux"
// import {
// 	incrementQuantity,
// 	decrementQuantity,
// 	removeFromCart,
// 	initialize
// } from "../redux/cart.slice"
// import SectionHeading from "../components/Layout/components/Typography/SectionHeading"
// import InputLabelText from "../components/Layout/components/Typography/InputLabelText"
// import HeadTag from "../components/Layout/components/Head/HeadTag"
// import { useInitialCartDataApi } from "../helpers/Api"

// const fullUrl = (url) => {
// 	let { city, userId, clientType, orderType, prodType } =
// 		getGeneralApiParams()

// 	return (
// 		base_url_api +
// 		url +
// 		"&city=" +
// 		city +
// 		"&userid=" +
// 		userId +
// 		"&client_type=" +
// 		clientType +
// 		"&prod_type=" +
// 		prodType +
// 		"&order_type=" +
// 		orderType +
// 		"&lang=en"
// 	)
// }

// export default function Checkout() {
// 	let { token, selectedAddress } = getGeneralApiParams()
// 	const reduxCart = useSelector((state) => state.cart)
// 	const dispatch = useDispatch()

// 	const [shipmentChargedAt, setShipmentChargedAt] = useState(0)
// 	const [shipmentFixAmount, setShipmentFixAmount] = useState(0)
// 	const [paymentMethods, setPaymentMethods] = useState([])
// 	const [checkoutCartData, setCheckoutCartData] = useState(null)
// 	const [checkoutData, setCheckOutData] = useState({
// 		coupon: "",
// 		notes: "",
// 		paymentMethod: "cash",
// 	})
// 	const [checkoutAddress, setCheckoutAddress] = useState(
// 		selectedAddress ? selectedAddress : null
// 	)
// 	const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("")
// 	const [addressErrorMessage, setAddressErrorMessage] = useState("")
// 	const [cartErrorMessage, setCartErrorMessage] = useState("")
// 	const [couponCodeMessage, setCouponCodeMessage] = useState('')
// 	// view state can be either 'shipping', 'payment', 'review'
// 	const [viewState, setViewState] = useState("shipping")
// 	const [successResponse, setSuccessResponse] = useState(null)
// 	// special address is when regardless of selected address, this is the delivery address after checkout (used in saylani donations)
// 	const [specialAddress, setSpecialAddress] = useState('')

// 	const { initialCartData } = useInitialCartDataApi()

// 	useEffect(() => {
// 		getOptionsDataApi()
// 	}, [])

// 	useEffect(() => {
// 		if (checkoutAddress) {
// 			getCheckoutCartDataApi()
// 		}
// 	}, [checkoutAddress])

// 	// checkout api with the selected address id
// 	const getCheckoutCartDataApi = async () => {
// 		let { headers, city, userId, clientType, prodType, orderType } = getGeneralApiParams()
// 		let lat = 0
// 		let long = 0
// 		let addressId = 0
// 		if (typeof checkoutAddress === "object") {
// 			lat = checkoutAddress ? checkoutAddress.mapLat : "0"
// 			long = checkoutAddress ? checkoutAddress.mapLong : "0"
// 			addressId = checkoutAddress ? checkoutAddress.id : ""
// 		} else {
// 			lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
// 			long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
// 			addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
// 		}
// 		let body = {
// 			coupon: '',
// 			notes: "",
// 			paymentMethod: "cash",
// 			address: addressId,
// 			showProducts: true,
// 			verify: true,
// 			prodType,
// 			day: "",
// 			startTime: "",
// 			endTime: "",
// 			clientType,
// 			orderType,
// 		}
// 		let url = "/order/cart/checkout?client_lat=" + lat + "&client_long=" + long

// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			setAddressErrorMessage("")
// 			setCheckoutCartData(response.data.data)
// 			setPaymentMethods(response.data.data?.paymentInfo)
// 		} catch (error) {
// 			setAddressErrorMessage(error?.response?.data?.message)
// 			setCheckoutCartData(null)
// 		}
// 	}

// 	const getCheckoutCouponCartDataApi = async () => {
// 		let { headers, city, userId, orderType, clientType, prodType } = getGeneralApiParams()
// 		let lat = 0
// 		let long = 0
// 		let addressId = 0
// 		if (typeof checkoutAddress === "object") {
// 			lat = checkoutAddress ? checkoutAddress.mapLat : "0"
// 			long = checkoutAddress ? checkoutAddress.mapLong : "0"
// 			addressId = checkoutAddress ? checkoutAddress.id : ""
// 		} else {
// 			lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
// 			long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
// 			addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
// 		}
// 		let body = {
// 			coupon: checkoutData.coupon,
// 			notes: "",
// 			paymentMethod: "cash",
// 			address: addressId,
// 			showProducts: true,
// 			verify: true,
// 			prodType,
// 			day: "",
// 			startTime: "",
// 			endTime: "",
// 			clientType,
// 			orderType,
// 		}
// 		let url = "/order/cart/checkout?client_lat=" + lat + "&client_long=" + long

// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			setAddressErrorMessage("")
// 			setCheckoutCartData(response.data.data)
// 			setCouponCodeMessage(response.data.data.couponMessage)
// 		} catch (error) {
// 			setAddressErrorMessage(error?.response?.data?.message)
// 			setCheckoutCartData(null)
// 		}
// 	}

// 	const incrementItemQty = async (sku, qty, id) => {
// 		let { headers, city, userId } = getGeneralApiParams()
// 		let url = "/order/cart/updateqty?"
// 		let body = {
// 			cart: [
// 				{
// 					sku: sku,
// 					qty: qty + 1,
// 				},
// 			],
// 		}

// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			dispatch(incrementQuantity(sku))
// 		} catch (error) {
// 			setCartErrorMessage(error?.response?.data?.message)
// 			toast.error(error?.response?.data?.message)
// 		}

// 		if (viewState != "shipping") {
// 			getCheckoutCartDataApi()
// 		}
// 	}

// 	const decrementItemQty = async (sku, qty, id) => {
// 		let { headers, city, userId } = getGeneralApiParams()
// 		let url = "/order/cart/updateqty?"
// 		let body = {
// 			cart: [
// 				{
// 					sku: sku,
// 					qty: qty - 1,
// 				},
// 			],
// 		}

// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			dispatch(decrementQuantity(sku))
// 		} catch (error) {
// 			toast.error(error?.response?.data?.message)
// 			setCartErrorMessage(error?.response?.data?.message)
// 		}

// 		if (viewState != "shipping") {
// 			getCheckoutCartDataApi()
// 		}
// 	}

// 	const deleteItem = (sku, id) => {
// 		if (token) {
// 			let { city, headers, userId } = getGeneralApiParams()
// 			let url = "/order/cart/delete?"
// 			let body = {
// 				cart: [
// 					{
// 						sku: sku,
// 					},
// 				],
// 			}

// 			try {
// 				let response = axios.delete(fullUrl(url), {
// 					headers: headers,
// 					data: body,
// 				})
// 				dispatch(removeFromCart(sku))
// 			} catch (error) {
// 				console.log(error)
// 				toast.error(error?.response?.data?.message)
// 			}
// 		} else {
// 			let { city, userId, headers } = getGeneralApiParams()
// 			let url = "/guest/cart/delete?"
// 			let body = {
// 				userId: userId,
// 				cart: [
// 					{
// 						sku: sku,
// 					},
// 				],
// 			}

// 			try {
// 				let response = axios.delete(fullUrl(url), {
// 					headers: headers,
// 					data: body,
// 				})
// 				dispatch(removeFromCart(sku))
// 			} catch (error) {
// 				console.log(error)
// 				toast.error(error?.response?.data?.message)
// 			}
// 		}

// 		if (viewState != "shipping") {
// 			getCheckoutCartDataApi()
// 		}
// 	}

// 	/*
// 		in checkout api we have to set verify 'false' and pass the selected address lat long in url params
// 	*/
// 	const checkoutApi = async () => {
// 		let { headers, city, userId, clientType, orderType, prodType } = getGeneralApiParams()
// 		let lat = 0
// 		let long = 0
// 		let addressId = 0
// 		if (typeof checkoutAddress === "object") {
// 			lat = checkoutAddress ? checkoutAddress.mapLat : "0"
// 			long = checkoutAddress ? checkoutAddress.mapLong : "0"
// 			addressId = checkoutAddress ? checkoutAddress.id : ""
// 		} else {
// 			lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
// 			long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
// 			addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
// 		}
// 		let body = {
// 			...checkoutData,
// 			address: addressId,
// 			showProducts: true,
// 			verify: false,
// 			prodType,
// 			day: "",
// 			startTime: "",
// 			endTime: "",
// 			clientType,
// 			orderType,
// 		}
// 		let url = "/order/cart/checkout?client_lat=" + lat + "&client_long=" + long

// 		toast.info('Processing Order')
// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			if (checkoutData.paymentMethod === "meezan") {
// 				let { paymentUrl } = response.data.data
// 				window.open(paymentUrl, "_blank").focus()
// 			}
// 			setCheckoutErrorMessage("")
// 			setSuccessResponse(response.data)
// 			setViewState("review")
// 			getCartDataApi()
// 		} catch (error) {
// 			console.log(error)
// 			setCheckoutErrorMessage(error?.response?.data?.message)
// 			toast.error(error?.response?.data?.message)
// 		}
// 	}

// 	// Used to make the redux cart empty
// 	const getCartDataApi = async () => {
// 		let { headers, city, userId, clientType, orderType, prodType } = getGeneralApiParams()
// 		let lat = 0
// 		let long = 0
// 		let body = {
// 			coupon: "",
// 			notes: "",
// 			paymentMethod: "cash",
// 			address: 0,
// 			showProducts: true,
// 			verify: true,
// 			prodType,
// 			day: "",
// 			startTime: "",
// 			endTime: "",
// 			clientType,
// 			orderType,
// 		}
// 		let url = "/order/cart/checkout?client_lat=" + lat + "&client_long=" + long

// 		try {
// 			let response = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})

// 			dispatch(initialize(response.data.data.products))
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	const getOptionsDataApi = async () => {
// 		let url = "/options/all?"

// 		try {
// 			let response = await axios.get(fullUrl(url))

// 			response.data.data.forEach((item) => {
// 				if (item.key === "shippment_charged_at") {
// 					setShipmentChargedAt(item.value)
// 				}
// 				if (item.key === "shippment_fix_amount") {
// 					setShipmentFixAmount(item.value)
// 				}
// 			})
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	const handleCheckoutDataChange = (e) => {
// 		let { name, value } = e.target
// 		setCheckOutData({ ...checkoutData, [name]: value })
// 	}

// 	const ProgressBar = ({ currentState, onClick }) => {
// 		let pStyle = "font-lato text-md font-semibold"
// 		let divStyle = "justify-self-center place-self-end"

// 		return (
// 			<div className="grid grid-cols-3 justify-items-center border-b-2 pb-2">
// 				<button
// 					className={
// 						currentState == "shipping"
// 							? { divStyle } +
// 							" bg-main-yellow text-main-blue px-2 rounded-xl"
// 							: { divStyle }
// 					}
// 					onClick={() => {
// 						onClick("shipping")
// 					}}
// 				>
// 					<p className={pStyle}>SHIPPING</p>
// 				</button>
// 				<button
// 					className={
// 						currentState == "payment"
// 							? { divStyle } +
// 							" bg-main-yellow text-main-blue px-2 rounded-xl"
// 							: { divStyle }
// 					}
// 					onClick={() => {
// 						onClick("payment")
// 					}}
// 					disabled={() => {
// 						if (
// 							currentState == "review" ||
// 							currentState == "shipping"
// 						) {
// 							return true
// 						}
// 					}}
// 				>
// 					<p className={pStyle}>PAYMENT</p>
// 				</button>
// 				<button
// 					className={
// 						currentState == "review"
// 							? { divStyle } +
// 							" bg-main-yellow text-main-blue px-2 rounded-xl"
// 							: { divStyle }
// 					}
// 					onClick={() => {
// 						onClick("review")
// 					}}
// 					disabled={() => {
// 						if (
// 							currentState == "shipping" ||
// 							currentState == "payment"
// 						) {
// 							return true
// 						}
// 					}}
// 				>
// 					<p className={pStyle}>COMPLETE</p>
// 				</button>
// 			</div>
// 		)
// 	}

// 	const Cart = ({ currentState }) => {
// 		let pLeft = "font-lato text-md text-main-blue"
// 		let pRight = "font-lato text-lg font-bold text-right"

// 		const getTotalPrice = () => {
// 			return reduxCart.reduce(
// 				(accumulator, item) => accumulator + item.qty * (item.specialPrice > 0 ? item.specialPrice : item.currentPrice),
// 				0
// 			)
// 		}

// 		if (currentState === "shipping") {
// 			return (
// 				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
// 					<div className="overflow-y-auto p-4 h-96 space-y-4">
// 						{reduxCart.map((item) => {
// 							let {
// 								title,
// 								qty,
// 								currentPrice,
// 								specialPrice,
// 								id,
// 								productImageUrlThumbnail,
// 								productImageUrl,
// 								sku,
// 							} = item
// 							return (
// 								<div
// 									key={id}
// 									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
// 								>
// 									<div className="relative h-[100px] w-[100px]">
// 										<Image
// 											src={
// 												productImageUrlThumbnail
// 													? productImageUrlThumbnail
// 													: productImageUrl
// 														? productImageUrl
// 														: missingImageIcon
// 											}
// 											layout={"fill"}
// 											alt="thumbnail"
// 										/>
// 									</div>
// 									<div className="flex flex-col justify-between">
// 										<p>{title}</p>
// 										<div className="flex flex-row space-x-2 lg:space-x-4 items-center">
// 											<button
// 												onClick={() => {
// 													decrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={minusIcon}
// 													height={10}
// 													width={10}
// 													alt="icon"
// 												/>
// 											</button>
// 											<p>{qty}</p>
// 											<button
// 												onClick={() => {
// 													incrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={plusIcon}
// 													height={12}
// 													width={12}
// 													alt="icon"
// 												/>
// 											</button>
// 											<button
// 												onClick={() => {
// 													deleteItem(sku)
// 												}}
// 												className="flex items-center justify-center"
// 											>
// 												<Image
// 													src={trashIcon}
// 													height={20}
// 													width={20}
// 													alt="icon"
// 												/>
// 											</button>
// 											{specialPrice > 0 ? (
// 												<p>x RS. {specialPrice}</p>
// 											) : (
// 												<p>x RS. {currentPrice}</p>
// 											)}
// 										</div>
// 										{specialPrice > 0 ? (
// 											<p>x RS. {specialPrice * qty}</p>
// 										) : (
// 											<p>x RS. {currentPrice * qty}</p>
// 										)}
// 									</div>
// 								</div>
// 							)
// 						})}
// 					</div>
// 					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
// 						<p className={pLeft}>SubTotal</p>
// 						<p className={pRight}>PKR {getTotalPrice()}</p>
// 						<p className={pLeft}>Shipping</p>
// 						{getTotalPrice() < shipmentChargedAt ? (
// 							<p className={[pRight] + " text-red-700"}>
// 								Add items worth PKR{" "}
// 								{shipmentChargedAt - getTotalPrice()} more to
// 								avail free shipping
// 							</p>
// 						) : (
// 							<p className={[pRight] + " text-green-700"}>
// 								Free Shipping
// 							</p>
// 						)}
// 						<p className={pLeft}>Shipping Amount</p>
// 						{getTotalPrice() < shipmentChargedAt ? (
// 							<p className={pRight}>PKR {shipmentFixAmount}</p>
// 						) : (
// 							<p className={pRight}>Free Shipping</p>
// 						)}
// 						<p className={pLeft}>Total</p>
// 						{getTotalPrice() < shipmentChargedAt ? (
// 							<p className={pRight}>PKR {+getTotalPrice() + +shipmentFixAmount}</p>
// 						) : (
// 							<p className={pRight}>PKR {getTotalPrice()}</p>
// 						)}
// 						{/* <p className={pRight}>PKR {getTotalPrice()}</p> */}
// 					</div>
// 				</div>
// 			)
// 		}

// 		if (currentState === "payment") {
// 			let {
// 				subtotal,
// 				tax,
// 				shipping_amount,
// 				grand_total,
// 				shipment_message,
// 				base_currency_code,
// 				couponDiscountAmount
// 			} = checkoutCartData
// 			return (
// 				<div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
// 					<div className="overflow-y-auto p-4 h-96 space-y-4">
// 						{checkoutCartData.products.map((item) => {
// 							let {
// 								title,
// 								qty,
// 								currentPrice,
// 								specialPrice,
// 								id,
// 								productImageUrlThumbnail,
// 								productImageUrl,
// 								sku
// 							} = item
// 							return (
// 								<div
// 									key={id}
// 									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
// 								>
// 									<div className="relative h-[100px] w-[100px]">
// 										<Image
// 											src={
// 												productImageUrlThumbnail
// 													? productImageUrlThumbnail
// 													: productImageUrl
// 														? productImageUrl
// 														: missingImageIcon
// 											}
// 											layout={"fill"}
// 											alt="thumbnail"
// 										/>
// 									</div>
// 									<div className="flex flex-col justify-between">
// 										<p>{title}</p>
// 										<div className="flex flex-row space-x-2 lg:space-x-4 items-center">
// 											<button
// 												onClick={() => {
// 													decrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={minusIcon}
// 													height={10}
// 													width={10}
// 													alt="icon"
// 												/>
// 											</button>
// 											<p>{qty}</p>
// 											<button
// 												onClick={() => {
// 													incrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={plusIcon}
// 													height={12}
// 													width={12}
// 													alt="icon"
// 												/>
// 											</button>
// 											{specialPrice > 0 ? (
// 												<p>x RS. {specialPrice}</p>
// 											) : (
// 												<p>x RS. {currentPrice}</p>
// 											)}
// 											<button
// 												onClick={() => {
// 													deleteItem(sku)
// 												}}
// 												className="flex items-center justify-center"
// 											>
// 												<Image
// 													src={trashIcon}
// 													height={20}
// 													width={20}
// 													alt="icon"
// 												/>
// 											</button>
// 										</div>
// 										{specialPrice > 0 ? (
// 											<p>x RS. {specialPrice * qty}</p>
// 										) : (
// 											<p>x RS. {currentPrice * qty}</p>
// 										)}
// 									</div>
// 								</div>
// 							)
// 						})}
// 					</div>
// 					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
// 						<p className={pLeft}>SubTotal</p>
// 						<p className={pRight}>{subtotal}</p>
// 						<p className={pLeft}>Tax</p>
// 						<p className={pRight}>
// 							{base_currency_code} {tax}
// 						</p>
// 						<p className={pLeft}>Shipping</p>
// 						<p className={pRight}>{parse(shipment_message)}</p>
// 						<p className={pLeft}>Shipping Amount</p>
// 						<p className={pRight}>
// 							{base_currency_code} {shipping_amount}
// 						</p>
// 						<p className={pLeft}>Coupon Discount Amount</p>
// 						<p className={pRight}>
// 							{base_currency_code} {couponDiscountAmount}
// 						</p>
// 						<p className={pLeft}>Total</p>
// 						<p className={pRight}>
// 							{base_currency_code} {grand_total}
// 						</p>
// 					</div>
// 				</div>
// 			)
// 		}

// 		if (currentState === "review") {
// 			let {
// 				subtotal,
// 				tax,
// 				shipping_amount,
// 				grand_total,
// 				shipment_message,
// 				base_currency_code,
// 				couponDiscountAmount
// 			} = checkoutCartData
// 			return (
// 				<div className="hidden lg:flex flex-col w-full h-full justify-between bg-white rounded-3xl">
// 					<div className="overflow-y-auto p-4 h-96 space-y-4">
// 						{checkoutCartData.products.map((item) => {
// 							let {
// 								title,
// 								qty,
// 								currentPrice,
// 								specialPrice,
// 								id,
// 								productImageUrlThumbnail,
// 								productImageUrl,
// 								sku,
// 							} = item
// 							return (
// 								<div
// 									key={id}
// 									className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2"
// 								>
// 									<div className="relative h-[100px] w-[100px]">
// 										<Image
// 											src={
// 												productImageUrlThumbnail
// 													? productImageUrlThumbnail
// 													: productImageUrl
// 														? productImageUrl
// 														: missingImageIcon
// 											}
// 											layout={"fill"}
// 											alt="thumbnail"
// 										/>
// 									</div>
// 									<div className="flex flex-col justify-between">
// 										<p>{title}</p>
// 										<div className="flex flex-row space-x-2 lg:space-x-4 items-center">
// 											<button
// 												disabled={true}
// 												onClick={() => {
// 													decrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={minusIcon}
// 													height={10}
// 													width={10}
// 													alt="icon"
// 												/>
// 											</button>
// 											<p>{qty}</p>
// 											<button
// 												disabled={true}
// 												onClick={() => {
// 													incrementItemQty(
// 														sku,
// 														qty,
// 														id
// 													)
// 												}}
// 											>
// 												<Image
// 													src={plusIcon}
// 													height={12}
// 													width={12}
// 													alt="icon"
// 												/>
// 											</button>
// 											<button
// 												disabled={true}
// 												onClick={() => {
// 													deleteItem(sku)
// 												}}
// 												className="flex items-center justify-center"
// 											>
// 												<Image
// 													src={trashIcon}
// 													height={20}
// 													width={20}
// 													alt="icon"
// 												/>
// 											</button>
// 											{specialPrice > 0 ? (
// 												<p>x RS. {specialPrice}</p>
// 											) : (
// 												<p>x RS. {currentPrice}</p>
// 											)}
// 										</div>
// 										{specialPrice > 0 ? (
// 											<p>x RS. {specialPrice * qty}</p>
// 										) : (
// 											<p>x RS. {currentPrice * qty}</p>
// 										)}
// 									</div>
// 								</div>
// 							)
// 						})}
// 					</div>
// 					<div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
// 						<p className={pLeft}>SubTotal</p>
// 						<p className={pRight}>{subtotal}</p>
// 						<p className={pLeft}>Tax</p>
// 						<p className={pRight}>
// 							{base_currency_code} {tax}
// 						</p>
// 						<p className={pLeft}>Shipping</p>
// 						<p className={pRight}>{parse(shipment_message)}</p>
// 						<p className={pLeft}>Shipping Amount</p>
// 						<p className={pRight}>
// 							{base_currency_code} {shipping_amount}
// 						</p>
// 						<p className={pLeft}>Coupon Discount Amount</p>
// 						<p className={pRight}>
// 							{base_currency_code} {couponDiscountAmount}
// 						</p>
// 						<p className={pLeft}>Total</p>
// 						<p className={pRight}>
// 							{base_currency_code} {grand_total}
// 						</p>
// 					</div>
// 				</div>
// 			)
// 		}
// 	}

// 	if (!token) {
// 		return (
// 			<>
// 				<HeadTag title={"Checkout"} />
// 				<h5 className="login-token"> Please Login First</h5>
// 			</>
// 		)
// 	}

// 	if (reduxCart.length == 0 && viewState !== "review") {
// 		return (
// 			<>
// 				<HeadTag title={"Checkout"} />
// 				<h5 className="login-token">YOUR CART IS EMPTY</h5>
// 			</>
// 		)
// 	}

// 	if (!initialCartData) {
// 		return (
// 			<div>
// 				<HeadTag title={"Checkout"} />
// 				<h5 className="login-token">YOUR CART IS EMPTY</h5>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div>
// 			<HeadTag title={"Checkout"} />
// 			<div className="flex flex-col w-full lg:grid lg:grid-cols-5 2xl:grid 2xl:grid-cols-6 gap-2 divide-y lg:gap-28">
// 				<div className="lg:col-span-3 2xl:col-span-4 space-y-12">
// 					<ProgressBar
// 						currentState={viewState}
// 						onClick={setViewState}
// 					/>
// 					{viewState == "shipping" && (
// 						<section className="flex flex-col space-y-4 w-full">
// 							<div className="text-center">
// 								<SectionHeading text={"Delivery Details"} />
// 							</div>
// 							<SelectAddress
// 								type={"checkout"}
// 								setAddress={setCheckoutAddress}
// 								dropDownSelectedAddress={checkoutAddress}
// 							/>
// 							{specialAddress !== '' && (
// 								<ErrorText
// 									text={"A special item has been added, this will be delivered to: " + specialAddress}
// 								/>
// 							)}
// 							<ErrorText text={addressErrorMessage} />
// 							<div className="border-y py-1">
// 								<TextField
// 									label={"Special Instructions"}
// 									placeHolder={"instructions"}
// 									customOnChange={true}
// 									onChange={handleCheckoutDataChange}
// 									name={"notes"}
// 									value={checkoutData.notes}
// 								/>
// 							</div>
// 						</section>
// 					)}
// 					{viewState === "payment" && (
// 						<section className="space-y-6">
// 							<div className="text-center">
// 								<SectionHeading text={"PAYMENT SELECTION"} />
// 							</div>
// 							<div className="space-y-2">
// 								<InputLabelText text={"Payment Method"} />
// 								<div className="flex flex-col space-y-2">
// 									{paymentMethods.map((method) => {
// 										let { id, name, key } = method
// 										if (key === "jswallet") {
// 											return <div key={id}></div>
// 										}
// 										return (
// 											<div key={id}>
// 												<input
// 													value={key}
// 													name={"paymentMethod"}
// 													type={"radio"}
// 													onChange={(e) => {
// 														handleCheckoutDataChange(
// 															e
// 														)
// 													}}
// 													checked={
// 														checkoutData.paymentMethod ==
// 														key
// 													}
// 												/>
// 												{name}
// 											</div>
// 										)
// 									})}
// 								</div>
// 							</div>
// 							{/* <ErrorText text={checkoutErrorMessage} /> */}
// 						</section>
// 					)}
// 					{viewState == "review" && (
// 						<section className="flex flex-col items-center justify-center align-center m-auto space-y-2 p-12">
// 							<div className="text-center">
// 								{parse(successResponse.message)}
// 							</div>
// 							<div className="h-[120px] w-full">
// 								<Image
// 									src={successResponse.data.thankyou_image}
// 									layout={"responsive"}
// 									alt={"Thank You Image"}
// 									width={450}
// 									height={120}
// 								/>
// 							</div>
// 						</section>
// 					)}
// 				</div>
// 				{/* CART DIV */}
// 				<div className="lg:col-span-2 2xl:col-span-2 h-full">
// 					<Cart currentState={viewState} />
// 				</div>
// 				{/* CHECKOUT BUTTON DIV */}
// 				<div className="col-span-4">
// 					{viewState === "shipping" && (
// 						<div>
// 							<SubmitButton
// 								text={
// 									checkoutCartData
// 										? "CONTINUE TO PAYMENT"
// 										: "SELECT ADDRESS"
// 								}
// 								onClick={() => {
// 									setViewState("payment")
// 									window.scroll({
// 										top: 0,
// 										left: 0,
// 										behavior: "smooth",
// 									})
// 								}}
// 								disabled={checkoutCartData == null}
// 							/>
// 						</div>
// 					)}
// 					{viewState === "payment" && (
// 						<div className="space-y-4">
// 							{/* PROMO CODE */}
// 							<div className="flex flex-row w-full items-center space-x-4">
// 								<div className="w-4/6">
// 									<TextField
// 										label={'Promo Code'}
// 										placeHolder={'Enter Code'}
// 										customOnChange={true}
// 										onChange={handleCheckoutDataChange}
// 										name={'coupon'}
// 										value={checkoutData.coupon}
// 									/>
// 								</div>
// 								<div className="w-2/6">
// 									<SubmitButton
// 										text={'Apply'}
// 										onClick={() => {
// 											getCheckoutCouponCartDataApi()
// 										}}
// 									/>
// 								</div>
// 							</div>
// 							<p>
// 								{couponCodeMessage}
// 							</p>
// 							<ErrorText text={checkoutErrorMessage} />
// 							<SubmitButton
// 								text={"CHECKOUT"}
// 								onClick={() => {
// 									checkoutApi()
// 									window.scroll({
// 										top: 0,
// 										left: 0,
// 										behavior: "smooth",
// 									})
// 								}}
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
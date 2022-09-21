import { useState, useEffect } from "react"
import parse from "html-react-parser"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"

import { getGeneralApiParams } from "../helpers/ApiHelpers"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import TextField from "../components/Layout/components/Input/TextField"
import InputLabelText from "../components/Layout/components/Typography/InputLabelText"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useInitialCartDataApi, usePickupLocationsApi } from "../helpers/Api"
import CheckoutCart from "../components/Layout/components/Cart/CheckoutCart"
import PickupLocationSelector from "../components/Layout/components/Selectors/PickupLocationSelector"
import Popup from "../components/Layout/components/Popup/Popup"

export default function Checkout() {
	const dispatch = useDispatch()
	const router = useRouter()
	let { token } = getGeneralApiParams()
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)
	const redirectSourceSelector = useSelector((state) => state.general.redirectSource)
	const selectedPickupLocationSelector = useSelector((state) => state.general.pickupLocation)
	const reduxCart = useSelector((state) => state.cart)

	// view state can be either 'loading', 'shipping', 'payment', 'review'
	const [showJSPopup, setShowJSPopup] = useState(false)
	const [viewState, setViewState] = useState("shipping")
	const [isCheckoutButtonPressed, setIsCheckoutButtonPressed] = useState(false)

	// For the PickupLocation Component
	const [dayIdentifier, setDayIdentifier] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')

	const { initialCartProducts, initialCartData, isLoading, errorMessage, response, setCoupon, notes, setPaymentMethod, paymentMethod, setIsCheckout, couponMessage, paymentMethods, checkoutResponse, setDay, setStartTime, setEndTime, setIsFetchCart } = useInitialCartDataApi()
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
							" bg-main-yellow text-main-blue py-2 px-4 rounded-xl"
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
							" bg-main-yellow text-main-blue py-2 px-4 rounded-xl"
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
							" bg-main-yellow text-main-blue py-2 px-3 lg:px-4 rounded-xl"
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
					<div>
						<select
							className={selectStyle}
							disabled={false}
							onChange={(e) => {
								dispatch(updatePickupLocation(JSON.parse(e.target.value)))
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

	const CheckoutButton = () => {
		return (
			<div className="">
				{viewState === "shipping" && (
					<div>
						{redirectSourceSelector === 'js_bank' ? (
							<SubmitButton
								text={'CONTINUE WITH ORDER'}
								onClick={() => {
									setShowJSPopup(true)
								}}
							/>
						) : (
							<>
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
											isLoading ? "LOADING" :
												selectedAddressSelector && response
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
										disabled={selectedAddressSelector && response ? false : true}
									/>
								)}
							</>
						)}
					</div>
				)}
				{viewState === "payment" && (
					<div className="space-y-4">
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
		)
	}

	const DetailsArea = () => {
		const [couponCode, setCouponCode] = useState('')

		return (
			<section className="w-full lg:w-[80%] 2xl:w-[60%] space-y-4 bg-slate-100 p-4 m-4 rounded-2xl">
				{viewState == "shipping" && (
					<>
						<p className="font-lato text-lg text-main-blue font-extrabold text-center">
							DELIVERY DETAILS
						</p>
						{selectedTypeSelector === 'cnc' ? (
							<PickupLocation />
						) : (
							<SelectAddress
								type={"checkout"}
								dropDownSelectedAddress={selectedAddressSelector}
							/>
						)}
						<ErrorText text={errorMessage} />
						<div className="">
							<TextField
								label={"Special Instructions"}
								placeHolder={"instructions"}
								customOnChange
								onChange={(e) => {
									notes.current = e.target.value
								}}
							/>
						</div>
					</>
				)}
				{viewState === "payment" && (
					<>
						<p className="font-lato text-lg text-main-blue font-extrabold text-center">
							PAYMENT SELECTION
						</p>
						<div className="flex flex-col items-center w-full">
							<div className="space-y-2 flex flex-col items-center">
								<InputLabelText text={"Payment Method"} />
								<div className="flex flex-col space-y-2">
									{paymentMethods.map((method) => {
										let { id, name, key } = method
										{/* if (key === "jswallet") {
											return <div key={id}></div>
										} */}
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
						</div>
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
					</>
				)}
				{viewState == "review" && (
					<>
						{isLoading ? (
							<div>
								Loading
							</div>
						) : (
							<section className="w-full flex flex-col items-center">
								<div className="text-center">
									{parse(checkoutResponse.data.message)}
								</div>
								<div className="w-full lg:w-2/3">
									<Image
										src={checkoutResponse.data.data.thankyou_image}
										layout={"responsive"}
										alt={"Thank You Image"}
										width={450}
										height={100}
									/>
								</div>
							</section>
						)}
					</>
				)}
			</section>
		)
	}

	const JsPopup = () => {
		return (
			<div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
				<div className="fixed w-3/4 lg:w-1/3 h-1/3 bg-white border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
					<div className="flex flex-col justify-between h-full w-full">
						<p className="font-nunito text-black text-xl text-center">
							Your Zindagi User ID and number is needed to proceed. Please confirm to grant access to this information.
						</p>
						<div className="flex flex-row space-x-4">
							<SubmitButton
								text={"Confirm"}
								onClick={() => {
									// CALL FARRUKH API
								}}
								bgColor={'bg-js'}
							/>
							<SubmitButton
								text={"Decline"}
								onClick={() => {
									router.push('/')
								}}
								bgColor={'bg-js'}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (!token && redirectSourceSelector !== 'js_bank') {
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
				<h5 className="login-token">Fetching cart...</h5>
			</div>
		)
	}

	return (
		<div className="h-full w-full">
			<HeadTag title={"Checkout"} />
			{showJSPopup && (
				<JsPopup />
			)}
			<ProgressBar
				currentState={viewState}
				onClick={setViewState}
			/>
			<div className="flex flex-col w-full h-full lg:grid lg:grid-cols-5 2xl:grid 2xl:grid-cols-6">
				<div className={viewState === 'review' ? "lg:col-span-5 2xl:col-span-6 flex flex-col w-full items-center" : "lg:col-span-3 2xl:col-span-4 flex flex-col w-full items-center"}>
					<DetailsArea />
					{/* CHECKOUT BUTTON DIV for desktop*/}
					<div className="hidden w-[60%] lg:grid lg:col-span-3 2xl:col-span-4">
						<CheckoutButton />
					</div>
				</div>
				{/* CART DIV */}
				{viewState !== 'review' && (
					<div className="lg:col-span-2 h-full">
						<div className="p-2 lg:hidden"></div>
						<CheckoutCart
							initialCartProducts={initialCartProducts}
							initialCartData={initialCartData}
							isLoading={isLoading}
							fetchCart={setIsFetchCart}
						/>
					</div>
				)}
				{/* CHECKOUT BUTTON DIV for mobile*/}
				<div className="lg:hidden w-full">
					<CheckoutButton />
				</div>
			</div>
		</div >
	)
}
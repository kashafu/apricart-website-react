import { useState } from "react"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import TextField from "../components/Layout/components/Input/TextField"
import parse from "html-react-parser"
import Image from "next/image"
import { useSelector } from "react-redux"
import SectionHeading from "../components/Layout/components/Typography/SectionHeading"
import InputLabelText from "../components/Layout/components/Typography/InputLabelText"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useInitialCartDataApi } from "../helpers/Api"
import CheckoutCart from "../components/Layout/components/Cart/CheckoutCart"
import { useEffect } from "react"
import PickupLocationSelector from "../components/Layout/components/Selectors/PickupLocationSelector"

export default function Checkout() {
	let { token } = getGeneralApiParams()
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)
	const reduxCart = useSelector((state) => state.cart)

	// view state can be either 'shipping', 'payment', 'review'
	const [viewState, setViewState] = useState("shipping")
	const [isCheckoutButtonPressed, setIsCheckoutButtonPressed] = useState(false)

	const [couponCode, setCouponCode] = useState('')
	const { initialCartProducts, initialCartData, isLoading, errorMessage, response, setNotes, setCoupon, notes, setPaymentMethod, paymentMethod, setIsCheckout, couponMessage, paymentMethods, checkoutResponse } = useInitialCartDataApi()

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

	if (!token) {
		return (
			<>
				<HeadTag title={"Checkout"} />
				<h5 className="login-token"> Please Login First</h5>
			</>
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
								<PickupLocationSelector />
							) : (
								<SelectAddress
									type={"checkout"}
									dropDownSelectedAddress={selectedAddressSelector}
								/>
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
											<div key={id}>
												<input
													value={key}
													type={"radio"}
													onChange={(e) => {
														setPaymentMethod(e.target.value)
													}}
													checked={paymentMethod === key}
												/>
												{name}
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
						errorMessage={errorMessage}
					/>
				</div>
				{/* CHECKOUT BUTTON DIV */}
				<div className="col-span-4">
					{viewState === "shipping" && (
						<div>
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
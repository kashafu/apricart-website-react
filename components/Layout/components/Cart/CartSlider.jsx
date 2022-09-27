import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import cartIcon from "../../../../public/assets/svgs/cartIcon.svg";
import SubmitButton from "../Buttons/SubmitButton";
import { useInitialCartDataApi } from "../../../../helpers/Api";
import CartItemListing from "./CartItemListing";

export default function CartSlider() {
	const { setIsFetchCart } = useInitialCartDataApi()
	const reduxCart = useSelector((state) => state.cart);
	const redirectSourceSelector = useSelector(state => state.general.redirectSource)
	const router = useRouter();
	const cartIconRef = useRef()
	let { token } = getGeneralApiParams();

	const [showCart, setShowCart] = useState(false);

	const getTotalPrice = () => {
		return reduxCart.reduce(
			(accumulator, item) =>
				accumulator +
				item.qty *
				(item.specialPrice > 0 ? item.specialPrice : item.currentPrice),
			0
		);
	}

	return (
		<div className="">
			<button
				className="flex items-center relative"
				onClick={() => {
					setShowCart(!showCart);
				}}
			>
				<div className="flex items-center"
					ref={cartIconRef}
				>
					<Image src={cartIcon} alt={"icon"} width={30} height={30} layout='fixed' />
					<p className="absolute inset-0 m-auto pt-1 h-fit w-fit rounded-full text-xs font-bold text-main-blue">
						{reduxCart.length}
					</p>
				</div>
			</button>
			{
				<div className={" w-full h-full transition-all ease-in duration-500"}>
					<div
						className={
							showCart
								? "fixed top-0 right-0 flex ease-in duration-200 flex-col items-center w-2/3 lg:w-1/3 h-full bg-white shadow-2xl z-50 rounded-l-2xl overflow-hidden"
								: "fixed top-0 -right-[100rem] ease-in duration-700 flex flex-col items-center w-2/3 lg:w-1/3 h-full bg-white shadow-2xl z-50 rounded-l-2xl overflow-hidden"
						}
					>
						<div className="w-full py-2 bg-main-blue">
							<p className="text-main-yellow text-xl font-bold text-center">
								My Cart
							</p>
						</div>
						{reduxCart.length == 0 ? (
							<p className="text-xl text-main-blue font-bold pt-2">
								No items in your cart
							</p>
						) : (
							<div className="overflow-y-auto flex flex-col h-full w-full p-2">
								<div className="divide-y overflow-y-auto w-full">
									{reduxCart.map((item) => {
										return (
											<CartItemListing
												key={item.sku}
												item={item}
												fetchCart={setIsFetchCart}
											/>
										)
									})}
								</div>
								<div className="mt-auto flex flex-col px-2 space-y-2">
									<div className="flex flex-row items-center space-x-2">
										<p className="">Sub Total:</p>
										<p className="text-lg font-bold text-main-blue">
											RS. {getTotalPrice()}
										</p>
									</div>
									<SubmitButton
										text={"CHECKOUT"}
										onClick={() => {
											if (token || redirectSourceSelector === 'js_bank') {
												setShowCart(false);
												router.push("/checkout");
											} else {
												setShowCart(false);
												router.push("/login");
											}
										}}
									/>
								</div>
							</div>
						)}
					</div>
					{/* BACKDROP */}
					{showCart && (
						<div
							className="fixed top-0 left-0 h-screen w-1/3 lg:w-2/3 z-50"
							onClick={() => {
								setShowCart(!showCart);
							}}
						></div>
					)}
				</div>
			}
		</div>
	);
}

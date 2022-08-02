import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	initialize,
} from "../../../../redux/cart.slice";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url_api } from "../../../../information.json";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import cartIcon from "../../../../public/assets/svgs/cartIcon.svg";
import minusIcon from "../../../../public/assets/svgs/minusIcon.svg";
import plusIcon from "../../../../public/assets/svgs/plusIcon.svg";
import SubmitButton from "../Buttons/SubmitButton";
import { useRouter } from "next/router";

export default function CartSlider() {
	const reduxCart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const router = useRouter();
	let { token } = getGeneralApiParams();

	const [showCart, setShowCart] = useState(false);

	useEffect(() => {
		getCartDataApi();
	}, []);

	const getCartDataApi = async () => {
		let { headers, city, userId } = getGeneralApiParams();
		let lat = 0;
		let long = 0;
		let body = {
			coupon: "",
			notes: "",
			paymentMethod: "cash",
			address: 0,
			showProducts: true,
			verify: true,
			prodType: "cus",
			day: "",
			startTime: "",
			endTime: "",
			clientType: "apricart",
			orderType: "delivery",
		};
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
			"&lang=en&client_type=apricart";

		try {
			let response = await axios.post(url, body, {
				headers: headers,
			});

			dispatch(initialize(response.data.data.products));
		} catch (error) {
			console.log(error);
		}
	};

	const getTotalPrice = () => {
		return reduxCart.reduce(
			(accumulator, item) =>
				accumulator +
				item.qty *
					(item.specialPrice > 0 ? item.specialPrice : item.currentPrice),
			0
		);
	};

	const updateItemQty = async (sku, qty) => {
		let { token, headers, city, userId } = getGeneralApiParams();

		if (token) {
			let url =
				base_url_api +
				"/order/cart/updateqty?city=" +
				city +
				"&lang=en&client_type=apricart&userid=" +
				userId;
			let body = {
				cart: [
					{
						sku: sku,
						qty: qty,
					},
				],
			};

			try {
				let response = await axios.post(url, body, {
					headers: headers,
				});

				getCartDataApi();
			} catch (error) {
				console.log(error?.response);
				toast.error(error?.response?.data?.message);
			}
		} else {
			let url =
				base_url_api +
				"/guest/cart/updateqty?city=" +
				city +
				"&lang=en&client_type=apricart";
			let body = {
				userId: userId,
				cart: [
					{
						sku: sku,
						qty: qty,
					},
				],
			};

			try {
				let response = await axios.post(url, body, {
					headers: headers,
				});

				getCartDataApi();
			} catch (error) {
				console.log(error?.response);
				toast.error(error?.response?.data?.message);
			}
		}
	};

	const deleteItem = (item) => {
		if (token) {
			let { city, userId, headers } = getGeneralApiParams();
			let url =
				base_url_api +
				"/order/cart/delete?city=" +
				city +
				"&lang=en&client_type=apricart&userid=" +
				userId;
			let body = {
				cart: [
					{
						sku: item.sku,
					},
				],
			};

			try {
				let response = axios.delete(url, {
					headers: headers,
					data: body,
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			let { city, userId, headers } = getGeneralApiParams();
			let url =
				base_url_api +
				"/guest/cart/delete?city=" +
				city +
				"&lang=en&client_type=apricart&userid=" +
				userId;
			let body = {
				userId: userId,
				cart: [
					{
						sku: item.sku,
					},
				],
			};

			try {
				let response = axios.delete(url, {
					headers: headers,
					data: body,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="">
			<button
				className="flex items-center relative"
				onClick={() => {
					setShowCart(!showCart);
				}}
			>
				<Image src={cartIcon} alt={"icon"} width={45} height={45} />
				<p className="absolute -top-2 -right-4 font-bold">{reduxCart.length}</p>
			</button>
			{
				<div className={" w-full h-full transition-all ease-in duration-500"}>
					<div
						className={
							showCart
								? "fixed top-0 right-0 flex ease-in duration-300 flex-col items-center w-2/3 lg:w-1/3 h-full bg-white shadow-2xl z-10 rounded-l-2xl overflow-hidden"
								: "fixed top-0 -right-[40rem] ease-in duration-700 flex flex-col items-center w-2/3 lg:w-1/3 h-full bg-white shadow-2xl z-10 rounded-l-2xl overflow-hidden"
						}
					>
						<div className="w-full p-4 bg-main-blue">
							<p className="text-main-yellow text-xl font-bold text-center">
								My Cart
							</p>
						</div>
						{reduxCart.length == 0 ? (
							<p className="text-xl text-main-blue font-bold pt-2">
								No items in your cart
							</p>
						) : (
							<div className="space-y-2 overflow-y-auto flex flex-col py-2">
								<div className="divide-y">
									{reduxCart.map((item) => {
										const {
											id,
											productImageUrl,
											title,
											currentPrice,
											specialPrice,
											sku,
											qty,
										} = item;
										let price = specialPrice > 0 ? specialPrice : currentPrice;

										return (
											<div key={id} className="grid grid-cols-4 p-2">
												<div className="relative col-span-1 w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] 2xl:[100px] 2xl:[100px]">
													<Image
														src={productImageUrl}
														alt={title}
														layout={"fill"}
													/>
												</div>
												<div className="col-span-3 grid grid-rows-2">
													<p className="text-main-blue font-semibold">
														{title}
													</p>
													<div className="flex flex-row justify-around">
														<button
															onClick={() => {
																dispatch(decrementQuantity(id));
																updateItemQty(sku, qty - 1);
															}}
															className={"flex flex-row items-center"}
														>
															<Image src={minusIcon} alt="" />
														</button>
														<p className="flex flex-col mb-auto mt-auto">
															{item.qty}
														</p>
														<button
															onClick={() => {
																dispatch(incrementQuantity(id));
																updateItemQty(sku, qty + 1);
															}}
															className={"flex flex-row items-center"}
														>
															<Image src={plusIcon} alt="" />
														</button>
														<button
															className=""
															onClick={() => {
																deleteItem(item);
																dispatch(removeFromCart(id));
															}}
														>
															<i className="fa fa-trash" aria-hidden="true"></i>
														</button>
														<p className="flex flex-col mb-auto mt-auto">
															RS :{price}
														</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								<div className="mt-auto flex flex-col px-2 space-y-2">
									<div className="flex flex-row items-center space-x-2">
										<p className="">Sub Total:</p>
										<p className="text-lg font-bold text-main-blue">
											RS. {getTotalPrice()}
										</p>
									</div>
									<div className="">
										<SubmitButton
											text={"CHECKOUT"}
											onClick={() => {
												if (token) {
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
							</div>
						)}
					</div>
					{/* BACKDROP */}
					{showCart && (
						<div
							className="fixed top-0 left-0 h-screen w-1/3 lg:w-2/3 z-10"
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

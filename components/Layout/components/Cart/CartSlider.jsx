import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import Image from "next/image";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import cartIcon from "../../../../public/assets/svgs/cartIcon.svg";
import minusIcon from "../../../../public/assets/svgs/minusIcon.svg";
import plusIcon from "../../../../public/assets/svgs/plusIcon.svg";
import SubmitButton from "../Buttons/SubmitButton";
import { useRouter } from "next/router";
import missingImageIcon from "../../../../public/assets/images/missingImage.png"
import { useDeleteItemApi, useInitialCartDataApi, useUpdateItemQtyApi } from "../../../../helpers/Api";

export default function CartSlider() {
	useInitialCartDataApi()
	const reduxCart = useSelector((state) => state.cart);
	const router = useRouter();
	const cartIconRef = useRef()
	let { token } = getGeneralApiParams();

	const [showCart, setShowCart] = useState(false);

	const { setIsUpdateItemQty, setData } = useUpdateItemQtyApi()
	const { setIsDelete, setSku } = useDeleteItemApi()

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
					<p className="absolute -top-1 p-[5px] py-0 -right-2 bg-main-blue rounded-full text-xs text-white">{reduxCart.length}</p>
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
							<div className="overflow-y-auto grid grid-flow-row w-full lg:px-4 2xl:px-12 py-2">
								<div className="divide-y">
									{reduxCart.map((item) => {
										const {
											productImageUrl,
											title,
											currentPrice,
											specialPrice,
											sku,
											qty,
											productImageUrlThumbnail,
										} = item;
										let price = specialPrice > 0 ? specialPrice : currentPrice;
										let imageUrl =
											productImageUrlThumbnail != ""
												? productImageUrlThumbnail
												: productImageUrl != ""
													? productImageUrl
													: missingImageIcon

										return (
											<div key={sku} className="grid grid-cols-4 p-2">
												<div className="relative col-span-1 w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] 2xl:[100px] 2xl:[100px] self-center">
													<Image
														src={imageUrl}
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
															className={"flex flex-row items-center"}
															onClick={() => {
																setData({
																	qty: qty - 1,
																	sku: sku
																})
																setIsUpdateItemQty(true)
															}}
														>
															<Image src={minusIcon} width={10} height={10} alt="" />
														</button>
														<p className="flex flex-col mb-auto mt-auto">
															{item.qty}
														</p>
														<button
															className={"flex flex-row items-center"}
															onClick={() => {
																setData({
																	qty: qty + 1,
																	sku: sku
																})
																setIsUpdateItemQty(true)
															}}
														>
															<Image src={plusIcon} width={10} height={10} alt="" />
														</button>
														<button
															className=""
															onClick={() => {
																setSku(sku)
																setIsDelete(true)
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

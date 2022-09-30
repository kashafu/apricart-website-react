import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"

import MainProducts from "../components/Layout/components/Products/MainProducts"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import Carousel from "../components/Layout/components/Banner/Carousel"
import Categories from "../components/Layout/components/Categories/Categories"
import { useHomeApi, useOptionsApi } from "../helpers/Api"
import TypeCardSelector from "../components/Layout/components/Cards/TypeCardSelector"
import HomeLoader from "../components/Layout/components/Loaders/HomeLoader"
import { updateIsShowSelectionScreen, updateRedirectSource, updateSelectedType } from "../redux/general.slice"

import homeDeliveryIcon from "../public/assets/svgs/homeDeliveryIcon.svg"
import clickAndCollectIcon from "../public/assets/svgs/clickAndCollectIcon.svg"
import bulkBuyIcon from "../public/assets/svgs/bulkBuyIcon.svg"
import karachiStaticBanner1 from "../public/assets/images/banners/99AndBelow.jpg"
import karachiCncStaticBanner1 from "../public/assets/images/banners/webstaticbanner.jpg"
import bulkBuyStaticBanner from "../public/assets/images/banners/bulkBuyMainBanner.png"
import crossIcon from "../public/assets/svgs/crossIcon.svg"
import { clearCookies } from "../helpers/Cookies"
import { clearLocalStorage, clearSessionStorage } from "../helpers/Storage"
import MainProductsShimmer from "../components/Layout/components/Loaders/Shimmers/MainProductsShimmer"
import MainCategories from "../components/Layout/components/Categories/MainCategories"

export default function Home() {
	const router = useRouter()
	const dispatch = useDispatch()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)
	const isShowSelectionScreen = useSelector(state => state.general.isShowSelectionScreen)
	const { isLoading, isPopupAd, homeData, errorMessage, categories } = useHomeApi()
	const [showPopupAd, setShowPopupAd] = useState(isPopupAd)

	useEffect(() => {
		if (router.isReady) {
			let queries = router.query
			if (queries.source) {
				dispatch(updateRedirectSource(queries.source))
			}
		}
	}, [router.isReady])

	const SelectionScreenPopup = () => {
		const { welcomeVideo, isLoading } = useOptionsApi()

		return (
			<>
				{isShowSelectionScreen && (
					<div className="animate-fade-in fixed inset-0 h-full w-full backdrop-blur-sm z-50">
						<div className="fixed w-11/12 md:w-1/2 lg:w-[40%] 2xl:w-1/3 h-fit flex flex-col space-y-4 bg-white border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
							<p className="font-nunito text-lg text-left font-bold text-black">
								Step 1: Select Order Type
							</p>
							<div className="grid grid-cols-5 grid-rows-1 gap-2">
								<button className="col-span-3 flex flex-col w-full items-center justify-between bg-main-yellow h-full rounded-2xl p-2 shadow-2xl"
									onClick={() => {
										dispatch(updateIsShowSelectionScreen(false))
										dispatch(updateSelectedType('home'))
									}}
								>
									<div>
										<p className="font-nunito text-main-blue font-bold text-xl lg:text-2xl 2xl:text-3xl text-right">
											Home Delivery
										</p>
										<p className="font-inter text-black font-bold text-xs lg:text-sm 2xl:text-lg text-right">
											آسانی سے گھر بیٹھےآرڈر ڈلیور کروائیں
										</p>
									</div>
									<div className="w-1/2">
										<Image
											src={homeDeliveryIcon}
											alt={'home delivery icon'}
											layout={'responsive'}
										/>
									</div>
								</button>
								<div className="col-span-2 grid grid-rows-2 grid-cols-1 space-y-2">
									<button className="bg-white flex flex-col w-full items-center justify-between rounded-2xl p-1 pb-2 shadow-2xl"
										onClick={() => {
											dispatch(updateIsShowSelectionScreen(false))
											dispatch(updateSelectedType('cnc'))
										}}
									>
										<div>
											<p className="font-nunito text-main-blue font-bold text-xs lg:text-base 2xl:text-xl">
												Click & Collect Mart
											</p>
											<p className="font-inter text-black font-bold text-xs lg:text-sm">
												گھر سے  آرڈر کریں اور قریبی اسٹور سے  پک کریں
											</p>
										</div>
										<div className="w-2/3 self-start">
											<Image
												src={clickAndCollectIcon}
												alt={'Click & Collect Mart icon'}
												layout={'responsive'}
											/>
										</div>
									</button>
									<button className="bg-main-blue-100 flex flex-col w-full items-center justify-between rounded-2xl pt-1 px-1 shadow-2xl"
										onClick={() => {
											dispatch(updateIsShowSelectionScreen(false))
											dispatch(updateSelectedType('bulk'))
										}}
									>
										<div>
											<p className="font-nunito text-main-blue font-bold text-xs lg:text-lg 2xl:text-3xl text-right">
												Bulk Buy
											</p>
											<p className="font-inter text-black font-bold text-xs lg:text-sm">
												بڑی خریداری بڑی بچت
											</p>
										</div>
										<div className="w-2/3 drop-shadow-2xl">
											<Image
												src={bulkBuyIcon}
												alt={'Bulk Buy icon'}
												layout={'responsive'}
											/>
										</div>
									</button>
								</div>
							</div>
							{/* VIDEO CONTAINER */}
							<div className="w-full aspect-video rounded-2xl overflow-hidden">
								{!isLoading && (
									<iframe
										width={'100%'}
										height={'100%'}
										src={welcomeVideo}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="Embedded youtube"
									/>
								)}
							</div>
						</div>
					</div>
				)}
			</>
		)
	}

	const PopupAd = () => {
		return (
			<>
				{/* POPUP AD */}
				{showPopupAd && (
					<div className="w-full">
						{/* PHONE VIEW */}
						<div className="fixed w-3/4 h-3/4 lg:hidden z-30 inset-0 m-auto shadow-2xl">
							<div className="relative w-full h-full">
								<Image
									src={homeData.dialogImageUrl}
									layout="fill"
									alt="popup banner"
									onClick={() => {
										router.push("/offers/" + homeData.dialogValue)
									}}
								/>
							</div>
							<button
								className="absolute top-[-10px] right-[-10px] z-20"
								onClick={() => {
									setShowPopupAd(false)
								}}
							>
								<Image
									src={crossIcon}
									height={20}
									width={20}
									alt="icon"
								/>
							</button>
						</div>
						{/* DESKTOP VIEW */}
						<div className="hidden lg:block fixed w-[700px] h-[450px] z-10 inset-0 m-auto shadow-2xl">
							<div className="relative w-full h-full">
								<Image
									src={homeData.dialogImageLandscapeUrl}
									layout="fill"
									alt="popup banner"
									onClick={() => {
										router.push("/offers/" + homeData.dialogValue)
									}}
								/>
							</div>
							<button
								className="absolute top-[-10px] right-[-10px] z-20"
								onClick={() => {
									setShowPopupAd(false)
								}}
							>
								<Image
									src={crossIcon}
									height={20}
									width={20}
									alt="icon"
								/>
							</button>
						</div>
					</div>
				)}
			</>
		)
	}

	const Products = () => {
		if (isLoading) {
			return (
				<MainProductsShimmer />
			)
		}

		return (
			<section className="space-y-4">
				{homeData.products.map((product, index) => {
					let { identifier } = product
					return (
						<section key={identifier}>
							{/* STATIC BANNERS for mobile */}
							{/* {index % 2 == 0 ? (
								<section className="lg:hidden relative space-y-6 items-center">
									<section className="w-full">
										<Link
											href={"/offers/45"}
											passHref
											className="w-full"
										>
											<a className="w-full">
												<Image
													src={karachiStaticBanner2}
													layout={
														"responsive"
													}
													alt=""
												/>
											</a>
										</Link>
									</section>
								</section>
							) : (
								<section className="lg:hidden relative space-y-6 items-center">
									<section className="w-full">
										<Link
											href={"/category/under-rs.99/1242"}
											passHref
											className="w-full"
										>
											<a className="w-full">
												<Image
													src={karachiStaticBanner1}
													layout={"responsive"}
													alt="banner"
												/>
											</a>
										</Link>
									</section>
								</section>
							)} */}
							<MainProducts
								key={identifier}
								section={product}
							/>
						</section>
					)
				})}
			</section>
		)
	}

	const HomeItems = () => {
		if (isLoading) {
			return (
				<HomeLoader />
			)
		}

		if (!homeData) {
			return (
				<div className="flex flex-col space-y-2">
					<p>{errorMessage}</p>
					<a className="text-blue-400 underline"
						onClick={() => {
							clearCookies()
							clearLocalStorage()
							clearSessionStorage()
							router.reload()
						}}
					>
						Refresh Page
					</a>
				</div>
			)
		}

		return (
			<div>
				<PopupAd />
				<SelectionScreenPopup />
				<div className="flex flex-row w-full space-x-2">
					<div className="flex flex-col justify-between w-full lg:w-[65%]">
						<TypeCardSelector />
						<div className="w-full my-2 lg:my-0">
							<Carousel />
						</div>
					</div>
					<div className="hidden lg:inline-block lg:w-[35%]">
						{selectedTypeSelector === 'bulk' && (
							<Link
								href={"/"}
								passHref
								className="w-full"
							>
								<a className="w-full">
									<Image
										src={bulkBuyStaticBanner}
										layout={"responsive"}
										alt="banner"
									/>
								</a>
							</Link>
						)}
						{selectedTypeSelector === 'cnc' && (
							<div className="w-full">
								<Image
									src={karachiCncStaticBanner1}
									layout={"responsive"}
									alt="banner"
								/>
							</div>
						)}
						{selectedTypeSelector === 'home' && (
							<Link
								href={"/category/under-rs.99/1242"}
								passHref
								className="w-full"
							>
								<a className="w-full">
									<Image
										src={karachiStaticBanner1}
										layout={"responsive"}
										alt="banner"
									/>
								</a>
							</Link>
						)}
					</div>
				</div>
				<MainCategories
					categories={categories}
				/>
				<Products />
			</div>
		)
	}

	return (
		<div className="">
			<HeadTag
				title={"Apricart.Pk Online Grocery Store - Best Grocer Shopping App in Karachi Peshawar Pakistan"}
				description={
					"Apricart.Pk - Online Grocery Store in Pakistan: Deliver Groceries,Beverages,Bakery,Fruits & Vegetables, Rice, Pulses | Online Grocer App in Karachi, Peshawar Pakistan"
				}
				isIndex
			/>
			<div className="grid grid-cols-5 gap-6">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:block lg:col-span-1">
					<Categories />
				</section>
				<section className="space-y-2 lg:space-y-6 col-span-5 lg:col-span-4">
					<HomeItems />
				</section>
			</div>
		</div>
	)
}
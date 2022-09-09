import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"

import { getGeneralApiParams } from "../helpers/ApiHelpers"
import MainProducts from "../components/Layout/components/Products/MainProducts"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import Carousel from "../components/Layout/components/Banner/Carousel"
import Categories from "../components/Layout/components/Categories/Categories"
import { useHomeApi } from "../helpers/Api"
import TypeCardSelector from "../components/Layout/components/Cards/TypeCardSelector"
import HomeLoader from "../components/Layout/components/Loaders/HomeLoader"
import { updateRedirectSource } from "../redux/general.slice"

import karachiStaticBanner1 from "../public/assets/images/banners/99AndBelow.jpg"
import karachiStaticBanner2 from "../public/assets/images/banners/saylanistaticbanner.jpeg"
import karachiBulkBuyStaticBanner1 from "../public/assets/images/banners/bulkBuyBanner.jpeg"
import crossIcon from "../public/assets/svgs/crossIcon.svg"
import { clearCookies } from "../helpers/Cookies"
import { clearLocalStorage, clearSessionStorage } from "../helpers/Storage"
import MainProductsShimmer from "../components/Layout/components/Loaders/Shimmers/MainProductsShimmer"

export default function Home() {
	const router = useRouter()
	const dispatch = useDispatch()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)
	let { token } = getGeneralApiParams()
	const { isLoading, isPopupAd, homeData, errorMessage } = useHomeApi()
	const [showPopupAd, setShowPopupAd] = useState(isPopupAd)

	useEffect(() => {
		if (router.isReady) {
			let queries = router.query
			if (queries.source) {
				dispatch(updateRedirectSource(queries.source))
			}
		}
	}, [router.isReady])

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
			<section className="space-y-12">
				{homeData.products.map((product, index) => {
					let { identifier } = product
					return (
						<section key={identifier}>
							{/* STATIC BANNERS for mobile */}
							{index % 2 == 0 ? (
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
											href={"/offers/14"}
											passHref
											className="w-full"
										>
											<a className="w-full">
												<Image
													src={karachiStaticBanner1}
													layout={
														"responsive"
													}
													alt=""
												/>
											</a>
										</Link>
									</section>
								</section>
							)}
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
				<div className="flex flex-row w-full space-x-2">
					<div className="flex flex-col justify-between w-full lg:w-[65%]">
						<TypeCardSelector />
						<div className="w-full my-2 lg:my-0">
							<Carousel />
						</div>
					</div>
					<div className="hidden lg:inline-block lg:w-[35%]">
						<Image
							src={karachiStaticBanner1}
							layout={"responsive"}
							alt="banner"
						/>
					</div>
				</div>
				<Products />
			</div>
		)
	}

	return (
		<div className="">
			<HeadTag
				title={"Apricart | Online Grocery"}
				description={
					"Online grocery store in Pakistan, offering bulk buy and home delivery"
				}
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
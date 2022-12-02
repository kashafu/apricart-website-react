import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import MainProducts from "../components/Layout/components/Products/MainProducts"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import Carousel from "../components/Layout/components/Banner/Carousel"
import { useHomeApi } from "../helpers/Api"
import HomeLoader from "../components/Layout/components/Loaders/HomeLoader"
import { updateRedirectSource } from "../redux/general.slice"

import crossIcon from "../public/assets/svgs/crossIcon.svg"
import { clearCookies } from "../helpers/Cookies"
import { clearLocalStorage, clearSessionStorage } from "../helpers/Storage"
import MainCategories from "../components/Layout/components/Categories/MainCategories"
import CategoryAndItemsLayout from "../components/Layout/components/Layouts/CategoryAndItemsLayout"

export default function Home() {
	const router = useRouter()
	const dispatch = useDispatch()
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
		return (
			<section className="space-y-4">
				{homeData.products.map((product, index) => {
					let { identifier } = product
					return (
						<section key={identifier}>
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
			<div className="animate-fade-in">
				<PopupAd />
				<div className="flex flex-row w-full">
					<Carousel />
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
			<CategoryAndItemsLayout>
				<HomeItems />
			</CategoryAndItemsLayout>
		</div>
	)
}
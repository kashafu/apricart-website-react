import Image from "next/image"
import { useState } from "react"

import MainProducts from "../components/Layout/components/Products/MainProducts"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import Carousel from "../components/Layout/components/Banner/Carousel"
import { useHomeApi } from "../helpers/Api"
import HomeLoader from "../components/Layout/components/Loaders/HomeLoader"

import { clearCookies } from "../helpers/Cookies"
import CategoryAndItemsLayout from "../components/Layout/components/Layouts/CategoryAndItemsLayout"
import { clearLocalStorage, clearSessionStorage } from "../helpers/Storage"
import MainCategories from "../components/Layout/components/Categories/MainCategories"

import crossIcon from "../public/assets/svgs/crossIcon.svg"

const PopupAd = ({ showPopupAd, setShowPopupAd, homeData, }) => {
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

const Products = ({ homeData }) => {
	return (
		<section className="space-y-4">
			{homeData.products.map((product) => {
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

const HomeItems = ({ homeData, errorMessage, setShowPopupAd, showPopupAd, categories, isLoading }) => {
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
			<PopupAd
				homeData={homeData}
				setShowPopupAd={setShowPopupAd}
				showPopupAd={showPopupAd}
			/>
			<div className="flex flex-row w-full">
				<Carousel />
			</div>
			<MainCategories
				categories={categories}
			/>
			<Products
				homeData={homeData}
			/>
		</div>
	)
}

export default function Home() {
	const { isLoading, isPopupAd, homeData, errorMessage, categories } = useHomeApi()
	const [showPopupAd, setShowPopupAd] = useState(isPopupAd)

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
				<HomeItems
					isLoading={isLoading}
					categories={categories}
					errorMessage={errorMessage}
					homeData={homeData}
					setShowPopupAd={setShowPopupAd}
					showPopupAd={showPopupAd}
				/>
			</CategoryAndItemsLayout>
		</div>
	)
}
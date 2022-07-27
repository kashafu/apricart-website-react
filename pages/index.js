import Image from "next/image"
import {useRouter} from 'next/router'
import Categories from "../components/Layout/components/Categories/Categories"
import { useEffect, useState } from "react"
import { base_url_api } from "../information.json"
import axios from "axios"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import MainProducts from "../components/Layout/components/Products/MainProducts"
import Link from "next/link"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import storeBackgroundImage from "../public/assets/images/storeBackground.png"
import lifestyle from "../public/assets/images/banners/lifestyle.jpeg"
import nationals from "../public/assets/images/banners/nationals.jpeg"
import mainBanner from "../public/assets/images/banners/mainBanner.png"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import crossIcon from "../public/assets/svgs/crossIcon.svg"

export default function Home() {
	const router = useRouter()

	let { city, token } = getGeneralApiParams()

	const [categories, setCategories] = useState(null)
	const [homeData, setHomeData] = useState(null)
	const [errorMessage, setErrorMessage] = useState("Loading")
	const [showPopupAd, setShowPopupAd] = useState(false)

	useEffect(() => {
		getHomeDataApi()
		getCategoriesApi()
	}, [])

	const getHomeDataApi = async () => {
		let { city, latitude, longitude, userId, headers } =
			getGeneralApiParams()

		let url =
			base_url_api +
			"/home/all?client_lat=" +
			latitude +
			"&client_long=" +
			longitude +
			"&city=" +
			city +
			"&lang=en&userid=" +
			userId +
			"&web=true&client_type=apricart&prod_type=cus&order_type=delivery"

		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setHomeData(response.data.data)
			setShowPopupAd(response.data.data.dialog)
		} catch (error) {
			setErrorMessage(error.message)
		}
	}

	const getCategoriesApi = async () => {
		let { city, headers } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city

		try {
			let response = await axios.get(url, {
				headers: headers,
			})
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	if (!homeData) {
		return (
			<div>
				<p>{errorMessage}</p>
			</div>
		)
	}

	return (
		<div className="">
			<HeadTag title={"APRICART"} />
			{/* POPUP AD */}
			{showPopupAd && (
				<div className="fixed w-3/4 h-3/4 z-20 inset-0 m-auto shadow-2xl"
					onClick={()=>{
						router.push('/offers/' + homeData.dialogValue)
					}}
				>
					<div className="relative w-full h-full">
						<Image
							src={homeData.dialogImageUrl}
							layout="fill"
							alt="popup banner"
						/>
					</div>
					<div
						className="absolute top-[-10px] right-[-10px]"
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
					</div>
				</div>
			)}
			<div className="space-y-8">
				{/* BANNERS SECTION hidden on phone */}
				<section className="hidden lg:relative lg:w-screen lg:aspect-[16/6] lg:grid grid-cols-12 items-center">
					{/* BACKGROUND IMAGE */}
					<div className="absolute w-full h-full blur-lg">
						<Image
							src={storeBackgroundImage}
							layout={"responsive"}
							alt="banner"
						/>
					</div>
					{/* SCROLLING BANNER */}
					<section className="col-span-7">
						<div className="w-full">
							<Image
								src={mainBanner}
								layout={"responsive"}
								alt="banner"
							/>
						</div>
						{/* <Banner
							banners={homeData.banners}
						/> */}
					</section>
					{/* STATIC BANNERS */}
					<section className="col-span-5 grid grid-rows-2 h-full w-full justify-start items-center space-y-8">
						<div className="relative w-[500px] h-[180px] 2xl:w-[700px] 2xl:h-[280px]">
							<Image
								src={nationals}
								layout={"fill"}
								alt="banner"
							/>
						</div>
						<div className="relative w-[500px] h-[180px] 2xl:w-[700px] 2xl:h-[280px]">
							<Image
								src={lifestyle}
								layout={"fill"}
								alt="banner"
							/>
						</div>
					</section>
				</section>
				{/* BANNERS SECTION hidden on desktop */}
				<section className="lg:hidden w-screen items-center mt-0">
					{/* MAIN BANNER */}
					<section className="w-full">
						<Image
							src={mainBanner}
							layout={"responsive"}
							alt="banner"
						/>
					</section>
				</section>
				<div className="grid grid-cols-5 gap-12">
					{/* CATEGORIES SECTION */}
					<section className="hidden lg:col-span-1 lg:block">
						{categories && <Categories categories={categories} />}
					</section>
					{/* PRODUCTS SECTION */}
					<section className="col-span-5 lg:col-span-4 space-y-12">
						{city === "peshawar" && (
							<div>
								<ErrorText
									text={
										"HOME DELIVERY IS CURRENTLY UNAVAILABLE IN PESHAWAR, PLEASE CHANGE CITY TO CONTINUE OR DOWNLOAD THE APP FOR BULK BUY"
									}
								/>
							</div>
						)}
						{homeData.products.map((product, index) => {
							let { offerId } = product

							return (
								<section key={offerId}>
									{/* STATIC BANNERS for mobile */}
									{index % 2 == 0 ? (
										<section className="lg:hidden relative space-y-6 items-center">
											<section className="w-full">
												<Image
													src={lifestyle}
													layout={"responsive"}
													alt=""
												/>
											</section>
										</section>
									) : (
										<section className="lg:hidden relative space-y-6 items-center">
											<section className="w-full">
												<Image
													src={nationals}
													layout={"responsive"}
													alt=""
												/>
											</section>
										</section>
									)}
									<MainProducts
										key={offerId}
										section={product}
									/>
								</section>
							)
						})}
						{/* MANUAL ORDER SECTION */}
						<section className="mb-2 mt-8 flex flex-row w-full rounded-xl p-2 bg-main-yellow items-center align-center justify-around">
							<Link
								href={token ? "/grocery_list" : "/login"}
								passHref
							>
								<a className="text-main-blue font-bold text-lg w-full text-center">
									UPLOAD YOUR GROCERY LIST
								</a>
							</Link>
						</section>
					</section>
				</div>
			</div>
		</div>
	)
}

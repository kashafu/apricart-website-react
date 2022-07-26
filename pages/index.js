import Image from "next/image"
import Categories from "../components/Layout/components/Categories/Categories"
import { useEffect, useState } from "react"
import { base_url_api } from "../information.json"
import axios from "axios"
import ScrollingProducts from "../components/Layout/components/Products/ScrollingProducts"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import Banner from "../components/Layout/components/Banner/Banner"
import MainProducts from "../components/Layout/components/Products/MainProducts"
import Link from "next/link"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import storeBackgroundImage from "../public/assets/images/storeBackground.png"
import lifestyle from "../public/assets/images/banners/lifestyle.jpeg"
import nationals from "../public/assets/images/banners/nationals.jpeg"
import mainBanner from "../public/assets/images/banners/mainBanner.png"
import ErrorText from "../components/Layout/components/Typography/ErrorText"

export default function Home() {
	let { city } = getGeneralApiParams()

	const [categories, setCategories] = useState(null)
	const [homeData, setHomeData] = useState(null)
	const [errorMessage, setErrorMessage] = useState("Loading")

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
		<div className="space-y-8">
			<HeadTag title={"APRICART"} />
			{/* BANNERS SECTION hidden on phone */}
			<section className="hidden relative w-screen aspect-[16/6] lg:grid grid-cols-12 items-center">
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
						<Image src={nationals} layout={"fill"} alt="banner" />
					</div>
					<div className="relative w-[500px] h-[180px] 2xl:w-[700px] 2xl:h-[280px]">
						<Image src={lifestyle} layout={"fill"} alt="banner" />
					</div>
				</section>
				{/* {homeData.banners.length >= 2 && (
					<section className="grid grid-rows-2 h-full p-8 w-full items-center">
						<div className="relative w-full h-[150px]">
							<Image
								src={homeData.banners[0].bannerUrlWeb[0]}
								layout={'fill'}
							/>
						</div>
						<div className="relative w-full h-[150px]">
							<Image
								src={homeData.banners[1].bannerUrlWeb[0]}
								layout={'fill'}
							/>
						</div>
					</section>
				)} */}
			</section>
			{/* BANNERS SECTION hidden on desktop */}
			<section className="lg:hidden relative w-screen aspect-[16/6] items-center">
				{/* BACKGROUND IMAGE */}
				<div className="absolute w-full h-full blur-lg">
					<Image
						src={storeBackgroundImage}
						layout={"responsive"}
						alt=""
					/>
				</div>
				{/* MAIN BANNER */}
				<section className="w-full">
					<Image
						src={mainBanner}
						layout={"responsive"}
						alt="banner"
					/>
				</section>
				{/* {homeData.banners.length >= 2 && (
					<section className="grid grid-rows-2 h-full p-8 w-full items-center">
						<div className="relative w-full h-[150px]">
							<Image
								src={homeData.banners[0].bannerUrlWeb[0]}
								layout={'fill'}
							/>
						</div>
						<div className="relative w-full h-[150px]">
							<Image
								src={homeData.banners[1].bannerUrlWeb[0]}
								layout={'fill'}
							/>
						</div>
					</section>
				)} */}
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
					{/* WEB PRODUCTS SECTION */}
					{/* <section className="col-span-5 lg:col-span-4 space-y-12">
						<MainProducts
							products={homeData.webProducts}
						/>
					</section> */}
					{homeData.products.map((product, index) => {
						let { name, offerId } = product

						// If the name is 'Upload Grocery List', we have to return a button which allows to upload grocery list
						{
							/* if (name === "Upload Grocery List") {
							return (
								<></>
							)
						} */
						}

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
								<MainProducts key={offerId} section={product} />
							</section>
						)
					})}
					{/* MANUAL ORDER SECTION */}
					<section className="mb-2 mt-8 flex flex-row w-full rounded-xl p-2 bg-main-yellow items-center align-center justify-around">
						<Link href={"/grocery_list"} passHref>
							<a className="text-main-blue font-bold text-lg w-full text-center">
								UPLOAD YOUR GROCERY LIST
							</a>
						</Link>
					</section>
				</section>
			</div>
		</div>
	)
}

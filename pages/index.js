import Image from "next/image"
import { useRouter } from "next/router"
import Categories from "../components/Layout/components/Categories/Categories"
import { useState } from "react"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import MainProducts from "../components/Layout/components/Products/MainProducts"
import Link from "next/link"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import storeBackgroundImage from "../public/assets/images/storeBackground.png"
import karachiStaticBanner1 from "../public/assets/images/banners/harLamhaMazedarBanner.jpeg"
import karachiStaticBanner2 from "../public/assets/images/banners/haleemwebbanner.png"
import karachiBulkBuyStaticBanner1 from "../public/assets/images/banners/bulkBuyBanner.jpeg"
import crossIcon from "../public/assets/svgs/crossIcon.svg"
import Carousel from "../components/Layout/components/Banner/Carousel"
import { useHomeApi } from "../helpers/Api"
import TypeCardSelector from "../components/Layout/components/Cards/TypeCardSelector"
import { useSelector } from "react-redux"
import IndexLoader from "../components/Layout/components/Loaders/IndexLoader"

export default function Home() {
	const router = useRouter()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)
	let { token } = getGeneralApiParams()
	const { isLoading, isPopupAd, homeData } = useHomeApi()
	const [showPopupAd, setShowPopupAd] = useState(isPopupAd)

	if (isLoading) {
		return (
			<div>
				<HeadTag
					title={"Apricart | Online Grocery"}
					description={
						"Online grocery store in Pakistan, offering bulk buy and home delivery"
					}
				/>
				{/* <p>Loading</p> */}
				<IndexLoader />
			</div>
		)
	}

	if (!homeData) {
		return (
			<div>
				<HeadTag
					title={"Apricart | Online Grocery"}
					description={
						"Online grocery store in Pakistan, offering bulk buy and home delivery"
					}
				/>
				<p>No data</p>
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
			<div className="grid grid-cols-5 gap-6">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:block lg:col-span-1">
					<Categories />
				</section>
				<section className="space-y-8 col-span-5 lg:col-span-4">
					<TypeCardSelector />
					{/* BANNERS SECTION hidden on phone */}
					<section className="hidden lg:relative lg:w-full lg:aspect-[16/6] lg:grid grid-cols-12 p-2 items-center">
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
							<section className="w-full">
								<Carousel />
							</section>
						</section>
						{/* STATIC BANNERS */}
						{selectedTypeSelector === 'bulk' ? (
							<section className="col-span-5 grid grid-rows-1 h-full w-full justify-items-center align-items-center">
								<div className="relative w-full p-2">
									<Link href={"/"} passHref>
										<a>
											<Image
												src={karachiBulkBuyStaticBanner1}
												layout={"responsive"}
												alt="banner"
											/>
										</a>
									</Link>
								</div>
							</section>
						) : (
							<section className="col-span-5 grid grid-rows-2 h-full w-full justify-items-center align-items-center">
								<div className="relative w-full p-2">
									<Link href={"/offers/39"} passHref>
										<a>
											<Image
												src={karachiStaticBanner2}
												layout={"responsive"}
												alt="banner"
											/>
										</a>
									</Link>
								</div>
								<div className="relative w-full p-2">
									<Link
										href={"/offers/14"}
										passHref
									>
										<a>
											<Image
												src={karachiStaticBanner1}
												layout={"responsive"}
												alt="banner"
											/>
										</a>
									</Link>
								</div>
							</section>
						)}
					</section>
					{/* BANNERS SECTION hidden on desktop */}
					<section className="lg:hidden w-full items-center mt-4">
						{/* MAIN BANNER */}
						<section className="w-full">
							<Carousel />
						</section>
					</section>
					<div className="">
						{/* PRODUCTS SECTION */}
						<section className="space-y-12">
							{homeData.products.map((product, index) => {
								let { offerId } = product

								return (
									<section key={offerId}>
										{/* STATIC BANNERS for mobile */}
										{index % 2 == 0 ? (
											<section className="lg:hidden relative space-y-6 items-center">
												<section className="w-full">
													<Link
														href={"/offers/39"}
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
				</section>
			</div>
		</div>
	)
}

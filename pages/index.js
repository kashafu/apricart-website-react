import Image from "next/image";
import Categories from "../components/Layout/components/Categories/Categories";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { base_url_api } from '../information.json'
import axios from "axios";
import ScrollingProducts from "../components/Layout/components/Products/ScrollingProducts";
import { getGeneralApiParams } from '../helpers/ApiHelpers'
import Banner from "../components/Layout/components/Banner/Banner";
import MainProducts from '../components/Layout/components/Products/MainProducts'
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateTicker } from "../redux/general.slice";
import HeadTag from "../components/Layout/components/Head/HeadTag";
import storeBackgroundImage from '../public/assets/images/storeBackground.png'

export default function Home() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	let token = cookies.get('cookies-token')

	const [categories, setCategories] = useState(null)
	const [homeData, setHomeData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('Loading');

	useEffect(() => {
		getHomeDataApi()
		getCategoriesApi()
	}, [])

	const getHomeDataApi = async () => {
		let { city, latitude, longitude, userId, headers } = getGeneralApiParams()

		let url = base_url_api + '/home/all?client_lat=' + latitude + '&client_long=' + longitude + '&city=' + city + '&lang=en&userid=' + userId + '&web=false&client_type=apricart'
		try {
			let response = await axios.get(
				url,
				{
					'headers': headers
				}
			)

			setHomeData(response.data.data);
			dispatch(updateTicker(response.data.data.ticker));
		} catch (error) {
			setErrorMessage(error.message)
		}
	}

	const getCategoriesApi = async () => {
		let { city, headers } = getGeneralApiParams()
		let url = base_url_api + '/catalog/categories?level=all&client_type=apricart&city=' + city

		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	if (!homeData) {
		return (
			<div>
				<p>
					{errorMessage}
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			<HeadTag title={'APRICART'} />
			{/* BANNERS SECTION */}
			<section className="relative w-screen aspect-[16/6] grid grid-cols-2 items-center">
				{/* BACKGROUND IMAGE */}
				<div className="absolute w-full h-full blur-lg">
					<Image
						src={storeBackgroundImage}
						layout={'responsive'}
					/>
				</div>
				{/* SCROLLING BANNER */}
				<section className="">
					<Banner
						banners={homeData.banners}
					/>
				</section>
				{/* STATIC BANNERS */}
				<section className="grid grid-rows-2">
					<Banner
						banners={homeData.banners}
					/>
					<Banner
						banners={homeData.banners}
					/>
				</section>
			</section>
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					{categories && (
						<Categories
							categories={categories}
						/>
					)}
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
					{/* WEB PRODUCTS SECTION */}
					{/* <section className="col-span-5 lg:col-span-4 space-y-12">
						<MainProducts
							products={homeData.webProducts}
						/>
					</section> */}
					{homeData.products.map((product) => {
						let { bannerImageWeb, data, name, offerId } = product

						// If the name is 'Upload Grocery List', we have to return a button which allows to upload grocery list
						if (name === 'Upload Grocery List') {
							return (
								<div className="mb-2 mt-8 flex flex-row w-full rounded-xl p-2 bg-main-yellow items-center align-center justify-around">
									<Link href={'/grocery_list'} passHref
									>
										<a className="text-main-blue font-bold text-lg w-full text-center">
											UPLOAD your GROCERY LIST
										</a>
										{/* <Link href={'/grocery_list'} passHref>
											<a className="w-full bg-main-blue text-white p-4 text-xl rounded-xl text-center">
												Manual Order
											</a>
										</Link> */}
									</Link>
								</div>
							)
						}

						return (
							// TODO get a unique id from api, using name for now
							// <section key={name} className='space-y-4'>
							// 	<div className="relative w-full h-[90px] md:h-[150px] lg:h-[250px] rounded-xl overflow-hidden">
							// 		<Link href="/offers/[id]"
							// 			as={
							// 				"/offers/" + offerId
							// 			}
							// 			passHref
							// 			key={offerId}
							// 		>
							// 			<a>
							// 				<Image
							// 					src={bannerImageWeb}
							// 					layout={'fill'}
							// 					alt={"banner image"}
							// 				/>
							// 			</a>
							// 		</Link>
							// 	</div>
							// 	<p className="text-2xl">
							// 		{name}
							// 	</p>
							// 	<ScrollingProducts
							// 		products={data}
							// 	/>
							// </section>
							<MainProducts
								section={product}
							/>
						)
					})}
				</section>
			</div>

		</div>
	);
}

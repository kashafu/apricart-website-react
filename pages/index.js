import Head from "next/head";
import Image from "next/image";
import Categories from "../components/Layout/components/Categories/Categories";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { base_url_api } from '../information.json'
import axios from "axios";
import ScrollingProducts from "../components/Layout/components/Products/ScrollingProducts";
import { getGeneralApiParams } from '../helpers/ApiHelpers'
import Banner from "../components/Layout/components/Banner/Banner";


export default function Home() {
	const cookies = new Cookies();
	let token = cookies.get('cookies-token')
	if (!token) {
		const d = new Date();
		cookies.set('guestUserId', 'desktopuser_' + d.getTime(), 30);
	}

	const [homeData, setHomeData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('Loading')

	useEffect(() => {
		getHomeDataApi()
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
			setHomeData(response.data.data)
		} catch (error) {
			setErrorMessage(error.message)
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
		<>
			{/* TODO IMPLEMENT HEAD WITH ICON AND NAME */}
			<Head>Apricart</Head>
			{/* BANNERS SECTION */}
			<section className="w-full ">
				<Banner
					banners={homeData.banners}
				/>
			</section>
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories
						categories={homeData.categories}
					/>
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
					{homeData.products.map((product) => {
						let { bannerImageWeb, data, name } = product

						// If the name is 'Upload Grocery List', we have to return a button which allows to upload grocery list
						if (name === 'Upload Grocery List') {
							return (
								<button className="w-full bg-main-blue text-white p-6 text-xl rounded-xl">
									Upload Grocery List
								</button>
							)
						}

						return (
							// TODO get a unique id from api, using name for now
							<section key={name} className='space-y-4'>
								<div className="relative w-full h-[100px] md:h-[200px] lg:h-[300px]">
									<Image
										src={bannerImageWeb}
										layout={'fill'}
										alt={"banner image"}
									/>
								</div>
								<p className="text-2xl">
									{name}
								</p>
								<ScrollingProducts
									products={data}
								/>
							</section>
						)
					})}
				</section>
			</div>

		</>
	);
}

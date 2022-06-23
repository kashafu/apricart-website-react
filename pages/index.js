import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Categories from "../components/Layout/components/Categories/Categories";
import Slider from "../components/Layout/components/Slider/BannerSlider";
import PopularItem from "../components/Layout/components/PopularItem/PopularItem";
import RecommendedProducts from "../components/Layout/components/RecommendedProducts/RecommendedProducts";
import MostSold from "../components/Layout/components/MostSold/MostSold";
import Slider2 from "../components/Layout/components/Slider/BannerSlider";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { base_url_api } from '../information.json'
import axios from "axios";
import BannerSlider from "../components/Layout/components/Slider/BannerSlider";
import MainProducts from "../components/Layout/components/Products/MainProducts";
//import Slider from "../components/Layout/components/Slider/Slider";



export default function Home() {
	const cookies = new Cookies();
	var token = cookies.get('cookies-token')
	if (!token) {
		const d = new Date();
		cookies.set('guestUserId', 'desktopuser_' + d.getTime(), 30);
	}

	const [homeData, setHomeData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('Loading')

	useEffect(()=>{
		getHomeDataApi()
	}, [])

	const getHomeDataApi = async() => {
		// city cookies is being set in TopBar.js
		let city = cookies.get('cities')
		let latitude = 0 
		let longitude = 0
		let userId = cookies.get('guestUserId')
		navigator.geolocation.getCurrentPosition((position)=> {
			latitude= position.coords.latitude
			longitude= position.coords.longitude
		})
		// TODO CHECK IF GUEST USER AND USE ID ACCORDINGLY
		let url = base_url_api + '/home/all?client_lat=' + latitude + '&client_long=' + longitude + '&city=' + city + '&lang=en&userid=' + userId + '&web=true&client_type=apricart'
		try {
			let response = await axios.get(
				url,
				{
					headers: {
						"Content-Type": "application/json",
						// Authorization: "Bearer " + cookies.get("cookies-token"),
					},
				}
			)
			setHomeData(response.data.data)
			console.log(response.data.data)
		} catch (error) {
			setErrorMessage(error)
		}
	}

	if(!homeData){
		return(
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
			<div>

			</div>
			{/* old */}
			<div className="row">
				<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
					<Categories 
						categories={homeData.categories}
					/>
				</div>
				<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
					{/* <Slider /> */}
					<section className="min-h-[150px] sm:min-h-[170px] md:min-h-[300px] lg:min-h-[360px]">
						{/* <Slider2 /> */}
						<BannerSlider
							banners={homeData.banners}
						/>
					</section>
					<MainProducts
						products={homeData.webProducts[0].data}
					/>
					<PopularItem />
					<RecommendedProducts />
					<MostSold />
				</div>
			</div>
		</>
	);
}

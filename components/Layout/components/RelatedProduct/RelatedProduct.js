import axios from "axios"
import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../redux/cart.slice"
import { base_url_api } from "../../../../information.json"
import Cookies from "universal-cookie"
import ScrollingProducts from "../Products/ScrollingProducts"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"

export default function RecommendedProducts() {
	const dispatch = useDispatch()
	const cookies = new Cookies()
	var token = cookies.get("cookies-token")

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplaySpeed: 2000,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					initialSlide: 2,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false,
				},
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
				},
			},
		],
	}
	const [users, setUsers] = useState([])
	const getPopularitems = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/recommended?page=1&size=6&city=" +
			city +
			"&lang=en&client_type=apricart&userid=" +
			userId
		const response = await axios.get(
			url, {headers: headers}
		)
		setUsers(response.data.data)
	}
	useEffect(() => {
		getPopularitems()
	}, [])
	return (
		<section className="recommend_sec">
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
						<section className="space-y-2 flex flex-col">
							<p className="font-bold w-full text-center text-main-blue text-lg lg:text-3xl border-t-2 pt-4">
								People also buy
							</p>
							<ScrollingProducts products={users} />
						</section>
					</div>
				</div>
			</div>
		</section>
	)
}

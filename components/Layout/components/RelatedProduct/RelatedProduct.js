import axios from "axios"
import { useEffect, useState } from "react"
import { base_url_api } from "../../../../information.json"
import ScrollingProducts from "../Products/ScrollingProducts"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"

export default function RecommendedProducts() {
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
			url, { headers: headers }
		)
		setUsers(response.data.data.products)
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

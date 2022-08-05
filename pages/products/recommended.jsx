import { useState, useEffect } from "react"
import axios from "axios"
import HeadTag from "../../components/Layout/components/Head/HeadTag"
import Categories from "../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../components/Layout/components/Products/SingleProduct"
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import { getGeneralApiParams } from "../../helpers/ApiHelpers"
import { base_url_api } from "../../information.json"

export default function Recommended() {
	const [products, setProducts] = useState(null)

	useEffect(() => {
		getPoductsApi()
	}, [])

	const getPoductsApi = async () => {
		let { headers, city, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/recommended?page=1&size=20&city=" +
			city +
			"&lang=en&client_type=apricart&userid=" + userId

		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setProducts(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	if (!products) {
		return (
			<div>
				<p>Loading</p>
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={"Recommended"} />
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories />
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
                    <PageHeading
                        text='RECOMMENDED PRODUCTS'
                    />
					{products == null || products?.data?.length == 0 ? (
						<div>NO ITEMS EXIST</div>
					) : (
						<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
							{products.data.map((product) => {
								let { id } = product
								return (
									<div key={id}>
										<SingleProduct product={product} />
									</div>
								)
							})}
						</section>
					)}
				</section>
			</div>
		</div>
	)
}

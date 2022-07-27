import { useEffect, useState } from "react"
import { getGeneralApiParams } from "../../helpers/ApiHelpers"
import { base_url_api } from '../../information.json'
import MainProducts from '../../components/Layout/components/Products/MainProducts'
import Categories from '../../components/Layout/components/Categories/Categories'
import { useRouter } from 'next/router'
import axios from "axios"

export default function OfferId() {
	const router = useRouter()
	const { id } = router.query

	const [offerItems, setOfferItems] = useState(null)
	const [categories, setCategories] = useState(null)

	useEffect(() => {
		getOfferItemsApi()
		getCategoriesApi()
	}, [])

	const getOfferItemsApi = async () => {
		let { city, headers } = getGeneralApiParams()
		let url = base_url_api + '/offers/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart'

		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			setOfferItems(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getCategoriesApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city + "&userid=" + userId 

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

	if (!offerItems) {
		return (
			<div>
				<p>
					Items do not exist
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-5 gap-8">
			<section className="hidden lg:col-span-1 lg:block">
				{categories && (
					<Categories
						categories={categories}
					/>
				)}
			</section>
			<section className="col-span-5 lg:col-span-4 space-y-12">
				<MainProducts
					products={offerItems}
				/>
			</section>
		</div>
	)
}
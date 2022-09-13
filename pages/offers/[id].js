import { useEffect, useState } from "react"
import { getGeneralApiParams } from "../../helpers/ApiHelpers"
import { base_url_api } from '../../information.json'
import Categories from '../../components/Layout/components/Categories/Categories'
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import { useRouter } from 'next/router'
import axios from "axios"
import ListProducts from "../../components/Layout/components/Products/ListProducts"

export default function OfferId() {
	const router = useRouter()
	const { id } = router.query

	const [offerItems, setOfferItems] = useState(null)

	useEffect(() => {
		if (router.isReady) {
			getOfferItemsApi()
		}
	}, [router.query])

	const getOfferItemsApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url = base_url_api + '/offers/detail?id=' + id + '&city=' + city + '&lang=en&client_type=apricart&userid=' + userId

		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			if (response?.data?.data?.products.length > 0) {
				setOfferItems(response.data.data.products)
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (!offerItems) {
		return (
			<div>
				<PageHeading
					text={'Loading'}
				/>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-5 gap-8">
			<section className="hidden lg:col-span-1 lg:block">
				<Categories />
			</section>
			<section className="col-span-5 lg:col-span-4 space-y-12">
				<ListProducts
					products={offerItems}
				/>
			</section>
		</div>
	)
}
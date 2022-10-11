import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import ListProducts from "../../components/Layout/components/Products/ListProducts"
import { useOfferProductsApi } from "../../helpers/Api"
import ListProductsShimmer from "../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"
import HeadTag from "../../components/Layout/components/Head/HeadTag"
import CategoryAndItemsLayout from "../../components/Layout/components/Layouts/CategoryAndItemsLayout"

export default function OfferId() {
	const Products = () => {
		const { isLoading, errorResponse, errorMessage, offerProducts } = useOfferProductsApi()

		if (isLoading) {
			return (
				<ListProductsShimmer />
			)
		}

		if (errorResponse) {
			return (
				<p>
					{errorMessage}
				</p>
			)
		}

		if (offerProducts.length === 0) {
			return (
				<p>
					No items to show
				</p>
			)
		}

		return (
			<ListProducts
				products={offerProducts}
			/>
		)
	}

	const PageItems = () => {
		return (
			<div className='space-y-4'>
				<PageHeading
					text={"OFFER"}
				/>
				<Products />
			</div>
		)
	}

	return (
		<div>
			<HeadTag
				title={"Offer"}
			/>
			<CategoryAndItemsLayout>
				<PageItems />
			</CategoryAndItemsLayout>
		</div>
	)
}

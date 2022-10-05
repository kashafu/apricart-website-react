import Categories from '../../components/Layout/components/Categories/Categories'
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import ListProducts from "../../components/Layout/components/Products/ListProducts"
import { useOfferProductsApi } from "../../helpers/Api"
import ListProductsShimmer from "../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"
import HeadTag from "../../components/Layout/components/Head/HeadTag"

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

	return (
		<div>
			<HeadTag
				title={"Offer"}
			/>
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories />
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4">
					<PageHeading
						text={"OFFER"}
					/>
					<section>
						<Products />
					</section>
				</section>
			</div>
		</div>
	)
}
import HeadTag from "../../components/Layout/components/Head/HeadTag"
import SingleProduct from "../../components/Layout/components/Products/SingleProduct"
import PageHeading from "../../components/Layout/components/Typography/PageHeading"
import { useMostViewedProductsApi } from "../../helpers/Api"
import CategoryAndItemsLayout from "../../components/Layout/components/Layouts/CategoryAndItemsLayout"
import ListProductsShimmer from "../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"

export default function MostViewed() {
	const { isLoading, errorMessage, mostViewedProducts } = useMostViewedProductsApi()

	const MostViewedProducts = () => {
		if (isLoading) {
			return (
				<ListProductsShimmer />
			)
		}

		if (!mostViewedProducts) {
			return (
				<div>
					<p>{errorMessage}</p>
				</div>
			)
		}

		if (mostViewedProducts.length == 0) {
			return (
				<div>
					<p>No Items</p>
				</div>
			)
		}

		return (
			<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
				{mostViewedProducts.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct product={product} />
						</div>
					)
				})}
			</section>
		)
	}

	const PageItems = () => {
		return (
			<div className='space-y-4'>
				<PageHeading
					text="BEST SELLER"
				/>
				<MostViewedProducts />
			</div>
		)
	}

	return (
		<div>
			<HeadTag
				title={"Most Viewed"}
			/>
			<CategoryAndItemsLayout>
				<PageItems />
			</CategoryAndItemsLayout>
		</div>
	)
}

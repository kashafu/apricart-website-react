import HeadTag from "../../components/Layout/components/Head/HeadTag"
import SingleProduct from "../../components/Layout/components/Products/SingleProduct"
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import { useRecommendedProductsApi } from "../../helpers/Api"
import CategoryAndItemsLayout from "../../components/Layout/components/Layouts/CategoryAndItemsLayout"
import ListProductsShimmer from "../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"

export default function Recommended() {
	const { isLoading, errorMessage, recommendedProducts } = useRecommendedProductsApi()

	const RecommendedProducts = () => {
		if (isLoading) {
			return (
				<ListProductsShimmer />
			)
		}

		if (!recommendedProducts) {
			return (
				<div>
					<p>{errorMessage}</p>
				</div>
			)
		}

		if (recommendedProducts.length == 0) {
			return (
				<div>
					<p>No Items</p>
				</div>
			)
		}

		return (
			<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
				{recommendedProducts.map((product) => {
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
					text="PEOPLE ALSO BUY"
				/>
				<RecommendedProducts />
			</div>
		)
	}

	return (
		<div>
			<HeadTag
				title={"Recommended Products"}
			/>
			<CategoryAndItemsLayout>
				<PageItems />
			</CategoryAndItemsLayout>
		</div>
	)
}

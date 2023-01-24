import HeadTag from "../components/Layout/components/Head/HeadTag"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import SingleProduct from "../components/Layout/components/Products/SingleProduct"
import { useRemoveFromWishlist, useWishlistProductsApi } from "../helpers/Api"
import SubCategoryProductsShimmer from "../components/Layout/components/Loaders/Shimmers/SubCategoryProductsShimmer"
import CategoryAndItemsLayout from "../components/Layout/components/Layouts/CategoryAndItemsLayout"
import Paragraph from "../components/Layout/components/Typography/Paragraph"

const WishlistProducts = () => {
	const { setData, setIsRemove } = useRemoveFromWishlist()
	const { isLoading, errorMessage, errorResponse, wishlistProducts } = useWishlistProductsApi()

	if (isLoading) {
		return (
			<SubCategoryProductsShimmer />
		)
	}

	if (errorResponse) {
		return (
			<p>
				{errorMessage}
			</p>
		)
	}

	return (
		<>
			{wishlistProducts.length == 0 ? (
				<Paragraph
					text={"Add items to favourites to view them here"}
				/>
			) : (
				<section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{wishlistProducts.map((result) => {
						let { sku } = result
						return (
							<div className="flex flex-col space-y-1" key={sku}>
								<SingleProduct product={result} />
								<button
									className="w-full bg-red-500 rounded-lg font-nunito text-white font-bold"
									onClick={() => {
										setData({
											sku: [sku]
										})
										setIsRemove(true)
									}}
								>
									Remove from wishlist
								</button>
							</div>
						)
					})}
				</section>
			)}
		</>
	)
}

const Wishpage = () => {
	return (
		<div>
			<HeadTag title={'Favourites'} />
			<CategoryAndItemsLayout>
				<PageHeading
					text={'Favourites'}
				/>
				<WishlistProducts />
			</CategoryAndItemsLayout>

		</div>
	)
}

export default Wishpage

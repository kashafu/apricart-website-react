import HeadTag from "../components/Layout/components/Head/HeadTag"
import Categories from "../components/Layout/components/Categories/Categories"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import SingleProduct from "../components/Layout/components/Products/SingleProduct"
import { useRemoveFromWishlist, useWishlistProductsApi } from "../helpers/Api"
import SubCategoryProductsShimmer from "../components/Layout/components/Loaders/Shimmers/SubCategoryProductsShimmer"

const Wishpage = () => {
	const { setData, setIsRemove } = useRemoveFromWishlist()

	const WishistProducts = () => {
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
					<div>NO ITEMS EXIST</div>
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

	return (
		<div>
			<HeadTag title={'Shopping List'} />
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories />
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
					<PageHeading
						text={'Shopping List'}
					/>
					<WishistProducts />
				</section>
			</div>
		</div>
	)
}

export default Wishpage

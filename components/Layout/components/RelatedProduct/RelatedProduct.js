import ScrollingProducts from "../Products/ScrollingProducts"
import { useRecommendedProductsApi } from "../../../../helpers/Api"

export default function RelatedProducts() {
	const { isLoading, recommendedProducts } = useRecommendedProductsApi("related")

	return (
		<section className="space-y-4 flex flex-col">
			<p className="font-bold w-full text-center text-main-blue text-lg lg:text-3xl border-t-2 pt-4">
				People also buy
			</p>
			{!isLoading && (
				<ScrollingProducts products={recommendedProducts} />
			)}
		</section>
	)
}

import SingleProductShimmer from "./SingleProductShimmer"

const MainProductsShimmer = () => {
	return (
		<div className="space-y-4 lg:space-y-12">
			<div className="lg:hidden h-[150px] w-full bg-slate-200 animate-pulse rounded-lg" />
			<>
				<div className="grid lg:hidden grid-cols-2 gap-2 w-full">
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
				</div>
				<div className="hidden lg:grid grid-cols-4 2xl:hidden gap-2 w-full">
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
				</div>
				<div className="hidden 2xl:grid grid-cols-5 gap-2 w-full">
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
					<SingleProductShimmer />
				</div>
			</>
			<div className="aspect-[4.5] w-full bg-slate-200 animate-pulse rounded-lg" />
		</div>
	)
}

export default MainProductsShimmer
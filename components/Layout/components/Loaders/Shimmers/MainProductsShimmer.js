const MainProductsShimmer = () => {
	const SingleProductShimmer = () => {
		return (
			<div className="animate-pulse h-[300px] flex flex-col w-full p-2 rounded-lg bg-slate-200">
				<div className="animate-pulse w-full h-2/3 bg-slate-100 rounded-lg"></div>
				<div className="h-1/3 space-y-2 flex flex-col justify-between py-2">
					<div className="animate-pulse w-full h-full rounded-lg bg-slate-50"></div>
					<div className="animate-pulse w-full h-full rounded-lg bg-slate-50"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4 lg:space-y-12">
			<div className="h-[150px] lg:h-[350px] w-full bg-slate-200 animate-pulse rounded-lg" />
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
		</div>
	)
}

export default MainProductsShimmer
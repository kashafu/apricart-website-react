const CategoryShimmer = () => {
	const SingleCategoryShimmer = () => {
		return (
			<div className="animate-pulse h-[25px] m-2 bg-slate-200 rounded-lg" />
		)
	}

	return (
		<div className="w-full rounded-lg bg-slate-100 p-2">
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
			<SingleCategoryShimmer />
		</div>
	)
}

export default CategoryShimmer
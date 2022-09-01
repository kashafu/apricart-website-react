const CategoryShimmer = () => {
	const SingleCategoryShimmer = () => {
		return (
			<div className="animate-pulse h-[30px] bg-slate-200 rounded-lg" />
		)
	}

	return (
		<div className="w-full flex flex-col space-y-4 rounded-lg bg-slate-100 p-2">
			<div className="animate-pulse h-[40px] w-[80%] bg-slate-200 rounded-lg" />
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
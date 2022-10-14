import SingleCategoryShimmer from "./SingleCategoryShimmer"

const MainCategoriesShimmer = () => {
	return (
		<div className="space-y-4 px-2 py-2">
			<div className="w-full h-[40px] p-1 flex flex-row items-center justify-between">
				<div className="h-full w-3/6 animate-pulse bg-slate-100 rounded-lg" />
				<div className="h-full w-2/6 animate-pulse bg-slate-100 rounded-lg" />
			</div>
			<div className="grid grid-cols-3 lg:hidden gap-x-10 gap-y-2">
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
			<div className="hidden lg:grid lg:grid-cols-5 gap-x-12 gap-y-2 2xl:hidden">
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
			<div className="hidden 2xl:grid 2xl:grid-cols-6 gap-x-12 gap-y-2">
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
		</div>
	)
}

export default MainCategoriesShimmer
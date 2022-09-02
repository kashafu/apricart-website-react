const SubCategoryShimmer = () => {
    const SingleShimmer = () => {
        return (
            <div className="h-[50px] w-[200px] rounded-xl bg-slate-200 animate-pulse" />
        )
    }

    return (
        <div className="flex flex-row gap-4 py-4 px-2">
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
        </div>
    )
}

export default SubCategoryShimmer
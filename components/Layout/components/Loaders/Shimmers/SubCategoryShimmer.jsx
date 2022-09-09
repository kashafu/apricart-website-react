const SubCategoryShimmer = () => {
    const SingleShimmer = () => {
        return (
            <div className="h-[50px] w-[200px] rounded-xl bg-slate-200 animate-pulse" />
        )
    }

    return (
        <div>
            <div className="hidden lg:flex overflow-auto h-full w-full gap-4 py-4 px-2">
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
            </div>
            <div className="flex lg:hidden overflow-auto h-full w-full gap-4 py-4 px-2">
                <SingleShimmer />
                <SingleShimmer />
                <SingleShimmer />
            </div>
        </div>
    )
}

export default SubCategoryShimmer
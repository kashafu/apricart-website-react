const SingleCategoryShimmer = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full h-full">
                <div className="w-full h-full aspect-square rounded-full bg-slate-100 animate-pulse" />
            </div>
            <div className="animate-pulse w-full h-[30px] bg-slate-100 rounded-lg" />
        </div>
    )
}

export default SingleCategoryShimmer
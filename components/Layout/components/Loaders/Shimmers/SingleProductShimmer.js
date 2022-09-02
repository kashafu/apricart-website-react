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

export default SingleProductShimmer
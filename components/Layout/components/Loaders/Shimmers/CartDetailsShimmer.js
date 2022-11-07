const CartDetailsShimmer = () => {
    const SingleShimmer = () => {
        return (
            <div className="w-full h-full py-1 flex flex-row justify-between animate-pulse">
                <div className="w-1/5 h-full rounded-lg bg-slate-100" />
                <div className="w-1/3 h-full rounded-lg bg-slate-100" />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full lg:border-l-2 border-y-2 h-[220px] p-2 space-y-4">
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
        </div>
    )
}

export default CartDetailsShimmer
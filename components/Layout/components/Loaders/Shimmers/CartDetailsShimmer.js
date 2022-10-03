const CartDetailsShimmer = () => {
    const SingleShimmer = () => {
        return (
            <div className="w-full h-full flex flex-row justify-between animate-pulse">
                <div className="w-1/4 h-full rounded-lg bg-slate-100" />
                <div className="w-1/3 h-full rounded-lg bg-slate-100" />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-[220px] bg-slate-200 p-2 rounded-lg space-y-4">
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
            <SingleShimmer />
        </div>
    )
}

export default CartDetailsShimmer
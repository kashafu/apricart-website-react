const ProductPageLoader = () => {
    return (
        <div className="w-full space-y-6">
            {/* BREADCRUMB */}
            <div className="w-[200px] h-[20px] bg-slate-100 rounded-lg animate-pulse" />
            <div className="w-full flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 items-center">
                {/* IMAGE */}
                <div className="w-10/12 sm:w-3/5 lg:w-full lg:col-span-1 aspect-square bg-slate-100 rounded-lg animate-pulse" />
                {/* PRICE and TITLE and DESCRIPTION and ADD TO CART */}
                <div className="lg:col-span-2 space-y-4 lg:space-y-4">
                    {/* PRICE and TITLE */}
                    <div className="w-full flex flex-col items-start space-y-2 lg:space-y-10">
                        {/* TITLE */}
                        <div className="w-[300px] h-[40px] bg-slate-100 rounded-lg animate-pulse" />
                        {/* PRICE */}
                        <div className="w-[100px] h-[20px] bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                    {/* DESCRIPTION */}
                    <div className="space-y-2">
                        {/* DESCRIPTION */}
                        <div className="w-[100px] h-[30px] bg-slate-100 rounded-lg animate-pulse" />
                        {/* SKU */}
                        <div className="w-[50px] h-[30px] bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                    {/* <AddToCart /> */}
                    <div className="flex flex-row w-full justify-evenly lg:justify-start lg:space-x-4">
                        <div className="w-[100px] h-[40px] bg-slate-100 rounded-lg animate-pulse" />
                        <div className="w-[150px] h-[40px] bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPageLoader
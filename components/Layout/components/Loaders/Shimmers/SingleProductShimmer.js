import Image from "next/image"

import productBackground from "../../../../../public/assets/svgs/productBackground.svg"

const SingleProductShimmer = () => {
    return (
        <div className="relative flex flex-col w-full h-[180px] sm:h-[200px] xl:h-[220px] 2xl:h-[250px] 3xl:h-[280px]">
            {/* Background image */}
            <div className="absolute flex h-full w-full">
                <Image
                    src={productBackground}
                    alt=''
                    layout="fill"
                />
            </div>
            <div className="flex flex-col items-center w-full h-full">
                <div className="relative grid grid-rows-[7] gap-2 place-items-center w-[80%] h-[85%]">
                    <div className="row-span-4 animate-pulse w-1/2 h-full bg-slate-100 rounded-lg"></div>
                    <div className="row-span-2 animate-pulse w-full h-full bg-slate-100 rounded-lg"></div>
                    <div className="row-span-1 w-full h-full flex flex-row justify-between space-x-8">
                        <div className="animate-pulse w-1/2 h-full bg-slate-100 rounded-lg"></div>
                        <div className="animate-pulse w-1/2 h-full bg-slate-100 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductShimmer
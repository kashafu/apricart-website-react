import Image from "next/image"
import Link from "next/link"

import { base_url_api } from '../../../../information.json'

export default function SingleProduct({product}){
    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku } = product
    let imageUrl = productImageUrlThumbnail == '' ? productImageUrl : productImageUrlThumbnail

    return(
        <div className="flex flex-col p-2 border-2 bg-white w-full h-full rounded-2xl">
            <Link
                href={'/'}
                passHref
            >
                <button className="flex flex-col items-center justify-between w-full h-full space-y-2">
                    <div className="flex flex-col items-center">
                        <div className="relative w-[120px] h-[120px]">
                            <Image
                                src={imageUrl}
                                layout={'fill'}
                            />
                        </div>
                        <p className="font-lato font-bold text-left text-xs text-main-blue">
                            {title}
                        </p>
                    </div>
                    <div className="w-full space-y-4">
                        <p className="font-lato text-sm text-left">
                            Rs. <span className="text-main-blue font-bold"> {currentPrice} </span>
                        </p>
                        <button className="bg-main-blue font-lato text-sm py-2 w-5/6 rounded text-white hover:bg-white hover:text-main-blue">
                            Add to Cart
                        </button>
                    </div>
                </button>
            </Link>
        </div>
    )
}
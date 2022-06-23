import Image from "next/image"
import Link from "next/link"

import { base_url_api } from '../../../../information.json'

export default function SingleItem({item}){
    console.log(item)
    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku } = item
    let imageUrl = productImageUrlThumbnail == '' ? productImageUrl : productImageUrlThumbnail

    return(
        <div className="flex p-2 border-2 bg-white w-full">
            <Link
                href={'/'}
                passHref
            >
                <button className="">
                    <div className="relative w-[120px] h-[120px]">
                        <Image
                            src={imageUrl}
                            layout={'fill'}
                        />
                    </div>
                    <p>
                        {title}
                    </p>
                    <p>
                        Rs. {currentPrice}
                    </p>
                    <button>
                        <div>
                            <p>
                                Add to Cart
                            </p>
                        </div>
                    </button>
                </button>
            </Link>
        </div>
    )
}
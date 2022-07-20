import Image from "next/image"
import Link from "next/link"
import missingImageIcon from '../../../../public/assets/svgs/missingImageIcon.svg'

export default function SingleProductList({ product, isInStock }) {

    let { productImageUrl, productImageUrlThumbnail, title, currentPrice, sku, inStock } = product
    if (isInStock) {
        inStock = isInStock
    }
    let imageUrl = productImageUrlThumbnail != '' ? productImageUrlThumbnail : (productImageUrl != '' ? productImageUrl : missingImageIcon)

    return (
        <div className="flex flex-row w-full bg-white rounded-lg items-center shadow overflow-hidden">
            <Link href="/details/[id]"
                as={
                    "/details/" + sku
                }
                passHref
            >
                <a className="flex flex-row w-full items-center">
                    <div className="w-1/6 p-2">
                        <Image
                            src={imageUrl}
                            layout={'responsive'}
                        />
                    </div>
                    <div className="relative flex flex-col items-center justify-between w-full rounded-2xl space-y-2 py-2">
                        <div className=" flex flex-col items-center">
                            <p className="font-lato font-bold text-left text-xs text-main-blue flex-1">
                                {title}
                            </p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <p className="font-lato text-sm text-left">
                                Rs. <span className="text-main-blue font-bold"> {currentPrice} </span>
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}
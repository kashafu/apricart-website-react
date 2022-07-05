import Image from "next/image";

export default function SingleProductCart({product}){
    let { productImageUrlThumbnail, productImageUrl, qty, currentPrice, sku, title } = product

    return(
        <div className="grid grid-cols-10 gap-6">
            <div className="col-span-3 relative block w-full">
                <Image
                    src={productImageUrlThumbnail === '' ? productImageUrl : productImageUrlThumbnail}
                    alt={title}
                    layout={'responsive'}
                    width={100}
                    height={100}
                />
            </div>
            <div className="col-span-6 flex flex-col">
                <p>
                    {title}
                </p>
                <div className="flex flex-row">
                    <p>
                        {qty}
                    </p>
                    <p>
                        x RS. {currentPrice}
                    </p>
                </div>
                <p className="pt-2">
                    RS. {currentPrice * qty}
                </p>
            </div>
            <div className="col-span-1">
                <button>
                    X
                </button>
            </div>
        </div>
    )
}
import Image from "next/image"
import Link from "next/link"

import trashIcon from '../../../../public/assets/svgs/trashIcon.svg'
import plusIcon from '../../../../public/assets/svgs/plusIcon.svg'
import minusIcon from '../../../../public/assets/svgs/minusIcon.svg'
import missingImageIcon from '../../../../public/assets/svgs/missingImageIcon.svg'
import { useDeleteItemApi, useUpdateItemQtyApi } from "../../../../helpers/Api"
import toKebabCase from "../../../../helpers/toKebabCase"

const CartItemListing = ({ item, fetchCart }) => {
    let {
        title,
        qty,
        minQty,
        currentPrice,
        specialPrice,
        productImageUrlThumbnail,
        productImageUrl,
        sku,
        categoryleafName,
        categoryIds,
    } = item

    // For error handling when category leaf name or id are undefined or null from api
    categoryleafName = categoryleafName ?? "category-leaf"
    categoryIds = categoryIds ?? "0"

    const { setIsUpdateItemQty, setData } = useUpdateItemQtyApi()
    const { setIsDelete, setSku } = useDeleteItemApi()

    let immediateCategoryName = categoryleafName.split("|")[0].trim()
    let immediateCategoryId = categoryIds.replace(/\s+/g, "").split("|")[0]

    return (
        <div className="grid grid-cols-4 lg:grid-cols-3 items-center lg:gap-2 overflow-hidden bg-white">
            <div className="col-span-1 place-self-center relative h-[50px] w-[50px] lg:h-[80px] lg:w-[80px]">
                <Link
                    href={
                        "/category/" +
                        toKebabCase(immediateCategoryName) +
                        "/" +
                        immediateCategoryId +
                        "/" +
                        toKebabCase(title) +
                        "/" +
                        sku
                    }
                    passHref
                >
                    <a>
                        <Image
                            src={
                                productImageUrlThumbnail
                                    ? productImageUrlThumbnail
                                    : productImageUrl
                                        ? productImageUrl
                                        : missingImageIcon
                            }
                            layout={"fill"}
                            alt="thumbnail"
                        />
                    </a>
                </Link>
            </div>
            <div className="col-span-3 lg:col-span-2 grid grid-rows-4 lg:pr-2">
                <div className="row-span-2 flex items-center">
                    <p className="font-bold text-base lg:text-lg">{title}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    {/* QUANTITY and PRICE */}
                    <div className="flex flex-row items-center space-x-2 lg:space-x-4">
                        <div className="grid grid-cols-3 bg-slate-200 rounded-lg gap-2 lg:gap-4 px-2">
                            <button
                                className={"flex flex-row items-center"}
                                onClick={() => {
                                    setData({
                                        qty: qty - 1,
                                        sku: sku
                                    })
                                    setIsUpdateItemQty(true)
                                    fetchCart(true)
                                }}
                            >
                                <Image src={minusIcon} width={10} height={10} alt="" />
                            </button>
                            <p>{qty}</p>
                            <button
                                className={"flex flex-row items-center"}
                                onClick={() => {
                                    setData({
                                        qty: qty + 1,
                                        sku: sku
                                    })
                                    setIsUpdateItemQty(true)
                                    fetchCart(true)
                                }}
                            >
                                <Image src={plusIcon} width={10} height={10} alt="" />
                            </button>
                        </div>
                        <p className="truncate text-sm lg:text-base">
                            {specialPrice > 0 ? (
                                "x RS. " + specialPrice
                            ) : (
                                "x RS. " + currentPrice
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSku(sku)
                            qty = minQty
                            setIsDelete(true)
                            fetchCart(true)
                        }}
                    >
                        <Image
                            src={trashIcon}
                            height={20}
                            width={20}
                            alt="icon"
                        />
                    </button>
                </div>
                <p className="font-bold text-lg lg:text-xl truncate">
                    {specialPrice > 0 ? (
                        "RS. " + specialPrice * qty
                    ) : (
                        "RS. " + currentPrice * qty
                    )}
                </p>
            </div>
        </div>
    )
}

export default CartItemListing
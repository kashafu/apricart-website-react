import Image from "next/image"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import Link from 'next/link'

import missingImageIcon from '../../../../public/assets/svgs/missingImageIcon.svg'
import trashIcon from '../../../../public/assets/svgs/trashIcon.svg'
import plusIcon from '../../../../public/assets/svgs/plusIcon.svg'
import minusIcon from '../../../../public/assets/svgs/minusIcon.svg'
import { useDeleteItemApi, useUpdateItemQtyApi } from "../../../../helpers/Api"
import toKebabCase from "../../../../helpers/toKebabCase"
import SectionHeading from "../Typography/SectionHeading"

const ItemListing = ({ item, fetchCart }) => {
    let {
        title,
        qty,
        currentPrice,
        specialPrice,
        productImageUrlThumbnail,
        productImageUrl,
        sku,
        categoryleafName,
        categoryIds,
    } = item

    const { setIsUpdateItemQty, setData } = useUpdateItemQtyApi()
    const { setIsDelete, setSku } = useDeleteItemApi()

    let immediateCategoryName = categoryleafName.split("|")[0].trim()
    let immediateCategoryId = categoryIds.replace(/\s+/g, "").split("|")[0]

    return (
        <div className="grid grid-cols-3 items-center gap-2 overflow-hidden bg-white">
            <div className="col-span-1 place-self-center relative h-[80px] w-[80px]">
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
            <div className="col-span-2 grid grid-rows-4 pr-2">
                <div className="row-span-2 flex items-center">
                    <p className="font-bold text-lg">{title}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    {/* QUANTITY and PRICE */}
                    <div className="flex space-x-4">
                        <div className="grid grid-cols-3 bg-slate-200 rounded-lg gap-4 lg:gap-4 px-2">
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
                        <p className="truncate">
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
                <p className="font-bold text-xl truncate">
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

const CheckoutCart = ({ initialCartProducts, initialCartData, isLoading, fetchCart }) => {
    const selectedTypeSelector = useSelector(state => state.general.selectedType)
    const reduxCart = useSelector(state => state.cart)

    let pLeft = "font-lato text-md text-main-blue"
    let pRight = "font-lato text-lg font-bold text-right"

    let {
        subtotal,
        tax,
        shipping_amount,
        grand_total,
        shipment_message,
        base_currency_code,
        couponDiscountAmount,
        pickup_message
    } = initialCartData

    return (
        <div className="flex flex-col w-full bg-white lg:border-l-2 border-t-2 lg:border-t-0">
            {/* <div className="hidden w-full lg:flex items-center justify-center py-2 bg-main-blue">
                <p className="font-lato text-lg font-bold text-white">
                    My Cart
                </p>
            </div> */}
            <div className="overflow-y-auto max-h-64 divide-y">
                {reduxCart.map((product) => {
                    return (
                        <ItemListing
                            key={product.sku}
                            item={product}
                            fetchCart={fetchCart}
                        />
                    )
                })}
            </div>
            <div className="grid grid-cols-2 gap-2 font-lato items-center border-y-2 px-4 py-2">
                <p className={pLeft}>SubTotal</p>
                <p className={pRight}>{base_currency_code} {subtotal}</p>
                {selectedTypeSelector === 'cnc' ? (
                    <>
                        {/* <p className={pLeft}>Pickup</p> */}
                        <p className={[pRight] + " col-span-2 text-justify"}>{parse(pickup_message)}</p>

                    </>
                ) : (
                    <>
                        <p className={pLeft}>Shipping</p>
                        <p className={pRight}>{parse(shipment_message)}</p>
                        <p className={pLeft}>Shipping Amount</p>
                        <p className={pRight}>
                            {base_currency_code} {shipping_amount}
                        </p>
                    </>
                )}
                <p className={pLeft}>Coupon Discount Amount</p>
                <p className={pRight}>
                    {base_currency_code} {couponDiscountAmount}
                </p>
                <p className={pLeft}>Total</p>
                <p className={pRight}>
                    {base_currency_code} {grand_total}
                </p>
            </div>
        </div>
    )
}

export default CheckoutCart
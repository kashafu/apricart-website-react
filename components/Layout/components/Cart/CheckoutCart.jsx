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
        <div className="grid grid-cols-3 items-center gap-2 overflow-hidden bg-slate-100">
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
                </Link>
            </div>
            <div className="col-span-2 grid grid-rows-4 pr-2">
                <div className="row-span-2 flex items-center">
                    <p>{title}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    {/* Quantity */}
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
                    <p>
                        {specialPrice > 0 ? (
                            "x RS. " + specialPrice
                        ) : (
                            "x RS. " + currentPrice
                        )}
                    </p>
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
                <p className="text-lg">
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
        <div className="flex flex-col w-full h-full justify-between bg-white">
            <div className="overflow-y-auto max-h-96 divide-y">
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
            <div className="grid grid-cols-2 gap-2 font-lato items-center border-t-2 px-4 py-2">
                <p className={pLeft}>SubTotal</p>
                <p className={pRight}>{subtotal}</p>
                <p className={pLeft}>Tax</p>
                <p className={pRight}>
                    {base_currency_code} {tax}
                </p>
                {selectedTypeSelector === 'cnc' ? (
                    <>
                        <p className={pLeft}>Pickup</p>
                        <p className={pRight}>{parse(pickup_message)}</p>

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
import Image from "next/image"
import missingImageIcon from '../../../../public/assets/svgs/missingImageIcon.svg'
import trashIcon from '../../../../public/assets/svgs/trashIcon.svg'
import plusIcon from '../../../../public/assets/svgs/plusIcon.svg'
import minusIcon from '../../../../public/assets/svgs/minusIcon.svg'
import parse from "html-react-parser"
import { useDeleteItemApi, useUpdateItemQtyApi } from "../../../../helpers/Api"
import ErrorText from "../Typography/ErrorText"

const ItemListing = ({ item }) => {
    let {
        title,
        qty,
        currentPrice,
        specialPrice,
        productImageUrlThumbnail,
        productImageUrl,
        sku
    } = item

    const { setIsUpdateItemQty, setData } = useUpdateItemQtyApi()
    const { setIsDelete, setSku } = useDeleteItemApi()

    return (
        <div className="flex flex-row space-x-2 shadow rounded-3xl overflow-hidden p-2">
            <div className="relative h-[100px] w-[100px]">
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
            </div>
            <div className="flex flex-col justify-between">
                <p>{title}</p>
                <div className="flex flex-row space-x-2 lg:space-x-4 items-center">
                    <button
                        className={"flex flex-row items-center"}
                        onClick={() => {
                            setData({
                                qty: qty - 1,
                                sku: sku
                            })
                            setIsUpdateItemQty(true)
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
                        }}
                    >
                        <Image src={plusIcon} width={10} height={10} alt="" />
                    </button>
                    {specialPrice > 0 ? (
                        <p>x RS. {specialPrice}</p>
                    ) : (
                        <p>x RS. {currentPrice}</p>
                    )}
                    <button
                        onClick={() => {
                            setSku(sku)
                            setIsDelete(true)
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
                {specialPrice > 0 ? (
                    <p>x RS. {specialPrice * qty}</p>
                ) : (
                    <p>x RS. {currentPrice * qty}</p>
                )}
            </div>
        </div>
    )
}

const CheckoutCart = ({ initialCartProducts, initialCartData, isLoading, errorMessage }) => {
    let pLeft = "font-lato text-md text-main-blue"
    let pRight = "font-lato text-lg font-bold text-right"

    if (isLoading) {
        return (
            <div>
                Fetching Cart Data
            </div>
        )
    }

    let {
        subtotal,
        tax,
        shipping_amount,
        grand_total,
        shipment_message,
        base_currency_code,
        couponDiscountAmount,
    } = initialCartData

    return (
        <div className="flex flex-col w-full h-full justify-between bg-white rounded-3xl">
            <ErrorText
                text={errorMessage}
            />
            <div className="overflow-y-auto p-4 h-96 space-y-4">
                {initialCartProducts.map((product) => {
                    return (
                        <ItemListing
                            key={product.sku}
                            item={product}
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
                <p className={pLeft}>Shipping</p>
                <p className={pRight}>{parse(shipment_message)}</p>
                <p className={pLeft}>Shipping Amount</p>
                <p className={pRight}>
                    {base_currency_code} {shipping_amount}
                </p>
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
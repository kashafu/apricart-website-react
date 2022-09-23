import parse from "html-react-parser"
import { useSelector } from "react-redux"

import CartItemListing from "./CartItemListing"

const CheckoutCart = ({ initialCartData, fetchCart }) => {
    const selectedTypeSelector = useSelector(state => state.general.selectedType)
    const reduxCart = useSelector(state => state.cart)

    let pLeft = "font-lato text-md text-main-blue"
    let pRight = "font-lato text-lg font-bold text-right"

    let {
        subtotal,
        shipping_amount,
        grand_total,
        shipment_message,
        base_currency_code,
        couponDiscountAmount,
        pickup_message
    } = initialCartData

    return (
        <div className="flex flex-col w-full bg-white lg:border-l-2 border-t-2 lg:border-t-0">
            <div className="overflow-y-auto max-h-64 divide-y">
                {reduxCart.map((product) => {
                    return (
                        <CartItemListing
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
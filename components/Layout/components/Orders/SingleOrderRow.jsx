import { useState, useEffect } from "react"
import { useCancelOrderApi } from "../../../../helpers/Api"

const SingleOrderRow = ({ order, cancelTime }) => {
    let {
        orderId,
        created_at,
        productCount,
        grandTotal,
        shippingMethod,
        addressUsed,
        city,
        baseCurrencyCode,
        couponDiscountAmount,
        couponsUsed,
        notes,
        paymentMethod,
        paymentStatus,
        pickupLocation,
        pickupStartTime,
        pickupEndTime,
        pickupDiscountPercent,
        shippingAmount,
        status,
        subtotal,
        tax,
        totalDiscountAmount
    } = order

    const [showDetails, setShowDetails] = useState(false)
    const [isCancellable, setIsCancellable] = useState(false)
    const { setIsCancel } = useCancelOrderApi(orderId)


    useEffect(() => {
        if (cancelTime) {
            setIsCancellable((Date.now() - Date.parse(created_at)) / 60000 <= cancelTime)
        }
    }, [])

    return (
        <>
            <tr key={orderId}
                className="odd:bg-slate-100 even:bg-slate-200 truncate font-nunito capitalize text-center"
                onClick={() => {
                    setShowDetails(!showDetails)
                }}
            >
                <td>
                    {orderId}
                </td>
                <td>
                    {created_at}
                </td>
                <td>
                    {productCount}
                </td>
                <td>
                    {grandTotal} {baseCurrencyCode}
                </td>
                <td>
                    {shippingMethod}
                </td>
                <td className="bg-main-blue">
                    <button className="w-full h-full font-nunito text-white font-bold"
                        onClick={() => {
                            setShowDetails(!showDetails)
                        }}
                    >
                        {showDetails ? "Hide Details" : "View Details"}
                    </button>
                </td>
                {isCancellable && (
                    <td className="bg-red-600">
                        <button className="w-full h-full font-nunito text-white font-bold"
                            onClick={() => {
                                setIsCancel(true)
                            }}
                        >
                            CANCEL
                        </button>
                    </td>
                )}

            </tr>
            {showDetails && (
                <tr className="animate-dropdown">
                    <td colSpan={6}>
                        <div className="bg-slate-100 rounded-lg flex flex-col p-2 space-y-1">
                            <p>
                                <strong>Order Number:</strong> {orderId}
                            </p>
                            <p>
                                <strong>Status:</strong> {status}
                            </p>
                            <p>
                                <strong>Order Date:</strong> {created_at}
                            </p>
                            <p>
                                <strong>Address:</strong> {addressUsed}, {city}
                            </p>
                            <p>
                                <strong>Payment Method:</strong> {paymentMethod}
                            </p>
                            <p>
                                <strong>Payment Status:</strong> {paymentStatus}
                            </p>
                            <p>
                                <strong>Notes:</strong> {notes}
                            </p>
                            {couponsUsed !== '' && (
                                <p>
                                    <strong>Coupon:</strong> {couponsUsed}
                                </p>
                            )}
                            {pickupLocation !== '' && (
                                <>
                                    <p>
                                        <strong>Pickup Location:</strong> {pickupLocation}
                                    </p>
                                    <p>
                                        <strong>Pickup Date and Time:</strong> {pickupStartTime} - {pickupEndTime}
                                    </p>
                                </>
                            )}
                            <p>
                                <strong>TOTAL:</strong> {grandTotal} {baseCurrencyCode}
                            </p>
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}

export default SingleOrderRow
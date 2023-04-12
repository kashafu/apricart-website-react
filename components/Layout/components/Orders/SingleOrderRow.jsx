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
        <div>
            <div key={orderId}
                className="flex flex-col p-4 bg-white rounded-lg truncate font-nunito capitalize text-left"
                onClick={() => {
                    setShowDetails(!showDetails)
                }}
            >
                <p className="text-main-blue text-lg font-bold">
                    Order no: {orderId}
                </p>
                <p>
                    Order Date: {created_at}
                </p>
                <p>
                    Total Items: {productCount}
                </p>
                <p>
                    Total Amount: {grandTotal} {baseCurrencyCode}
                </p>
                <p>
                    Order Type: {shippingMethod}
                </p>
                <div className="flex w-full justify-between space-x-2 pt-2">
                    <button className="w-full h-full py-1 font-nunito bg-main-blue rounded-lg text-white font-bold"
                        onClick={() => {
                            setShowDetails(!showDetails)
                        }}
                    >
                        {showDetails ? "Hide Details" : "View Details"}
                    </button>
                    {isCancellable && (
                        <button className="w-full h-full py-1 font-nunito bg-red-600 rounded-lg text-white font-bold"
                            onClick={() => {
                                setIsCancel(true)
                            }}
                        >
                            CANCEL
                        </button>
                    )}
                </div>
            </div>
            {showDetails && (
                <div className="animate-dropdownflex flex-col ">
                    <div className="bg-slate-200 rounded-lg flex flex-col p-2 space-y-1">
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
                </div>
            )}
        </div>
    )
}

export default SingleOrderRow
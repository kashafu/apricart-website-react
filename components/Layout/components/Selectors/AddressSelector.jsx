import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import { useSelector } from "react-redux"
import Link from "next/link"
import { toast } from "react-toastify"
import { useEffect } from "react"

const AddressSelector = () => {
    const selectedAddressSelector = useSelector(
        (state) => state.general.selectedAddress
    )

    useEffect(() => {
        if (!selectedAddressSelector) {
            let toastId = 'delivery'
            toast.warn("SELECT DELIVERY ADDRESS", {
                toastId: toastId
            })
        }
    }, [])

    return (
        <Link href={"/address"} passHref>
            <a className="w-full">
                <div className="flex w-full justify-center bg-slate-100 rounded-xl">
                    <div className="py-2 px-4 lg:bg-inherit lg:rounded-none">
                        <div className="flex flex-row space-x-2 items-center">
                            <div className="relative w-[25px] h-[25px]">
                                <Image
                                    src={locationPinPNG}
                                    alt={"location icon"}
                                    layout={"fill"}
                                />
                            </div>
                            <p
                                className={
                                    "font-bold text-base truncate max-w-[150px] xl:max-w-xs text-main-grey-800 capitalize font-nunito"
                                }
                            >
                                {selectedAddressSelector ? [selectedAddressSelector.address] : "Select Address"}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default AddressSelector

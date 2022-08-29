import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import { useSelector } from "react-redux"
import Link from "next/link"

const AddressSelector = () => {
    const selectedAddressSelector = useSelector(
        (state) => state.general.selectedAddress
    )

    return (
        <Link href={"/address"} passHref>
            <a>
                <div className="flex w-full justify-center">
                    <div className="bg-slate-100 rounded-xl py-2 px-4 lg:bg-inherit lg:rounded-none lg:py-0 lg:px-0">
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
                                    "font-bold text-base truncate max-w-[150px] xl:max-w-xs text-main-grey-800 lg:text-lg capitalize"
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

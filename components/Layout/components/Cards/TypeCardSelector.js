import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"

import ClickAndCollectCard from "./ClickAndCollectCard"
import BulkBuyCard from "./BulkBuyCard"
import { updateSelectedType } from "../../../../redux/general.slice"

import dropdownSVG from "../../../../public/assets/svgs/dropdownArrow.svg"

const TypeCardSelector = () => {
    const dispatch = useDispatch()
    const citySelector = useSelector((state) => state.general.city)
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        if (citySelector === 'peshawar') {
            dispatch(updateSelectedType('bulk'))
        }
    }, [citySelector])

    /*
        Hide dropdown whenever new type is selected
    */
    useEffect(() => {
        setIsShow(false)
    }, [selectedTypeSelector])

    return (
        <div className="flex flex-col w-[100px] lg:w-[165px]">
            <button className="w-full h-[40px] lg:h-[50px] bg-main-blue rounded-md flex flex-row items-center justify-between px-1 lg:px-2"
                onClick={() => {
                    setIsShow(!isShow)
                }}
            >
                <p className="font-nunito text-[10px] lg:text-base font-bold text-white">
                    {selectedTypeSelector === 'bulk' && "Online Delivery"}
                    {selectedTypeSelector === 'cnc' && "Click & Collect"}
                </p>
                <div className="relative h-[8px] w-[10px] lg:h-[10px] lg:w-[12px]">
                    <Image
                        className={isShow ? "rotate-180 duration-300 ease-in-out" : "rotate-0 duration-300 ease-in-out"}
                        src={dropdownSVG}
                        alt='icon'
                        layout="fill"
                    />
                </div>
            </button>
            {isShow && (
                <>
                    {citySelector === 'karachi' && (
                        <div className="animate-dropdown w-[100px] lg:w-[165px] absolute z-50 top-[40px] lg:top-[50px] bg-[#F0F0F0] border-b-2 border-x-2 border-main-blue py-2">
                            <>
                                {selectedTypeSelector === 'bulk' && (
                                    <ClickAndCollectCard />
                                )}
                                {selectedTypeSelector === 'cnc' && (
                                    <BulkBuyCard />
                                )}
                            </>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default TypeCardSelector
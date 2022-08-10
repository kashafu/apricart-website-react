import HomeDeliveryCard from "./HomeDeliveryCard"
import ClickAndCollectCard from "./ClickAndCollectCard"
import BulkBuyCard from "./BulkBuyCard"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateSelectedType } from "../../../../redux/general.slice"
import { useSelector } from "react-redux"

const TypeCardSelector = () => {
    const dispatch = useDispatch()
    const citySelector = useSelector((state) => state.general.city)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (citySelector === 'peshawar') {
            setIsDisabled(true)
            dispatch(updateSelectedType('bulk'))
        }
        else {
            setIsDisabled(false)
        }
    }, [citySelector])

    // <div className="pt-[3rem] lg:pt-[6rem] md:pt-[5rem]  bg-white">

    return (
        <div className="grid grid-cols-3 px-2 gap-6 bg-white">
            <HomeDeliveryCard isDisabled={isDisabled} />
            <ClickAndCollectCard isDisabled={isDisabled} />
            <BulkBuyCard />
        </div>
    )
}

export default TypeCardSelector
import HomeDeliveryCard from "./HomeDeliveryCard"
import ClickAndCollectCard from "./ClickAndCollectCard"
import BulkBuyCard from "./BulkBuyCard"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateSelectedType } from "../../../../redux/general.slice"

const TypeCardSelector = () => {
    const dispatch = useDispatch()
    const { city } = getGeneralApiParams()
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (city === 'peshawar') {
            setIsDisabled(true)
            dispatch(updateSelectedType('bulk'))
        }
        else{
            setIsDisabled(false)
        }
    }, [city])

    return (
        <div className=" grid grid-cols-3 lg:gap-12 lg:px-28 gap-2 ">
            <HomeDeliveryCard isDisabled={isDisabled}/>
            <ClickAndCollectCard isDisabled={isDisabled}/>
            <BulkBuyCard />
        </div>
    )
}

export default TypeCardSelector
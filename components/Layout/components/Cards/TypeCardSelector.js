import HomeDeliveryCard from "./HomeDeliveryCard"
import ClickAndCollectCard from "./ClickAndCollectCard"
import BulkBuyCard from "./BulkBuyCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedType } from "../../../../redux/general.slice"

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

    return (
        <div className="grid grid-cols-3 gap-x-2 lg:gap-x-8 2xl:gap-x-16 lg:px-8 2xl:px-16 bg-white">
            <HomeDeliveryCard isDisabled={isDisabled} />
            <ClickAndCollectCard isDisabled={isDisabled} />
            <BulkBuyCard />
        </div>
    )
}

export default TypeCardSelector